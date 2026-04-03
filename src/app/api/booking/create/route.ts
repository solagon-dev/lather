import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkSlotConflict, assignBestStaff } from "@/lib/availability";
import { sendAllBookingConfirmations } from "@/lib/notifications";
import { createCalendarEvent } from "@/lib/google-calendar";
import { bizLocalToUtc } from "@/lib/timezone";

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function generateCode(): string {
  let code = "LTH-";
  for (let i = 0; i < 6; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      serviceId,
      staffId: requestedStaffId,
      date,
      time,
      notes,
    } = body;

    // ── 1. Input validation ──────────────────────────────
    const errors: string[] = [];
    if (!firstName?.trim()) errors.push("First name is required");
    if (!lastName?.trim()) errors.push("Last name is required");
    if (!email?.trim()) errors.push("Email is required");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.push("Invalid email address");
    if (!serviceId) errors.push("Service is required");
    if (!date) errors.push("Date is required");
    if (!time) errors.push("Time is required");
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date))
      errors.push("Invalid date format");
    if (time && !/^\d{2}:\d{2}$/.test(time))
      errors.push("Invalid time format");

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(". ") }, { status: 400 });
    }

    // ── 2. Resolve staff (handle "no preference") ────────
    let staffId = requestedStaffId;
    if (!staffId) {
      staffId = await assignBestStaff(date, time, serviceId);
      if (!staffId) {
        return NextResponse.json(
          { error: "No therapists available at this time. Please choose another slot." },
          { status: 409 },
        );
      }
    }

    // ── 3. Conflict check ────────────────────────────────
    const conflict = await checkSlotConflict(date, time, serviceId, staffId);
    if (!conflict.ok) {
      return NextResponse.json({ error: conflict.reason }, { status: 409 });
    }

    // ── 4. Get service for duration calculation ──────────
    const service = await prisma.bookingService.findUnique({
      where: { id: serviceId },
    });
    if (!service) {
      return NextResponse.json({ error: "Service not found." }, { status: 400 });
    }

    // ── 5. Calculate times (business-local → UTC) ──────
    const startAt = bizLocalToUtc(date, time);
    const endAt = new Date(startAt.getTime() + service.durationMinutes * 60000);

    // ── 6. Transactional booking creation ────────────────
    // Use a Prisma transaction to ensure the client lookup/creation
    // and appointment creation happen atomically.
    const appointment = await prisma.$transaction(async (tx) => {
      // Find or create client
      const normalizedEmail = email.trim().toLowerCase();
      let client = await tx.client.findUnique({
        where: { email: normalizedEmail },
      });
      if (!client) {
        client = await tx.client.create({
          data: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: normalizedEmail,
            phone: phone?.trim() || null,
          },
        });
      }

      // Final conflict guard: check for overlapping appointments one more time
      // inside the transaction to prevent the race window
      const overlapping = await tx.appointment.findFirst({
        where: {
          staffId,
          status: { in: ["pending", "confirmed"] },
          startAt: { lt: endAt },
          endAt: { gt: startAt },
        },
      });

      if (overlapping) {
        throw new Error("SLOT_TAKEN");
      }

      // Create the appointment
      return tx.appointment.create({
        data: {
          confirmationCode: generateCode(),
          clientId: client.id,
          serviceId,
          staffId,
          status: "pending",
          startAt,
          endAt,
          timezone: "America/New_York",
          notes: notes?.trim() || null,
          source: "website",
        },
        include: {
          service: { select: { name: true, durationMinutes: true, price: true } },
          staff: { select: { name: true } },
          client: { select: { firstName: true, lastName: true, email: true, phone: true } },
        },
      });
    });

    // Send notifications + sync to Google Calendar (non-blocking)
    sendAllBookingConfirmations(appointment).catch((err) =>
      console.error("[Notifications] Background send error:", err)
    );

    // Sync to Google Calendar if staff has it enabled
    const staffForCal = await prisma.staff.findUnique({
      where: { id: staffId },
      select: { id: true, name: true, googleCalendarId: true, calendarSyncEnabled: true },
    });
    if (staffForCal?.calendarSyncEnabled) {
      createCalendarEvent({
        ...appointment,
        timezone: "America/New_York",
        staff: staffForCal,
      }).catch((err) => console.error("[Calendar] Background sync error:", err));
    }

    // Build calendar links for the response
    const { buildCalendarLinks } = await import("@/lib/calendar-links");
    const calendarLinks = buildCalendarLinks({
      serviceName: appointment.service.name,
      staffName: appointment.staff.name,
      startAt: appointment.startAt,
      endAt: appointment.endAt,
      confirmationCode: appointment.confirmationCode,
    });

    return NextResponse.json({
      success: true,
      booking: {
        confirmationCode: appointment.confirmationCode,
        serviceName: appointment.service.name,
        staffName: appointment.staff.name,
        startAt: appointment.startAt.toISOString(),
        endAt: appointment.endAt.toISOString(),
        durationMinutes: appointment.service.durationMinutes,
        price: appointment.service.price,
        clientName: `${appointment.client.firstName} ${appointment.client.lastName}`,
        clientEmail: appointment.client.email,
        clientPhone: appointment.client.phone,
        calendarLinks: {
          googleUrl: calendarLinks.googleUrl,
          outlookUrl: calendarLinks.outlookUrl,
          icsUrl: `/api/booking/calendar?code=${appointment.confirmationCode}`,
        },
      },
    });
  } catch (error) {
    // Handle the specific "slot taken" error from the transaction
    if (error instanceof Error && error.message === "SLOT_TAKEN") {
      return NextResponse.json(
        { error: "This time slot was just booked by someone else. Please choose another time." },
        { status: 409 },
      );
    }

    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
