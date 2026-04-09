"use client";

import { useRef, useEffect } from "react";

export default function Book() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        // Progress: 0 when section top hits viewport bottom, 1 when centered
        const p = Math.max(0, Math.min((vh - rect.top) / (vh * 0.8), 1));

        // Glow: gentle fade in
        if (glowRef.current) {
          glowRef.current.style.opacity = `${Math.min(p * 0.5, 0.5)}`;
        }

        // Simple staggered reveals — wider spacing, no scale transforms
        const reveal = (start: number, span: number) =>
          Math.max(0, Math.min((p - start) / span, 1));

        if (eyebrowRef.current) {
          const v = reveal(0.15, 0.4);
          eyebrowRef.current.style.opacity = `${v}`;
          eyebrowRef.current.style.transform = `translateY(${(1 - v) * 14}px)`;
        }

        if (headlineRef.current) {
          const v = reveal(0.2, 0.45);
          headlineRef.current.style.opacity = `${v}`;
          headlineRef.current.style.transform = `translateY(${(1 - v) * 20}px)`;
        }

        if (bodyRef.current) {
          const v = reveal(0.3, 0.4);
          bodyRef.current.style.opacity = `${v}`;
          bodyRef.current.style.transform = `translateY(${(1 - v) * 16}px)`;
        }

        if (ctaRef.current) {
          const v = reveal(0.4, 0.4);
          ctaRef.current.style.opacity = `${v}`;
          ctaRef.current.style.transform = `translateY(${(1 - v) * 12}px)`;
        }

        if (infoRef.current) {
          const v = reveal(0.55, 0.35);
          infoRef.current.style.opacity = `${v}`;
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="book"
      className="grain-overlay section-pad"
      style={{
        background: "var(--charcoal)",
        padding: "clamp(100px, 14vw, 200px) clamp(20px, 4vw, 48px)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Animated radial glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120%",
          height: "80%",
          background: "radial-gradient(ellipse at 50% 30%, rgba(212,184,168,0.18), transparent 60%)",
          pointerEvents: "none",
          opacity: 0,
          willChange: "opacity",
        }}
      />

      <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.62rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--blush)",
            marginBottom: "1.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            opacity: 0,
            willChange: "transform, opacity",
          }}
        >
          <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
          Reserve Your Ritual
          <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
        </p>

        {/* Headline */}
        <h2
          ref={headlineRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.2rem, 7.5vw, 6.5rem)",
            fontWeight: 300,
            color: "var(--linen)",
            lineHeight: 1.02,
            marginBottom: "1.75rem",
            letterSpacing: "-0.015em",
            opacity: 0,
            willChange: "transform, opacity",
          }}
        >
          Ready to <em style={{ fontStyle: "italic" }}>exhale?</em>
        </h2>

        {/* Supporting copy */}
        <p
          ref={bodyRef}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            color: "rgba(237,230,219,0.62)",
            lineHeight: 1.88,
            maxWidth: "480px",
            margin: "0 auto 3.5rem",
            fontWeight: 300,
            opacity: 0,
            willChange: "transform, opacity",
          }}
        >
          Book your head spa experience in Greenville, NC. Sessions are by appointment only — each time slot is reserved exclusively for you.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{ opacity: 0, willChange: "transform, opacity" }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <a
              href="/book"
              className="book-online-btn"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-body)",
                fontSize: "0.67rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--bark)",
                background: "var(--linen)",
                padding: "20px 56px",
                textDecoration: "none",
                transition: "background 0.35s ease, transform 0.35s var(--ease-luxury)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--linen)"; e.currentTarget.style.transform = "none"; }}
            >
              Book Online
            </a>
          </div>
          <div
            className="book-secondary-row"
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "5rem" }}
          >
            <a
              href="tel:+12525310987"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(237,230,219,0.62)",
                border: "1px solid rgba(237,230,219,0.18)",
                padding: "14px 32px",
                textDecoration: "none",
                transition: "border-color 0.25s ease, color 0.25s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(237,230,219,0.55)"; e.currentTarget.style.color = "var(--linen)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(237,230,219,0.18)"; e.currentTarget.style.color = "rgba(237,230,219,0.62)"; }}
            >
              Call to Book
            </a>
            <a
              href="mailto:hello@latherspas.com"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(237,230,219,0.62)",
                border: "1px solid rgba(237,230,219,0.18)",
                padding: "14px 32px",
                textDecoration: "none",
                transition: "border-color 0.25s ease, color 0.25s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(237,230,219,0.55)"; e.currentTarget.style.color = "var(--linen)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(237,230,219,0.18)"; e.currentTarget.style.color = "rgba(237,230,219,0.62)"; }}
            >
              Email Us
            </a>
          </div>
        </div>

        {/* Info bar */}
        <div
          ref={infoRef}
          style={{
            paddingTop: "3rem",
            borderTop: "1px solid rgba(237,230,219,0.09)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "2rem",
            opacity: 0,
          }}
          className="book-info-grid"
        >
          {[
            { label: "Location", value: "Greenville, NC" },
            { label: "Hours", value: "Tue – Sat\n10am – 7pm" },
            { label: "Contact", value: "hello@latherspas.com" },
          ].map((item) => (
            <div key={item.label}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.55rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(237,230,219,0.3)", marginBottom: "10px" }}>
                {item.label}
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--linen)", fontWeight: 300, whiteSpace: "pre-line", lineHeight: 1.4 }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
