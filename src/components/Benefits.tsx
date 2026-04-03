"use client";

const benefits = [
  {
    title: "Deep Relaxation",
    body: "Scalp massage activates the parasympathetic nervous system—shifting your body from stress to rest at a physiological level.",
  },
  {
    title: "Scalp Reset",
    body: "Exfoliation and deep cleansing remove buildup, rebalance pH, and create the ideal environment for healthy follicle function.",
  },
  {
    title: "Improved Circulation",
    body: "Therapeutic massage techniques boost blood flow to the scalp, delivering oxygen and nutrients directly to each follicle.",
  },
  {
    title: "Stress Relief",
    body: "The ritual format reduces cortisol levels, unwinds physical tension, and restores mental clarity within a single session.",
  },
  {
    title: "Hair Strength",
    body: "Targeted serums and treatment protocols fortify each strand from root to tip—improving elasticity, shine, and density over time.",
  },
  {
    title: "Renewed Self-Care",
    body: "A Lather session is more than a treatment. It's a ritual that affirms the value of making unhurried time for yourself.",
  },
];

export default function Benefits() {
  return (
    <section
      className="reveal-section reveal-lift section-pad"
      style={{
        background: "var(--linen)",
        padding: "120px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative soft wash */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "50%",
          height: "60%",
          background:
            "radial-gradient(ellipse at 10% 100%, rgba(212,184,168,0.2), transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}
      >
        {/* Header grid */}
        <div
          className="benefits-header"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: "5rem",
            alignItems: "end",
            marginBottom: "72px",
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
              The Results
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                fontWeight: 300,
                color: "var(--bark)",
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
              }}
            >
              What your scalp{" "}
              <em style={{ fontStyle: "italic" }}>gains.</em>
            </h2>
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.92rem",
              lineHeight: 1.88,
              color: "var(--mink)",
              fontWeight: 300,
            }}
          >
            Each Lather ritual is designed to deliver both immediate and cumulative benefits. Sessions build on each other—and the results compound beautifully with time and consistency.
          </p>
        </div>

        {/* Benefits grid */}
        <div
          className="benefits-grid stagger-children"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
          }}
        >
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              style={{
                padding: "2.75rem",
                background: "rgba(247,243,238,0.75)",
                border: "1px solid rgba(140,123,107,0.1)",
                position: "relative",
                transition:
                  "transform 0.45s var(--ease-luxury), box-shadow 0.45s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 48px rgba(61,46,34,0.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  background: "var(--blush)",
                  marginBottom: "1.75rem",
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  fontWeight: 400,
                  color: "var(--bark)",
                  marginBottom: "0.85rem",
                  lineHeight: 1.2,
                }}
              >
                {benefit.title}
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
                {benefit.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
