"use client";

import { useEffect, useState, useTransition, useCallback } from "react";
import {
  createStaffAction,
  updateStaffAction,
  toggleStaffActiveAction,
} from "../_actions/staff";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ServiceRef {
  id: string;
  name: string;
}

interface StaffRow {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone: string | null;
  bio: string | null;
  image: string | null;
  isActive: boolean;
  timezone: string;
  staffServices: { service: ServiceRef }[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Phoenix",
  "America/Anchorage",
  "Pacific/Honolulu",
] as const;

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  bio: "",
  image: "",
  timezone: "America/New_York",
  isActive: "true",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function StaffPage() {
  const [staffList, setStaffList] = useState<StaffRow[]>([]);
  const [allServices, setAllServices] = useState<ServiceRef[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(false);
  const [isPending, startTransition] = useTransition();

  /* form state */
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [selectedServiceIds, setSelectedServiceIds] = useState<Set<string>>(
    new Set()
  );
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  /* ---- fetch ---------------------------------------------------- */
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/staff");
      if (!res.ok) throw new Error("fetch failed");
      const json = await res.json();
      setStaffList(json.staff);
      setAllServices(json.services);
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
    setSelectedServiceIds(new Set());
    setFormError("");
    setShowForm(true);
  }

  function openEdit(s: StaffRow) {
    setEditingId(s.id);
    setForm({
      name: s.name,
      email: s.email,
      phone: s.phone ?? "",
      bio: s.bio ?? "",
      image: s.image ?? "",
      timezone: s.timezone,
      isActive: String(s.isActive),
    });
    setSelectedServiceIds(
      new Set(s.staffServices.map((ss) => ss.service.id))
    );
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

  function toggleService(id: string) {
    setSelectedServiceIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  /* ---- submit --------------------------------------------------- */
  function handleSubmit() {
    setFormError("");
    startTransition(async () => {
      const fd = new FormData();
      fd.set("name", form.name);
      fd.set("email", form.email);
      fd.set("phone", form.phone);
      fd.set("bio", form.bio);
      fd.set("image", form.image);
      fd.set("timezone", form.timezone);
      for (const sid of selectedServiceIds) {
        fd.append("serviceIds", sid);
      }

      try {
        let result: { error: string } | void;
        if (editingId) {
          fd.set("isActive", form.isActive);
          result = await updateStaffAction(editingId, fd);
        } else {
          result = await createStaffAction(fd);
        }
        if (result?.error) {
          setFormError(result.error);
          return;
        }
      } catch {
        /* redirect throws on success — expected */
      }

      setSuccessMsg(
        editingId ? "Staff member updated." : "Staff member created."
      );
      closeForm();
      await fetchData();
      setTimeout(() => setSuccessMsg(""), 3000);
    });
  }

  /* ---- toggle active -------------------------------------------- */
  function handleToggleActive(s: StaffRow) {
    startTransition(async () => {
      await toggleStaffActiveAction(s.id, !s.isActive);
      setSuccessMsg(
        `${s.name} is now ${s.isActive ? "inactive" : "active"}.`
      );
      await fetchData();
      setTimeout(() => setSuccessMsg(""), 3000);
    });
  }

  /* ---- render --------------------------------------------------- */
  return (
    <>
      {/* top bar */}
      <div className="admin-topbar">
        <span className="admin-topbar-title">Staff</span>
        <div className="admin-topbar-actions">
          <button
            className="admin-btn admin-btn-primary admin-btn-sm"
            onClick={openCreate}
          >
            + New Staff
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
                {editingId ? "Edit Staff Member" : "New Staff Member"}
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
                  placeholder="Full name"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Email</label>
                <input
                  className="admin-input"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Phone</label>
                <input
                  className="admin-input"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Timezone</label>
                <select
                  className="admin-select"
                  name="timezone"
                  value={form.timezone}
                  onChange={handleChange}
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Image URL</label>
                <input
                  className="admin-input"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="/images/staff/name.jpg"
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

            <div className="admin-form-group" style={{ marginBottom: "20px" }}>
              <label className="admin-label">Bio</label>
              <textarea
                className="admin-textarea"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Short bio..."
                style={{ minHeight: "100px" }}
              />
            </div>

            {/* service assignments */}
            <div className="admin-form-group" style={{ marginBottom: "24px" }}>
              <label className="admin-label">Services</label>
              {allServices.length === 0 ? (
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "#8C7B6B",
                    marginTop: "4px",
                  }}
                >
                  No active services available. Create services first.
                </p>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "8px",
                    marginTop: "8px",
                  }}
                >
                  {allServices.map((svc) => (
                    <label
                      key={svc.id}
                      className="admin-checkbox-row"
                      style={{ fontSize: "0.85rem", color: "#3D2E22" }}
                    >
                      <input
                        type="checkbox"
                        className="admin-checkbox"
                        checked={selectedServiceIds.has(svc.id)}
                        onChange={() => toggleService(svc.id)}
                      />
                      {svc.name}
                    </label>
                  ))}
                </div>
              )}
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
                    ? "Update Staff"
                    : "Create Staff"}
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
            <span className="admin-card-title">All Staff</span>
          </div>

          {loading ? (
            <div className="admin-empty">
              <p className="admin-empty-sub">Loading...</p>
            </div>
          ) : staffList.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty-icon">&#x2726;</div>
              <p className="admin-empty-title">No staff yet</p>
              <p className="admin-empty-sub">
                Click &quot;+ New Staff&quot; to add the first team member.
              </p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Timezone</th>
                    <th>Services</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staffList.map((s) => {
                    const serviceNames = s.staffServices
                      .map((ss) => ss.service.name)
                      .join(", ");
                    return (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 400 }}>{s.name}</td>
                        <td
                          style={{ fontSize: "0.82rem", color: "#6B5C4E" }}
                        >
                          {s.email}
                        </td>
                        <td
                          style={{ fontSize: "0.82rem", color: "#6B5C4E" }}
                        >
                          {s.phone ?? "\u2014"}
                        </td>
                        <td
                          style={{ fontSize: "0.82rem", color: "#8C7B6B" }}
                        >
                          {s.timezone.replace(/_/g, " ")}
                        </td>
                        <td
                          style={{
                            fontSize: "0.82rem",
                            color: "#6B5C4E",
                            maxWidth: "280px",
                          }}
                        >
                          {serviceNames || "\u2014"}
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
                              style={{
                                color: s.isActive ? "#c0392b" : "#3A6B37",
                              }}
                              onClick={() => handleToggleActive(s)}
                              disabled={isPending}
                            >
                              {s.isActive ? "Deactivate" : "Activate"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
