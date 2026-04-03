"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { checkSlotConflict } from "@/lib/availability";
import { bizLocalToUtc } from "@/lib/timezone";

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

function generateConfirmationCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "LTH-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function createBookingAction(
  formData: FormData,
): Promise<{ error: string } | void> {
  await requireAdmin();

  const firstName = (formData.get("firstName") as string)?.trim();
  const lastName = (formData.get("lastName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const phone = (formData.get("phone") as string)?.trim() || null;
  const serviceId = formData.get("serviceId") as string;
  const staffId = formData.get("staffId") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const notes = (formData.get("notes") as string)?.trim() || null;
  const internalNotes =
    (formData.get("internalNotes") as string)?.trim() || null;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !serviceId ||
    !staffId ||
    !date ||
    !time
  ) {
    return { error: "Please fill in all required fields." };
  }

  try {
    // ── Conflict check (same rules as public bookings) ───
    const conflict = await checkSlotConflict(date, time, serviceId, staffId);
    if (!conflict.ok) {
      return { error: conflict.reason };
    }

    // ── Get service for duration ─────────────────────────
    const service = await prisma.bookingService.findUnique({
      where: { id: serviceId },
    });
    if (!service) return { error: "Selected service not found." };

    const startAt = bizLocalToUtc(date, time);
    const endAt = new Date(
      startAt.getTime() + service.durationMinutes * 60 * 1000,
    );

    // ── Transactional creation ───────────────────────────
    await prisma.$transaction(async (tx) => {
      // Find or create client
      let client = await tx.client.findUnique({ where: { email } });
      if (!client) {
        client = await tx.client.create({
          data: { firstName, lastName, email, phone },
        });
      }

      // Final overlap guard inside transaction
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

      await tx.appointment.create({
        data: {
          confirmationCode: generateConfirmationCode(),
          clientId: client.id,
          serviceId,
          staffId,
          status: "confirmed", // admin bookings auto-confirm
          startAt,
          endAt,
          notes,
          internalNotes,
          source: "admin",
        },
      });
    });
  } catch (e) {
    if (e instanceof Error && e.message === "SLOT_TAKEN") {
      return { error: "This time slot is already booked. Please choose another time." };
    }
    const message = e instanceof Error ? e.message : "Unknown error";
    return { error: `Failed to create booking: ${message}` };
  }

  revalidatePath("/admin/bookings");
  redirect("/admin/bookings");
}

export async function updateBookingStatusAction(
  id: string,
  status: string,
): Promise<{ error: string } | void> {
  await requireAdmin();

  const validStatuses = [
    "pending",
    "confirmed",
    "completed",
    "no_show",
    "cancelled",
  ];
  if (!validStatuses.includes(status)) {
    return { error: "Invalid status." };
  }

  try {
    await prisma.appointment.update({
      where: { id },
      data: { status },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return { error: `Failed to update status: ${message}` };
  }

  revalidatePath("/admin/bookings");
}

export async function deleteBookingAction(
  id: string,
): Promise<{ error: string } | void> {
  await requireAdmin();

  try {
    await prisma.notificationLog.deleteMany({
      where: { appointmentId: id },
    });
    await prisma.appointment.delete({ where: { id } });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return { error: `Failed to delete booking: ${message}` };
  }

  revalidatePath("/admin/bookings");
  redirect("/admin/bookings");
}
