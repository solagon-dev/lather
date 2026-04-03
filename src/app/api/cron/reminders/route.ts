import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendReminderEmail, sendReminderSMS, type AppointmentData } from "@/lib/notifications";

/**
 * Cron endpoint for sending appointment reminders.
 * Called via Vercel Cron every 15 minutes.
 *
 * Sends:
 *  - 24-hour reminders (for appointments 23–25 hours away)
 *  - 2-hour reminders (for appointments 1.5–2.5 hours away)
 *
 * Protected by CRON_SECRET to prevent unauthorized calls.
 */
export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel passes this header for cron jobs)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  let sent24h = 0;
  let sent2h = 0;

  try {
    // ── 24-hour reminders ──────────────────────────────
    const window24hStart = new Date(now.getTime() + 23 * 60 * 60 * 1000);
    const window24hEnd = new Date(now.getTime() + 25 * 60 * 60 * 1000);

    const appointments24h = await prisma.appointment.findMany({
      where: {
        startAt: { gte: window24hStart, lte: window24hEnd },
        status: { in: ["pending", "confirmed"] },
        reminder24hSent: false,
      },
      include: {
        client: { select: { firstName: true, lastName: true, email: true, phone: true } },
        service: { select: { name: true, durationMinutes: true, price: true } },
        staff: { select: { name: true } },
      },
    });

    for (const appt of appointments24h) {
      const data: AppointmentData = {
        id: appt.id,
        confirmationCode: appt.confirmationCode,
        startAt: appt.startAt,
        endAt: appt.endAt,
        status: appt.status,
        notes: appt.notes,
        client: appt.client,
        service: appt.service,
        staff: appt.staff,
      };

      await sendReminderEmail(data, 24);
      await sendReminderSMS(data, 24);
      sent24h++;
    }

    // ── 2-hour reminders ───────────────────────────────
    const window2hStart = new Date(now.getTime() + 1.5 * 60 * 60 * 1000);
    const window2hEnd = new Date(now.getTime() + 2.5 * 60 * 60 * 1000);

    const appointments2h = await prisma.appointment.findMany({
      where: {
        startAt: { gte: window2hStart, lte: window2hEnd },
        status: { in: ["pending", "confirmed"] },
        reminder2hSent: false,
      },
      include: {
        client: { select: { firstName: true, lastName: true, email: true, phone: true } },
        service: { select: { name: true, durationMinutes: true, price: true } },
        staff: { select: { name: true } },
      },
    });

    for (const appt of appointments2h) {
      const data: AppointmentData = {
        id: appt.id,
        confirmationCode: appt.confirmationCode,
        startAt: appt.startAt,
        endAt: appt.endAt,
        status: appt.status,
        notes: appt.notes,
        client: appt.client,
        service: appt.service,
        staff: appt.staff,
      };

      await sendReminderEmail(data, 2);
      await sendReminderSMS(data, 2);
      sent2h++;
    }

    return NextResponse.json({
      ok: true,
      sent24h,
      sent2h,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error("[Cron] Reminder processing error:", error);
    return NextResponse.json(
      { error: "Failed to process reminders" },
      { status: 500 },
    );
  }
}
