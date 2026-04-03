"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { updateAppointmentAction } from "@/app/admin/_actions/clients";

interface Appointment {
  id: string;
  confirmationCode: string;
  serviceId: string;
  staffId: string;
  status: string;
  startAt: string;
  endAt: string;
  notes: string | null;
  internalNotes: string | null;
  client: { firstName: string; lastName: string; email: string };
  service: { name: string };
  staff: { name: string };
}

interface ServiceOption { id: string; name: string; durationMinutes: number; }
interface StaffOption { id: string; name: string; }

export default function EditAppointmentPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [appt, setAppt] = useState<Appointment | null>(null);
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [staff, setStaff] = useState<StaffOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form state
  const [serviceId, setServiceId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [internalNotes, setInternalNotes] = useState("");

  useEffect(() => {
    async function load() {
      const [apptRes, optRes] = await Promise.all([
        fetch(`/api/admin/appointment/${id}`),
        fetch("/api/admin/booking-options"),
      ]);
      if (apptRes.ok) {
        const data = await apptRes.json();
        setAppt(data.appointment);
        const start = new Date(data.appointment.startAt);
        setServiceId(data.appointment.serviceId);
        setStaffId(data.appointment.staffId);
        // Convert UTC to business timezone for display
        const bizDate = start.toLocaleDateString("en-CA", { timeZone: "America/New_York" });
        const bizTimeParts = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(start);
        const bizH = (bizTimeParts.find(p => p.type === "hour")?.value || "0").padStart(2, "0");
        const bizM = (bizTimeParts.find(p => p.type === "minute")?.value || "0").padStart(2, "0");
        setDate(bizDate);
        setTime(`${bizH}:${bizM}`);
        setStatus(data.appointment.status);
        setNotes(data.appointment.notes || "");
        setInternalNotes(data.appointment.internalNotes || "");
      }
      if (optRes.ok) {
        const data = await optRes.json();
        setServices(data.services || []);
        setStaff(data.staff || []);
      }
    }
    load();
  }, [id]);

  function handleSubmit() {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("serviceId", serviceId);
      fd.set("staffId", staffId);
      fd.set("date", date);
      fd.set("time", time);
      fd.set("status", status);
      fd.set("notes", notes);
      fd.set("internalNotes", internalNotes);
      const result = await updateAppointmentAction(id, fd);
      if (result?.error) setError(result.error);
    });
  }

  if (!appt) {
    return (
      <>
        <div className="admin-topbar"><h1 className="admin-topbar-title">Loading...</h1></div>
        <div className="admin-content"><p style={{ color: "#999" }}>Loading appointment details...</p></div>
      </>
    );
  }

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">
          <Link href={`/admin/bookings/${id}`} style={{ color: "#8C7B6B", textDecoration: "none", fontWeight: 400 }}>
            {appt.confirmationCode}
          </Link>
          {" / Edit"}
        </h1>
      </div>

      <div className="admin-content">
        {error && <div className="admin-alert admin-alert-error">{error}</div>}

        <div className="admin-card" style={{ maxWidth: "720px" }}>
          <div className="admin-card-header">
            <h3 className="admin-card-title">Edit Appointment</h3>
          </div>
          <div style={{ padding: "24px" }}>
            <p style={{ fontSize: "0.82rem", color: "#888", marginBottom: "20px" }}>
              Client: <strong style={{ color: "#333" }}>{appt.client.firstName} {appt.client.lastName}</strong> ({appt.client.email})
            </p>

            <div className="admin-form-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Service</label>
                <select className="admin-select" value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
                  {services.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.durationMinutes} min)</option>)}
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Staff</label>
                <select className="admin-select" value={staffId} onChange={(e) => setStaffId(e.target.value)}>
                  {staff.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Date</label>
                <input type="date" className="admin-input" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Time</label>
                <input type="time" className="admin-input" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Status</label>
                <select className="admin-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="no_show">No Show</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="admin-form-group" style={{ marginTop: "16px" }}>
              <label className="admin-label">Client Notes</label>
              <textarea className="admin-textarea" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
            </div>

            <div className="admin-form-group" style={{ marginTop: "12px" }}>
              <label className="admin-label">Internal Notes <span style={{ fontWeight: 400, color: "#999" }}>(admin only)</span></label>
              <textarea className="admin-textarea" value={internalNotes} onChange={(e) => setInternalNotes(e.target.value)} rows={3} />
            </div>

            <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
              <button onClick={handleSubmit} disabled={isPending} className="admin-btn admin-btn-primary">
                {isPending ? "Saving..." : "Save Changes"}
              </button>
              <Link href={`/admin/bookings/${id}`} className="admin-btn admin-btn-secondary">Cancel</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
