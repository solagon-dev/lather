"use client";

import { useRef, useEffect, useState } from "react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [featured, ...rest] = testimonials;
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const quotMarkRef = useRef<HTMLParagraphElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 769);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    const mark = quotMarkRef.current;
    if (!section || !mark) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = 1 - rect.bottom / (vh + rect.height);
        const progress = Math.max(0, Math.min(p, 1));

        // Quotation mark drifts slowly upward and fades
        mark.style.transform = `translateY(${progress * -60}px)`;
        mark.style.opacity = `${0.08 + progress * 0.04}`;

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="grain-overlay"
      style={{
        background: "var(--bark)",
        position: "relative",
      }}
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

      {/* ── FEATURED QUOTE — pinned on desktop ─────────────── */}
      <div
        style={{
          height: isMobile ? "auto" : "140vh",
          position: "relative",
        }}
      >
        <div
          ref={quoteRef}
          style={{
            position: isMobile ? "relative" : "sticky",
            top: 0,
            height: isMobile ? "auto" : "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)",
          }}
        >
          <div
            style={{
              maxWidth: "960px",
              position: "relative",
              zIndex: 1,
              textAlign: "center",
            }}
          >
            {/* Large quotation mark — animated */}
            <p
              ref={quotMarkRef}
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(10rem, 24vw, 20rem)",
                color: "var(--blush)",
                opacity: 0.08,
                lineHeight: 0.6,
                position: "absolute",
                top: "-0.3em",
                left: "50%",
                transform: "translateX(-50%)",
                pointerEvents: "none",
                userSelect: "none",
                willChange: "transform, opacity",
              }}
            >
              &ldquo;
            </p>

            {/* Eyebrow */}
            <p
              className="reveal-section reveal-fade"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--blush)",
                marginBottom: "clamp(2rem, 4vw, 3.5rem)",
                opacity: 0.7,
              }}
            >
              Guest Experiences
            </p>

            {/* Quote text */}
            <p
              className="reveal-section reveal-fade"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--linen)",
                lineHeight: 1.5,
                marginBottom: "clamp(2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.005em",
                maxWidth: "820px",
                margin: "0 auto clamp(2rem, 4vw, 3.5rem)",
              }}
            >
              &ldquo;{featured.quote}&rdquo;
            </p>

            {/* Attribution */}
            <div
              className="reveal-section reveal-fade"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}
            >
              <div style={{ width: "32px", height: "1px", background: "var(--blush)", opacity: 0.5 }} />
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--linen)", letterSpacing: "0.08em", fontWeight: 400 }}>
                  {featured.name}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", color: "rgba(237,230,219,0.42)", letterSpacing: "0.1em", marginTop: "4px" }}>
                  {featured.service} · {featured.location}
                </p>
              </div>
              <div style={{ width: "32px", height: "1px", background: "var(--blush)", opacity: 0.5 }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── SUPPORTING TESTIMONIALS ────────────────────────── */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 48px) clamp(80px, 10vw, 120px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="testimonials-grid stagger-children"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            borderTop: "1px solid rgba(237,230,219,0.07)",
            paddingTop: "48px",
          }}
        >
          {rest.map((t, i) => (
            <div
              key={i}
              style={{
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
                border: "1px solid rgba(237,230,219,0.09)",
                background: "rgba(237,230,219,0.025)",
                position: "relative",
                transition: "background 0.4s ease, border-color 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(237,230,219,0.05)";
                e.currentTarget.style.borderColor = "rgba(237,230,219,0.16)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(237,230,219,0.025)";
                e.currentTarget.style.borderColor = "rgba(237,230,219,0.09)";
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.5rem",
                  color: "var(--blush)",
                  opacity: 0.28,
                  lineHeight: 1,
                  marginBottom: "1rem",
                  fontStyle: "italic",
                }}
              >
                &ldquo;
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
                  fontWeight: 300,
                  color: "rgba(237,230,219,0.82)",
                  lineHeight: 1.72,
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                {t.quote}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <div style={{ width: "20px", height: "1px", background: "var(--blush)", opacity: 0.5, flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--linen)", letterSpacing: "0.08em", fontWeight: 400 }}>
                    {t.name}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", color: "rgba(237,230,219,0.38)", letterSpacing: "0.1em", marginTop: "3px" }}>
                    {t.service}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
