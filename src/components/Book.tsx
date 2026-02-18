"use client";

export default function Book() {
  return (
    <section
      id="book"
      style={{
        background: "var(--linen)",
        padding: "120px 48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
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
        Reserve Your Ritual
      </p>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          fontWeight: 300,
          color: "var(--bark)",
          lineHeight: 1.1,
          marginBottom: "1.5rem",
          maxWidth: "700px",
        }}
      >
        Ready to <em>exhale?</em>
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          color: "var(--mink)",
          lineHeight: 1.8,
          maxWidth: "440px",
          fontWeight: 300,
          marginBottom: "3rem",
        }}
      >
        Book your head spa experience in Greenville, NC. Sessions are by appointment only—each time slot is reserved exclusively for you.
      </p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <a
          href="tel:+12525551234"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--cream)",
            background: "var(--bark)",
            padding: "16px 40px",
            textDecoration: "none",
            transition: "background 0.25s",
            display: "inline-block",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--mink)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bark)")}
        >
          Call to Book
        </a>
        <a
          href="mailto:hello@latherspa.com"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--bark)",
            border: "1px solid rgba(61,46,34,0.3)",
            padding: "16px 40px",
            textDecoration: "none",
            transition: "border-color 0.25s",
            display: "inline-block",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--bark)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(61,46,34,0.3)")}
        >
          Email Us
        </a>
      </div>

      <div
        style={{
          marginTop: "5rem",
          paddingTop: "3rem",
          borderTop: "1px solid rgba(140,123,107,0.2)",
          width: "100%",
          maxWidth: "600px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2rem",
          textAlign: "center",
        }}
      >
        {[
          { label: "Location", value: "Greenville, NC" },
          { label: "Hours", value: "Tue – Sat\n10am – 7pm" },
          { label: "Contact", value: "hello@latherspa.com" },
        ].map((item) => (
          <div key={item.label}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--stone)",
                marginBottom: "8px",
              }}
            >
              {item.label}
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                color: "var(--bark)",
                fontWeight: 300,
                whiteSpace: "pre-line",
              }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
