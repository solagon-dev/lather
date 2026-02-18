"use client";

import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" style={{ background: "var(--cream)", padding: "120px 48px" }}>
      <div style={{ marginBottom: "80px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
        <div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--stone)",
              marginBottom: "1rem",
            }}
          >
            The Rituals
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 300,
              color: "var(--bark)",
              lineHeight: 1.1,
            }}
          >
            Services
          </h2>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            color: "var(--stone)",
            maxWidth: "340px",
            lineHeight: 1.8,
            fontWeight: 300,
          }}
        >
          Each treatment is a carefully composed ritual—blending therapeutic technique with sensory calm.
        </p>
      </div>

      <div style={{ width: "100%", height: "1px", background: "rgba(140,123,107,0.2)" }} />

      <div>
        {services.map((service, idx) => (
          <ServiceRow key={service.id} service={service} index={idx} />
        ))}
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
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(140,123,107,0.2)",
        padding: "56px 0",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "start",
      }}
      className="service-row"
    >
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.5rem" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.85rem",
              color: "var(--stone)",
              fontStyle: "italic",
            }}
          >
            0{index + 1}
          </span>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 300,
              color: "var(--bark)",
              lineHeight: 1.15,
            }}
          >
            {service.name}
          </h3>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--sage)",
            marginBottom: "1.5rem",
            marginLeft: "2.5rem",
          }}
        >
          {service.tagline}
        </p>

        <div style={{ display: "flex", gap: "2rem", marginLeft: "2.5rem" }}>
          {service.price ? (
            <div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "4px" }}>Price</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--bark)", fontWeight: 300 }}>
                ${service.price}
              </p>
            </div>
          ) : (
            <div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "4px" }}>Pricing</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--stone)", fontWeight: 300, fontStyle: "italic" }}>
                Inquire
              </p>
            </div>
          )}
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "4px" }}>Duration</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--bark)", fontWeight: 300 }}>
              {service.duration}
            </p>
          </div>
        </div>
      </div>

      <div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.88rem",
            lineHeight: 1.85,
            color: "var(--mink)",
            fontWeight: 300,
            marginBottom: "1.5rem",
          }}
        >
          {service.description}
        </p>
        {service.note && (
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--stone)", fontStyle: "italic", marginBottom: "1.5rem" }}>
            {service.note}
          </p>
        )}

        <div style={{ marginBottom: "1.5rem" }}>
          {service.highlights.map((h) => (
            <div
              key={h}
              style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}
            >
              <span style={{ width: "20px", height: "1px", background: "var(--blush)", display: "block" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--mink)", fontWeight: 300 }}>{h}</span>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--stone)" }}>
          Best for: <span style={{ color: "var(--mink)", textTransform: "none", letterSpacing: 0, fontStyle: "italic" }}>{service.bestFor}</span>
        </p>

        <a
          href="#book"
          style={{
            display: "inline-block",
            marginTop: "2rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--bark)",
            borderBottom: "1px solid var(--bark)",
            paddingBottom: "2px",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Book this ritual →
        </a>
      </div>
    </div>
  );
}
