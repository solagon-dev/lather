/**
 * Timezone utility for Lather booking system.
 * All business operations are in America/New_York.
 */

export const BIZ_TZ = "America/New_York";

/**
 * Convert a business-local date and time string to a UTC Date object.
 * E.g., "2025-06-15" + "10:00" in ET → correct UTC Date
 */
export function bizLocalToUtc(dateStr: string, timeStr: string): Date {
  // Create a UTC reference and calculate the offset for this specific date
  const offsetMinutes = getEtOffsetMinutes(dateStr);

  // Parse the time as if it were UTC, then adjust by offset
  const utcDate = new Date(`${dateStr}T${timeStr}:00Z`);
  utcDate.setMinutes(utcDate.getMinutes() + offsetMinutes);

  return utcDate;
}

/**
 * Format a UTC Date to business-local date string (YYYY-MM-DD)
 */
export function utcToBizDate(utcDate: Date): string {
  return utcDate.toLocaleDateString("en-CA", { timeZone: BIZ_TZ });
}

/**
 * Format a UTC Date to business-local time string (HH:mm)
 */
export function utcToBizTime(utcDate: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BIZ_TZ,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(utcDate);

  const h = (parts.find((p) => p.type === "hour")?.value || "0").padStart(2, "0");
  const m = (parts.find((p) => p.type === "minute")?.value || "0").padStart(2, "0");
  return `${h}:${m}`;
}

/**
 * Get the UTC offset for America/New_York on a specific date.
 * Returns minutes to ADD to local time to get UTC.
 * EST = +300 (5 hours), EDT = +240 (4 hours)
 */
function getEtOffsetMinutes(dateStr: string): number {
  const utcNoon = new Date(`${dateStr}T12:00:00Z`);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BIZ_TZ,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(utcNoon);

  const localHour = parseInt(parts.find((p) => p.type === "hour")?.value || "12", 10);
  const localMinute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);

  const localTotal = localHour * 60 + localMinute;
  const utcTotal = 12 * 60;

  return utcTotal - localTotal; // positive = behind UTC (EST/EDT)
}
