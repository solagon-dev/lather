import { Resend } from "resend";
import twilio from "twilio";
import { prisma } from "@/lib/db";

// ── Clients (lazy-initialized) ───────────────────────────────

let resendClient: Resend | null = null;
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resendClient) resendClient = new Resend(process.env.RESEND_API_KEY);
  return resendClient;
}

let twilioClient: twilio.Twilio | null = null;
function getTwilio(): twilio.Twilio | null {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) return null;
  if (!twilioClient) twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  return twilioClient;
}

// ── Types ────────────────────────────────────────────────────

export interface AppointmentData {
  id: string;
  confirmationCode: string;
  startAt: Date;
  endAt: Date;
  status: string;
  notes: string | null;
  client: { firstName: string; lastName: string; email: string; phone: string | null };
  service: { name: string; durationMinutes: number; price: number | null };
  staff: { name: string };
}

type NotificationType =
  | "email_confirmation"
  | "sms_confirmation"
  | "email_reminder_24h"
  | "sms_reminder_24h"
  | "email_reminder_2h"
  | "sms_reminder_2h"
  | "admin_notice";

// ── Formatters ───────────────────────────────────────────────

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(date);
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  }).format(date);
}

function formatPrice(cents: number | null): string {
  if (!cents) return "";
  return `$${(cents / 100).toFixed(0)}`;
}

// ── Logging ──────────────────────────────────────────────────

async function logNotification(
  appointmentId: string,
  type: NotificationType,
  status: "sent" | "failed",
  providerMessageId?: string | null,
  errorMessage?: string | null,
) {
  try {
    await prisma.notificationLog.create({
      data: {
        appointmentId,
        type,
        status,
        providerMessageId: providerMessageId || null,
        sentAt: status === "sent" ? new Date() : null,
        errorMessage: errorMessage || null,
      },
    });
  } catch (e) {
    console.error("Failed to log notification:", e);
  }
}

// ── Email: Booking Confirmation ──────────────────────────────

export async function sendBookingConfirmationEmail(appt: AppointmentData): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.log("[Notifications] Resend not configured — skipping email confirmation");
    return false;
  }

  const subject = `Your Lather appointment is booked — ${formatDate(appt.startAt)}`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head>
<body style="margin:0;padding:0;background:#F7F3EE;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:48px 24px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:40px;">
      <h1 style="font-size:24px;font-weight:300;letter-spacing:0.15em;color:#3D2E22;text-transform:uppercase;margin:0;">Lather</h1>
      <p style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#8C7B6B;margin:8px 0 0;">Head Spa · Greenville, NC</p>
    </div>

    <!-- Main Card -->
    <div style="background:#FFFFFF;padding:40px 32px;border:1px solid rgba(140,123,107,0.1);">

      <p style="font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:#D4B8A8;margin:0 0 8px;">Booking Confirmed</p>
      <h2 style="font-size:22px;font-weight:300;color:#3D2E22;margin:0 0 24px;line-height:1.3;">
        ${appt.client.firstName}, your ritual is reserved.
      </h2>

      <div style="border-top:1px solid #EDE6DB;padding-top:24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#8C7B6B;width:120px;">Confirmation</td><td style="padding:8px 0;font-size:15px;color:#3D2E22;font-weight:500;letter-spacing:0.05em;">${appt.confirmationCode}</td></tr>
          <tr><td style="padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#8C7B6B;">Treatment</td><td style="padding:8px 0;font-size:15px;color:#3D2E22;">${appt.service.name}</td></tr>
          <tr><td style="padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#8C7B6B;">Date</td><td style="padding:8px 0;font-size:15px;color:#3D2E22;">${formatDate(appt.startAt)}</td></tr>
          <tr><td style="padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#8C7B6B;">Time</td><td style="padding:8px 0;font-size:15px;color:#3D2E22;">${formatTime(appt.startAt)}</td></tr>
          <tr><td style="padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#8C7B6B;">Duration</td><td style="padding:8px 0;font-size:15px;color:#3D2E22;">${appt.service.durationMinutes} minutes</td></tr>
          <tr><td style="padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#8C7B6B;">Therapist</td><td style="padding:8px 0;font-size:15px;color:#3D2E22;">${appt.staff.name}</td></tr>
          ${appt.service.price ? `<tr><td style="padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#8C7B6B;">Price</td><td style="padding:8px 0;font-size:15px;color:#3D2E22;">${formatPrice(appt.service.price)}</td></tr>` : ""}
        </table>
      </div>

      <!-- Preparation Tips -->
      <div style="margin-top:32px;padding-top:24px;border-top:1px solid #EDE6DB;">
        <p style="font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#8C7B6B;margin:0 0 16px;">Before Your Visit</p>
        <ul style="margin:0;padding:0 0 0 16px;color:#6B5C4E;font-size:14px;line-height:2;">
          <li>Arrive with your hair in its natural, unwashed state if possible</li>
          <li>Avoid heavy oils or styling products the day before</li>
          <li>Plan to arrive 5 minutes early to settle in</li>
          <li>Wear comfortable clothing — you will be reclining</li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:32px;padding-top:24px;">
      <p style="font-size:13px;color:#6B5C4E;line-height:1.8;margin:0 0 16px;">
        Questions? Reply to this email or call us at <a href="tel:+12525310987" style="color:#3D2E22;">(252) 531-0987</a>
      </p>
      <p style="font-size:11px;color:#8C7B6B;margin:0;">
        Lather Head Spa · Greenville, NC · Tue–Sat 10am–7pm
      </p>
      <p style="font-size:11px;color:#8C7B6B;margin:4px 0 0;">
        Need to reschedule? Contact us at least 24 hours before your appointment.
      </p>
    </div>
  </div>
</body>
</html>`;

  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Lather Head Spa <hello@latherspas.com>",
      to: appt.client.email,
      subject,
      html,
    });

    await logNotification(appt.id, "email_confirmation", "sent", result.data?.id);
    await prisma.appointment.update({ where: { id: appt.id }, data: { emailConfirmationSent: true } });
    return true;
  } catch (e) {
    const errMsg = e instanceof Error ? e.message : "Unknown error";
    await logNotification(appt.id, "email_confirmation", "failed", null, errMsg);
    console.error("[Notifications] Email confirmation failed:", errMsg);
    return false;
  }
}

// ── SMS: Booking Confirmation ────────────────────────────────

export async function sendBookingConfirmationSMS(appt: AppointmentData): Promise<boolean> {
  const tw = getTwilio();
  if (!tw || !process.env.TWILIO_PHONE_NUMBER) {
    console.log("[Notifications] Twilio not configured — skipping SMS confirmation");
    return false;
  }

  if (!appt.client.phone) return false;

  const body = `Lather Head Spa — Your ${appt.service.name} is confirmed for ${formatDate(appt.startAt)} at ${formatTime(appt.startAt)} with ${appt.staff.name}. Confirmation: ${appt.confirmationCode}. See you soon.`;

  try {
    const msg = await tw.messages.create({
      body,
      to: appt.client.phone,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    await logNotification(appt.id, "sms_confirmation", "sent", msg.sid);
    await prisma.appointment.update({ where: { id: appt.id }, data: { smsConfirmationSent: true } });
    return true;
  } catch (e) {
    const errMsg = e instanceof Error ? e.message : "Unknown error";
    await logNotification(appt.id, "sms_confirmation", "failed", null, errMsg);
    console.error("[Notifications] SMS confirmation failed:", errMsg);
    return false;
  }
}

// ── Email: Reminder ──────────────────────────────────────────

export async function sendReminderEmail(appt: AppointmentData, hoursAhead: 24 | 2): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const type: NotificationType = hoursAhead === 24 ? "email_reminder_24h" : "email_reminder_2h";
  const timeLabel = hoursAhead === 24 ? "tomorrow" : "in 2 hours";
  const subject = `Reminder: Your Lather appointment is ${timeLabel}`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head>
<body style="margin:0;padding:0;background:#F7F3EE;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:48px 24px;">
    <div style="text-align:center;margin-bottom:40px;">
      <h1 style="font-size:24px;font-weight:300;letter-spacing:0.15em;color:#3D2E22;text-transform:uppercase;margin:0;">Lather</h1>
      <p style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#8C7B6B;margin:8px 0 0;">Head Spa · Greenville, NC</p>
    </div>
    <div style="background:#FFFFFF;padding:40px 32px;border:1px solid rgba(140,123,107,0.1);">
      <p style="font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:#D4B8A8;margin:0 0 8px;">Appointment Reminder</p>
      <h2 style="font-size:22px;font-weight:300;color:#3D2E22;margin:0 0 24px;line-height:1.3;">
        ${appt.client.firstName}, your ritual is ${timeLabel}.
      </h2>
      <div style="border-top:1px solid #EDE6DB;padding-top:24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#8C7B6B;width:120px;">Treatment</td><td style="padding:8px 0;font-size:15px;color:#3D2E22;">${appt.service.name}</td></tr>
          <tr><td style="padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#8C7B6B;">Date</td><td style="padding:8px 0;font-size:15px;color:#3D2E22;">${formatDate(appt.startAt)}</td></tr>
          <tr><td style="padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#8C7B6B;">Time</td><td style="padding:8px 0;font-size:15px;color:#3D2E22;">${formatTime(appt.startAt)}</td></tr>
          <tr><td style="padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#8C7B6B;">Therapist</td><td style="padding:8px 0;font-size:15px;color:#3D2E22;">${appt.staff.name}</td></tr>
        </table>
      </div>
      <p style="font-size:14px;color:#6B5C4E;line-height:1.8;margin:24px 0 0;">
        Please arrive 5 minutes early. If you need to reschedule, let us know at least 24 hours in advance.
      </p>
    </div>
    <div style="text-align:center;margin-top:32px;">
      <p style="font-size:13px;color:#6B5C4E;margin:0;">
        <a href="tel:+12525310987" style="color:#3D2E22;">(252) 531-0987</a> · hello@latherspas.com
      </p>
    </div>
  </div>
</body>
</html>`;

  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Lather Head Spa <hello@latherspas.com>",
      to: appt.client.email,
      subject,
      html,
    });

    await logNotification(appt.id, type, "sent", result.data?.id);
    const updateField = hoursAhead === 24 ? "reminder24hSent" : "reminder2hSent";
    await prisma.appointment.update({ where: { id: appt.id }, data: { [updateField]: true } });
    return true;
  } catch (e) {
    const errMsg = e instanceof Error ? e.message : "Unknown error";
    await logNotification(appt.id, type, "failed", null, errMsg);
    return false;
  }
}

// ── SMS: Reminder ────────────────────────────────────────────

export async function sendReminderSMS(appt: AppointmentData, hoursAhead: 24 | 2): Promise<boolean> {
  const tw = getTwilio();
  if (!tw || !process.env.TWILIO_PHONE_NUMBER || !appt.client.phone) return false;

  const type: NotificationType = hoursAhead === 24 ? "sms_reminder_24h" : "sms_reminder_2h";
  const timeLabel = hoursAhead === 24 ? "tomorrow" : "in 2 hours";
  const body = `Lather Head Spa — Reminder: Your ${appt.service.name} is ${timeLabel} at ${formatTime(appt.startAt)} with ${appt.staff.name}. See you soon!`;

  try {
    const msg = await tw.messages.create({
      body,
      to: appt.client.phone,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    await logNotification(appt.id, type, "sent", msg.sid);
    const updateField = hoursAhead === 24 ? "reminder24hSent" : "reminder2hSent";
    await prisma.appointment.update({ where: { id: appt.id }, data: { [updateField]: true } });
    return true;
  } catch (e) {
    const errMsg = e instanceof Error ? e.message : "Unknown error";
    await logNotification(appt.id, type, "failed", null, errMsg);
    return false;
  }
}

// ── Admin: New Booking Notification ──────────────────────────

export async function sendAdminNewBookingNotice(appt: AppointmentData): Promise<boolean> {
  const resend = getResend();
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!resend || !adminEmail) return false;

  const subject = `New Booking: ${appt.client.firstName} ${appt.client.lastName} — ${appt.service.name}`;

  const html = `
<div style="font-family:sans-serif;max-width:500px;padding:24px;">
  <h2 style="font-size:18px;margin:0 0 16px;color:#3D2E22;">New Booking Received</h2>
  <table style="border-collapse:collapse;width:100%;">
    <tr><td style="padding:6px 0;color:#888;font-size:13px;">Code</td><td style="padding:6px 0;font-size:14px;">${appt.confirmationCode}</td></tr>
    <tr><td style="padding:6px 0;color:#888;font-size:13px;">Client</td><td style="padding:6px 0;font-size:14px;">${appt.client.firstName} ${appt.client.lastName} (${appt.client.email})</td></tr>
    <tr><td style="padding:6px 0;color:#888;font-size:13px;">Service</td><td style="padding:6px 0;font-size:14px;">${appt.service.name}</td></tr>
    <tr><td style="padding:6px 0;color:#888;font-size:13px;">Date/Time</td><td style="padding:6px 0;font-size:14px;">${formatDate(appt.startAt)} at ${formatTime(appt.startAt)}</td></tr>
    <tr><td style="padding:6px 0;color:#888;font-size:13px;">Staff</td><td style="padding:6px 0;font-size:14px;">${appt.staff.name}</td></tr>
    ${appt.client.phone ? `<tr><td style="padding:6px 0;color:#888;font-size:13px;">Phone</td><td style="padding:6px 0;font-size:14px;">${appt.client.phone}</td></tr>` : ""}
    ${appt.notes ? `<tr><td style="padding:6px 0;color:#888;font-size:13px;">Notes</td><td style="padding:6px 0;font-size:14px;">${appt.notes}</td></tr>` : ""}
  </table>
  <p style="margin:24px 0 0;font-size:13px;color:#888;">
    <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://www.latherspas.com"}/admin/bookings/${appt.id}" style="color:#3D2E22;">View in Dashboard →</a>
  </p>
</div>`;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Lather Head Spa <hello@latherspas.com>",
      to: adminEmail,
      subject,
      html,
    });
    await logNotification(appt.id, "admin_notice", "sent");
    return true;
  } catch (e) {
    const errMsg = e instanceof Error ? e.message : "Unknown error";
    await logNotification(appt.id, "admin_notice", "failed", null, errMsg);
    return false;
  }
}

// ── Orchestrator: Send all booking confirmations ─────────────

export async function sendAllBookingConfirmations(appt: AppointmentData): Promise<void> {
  // Fire all notifications concurrently — don't block booking on notification failures
  await Promise.allSettled([
    sendBookingConfirmationEmail(appt),
    sendBookingConfirmationSMS(appt),
    sendAdminNewBookingNotice(appt),
  ]);
}
