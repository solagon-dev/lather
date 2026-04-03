"use client";

import { useState, useEffect, useCallback } from "react";

// ── Types ────────────────────────────────────────────────────

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  durationMinutes: number;
  price: number | null;
  tier: string | null;
}

interface StaffMember {
  id: string;
  name: string;
  image: string | null;
  staffServices: { serviceId: string }[];
}

interface TimeSlot {
  time: string;
  staffId: string;
  staffName: string;
}

interface BookingResult {
  confirmationCode: string;
  serviceName: string;
  staffName: string;
  startAt: string;
  endAt: string;
  durationMinutes: number;
  price: number | null;
  clientName: string;
  clientEmail: string;
  clientPhone: string | null;
  calendarLinks?: {
    googleUrl: string;
    outlookUrl: string;
    icsUrl: string;
  };
}

type Step = "service" | "staff" | "date" | "time" | "details" | "confirm" | "success";

// ── Helpers ──────────────────────────────────────────────────

function formatPrice(cents: number | null) {
  if (!cents) return "Inquire";
  return `$${(cents / 100).toFixed(0)}`;
}

function formatTime12(time24: string) {
  const [h, m] = time24.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function formatDateLong(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

function getNextDays(count: number): string[] {
  const days: string[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}

function getDayName(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(d);
}

function getDayNum(dateStr: string) {
  return new Date(dateStr + "T12:00:00").getDate();
}

function getMonthName(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return new Intl.DateTimeFormat("en-US", { month: "short" }).format(d);
}

// ── Styles ───────────────────────────────────────────────────

const label: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.62rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "var(--stone)",
  marginBottom: "1.2rem",
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const heading: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(2rem, 4vw, 3rem)",
  fontWeight: 300,
  color: "var(--bark)",
  lineHeight: 1.08,
  marginBottom: "clamp(32px, 5vw, 48px)",
};

const accent: React.CSSProperties = {
  display: "inline-block",
  width: "28px",
  height: "1px",
  background: "var(--blush)",
};

// ── Main Component ───────────────────────────────────────────

export default function BookingFlow() {
  const [step, setStep] = useState<Step>("service");
  const [services, setServices] = useState<Service[]>([]);
  const [allStaff, setAllStaff] = useState<StaffMember[]>([]);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Selections
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [noStaffPreference, setNoStaffPreference] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [booking, setBooking] = useState<BookingResult | null>(null);

  // Load services and staff on mount
  useEffect(() => {
    fetch("/api/booking/services")
      .then((r) => r.json())
      .then((data) => {
        setServices(data.services || []);
        setAllStaff(data.staff || []);
      })
      .catch(() => {});
  }, []);

  // Filter staff for selected service
  const availableStaff = selectedService
    ? allStaff.filter((s) =>
        s.staffServices.some((ss) => ss.serviceId === selectedService.id),
      )
    : [];

  // Fetch slots when date changes
  const fetchSlots = useCallback(async () => {
    if (!selectedDate || !selectedService) return;
    setLoadingSlots(true);
    setSlots([]);
    setSelectedSlot(null);
    try {
      const staffParam = noStaffPreference ? "" : `&staffId=${selectedStaff?.id || ""}`;
      const res = await fetch(
        `/api/booking/slots?date=${selectedDate}&serviceId=${selectedService.id}${staffParam}`,
      );
      const data = await res.json();
      setSlots(data.slots || []);
    } catch {
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, [selectedDate, selectedService, selectedStaff, noStaffPreference]);

  useEffect(() => {
    if (step === "time" && selectedDate) fetchSlots();
  }, [step, selectedDate, fetchSlots]);

  // Submit booking
  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          serviceId: selectedService!.id,
          staffId: selectedSlot!.staffId,
          date: selectedDate,
          time: selectedSlot!.time,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setSubmitting(false);
        return;
      }
      setBooking(data.booking);
      setStep("success");
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Step navigation ────────────────────────────────────
  const steps: Step[] = ["service", "staff", "date", "time", "details", "confirm"];
  const stepIndex = steps.indexOf(step);

  function goBack() {
    if (stepIndex > 0) setStep(steps[stepIndex - 1]);
  }

  // ── Render ─────────────────────────────────────────────

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      {/* Progress indicator */}
      {step !== "success" && (
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "clamp(32px, 5vw, 48px)" }}>
          {steps.map((s, i) => (
            <div
              key={s}
              style={{
                flex: 1,
                height: "2px",
                background: i <= stepIndex ? "var(--bark)" : "rgba(140,123,107,0.15)",
                transition: "background 0.6s ease",
              }}
            />
          ))}
        </div>
      )}

      {/* Back button */}
      {stepIndex > 0 && step !== "success" && (
        <button
          onClick={goBack}
          aria-label="Go back to previous step"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--stone)",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: 0,
          }}
        >
          <span aria-hidden="true" style={{ fontSize: "0.8rem" }}>←</span> Back
        </button>
      )}

      {/* ── STEP 1: SERVICE ───────────────────────────── */}
      {step === "service" && (
        <div>
          <p style={label}><span style={accent} /> Select Your Ritual</p>
          <h2 style={heading}>Choose a <em style={{ fontStyle: "italic" }}>treatment.</em></h2>

          <div style={{ display: "grid", gap: "1px", background: "rgba(140,123,107,0.1)" }}>
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => { setSelectedService(service); setStep("staff"); }}
                style={{
                  background: "var(--cream)",
                  border: "none",
                  cursor: "pointer",
                  padding: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  textAlign: "left",
                  transition: "background 0.3s ease",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1.5rem",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--linen)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--cream)")}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.3rem" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)", fontWeight: 300, color: "var(--bark)" }}>
                      {service.name}
                    </span>
                    {service.tier && (
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.48rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--stone)", padding: "2px 7px", border: "1px solid rgba(140,123,107,0.15)" }}>
                        {service.tier}
                      </span>
                    )}
                  </div>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--stone)" }}>
                    {service.durationMinutes} min · {formatPrice(service.price)}
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--blush)" }}>→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── STEP 2: STAFF ─────────────────────────────── */}
      {step === "staff" && (
        <div>
          <p style={label}><span style={accent} /> Choose Your Therapist</p>
          <h2 style={heading}>Who would you <em style={{ fontStyle: "italic" }}>prefer?</em></h2>

          {availableStaff.length === 0 && (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 300, fontStyle: "italic", color: "var(--stone)", marginBottom: "1rem" }}>
                No therapists available for this service.
              </p>
              <button onClick={goBack} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--bark)", borderBottom: "1px solid rgba(61,46,34,0.3)", paddingBottom: "3px" }}>
                Choose a different treatment
              </button>
            </div>
          )}

          {availableStaff.length > 0 && <div style={{ display: "grid", gap: "12px" }}>
            {/* No preference option */}
            <button
              onClick={() => { setNoStaffPreference(true); setSelectedStaff(null); setStep("date"); }}
              style={{
                background: "var(--linen)",
                border: "1px solid rgba(140,123,107,0.1)",
                cursor: "pointer",
                padding: "1.25rem 1.5rem",
                textAlign: "left",
                transition: "border-color 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 300, color: "var(--bark)", display: "block", marginBottom: "0.2rem" }}>
                  No preference
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--stone)" }}>
                  We will match you with the first available therapist
                </span>
              </div>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--blush)" }}>→</span>
            </button>

            {availableStaff.map((s) => (
              <button
                key={s.id}
                onClick={() => { setSelectedStaff(s); setNoStaffPreference(false); setStep("date"); }}
                style={{
                  background: "var(--cream)",
                  border: "1px solid rgba(140,123,107,0.1)",
                  cursor: "pointer",
                  padding: "1.25rem 1.5rem",
                  textAlign: "left",
                  transition: "border-color 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {s.image && (
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                    <img src={s.image} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 300, color: "var(--bark)" }}>
                    {s.name}
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--blush)" }}>→</span>
              </button>
            ))}
          </div>}
        </div>
      )}

      {/* ── STEP 3: DATE ──────────────────────────────── */}
      {step === "date" && (
        <div>
          <p style={label}><span style={accent} /> Pick a Date</p>
          <h2 style={heading}>When works <em style={{ fontStyle: "italic" }}>best?</em></h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
            {getNextDays(21).map((dateStr) => {
              const dayName = getDayName(dateStr);
              const dayNum = getDayNum(dateStr);
              const month = getMonthName(dateStr);
              const isSunMon = [0, 1].includes(new Date(dateStr + "T12:00:00").getDay());
              const isSelected = selectedDate === dateStr;

              return (
                <button
                  key={dateStr}
                  disabled={isSunMon}
                  onClick={() => { setSelectedDate(dateStr); setSelectedSlot(null); setStep("time"); }}
                  style={{
                    background: isSelected ? "var(--bark)" : isSunMon ? "rgba(140,123,107,0.04)" : "var(--cream)",
                    border: isSelected ? "1px solid var(--bark)" : "1px solid rgba(140,123,107,0.1)",
                    cursor: isSunMon ? "default" : "pointer",
                    padding: "clamp(8px, 1.2vw, 12px) 4px",
                    textAlign: "center",
                    opacity: isSunMon ? 0.3 : 1,
                    transition: "all 0.2s ease",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: isSelected ? "rgba(237,230,219,0.6)" : "var(--stone)", display: "block" }}>
                    {dayName}
                  </span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 300, color: isSelected ? "var(--linen)" : "var(--bark)", display: "block", margin: "2px 0" }}>
                    {dayNum}
                  </span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.45rem", letterSpacing: "0.08em", textTransform: "uppercase", color: isSelected ? "rgba(237,230,219,0.5)" : "var(--stone)", display: "block" }}>
                    {month}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── STEP 4: TIME ──────────────────────────────── */}
      {step === "time" && (
        <div>
          <p style={label}><span style={accent} /> Select a Time</p>
          <h2 style={heading}>
            {selectedDate && formatDateLong(selectedDate)}
          </h2>

          {loadingSlots && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--stone)", textAlign: "center", padding: "3rem 0" }}>
              Finding available times...
            </p>
          )}

          {!loadingSlots && slots.length === 0 && (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 300, fontStyle: "italic", color: "var(--stone)", marginBottom: "1rem" }}>
                No available times on this date.
              </p>
              <button
                onClick={() => setStep("date")}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--bark)", borderBottom: "1px solid rgba(61,46,34,0.3)", paddingBottom: "3px" }}
              >
                Choose another date
              </button>
            </div>
          )}

          {!loadingSlots && slots.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: "8px" }}>
              {/* Deduplicate by time (show first available staff per time) */}
              {Array.from(new Map(slots.map((s) => [s.time, s])).values()).map((slot) => {
                const isSelected = selectedSlot?.time === slot.time;
                return (
                  <button
                    key={slot.time}
                    onClick={() => { setSelectedSlot(slot); setStep("details"); }}
                    style={{
                      background: isSelected ? "var(--bark)" : "var(--cream)",
                      border: "1px solid " + (isSelected ? "var(--bark)" : "rgba(140,123,107,0.12)"),
                      cursor: "pointer",
                      padding: "14px 8px",
                      textAlign: "center",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 300, color: isSelected ? "var(--linen)" : "var(--bark)" }}>
                      {formatTime12(slot.time)}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── STEP 5: DETAILS ───────────────────────────── */}
      {step === "details" && (
        <div>
          <p style={label}><span style={accent} /> Your Information</p>
          <h2 style={heading}>Almost <em style={{ fontStyle: "italic" }}>there.</em></h2>

          <div style={{ display: "grid", gap: "1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <InputField label="First Name" value={firstName} onChange={setFirstName} required />
              <InputField label="Last Name" value={lastName} onChange={setLastName} required />
            </div>
            <InputField label="Email" value={email} onChange={setEmail} type="email" required />
            <InputField label="Phone" value={phone} onChange={setPhone} type="tel" />
            <div>
              <label style={{ fontFamily: "var(--font-body)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)", display: "block", marginBottom: "0.5rem" }}>
                Notes <span style={{ textTransform: "none", letterSpacing: 0, opacity: 0.5 }}>(optional)</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything we should know before your visit..."
                rows={3}
                style={{
                  width: "100%",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.92rem",
                  color: "var(--bark)",
                  background: "transparent",
                  border: "1px solid rgba(140,123,107,0.2)",
                  padding: "14px 16px",
                  resize: "vertical",
                  outline: "none",
                  fontWeight: 300,
                }}
              />
            </div>

            <button
              onClick={() => {
                if (!firstName.trim() || !lastName.trim() || !email.trim()) {
                  setError("Please fill in all required fields.");
                  return;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                  setError("Please enter a valid email address.");
                  return;
                }
                setError(null);
                setStep("confirm");
              }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--cream)",
                background: "var(--bark)",
                border: "none",
                padding: "18px 40px",
                cursor: "pointer",
                transition: "background 0.3s ease",
                alignSelf: "flex-start",
              }}
            >
              Review Booking
            </button>

            {error && (
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#c44", marginTop: "0.5rem" }}>
                {error}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── STEP 6: CONFIRM ───────────────────────────── */}
      {step === "confirm" && selectedService && selectedSlot && selectedDate && (
        <div>
          <p style={label}><span style={accent} /> Confirm Your Booking</p>
          <h2 style={heading}>Review & <em style={{ fontStyle: "italic" }}>confirm.</em></h2>

          <div style={{ background: "var(--linen)", padding: "clamp(1.5rem, 3vw, 2.5rem)", marginBottom: "2rem" }}>
            <div style={{ display: "grid", gap: "1.25rem" }}>
              <SummaryRow label="Treatment" value={selectedService.name} />
              <SummaryRow label="Date" value={formatDateLong(selectedDate)} />
              <SummaryRow label="Time" value={formatTime12(selectedSlot.time)} />
              <SummaryRow label="Duration" value={`${selectedService.durationMinutes} minutes`} />
              <SummaryRow label="Therapist" value={selectedSlot.staffName} />
              {selectedService.price && (
                <SummaryRow label="Price" value={formatPrice(selectedService.price)} />
              )}
              <div style={{ borderTop: "1px solid rgba(140,123,107,0.1)", paddingTop: "1.25rem" }}>
                <SummaryRow label="Name" value={`${firstName} ${lastName}`} />
                <SummaryRow label="Email" value={email} />
                {phone && <SummaryRow label="Phone" value={phone} />}
              </div>
              {notes && (
                <div style={{ borderTop: "1px solid rgba(140,123,107,0.1)", paddingTop: "1.25rem" }}>
                  <SummaryRow label="Notes" value={notes} />
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--cream)",
                background: submitting ? "var(--stone)" : "var(--bark)",
                border: "none",
                padding: "18px 48px",
                cursor: submitting ? "default" : "pointer",
                transition: "background 0.3s ease",
              }}
            >
              {submitting ? "Booking..." : "Confirm Appointment"}
            </button>
            <button
              onClick={goBack}
              disabled={submitting}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--stone)",
                background: "none",
                border: "1px solid rgba(140,123,107,0.2)",
                padding: "16px 32px",
                cursor: "pointer",
              }}
            >
              Edit Details
            </button>
          </div>

          {error && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#c44", marginTop: "1rem" }}>
              {error}
            </p>
          )}
        </div>
      )}

      {/* ── STEP 7: SUCCESS ───────────────────────────── */}
      {step === "success" && booking && (
        <div style={{ textAlign: "center", padding: "clamp(24px, 4vw, 48px) 0" }}>
          <div style={{ width: "48px", height: "1px", background: "var(--blush)", margin: "0 auto 2rem" }} />

          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--blush)", marginBottom: "1.5rem" }}>
            Booking Confirmed
          </p>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 300, color: "var(--bark)", lineHeight: 1.08, marginBottom: "1.5rem" }}>
            See you <em style={{ fontStyle: "italic" }}>soon.</em>
          </h2>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--mink)", lineHeight: 1.85, fontWeight: 300, maxWidth: "480px", margin: "0 auto 3rem" }}>
            Your appointment has been submitted. We will confirm your booking shortly.
          </p>

          {/* Confirmation card */}
          <div style={{ background: "var(--linen)", padding: "clamp(1.5rem, 3vw, 2.5rem)", textAlign: "left", maxWidth: "480px", margin: "0 auto 2rem" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.52rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "0.75rem" }}>
              Confirmation Code
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 300, color: "var(--bark)", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>
              {booking.confirmationCode}
            </p>

            <div style={{ display: "grid", gap: "0.75rem", borderTop: "1px solid rgba(140,123,107,0.1)", paddingTop: "1.25rem" }}>
              <SummaryRow label="Treatment" value={booking.serviceName} />
              <SummaryRow label="Date & Time" value={`${formatDateLong(booking.startAt.split("T")[0])} at ${formatTime12(booking.startAt.split("T")[1].substring(0, 5))}`} />
              <SummaryRow label="Duration" value={`${booking.durationMinutes} minutes`} />
              <SummaryRow label="Therapist" value={booking.staffName} />
            </div>
          </div>

          {/* Add to Calendar */}
          {booking.calendarLinks && (
            <div style={{ maxWidth: "480px", margin: "0 auto 2.5rem", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "1rem" }}>
                Add to Calendar
              </p>
              <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href={booking.calendarLinks.icsUrl}
                  download
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--bark)", border: "1px solid rgba(61,46,34,0.2)", padding: "10px 20px", textDecoration: "none", display: "inline-block" }}
                >
                  Apple / Outlook
                </a>
                <a
                  href={booking.calendarLinks.googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--bark)", border: "1px solid rgba(61,46,34,0.2)", padding: "10px 20px", textDecoration: "none", display: "inline-block" }}
                >
                  Google Calendar
                </a>
              </div>
            </div>
          )}

          {/* Next steps */}
          <div style={{ maxWidth: "480px", margin: "0 auto", textAlign: "left" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "1rem" }}>
              Before Your Visit
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Arrive with your hair in its natural, unwashed state if possible",
                "Avoid heavy oils or styling products the day before",
                "Plan to arrive 5 minutes early to settle in",
                "Wear comfortable clothing — you will be reclining",
              ].map((tip) => (
                <li key={tip} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "0.75rem" }}>
                  <span style={{ width: "6px", height: "1px", background: "var(--blush)", flexShrink: 0, marginTop: "9px" }} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--mink)", fontWeight: 300, lineHeight: 1.6 }}>
                    {tip}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ───────────────────────────────────────────

function InputField({
  label: fieldLabel,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label style={{ fontFamily: "var(--font-body)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)", display: "block", marginBottom: "0.5rem" }}>
        {fieldLabel} {required && <span style={{ color: "var(--blush)" }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        style={{
          width: "100%",
          fontFamily: "var(--font-body)",
          fontSize: "0.92rem",
          color: "var(--bark)",
          background: "transparent",
          border: "none",
          borderBottom: "1px solid rgba(140,123,107,0.25)",
          padding: "12px 0",
          outline: "none",
          fontWeight: 300,
        }}
      />
    </div>
  );
}

function SummaryRow({ label: rowLabel, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "baseline" }}>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--stone)", flexShrink: 0 }}>
        {rowLabel}
      </span>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--bark)", fontWeight: 300, textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}
