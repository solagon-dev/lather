"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { testimonials } from "@/lib/data";

const CYCLE_DURATION = 7000; // ms per testimonial

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const startTimeRef = useRef(Date.now());
  const rafRef = useRef<number>(0);

  const count = testimonials.length;

  const goTo = useCallback((i: number) => {
    setActive(i);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const next = useCallback(() => {
    goTo((active + 1) % count);
  }, [active, count, goTo]);

  const prev = useCallback(() => {
    goTo((active - 1 + count) % count);
  }, [active, count, goTo]);

  // Intersection observer — only animate when in view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  // Auto-cycle with progress animation
  useEffect(() => {
    if (paused || !isVisible) return;

    startTimeRef.current = Date.now() - progress * CYCLE_DURATION;

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const p = Math.min(elapsed / CYCLE_DURATION, 1);
      setProgress(p);

      if (p >= 1) {
        setActive((prev) => (prev + 1) % count);
        setProgress(0);
        startTimeRef.current = Date.now();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, isVisible, count, progress]);

  return (
    <section
      ref={sectionRef}
      className="grain-overlay"
      style={{
        background: "var(--bark)",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 110%, rgba(212,184,168,0.12), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "clamp(100px, 12vw, 180px) clamp(20px, 4vw, 48px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.62rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--blush)",
            marginBottom: "clamp(3rem, 5vw, 5rem)",
            textAlign: "center",
            opacity: 0.7,
          }}
        >
          Guest Experiences
        </p>

        {/* Quote — crossfade container */}
        <div
          style={{
            position: "relative",
            minHeight: "clamp(200px, 30vw, 320px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {testimonials.map((item, i) => (
            <div
              key={i}
              aria-hidden={i !== active}
              style={{
                position: i === active ? "relative" : "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                opacity: i === active ? 1 : 0,
                transform: i === active ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                pointerEvents: i === active ? "auto" : "none",
              }}
            >
              {/* Large decorative open-quote */}
              <p
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(4rem, 8vw, 7rem)",
                  color: "var(--blush)",
                  opacity: 0.15,
                  lineHeight: 1,
                  marginBottom: "-0.5em",
                  userSelect: "none",
                }}
              >
                &ldquo;
              </p>

              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.3rem, 3vw, 2.4rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "var(--linen)",
                  lineHeight: 1.55,
                  textAlign: "center",
                  letterSpacing: "-0.005em",
                  maxWidth: "820px",
                  marginBottom: "clamp(2rem, 3.5vw, 3rem)",
                }}
              >
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "32px", height: "1px", background: "var(--blush)", opacity: 0.4 }} />
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--linen)", letterSpacing: "0.08em", fontWeight: 400 }}>
                    {item.name}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", color: "rgba(237,230,219,0.4)", letterSpacing: "0.1em", marginTop: "4px" }}>
                    {item.service}
                  </p>
                </div>
                <div style={{ width: "32px", height: "1px", background: "var(--blush)", opacity: 0.4 }} />
              </div>
            </div>
          ))}
        </div>

        {/* ── Controls: arrows + progress indicators ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(20px, 3vw, 36px)",
            marginTop: "clamp(3rem, 5vw, 5rem)",
          }}
        >
          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            style={{
              background: "none",
              border: "1px solid rgba(237,230,219,0.15)",
              color: "rgba(237,230,219,0.5)",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              transition: "border-color 0.3s, color 0.3s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(237,230,219,0.4)"; e.currentTarget.style.color = "var(--linen)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(237,230,219,0.15)"; e.currentTarget.style.color = "rgba(237,230,219,0.5)"; }}
          >
            ←
          </button>

          {/* Progress bars */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                style={{
                  width: i === active ? "48px" : "24px",
                  height: "2px",
                  border: "none",
                  borderRadius: "1px",
                  cursor: "pointer",
                  padding: 0,
                  position: "relative",
                  background: "rgba(237,230,219,0.12)",
                  transition: "width 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                  overflow: "hidden",
                }}
              >
                {/* Fill — animated on active, full on past, empty on future */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    borderRadius: "1px",
                    background: "var(--blush)",
                    width: i === active ? `${progress * 100}%` : i < active ? "100%" : "0%",
                    transition: i === active ? "none" : "width 0.4s ease",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Next testimonial"
            style={{
              background: "none",
              border: "1px solid rgba(237,230,219,0.15)",
              color: "rgba(237,230,219,0.5)",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              transition: "border-color 0.3s, color 0.3s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(237,230,219,0.4)"; e.currentTarget.style.color = "var(--linen)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(237,230,219,0.15)"; e.currentTarget.style.color = "rgba(237,230,219,0.5)"; }}
          >
            →
          </button>
        </div>

        {/* Counter */}
        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-display)",
            fontSize: "0.82rem",
            color: "rgba(237,230,219,0.25)",
            marginTop: "1.5rem",
            fontStyle: "italic",
            letterSpacing: "0.05em",
          }}
        >
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}
