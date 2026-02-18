"use client";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bark)",
        padding: "40px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.2rem",
          fontWeight: 300,
          letterSpacing: "0.18em",
          color: "var(--linen)",
          textTransform: "uppercase",
        }}
      >
        Lather
      </span>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          color: "rgba(237,230,219,0.4)",
        }}
      >
        © {new Date().getFullYear()} Lather Head Spa · Greenville, NC · All rights reserved.
      </p>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        {["Instagram", "Facebook"].map((social) => (
          <a
            key={social}
            href="#"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(237,230,219,0.5)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--linen)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(237,230,219,0.5)")}
          >
            {social}
          </a>
        ))}
      </div>
    </footer>
  );
}
