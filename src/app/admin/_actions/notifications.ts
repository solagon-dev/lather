"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import {
  sendBookingConfirmationEmail,
  sendBookingConfirmationSMS,
  type AppointmentData,
} from "@/lib/notifications";

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
}

async function getAppointmentData(id: string): Promise<AppointmentData | null> {
  const appt = await prisma.appointment.findUnique({
    where: { id },
    include: {
      client: { select: { firstName: true, lastName: true, email: true, phone: true } },
      service: { select: { name: true, durationMinutes: true, price: true } },
      staff: { select: { name: true } },
    },
  });

  if (!appt) return null;

  return {
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
}

export async function resendConfirmationEmailAction(appointmentId: string): Promise<{ error?: string; success?: boolean }> {
  await requireAdmin();

  const appt = await getAppointmentData(appointmentId);
  if (!appt) return { error: "Appointment not found." };

  const sent = await sendBookingConfirmationEmail(appt);
  revalidatePath(`/admin/bookings/${appointmentId}`);

  return sent ? { success: true } : { error: "Failed to send email. Check Resend configuration." };
}

export async function resendConfirmationSMSAction(appointmentId: string): Promise<{ error?: string; success?: boolean }> {
  await requireAdmin();

  const appt = await getAppointmentData(appointmentId);
  if (!appt) return { error: "Appointment not found." };

  if (!appt.client.phone) return { error: "Client has no phone number." };

  const sent = await sendBookingConfirmationSMS(appt);
  revalidatePath(`/admin/bookings/${appointmentId}`);

  return sent ? { success: true } : { error: "Failed to send SMS. Check Twilio configuration." };
}
