import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Gift Cards",
  description:
    "Give the gift of renewal. Purchase a Lather Head Spa gift card for any ritual or custom amount — delivered digitally or available for pickup in Greenville, NC.",
};

const giftOptions = [
  { name: "The Classic Ritual", price: "$125" },
  { name: "Revitalize & Restore", price: "$165" },
  { name: "Nourish & Fortify", price: "$175" },
  { name: "Gentleman's Recharge", price: "$95" },
  { name: "Custom Amount", price: "from $50" },
];

const howItWorks = [
  {
    num: "01",
    title: "Choose",
    body: "Select a specific ritual or enter a custom amount. Every option gives someone you love permission to pause.",
  },
  {
    num: "02",
    title: "We Prepare",
    body: "We'll create a beautifully presented gift card with your personal message — thoughtful, elegant, and ready to give.",
  },
  {
    num: "03",
    title: "Deliver",
    body: "Receive your gift card digitally via email, or pick it up in person at our Greenville studio. Either way, it arrives with intention.",
  },
];

export default function GiftCardsPage() {
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
          background: "var(--cream)",
          position: "relative",
          overflow: "hidden",
        }}
        className="section-pad"
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(212,184,168,0.2), transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(163,172,148,0.12), transparent 50%)",
            pointerEvents: "none",
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
            Give the Gift
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 300,
              color: "var(--bark)",
              lineHeight: 1.04,
              letterSpacing: "-0.015em",
            }}
          >
            The gift of
            <br />
            <em style={{ fontStyle: "italic" }}>renewal.</em>
          </h1>
        </div>
      </section>

      {/* ── GIFT OPTIONS ──────────────────────────────────── */}
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
              Gift Wellness
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                fontWeight: 300,
                color: "var(--bark)",
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
                marginBottom: "2rem",
              }}
            >
              Give someone you love permission to{" "}
              <em style={{ fontStyle: "italic" }}>slow down.</em>
            </h2>
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
              There are gifts that get used, and there are gifts that change how someone feels. A Lather gift card is the latter — an invitation to step out of the current, to be tended to, and to leave feeling quietly different.
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
              Whether it's for a birthday, an anniversary, a thank-you, or simply because — a head spa ritual is one of the most generous things you can offer someone who carries too much.
            </p>
          </div>

          <div>
            <div
              style={{
                border: "1px solid rgba(140,123,107,0.12)",
                background: "var(--linen)",
              }}
            >
              {giftOptions.map((option, i) => (
                <div
                  key={option.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1.5rem 2rem",
                    borderBottom:
                      i < giftOptions.length - 1
                        ? "1px solid rgba(140,123,107,0.1)"
                        : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.15rem",
                      fontWeight: 300,
                      color: "var(--bark)",
                      fontStyle: "italic",
                      lineHeight: 1.3,
                    }}
                  >
                    {option.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.92rem",
                      color: "var(--mink)",
                      fontWeight: 300,
                      letterSpacing: "0.02em",
                      flexShrink: 0,
                      marginLeft: "2rem",
                    }}
                  >
                    {option.price}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "2rem", textAlign: "center" }}>
              <a
                href="/book"
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--cream)",
                  background: "var(--bark)",
                  padding: "18px 48px",
                  textDecoration: "none",
                  transition:
                    "background 0.3s ease, transform 0.3s var(--ease-luxury)",
                }}
                className="btn-dark"
              >
                Purchase Gift Card
              </a>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  color: "var(--stone)",
                  fontWeight: 300,
                  marginTop: "1rem",
                }}
              >
                or call{" "}
                <a
                  href="tel:+12525310987"
                  style={{
                    color: "var(--bark)",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(61,46,34,0.35)",
                    paddingBottom: "1px",
                    transition: "opacity 0.2s",
                  }}
                  className="hover-fade"
                >
                  (252) 531-0987
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY GIFT A HEAD SPA? ────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--cream)",
          padding: "clamp(32px, 5vw, 64px) clamp(20px, 4vw, 48px)",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0",
            textAlign: "center",
          }}
          className="values-grid"
        >
          {[
            {
              title: "Not another candle",
              body: "A real experience, not a shelf ornament.",
            },
            {
              title: "For anyone",
              body: "Suitable for all hair types, all genders, all ages.",
            },
            {
              title: "No expiration",
              body: "Gift cards are valid for 12 months from purchase.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "0 2rem",
                borderLeft: i > 0 ? "1px solid rgba(140,123,107,0.18)" : "none",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.05rem",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "var(--bark)",
                  marginBottom: "0.5rem",
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.82rem",
                  color: "var(--mink)",
                  fontWeight: 300,
                  lineHeight: 1.7,
                }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── OCCASIONS ─────────────────────────────────────── */}
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
              "radial-gradient(circle at 20% 60%, rgba(212,184,168,0.1), transparent 50%), radial-gradient(circle at 80% 30%, rgba(163,172,148,0.08), transparent 50%)",
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
          <div style={{ marginBottom: "56px", textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--blush)",
                marginBottom: "1.2rem",
                display: "inline-flex",
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
              Occasions
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                fontWeight: 300,
                color: "var(--linen)",
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
              }}
            >
              The perfect gift for any{" "}
              <em style={{ fontStyle: "italic" }}>occasion.</em>
            </h2>
          </div>

          <div
            className="benefits-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
            {[
              {
                occasion: "Birthday",
                desc: "Give a birthday that restores, not just celebrates.",
              },
              {
                occasion: "Anniversary",
                desc: "An experience you\u2019ll both remember.",
              },
              {
                occasion: "Mother\u2019s Day",
                desc: "She deserves more than flowers.",
              },
              {
                occasion: "Bridal Shower",
                desc: "Calm before the big day.",
              },
              {
                occasion: "Thank You",
                desc: "Show gratitude with something they\u2019ll actually love.",
              },
              {
                occasion: "Self-Care",
                desc: "Sometimes the best gift is the one you give yourself.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "2.2rem",
                  background: "rgba(237,230,219,0.06)",
                  border: "1px solid rgba(237,230,219,0.1)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem",
                    fontWeight: 300,
                    fontStyle: "italic",
                    color: "var(--linen)",
                    marginBottom: "0.7rem",
                    lineHeight: 1.25,
                  }}
                >
                  {item.occasion}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.88rem",
                    lineHeight: 1.8,
                    color: "rgba(237,230,219,0.6)",
                    fontWeight: 300,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
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
              How It Works
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
              Simple and{" "}
              <em style={{ fontStyle: "italic" }}>thoughtful.</em>
            </h2>
          </div>

          <div
            className="values-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "3rem",
            }}
          >
            {howItWorks.map((step) => (
              <div key={step.num}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
                    color: "var(--blush)",
                    fontStyle: "italic",
                    opacity: 0.7,
                    marginBottom: "1rem",
                  }}
                >
                  {step.num}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    fontWeight: 300,
                    color: "var(--bark)",
                    marginBottom: "0.75rem",
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.88rem",
                    lineHeight: 1.85,
                    color: "var(--mink)",
                    fontWeight: 300,
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <CTABanner
        variant="dark"
        headline="Give the gift of"
        headlineItalic="calm."
        description="A Lather gift card is more than a present — it's an act of care. Purchase online or by phone, and we'll make it beautiful."
        primaryCTA={{
          label: "Purchase Gift Card",
          href: "/book",
        }}
        secondaryCTA={{
          label: "Call to Purchase",
          href: "tel:+12525310987",
        }}
      />

      <Footer />
    </main>
  );
}
