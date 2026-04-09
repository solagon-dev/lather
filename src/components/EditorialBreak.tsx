"use client";

import { useRef, useEffect } from "react";

export default function EditorialBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    const img = imgRef.current;
    const eyebrow = eyebrowRef.current;
    const heading = headingRef.current;
    const cta = ctaRef.current;
    const line = lineRef.current;
    if (!section || !img) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        // Progress: 0 = just entering viewport from bottom, 1 = leaving at top
        const progress = 1 - (rect.bottom / (vh + rect.height));
        const p = Math.max(0, Math.min(progress, 1));

        // Parallax image
        const offset = (p - 0.5) * 60;
        img.style.transform = `translateY(${offset}px) scale(1.1)`;

        // Content reveals — wider spacing for a measured, unhurried pace
        if (line) {
          const lp = Math.max(0, Math.min((p - 0.12) / 0.4, 1));
          line.style.width = `${lp * 100}%`;
          line.style.opacity = `${lp}`;
        }

        if (eyebrow) {
          const ep = Math.max(0, Math.min((p - 0.2) / 0.35, 1));
          eyebrow.style.opacity = `${ep}`;
          eyebrow.style.transform = `translateY(${(1 - ep) * 14}px)`;
        }

        if (heading) {
          const hp = Math.max(0, Math.min((p - 0.3) / 0.4, 1));
          heading.style.opacity = `${hp}`;
          heading.style.transform = `translateY(${(1 - hp) * 22}px)`;
        }

        if (cta) {
          const cp = Math.max(0, Math.min((p - 0.45) / 0.35, 1));
          cta.style.opacity = `${cp}`;
          cta.style.transform = `translateY(${(1 - cp) * 16}px)`;
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: "clamp(440px, 70vh, 760px)",
        position: "relative",
        overflow: "hidden",
        background: "var(--charcoal)",
      }}
    >
      {/* Parallax background image */}
      <img
        ref={imgRef}
        src="/media/editorial/editorial-break.jpg"
        alt="Scalp treatment in progress — dramatic overhead view with black gloves"
        loading="lazy"
        style={{
          position: "absolute",
          inset: "-10% 0",
          width: "100%",
          height: "120%",
          objectFit: "cover",
          objectPosition: "center 25%",
          display: "block",
          transformOrigin: "center center",
          transform: "scale(1.1)",
          willChange: "transform",
        }}
      />

      {/* Multi-layer cinematic overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(105deg, rgba(20,14,9,0.82) 0%, rgba(20,14,9,0.5) 55%, rgba(20,14,9,0.3) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 0% 100%, rgba(212,184,168,0.1), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Content — each element positioned for scroll reveal */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 clamp(20px, 6vw, 120px)",
        }}
      >
        <div style={{ maxWidth: "680px" }}>
          {/* Animated reveal line */}
          <div
            ref={lineRef}
            style={{
              height: "1px",
              background: "var(--blush)",
              marginBottom: "2rem",
              width: "0%",
              opacity: 0,
              willChange: "width, opacity",
              maxWidth: "80px",
            }}
          />

          <p
            ref={eyebrowRef}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--blush)",
              opacity: 0,
              marginBottom: "1.75rem",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              willChange: "transform, opacity",
            }}
          >
            The Lather Ritual
          </p>

          <h2
            ref={headingRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--linen)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              marginBottom: "2.5rem",
              opacity: 0,
              willChange: "transform, opacity",
            }}
          >
            One ritual.
            <br />
            Complete restoration.
          </h2>

          <a
            ref={ctaRef}
            href="/book"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              fontFamily: "var(--font-body)",
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(237,230,219,0.75)",
              border: "1px solid rgba(237,230,219,0.28)",
              padding: "16px 40px",
              textDecoration: "none",
              transition: "border-color 0.3s ease, color 0.3s ease",
              opacity: 0,
              willChange: "transform, opacity",
            }}
          >
            Book Your Visit
            <span style={{ fontSize: "0.85rem" }}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
