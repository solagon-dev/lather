"use client";

import Link from "next/link";

const concerns = [
  { label: "Oily or congested scalp", icon: "◦" },
  { label: "Thinning or shedding", icon: "◦" },
  { label: "Dry, flaky, or irritated", icon: "◦" },
  { label: "Product buildup", icon: "◦" },
  { label: "Stress & tension", icon: "◦" },
  { label: "Damaged or color-treated", icon: "◦" },
];

export default function ConcernPaths() {
  return (
    <section
      className="reveal-section reveal-lift grain-overlay section-pad"
      style={{
        background: "var(--bark)",
        padding: "clamp(56px, 8.5vw, 100px) clamp(20px, 4vw, 48px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 80% 30%, rgba(212,184,168,0.1), transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="about-grid"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.62rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--blush)",
              marginBottom: "1.2rem",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              opacity: 0.85,
            }}
          >
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
            Scalp Concerns
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 300,
              color: "var(--linen)",
              lineHeight: 1.06,
              letterSpacing: "-0.01em",
              marginBottom: "1.5rem",
            }}
          >
            What&apos;s your scalp{" "}
            <em style={{ fontStyle: "italic" }}>telling you?</em>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              lineHeight: 1.88,
              color: "rgba(237,230,219,0.62)",
              fontWeight: 300,
              maxWidth: "440px",
              marginBottom: "2.5rem",
            }}
          >
            Every concern has a ritual. Whether you&apos;re managing buildup, thinning, dryness, or simply craving deep calm — we&apos;ll match you to the right treatment.
          </p>

          <Link
            href="/scalp-concerns"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "var(--font-body)",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(237,230,219,0.7)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(237,230,219,0.3)",
              paddingBottom: "3px",
              transition: "color 0.25s, gap 0.3s var(--ease-luxury)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--linen)"; e.currentTarget.style.gap = "16px"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(237,230,219,0.7)"; e.currentTarget.style.gap = "10px"; }}
          >
            Find your treatment pathway
            <span style={{ fontSize: "0.85rem" }}>→</span>
          </Link>
        </div>

        <div>
          {concerns.map((concern, i) => (
            <Link
              key={concern.label}
              href="/scalp-concerns"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "18px 0",
                borderBottom: i < concerns.length - 1 ? "1px solid rgba(237,230,219,0.07)" : "none",
                textDecoration: "none",
                transition: "padding-left 0.3s var(--ease-luxury)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = "12px")}
              onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = "0")}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--blush)",
                  opacity: 0.5,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                  fontWeight: 300,
                  color: "rgba(237,230,219,0.72)",
                  transition: "color 0.2s ease",
                }}
              >
                {concern.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
