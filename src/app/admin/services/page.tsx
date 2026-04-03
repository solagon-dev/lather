"use client";

import { useEffect, useState, useTransition, useCallback } from "react";
import {
  createServiceAction,
  updateServiceAction,
  deleteServiceAction,
} from "../_actions/services";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StaffRef {
  id: string;
  name: string;
}

interface ServiceRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  durationMinutes: number;
  price: number | null;
  bufferBeforeMinutes: number;
  bufferAfterMinutes: number;
  isActive: boolean;
  sortOrder: number;
  tier: string | null;
  staffServices: { staff: StaffRef }[];
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatPrice(cents: number | null): string {
  if (cents == null) return "Inquire";
  return `$${(cents / 100).toFixed(0)}`;
}

const TIER_OPTIONS = ["foundation", "specialized", "premium"] as const;

const EMPTY_FORM = {
  name: "",
  durationMinutes: "60",
  price: "",
  bufferBeforeMinutes: "0",
  bufferAfterMinutes: "15",
  tier: "",
  sortOrder: "0",
  description: "",
  isActive: "true",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(false);
  const [isPending, startTransition] = useTransition();

  /* form state */
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  /* delete confirmation */
  const [deleteTarget, setDeleteTarget] = useState<ServiceRow | null>(null);

  /* ---- fetch ---------------------------------------------------- */
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/services");
      if (!res.ok) throw new Error("fetch failed");
      const json = await res.json();
      setServices(json.services);
      setDbError(false);
    } catch {
      setDbError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ---- form helpers --------------------------------------------- */
  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowForm(true);
  }

  function openEdit(s: ServiceRow) {
    setEditingId(s.id);
    setForm({
      name: s.name,
      durationMinutes: String(s.durationMinutes),
      price: s.price != null ? (s.price / 100).toFixed(2) : "",
      bufferBeforeMinutes: String(s.bufferBeforeMinutes),
      bufferAfterMinutes: String(s.bufferAfterMinutes),
      tier: s.tier ?? "",
      sortOrder: String(s.sortOrder),
      description: s.description ?? "",
      isActive: String(s.isActive),
    });
    setFormError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setFormError("");
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  /* ---- submit --------------------------------------------------- */
  function handleSubmit() {
    setFormError("");
    startTransition(async () => {
      const fd = new FormData();
      fd.set("name", form.name);
      fd.set("durationMinutes", form.durationMinutes);
      fd.set("price", form.price);
      fd.set("bufferBeforeMinutes", form.bufferBeforeMinutes);
      fd.set("bufferAfterMinutes", form.bufferAfterMinutes);
      fd.set("tier", form.tier);
      fd.set("sortOrder", form.sortOrder);
      fd.set("description", form.description);

      try {
        let result: { error: string } | void;
        if (editingId) {
          fd.set("isActive", form.isActive);
          result = await updateServiceAction(editingId, fd);
        } else {
          result = await createServiceAction(fd);
        }
        if (result?.error) {
          setFormError(result.error);
          return;
        }
      } catch {
        /* redirect throws — this is expected on success */
      }

      setSuccessMsg(editingId ? "Service updated." : "Service created.");
      closeForm();
      await fetchData();
      setTimeout(() => setSuccessMsg(""), 3000);
    });
  }

  /* ---- delete --------------------------------------------------- */
  function confirmDelete() {
    if (!deleteTarget) return;
    const id = deleteTarget.id;
    setDeleteTarget(null);
    startTransition(async () => {
      const result = await deleteServiceAction(id);
      if (result?.error) {
        setFormError(result.error);
        return;
      }
      setSuccessMsg("Service deleted.");
      await fetchData();
      setTimeout(() => setSuccessMsg(""), 3000);
    });
  }

  /* ---- render --------------------------------------------------- */
  return (
    <>
      {/* top bar */}
      <div className="admin-topbar">
        <span className="admin-topbar-title">Services</span>
        <div className="admin-topbar-actions">
          <button
            className="admin-btn admin-btn-primary admin-btn-sm"
            onClick={openCreate}
          >
            + New Service
          </button>
        </div>
      </div>

      <div className="admin-content">
        {/* alerts */}
        {dbError && (
          <div
            className="admin-alert admin-alert-error"
            style={{ marginBottom: "24px" }}
          >
            <span>!</span>
            <div>
              <strong>Database not connected.</strong> Ensure{" "}
              <code>DATABASE_URL</code> is set and migrations have been run.
            </div>
          </div>
        )}

        {formError && !showForm && (
          <div
            className="admin-alert admin-alert-error"
            style={{ marginBottom: "24px" }}
          >
            <span>!</span>
            <div>{formError}</div>
          </div>
        )}

        {successMsg && (
          <div
            className="admin-alert admin-alert-success"
            style={{ marginBottom: "24px" }}
          >
            <span>&#10003;</span>
            <div>{successMsg}</div>
          </div>
        )}

        {/* create / edit form */}
        {showForm && (
          <div className="admin-card" style={{ marginBottom: "24px" }}>
            <div className="admin-card-header">
              <span className="admin-card-title">
                {editingId ? "Edit Service" : "New Service"}
              </span>
              <button
                className="admin-btn admin-btn-ghost admin-btn-sm"
                onClick={closeForm}
              >
                Cancel
              </button>
            </div>

            {formError && (
              <div
                className="admin-alert admin-alert-error"
                style={{ marginBottom: "20px" }}
              >
                <span>!</span>
                <div>{formError}</div>
              </div>
            )}

            <div
              className="admin-form-grid admin-form-grid-2"
              style={{ marginBottom: "20px" }}
            >
              <div className="admin-form-group">
                <label className="admin-label">Name</label>
                <input
                  className="admin-input"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Signature Head Spa"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Duration (minutes)</label>
                <input
                  className="admin-input"
                  name="durationMinutes"
                  type="number"
                  min="0"
                  value={form.durationMinutes}
                  onChange={handleChange}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Price (dollars)</label>
                <input
                  className="admin-input"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Leave blank for Inquire"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Tier</label>
                <select
                  className="admin-select"
                  name="tier"
                  value={form.tier}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {TIER_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Buffer Before (min)</label>
                <input
                  className="admin-input"
                  name="bufferBeforeMinutes"
                  type="number"
                  min="0"
                  value={form.bufferBeforeMinutes}
                  onChange={handleChange}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Buffer After (min)</label>
                <input
                  className="admin-input"
                  name="bufferAfterMinutes"
                  type="number"
                  min="0"
                  value={form.bufferAfterMinutes}
                  onChange={handleChange}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Sort Order</label>
                <input
                  className="admin-input"
                  name="sortOrder"
                  type="number"
                  value={form.sortOrder}
                  onChange={handleChange}
                />
              </div>
              {editingId && (
                <div className="admin-form-group">
                  <label className="admin-label">Status</label>
                  <select
                    className="admin-select"
                    name="isActive"
                    value={form.isActive}
                    onChange={handleChange}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              )}
            </div>

            <div className="admin-form-group" style={{ marginBottom: "24px" }}>
              <label className="admin-label">Description</label>
              <textarea
                className="admin-textarea"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Optional description..."
                style={{ minHeight: "100px" }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                className="admin-btn admin-btn-primary"
                onClick={handleSubmit}
                disabled={isPending}
              >
                {isPending
                  ? "Saving..."
                  : editingId
                    ? "Update Service"
                    : "Create Service"}
              </button>
              <button
                className="admin-btn admin-btn-secondary"
                onClick={closeForm}
                disabled={isPending}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* list */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">All Services</span>
          </div>

          {loading ? (
            <div className="admin-empty">
              <p className="admin-empty-sub">Loading...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty-icon">&#x2726;</div>
              <p className="admin-empty-title">No services yet</p>
              <p className="admin-empty-sub">
                Click &quot;+ New Service&quot; to add the first service.
              </p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Duration</th>
                    <th>Price</th>
                    <th>Tier</th>
                    <th>Buffer</th>
                    <th>Status</th>
                    <th>Sort</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s.id}>
                      <td style={{ fontWeight: 400 }}>{s.name}</td>
                      <td>{s.durationMinutes} min</td>
                      <td>{formatPrice(s.price)}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {s.tier ?? "\u2014"}
                      </td>
                      <td
                        style={{ fontSize: "0.82rem", color: "#8C7B6B" }}
                      >
                        {s.bufferBeforeMinutes}+{s.bufferAfterMinutes}
                      </td>
                      <td>
                        <span
                          className="admin-badge"
                          style={
                            s.isActive
                              ? { background: "#EDF5EC", color: "#3A6B37" }
                              : { background: "#F4F1EC", color: "#8C7B6B" }
                          }
                        >
                          {s.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td style={{ color: "#8C7B6B" }}>{s.sortOrder}</td>
                      <td>
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button
                            className="admin-btn admin-btn-ghost admin-btn-sm"
                            onClick={() => openEdit(s)}
                          >
                            Edit
                          </button>
                          <button
                            className="admin-btn admin-btn-ghost admin-btn-sm"
                            style={{ color: "#c0392b" }}
                            onClick={() => setDeleteTarget(s)}
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
          )}
        </div>
      </div>

      {/* delete confirmation modal */}
      {deleteTarget && (
        <div className="admin-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-title">Delete Service</div>
            <div className="admin-modal-body">
              Are you sure you want to delete{" "}
              <strong>{deleteTarget.name}</strong>? This action cannot be undone.
            </div>
            <div className="admin-modal-actions">
              <button
                className="admin-btn admin-btn-secondary admin-btn-sm"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                className="admin-btn admin-btn-danger admin-btn-sm"
                onClick={confirmDelete}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
