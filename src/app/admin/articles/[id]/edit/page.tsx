import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ArticleEditor from "../../_components/ArticleEditor";
import { updateArticleAction } from "../../../_actions/articles";

type Props = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;

  let article;
  try {
    article = await prisma.article.findUnique({ where: { id } });
  } catch {
    return (
      <div className="admin-content">
        <div className="admin-alert admin-alert-error">
          Database not connected.
        </div>
      </div>
    );
  }

  if (!article) notFound();

  const updateWithId = updateArticleAction.bind(null, article.id);

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Edit Article</span>
        <div className="admin-topbar-actions">
          {article.status === "published" && (
            <a
              href={`/journal/${article.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn admin-btn-secondary admin-btn-sm"
            >
              View Live →
            </a>
          )}
          <Link href="/admin/articles" className="admin-btn admin-btn-secondary admin-btn-sm">
            ← Articles
          </Link>
        </div>
      </div>

      <div className="admin-content" style={{ maxWidth: "none" }}>
        <div className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Edit Article</h1>
            <p className="admin-page-sub" style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
              /articles/{article.slug}
            </p>
          </div>
        </div>

        <ArticleEditor
          article={{
            id: article.id,
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt ?? undefined,
            content: article.content,
            featuredImage: article.featuredImage ?? undefined,
            featuredImageAlt: article.featuredImageAlt ?? undefined,
            category: article.category ?? undefined,
            tags: article.tags,
            authorName: article.authorName,
            status: article.status,
            seoTitle: article.seoTitle ?? undefined,
            seoDescription: article.seoDescription ?? undefined,
            canonicalUrl: article.canonicalUrl ?? undefined,
            publishedAt: article.publishedAt,
          }}
          action={updateWithId}
          submitLabel="Save Changes"
        />
      </div>
    </>
  );
}
