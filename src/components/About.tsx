"use client";

import { brandValues } from "@/lib/data";
import Link from "next/link";

export default function About() {
  return (
    <section
      id="about"
      className="reveal-section reveal-lift grain-overlay section-pad"
      style={{
        background: "var(--bark)",
        padding: "clamp(56px, 8.5vw, 120px) clamp(20px, 4vw, 48px)",
        color: "var(--cream)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient gradients */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 6% 35%, rgba(212,184,168,0.18), transparent 48%), radial-gradient(circle at 94% 75%, rgba(163,172,148,0.14), transparent 48%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Main grid: Philosophy + copy */}
        <div
          className="about-grid about-main"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "7rem",
            marginBottom: "100px",
            alignItems: "start",
          }}
        >
          {/* Left: Heading */}
          <div>
            <p
              className="about-eyebrow"
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
              <span
                style={{
                  display: "inline-block",
                  width: "28px",
                  height: "1px",
                  background: "var(--blush)",
                }}
              />
              Our Philosophy
            </p>
            <h2
              className="about-headline"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)",
                fontWeight: 300,
                lineHeight: 1.04,
                color: "var(--linen)",
                letterSpacing: "-0.01em",
                marginBottom: "3rem",
              }}
            >
              Slow care.
              <br />
              <em style={{ fontStyle: "italic" }}>Deep results.</em>
            </h2>

            {/* Metrics */}
            <div
              className="about-metrics"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1px",
                background: "rgba(237,230,219,0.08)",
                border: "1px solid rgba(237,230,219,0.1)",
                maxWidth: "480px",
              }}
            >
              {[
                { label: "Session Length", value: "60–90 min" },
                { label: "Atmosphere", value: "Private & Quiet" },
                { label: "Focus", value: "Scalp Longevity" },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="about-metric-item"
                  style={{
                    background: "rgba(237,230,219,0.04)",
                    padding: "18px 16px",
                  }}
                >
                  <p
                    className="about-metric-label"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.5rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(237,230,219,0.45)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {metric.label}
                  </p>
                  <p
                    className="about-metric-value"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.05rem",
                      color: "var(--linen)",
                      fontWeight: 300,
                      lineHeight: 1.2,
                    }}
                  >
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Copy */}
          <div className="about-copy" style={{ paddingTop: "0.5rem" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.92,
                color: "rgba(237,230,219,0.75)",
                fontWeight: 300,
                marginBottom: "1.75rem",
              }}
            >
              At Lather, we believe that the most transformative beauty experiences are also the most unhurried ones. Rooted in the Japanese head spa tradition and elevated with modern therapeutic technique, each ritual is a deliberate sequence of touch, warmth, and intention.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.92,
                color: "rgba(237,230,219,0.75)",
                fontWeight: 300,
                marginBottom: "2.5rem",
              }}
            >
              We are located in Greenville, NC—serving guests who understand that caring for the scalp is an act of self-preservation, not indulgence.
            </p>

            <Link
              href="/about"
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
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--linen)";
                e.currentTarget.style.gap = "16px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(237,230,219,0.7)";
                e.currentTarget.style.gap = "10px";
              }}
            >
              Our Full Story
              <span style={{ fontSize: "0.85rem" }}>→</span>
            </Link>
          </div>
        </div>

        {/* Team portrait */}
        <div
          className="about-portraits"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            marginBottom: "64px",
          }}
        >
          <div className="about-portrait-item" style={{ overflow: "hidden", height: "420px" }}>
            <img
              src="/media/team/team-atmosphere.jpg"
              alt="The Lather team — founders together at the spa"
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 35%",
                display: "block",
              }}
            />
          </div>
          <div className="about-portrait-item" style={{ overflow: "hidden", height: "420px" }}>
            <img
              src="/media/about/values-detail.jpg"
              alt="Lather Head Spa interior — waiting area with vintage rug and warm lighting"
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 30%",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Brand values */}
        <div
          className="about-values-section"
          style={{
            borderTop: "1px solid rgba(237,230,219,0.1)",
            paddingTop: "64px",
          }}
        >
          <div
            className="values-grid stagger-children"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "3.5rem",
            }}
          >
            {brandValues.map((v, i) => (
              <div key={i} className="about-value-card">
                <div
                  style={{
                    width: "32px",
                    height: "1px",
                    background: "var(--blush)",
                    marginBottom: "1.75rem",
                    opacity: 0.7,
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.45rem",
                    fontWeight: 300,
                    color: "var(--linen)",
                    marginBottom: "1rem",
                    fontStyle: "italic",
                    lineHeight: 1.2,
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    lineHeight: 1.85,
                    color: "rgba(237,230,219,0.62)",
                    fontWeight: 300,
                  }}
                >
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
