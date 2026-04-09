import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "What Is a Head Spa?",
  description:
    "Discover the Japanese head spa tradition. Learn what happens during a head spa treatment, the benefits for your scalp and hair, and why Lather in Greenville, NC is the premier destination.",
};

const steps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "Every session begins with an intimate one-on-one consultation. Your specialist examines your scalp under magnification, assessing oil production, hydration levels, follicle density, and any areas of concern. This analysis shapes every decision that follows — from product selection to pressure calibration — ensuring a treatment tailored entirely to you.",
  },
  {
    number: "02",
    title: "Cleanse",
    description:
      "A warm, methodical double cleanse dissolves surface buildup, environmental residue, and excess sebum without stripping the scalp of its natural moisture barrier. Using Japanese-formulated shampoos and warm towel compressions, this step prepares the scalp to receive the deeper work ahead. Most guests describe this phase alone as deeply calming.",
  },
  {
    number: "03",
    title: "Exfoliation & Massage",
    description:
      "The heart of the ritual. A targeted scalp exfoliation lifts dead skin cells and product residue from the follicles, followed by an extended therapeutic massage using acupressure techniques rooted in Japanese bodywork. Slow, deliberate movements along the meridian lines of the head and neck release stored tension, stimulate blood flow, and encourage lymphatic drainage.",
  },
  {
    number: "04",
    title: "Treatment",
    description:
      "Based on your consultation, a customized serum or masque is applied to address your specific needs — whether that is hydration, oil regulation, thinning prevention, or follicle strengthening. Gentle steam or warm towel therapy opens the cuticle and drives active ingredients deep into the scalp tissue, where they can do their most meaningful work.",
  },
  {
    number: "05",
    title: "Renewal",
    description:
      "A final rinse, toner, and lightweight scalp essence seal the treatment. Your specialist reviews what was addressed and provides aftercare guidance tailored to your scalp condition. You leave with a scalp that feels lighter, cleaner, and more alive — and hair that reflects the health beneath it.",
  },
];

const benefits = [
  {
    title: "Scalp Detoxification",
    description:
      "Removes weeks of accumulated sebum, pollution, hard water minerals, and product residue that daily shampooing cannot reach, restoring the scalp to a clean, balanced state.",
  },
  {
    title: "Hair Growth Stimulation",
    description:
      "Targeted massage and exfoliation increase blood flow to the hair follicles, delivering oxygen and nutrients that support stronger, healthier growth cycles over time.",
  },
  {
    title: "Deep Relaxation",
    description:
      "The slow, rhythmic pressure applied during a head spa activates the parasympathetic nervous system, lowering cortisol levels and producing a meditative state of calm.",
  },
  {
    title: "Improved Circulation",
    description:
      "Acupressure techniques along the scalp, temples, and neck open microcirculation pathways, reducing headaches and promoting cellular renewal throughout the treatment zone.",
  },
  {
    title: "Product Buildup Removal",
    description:
      "Even the best haircare routines leave behind invisible layers of silicone, wax, and polymer buildup that suffocate the follicle. A head spa clears it all, allowing the scalp to breathe.",
  },
  {
    title: "Stress & Tension Relief",
    description:
      "The head, jaw, and neck hold more tension than almost any other part of the body. A head spa directly addresses these areas, offering relief that lasts well beyond the appointment.",
  },
];

const candidates = [
  "Anyone curious about head spas and looking for their first experience",
  "People dealing with dry, flaky, or itchy scalp conditions",
  "Those noticing thinning hair or slower growth than usual",
  "High-stress professionals seeking genuine physical and mental relief",
  "Anyone who uses dry shampoo, styling products, or heat tools regularly",
  "Postpartum mothers experiencing hair changes or scalp sensitivity",
  "Clients transitioning between hair treatments or recovering from chemical services",
  "Anyone who simply believes their hair and scalp deserve more than a standard wash",
];

export default function WhatIsAHeadSpaPage() {
  return (
    <main>
      <ScrollReveal />
      <Navbar />

      {/* ── PAGE HERO ──────────────────────────────────────── */}
      <section
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 clamp(20px, 4vw, 48px) 80px",
          background: "var(--charcoal)",
          position: "relative",
          overflow: "hidden",
        }}
        className="grain-overlay section-pad"
      >
        <img
          src="/media/pages/head-spa-guide-hero.jpg"
          alt="Head spa treatment in progress at Lather Head Spa"
          loading="eager"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
            opacity: 0.18,
          }}
        />

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 8% 35%, rgba(212,184,168,0.15), transparent 50%), radial-gradient(circle at 90% 80%, rgba(163,172,148,0.1), transparent 50%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
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
            <span
              style={{
                display: "inline-block",
                width: "28px",
                height: "1px",
                background: "var(--blush)",
              }}
            />
            Education
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 300,
              color: "var(--linen)",
              lineHeight: 1.04,
              letterSpacing: "-0.015em",
            }}
          >
            What is a
            <br />
            <em style={{ fontStyle: "italic" }}>head spa?</em>
          </h1>
        </div>
      </section>

      {/* ── ORIGIN & PHILOSOPHY ────────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--cream)",
          padding: "clamp(56px, 8.5vw, 120px) clamp(20px, 4vw, 48px)",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "7rem",
            alignItems: "start",
          }}
          className="about-grid"
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
              Origins
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
              An ancient tradition,{" "}
              <em style={{ fontStyle: "italic" }}>reimagined.</em>
            </h2>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.92,
                color: "var(--mink)",
                fontWeight: 300,
                marginBottom: "1.75rem",
              }}
            >
              The head spa — or <em>heddo supaa</em> — originated in Japan,
              where scalp health has long been considered the foundation of
              beautiful hair. Rooted in centuries of Japanese bathing culture and
              holistic wellness philosophy, the practice treats the scalp as
              living tissue that requires the same intentional care as skin.
              Japanese salons have offered dedicated scalp treatments for
              decades, combining meticulous cleansing rituals with therapeutic
              massage techniques drawn from traditional bodywork.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.92,
                color: "var(--mink)",
                fontWeight: 300,
                marginBottom: "1.75rem",
              }}
            >
              At Lather, we have taken this tradition and shaped it for
              Greenville. Our treatments honor the original Japanese emphasis on
              precision, unhurried pacing, and therapeutic depth — while
              incorporating modern scalp analysis technology and
              professional-grade botanicals selected for the specific water and
              climate conditions of Eastern North Carolina. The result is
              something that feels both timeless and entirely new.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.92,
                color: "var(--mink)",
                fontWeight: 300,
              }}
            >
              Unlike a standard salon wash — which typically lasts two to three
              minutes and exists only to prepare hair for cutting or coloring — a
              head spa is a standalone treatment lasting forty-five minutes to
              over an hour. Every minute is devoted to the scalp itself:
              cleansing, exfoliating, massaging, and treating. It is not an
              add-on. It is the entire point.
            </p>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL IMAGE BREAK ─────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2px",
          background: "rgba(140,123,107,0.08)",
        }}
        className="values-grid"
      >
        {[
          { src: "/media/pages/faq-hero.jpg", alt: "Client relaxed and smiling after treatment" },
          { src: "/media/pages/faq-detail-01.jpg", alt: "Scalp treatment tools on marble" },
          { src: "/media/team/heidi-griggs.jpg", alt: "Therapist performing scalp treatment" },
        ].map((img) => (
          <div key={img.src} style={{ overflow: "hidden", height: "clamp(200px, 25vw, 320px)" }}>
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        ))}
      </div>

      {/* ── WHAT HAPPENS ───────────────────────────────────── */}
      <section
        className="reveal-section reveal-lift grain-overlay section-pad"
        style={{
          background: "var(--bark)",
          padding: "clamp(56px, 8.5vw, 120px) clamp(20px, 4vw, 48px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 10% 50%, rgba(212,184,168,0.12), transparent 50%), radial-gradient(circle at 90% 20%, rgba(163,172,148,0.1), transparent 50%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ marginBottom: "72px", maxWidth: "640px" }}>
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
              <span
                style={{
                  display: "inline-block",
                  width: "28px",
                  height: "1px",
                  background: "var(--blush)",
                }}
              />
              The Process
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                fontWeight: 300,
                color: "var(--linen)",
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
                marginBottom: "1.5rem",
              }}
            >
              What happens during{" "}
              <em style={{ fontStyle: "italic" }}>a head spa?</em>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.92,
                color: "rgba(237,230,219,0.62)",
                fontWeight: 300,
              }}
            >
              A head spa at Lather is a structured, multi-phase ritual. Each step
              builds on the last, moving from assessment to restoration. Here is
              exactly what to expect.
            </p>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(237,230,219,0.1)",
              paddingTop: "48px",
            }}
          >
            {steps.map((step, i) => (
              <div
                key={step.number}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: "2rem",
                  alignItems: "start",
                  paddingBottom: i < steps.length - 1 ? "48px" : "0",
                  marginBottom: i < steps.length - 1 ? "48px" : "0",
                  borderBottom:
                    i < steps.length - 1
                      ? "1px solid rgba(237,230,219,0.07)"
                      : "none",
                }}
                className="about-grid"
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    fontWeight: 300,
                    color: "var(--blush)",
                    opacity: 0.6,
                    lineHeight: 1.3,
                  }}
                >
                  {step.number}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 300,
                      color: "var(--linen)",
                      marginBottom: "1rem",
                      fontStyle: "italic",
                      lineHeight: 1.2,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      lineHeight: 1.88,
                      color: "rgba(237,230,219,0.58)",
                      fontWeight: 300,
                      maxWidth: "640px",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ───────────────────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--cream)",
          padding: "clamp(56px, 8.5vw, 120px) clamp(20px, 4vw, 48px)",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <div style={{ marginBottom: "72px" }}>
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
              Why It Works
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
              The benefits of{" "}
              <em style={{ fontStyle: "italic" }}>a head spa.</em>
            </h2>
          </div>

          <div
            className="benefits-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "3.5rem",
              borderTop: "1px solid rgba(140,123,107,0.12)",
              paddingTop: "60px",
            }}
          >
            {benefits.map((benefit, i) => (
              <div key={i}>
                <div
                  style={{
                    width: "32px",
                    height: "1px",
                    background: "var(--blush)",
                    marginBottom: "1.75rem",
                    opacity: 0.7,
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.35rem",
                    fontWeight: 300,
                    color: "var(--bark)",
                    marginBottom: "1rem",
                    fontStyle: "italic",
                    lineHeight: 1.2,
                  }}
                >
                  {benefit.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    lineHeight: 1.85,
                    color: "var(--mink)",
                    fontWeight: 300,
                  }}
                >
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD TRY ─────────────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--linen)",
          padding: "clamp(56px, 8.5vw, 120px) clamp(20px, 4vw, 48px)",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "7rem",
            alignItems: "start",
          }}
          className="about-grid"
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
              Is It For You
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
              Who should try{" "}
              <em style={{ fontStyle: "italic" }}>a head spa?</em>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.92,
                color: "var(--mink)",
                fontWeight: 300,
                marginTop: "1.75rem",
              }}
            >
              The honest answer: nearly everyone. But certain people tend to
              notice the most immediate, dramatic difference after their first
              session.
            </p>
          </div>

          <div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {candidates.map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    lineHeight: 1.85,
                    color: "var(--mink)",
                    fontWeight: 300,
                    padding: "16px 0",
                    borderBottom: "1px solid rgba(140,123,107,0.1)",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "16px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--blush)",
                      flexShrink: 0,
                      opacity: 0.7,
                      marginTop: "6px",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FIRST VISIT REASSURANCE ──────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--cream)",
          padding: "clamp(56px, 8.5vw, 80px) clamp(20px, 4vw, 48px)",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.62rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--stone)",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
            First Time?
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              fontWeight: 300,
              color: "var(--bark)",
              lineHeight: 1.08,
              marginBottom: "2rem",
            }}
          >
            Nothing to worry about.{" "}
            <em style={{ fontStyle: "italic" }}>Really.</em>
          </h2>
          <div
            className="values-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
              textAlign: "left",
            }}
          >
            {[
              {
                heading: "No experience needed",
                body: "Most of our guests are first-timers. We guide you through every step — all you need to do is recline and relax.",
              },
              {
                heading: "Completely private",
                body: "No shared space, no strangers nearby. Your session is reserved exclusively for you in a calm, quiet room.",
              },
              {
                heading: "Tailored to you",
                body: "Every treatment starts with a consultation. We assess your scalp, discuss your goals, and adjust the protocol to fit your specific needs.",
              },
            ].map((item) => (
              <div key={item.heading}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem",
                    fontWeight: 300,
                    color: "var(--bark)",
                    marginBottom: "0.75rem",
                    fontStyle: "italic",
                  }}
                >
                  {item.heading}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.88rem",
                    lineHeight: 1.8,
                    color: "var(--mink)",
                    fontWeight: 300,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────── */}
      <CTABanner
        eyebrow="Your First Visit"
        headline="Ready to"
        headlineItalic="experience it?"
        description="Book your first head spa at Lather and discover what intentional scalp care feels like. New guests are always welcome — no prior experience necessary."
        secondaryCTA={{ label: "View Treatments", href: "/treatments" }}
      />

      <Footer />
    </main>
  );
}
