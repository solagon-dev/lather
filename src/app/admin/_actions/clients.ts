"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { bizLocalToUtc } from "@/lib/timezone";

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
    const service = await prisma.bookingService.findUnique({ where: { id: serviceId } });
    if (!service) return { error: "Service not found." };

    const startAt = bizLocalToUtc(date, time);
    const endAt = new Date(startAt.getTime() + service.durationMinutes * 60000);

    await prisma.appointment.update({
      where: { id },
      data: { serviceId, staffId, startAt, endAt, notes, internalNotes, status },
    });
  } catch {
    return { error: "Failed to update appointment." };
  }

  revalidatePath("/admin/bookings");
  revalidatePath(`/admin/bookings/${id}`);
  redirect(`/admin/bookings/${id}`);
}
