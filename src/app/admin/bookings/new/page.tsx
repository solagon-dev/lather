"use client";

import { useEffect, useState, useTransition } from "react";
import { createBookingAction } from "@/app/admin/_actions/bookings";

interface ServiceOption {
  id: string;
  name: string;
  durationMinutes: number;
  price: number | null;
}

interface StaffOption {
  id: string;
  name: string;
}

export default function NewBookingPage() {
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [staff, setStaff] = useState<StaffOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetch("/api/admin/booking-options")
      .then((r) => r.json())
      .then((data: { services: ServiceOption[]; staff: StaffOption[] }) => {
        setServices(data.services ?? []);
        setStaff(data.staff ?? []);
      })
      .catch(() => {
        /* options will be empty */
      });
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await createBookingAction(formData);
      if (result && "error" in result) {
        setError(result.error);
      }
    });
  }

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">New Booking</span>
      </div>

      <div className="admin-content" style={{ maxWidth: "720px" }}>
        {error && (
          <div className="admin-alert admin-alert-error">
            <span>!</span>
            <div>{error}</div>
          </div>
        )}

        <div className="admin-card"><div className="admin-card-body">
          <form onSubmit={handleSubmit}>
            {/* Client info */}
            <div style={{ marginBottom: "24px" }}>
              <label className="admin-label" style={{ marginBottom: "12px", display: "block" }}>
                Client Information
              </label>
              <div className="admin-form-grid admin-form-grid-2">
                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="firstName">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    className="admin-input"
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="lastName">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    className="admin-input"
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="email">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="admin-input"
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="admin-input"
                  />
                </div>
              </div>
            </div>

            <hr className="admin-divider" />

            {/* Service & Staff */}
            <div style={{ marginBottom: "24px" }}>
              <label className="admin-label" style={{ marginBottom: "12px", display: "block" }}>
                Appointment Details
              </label>
              <div className="admin-form-grid admin-form-grid-2">
                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="serviceId">
                    Service *
                  </label>
                  <select
                    id="serviceId"
                    name="serviceId"
                    className="admin-select"
                    required
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.durationMinutes} min
                        {s.price != null
                          ? ` / $${(s.price / 100).toFixed(0)}`
                          : ""}
                        )
                      </option>
                    ))}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="staffId">
                    Staff *
                  </label>
                  <select
                    id="staffId"
                    name="staffId"
                    className="admin-select"
                    required
                  >
                    <option value="">Select staff</option>
                    {staff.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="date">
                    Date *
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className="admin-input"
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="time">
                    Time *
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    className="admin-input"
                    required
                  />
                </div>
              </div>
            </div>

            <hr className="admin-divider" />

            {/* Notes */}
            <div style={{ marginBottom: "24px" }}>
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="notes">
                    Client Notes
                  </label>
                  <span className="admin-label-sub">Visible to the client</span>
                  <textarea
                    id="notes"
                    name="notes"
                    className="admin-textarea"
                    style={{ minHeight: "80px" }}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="internalNotes">
                    Internal Notes
                  </label>
                  <span className="admin-label-sub">
                    Admin only &mdash; not visible to client
                  </span>
                  <textarea
                    id="internalNotes"
                    name="internalNotes"
                    className="admin-textarea"
                    style={{ minHeight: "80px" }}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                paddingTop: "8px",
              }}
            >
              <a
                href="/admin/bookings"
                className="admin-btn admin-btn-secondary"
              >
                Cancel
              </a>
              <button
                type="submit"
                className="admin-btn admin-btn-primary"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Booking"}
              </button>
            </div>
          </form>
        </div></div>
      </div>
    </>
  );
}
