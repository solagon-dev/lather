"use client";

import { useState, useEffect } from "react";

export default function StickyBooking() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9000,
        background: "var(--bark)",
        borderTop: "1px solid rgba(212,184,168,0.15)",
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
        willChange: "transform",
      }}
      className="sticky-booking-bar"
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1rem",
          fontStyle: "italic",
          fontWeight: 300,
          color: "var(--linen)",
          lineHeight: 1.2,
        }}
      >
        Reserve your ritual.
      </p>

      <a
        href="/book"
        style={{
          display: "inline-block",
          fontFamily: "var(--font-body)",
          fontSize: "0.6rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--bark)",
          background: "var(--linen)",
          padding: "13px 28px",
          textDecoration: "none",
          flexShrink: 0,
          transition: "background 0.25s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "var(--cream)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "var(--linen)")
        }
      >
        Book Now
      </a>
    </div>
  );
}
