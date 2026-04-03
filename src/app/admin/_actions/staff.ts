"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function createStaffAction(formData: FormData): Promise<{ error: string } | void> {
  await requireAdmin();
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const phone = (formData.get("phone") as string)?.trim() || null;
  const bio = (formData.get("bio") as string)?.trim() || null;
  const image = (formData.get("image") as string)?.trim() || null;
  const timezone = (formData.get("timezone") as string)?.trim() || "America/New_York";
  const serviceIds = formData.getAll("serviceIds") as string[];

  if (!name || !email) return { error: "Name and email are required." };

  try {
    const staff = await prisma.staff.create({
      data: { name, slug: slugify(name), email, phone, bio, image, timezone, isActive: true },
    });
    if (serviceIds.length > 0) {
      await prisma.staffService.createMany({
        data: serviceIds.map((serviceId) => ({ staffId: staff.id, serviceId })),
        skipDuplicates: true,
      });
    }
  } catch (e) {
    return { error: e instanceof Error && e.message.includes("Unique") ? "A staff member with this email already exists." : "Failed to create staff." };
  }

  revalidatePath("/admin/staff");
  redirect("/admin/staff");
}

export async function updateStaffAction(id: string, formData: FormData): Promise<{ error: string } | void> {
  await requireAdmin();
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const phone = (formData.get("phone") as string)?.trim() || null;
  const bio = (formData.get("bio") as string)?.trim() || null;
  const image = (formData.get("image") as string)?.trim() || null;
  const timezone = (formData.get("timezone") as string)?.trim() || "America/New_York";
  const isActive = formData.get("isActive") === "true";
  const serviceIds = formData.getAll("serviceIds") as string[];

  if (!name || !email) return { error: "Name and email are required." };

  try {
    await prisma.staff.update({
      where: { id },
      data: { name, slug: slugify(name), email, phone, bio, image, timezone, isActive },
    });
    // Replace service assignments
    await prisma.staffService.deleteMany({ where: { staffId: id } });
    if (serviceIds.length > 0) {
      await prisma.staffService.createMany({
        data: serviceIds.map((serviceId) => ({ staffId: id, serviceId })),
        skipDuplicates: true,
      });
    }
  } catch {
    return { error: "Failed to update staff." };
  }

  revalidatePath("/admin/staff");
  redirect("/admin/staff");
}

export async function toggleStaffActiveAction(id: string, isActive: boolean): Promise<void> {
  await requireAdmin();
  await prisma.staff.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/staff");
}
