"use client";

import { useState, useTransition, useActionState } from "react";
import Image from "next/image";
import {
  createGalleryItemAction,
  updateGalleryItemAction,
  deleteGalleryItemAction,
} from "../../_actions/gallery";

interface GalleryItem {
  id: string;
  imageUrl: string;
  altText: string | null;
  caption: string | null;
  category: string | null;
  sortOrder: number;
  isFeatured: boolean;
}

const CATEGORIES = ["Treatment", "Space", "Product", "Team", "Event", "Other"];

function GalleryItemForm({
  item,
  onClose,
}: {
  item?: GalleryItem;
  onClose: () => void;
}) {
  const action = item
    ? updateGalleryItemAction.bind(null, item.id)
    : createGalleryItemAction;

  const [state, formAction] = useActionState(action, null);
  const [isFeatured, setIsFeatured] = useState(item?.isFeatured ?? false);
  const [preview, setPreview] = useState(item?.imageUrl ?? "");

  if (state && "success" in state) {
    onClose();
    return null;
  }

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <input type="hidden" name="isFeatured" value={String(isFeatured)} />

      {state && "error" in state && (
        <div className="admin-alert admin-alert-error">
          <span>⚠</span>
          <span>{state.error}</span>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: "20px", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div className="admin-form-group">
            <label className="admin-label">Image URL *</label>
            <input
              name="imageUrl"
              className="admin-input"
              defaultValue={item?.imageUrl ?? ""}
              placeholder="https://images.pexels.com/..."
              onChange={(e) => setPreview(e.target.value)}
              required
              type="url"
            />
            <span className="admin-label-sub">Paste a direct image URL from Pexels, Cloudinary, or your CDN</span>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Alt Text</label>
            <input
              name="altText"
              className="admin-input"
              defaultValue={item?.altText ?? ""}
              placeholder="Describe the image for accessibility"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Caption</label>
            <input
              name="caption"
              className="admin-input"
              defaultValue={item?.caption ?? ""}
              placeholder="Optional caption shown with image"
            />
          </div>

          <div className="admin-form-grid admin-form-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">Category</label>
              <select name="category" className="admin-select" defaultValue={item?.category ?? ""}>
                <option value="">No category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Sort Order</label>
              <input
                name="sortOrder"
                className="admin-input"
                defaultValue={item?.sortOrder ?? 0}
                type="number"
                min={0}
              />
            </div>
          </div>

          <label className="admin-checkbox-row">
            <input
              type="checkbox"
              className="admin-checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            <span style={{ fontSize: "0.82rem", color: "#6B5C4E" }}>
              Feature this image (shown in hero gallery sections)
            </span>
          </label>
        </div>

        {/* Preview */}
        <div>
          <span className="admin-label" style={{ display: "block", marginBottom: "8px" }}>Preview</span>
          <div
            style={{
              width: "200px",
              aspectRatio: "4/3",
              background: "#F4F1EC",
              border: "1px solid #EDE6DB",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            ) : (
              <span style={{ fontSize: "0.72rem", color: "#8C7B6B" }}>No image</span>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        <button type="button" onClick={onClose} className="admin-btn admin-btn-secondary">
          Cancel
        </button>
        <button type="submit" className="admin-btn admin-btn-primary">
          {item ? "Save Changes" : "Add Image"}
        </button>
      </div>
    </form>
  );
}

export default function GalleryManager({ items }: { items: GalleryItem[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    startTransition(() => deleteGalleryItemAction(id));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Add form */}
      {showForm && !editing && (
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Add Image</span>
          </div>
          <GalleryItemForm onClose={() => setShowForm(false)} />
        </div>
      )}

      {!showForm && !editing && (
        <button onClick={() => setShowForm(true)} className="admin-btn admin-btn-primary">
          + Add Image
        </button>
      )}

      {/* Edit form */}
      {editing && (
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Edit Image</span>
            <button onClick={() => setEditing(null)} className="admin-btn admin-btn-ghost admin-btn-sm">✕</button>
          </div>
          <GalleryItemForm item={editing} onClose={() => setEditing(null)} />
        </div>
      )}

      {/* Grid */}
      {items.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon">◻</div>
            <p className="admin-empty-title">No images yet</p>
            <p className="admin-empty-sub">Add your first gallery image above.</p>
          </div>
        </div>
      ) : (
        <div className="admin-gallery-grid">
          {items.map((item) => (
            <div key={item.id} className="admin-gallery-item">
              <img
                src={item.imageUrl}
                alt={item.altText ?? "Gallery image"}
                className="admin-gallery-item-img"
              />
              <div className="admin-gallery-item-info">
                {item.caption && (
                  <p className="admin-gallery-item-caption">{item.caption}</p>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px", flexWrap: "wrap" }}>
                  {item.category && (
                    <span className="admin-badge admin-badge-draft" style={{ fontSize: "0.48rem" }}>
                      {item.category}
                    </span>
                  )}
                  {item.isFeatured && (
                    <span className="admin-badge admin-badge-featured" style={{ fontSize: "0.48rem" }}>
                      ★ Featured
                    </span>
                  )}
                  <span style={{ fontSize: "0.62rem", color: "#8C7B6B", marginLeft: "auto" }}>
                    #{item.sortOrder}
                  </span>
                </div>
                <div className="admin-gallery-item-actions">
                  <button
                    onClick={() => { setEditing(item); setShowForm(false); }}
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                    style={{ flex: 1 }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={isPending}
                    className="admin-btn admin-btn-danger admin-btn-sm"
                    style={{ flex: 1 }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
