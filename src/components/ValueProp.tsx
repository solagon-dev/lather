"use client";

const pillars = [
  {
    number: "01",
    title: "Unhurried Ritual",
    body: "Every session is designed to slow time. No rushing, no shortcuts. From the moment you arrive, the pace shifts entirely to yours.",
  },
  {
    number: "02",
    title: "Therapeutic Precision",
    body: "Our techniques combine Japanese head spa tradition with modern scalp science — delivering results that go far beyond surface-level care.",
  },
  {
    number: "03",
    title: "Private Sanctuary",
    body: "Your session is yours alone. A quiet, private environment designed for complete sensory immersion and total decompression.",
  },
  {
    number: "04",
    title: "Curated Formulations",
    body: "We use only professional-grade, scalp-forward products — each selected for its therapeutic efficacy and sensory quality.",
  },
];

export default function ValueProp() {
  return (
    <>
      {/* ── EDITORIAL STATEMENT — large quote with image ──── */}
      <section
        className="reveal-section reveal-lift"
        style={{
          background: "var(--bark)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Desktop: side-by-side grid | Mobile: stacked with image as subtle BG */}
        <div
          className="valueprop-editorial"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "clamp(420px, 52vw, 640px)",
          }}
        >
          {/* Left: image (hidden on mobile, replaced by bg approach) */}
          <div className="valueprop-editorial-image" style={{ overflow: "hidden", position: "relative" }}>
            <img
              src="/media/editorial/value-prop.jpg"
              alt="Gold-framed mirror and warm interior at Lather Head Spa"
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Right: editorial statement */}
          <div
            className="grain-overlay valueprop-editorial-text"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "clamp(2.5rem, 5vw, 5rem)",
              position: "relative",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at 80% 30%, rgba(212,184,168,0.08), transparent 55%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--blush)",
                  marginBottom: "2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  opacity: 0.85,
                }}
              >
                <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
                The Lather Difference
              </p>

              <h2
                className="valueprop-headline"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "var(--linen)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  marginBottom: "2rem",
                  maxWidth: "480px",
                }}
              >
                Not a salon. Not a spa. A ritual built around your scalp.
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.88rem, 1.2vw, 0.95rem)",
                  lineHeight: 1.92,
                  color: "rgba(237,230,219,0.55)",
                  fontWeight: 300,
                  maxWidth: "420px",
                }}
              >
                Every detail at Lather — the pace, the products, the environment — exists to create the conditions under which genuine restoration can happen. Nothing is incidental. Nothing is rushed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUR PILLARS ──────────────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--cream)",
          padding: "clamp(72px, 10vw, 120px) clamp(20px, 4vw, 48px)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Desktop: 4-column grid | Mobile: handled via CSS */}
          <div
            className="valueprop-pillars stagger-children"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1px",
              background: "rgba(140,123,107,0.1)",
            }}
          >
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="valueprop-pillar"
                style={{
                  background: "var(--cream)",
                  padding: "clamp(1.5rem, 2.5vw, 2.5rem)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "10px",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    className="valueprop-pillar-number"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2.4rem",
                      fontWeight: 300,
                      color: "var(--blush)",
                      lineHeight: 1,
                      fontStyle: "italic",
                      opacity: 0.5,
                    }}
                  >
                    {pillar.number}
                  </span>
                </div>

                <div
                  className="valueprop-pillar-line"
                  style={{
                    width: "24px",
                    height: "1px",
                    background: "var(--blush)",
                    marginBottom: "1.5rem",
                    opacity: 0.4,
                  }}
                />

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)",
                    fontWeight: 300,
                    color: "var(--bark)",
                    marginBottom: "1rem",
                    lineHeight: 1.25,
                  }}
                >
                  {pillar.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.84rem",
                    lineHeight: 1.85,
                    color: "var(--stone)",
                    fontWeight: 300,
                  }}
                >
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
