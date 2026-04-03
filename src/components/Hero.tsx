"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    const headline = headlineRef.current;
    const sub = subRef.current;
    const cta = ctaRef.current;
    const scroll = scrollRef.current;
    const watermark = watermarkRef.current;
    const line = lineRef.current;
    if (!section || !video || !overlay) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const sectionH = section.offsetHeight;

        if (rect.bottom > 0) {
          const scrolled = Math.max(0, -rect.top);
          const p = Math.min(scrolled / sectionH, 1);

          // Video: very slow zoom (barely perceptible)
          video.style.transform = `scale(${1 + p * 0.06})`;

          // Overlay: gentle darken
          overlay.style.background = `rgba(20, 14, 9, ${0.55 + p * 0.2})`;

          // Parallax depth — gentle, unhurried rates
          // Everything fades together but moves at different speeds
          const fade = Math.max(0, 1 - p * 1.2);
          if (headline) {
            headline.style.transform = `translateY(${p * -18}px)`;
            headline.style.opacity = `${fade}`;
          }
          if (sub) {
            sub.style.transform = `translateY(${p * -28}px)`;
            sub.style.opacity = `${fade}`;
          }
          if (cta) {
            cta.style.transform = `translateY(${p * -38}px)`;
            cta.style.opacity = `${Math.max(0, 1 - p * 1.5)}`;
          }
          if (scroll) {
            scroll.style.opacity = `${Math.max(0, 1 - p * 3)}`;
          }
          if (watermark) {
            watermark.style.transform = `translate(-50%, calc(-50% + ${p * -20}px))`;
            watermark.style.opacity = `${0.045 * (1 - p)}`;
          }
          if (line) {
            line.style.opacity = `${Math.max(0, 1 - p * 2)}`;
          }
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Lather Head Spa — Hero"
      className="grain-overlay"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        background: "var(--charcoal)",
      }}
    >
      {/* ── BACKGROUND VIDEO — fixed behind all content ───── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          clipPath: "inset(0)",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          poster="/Photos/Finalized/2.10.26_LHS-5.jpg"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            opacity: 0.85,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <source
            src="/Videos/Finished%20Videos/Posted/Welcome%20to%20Lather.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* ── OVERLAY LAYERS ───────────────────────────────────── */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(20, 14, 9, 0.55)",
          zIndex: 1,
          willChange: "background",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(10,7,4,0.6) 100%)",
          zIndex: 1,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(15,10,6,0.85) 0%, rgba(15,10,6,0.3) 45%, transparent 70%)",
          zIndex: 1,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "220px",
          background: "linear-gradient(to bottom, rgba(10,7,4,0.5) 0%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* ── LOCATION TAG ─────────────────────────────────────── */}
      <div
        className="hero-eyebrow"
        style={{
          position: "absolute",
          top: "clamp(90px, 12vw, 120px)",
          right: "clamp(20px, 4vw, 48px)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          zIndex: 2,
        }}
      >
        <span style={{ display: "block", width: "24px", height: "1px", background: "rgba(255,255,255,0.45)" }} />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Greenville, NC
        </span>
      </div>

      {/* ── CENTER HORIZONTAL LINE ───────────────────────────── */}
      <div
        ref={lineRef}
        className="hero-line"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "clamp(20px, 4vw, 48px)",
          right: "clamp(20px, 4vw, 48px)",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.18) 25%, rgba(255,255,255,0.18) 75%, transparent)",
          zIndex: 2,
          willChange: "opacity",
        }}
      />

      {/* ── DECORATIVE LARGE WATERMARK ───────────────────────── */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(140px, 22vw, 340px)",
          fontWeight: 300,
          color: "rgba(255,255,255,0.045)",
          lineHeight: 1,
          userSelect: "none",
          whiteSpace: "nowrap",
          letterSpacing: "-0.03em",
          pointerEvents: "none",
          zIndex: 2,
          willChange: "transform, opacity",
        }}
      >
        Lather
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <div
        ref={contentRef}
        className="hero-content section-pad"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "820px",
          padding: "0 clamp(20px, 4vw, 48px) clamp(72px, 10vw, 108px)",
        }}
      >
        <p
          className="hero-eyebrow"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.6rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.72)",
            marginBottom: "1.6rem",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ display: "inline-block", width: "28px", height: "1px", background: "rgba(255,255,255,0.45)", flexShrink: 0 }} />
          Head Spa &amp; Scalp Rituals
        </p>

        <h1
          ref={headlineRef}
          className="hero-headline"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.2rem, 7.5vw, 6.5rem)",
            fontWeight: 300,
            lineHeight: 1.02,
            color: "#FFFFFF",
            marginBottom: "2rem",
            letterSpacing: "-0.015em",
            willChange: "transform, opacity",
          }}
        >
          Where the scalp
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 300, color: "rgba(255,255,255,0.92)" }}>
            breathes again.
          </em>
        </h1>

        <p
          ref={subRef}
          className="hero-sub"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.85rem, 1.8vw, 1rem)",
            lineHeight: 1.85,
            color: "rgba(255,255,255,0.78)",
            maxWidth: "440px",
            marginBottom: "3rem",
            fontWeight: 300,
            willChange: "transform, opacity",
          }}
        >
          Lather is a sanctuary for scalp health and hair restoration. Our rituals purify, nourish, and renew — leaving you grounded, refreshed, and luminous.
        </p>

        <div
          ref={ctaRef}
          className="hero-ctas"
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", willChange: "transform, opacity" }}
        >
          <a
            href="/book"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--bark)",
              background: "var(--linen)",
              padding: "16px 40px",
              textDecoration: "none",
              display: "inline-block",
              transition: "background 0.3s ease, transform 0.3s var(--ease-luxury)",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--linen)"; e.currentTarget.style.transform = "none"; }}
          >
            Reserve Your Ritual
          </a>
          <a
            href="#services"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.88)",
              border: "1px solid rgba(255,255,255,0.42)",
              background: "rgba(255,255,255,0.06)",
              padding: "16px 40px",
              textDecoration: "none",
              display: "inline-block",
              transition: "border-color 0.3s ease, background 0.3s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)"; e.currentTarget.style.background = "rgba(255,255,255,0.14)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.42)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
          >
            Explore Treatments
          </a>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ─────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="hero-scroll"
        style={{
          position: "absolute",
          bottom: "clamp(24px, 4vw, 40px)",
          right: "clamp(20px, 4vw, 48px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          zIndex: 2,
          willChange: "opacity",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.55rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <div
          className="scroll-line"
          style={{ width: "1px", height: "52px", background: "rgba(255,255,255,0.35)", transformOrigin: "top" }}
        />
      </div>
    </section>
  );
}
