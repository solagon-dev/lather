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

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function estimateReadingTime(content: string): number {
  const wordCount = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / 200));
}

export async function createArticleAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error: string } | never> {
  await requireAdmin();

  const title = (formData.get("title") as string)?.trim();
  const slugInput = (formData.get("slug") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();

  if (!title) return { error: "Title is required." };
  if (!content) return { error: "Content is required." };

  const slug = slugInput || generateSlug(title);
  const status = formData.get("status") as string || "draft";
  const now = new Date();

  try {
    await prisma.article.create({
      data: {
        title,
        slug,
        excerpt: (formData.get("excerpt") as string)?.trim() || null,
        content,
        featuredImage: (formData.get("featuredImage") as string)?.trim() || null,
        featuredImageAlt: (formData.get("featuredImageAlt") as string)?.trim() || null,
        category: (formData.get("category") as string)?.trim() || null,
        tags: (formData.get("tags") as string)
          ?.split(",")
          .map((t) => t.trim())
          .filter(Boolean) ?? [],
        authorName: (formData.get("authorName") as string)?.trim() || "Lather Head Spa",
        status,
        publishedAt: status === "published" ? now : null,
        seoTitle: (formData.get("seoTitle") as string)?.trim() || null,
        seoDescription: (formData.get("seoDescription") as string)?.trim() || null,
        canonicalUrl: (formData.get("canonicalUrl") as string)?.trim() || null,
        readingTime: estimateReadingTime(content),
      },
    });
  } catch (e: unknown) {
    if (e && typeof e === "object" && "code" in e && e.code === "P2002") {
      return { error: "A post with this slug already exists. Please use a different slug." };
    }
    return { error: "Failed to create article. Please try again." };
  }

  revalidatePath("/admin/articles");
  revalidatePath("/journal");
  redirect("/admin/articles");
}

export async function updateArticleAction(
  id: string,
  _prev: unknown,
  formData: FormData
): Promise<{ error: string } | never> {
  await requireAdmin();

  const title = (formData.get("title") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();

  if (!title) return { error: "Title is required." };
  if (!content) return { error: "Content is required." };

  const slug = (formData.get("slug") as string)?.trim() || generateSlug(title);
  const status = formData.get("status") as string || "draft";

  try {
    const existing = await prisma.article.findUnique({ where: { id } });
    const publishedAt =
      status === "published" && !existing?.publishedAt
        ? new Date()
        : existing?.publishedAt ?? null;

    await prisma.article.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt: (formData.get("excerpt") as string)?.trim() || null,
        content,
        featuredImage: (formData.get("featuredImage") as string)?.trim() || null,
        featuredImageAlt: (formData.get("featuredImageAlt") as string)?.trim() || null,
        category: (formData.get("category") as string)?.trim() || null,
        tags: (formData.get("tags") as string)
          ?.split(",")
          .map((t) => t.trim())
          .filter(Boolean) ?? [],
        authorName: (formData.get("authorName") as string)?.trim() || "Lather Head Spa",
        status,
        publishedAt,
        seoTitle: (formData.get("seoTitle") as string)?.trim() || null,
        seoDescription: (formData.get("seoDescription") as string)?.trim() || null,
        canonicalUrl: (formData.get("canonicalUrl") as string)?.trim() || null,
        readingTime: estimateReadingTime(content),
      },
    });
  } catch (e: unknown) {
    if (e && typeof e === "object" && "code" in e && e.code === "P2002") {
      return { error: "A post with this slug already exists." };
    }
    return { error: "Failed to update article. Please try again." };
  }

  revalidatePath("/admin/articles");
  revalidatePath(`/journal/${slug}`);
  revalidatePath("/journal");
  redirect("/admin/articles");
}

export async function deleteArticleAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/articles");
  revalidatePath("/journal");
}

export async function toggleArticleStatusAction(
  id: string,
  currentStatus: string
): Promise<void> {
  await requireAdmin();
  const newStatus = currentStatus === "published" ? "draft" : "published";
  await prisma.article.update({
    where: { id },
    data: {
      status: newStatus,
      publishedAt: newStatus === "published" ? new Date() : undefined,
    },
  });
  revalidatePath("/admin/articles");
  revalidatePath("/journal");
}
