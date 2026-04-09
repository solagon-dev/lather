/**
 * Client-facing calendar link generation.
 * Generates ICS content and add-to-calendar URLs for Apple, Outlook, and Google.
 */

interface CalendarEvent {
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
  location: string;
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function formatICSDate(date: Date): string {
  // UTC format: YYYYMMDDTHHmmssZ
  const y = date.getUTCFullYear();
  const m = pad(date.getUTCMonth() + 1);
  const d = pad(date.getUTCDate());
  const h = pad(date.getUTCHours());
  const min = pad(date.getUTCMinutes());
  const s = pad(date.getUTCSeconds());
  return `${y}${m}${d}T${h}${min}${s}Z`;
}

function escapeICS(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/**
 * Generate ICS file content (works with Apple Calendar, Outlook, etc.)
 */
export function generateICS(event: CalendarEvent): string {
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@latherspas.com`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Lather Head Spa//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTART:${formatICSDate(event.startAt)}`,
    `DTEND:${formatICSDate(event.endAt)}`,
    `SUMMARY:${escapeICS(event.title)}`,
    `DESCRIPTION:${escapeICS(event.description)}`,
    `LOCATION:${escapeICS(event.location)}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/**
 * Generate a Google Calendar add-event URL
 */
export function getGoogleCalendarUrl(event: CalendarEvent): string {
  const start = formatICSDate(event.startAt);
  const end = formatICSDate(event.endAt);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate an Outlook.com add-event URL
 */
export function getOutlookCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    startdt: event.startAt.toISOString(),
    enddt: event.endAt.toISOString(),
    body: event.description,
    location: event.location,
  });

  return `https://outlook.live.com/calendar/0/action/compose?${params.toString()}`;
}

/**
 * Build all calendar link options from appointment data
 */
export function buildCalendarLinks(appt: {
  serviceName: string;
  staffName: string;
  startAt: string | Date;
  endAt: string | Date;
  confirmationCode: string;
}) {
  const startDate = typeof appt.startAt === "string" ? new Date(appt.startAt) : appt.startAt;
  const endDate = typeof appt.endAt === "string" ? new Date(appt.endAt) : appt.endAt;

  const event: CalendarEvent = {
    title: `${appt.serviceName} — Lather Head Spa`,
    description: [
      `Treatment: ${appt.serviceName}`,
      `Therapist: ${appt.staffName}`,
      `Confirmation: ${appt.confirmationCode}`,
      "",
      "Please arrive 5 minutes early.",
      "Lather Head Spa · Greenville, NC",
      "(252) 531-0987",
    ].join("\n"),
    startAt: startDate,
    endAt: endDate,
    location: "Lather Head Spa, Greenville, NC",
  };

  return {
    icsContent: generateICS(event),
    googleUrl: getGoogleCalendarUrl(event),
    outlookUrl: getOutlookCalendarUrl(event),
  };
}
