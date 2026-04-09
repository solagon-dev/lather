"use client";

import Link from "next/link";
import { services } from "@/lib/data";

const treatmentImages: Record<string, string> = {
  "luxe-ritual": "/media/treatments/nourish-fortify.jpg",
  "classic-ritual": "/media/treatments/classic-ritual.jpg",
  "gentlemans-recharge": "/media/treatments/gentlemans-card.jpg",
  "blowout": "/media/treatments/revitalize-restore.jpg",
};

const tierLabels: Record<string, string> = {
  foundation: "Foundation",
  specialized: "Specialized",
  premium: "Premium",
  express: "Express",
};

export default function TreatmentCards() {
  return (
    <section
      id="services"
      className="reveal-section reveal-lift section-pad"
      style={{
        background: "var(--cream)",
        padding: "clamp(72px, 10vw, 140px) clamp(20px, 4vw, 48px)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div className="tc-header" style={{ marginBottom: "clamp(48px, 7vw, 80px)" }}>
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--stone)",
                marginBottom: "1.2rem",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
              Choose Your Ritual
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
                fontWeight: 300,
                color: "var(--bark)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
              }}
            >
              Four rituals. <em style={{ fontStyle: "italic" }}>One intention.</em>
            </h2>
          </div>
          <Link
            href="/treatments"
            className="tc-view-all"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "var(--font-body)",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--bark)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(61,46,34,0.35)",
              paddingBottom: "3px",
              transition: "opacity 0.25s, gap 0.3s var(--ease-luxury)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.5"; e.currentTarget.style.gap = "16px"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.gap = "10px"; }}
          >
            View all treatments <span style={{ fontSize: "0.85rem" }}>→</span>
          </Link>
        </div>

        {/* ── Desktop: 2×2 editorial grid ── */}
        <div
          className="treatment-cards-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(16px, 2vw, 24px)",
          }}
        >
          {services.map((service, i) => (
            <Link
              key={service.id}
              href={`/treatments/${service.id}`}
              style={{
                textDecoration: "none",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                background: "var(--linen)",
                transition: "box-shadow 0.5s ease",
                overflow: "hidden",
              }}
              className="treatment-card-item"
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 40px rgba(61,46,34,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Image side */}
              <div
                className="tc-card-image"
                style={{
                  overflow: "hidden",
                  height: "clamp(220px, 22vw, 320px)",
                  order: i % 2 === 0 ? 0 : 1,
                }}
              >
                <img
                  src={treatmentImages[service.id] || "/media/treatments/treatment-fallback.jpg"}
                  alt={`${service.name} at Lather Head Spa`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 1.2s var(--ease-luxury)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>

              {/* Text side */}
              <div
                className="tc-card-text"
                style={{
                  padding: "clamp(1.25rem, 2.5vw, 2rem)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  order: i % 2 === 0 ? 1 : 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.8rem",
                      fontStyle: "italic",
                      color: "var(--blush)",
                      opacity: 0.6,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.5rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--stone)",
                      padding: "3px 8px",
                      border: "1px solid rgba(140,123,107,0.15)",
                    }}
                  >
                    {tierLabels[service.tier]}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.3rem, 2vw, 1.65rem)",
                    fontWeight: 300,
                    color: "var(--bark)",
                    lineHeight: 1.15,
                    marginBottom: "0.5rem",
                  }}
                >
                  {service.name}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.08em",
                    color: "var(--stone)",
                    marginBottom: "1rem",
                  }}
                >
                  {service.duration} · ${service.price}
                </p>

                <p
                  className="tc-card-tagline"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.82rem",
                    lineHeight: 1.75,
                    color: "var(--mink)",
                    fontWeight: 300,
                    marginBottom: "1.25rem",
                    flex: 1,
                  }}
                >
                  {service.tagline}
                </p>

                <p
                  className="tc-card-cta"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--bark)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  Learn more <span style={{ fontSize: "0.8rem" }}>→</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
