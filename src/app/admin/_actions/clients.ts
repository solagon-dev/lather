"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { bizLocalToUtc } from "@/lib/timezone";
import {
  updateCalendarEvent,
  createCalendarEvent,
  deleteCalendarEvent,
} from "@/lib/google-calendar";

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
}

export async function updateClientAction(
  id: string,
  formData: FormData,
): Promise<{ error: string } | void> {
  await requireAdmin();
  const firstName = (formData.get("firstName") as string)?.trim();
  const lastName = (formData.get("lastName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const phone = (formData.get("phone") as string)?.trim() || null;
  const notes = (formData.get("notes") as string)?.trim() || null;

  if (!firstName || !lastName || !email) return { error: "Name and email are required." };

  try {
    await prisma.client.update({
      where: { id },
      data: { firstName, lastName, email, phone, notes },
    });
  } catch {
    return { error: "Failed to update client." };
  }
  revalidatePath("/admin/clients");
  revalidatePath(`/admin/clients/${id}`);
}

export async function updateAppointmentAction(
  id: string,
  formData: FormData,
): Promise<{ error: string } | void> {
  await requireAdmin();
  const serviceId = formData.get("serviceId") as string;
  const staffId = formData.get("staffId") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const notes = (formData.get("notes") as string)?.trim() || null;
  const internalNotes = (formData.get("internalNotes") as string)?.trim() || null;
  const status = formData.get("status") as string;

  if (!serviceId || !staffId || !date || !time) return { error: "All appointment fields are required." };

  try {
    // Fetch existing appointment to detect what changed
    const existing = await prisma.appointment.findUnique({
      where: { id },
      include: {
        client: { select: { firstName: true, lastName: true, email: true, phone: true } },
        service: { select: { name: true, durationMinutes: true } },
        staff: { select: { id: true, name: true, googleCalendarId: true, calendarSyncEnabled: true } },
      },
    });
    if (!existing) return { error: "Appointment not found." };

    const service = await prisma.bookingService.findUnique({ where: { id: serviceId } });
    if (!service) return { error: "Service not found." };

    const startAt = bizLocalToUtc(date, time);
    const endAt = new Date(startAt.getTime() + service.durationMinutes * 60000);

    // Check for conflicts if time, date, or staff changed (exclude this appointment)
    const timeChanged = existing.startAt.getTime() !== startAt.getTime() || existing.endAt.getTime() !== endAt.getTime();
    const staffChanged = existing.staffId !== staffId;

    if (timeChanged || staffChanged) {
      const overlap = await prisma.appointment.findFirst({
        where: {
          id: { not: id },
          staffId,
          status: { in: ["pending", "confirmed"] },
          startAt: { lt: endAt },
          endAt: { gt: startAt },
        },
      });
      if (overlap) {
        return { error: "This time slot conflicts with another appointment. Please choose a different time." };
      }
    }

    // Update the appointment
    const updated = await prisma.appointment.update({
      where: { id },
      data: { serviceId, staffId, startAt, endAt, notes, internalNotes, status },
      include: {
        client: { select: { firstName: true, lastName: true, email: true, phone: true } },
        service: { select: { name: true, durationMinutes: true } },
      },
    });

    // ── Google Calendar sync ──────────────────────────────
    const isActive = status === "pending" || status === "confirmed";
    const wasCancelled = status === "cancelled" || status === "no_show";

    // If cancelled/no-show, delete the calendar event
    if (wasCancelled && existing.calendarEventId && existing.staff.calendarSyncEnabled) {
      await deleteCalendarEvent(
        existing.staffId,
        existing.calendarEventId,
        existing.staff.googleCalendarId,
      ).catch((err) => console.error("[Calendar] Delete on cancel:", err));
    }
    // If still active and staff changed, delete from old + create on new
    else if (isActive && staffChanged) {
      // Delete from old staff's calendar
      if (existing.calendarEventId && existing.staff.calendarSyncEnabled) {
        await deleteCalendarEvent(
          existing.staffId,
          existing.calendarEventId,
          existing.staff.googleCalendarId,
        ).catch((err) => console.error("[Calendar] Delete from old staff:", err));
      }

      // Create on new staff's calendar
      const newStaff = await prisma.staff.findUnique({
        where: { id: staffId },
        select: { id: true, name: true, googleCalendarId: true, calendarSyncEnabled: true },
      });
      if (newStaff?.calendarSyncEnabled) {
        await createCalendarEvent({
          id: updated.id,
          startAt: updated.startAt,
          endAt: updated.endAt,
          timezone: "America/New_York",
          notes: updated.notes,
          confirmationCode: existing.confirmationCode,
          client: updated.client,
          service: updated.service,
          staff: newStaff,
          calendarEventId: null,
        }).catch((err) => console.error("[Calendar] Create on new staff:", err));
      }
    }
    // If still active, same staff, but time/service changed, update the event
    else if (isActive && (timeChanged || existing.serviceId !== serviceId) && existing.calendarEventId) {
      const currentStaff = await prisma.staff.findUnique({
        where: { id: staffId },
        select: { id: true, name: true, googleCalendarId: true, calendarSyncEnabled: true },
      });
      if (currentStaff?.calendarSyncEnabled) {
        await updateCalendarEvent({
          id: updated.id,
          startAt: updated.startAt,
          endAt: updated.endAt,
          timezone: "America/New_York",
          notes: updated.notes,
          confirmationCode: existing.confirmationCode,
          client: updated.client,
          service: updated.service,
          staff: currentStaff,
          calendarEventId: existing.calendarEventId,
        }).catch((err) => console.error("[Calendar] Update event:", err));
      }
    }
    // If confirming a pending appointment that has no calendar event yet
    else if (status === "confirmed" && existing.status === "pending" && !existing.calendarEventId) {
      const currentStaff = await prisma.staff.findUnique({
        where: { id: staffId },
        select: { id: true, name: true, googleCalendarId: true, calendarSyncEnabled: true },
      });
      if (currentStaff?.calendarSyncEnabled) {
        await createCalendarEvent({
          id: updated.id,
          startAt: updated.startAt,
          endAt: updated.endAt,
          timezone: "America/New_York",
          notes: updated.notes,
          confirmationCode: existing.confirmationCode,
          client: updated.client,
          service: updated.service,
          staff: currentStaff,
          calendarEventId: null,
        }).catch((err) => console.error("[Calendar] Create on confirm:", err));
      }
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return { error: `Failed to update appointment: ${message}` };
  }

  revalidatePath("/admin/bookings");
  revalidatePath(`/admin/bookings/${id}`);
  redirect(`/admin/bookings/${id}`);
}
