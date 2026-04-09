"use client";

import { useState, useRef, useTransition, useActionState } from "react";

interface ArticleData {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  category?: string;
  tags?: string[];
  authorName?: string;
  status?: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  publishedAt?: Date | null;
}

interface ArticleEditorProps {
  article?: ArticleData;
  action: (prev: unknown, formData: FormData) => Promise<{ error: string } | never>;
  submitLabel?: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

type ToolbarCommand = "h2" | "h3" | "bold" | "italic" | "link" | "blockquote" | "ul" | "p";

const TOOLBAR_ITEMS: Array<{ label: string; cmd: ToolbarCommand; title: string } | "sep"> = [
  { label: "H2", cmd: "h2", title: "Heading 2" },
  { label: "H3", cmd: "h3", title: "Heading 3" },
  "sep",
  { label: "B", cmd: "bold", title: "Bold" },
  { label: "I", cmd: "italic", title: "Italic" },
  "sep",
  { label: "¶", cmd: "p", title: "Paragraph" },
  { label: "❝", cmd: "blockquote", title: "Blockquote" },
  { label: "• List", cmd: "ul", title: "Unordered list" },
  "sep",
  { label: "Link", cmd: "link", title: "Link" },
];

const TAG_MAP: Record<ToolbarCommand, [string, string]> = {
  h2: ["<h2>", "</h2>"],
  h3: ["<h3>", "</h3>"],
  bold: ["<strong>", "</strong>"],
  italic: ["<em>", "</em>"],
  p: ["<p>", "</p>"],
  blockquote: ["<blockquote>\n<p>", "</p>\n</blockquote>"],
  ul: ["<ul>\n  <li>", "</li>\n</ul>"],
  link: ['<a href="URL">', "</a>"],
};

export default function ArticleEditor({ article, action, submitLabel = "Save" }: ArticleEditorProps) {
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugManual, setSlugManual] = useState(!!article?.slug);
  const [content, setContent] = useState(article?.content ?? "");
  const [seoTitle, setSeoTitle] = useState(article?.seoTitle ?? "");
  const [seoDesc, setSeoDesc] = useState(article?.seoDescription ?? "");
  const [status, setStatus] = useState(article?.status ?? "draft");
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [isPending, startTransition] = useTransition();

  const [formState, formAction] = useActionState(action, null);

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!slugManual) {
      setSlug(generateSlug(val));
    }
    if (!seoTitle) setSeoTitle(val);
  }

  function insertFormat(cmd: ToolbarCommand) {
    const ta = contentRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.substring(start, end);
    const [open, close] = TAG_MAP[cmd];
    const newContent =
      content.substring(0, start) +
      open +
      (selected || "text") +
      close +
      content.substring(end);
    setContent(newContent);
    setTimeout(() => {
      ta.focus();
      const newCursor = start + open.length + (selected || "text").length + close.length;
      ta.setSelectionRange(newCursor, newCursor);
    }, 0);
  }

  const seotitleCount = seoTitle.length;
  const seoDescCount = seoDesc.length;

  return (
    <form action={formAction}>
      {/* Hidden fields */}
      <input type="hidden" name="status" value={status} />
      <input type="hidden" name="content" value={content} />

      {formState && "error" in formState && (
        <div className="admin-alert admin-alert-error" style={{ marginBottom: "24px" }}>
          <span>⚠</span>
          <span>{formState.error}</span>
        </div>
      )}

      <div className="editor-main-grid" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "24px", alignItems: "start" }}>
        {/* Main editor column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Title */}
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="title">Title *</label>
            <input
              id="title"
              name="title"
              className="admin-input"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter article title"
              required
              style={{ fontSize: "1rem", padding: "12px" }}
            />
          </div>

          {/* Slug */}
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="slug">
              URL Slug *
              <span className="admin-label-sub"> — auto-generated from title, or edit manually</span>
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                id="slug"
                name="slug"
                className="admin-input"
                value={slug}
                onChange={(e) => { setSlug(e.target.value); setSlugManual(true); }}
                placeholder="url-slug-here"
                required
                style={{ fontFamily: "monospace", fontSize: "0.82rem" }}
              />
              <button
                type="button"
                className="admin-btn admin-btn-secondary admin-btn-sm"
                onClick={() => { setSlug(generateSlug(title)); setSlugManual(false); }}
                style={{ flexShrink: 0 }}
              >
                Auto
              </button>
            </div>
            {slug && (
              <span className="admin-label-sub">/articles/{slug}</span>
            )}
          </div>

          {/* Excerpt */}
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="excerpt">Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              className="admin-textarea"
              defaultValue={article?.excerpt ?? ""}
              placeholder="2–3 sentence summary shown in article listings"
              rows={3}
              style={{ minHeight: "80px" }}
            />
          </div>

          {/* Featured image */}
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="featuredImage">Featured Image URL</label>
            <input
              id="featuredImage"
              name="featuredImage"
              className="admin-input"
              defaultValue={article?.featuredImage ?? ""}
              placeholder="https://images.pexels.com/..."
              type="url"
            />
            <span className="admin-label-sub">Paste a direct image URL from Pexels, Unsplash, or your CDN</span>
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="featuredImageAlt">Featured Image Alt Text</label>
            <input
              id="featuredImageAlt"
              name="featuredImageAlt"
              className="admin-input"
              defaultValue={article?.featuredImageAlt ?? ""}
              placeholder="Describe the image for accessibility"
            />
          </div>

          {/* Content editor */}
          <div className="admin-form-group">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
              <label className="admin-label">Content *</label>
              <div style={{ display: "flex", gap: "4px" }}>
                {(["write", "preview"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`admin-btn admin-btn-sm ${activeTab === tab ? "admin-btn-secondary" : "admin-btn-ghost"}`}
                    onClick={() => setActiveTab(tab)}
                    style={{ textTransform: "capitalize", letterSpacing: "0.05em" }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "write" ? (
              <>
                <div className="editor-toolbar">
                  {TOOLBAR_ITEMS.map((item, i) =>
                    item === "sep" ? (
                      <span key={`sep-${i}`} className="editor-toolbar-sep" />
                    ) : (
                      <button
                        key={item.cmd}
                        type="button"
                        className="editor-toolbar-btn"
                        title={item.title}
                        onClick={() => insertFormat(item.cmd)}
                      >
                        {item.label}
                      </button>
                    )
                  )}
                </div>
                <textarea
                  ref={contentRef}
                  className="admin-textarea admin-content-textarea"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article content here using HTML tags. Use the toolbar buttons above to insert formatting."
                  style={{ borderTop: "none" }}
                />
              </>
            ) : (
              <div
                className="article-content"
                style={{
                  minHeight: "480px",
                  padding: "24px",
                  background: "#fff",
                  border: "1px solid #DDD8D1",
                  overflowY: "auto",
                }}
                dangerouslySetInnerHTML={{ __html: content || "<p style='color:#8C7B6B;font-style:italic;'>Nothing to preview yet.</p>" }}
              />
            )}
          </div>
        </div>

        {/* Sidebar options column */}
        <div className="editor-sidebar-col" style={{ display: "flex", flexDirection: "column", gap: "16px", position: "sticky", top: "76px" }}>

          {/* Publish panel */}
          <div className="admin-card">
            <div className="admin-card-header">
              <span className="admin-card-title">Publish</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div className="admin-form-group">
                <label className="admin-label">Status</label>
                <select
                  className="admin-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <hr className="admin-divider" style={{ margin: "4px 0" }} />

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button
                  type="submit"
                  disabled={isPending}
                  className="admin-btn admin-btn-primary"
                  style={{ flex: 1, justifyContent: "center" }}
                  onClick={() => startTransition(() => {})}
                >
                  {isPending ? "Saving…" : submitLabel}
                </button>
              </div>

              {article?.id && status === "published" && article?.slug && (
                <a
                  href={`/journal/${article.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-btn admin-btn-secondary"
                  style={{ justifyContent: "center", textAlign: "center" }}
                >
                  Preview →
                </a>
              )}
            </div>
          </div>

          {/* Taxonomy panel */}
          <div className="admin-card">
            <div className="admin-card-header">
              <span className="admin-card-title">Taxonomy</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div className="admin-form-group">
                <label className="admin-label" htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  className="admin-select"
                  defaultValue={article?.category ?? ""}
                >
                  <option value="">Select category</option>
                  <option value="Education">Education</option>
                  <option value="Hair Wellness">Hair Wellness</option>
                  <option value="Experience">Experience</option>
                  <option value="Wellness">Wellness</option>
                  <option value="Lifestyle">Lifestyle</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-label" htmlFor="tags">Tags</label>
                <input
                  id="tags"
                  name="tags"
                  className="admin-input"
                  defaultValue={article?.tags?.join(", ") ?? ""}
                  placeholder="head spa, scalp care, wellness"
                />
                <span className="admin-label-sub">Comma-separated</span>
              </div>

              <div className="admin-form-group">
                <label className="admin-label" htmlFor="authorName">Author</label>
                <input
                  id="authorName"
                  name="authorName"
                  className="admin-input"
                  defaultValue={article?.authorName ?? "Lather Head Spa"}
                />
              </div>
            </div>
          </div>

          {/* SEO panel */}
          <div className="admin-card">
            <div className="admin-card-header">
              <span className="admin-card-title">SEO</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div className="admin-form-group">
                <label className="admin-label" htmlFor="seoTitle">SEO Title</label>
                <input
                  id="seoTitle"
                  name="seoTitle"
                  className="admin-input"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Title for search engines"
                />
                <span className={`admin-char-count ${seotitleCount > 60 ? "over" : ""}`}>
                  {seotitleCount}/60
                </span>
              </div>

              <div className="admin-form-group">
                <label className="admin-label" htmlFor="seoDescription">Meta Description</label>
                <textarea
                  id="seoDescription"
                  name="seoDescription"
                  className="admin-textarea"
                  value={seoDesc}
                  onChange={(e) => setSeoDesc(e.target.value)}
                  placeholder="150–160 character description for search results"
                  rows={3}
                  style={{ minHeight: "80px" }}
                />
                <span className={`admin-char-count ${seoDescCount > 160 ? "over" : ""}`}>
                  {seoDescCount}/160
                </span>
              </div>

              <div className="admin-form-group">
                <label className="admin-label" htmlFor="canonicalUrl">Canonical URL</label>
                <input
                  id="canonicalUrl"
                  name="canonicalUrl"
                  className="admin-input"
                  defaultValue={article?.canonicalUrl ?? ""}
                  placeholder="https://www.latherspas.com/articles/..."
                  type="url"
                  style={{ fontSize: "0.75rem" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
