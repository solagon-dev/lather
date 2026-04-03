"use client";

import { deleteArticleAction } from "../../_actions/articles";

export default function DeleteButton({ articleId, title }: { articleId: string; title: string }) {
  return (
    <form
      action={deleteArticleAction.bind(null, articleId)}
      onSubmit={(e) => {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className="admin-btn admin-btn-danger admin-btn-sm">
        Delete
      </button>
    </form>
  );
}
