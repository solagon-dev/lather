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

function formatDateTimeET(isoStr: string) {
  const d = new Date(isoStr);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
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
  fontSize: "0.72rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#5C4E42",
  marginBottom: "0.6rem",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontWeight: 400,
};

const heading: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(1.6rem, 5vw, 2.6rem)",
  fontWeight: 400,
  color: "var(--bark)",
  lineHeight: 1.12,
  marginBottom: "clamp(20px, 3.5vw, 40px)",
};

const accent: React.CSSProperties = {
  display: "inline-block",
  width: "28px",
  height: "2px",
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

  // Calendar month navigation
  const [calMonth, setCalMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

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
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "clamp(28px, 4vw, 40px)" }}>
          {steps.map((s, i) => (
            <div
              key={s}
              style={{
                flex: 1,
                height: "3px",
                borderRadius: "2px",
                background: i <= stepIndex ? "var(--bark)" : "rgba(140,123,107,0.12)",
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
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "4px" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 2vw, 1.5rem)", fontWeight: 400, color: "var(--bark)" }}>
                      {service.name}
                    </span>
                    {service.tier && (
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5C4E42", padding: "3px 8px", border: "1px solid rgba(140,123,107,0.2)" }}>
                        {service.tier}
                      </span>
                    )}
                  </div>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#5C4E42", fontWeight: 400 }}>
                    {service.durationMinutes} min · {formatPrice(service.price)}
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--bark)" }}>→</span>
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
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 400, color: "var(--bark)", display: "block", marginBottom: "4px" }}>
                  No preference
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#5C4E42" }}>
                  We will match you with the best available therapist
                </span>
              </div>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--bark)" }}>→</span>
            </button>

            {availableStaff.map((s) => (
              <button
                key={s.id}
                onClick={() => { setSelectedStaff(s); setNoStaffPreference(false); setStep("date"); }}
                style={{
                  background: "var(--cream)",
                  border: "1px solid rgba(140,123,107,0.15)",
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
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 400, color: "var(--bark)" }}>
                    {s.name}
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--bark)" }}>→</span>
              </button>
            ))}
          </div>}
        </div>
      )}

      {/* ── STEP 3: DATE — Calendar ────────────────────── */}
      {step === "date" && (() => {
        const today = new Date().toISOString().split("T")[0];
        const nowMonth = new Date().getMonth();
        const nowYear = new Date().getFullYear();
        const maxMonth = nowMonth + 3; // Allow booking ~3 months ahead

        // Build calendar grid for the current calMonth
        const firstDay = new Date(calMonth.year, calMonth.month, 1);
        const startDow = firstDay.getDay(); // 0=Sun
        const daysInMonth = new Date(calMonth.year, calMonth.month + 1, 0).getDate();
        const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(firstDay);

        const canGoPrev = calMonth.year > nowYear || calMonth.month > nowMonth;
        const canGoNext = (calMonth.year - nowYear) * 12 + calMonth.month - nowMonth < maxMonth;

        // Build 6-week grid of day numbers (null = empty cell)
        const cells: (number | null)[] = [];
        for (let i = 0; i < startDow; i++) cells.push(null);
        for (let d = 1; d <= daysInMonth; d++) cells.push(d);
        while (cells.length % 7 !== 0) cells.push(null);

        return (
          <div>
            <p style={label}><span style={accent} /> Pick a Date</p>
            <h2 style={heading}>When works <em style={{ fontStyle: "italic" }}>best?</em></h2>

            {/* Calendar container with border */}
            <div style={{ border: "1px solid rgba(140,123,107,0.15)", background: "#fff" }}>

              {/* Month navigation header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid rgba(140,123,107,0.1)" }}>
                <button
                  onClick={() => setCalMonth((p) => {
                    const m = p.month - 1;
                    return m < 0 ? { year: p.year - 1, month: 11 } : { year: p.year, month: m };
                  })}
                  disabled={!canGoPrev}
                  style={{ background: "none", border: "none", cursor: canGoPrev ? "pointer" : "default", fontSize: "1.1rem", color: canGoPrev ? "var(--bark)" : "rgba(140,123,107,0.2)", padding: "4px 8px" }}
                >
                  ←
                </button>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 500, color: "var(--bark)" }}>
                  {monthLabel}
                </span>
                <button
                  onClick={() => setCalMonth((p) => {
                    const m = p.month + 1;
                    return m > 11 ? { year: p.year + 1, month: 0 } : { year: p.year, month: m };
                  })}
                  disabled={!canGoNext}
                  style={{ background: "none", border: "none", cursor: canGoNext ? "pointer" : "default", fontSize: "1.1rem", color: canGoNext ? "var(--bark)" : "rgba(140,123,107,0.2)", padding: "4px 8px" }}
                >
                  →
                </button>
              </div>

              {/* Day-of-week headers */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid rgba(140,123,107,0.08)" }}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8C7B6B", padding: "12px 0" }}>
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", padding: "8px" }}>
                {cells.map((day, i) => {
                  if (day === null) return <div key={`empty-${i}`} style={{ padding: "12px" }} />;

                  const dateStr = `${calMonth.year}-${String(calMonth.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const dow = new Date(dateStr + "T12:00:00").getDay();
                  const isClosed = dow === 0 || dow === 1;
                  const isPast = dateStr < today;
                  const isDisabled = isClosed || isPast;
                  const isSelected = selectedDate === dateStr;
                  const isCurrentDay = dateStr === today;

                  return (
                    <button
                      key={dateStr}
                      disabled={isDisabled}
                      onClick={() => { setSelectedDate(dateStr); setSelectedSlot(null); setStep("time"); }}
                      style={{
                        padding: "12px 4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: isSelected ? "var(--bark)" : isCurrentDay ? "var(--linen)" : "transparent",
                        border: "none",
                        borderRadius: "4px",
                        cursor: isDisabled ? "default" : "pointer",
                        opacity: isDisabled ? 0.25 : 1,
                        transition: "background 0.15s ease",
                      }}
                    >
                      <span style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem",
                        fontWeight: isCurrentDay || isSelected ? 600 : 400,
                        color: isSelected ? "#fff" : isCurrentDay ? "var(--bark)" : "var(--bark)",
                      }}>
                        {day}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Footer legend */}
              <div style={{ display: "flex", gap: "20px", padding: "12px 20px", borderTop: "1px solid rgba(140,123,107,0.08)", justifyContent: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "#5C4E42" }}>
                  <span style={{ width: "16px", height: "16px", borderRadius: "3px", background: "var(--linen)", display: "inline-block", border: "1px solid rgba(140,123,107,0.1)" }} /> Today
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "#5C4E42" }}>
                  <span style={{ width: "16px", height: "16px", borderRadius: "3px", background: "var(--bark)", display: "inline-block" }} /> Selected
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "#8C7B6B" }}>
                  Sun & Mon — Closed
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── STEP 4: TIME ──────────────────────────────── */}
      {step === "time" && (() => {
        const deduped = Array.from(new Map(slots.map((s) => [s.time, s])).values());
        const morning = deduped.filter((s) => { const h = parseInt(s.time.split(":")[0]); return h < 12; });
        const afternoon = deduped.filter((s) => { const h = parseInt(s.time.split(":")[0]); return h >= 12; });

        return (
        <div>
          <p style={label}><span style={accent} /> Select a Time</p>
          <h2 style={heading}>
            {selectedDate && formatDateLong(selectedDate)}
          </h2>

          {/* Selected service reminder */}
          {selectedService && (
            <div style={{ display: "flex", gap: "16px", marginBottom: "28px", padding: "16px 20px", background: "var(--linen)", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", fontWeight: 500, color: "var(--bark)" }}>{selectedService.name}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#5C4E42" }}>{selectedService.durationMinutes} min</span>
              <button onClick={() => setStep("date")} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#5C4E42", textDecoration: "underline" }}>
                Change date
              </button>
            </div>
          )}

          {loadingSlots && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--stone)", textAlign: "center", padding: "3rem 0" }}>
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
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--bark)", borderBottom: "1px solid rgba(61,46,34,0.3)", paddingBottom: "3px" }}
              >
                Choose another date
              </button>
            </div>
          )}

          {!loadingSlots && slots.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {/* Morning */}
              {morning.length > 0 && (
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5C4E42", marginBottom: "14px" }}>
                    Morning
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
                    {morning.map((slot) => {
                      const isSelected = selectedSlot?.time === slot.time;
                      return (
                        <button key={slot.time} onClick={() => { setSelectedSlot(slot); setStep("details"); }}
                          style={{ background: isSelected ? "var(--bark)" : "transparent", border: "1px solid " + (isSelected ? "var(--bark)" : "rgba(140,123,107,0.15)"), cursor: "pointer", padding: "16px 12px", textAlign: "center", transition: "all 0.15s ease", borderRadius: "0" }}>
                          <span style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: isSelected ? 500 : 400, color: isSelected ? "var(--linen)" : "var(--bark)" }}>
                            {formatTime12(slot.time)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Afternoon */}
              {afternoon.length > 0 && (
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5C4E42", marginBottom: "14px" }}>
                    Afternoon
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
                    {afternoon.map((slot) => {
                      const isSelected = selectedSlot?.time === slot.time;
                      return (
                        <button key={slot.time} onClick={() => { setSelectedSlot(slot); setStep("details"); }}
                          style={{ background: isSelected ? "var(--bark)" : "transparent", border: "1px solid " + (isSelected ? "var(--bark)" : "rgba(140,123,107,0.15)"), cursor: "pointer", padding: "16px 12px", textAlign: "center", transition: "all 0.15s ease", borderRadius: "0" }}>
                          <span style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: isSelected ? 500 : 400, color: isSelected ? "var(--linen)" : "var(--bark)" }}>
                            {formatTime12(slot.time)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        );
      })()}

      {/* ── STEP 5: DETAILS ───────────────────────────── */}
      {step === "details" && (
        <div>
          <p style={label}><span style={accent} /> Your Information</p>
          <h2 style={heading}>Almost <em style={{ fontStyle: "italic" }}>there.</em></h2>

          <div style={{ display: "grid", gap: "1.5rem" }}>
            <div className="booking-name-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <InputField label="First Name" value={firstName} onChange={setFirstName} required />
              <InputField label="Last Name" value={lastName} onChange={setLastName} required />
            </div>
            <InputField label="Email" value={email} onChange={setEmail} type="email" required />
            <InputField label="Phone" value={phone} onChange={setPhone} type="tel" />
            <div>
              <label style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#3D2E22", display: "block", marginBottom: "8px", fontWeight: 500 }}>
                Notes <span style={{ textTransform: "none", letterSpacing: 0, fontWeight: 300, color: "#8C7B6B", fontSize: "0.82rem" }}>(optional)</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything we should know before your visit..."
                rows={3}
                style={{
                  width: "100%",
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  color: "var(--bark)",
                  background: "transparent",
                  border: "1px solid rgba(140,123,107,0.2)",
                  padding: "14px 16px",
                  resize: "vertical",
                  outline: "none",
                  fontWeight: 300,
                  lineHeight: 1.6,
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
              className="booking-review-btn"
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
                width: "100%",
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

          <div className="booking-confirm-actions" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="booking-confirm-primary"
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
              className="booking-confirm-secondary"
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
              <SummaryRow label="Date & Time" value={formatDateTimeET(booking.startAt)} />
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
      <label style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#3D2E22", display: "block", marginBottom: "8px", fontWeight: 500 }}>
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
          fontSize: "1rem",
          color: "var(--bark)",
          background: "transparent",
          border: "1px solid rgba(140,123,107,0.2)",
          padding: "14px 16px",
          outline: "none",
          fontWeight: 300,
          transition: "border-color 0.2s ease",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--bark)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(140,123,107,0.2)")}
      />
    </div>
  );
}

function SummaryRow({ label: rowLabel, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "1.5rem", alignItems: "baseline", padding: "8px 0" }}>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5C4E42", flexShrink: 0 }}>
        {rowLabel}
      </span>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--bark)", fontWeight: 400, textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}
