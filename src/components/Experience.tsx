"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    label: "Arrive",
    title: "Arrival & Consultation",
    body: "You're welcomed into a calm, private space. No busy waiting room — just you. We begin with a brief scalp consultation to understand your hair history, current concerns, and what your scalp needs most today.",
    pullQuote: "Every ritual begins with listening.",
    image: "/media/experience/step-01-consultation.jpg",
    imageAlt: "Client and stylist during a relaxed consultation at Lather Head Spa",
    focal: "center 30%",
  },
  {
    number: "02",
    label: "Cleanse",
    title: "The Cleanse",
    body: "A therapeutic double cleanse removes buildup, excess oil, and environmental stress from the scalp. The water is warm, the products are organic, and the pace is entirely unhurried.",
    pullQuote: "The foundation of every great treatment.",
    image: "/media/experience/step-02-cleanse.jpg",
    imageAlt: "Hands-on scalp cleansing at the wash basin",
    video: "/media/video/experience-cleanse.mp4",
    focal: "center 40%",
  },
  {
    number: "03",
    label: "Massage",
    title: "Exfoliation & Massage",
    body: "Gentle exfoliation loosens congestion and stimulates circulation, followed by our signature scalp massage — slow, intentional pressure that dissolves tension and restores flow.",
    pullQuote: "Where tension dissolves and circulation returns.",
    image: "/media/experience/step-03-massage.jpg",
    imageAlt: "Therapist performing scalp exfoliation with a specialized brush",
    focal: "center 25%",
  },
  {
    number: "04",
    label: "Treat",
    title: "Targeted Treatment",
    body: "Based on your scalp type and chosen ritual, we apply a curated serum, mask, or bond-rebuilding protocol — sealed with steam or warmth for deep absorption.",
    pullQuote: "Precision care, tailored to your scalp.",
    image: "/media/experience/step-04-treatment.jpg",
    imageAlt: "Therapist applying targeted treatment with professional equipment",
    video: "/media/video/experience-tools.mp4",
    focal: "center 30%",
  },
  {
    number: "05",
    label: "Renew",
    title: "The Renewal",
    body: "You leave with a scalp that breathes freely, hair that holds moisture, and a nervous system that finally had permission to rest. Results deepen with every visit.",
    pullQuote: "This is what renewal feels like.",
    image: "/media/experience/step-05-renewal.jpg",
    imageAlt: "Client smiling peacefully under the gold treatment arch — renewed and restored",
    focal: "center 35%",
  },
];

export default function Experience() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(i);
        },
        // Account for fixed navbar (~70px) by shifting the detection zone down
        { rootMargin: "-30% 0px -40% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section
      id="experience"
      className="grain-overlay"
      style={{
        background: "var(--charcoal)",
        position: "relative",
      }}
    >
      {/* ── SECTION HEADER ────────────────────────────────── */}
      <div
        className="reveal-section reveal-lift"
        style={{
          padding: "clamp(100px, 12vw, 180px) clamp(20px, 4vw, 48px) clamp(40px, 5vw, 64px)",
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.62rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--blush)",
            marginBottom: "1.2rem",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            opacity: 0.85,
          }}
        >
          <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
          The Experience
        </p>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
            fontWeight: 300,
            color: "var(--linen)",
            lineHeight: 1.02,
            letterSpacing: "-0.015em",
            marginBottom: "2rem",
          }}
        >
          What to <em style={{ fontStyle: "italic" }}>expect.</em>
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.88rem, 1.3vw, 1rem)",
            color: "rgba(237,230,219,0.45)",
            maxWidth: "480px",
            lineHeight: 1.88,
            fontWeight: 300,
            marginBottom: "clamp(48px, 6vw, 80px)",
          }}
        >
          Five steps. One intention. From the moment you arrive to the moment you leave, every detail is designed to restore your scalp — and your sense of calm.
        </p>

      </div>

      {/* ── STICKY SCROLL JOURNEY — desktop ───────────────── */}
      <div
        className="experience-journey"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Step nav — sticky below navbar */}
        <div
          className="experience-nav"
          style={{
            position: "sticky",
            top: "70px",
            zIndex: 10,
            background: "var(--charcoal)",
            borderBottom: "1px solid rgba(237,230,219,0.06)",
            padding: "1rem clamp(20px, 4vw, 48px)",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "flex",
              gap: "clamp(1.5rem, 3vw, 3rem)",
            }}
          >
            {steps.map((step, i) => (
              <div
                key={step.number}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "8px",
                  opacity: activeStep === i ? 1 : 0.25,
                  transition: "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", fontStyle: "italic", color: "var(--blush)" }}>
                  {step.number}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--linen)" }}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div
          className="experience-sticky-layout"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
        >
          {/* LEFT: Sticky image — offset for navbar + step nav */}
          <div
            className="experience-image-col"
            style={{
              position: "sticky",
              top: "120px",
              height: "calc(100vh - 120px)",
              alignSelf: "start",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: activeStep === i ? 1 : 0,
                    transition: "opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
                    willChange: "opacity",
                  }}
                >
                  {step.video && activeStep === i ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={step.image}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    >
                      <source src={step.video} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={step.image}
                      alt={step.imageAlt}
                      loading={i === 0 ? "eager" : "lazy"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: step.focal,
                        display: "block",
                        transform: activeStep === i ? "scale(1.03)" : "scale(1)",
                        transition: "transform 2s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    />
                  )}
                </div>
              ))}

              {/* Subtle right-edge blend */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to right, transparent 85%, rgba(26,23,20,0.25) 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Step counter */}
              <div
                style={{
                  position: "absolute",
                  bottom: "clamp(24px, 4vw, 48px)",
                  left: "clamp(24px, 4vw, 48px)",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "8px",
                }}
              >
                <span
                  key={activeStep}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(3rem, 5vw, 4.5rem)",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1,
                    fontStyle: "italic",
                  }}
                >
                  {steps[activeStep].number}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)" }}>
                  / 05
                </span>
              </div>

              {/* Pull quote */}
              <p
                key={`quote-${activeStep}`}
                style={{
                  position: "absolute",
                  bottom: "clamp(24px, 4vw, 48px)",
                  right: "clamp(24px, 4vw, 48px)",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.4)",
                  maxWidth: "200px",
                  textAlign: "right",
                  lineHeight: 1.5,
                }}
              >
                {steps[activeStep].pullQuote}
              </p>
            </div>
          </div>

          {/* RIGHT: Scrolling text steps */}
          <div style={{ position: "relative" }}>
            {/* Vertical progress line */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "clamp(28px, 4vw, 48px)",
                top: 0,
                bottom: 0,
                width: "1px",
                background: "rgba(237,230,219,0.06)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "1px",
                  height: `${(activeStep / (steps.length - 1)) * 100}%`,
                  background: "linear-gradient(to bottom, var(--blush), var(--gold))",
                  opacity: 0.4,
                  transition: "height 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
              {steps.map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: "-4px",
                    top: `${(i / (steps.length - 1)) * 100}%`,
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    border: `1.5px solid ${activeStep >= i ? "var(--blush)" : "rgba(237,230,219,0.12)"}`,
                    background: activeStep === i ? "var(--blush)" : "transparent",
                    transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    transform: activeStep === i ? "scale(1.3)" : "scale(1)",
                  }}
                />
              ))}
            </div>

            {/* Step content blocks */}
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { stepRefs.current[i] = el; }}
                style={{
                  minHeight: i === steps.length - 1 ? "60vh" : "85vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingLeft: "clamp(56px, 7vw, 96px)",
                  paddingRight: "clamp(24px, 4vw, 64px)",
                  // Add top padding on first step to clear the section header
                  paddingTop: i === 0 ? "4vh" : 0,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    opacity: activeStep === i ? 1 : 0.2,
                    transform: activeStep === i ? "translateY(0)" : "translateY(6px)",
                    transition: "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {/* Ghost watermark number */}
                  <p
                    aria-hidden="true"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(6rem, 12vw, 10rem)",
                      fontWeight: 300,
                      color: "rgba(237,230,219,0.03)",
                      lineHeight: 1,
                      userSelect: "none",
                      pointerEvents: "none",
                      fontStyle: "italic",
                      marginBottom: "-2rem",
                      marginLeft: "-0.5rem",
                    }}
                  >
                    {step.number}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
                    <span style={{ display: "inline-block", width: "20px", height: "1px", background: "var(--blush)", opacity: 0.5 }} />
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--blush)", opacity: 0.7 }}>
                      Step {step.number} — {step.label}
                    </p>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
                      fontWeight: 300,
                      color: "var(--linen)",
                      lineHeight: 1.08,
                      letterSpacing: "-0.01em",
                      marginBottom: "1.75rem",
                      maxWidth: "480px",
                    }}
                  >
                    {step.title}
                  </h3>

                  <div style={{ width: "40px", height: "1px", background: "rgba(237,230,219,0.12)", marginBottom: "1.75rem" }} />

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
                      lineHeight: 2,
                      color: "rgba(237,230,219,0.58)",
                      fontWeight: 300,
                      maxWidth: "420px",
                    }}
                  >
                    {step.body}
                  </p>

                  {i === steps.length - 1 && (
                    <a
                      href="/book"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--bark)",
                        background: "var(--linen)",
                        padding: "16px 40px",
                        textDecoration: "none",
                        marginTop: "2.5rem",
                        transition: "background 0.3s ease, transform 0.3s var(--ease-luxury)",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "var(--linen)"; e.currentTarget.style.transform = "none"; }}
                    >
                      Begin Your Ritual
                      <span style={{ fontSize: "0.85rem" }}>→</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE: Stacked panels ────────────────────────── */}
      <div className="experience-mobile-panels">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="reveal-section reveal-fade"
            style={{
              borderTop: i > 0 ? "1px solid rgba(237,230,219,0.06)" : "none",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ width: "100%", height: "56vw", maxHeight: "340px", overflow: "hidden", position: "relative" }}>
              {step.video ? (
                <video autoPlay loop muted playsInline poster={step.image} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
                  <source src={step.video} type="video/mp4" />
                </video>
              ) : (
                <img src={step.image} alt={step.imageAlt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: step.focal, display: "block" }} />
              )}
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,23,20,0.6) 0%, transparent 50%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "16px", left: "20px", display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 300, color: "rgba(255,255,255,0.9)", fontStyle: "italic", lineHeight: 1 }}>{step.number}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.5rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>/ 05</span>
              </div>
            </div>
            <div style={{ padding: "clamp(28px, 5vw, 44px) clamp(20px, 4vw, 48px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
                <span style={{ display: "inline-block", width: "16px", height: "1px", background: "var(--blush)", opacity: 0.5 }} />
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.55rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--blush)", opacity: 0.7 }}>{step.label}</p>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 5.5vw, 2.2rem)", fontWeight: 300, color: "var(--linen)", lineHeight: 1.12, marginBottom: "1.25rem" }}>{step.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.92, color: "rgba(237,230,219,0.55)", fontWeight: 300 }}>{step.body}</p>
              {i === steps.length - 1 && (
                <a href="/book"
                  style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--bark)", background: "var(--linen)", padding: "15px 36px", textDecoration: "none", marginTop: "2rem" }}>
                  Begin Your Ritual →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: "clamp(40px, 5vw, 80px)", position: "relative", zIndex: 1 }} />
    </section>
  );
}
