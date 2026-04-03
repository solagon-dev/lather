"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";

const tiers = [
  {
    name: "Essential",
    price: "$110",
    period: "/mo",
    savings: "Save $15 every month",
    featured: false,
    perks: [
      "1 Classic Ritual per month",
      "Priority booking access",
      "Complimentary consultations",
    ],
  },
  {
    name: "Elevated",
    price: "$145",
    period: "/mo",
    savings: "Save $20–30 every month",
    featured: true,
    perks: [
      "1 Premium Ritual per month (Revitalize or Nourish)",
      "Priority booking access",
      "10% off all add-on treatments",
      "Exclusive member-only promotions",
    ],
  },
  {
    name: "Devoted",
    price: "$235",
    period: "/mo",
    savings: "Save $55+ every month",
    featured: false,
    perks: [
      "2 treatments per month (any ritual)",
      "Priority booking access",
      "15% off all add-on treatments",
      "Complimentary quarterly scalp analysis",
      "First access to new offerings",
    ],
  },
];

const membershipFaqs = [
  {
    question: "How does billing work?",
    answer:
      "Your membership is billed on the same date each month. All payments are processed securely through our booking platform. Your first month is charged at sign-up, and subsequent months auto-renew unless you choose to cancel or pause.",
  },
  {
    question: "Can I pause my membership?",
    answer:
      "Yes. Life happens, and we understand. You may pause your membership for up to two months per year. Simply let us know at least 7 days before your next billing date, and we'll hold your spot until you're ready to return.",
  },
  {
    question: "Can I gift a membership?",
    answer:
      "Absolutely. A Lather membership makes a deeply thoughtful gift. Contact us to set up a prepaid membership for someone you love — we'll handle the presentation and the details.",
  },
  {
    question: "Can I switch tiers?",
    answer:
      "Of course. You can upgrade or adjust your membership tier at any time. Changes take effect at the start of your next billing cycle. Just reach out to us and we'll make the transition seamless.",
  },
];

export default function MembershipsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main>
      <ScrollReveal />
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────── */}
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
          src="/Photos/RAW/02.10.2026_LHS_RAWS/IMG_4090.jpg"
          alt="Natulique products and treatment tools at Lather"
          loading="eager"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
            opacity: 0.15,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(212,184,168,0.12), transparent 55%)",
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
            Membership
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
            Invest in your
            <br />
            <em style={{ fontStyle: "italic" }}>scalp.</em>
          </h1>
        </div>
      </section>

      {/* ── WHY MEMBERSHIP ────────────────────────────────── */}
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
              Why Membership
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
              Consistency is the{" "}
              <em style={{ fontStyle: "italic" }}>secret.</em>
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
              A single head spa session is restorative. But real transformation — the kind that recalibrates your scalp health, strengthens follicles, and rewrites your relationship with stress — happens through regular, intentional visits. Your scalp is a living ecosystem, and like any ecosystem, it thrives on sustained care.
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
              A Lather membership means you never have to think about when to book — your time is held, your treatments are reserved, and your scalp receives the compounding benefits of consistent professional care. Oil production normalizes. Circulation improves. Tension patterns soften. Hair grows from a foundation that has been genuinely tended to.
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
              This is not a one-time luxury. This is an ongoing commitment to yourself — and we make it effortless.
            </p>
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP TIERS ──────────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--linen)",
          padding: "clamp(56px, 8.5vw, 120px) clamp(20px, 4vw, 48px)",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ marginBottom: "56px" }}>
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
              Choose Your Tier
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
              Three ways to{" "}
              <em style={{ fontStyle: "italic" }}>commit.</em>
            </h2>
          </div>

          <div
            className="values-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
            {tiers.map((tier) => (
              <div
                key={tier.name}
                style={{
                  padding: "2.5rem",
                  border: `1px solid ${tier.featured ? "transparent" : "rgba(140,123,107,0.12)"}`,
                  background: tier.featured ? "var(--bark)" : "var(--cream)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {tier.featured && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(ellipse at 80% 0%, rgba(212,184,168,0.12), transparent 55%)",
                      pointerEvents: "none",
                    }}
                  />
                )}

                <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
                  {tier.featured && (
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.55rem",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: "var(--blush)",
                        marginBottom: "1.25rem",
                        opacity: 0.85,
                      }}
                    >
                      Most Popular
                    </p>
                  )}

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.6rem",
                      fontWeight: 300,
                      color: tier.featured ? "var(--linen)" : "var(--bark)",
                      marginBottom: "0.5rem",
                      fontStyle: "italic",
                      lineHeight: 1.2,
                    }}
                  >
                    {tier.name}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "4px",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "2.4rem",
                        fontWeight: 300,
                        color: tier.featured ? "var(--linen)" : "var(--bark)",
                        lineHeight: 1,
                      }}
                    >
                      {tier.price}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.82rem",
                        color: tier.featured
                          ? "rgba(237,230,219,0.5)"
                          : "var(--stone)",
                        fontWeight: 300,
                      }}
                    >
                      {tier.period}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      color: tier.featured ? "var(--blush)" : "var(--sage)",
                      fontWeight: 400,
                      marginBottom: "2rem",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {tier.savings}
                  </p>

                  <div
                    style={{
                      width: "100%",
                      height: "1px",
                      background: tier.featured
                        ? "rgba(237,230,219,0.1)"
                        : "rgba(140,123,107,0.12)",
                      marginBottom: "1.75rem",
                    }}
                  />

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 2.5rem 0",
                      flex: 1,
                    }}
                  >
                    {tier.perks.map((perk, i) => (
                      <li
                        key={i}
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.85rem",
                          lineHeight: 1.7,
                          color: tier.featured
                            ? "rgba(237,230,219,0.68)"
                            : "var(--mink)",
                          fontWeight: 300,
                          marginBottom: "0.75rem",
                          paddingLeft: "1.25rem",
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: "0.55em",
                            width: "6px",
                            height: "1px",
                            background: tier.featured
                              ? "var(--blush)"
                              : "var(--blush)",
                            opacity: 0.7,
                          }}
                        />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: tier.featured ? "var(--bark)" : "var(--cream)",
                      background: tier.featured
                        ? "var(--linen)"
                        : "var(--bark)",
                      padding: "16px 32px",
                      textDecoration: "none",
                      textAlign: "center",
                      transition:
                        "background 0.3s ease, transform 0.3s var(--ease-luxury)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = tier.featured
                        ? "var(--cream)"
                        : "var(--mink)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = tier.featured
                        ? "var(--linen)"
                        : "var(--bark)";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    Join
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--cream)",
          padding: "clamp(56px, 8.5vw, 120px) clamp(20px, 4vw, 48px)",
        }}
      >
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ marginBottom: "56px" }}>
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
              Membership FAQ
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                fontWeight: 300,
                color: "var(--bark)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Common{" "}
              <em style={{ fontStyle: "italic" }}>questions.</em>
            </h2>
          </div>

          <div>
            {membershipFaqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid rgba(140,123,107,0.15)",
                  borderTop:
                    i === 0 ? "1px solid rgba(140,123,107,0.15)" : "none",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "24px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "2rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1rem, 2vw, 1.2rem)",
                      fontWeight: 300,
                      color: "var(--bark)",
                      lineHeight: 1.35,
                      flex: 1,
                    }}
                  >
                    {faq.question}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "1rem",
                      color: "var(--stone)",
                      flexShrink: 0,
                      transition: "transform 0.35s var(--ease-luxury)",
                      transform: openFaq === i ? "rotate(45deg)" : "none",
                      display: "inline-block",
                      marginTop: "2px",
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: openFaq === i ? "300px" : "0",
                    transition: "max-height 0.45s var(--ease-luxury)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.88rem",
                      lineHeight: 1.88,
                      color: "var(--mink)",
                      fontWeight: 300,
                      paddingBottom: "28px",
                      paddingRight: "3rem",
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <CTABanner
        eyebrow="Questions?"
        headline="Let's"
        headlineItalic="talk."
        description="Whether you're curious about tiers, ready to commit, or just want to learn more — we're here for you."
        primaryCTA={{
          label: "Contact Us",
          href: "/contact",
        }}
        secondaryCTA={{
          label: "View Treatments",
          href: "/treatments",
        }}
      />

      <Footer />
    </main>
  );
}
