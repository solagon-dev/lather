"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
}

export async function updateAvailabilityRuleAction(
  id: string,
  formData: FormData,
): Promise<{ error: string } | void> {
  await requireAdmin();
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;
  const isActive = formData.get("isActive") === "true";

  try {
    await prisma.availabilityRule.update({
      where: { id },
      data: { startTime, endTime, isActive },
    });
  } catch {
    return { error: "Failed to update rule." };
  }
  revalidatePath("/admin/availability");
  revalidatePath("/book");
}

export async function createAvailabilityRuleAction(
  formData: FormData,
): Promise<{ error: string } | void> {
  await requireAdmin();
  const staffId = (formData.get("staffId") as string) || null;
  const dayOfWeek = parseInt(formData.get("dayOfWeek") as string, 10);
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;

  if (isNaN(dayOfWeek) || !startTime || !endTime)
    return { error: "All fields are required." };

  try {
    await prisma.availabilityRule.create({
      data: { staffId: staffId || null, dayOfWeek, startTime, endTime, isActive: true },
    });
  } catch {
    return { error: "Failed to create rule." };
  }
  revalidatePath("/admin/availability");
  revalidatePath("/book");
}

export async function deleteAvailabilityRuleAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.availabilityRule.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/availability");
  revalidatePath("/book");
}

export async function createBlackoutAction(
  formData: FormData,
): Promise<{ error: string } | void> {
  await requireAdmin();
  const title = (formData.get("title") as string)?.trim();
  const staffId = (formData.get("staffId") as string) || null;
  const startDate = formData.get("startDate") as string;
  const startTime = (formData.get("startTime") as string) || "00:00";
  const endDate = formData.get("endDate") as string;
  const endTime = (formData.get("endTime") as string) || "23:59";
  const reason = (formData.get("reason") as string)?.trim() || null;

  if (!title || !startDate || !endDate)
    return { error: "Title and dates are required." };

  try {
    await prisma.blackout.create({
      data: {
        title,
        staffId: staffId || null,
        startAt: new Date(`${startDate}T${startTime}:00`),
        endAt: new Date(`${endDate}T${endTime}:00`),
        reason,
      },
    });
  } catch {
    return { error: "Failed to create blackout." };
  }
  revalidatePath("/admin/availability");
  revalidatePath("/book");
}

export async function deleteBlackoutAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.blackout.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/availability");
  revalidatePath("/book");
}
