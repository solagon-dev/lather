"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function createGalleryItemAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error: string } | { success: true }> {
  await requireAdmin();

  const imageUrl = (formData.get("imageUrl") as string)?.trim();
  if (!imageUrl) return { error: "Image URL is required." };

  try {
    await prisma.galleryItem.create({
      data: {
        imageUrl,
        altText: (formData.get("altText") as string)?.trim() || null,
        caption: (formData.get("caption") as string)?.trim() || null,
        category: (formData.get("category") as string)?.trim() || null,
        sortOrder: parseInt((formData.get("sortOrder") as string) || "0", 10),
        isFeatured: formData.get("isFeatured") === "true",
      },
    });
  } catch {
    return { error: "Failed to add image. Please try again." };
  }

  revalidatePath("/admin/gallery");
  return { success: true };
}

export async function updateGalleryItemAction(
  id: string,
  _prev: unknown,
  formData: FormData
): Promise<{ error: string } | { success: true }> {
  await requireAdmin();

  const imageUrl = (formData.get("imageUrl") as string)?.trim();
  if (!imageUrl) return { error: "Image URL is required." };

  try {
    await prisma.galleryItem.update({
      where: { id },
      data: {
        imageUrl,
        altText: (formData.get("altText") as string)?.trim() || null,
        caption: (formData.get("caption") as string)?.trim() || null,
        category: (formData.get("category") as string)?.trim() || null,
        sortOrder: parseInt((formData.get("sortOrder") as string) || "0", 10),
        isFeatured: formData.get("isFeatured") === "true",
      },
    });
  } catch {
    return { error: "Failed to update image. Please try again." };
  }

  revalidatePath("/admin/gallery");
  return { success: true };
}

export async function deleteGalleryItemAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.galleryItem.delete({ where: { id } });
  revalidatePath("/admin/gallery");
}

export async function reorderGalleryItemAction(
  id: string,
  sortOrder: number
): Promise<void> {
  await requireAdmin();
  await prisma.galleryItem.update({
    where: { id },
    data: { sortOrder },
  });
  revalidatePath("/admin/gallery");
}
