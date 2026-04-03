import Link from "next/link";
import ArticleEditor from "../_components/ArticleEditor";
import { createArticleAction } from "../../_actions/articles";

export default function NewArticlePage() {
  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">New Article</span>
        <div className="admin-topbar-actions">
          <Link href="/admin/articles" className="admin-btn admin-btn-secondary admin-btn-sm">
            ← Back to Articles
          </Link>
        </div>
      </div>

      <div className="admin-content" style={{ maxWidth: "none" }}>
        <div className="admin-page-header">
          <h1 className="admin-page-title">New Article</h1>
        </div>
        <ArticleEditor action={createArticleAction} submitLabel="Create Article" />
      </div>
    </>
  );
}
