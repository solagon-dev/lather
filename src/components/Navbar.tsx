"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? "16px 48px" : "28px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(247,243,238,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(140,123,107,0.15)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.75rem",
            fontWeight: 300,
            letterSpacing: "0.18em",
            color: "var(--bark)",
            textTransform: "uppercase",
          }}
        >
          Lather
        </span>
      </Link>

      <nav
        style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}
        className="hidden md:flex"
      >
        {["Services", "About", "Book"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--mink)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--bark)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mink)")}
          >
            {item}
          </a>
        ))}
        <a
          href="#book"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--cream)",
            background: "var(--bark)",
            padding: "10px 24px",
            textDecoration: "none",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--mink)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bark)")}
        >
          Book Now
        </a>
      </nav>

      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
        aria-label="Toggle menu"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "24px",
                height: "1px",
                background: "var(--bark)",
                transition: "transform 0.3s",
                transformOrigin: "center",
                transform:
                  menuOpen
                    ? i === 0
                      ? "translateY(6px) rotate(45deg)"
                      : i === 2
                      ? "translateY(-6px) rotate(-45deg)"
                      : "scaleX(0)"
                    : "none",
              }}
            />
          ))}
        </div>
      </button>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "var(--cream)",
            zIndex: -1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
          }}
        >
          {["Services", "About", "Book"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.5rem",
                fontWeight: 300,
                color: "var(--bark)",
                textDecoration: "none",
                letterSpacing: "0.1em",
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
