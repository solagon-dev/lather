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

export async function createServiceAction(formData: FormData): Promise<{ error: string } | void> {
  await requireAdmin();
  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;
  const durationMinutes = parseInt(formData.get("durationMinutes") as string, 10);
  const priceStr = formData.get("price") as string;
  const price = priceStr ? Math.round(parseFloat(priceStr) * 100) : null;
  const bufferBefore = parseInt(formData.get("bufferBeforeMinutes") as string, 10) || 0;
  const bufferAfter = parseInt(formData.get("bufferAfterMinutes") as string, 10) || 15;
  const tier = (formData.get("tier") as string)?.trim() || null;
  const sortOrder = parseInt(formData.get("sortOrder") as string, 10) || 0;

  if (!name || isNaN(durationMinutes)) return { error: "Name and duration are required." };

  try {
    await prisma.bookingService.create({
      data: { name, slug: slugify(name), description, durationMinutes, price, bufferBeforeMinutes: bufferBefore, bufferAfterMinutes: bufferAfter, tier, sortOrder, isActive: true },
    });
  } catch (e) {
    return { error: e instanceof Error && e.message.includes("Unique") ? "A service with this name already exists." : "Failed to create service." };
  }

  revalidatePath("/admin/services");
  revalidatePath("/admin/staff");
  revalidatePath("/admin/bookings");
  revalidatePath("/book");
  revalidatePath("/treatments");
  redirect("/admin/services");
}

export async function updateServiceAction(id: string, formData: FormData): Promise<{ error: string } | void> {
  await requireAdmin();
  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;
  const durationMinutes = parseInt(formData.get("durationMinutes") as string, 10);
  const priceStr = formData.get("price") as string;
  const price = priceStr ? Math.round(parseFloat(priceStr) * 100) : null;
  const bufferBefore = parseInt(formData.get("bufferBeforeMinutes") as string, 10) || 0;
  const bufferAfter = parseInt(formData.get("bufferAfterMinutes") as string, 10) || 15;
  const tier = (formData.get("tier") as string)?.trim() || null;
  const sortOrder = parseInt(formData.get("sortOrder") as string, 10) || 0;
  const isActive = formData.get("isActive") === "true";

  if (!name || isNaN(durationMinutes)) return { error: "Name and duration are required." };

  try {
    await prisma.bookingService.update({
      where: { id },
      data: { name, slug: slugify(name), description, durationMinutes, price, bufferBeforeMinutes: bufferBefore, bufferAfterMinutes: bufferAfter, tier, sortOrder, isActive },
    });
  } catch {
    return { error: "Failed to update service." };
  }

  revalidatePath("/admin/services");
  revalidatePath("/admin/staff");
  revalidatePath("/admin/bookings");
  revalidatePath("/book");
  revalidatePath("/treatments");
  redirect("/admin/services");
}

export async function deleteServiceAction(id: string): Promise<{ error: string } | void> {
  await requireAdmin();
  try {
    await prisma.staffService.deleteMany({ where: { serviceId: id } });
    await prisma.bookingService.delete({ where: { id } });
  } catch {
    return { error: "Cannot delete service — it may have existing appointments." };
  }
  revalidatePath("/admin/services");
  revalidatePath("/admin/staff");
  revalidatePath("/admin/bookings");
  revalidatePath("/book");
  revalidatePath("/treatments");
}
