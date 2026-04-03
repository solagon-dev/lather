import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateICS } from "@/lib/calendar-links";

/**
 * GET /api/booking/calendar?code=LTH-XXXXXX
 * Returns an ICS file for the appointment.
 */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "Confirmation code required" }, { status: 400 });
  }

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { confirmationCode: code },
      include: {
        service: { select: { name: true } },
        staff: { select: { name: true } },
      },
    });

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    const ics = generateICS({
      title: `${appointment.service.name} — Lather Head Spa`,
      description: [
        `Treatment: ${appointment.service.name}`,
        `Therapist: ${appointment.staff.name}`,
        `Confirmation: ${appointment.confirmationCode}`,
        "",
        "Please arrive 5 minutes early.",
        "Lather Head Spa · Greenville, NC · (252) 558-4344",
      ].join("\n"),
      startAt: appointment.startAt,
      endAt: appointment.endAt,
      location: "Lather Head Spa, Greenville, NC",
    });

    return new NextResponse(ics, {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="lather-appointment-${code}.ics"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to generate calendar file" }, { status: 500 });
  }
}
