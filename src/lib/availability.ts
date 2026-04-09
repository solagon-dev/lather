import { prisma } from "@/lib/db";
import { getGoogleBusyTimes, type BusyBlock } from "@/lib/google-calendar";

/**
 * Production availability engine for Lather Head Spa.
 *
 * All times are handled in the business timezone (America/New_York).
 * The engine accounts for:
 *  - Staff schedules (per-staff or location defaults)
 *  - Blackout / time-off periods
 *  - Existing appointments with buffer time
 *  - Service duration + pre/post buffers
 *  - Past-time filtering for today
 *  - Timezone-correct date boundaries
 */

// ── Public types ─────────────────────────────────────────────

export interface TimeSlot {
  time: string;       // "10:00" in 24h format (business timezone)
  staffId: string;
  staffName: string;
}

export interface BookingConflict {
  ok: false;
  reason: string;
}

export interface BookingClear {
  ok: true;
}

export type ConflictCheck = BookingConflict | BookingClear;

// ── Constants ────────────────────────────────────────────────

const SLOT_INCREMENT = 15; // minutes
const BIZ_TZ = "America/New_York";

// ── Slot generation ──────────────────────────────────────────

export async function getAvailableSlots(
  date: string,       // "2025-06-15"
  serviceId: string,
  staffId?: string | null,
): Promise<TimeSlot[]> {
  // ── 1. Service lookup ────────────────────────────────
  const service = await prisma.bookingService.findUnique({
    where: { id: serviceId },
  });
  if (!service?.isActive) return [];

  const serviceTotalBlock =
    service.bufferBeforeMinutes + service.durationMinutes + service.bufferAfterMinutes;

  // ── 2. Day of week in business timezone ──────────────
  const dayOfWeek = getDayOfWeekInTz(date, BIZ_TZ);

  // ── 3. Eligible staff ────────────────────────────────
  const eligibleStaff = await prisma.staff.findMany({
    where: {
      isActive: true,
      ...(staffId ? { id: staffId } : {}),
      staffServices: { some: { serviceId } },
    },
    select: { id: true, name: true, timezone: true },
  });
  if (eligibleStaff.length === 0) return [];

  const staffIds = eligibleStaff.map((s) => s.id);

  // ── 4. Availability rules ────────────────────────────
  const rules = await prisma.availabilityRule.findMany({
    where: {
      dayOfWeek,
      isActive: true,
      OR: [{ staffId: null }, { staffId: { in: staffIds } }],
    },
  });

  const locationRule = rules.find((r) => r.staffId === null);
  const staffHoursMap = new Map<string, { start: number; end: number }>();

  for (const staff of eligibleStaff) {
    const staffRule = rules.find((r) => r.staffId === staff.id);
    const rule = staffRule || locationRule;
    if (rule?.isActive) {
      staffHoursMap.set(staff.id, {
        start: parseTime(rule.startTime),
        end: parseTime(rule.endTime),
      });
    }
  }
  if (staffHoursMap.size === 0) return [];

  // ── 5. Date boundaries in UTC for DB queries ─────────
  const { utcStart, utcEnd } = getUtcDayBounds(date, BIZ_TZ);

  // ── 6. Existing appointments ─────────────────────────
  const appointments = await prisma.appointment.findMany({
    where: {
      staffId: { in: Array.from(staffHoursMap.keys()) },
      status: { in: ["pending", "confirmed"] },
      // Appointments that overlap with this day at all
      startAt: { lt: utcEnd },
      endAt: { gt: utcStart },
    },
    select: {
      staffId: true,
      startAt: true,
      endAt: true,
      service: {
        select: { bufferBeforeMinutes: true, bufferAfterMinutes: true },
      },
    },
  });

  // Build per-staff blocked ranges (appointment time + buffers)
  const staffBlocked = new Map<string, { start: number; end: number }[]>();
  for (const appt of appointments) {
    const apptStartLocal = utcToLocalMinutes(appt.startAt, BIZ_TZ, date);
    const apptEndLocal = utcToLocalMinutes(appt.endAt, BIZ_TZ, date);
    if (apptStartLocal === null || apptEndLocal === null) continue;

    const blockStart = apptStartLocal - (appt.service.bufferBeforeMinutes || 0);
    const blockEnd = apptEndLocal + (appt.service.bufferAfterMinutes || 0);

    if (!staffBlocked.has(appt.staffId)) staffBlocked.set(appt.staffId, []);
    staffBlocked.get(appt.staffId)!.push({ start: blockStart, end: blockEnd });
  }

  // ── 7. Blackouts ─────────────────────────────────────
  const blackouts = await prisma.blackout.findMany({
    where: {
      startAt: { lt: utcEnd },
      endAt: { gt: utcStart },
      OR: [{ staffId: null }, { staffId: { in: Array.from(staffHoursMap.keys()) } }],
    },
  });

  const staffBlackouts = new Map<string, { start: number; end: number }[]>();
  for (const b of blackouts) {
    const bStart = utcToLocalMinutes(b.startAt, BIZ_TZ, date) ?? 0;
    const bEnd = utcToLocalMinutes(b.endAt, BIZ_TZ, date) ?? 1440;

    const affectedStaff = b.staffId
      ? [b.staffId]
      : Array.from(staffHoursMap.keys());

    for (const sid of affectedStaff) {
      if (!staffBlackouts.has(sid)) staffBlackouts.set(sid, []);
      staffBlackouts.get(sid)!.push({ start: bStart, end: bEnd });
    }
  }

  // ── 8. Google Calendar busy times ─────────────────────
  // Fetch freebusy data for all staff with calendar sync enabled.
  // This runs in parallel for all staff to minimize latency.
  const staffGoogleBusy = new Map<string, { start: number; end: number }[]>();

  const busyPromises = Array.from(staffHoursMap.keys()).map(async (sid) => {
    try {
      const busyBlocks: BusyBlock[] = await getGoogleBusyTimes(sid, utcStart, utcEnd);
      const localBlocks = busyBlocks
        .map((b) => ({
          start: utcToLocalMinutes(b.start, BIZ_TZ, date) ?? 0,
          end: utcToLocalMinutes(b.end, BIZ_TZ, date) ?? 1440,
        }))
        .filter((b) => b.end > b.start); // Only blocks that fall on this day
      if (localBlocks.length > 0) {
        staffGoogleBusy.set(sid, localBlocks);
      }
    } catch {
      // Graceful degradation — if freebusy fails, don't block any slots
    }
  });

  await Promise.allSettled(busyPromises);

  // ── 9. Current time in business timezone ─────────────
  const nowMinutes = getNowMinutesInTz(BIZ_TZ);
  const isToday = date === getTodayInTz(BIZ_TZ);

  // ── 10. Generate slots ───────────────────────────────
  const allSlots: TimeSlot[] = [];

  for (const [sid, hours] of staffHoursMap) {
    const staffMember = eligibleStaff.find((s) => s.id === sid)!;
    const blocked = staffBlocked.get(sid) || [];
    const blackedOut = staffBlackouts.get(sid) || [];
    const googleBusy = staffGoogleBusy.get(sid) || [];

    for (
      let slotStart = hours.start;
      slotStart + serviceTotalBlock <= hours.end;
      slotStart += SLOT_INCREMENT
    ) {
      // The actual appointment occupies [slotStart, slotStart + duration]
      // The full block (with buffers) occupies [slotStart - bufferBefore, slotStart + duration + bufferAfter]
      const fullBlockStart = slotStart - service.bufferBeforeMinutes;
      const fullBlockEnd = slotStart + service.durationMinutes + service.bufferAfterMinutes;

      // Skip past slots for today
      if (isToday && slotStart <= nowMinutes) continue;

      // Check appointment conflicts
      const hasApptConflict = blocked.some(
        (b) => fullBlockStart < b.end && fullBlockEnd > b.start,
      );
      if (hasApptConflict) continue;

      // Check blackout conflicts (against actual service time, not buffers)
      const hasBlackout = blackedOut.some(
        (b) => slotStart < b.end && (slotStart + service.durationMinutes) > b.start,
      );
      if (hasBlackout) continue;

      // Check Google Calendar busy conflicts
      const hasGoogleConflict = googleBusy.some(
        (b) => slotStart < b.end && (slotStart + service.durationMinutes) > b.start,
      );
      if (hasGoogleConflict) continue;

      allSlots.push({
        time: formatMinutes(slotStart),
        staffId: sid,
        staffName: staffMember.name,
      });
    }
  }

  // Sort by time, then staff name for deterministic order
  allSlots.sort((a, b) => a.time.localeCompare(b.time) || a.staffName.localeCompare(b.staffName));

  return allSlots;
}

// ── Conflict check (used at booking time) ────────────────────

/**
 * Server-side conflict check. Call this immediately before inserting
 * an appointment to verify the slot is still open.
 */
export async function checkSlotConflict(
  date: string,
  time: string,
  serviceId: string,
  staffId: string,
): Promise<ConflictCheck> {
  // Verify service exists and is active
  const service = await prisma.bookingService.findUnique({
    where: { id: serviceId },
  });
  if (!service?.isActive) return { ok: false, reason: "Service is not available." };

  // Verify staff exists, is active, and can do this service
  const staff = await prisma.staff.findFirst({
    where: {
      id: staffId,
      isActive: true,
      staffServices: { some: { serviceId } },
    },
  });
  if (!staff) return { ok: false, reason: "This therapist is not available for this service." };

  // Verify the slot appears in the computed availability
  const slots = await getAvailableSlots(date, serviceId, staffId);
  const isAvailable = slots.some((s) => s.time === time && s.staffId === staffId);

  if (!isAvailable) {
    return { ok: false, reason: "This time slot is no longer available." };
  }

  return { ok: true };
}

/**
 * Assigns the best staff member for a "no preference" booking.
 * Strategy: pick the staff member with the fewest appointments that day.
 */
export async function assignBestStaff(
  date: string,
  time: string,
  serviceId: string,
): Promise<string | null> {
  const slots = await getAvailableSlots(date, serviceId, null);
  const matchingSlots = slots.filter((s) => s.time === time);

  if (matchingSlots.length === 0) return null;
  if (matchingSlots.length === 1) return matchingSlots[0].staffId;

  // Count existing appointments per staff for the day to pick least busy
  const { utcStart, utcEnd } = getUtcDayBounds(date, BIZ_TZ);
  const staffIds = [...new Set(matchingSlots.map((s) => s.staffId))];

  const counts = await prisma.appointment.groupBy({
    by: ["staffId"],
    where: {
      staffId: { in: staffIds },
      status: { in: ["pending", "confirmed"] },
      startAt: { gte: utcStart, lt: utcEnd },
    },
    _count: true,
  });

  const countMap = new Map(counts.map((c) => [c.staffId, c._count]));

  // Sort by fewest appointments, break ties by name for consistency
  matchingSlots.sort((a, b) => {
    const countA = countMap.get(a.staffId) || 0;
    const countB = countMap.get(b.staffId) || 0;
    return countA - countB || a.staffName.localeCompare(b.staffName);
  });

  return matchingSlots[0].staffId;
}

// ── Timezone helpers ─────────────────────────────────────────

function getDayOfWeekInTz(dateStr: string, tz: string): number {
  // Create a date at noon to avoid DST edge cases
  const d = new Date(`${dateStr}T12:00:00`);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "short",
  }).formatToParts(d);
  const dayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };
  return dayMap[parts[0].value] ?? 0;
}

function getUtcDayBounds(dateStr: string, tz: string) {
  // Calculate the UTC offset for the business timezone on this specific date.
  // We use Intl to extract the exact offset, which handles DST correctly.
  const offsetMinutes = getTzOffsetMinutes(dateStr, tz);

  // Midnight in the business timezone = midnight - offset
  const utcStart = new Date(`${dateStr}T00:00:00Z`);
  utcStart.setMinutes(utcStart.getMinutes() + offsetMinutes);

  const utcEnd = new Date(`${dateStr}T23:59:59Z`);
  utcEnd.setMinutes(utcEnd.getMinutes() + offsetMinutes);

  return { utcStart, utcEnd };
}

/**
 * Get the UTC offset in minutes for a timezone on a specific date.
 * Positive = behind UTC (e.g., EST = +300), Negative = ahead.
 * Uses Intl to correctly handle DST.
 */
function getTzOffsetMinutes(dateStr: string, tz: string): number {
  // Create a known UTC reference point at noon on the date
  const utcRef = new Date(`${dateStr}T12:00:00Z`);

  // Format the same instant in the target timezone
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(utcRef);

  const hourPart = parts.find((p) => p.type === "hour");
  const minutePart = parts.find((p) => p.type === "minute");
  const localHour = parseInt(hourPart?.value || "12", 10);
  const localMinute = parseInt(minutePart?.value || "0", 10);

  // UTC was noon (12:00). Calculate difference.
  const localTotalMinutes = localHour * 60 + localMinute;
  const utcTotalMinutes = 12 * 60; // noon
  const diff = utcTotalMinutes - localTotalMinutes; // positive = behind UTC

  return diff;
}

function utcToLocalMinutes(utcDate: Date, tz: string, refDateStr: string): number | null {
  // Convert a UTC timestamp to minutes-since-midnight in the business timezone
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(utcDate);

  const get = (type: string) => parts.find((p) => p.type === type)?.value || "0";
  const localDateStr = `${get("year")}-${get("month")}-${get("day")}`;

  if (localDateStr !== refDateStr) {
    return localDateStr < refDateStr ? 0 : 1440;
  }

  const h = parseInt(get("hour"), 10);
  const m = parseInt(get("minute"), 10);
  return h * 60 + m;
}

function getNowMinutesInTz(tz: string): number {
  const now = new Date();
  const localStr = now.toLocaleString("en-US", { timeZone: tz });
  const local = new Date(localStr);
  return local.getHours() * 60 + local.getMinutes();
}

function getTodayInTz(tz: string): string {
  const now = new Date();
  return now.toLocaleDateString("en-CA", { timeZone: tz }); // YYYY-MM-DD
}

// ── Time math helpers ────────────────────────────────────────

function parseTime(timeStr: string): number {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}
