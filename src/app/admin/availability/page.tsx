"use client";

import { useEffect, useState, useTransition } from "react";
import {
  updateAvailabilityRuleAction,
  createBlackoutAction,
  deleteBlackoutAction,
} from "../_actions/availability";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface Rule { id: string; staffId: string | null; dayOfWeek: number; startTime: string; endTime: string; isActive: boolean; staff: { name: string } | null; }
interface BlackoutItem { id: string; title: string; staffId: string | null; startAt: string; endAt: string; reason: string | null; staff: { name: string } | null; }
interface StaffOption { id: string; name: string; }

export default function AvailabilityPage() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [blackouts, setBlackouts] = useState<BlackoutItem[]>([]);
  const [staffList, setStaffList] = useState<StaffOption[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [bTitle, setBTitle] = useState("");
  const [bStaffId, setBStaffId] = useState("");
  const [bStartDate, setBStartDate] = useState("");
  const [bStartTime, setBStartTime] = useState("00:00");
  const [bEndDate, setBEndDate] = useState("");
  const [bEndTime, setBEndTime] = useState("23:59");
  const [bReason, setBReason] = useState("");

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    try {
      const res = await fetch("/api/admin/availability");
      if (!res.ok) return;
      const data = await res.json();
      setRules(data.rules || []);
      setBlackouts(data.blackouts || []);
      setStaffList(data.staff || []);
    } catch { /* ignore */ }
  }

  function handleUpdateRule(rule: Rule, field: string, value: string | boolean) {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("startTime", field === "startTime" ? (value as string) : rule.startTime);
      fd.set("endTime", field === "endTime" ? (value as string) : rule.endTime);
      fd.set("isActive", field === "isActive" ? String(value) : String(rule.isActive));
      const result = await updateAvailabilityRuleAction(rule.id, fd);
      if (result?.error) setError(result.error);
      else loadData();
    });
  }

  function handleCreateBlackout() {
    if (!bTitle || !bStartDate || !bEndDate) { setError("Title and dates are required."); return; }
    startTransition(async () => {
      const fd = new FormData();
      fd.set("title", bTitle); fd.set("staffId", bStaffId); fd.set("startDate", bStartDate);
      fd.set("startTime", bStartTime); fd.set("endDate", bEndDate); fd.set("endTime", bEndTime); fd.set("reason", bReason);
      const result = await createBlackoutAction(fd);
      if (result?.error) setError(result.error);
      else { setShowForm(false); setBTitle(""); setBStaffId(""); setBStartDate(""); setBEndDate(""); setBReason(""); loadData(); }
    });
  }

  function handleDeleteBlackout(id: string) {
    if (!confirm("Delete this blackout?")) return;
    startTransition(async () => { await deleteBlackoutAction(id); loadData(); });
  }

  const locationRules = rules.filter((r) => !r.staffId);

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">Availability</h1>
        <div className="admin-topbar-actions">
          <button onClick={() => setShowForm(!showForm)} className="admin-btn admin-btn-primary">+ Add Blackout</button>
        </div>
      </div>
      <div className="admin-content">
        {error && <div className="admin-alert admin-alert-error">{error} <button onClick={() => setError(null)} style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "8px" }}>×</button></div>}

        {showForm && (
          <div className="admin-card" style={{ marginBottom: "24px" }}>
            <div className="admin-card-header"><h3 className="admin-card-title">New Blackout / Time Off</h3></div>
            <div style={{ padding: "20px 24px" }}>
              <div className="admin-form-grid-2">
                <div className="admin-form-group"><label className="admin-label">Title</label><input className="admin-input" value={bTitle} onChange={(e) => setBTitle(e.target.value)} placeholder="Holiday Closure" /></div>
                <div className="admin-form-group"><label className="admin-label">Staff</label>
                  <select className="admin-select" value={bStaffId} onChange={(e) => setBStaffId(e.target.value)}><option value="">All Staff</option>{staffList.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
                </div>
                <div className="admin-form-group"><label className="admin-label">Start Date</label><input type="date" className="admin-input" value={bStartDate} onChange={(e) => setBStartDate(e.target.value)} /></div>
                <div className="admin-form-group"><label className="admin-label">Start Time</label><input type="time" className="admin-input" value={bStartTime} onChange={(e) => setBStartTime(e.target.value)} /></div>
                <div className="admin-form-group"><label className="admin-label">End Date</label><input type="date" className="admin-input" value={bEndDate} onChange={(e) => setBEndDate(e.target.value)} /></div>
                <div className="admin-form-group"><label className="admin-label">End Time</label><input type="time" className="admin-input" value={bEndTime} onChange={(e) => setBEndTime(e.target.value)} /></div>
              </div>
              <div className="admin-form-group" style={{ marginTop: "12px" }}><label className="admin-label">Reason (optional)</label><input className="admin-input" value={bReason} onChange={(e) => setBReason(e.target.value)} /></div>
              <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
                <button onClick={handleCreateBlackout} disabled={isPending} className="admin-btn admin-btn-primary admin-btn-sm">{isPending ? "Saving..." : "Create Blackout"}</button>
                <button onClick={() => setShowForm(false)} className="admin-btn admin-btn-ghost admin-btn-sm">Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="admin-card" style={{ marginBottom: "24px" }}>
          <div className="admin-card-header"><h3 className="admin-card-title">Location Hours</h3></div>
          <p style={{ padding: "0 24px 12px", fontSize: "0.82rem", color: "#888" }}>Click Open/Closed to toggle. Change times directly.</p>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Day</th><th>Open</th><th>Close</th><th>Status</th></tr></thead>
              <tbody>
                {locationRules.map((rule) => (
                  <tr key={rule.id}>
                    <td style={{ fontWeight: 500 }}>{DAY_NAMES[rule.dayOfWeek]}</td>
                    <td><input type="time" value={rule.startTime} disabled={!rule.isActive} onChange={(e) => handleUpdateRule(rule, "startTime", e.target.value)} style={{ border: "1px solid #e0e0e0", padding: "4px 8px", borderRadius: "4px", fontSize: "0.85rem" }} /></td>
                    <td><input type="time" value={rule.endTime} disabled={!rule.isActive} onChange={(e) => handleUpdateRule(rule, "endTime", e.target.value)} style={{ border: "1px solid #e0e0e0", padding: "4px 8px", borderRadius: "4px", fontSize: "0.85rem" }} /></td>
                    <td><button onClick={() => handleUpdateRule(rule, "isActive", !rule.isActive)} style={{ background: rule.isActive ? "#EDF5EC" : "#F4F1EC", color: rule.isActive ? "#3A6B37" : "#8C7B6B", cursor: "pointer", border: "none", padding: "4px 12px", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: 500 }}>{rule.isActive ? "Open" : "Closed"}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header"><h3 className="admin-card-title">Blackouts & Time Off</h3></div>
          {blackouts.length === 0 ? (
            <div style={{ padding: "32px 24px", textAlign: "center", color: "#999", fontSize: "0.88rem" }}>No blackouts scheduled.</div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Title</th><th>Start</th><th>End</th><th>Staff</th><th>Reason</th><th></th></tr></thead>
                <tbody>
                  {blackouts.map((b) => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: 500 }}>{b.title}</td>
                      <td>{new Date(b.startAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</td>
                      <td>{new Date(b.endAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</td>
                      <td>{b.staff?.name || "All Staff"}</td>
                      <td style={{ color: "#888" }}>{b.reason || "—"}</td>
                      <td><button onClick={() => handleDeleteBlackout(b.id)} className="admin-btn admin-btn-ghost admin-btn-sm" style={{ color: "#C0392B" }}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
