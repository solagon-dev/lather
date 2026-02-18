import { brandValues } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: "var(--bark)",
        padding: "120px 48px",
        color: "var(--cream)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          marginBottom: "100px",
          alignItems: "start",
        }}
        className="about-grid"
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--blush)",
              marginBottom: "1rem",
            }}
          >
            Our Philosophy
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "var(--linen)",
            }}
          >
            Slow care.
            <br />
            <em>Deep results.</em>
          </h2>
        </div>

        <div style={{ paddingTop: "1rem" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              lineHeight: 1.9,
              color: "rgba(237,230,219,0.8)",
              fontWeight: 300,
              marginBottom: "1.5rem",
            }}
          >
            At Lather, we believe that the most transformative beauty experiences are also the most unhurried ones. Rooted in the Japanese head spa tradition and elevated with modern therapeutic technique, each ritual is a deliberate sequence of touch, warmth, and intention.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              lineHeight: 1.9,
              color: "rgba(237,230,219,0.8)",
              fontWeight: 300,
            }}
          >
            We are located in Greenville, NC—serving guests who understand that caring for the scalp is an act of self-preservation, not indulgence.
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(237,230,219,0.15)",
          paddingTop: "60px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "3rem",
        }}
        className="values-grid"
      >
        {brandValues.map((v, i) => (
          <div key={i}>
            <div
              style={{
                width: "32px",
                height: "1px",
                background: "var(--blush)",
                marginBottom: "1.5rem",
              }}
            />
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 300,
                color: "var(--linen)",
                marginBottom: "1rem",
                fontStyle: "italic",
              }}
            >
              {v.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                lineHeight: 1.8,
                color: "rgba(237,230,219,0.7)",
                fontWeight: 300,
              }}
            >
              {v.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
