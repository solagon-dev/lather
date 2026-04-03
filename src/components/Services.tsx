"use client";

import { useState } from "react";
import { services } from "@/lib/data";
import Link from "next/link";

const serviceImages: Record<string, string> = {
  "classic-ritual": "/Photos/RAW/02.10.2026_LHS_RAWS/IMG_4083.jpg",
  "revitalize-restore": "/Photos/RAW/02.10.2026_LHS_RAWS/IMG_4104.jpg",
  "nourish-fortify": "/Photos/RAW/02.10.2026_LHS_RAWS/IMG_4098.jpg",
  "gentlemans-recharge": "/Photos/RAW/02.10.2026_LHS_RAWS/IMG_4135.jpg",
};

const fallbackImage = "/Photos/RAW/02.10.2026_LHS_RAWS/IMG_4119.jpg";

export default function Services() {
  return (
    <section
      id="services"
      className="reveal-section reveal-lift section-pad"
      style={{
        background: "var(--cream)",
        padding: "clamp(56px, 8.5vw, 120px) clamp(20px, 4vw, 48px)",
        position: "relative",
      }}
    >
      {/* Subtle top border accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "48px",
          right: "48px",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(140,123,107,0.25) 30%, rgba(140,123,107,0.25) 70%, transparent)",
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            marginBottom: "72px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
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
              <span
                style={{
                  display: "inline-block",
                  width: "28px",
                  height: "1px",
                  background: "var(--blush)",
                }}
              />
              The Rituals
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
              Our{" "}
              <em style={{ fontStyle: "italic" }}>services.</em>
            </h2>
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "var(--stone)",
              maxWidth: "360px",
              lineHeight: 1.85,
              fontWeight: 300,
            }}
          >
            Each treatment is a carefully composed ritual—blending therapeutic technique with sensory calm.
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(140,123,107,0.2) 15%, rgba(140,123,107,0.2) 85%, transparent)",
          }}
        />

        {/* Service rows */}
        <div>
          {services.map((service, idx) => (
            <ServiceRow key={service.id} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const imageSrc = serviceImages[service.id] ?? fallbackImage;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: "1px solid rgba(140,123,107,0.15)",
        padding: "clamp(32px, 5vw, 60px) 0",
        display: "grid",
        gridTemplateColumns: "1fr 1fr auto",
        gap: "4rem",
        alignItems: "start",
        transitionDelay: `${Math.min(index * 60, 240)}ms`,
        transition: "background 0.4s ease",
      }}
      className="service-row reveal-section reveal-fade"
    >
      {/* Left: Name, price, duration */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "1rem",
            marginBottom: "0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.9rem",
              color: "var(--blush)",
              fontStyle: "italic",
              opacity: 0.8,
              flexShrink: 0,
            }}
          >
            0{index + 1}
          </span>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)",
              fontWeight: 300,
              color: "var(--bark)",
              lineHeight: 1.12,
              transition: "color 0.3s ease",
            }}
          >
            {service.name}
          </h3>
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.68rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--sage)",
            marginBottom: "2rem",
            marginLeft: "2.5rem",
          }}
        >
          {service.tagline}
        </p>

        <div style={{ display: "flex", gap: "2.5rem", marginLeft: "2.5rem" }}>
          {service.price ? (
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--stone)",
                  marginBottom: "6px",
                }}
              >
                Price
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  color: "var(--bark)",
                  fontWeight: 300,
                }}
              >
                ${service.price}
              </p>
            </div>
          ) : (
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--stone)",
                  marginBottom: "6px",
                }}
              >
                Pricing
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  color: "var(--stone)",
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
              >
                Inquire
              </p>
            </div>
          )}

          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.58rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--stone)",
                marginBottom: "6px",
              }}
            >
              Duration
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                color: "var(--bark)",
                fontWeight: 300,
              }}
            >
              {service.duration}
            </p>
          </div>
        </div>
      </div>

      {/* Center: Description, highlights, CTA */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            lineHeight: 1.88,
            color: "var(--mink)",
            fontWeight: 300,
            marginBottom: "1.75rem",
          }}
        >
          {service.description}
        </p>

        {service.note && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "var(--stone)",
              fontStyle: "italic",
              marginBottom: "1.75rem",
              opacity: 0.85,
            }}
          >
            {service.note}
          </p>
        )}

        <div style={{ marginBottom: "1.75rem" }}>
          {service.highlights.map((h) => (
            <div
              key={h}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  width: "22px",
                  height: "1px",
                  background: "var(--blush)",
                  display: "block",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.82rem",
                  color: "var(--mink)",
                  fontWeight: 300,
                }}
              >
                {h}
              </span>
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.62rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--stone)",
            marginBottom: "2rem",
          }}
        >
          Best for:{" "}
          <span
            style={{
              color: "var(--mink)",
              textTransform: "none",
              letterSpacing: 0,
              fontStyle: "italic",
            }}
          >
            {service.bestFor}
          </span>
        </p>

        <Link
          href={`/treatments/${service.id}`}
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
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.5";
            e.currentTarget.style.gap = "16px";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.gap = "10px";
          }}
        >
          View this ritual
          <span style={{ fontSize: "0.85rem" }}>→</span>
        </Link>
      </div>

      {/* Right: Service image — hidden on mobile via CSS class */}
      <div
        className="service-image-col"
        style={{
          width: "280px",
          height: "340px",
          overflow: "hidden",
          flexShrink: 0,
          position: "relative",
        }}
      >
        <img
          src={imageSrc}
          alt={`${service.name} at Lather Head Spa`}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.9s var(--ease-luxury), opacity 0.4s ease",
            opacity: hovered ? 1 : 0.82,
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
      </div>
    </div>
  );
}
