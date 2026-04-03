"use client";

import { useState, useTransition, useActionState } from "react";
import {
  createTestimonialAction,
  updateTestimonialAction,
  deleteTestimonialAction,
  toggleFeaturedAction,
} from "../../_actions/testimonials";

interface Testimonial {
  id: string;
  clientName: string;
  testimonialText: string;
  rating: number | null;
  location: string | null;
  serviceUsed: string | null;
  isFeatured: boolean;
  createdAt: Date;
}

const SERVICES = [
  "The Classic Ritual",
  "Revitalize & Restore",
  "Nourish & Fortify",
  "Gentleman's Recharge",
];

function TestimonialForm({
  testimonial,
  onClose,
}: {
  testimonial?: Testimonial;
  onClose: () => void;
}) {
  const action = testimonial
    ? updateTestimonialAction.bind(null, testimonial.id)
    : createTestimonialAction;

  const [state, formAction] = useActionState(action, null);
  const [isFeatured, setIsFeatured] = useState(testimonial?.isFeatured ?? false);

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

      <div className="admin-form-grid admin-form-grid-2">
        <div className="admin-form-group">
          <label className="admin-label">Client Name *</label>
          <input
            name="clientName"
            className="admin-input"
            defaultValue={testimonial?.clientName ?? ""}
            placeholder="Jane D."
            required
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Location</label>
          <input
            name="location"
            className="admin-input"
            defaultValue={testimonial?.location ?? ""}
            placeholder="Greenville, NC"
          />
        </div>
      </div>

      <div className="admin-form-group">
        <label className="admin-label">Testimonial *</label>
        <textarea
          name="testimonialText"
          className="admin-textarea"
          defaultValue={testimonial?.testimonialText ?? ""}
          placeholder="Client's words..."
          rows={4}
          required
          style={{ minHeight: "100px" }}
        />
      </div>

      <div className="admin-form-grid admin-form-grid-2">
        <div className="admin-form-group">
          <label className="admin-label">Service Used</label>
          <select name="serviceUsed" className="admin-select" defaultValue={testimonial?.serviceUsed ?? ""}>
            <option value="">Select service</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Rating</label>
          <select name="rating" className="admin-select" defaultValue={testimonial?.rating?.toString() ?? "5"}>
            <option value="">No rating</option>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{n} Star{n !== 1 ? "s" : ""}</option>
            ))}
          </select>
        </div>
      </div>

      <label className="admin-checkbox-row">
        <input
          type="checkbox"
          className="admin-checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
        <span className="admin-label" style={{ textTransform: "none", letterSpacing: "0", fontSize: "0.82rem" }}>
          Feature this testimonial (displayed prominently on the homepage)
        </span>
      </label>

      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", paddingTop: "4px" }}>
        <button type="button" onClick={onClose} className="admin-btn admin-btn-secondary">
          Cancel
        </button>
        <button type="submit" className="admin-btn admin-btn-primary">
          {testimonial ? "Save Changes" : "Add Testimonial"}
        </button>
      </div>
    </form>
  );
}

export default function TestimonialsManager({ testimonials }: { testimonials: Testimonial[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string, name: string) {
    if (!confirm(`Delete testimonial from ${name}? This cannot be undone.`)) return;
    startTransition(() => deleteTestimonialAction(id));
  }

  function handleToggleFeatured(id: string, current: boolean) {
    startTransition(() => toggleFeaturedAction(id, current));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Add form */}
      {(showForm && !editing) && (
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">New Testimonial</span>
          </div>
          <TestimonialForm onClose={() => setShowForm(false)} />
        </div>
      )}

      {!showForm && !editing && (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <button
            onClick={() => setShowForm(true)}
            className="admin-btn admin-btn-primary"
          >
            + Add Testimonial
          </button>
        </div>
      )}

      {/* Edit form */}
      {editing && (
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Edit Testimonial</span>
            <button onClick={() => setEditing(null)} className="admin-btn admin-btn-ghost admin-btn-sm">
              ✕ Close
            </button>
          </div>
          <TestimonialForm
            testimonial={editing}
            onClose={() => setEditing(null)}
          />
        </div>
      )}

      {/* List */}
      {testimonials.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon">❝</div>
            <p className="admin-empty-title">No testimonials yet</p>
            <p className="admin-empty-sub">Run the seed script or add your first testimonial above.</p>
          </div>
        </div>
      ) : (
        <div className="admin-card" style={{ padding: 0 }}>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft: "24px" }}>Client</th>
                  <th>Service</th>
                  <th>Rating</th>
                  <th>Featured</th>
                  <th style={{ textAlign: "right", paddingRight: "24px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t) => (
                  <tr key={t.id}>
                    <td style={{ paddingLeft: "24px" }}>
                      <div>
                        <span style={{ fontWeight: 400 }}>{t.clientName}</span>
                        {t.location && (
                          <span style={{ display: "block", fontSize: "0.72rem", color: "#8C7B6B" }}>
                            {t.location}
                          </span>
                        )}
                        <span style={{ display: "block", fontSize: "0.75rem", color: "#6B5C4E", marginTop: "4px", maxWidth: "280px" }}>
                          &ldquo;{t.testimonialText.substring(0, 80)}{t.testimonialText.length > 80 ? "…" : ""}&rdquo;
                        </span>
                      </div>
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "#8C7B6B" }}>
                      {t.serviceUsed ?? "—"}
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "#8C7B6B" }}>
                      {t.rating ? `${t.rating} ★` : "—"}
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleFeatured(t.id, t.isFeatured)}
                        disabled={isPending}
                        className={`admin-badge ${t.isFeatured ? "admin-badge-featured" : ""}`}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: "3px 9px" }}
                      >
                        {t.isFeatured ? "★ Featured" : "☆ Feature"}
                      </button>
                    </td>
                    <td style={{ paddingRight: "24px" }}>
                      <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                        <button
                          onClick={() => { setEditing(t); setShowForm(false); }}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(t.id, t.clientName)}
                          disabled={isPending}
                          className="admin-btn admin-btn-danger admin-btn-sm"
                        >
                          Delete
                        </button>
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
  );
}
