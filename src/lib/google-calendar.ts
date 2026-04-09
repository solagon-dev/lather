import { google } from "googleapis";
import { prisma } from "@/lib/db";

// ── OAuth Client ─────────────────────────────────────────────

function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );
}

export function getAuthUrl(staffId: string): string {
  const client = getOAuth2Client();
  return client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    state: staffId,
  });
}

export async function handleOAuthCallback(code: string, staffId: string): Promise<void> {
  const client = getOAuth2Client();
  const { tokens } = await client.getToken(code);

  if (!tokens.refresh_token) {
    throw new Error("No refresh token received. Try disconnecting and reconnecting.");
  }

  // Get the connected Google account email
  let googleEmail: string | null = null;
  try {
    client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: "v2", auth: client });
    const userInfo = await oauth2.userinfo.get();
    googleEmail = userInfo.data.email || null;
  } catch {
    // Non-fatal — email is nice-to-have for admin display
  }

  await prisma.googleCalendarToken.upsert({
    where: { staffId },
    update: {
      accessToken: tokens.access_token!,
      refreshToken: tokens.refresh_token,
      expiresAt: new Date(tokens.expiry_date || Date.now() + 3600000),
      scope: tokens.scope || null,
      googleEmail,
      lastSyncError: null,
    },
    create: {
      staffId,
      accessToken: tokens.access_token!,
      refreshToken: tokens.refresh_token,
      expiresAt: new Date(tokens.expiry_date || Date.now() + 3600000),
      scope: tokens.scope || null,
      googleEmail,
    },
  });

  await prisma.staff.update({
    where: { id: staffId },
    data: { calendarSyncEnabled: true },
  });
}

export async function disconnectCalendar(staffId: string): Promise<void> {
  await prisma.googleCalendarToken.deleteMany({ where: { staffId } });
  await prisma.staff.update({
    where: { id: staffId },
    data: { calendarSyncEnabled: false, googleCalendarId: null },
  });
}

// ── Authenticated Calendar Client ────────────────────────────

async function getCalendarClient(staffId: string) {
  const token = await prisma.googleCalendarToken.findUnique({
    where: { staffId },
  });

  if (!token) return null;

  const client = getOAuth2Client();
  client.setCredentials({
    access_token: token.accessToken,
    refresh_token: token.refreshToken,
    expiry_date: token.expiresAt.getTime(),
  });

  // Handle token refresh
  client.on("tokens", async (newTokens) => {
    try {
      await prisma.googleCalendarToken.update({
        where: { staffId },
        data: {
          accessToken: newTokens.access_token || token.accessToken,
          expiresAt: new Date(newTokens.expiry_date || Date.now() + 3600000),
        },
      });
    } catch (e) {
      console.error("[Calendar] Failed to save refreshed token:", e);
    }
  });

  return google.calendar({ version: "v3", auth: client });
}

// ── Freebusy Query ───────────────────────────────────────────

export interface BusyBlock {
  start: Date;
  end: Date;
}

/**
 * Query Google Calendar for busy times within a date range.
 * Returns an array of busy blocks that should block availability.
 * Gracefully returns empty array if calendar is not connected or query fails.
 */
export async function getGoogleBusyTimes(
  staffId: string,
  timeMin: Date,
  timeMax: Date,
): Promise<BusyBlock[]> {
  const staff = await prisma.staff.findUnique({
    where: { id: staffId },
    select: { calendarSyncEnabled: true, googleCalendarId: true },
  });

  if (!staff?.calendarSyncEnabled) return [];

  const calendar = await getCalendarClient(staffId);
  if (!calendar) return [];

  const calendarId = staff.googleCalendarId || "primary";

  try {
    const res = await calendar.freebusy.query({
      requestBody: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        items: [{ id: calendarId }],
      },
    });

    const busySlots = res.data.calendars?.[calendarId]?.busy || [];
    const result = busySlots
      .filter((b): b is { start: string; end: string } => !!b.start && !!b.end)
      .map((b) => ({
        start: new Date(b.start),
        end: new Date(b.end),
      }));

    // Record successful sync
    await prisma.googleCalendarToken.update({
      where: { staffId },
      data: { lastSyncAt: new Date(), lastSyncError: null },
    }).catch(() => {}); // Non-critical

    return result;
  } catch (e) {
    const errMsg = e instanceof Error ? e.message : "Unknown error";
    console.error("[Calendar] Freebusy query failed for staff", staffId, ":", errMsg);

    // Record sync error for admin visibility
    await prisma.googleCalendarToken.update({
      where: { staffId },
      data: { lastSyncError: errMsg },
    }).catch(() => {});

    return []; // Graceful degradation — don't block the booking form
  }
}

// ── Event CRUD ───────────────────────────────────────────────

interface AppointmentEvent {
  id: string;
  startAt: Date;
  endAt: Date;
  timezone: string;
  notes: string | null;
  confirmationCode: string;
  client: { firstName: string; lastName: string; email: string; phone: string | null };
  service: { name: string; durationMinutes: number };
  staff: { id: string; name: string; googleCalendarId: string | null; calendarSyncEnabled: boolean };
  calendarEventId: string | null;
}

function buildEventBody(appt: AppointmentEvent) {
  const clientName = `${appt.client.firstName} ${appt.client.lastName}`;

  return {
    summary: `${appt.service.name} — ${clientName}`,
    description: [
      `Service: ${appt.service.name} (${appt.service.durationMinutes} min)`,
      `Client: ${clientName}`,
      `Email: ${appt.client.email}`,
      appt.client.phone ? `Phone: ${appt.client.phone}` : null,
      `Booking: ${appt.confirmationCode}`,
      appt.notes ? `\nNotes: ${appt.notes}` : null,
      `\n—\nLather Head Spa · Greenville, NC`,
    ]
      .filter(Boolean)
      .join("\n"),
    start: {
      dateTime: appt.startAt.toISOString(),
      timeZone: appt.timezone || "America/New_York",
    },
    end: {
      dateTime: appt.endAt.toISOString(),
      timeZone: appt.timezone || "America/New_York",
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "popup", minutes: 30 },
        { method: "popup", minutes: 15 },
      ],
    },
  };
}

export async function createCalendarEvent(appt: AppointmentEvent): Promise<string | null> {
  if (!appt.staff.calendarSyncEnabled) return null;

  const calendar = await getCalendarClient(appt.staff.id);
  if (!calendar) return null;

  const calendarId = appt.staff.googleCalendarId || "primary";

  try {
    const event = await calendar.events.insert({
      calendarId,
      requestBody: buildEventBody(appt),
    });

    const eventId = event.data.id || null;

    if (eventId) {
      await prisma.appointment.update({
        where: { id: appt.id },
        data: { calendarEventId: eventId },
      });
    }

    // Record successful sync
    await prisma.googleCalendarToken.update({
      where: { staffId: appt.staff.id },
      data: { lastSyncAt: new Date(), lastSyncError: null },
    }).catch(() => {});

    return eventId;
  } catch (e) {
    const errMsg = e instanceof Error ? e.message : "Unknown error";
    console.error("[Calendar] Failed to create event:", errMsg);

    // Record sync error for admin visibility
    await prisma.googleCalendarToken.update({
      where: { staffId: appt.staff.id },
      data: { lastSyncError: `Event create: ${errMsg}` },
    }).catch(() => {});

    return null;
  }
}

export async function updateCalendarEvent(appt: AppointmentEvent): Promise<boolean> {
  if (!appt.staff.calendarSyncEnabled || !appt.calendarEventId) return false;

  const calendar = await getCalendarClient(appt.staff.id);
  if (!calendar) return false;

  const calendarId = appt.staff.googleCalendarId || "primary";

  try {
    await calendar.events.update({
      calendarId,
      eventId: appt.calendarEventId,
      requestBody: buildEventBody(appt),
    });

    await prisma.googleCalendarToken.update({
      where: { staffId: appt.staff.id },
      data: { lastSyncAt: new Date(), lastSyncError: null },
    }).catch(() => {});

    return true;
  } catch (e) {
    const errMsg = e instanceof Error ? e.message : "Unknown error";
    console.error("[Calendar] Failed to update event:", errMsg);

    await prisma.googleCalendarToken.update({
      where: { staffId: appt.staff.id },
      data: { lastSyncError: `Event update: ${errMsg}` },
    }).catch(() => {});

    return false;
  }
}

export async function deleteCalendarEvent(staffId: string, calendarEventId: string, googleCalendarId: string | null): Promise<boolean> {
  const staff = await prisma.staff.findUnique({ where: { id: staffId } });
  if (!staff?.calendarSyncEnabled) return false;

  const calendar = await getCalendarClient(staffId);
  if (!calendar) return false;

  const calendarId = googleCalendarId || "primary";

  try {
    await calendar.events.delete({
      calendarId,
      eventId: calendarEventId,
    });

    await prisma.googleCalendarToken.update({
      where: { staffId },
      data: { lastSyncAt: new Date(), lastSyncError: null },
    }).catch(() => {});

    return true;
  } catch (e) {
    const errMsg = e instanceof Error ? e.message : "Unknown error";
    console.error("[Calendar] Failed to delete event:", errMsg);

    await prisma.googleCalendarToken.update({
      where: { staffId },
      data: { lastSyncError: `Event delete: ${errMsg}` },
    }).catch(() => {});

    return false;
  }
}
