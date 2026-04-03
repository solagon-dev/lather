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

export async function createTestimonialAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error: string } | { success: true }> {
  await requireAdmin();

  const clientName = (formData.get("clientName") as string)?.trim();
  const testimonialText = (formData.get("testimonialText") as string)?.trim();

  if (!clientName) return { error: "Client name is required." };
  if (!testimonialText) return { error: "Testimonial text is required." };

  const ratingRaw = formData.get("rating") as string;
  const rating = ratingRaw ? parseInt(ratingRaw, 10) : null;

  try {
    await prisma.testimonial.create({
      data: {
        clientName,
        testimonialText,
        rating: rating && !isNaN(rating) ? rating : null,
        location: (formData.get("location") as string)?.trim() || null,
        serviceUsed: (formData.get("serviceUsed") as string)?.trim() || null,
        isFeatured: formData.get("isFeatured") === "true",
      },
    });
  } catch {
    return { error: "Failed to create testimonial. Please try again." };
  }

  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function updateTestimonialAction(
  id: string,
  _prev: unknown,
  formData: FormData
): Promise<{ error: string } | { success: true }> {
  await requireAdmin();

  const clientName = (formData.get("clientName") as string)?.trim();
  const testimonialText = (formData.get("testimonialText") as string)?.trim();

  if (!clientName) return { error: "Client name is required." };
  if (!testimonialText) return { error: "Testimonial text is required." };

  const ratingRaw = formData.get("rating") as string;
  const rating = ratingRaw ? parseInt(ratingRaw, 10) : null;

  try {
    await prisma.testimonial.update({
      where: { id },
      data: {
        clientName,
        testimonialText,
        rating: rating && !isNaN(rating) ? rating : null,
        location: (formData.get("location") as string)?.trim() || null,
        serviceUsed: (formData.get("serviceUsed") as string)?.trim() || null,
        isFeatured: formData.get("isFeatured") === "true",
      },
    });
  } catch {
    return { error: "Failed to update testimonial. Please try again." };
  }

  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function deleteTestimonialAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
}

export async function toggleFeaturedAction(
  id: string,
  current: boolean
): Promise<void> {
  await requireAdmin();
  await prisma.testimonial.update({
    where: { id },
    data: { isFeatured: !current },
  });
  revalidatePath("/admin/testimonials");
}
