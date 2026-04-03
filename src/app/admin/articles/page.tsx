import Link from "next/link";
import { prisma } from "@/lib/db";
import { toggleArticleStatusAction } from "../_actions/articles";
import DeleteButton from "./_components/DeleteButton";

async function getArticles() {
  try {
    return await prisma.article.findMany({
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        status: true,
        readingTime: true,
        publishedAt: true,
        updatedAt: true,
      },
    });
  } catch {
    return null;
  }
}

export default async function ArticlesAdminPage() {
  const articles = await getArticles();
  const dbError = articles === null;

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Articles</span>
        <div className="admin-topbar-actions">
          <Link href="/admin/articles/new" className="admin-btn admin-btn-primary admin-btn-sm">
            + New Article
          </Link>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Articles</h1>
            <p className="admin-page-sub">
              {dbError ? "Database not connected." : `${articles.length} article${articles.length !== 1 ? "s" : ""} total`}
            </p>
          </div>
        </div>

        {dbError && (
          <div className="admin-alert admin-alert-error">
            <span>⚠</span>
            <span>Could not load articles. Check your database connection.</span>
          </div>
        )}

        {!dbError && articles.length === 0 && (
          <div className="admin-card">
            <div className="admin-empty">
              <div className="admin-empty-icon">✦</div>
              <p className="admin-empty-title">No articles yet</p>
              <p className="admin-empty-sub">
                Run <code>npm run db:seed</code> to populate with initial content, or write your first article.
              </p>
              <Link href="/admin/articles/new" className="admin-btn admin-btn-primary">
                Write First Article
              </Link>
            </div>
          </div>
        )}

        {!dbError && articles.length > 0 && (
          <div className="admin-card" style={{ padding: 0 }}>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ paddingLeft: "24px" }}>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Reading Time</th>
                    <th>Updated</th>
                    <th style={{ textAlign: "right", paddingRight: "24px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article.id}>
                      <td style={{ paddingLeft: "24px" }}>
                        <div>
                          <span style={{ fontWeight: 400, display: "block", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {article.title}
                          </span>
                          <span style={{ fontSize: "0.72rem", color: "#8C7B6B", fontFamily: "monospace" }}>
                            /articles/{article.slug}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: "0.78rem", color: "#8C7B6B" }}>
                          {article.category ?? "—"}
                        </span>
                      </td>
                      <td>
                        <span className={`admin-badge ${article.status === "published" ? "admin-badge-published" : "admin-badge-draft"}`}>
                          {article.status}
                        </span>
                      </td>
                      <td style={{ color: "#8C7B6B", fontSize: "0.82rem" }}>
                        {article.readingTime ? `${article.readingTime} min` : "—"}
                      </td>
                      <td style={{ color: "#8C7B6B", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                        {article.updatedAt.toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric",
                        })}
                      </td>
                      <td style={{ paddingRight: "24px" }}>
                        <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end", flexWrap: "wrap" }}>
                          <Link
                            href={`/admin/articles/${article.id}/edit`}
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                          >
                            Edit
                          </Link>
                          <form action={toggleArticleStatusAction.bind(null, article.id, article.status)}>
                            <button type="submit" className="admin-btn admin-btn-secondary admin-btn-sm">
                              {article.status === "published" ? "Unpublish" : "Publish"}
                            </button>
                          </form>
                          {article.status === "published" && (
                            <a
                              href={`/journal/${article.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="admin-btn admin-btn-ghost admin-btn-sm"
                            >
                              View →
                            </a>
                          )}
                          <DeleteButton articleId={article.id} title={article.title} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
