"use client";

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 48px 80px",
        position: "relative",
        background: "var(--linen)",
        overflow: "hidden",
      }}
    >
      {/* Decorative large letter */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(200px, 30vw, 420px)",
          fontWeight: 300,
          color: "rgba(140,123,107,0.08)",
          lineHeight: 1,
          userSelect: "none",
          whiteSpace: "nowrap",
          letterSpacing: "-0.05em",
          pointerEvents: "none",
        }}
      >
        Lather
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "48px",
          right: "48px",
          height: "1px",
          background: "rgba(140,123,107,0.15)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "40px",
          right: "48px",
          fontFamily: "var(--font-body)",
          fontSize: "0.65rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--stone)",
        }}
      >
        Greenville, NC
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--stone)",
            marginBottom: "1.5rem",
          }}
        >
          Head Spa &amp; Scalp Rituals
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 300,
            lineHeight: 1.05,
            color: "var(--bark)",
            marginBottom: "2rem",
            letterSpacing: "-0.01em",
          }}
        >
          Where the scalp
          <br />
          <em>breathes again.</em>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "var(--mink)",
            maxWidth: "480px",
            marginBottom: "2.5rem",
            fontWeight: 300,
          }}
        >
          Lather is a sanctuary for scalp health and hair restoration. Our rituals are designed to purify, nourish, and renew—leaving you grounded, refreshed, and luminous.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="#services"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--cream)",
              background: "var(--bark)",
              padding: "14px 32px",
              textDecoration: "none",
              transition: "background 0.25s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--mink)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bark)")}
          >
            Explore Services
          </a>
          <a
            href="#about"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--bark)",
              border: "1px solid rgba(61,46,34,0.3)",
              padding: "14px 32px",
              textDecoration: "none",
              transition: "border-color 0.25s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--bark)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(61,46,34,0.3)"; }}
          >
            Our Philosophy
          </a>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "32px",
          right: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--stone)",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "var(--stone)",
            opacity: 0.4,
          }}
        />
      </div>
    </section>
  );
}
