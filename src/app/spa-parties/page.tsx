import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Spa Parties & Group Bookings",
  description:
    "Host a private head spa experience at Lather — bachelorette parties, bridal showers, birthdays, corporate wellness, and more in Greenville, NC.",
};

const inclusions = [
  {
    title: "Private Spa Access",
    body: "The entire studio is yours. No interruptions, no strangers — just your group in a space designed for deep relaxation.",
  },
  {
    title: "Customized Treatments",
    body: "Every guest receives a personalized treatment tailored to their scalp needs. No two sessions are the same.",
  },
  {
    title: "Complimentary Refreshments",
    body: "Herbal teas, infused water, and light bites curated to complement the calm of your experience.",
  },
  {
    title: "Curated Ambiance & Music",
    body: "Lighting, scent, and sound are set to create the mood — whether you want serene stillness or soft conversation.",
  },
  {
    title: "Group Photo Moment",
    body: "A beautifully styled moment for your group to capture the glow together before you leave.",
  },
  {
    title: "Personalized Scalp Consultations",
    body: "Each guest receives a brief scalp analysis and take-home care recommendations from our specialists.",
  },
];

const eventTypes = [
  {
    title: "Bridal & Bachelorette",
    body: "Gift the bride-to-be and her closest circle a shared moment of restoration before the big day. Slow down together before everything speeds up.",
  },
  {
    title: "Birthday Celebrations",
    body: "Skip the noise. Celebrate another year with the kind of quiet indulgence that leaves everyone feeling renewed — not exhausted.",
  },
  {
    title: "Corporate Wellness",
    body: "Offer your team more than a perk. A private Lather session is a genuine investment in the wellbeing of the people who carry your organization.",
  },
  {
    title: "Girls' Night",
    body: "No agenda. No rush. Just a circle of women in a warm, beautiful space — letting go of the week and settling into something softer.",
  },
];

const steps = [
  {
    num: "01",
    title: "Reach Out",
    body: "Contact us by email or phone and let us know your group size, preferred date, and what you're celebrating.",
  },
  {
    num: "02",
    title: "We Customize",
    body: "Our team designs a bespoke experience — selecting treatments, setting the ambiance, and coordinating every detail so you don't have to.",
  },
  {
    num: "03",
    title: "Show Up & Exhale",
    body: "Arrive with your people. We take care of absolutely everything else. All you need to bring is yourself.",
  },
];

export default function SpaPartiesPage() {
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
          src="/media/pages/spa-parties-hero.jpg"
          alt="The Lather team in the studio with warm lighting and gold accents"
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
            Private Events
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
            Gather.
            <br />
            <em style={{ fontStyle: "italic" }}>Restore.</em>
          </h1>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────── */}
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
              Group Experiences
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
              Private head spa experiences for{" "}
              <em style={{ fontStyle: "italic" }}>groups.</em>
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
              Some gatherings deserve more than brunch. At Lather, we open our doors for private group sessions — bachelorette parties, bridal showers, birthdays, corporate wellness days, and intimate girls' nights. The entire studio becomes yours: curated, quiet, and designed around your group's energy.
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
              Every guest receives a fully personalized treatment. Every detail — from the lighting to the music to the refreshments — is considered. This is not a group discount. This is a collective experience of luxury, held in a space built for it.
            </p>
          </div>
        </div>

        {/* Capacity & pricing info row */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            marginTop: "3.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0",
            textAlign: "center",
          }}
          className="values-grid"
        >
          {[
            "Groups of 3\u20138 guests",
            "Starting at $85 per person",
            "Weekday and weekend availability",
          ].map((item, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                color: "var(--mink)",
                fontWeight: 300,
                letterSpacing: "0.04em",
                padding: "0 1.5rem",
                borderLeft: i > 0 ? "1px solid rgba(140,123,107,0.18)" : "none",
                lineHeight: 1.6,
              }}
            >
              {item}
            </p>
          ))}
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ───────────────────────────────── */}
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
          <div style={{ marginBottom: "72px" }}>
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
              What&rsquo;s Included
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
              Every detail,{" "}
              <em style={{ fontStyle: "italic" }}>considered.</em>
            </h2>
          </div>

          <div
            className="benefits-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "3rem",
              borderTop: "1px solid rgba(237,230,219,0.1)",
              paddingTop: "60px",
            }}
          >
            {inclusions.map((item, i) => (
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
                    fontSize: "1.5rem",
                    fontWeight: 300,
                    color: "var(--linen)",
                    marginBottom: "1rem",
                    fontStyle: "italic",
                    lineHeight: 1.2,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    lineHeight: 1.85,
                    color: "rgba(237,230,219,0.62)",
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

      {/* ── EVENT TYPES ───────────────────────────────────── */}
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
              Occasions
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
              Worth gathering{" "}
              <em style={{ fontStyle: "italic" }}>for.</em>
            </h2>
          </div>

          <div
            className="benefits-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "2rem",
            }}
          >
            {eventTypes.map((event, i) => (
              <div
                key={i}
                style={{
                  padding: "2.5rem",
                  background: "var(--cream)",
                  border: "1px solid rgba(140,123,107,0.12)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.4rem",
                    fontWeight: 300,
                    color: "var(--bark)",
                    marginBottom: "1rem",
                    fontStyle: "italic",
                    lineHeight: 1.25,
                  }}
                >
                  {event.title}
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
                  {event.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO BOOK ───────────────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--cream)",
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
              Getting Started
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
              Three simple{" "}
              <em style={{ fontStyle: "italic" }}>steps.</em>
            </h2>
          </div>

          <div
            className="values-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "3rem",
              marginBottom: "4rem",
            }}
          >
            {steps.map((step) => (
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

          {/* Contact info block */}
          <div
            style={{
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
              padding: "2.5rem",
              background: "var(--linen)",
              border: "1px solid rgba(140,123,107,0.12)",
            }}
          >
            <div style={{ flex: 1, minWidth: "200px" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--stone)",
                  marginBottom: "0.5rem",
                }}
              >
                Email Us
              </p>
              <a
                href="mailto:hello@latherspas.com"
                className="hover-fade"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  color: "var(--bark)",
                  fontWeight: 300,
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
              >
                hello@latherspas.com
              </a>
            </div>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--stone)",
                  marginBottom: "0.5rem",
                }}
              >
                Call Us
              </p>
              <a
                href="tel:+12525310987"
                className="hover-fade"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  color: "var(--bark)",
                  fontWeight: 300,
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
              >
                (252) 531-0987
              </a>
            </div>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--stone)",
                  marginBottom: "0.5rem",
                }}
              >
                Location
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  color: "var(--bark)",
                  fontWeight: 300,
                }}
              >
                Greenville, NC
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INQUIRY FORM ──────────────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--linen)",
          padding: "clamp(56px, 8.5vw, 120px) clamp(20px, 4vw, 48px)",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.62rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--stone)",
              marginBottom: "1.2rem",
              display: "inline-flex",
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
            Inquire
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 300,
              color: "var(--bark)",
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              marginBottom: "1.5rem",
            }}
          >
            Let&rsquo;s plan your{" "}
            <em style={{ fontStyle: "italic" }}>gathering.</em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              lineHeight: 1.85,
              color: "var(--mink)",
              fontWeight: 300,
              marginBottom: "3rem",
            }}
          >
            Share a few details below, and our team will respond within 24 hours to begin shaping your private experience.
          </p>

          <form
            action="mailto:hello@latherspas.com"
            method="POST"
            encType="text/plain"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              textAlign: "left",
            }}
          >
            <div>
              <label
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.58rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "var(--stone)",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Name
              </label>
              <input
                type="text"
                name="Name"
                required
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "1px solid rgba(140,123,107,0.2)",
                  background: "transparent",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  padding: "14px 0",
                  color: "var(--bark)",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <label
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.58rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "var(--stone)",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  required
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: "1px solid rgba(140,123,107,0.2)",
                    background: "transparent",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    padding: "14px 0",
                    color: "var(--bark)",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.58rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "var(--stone)",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="Phone"
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: "1px solid rgba(140,123,107,0.2)",
                    background: "transparent",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    padding: "14px 0",
                    color: "var(--bark)",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.58rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "var(--stone)",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Event Type
              </label>
              <select
                name="EventType"
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "1px solid rgba(140,123,107,0.2)",
                  background: "transparent",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  padding: "14px 0",
                  color: "var(--bark)",
                  outline: "none",
                  borderRadius: 0,
                  appearance: "none" as React.CSSProperties["appearance"],
                  cursor: "pointer",
                }}
              >
                <option value="">Select an occasion</option>
                <option value="Bridal & Bachelorette">Bridal &amp; Bachelorette</option>
                <option value="Birthday Celebration">Birthday Celebration</option>
                <option value="Corporate Wellness">Corporate Wellness</option>
                <option value="Girls' Night">Girls&rsquo; Night</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <label
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.58rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "var(--stone)",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Preferred Date
                </label>
                <input
                  type="text"
                  name="PreferredDate"
                  placeholder="e.g. June 15, 2026"
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: "1px solid rgba(140,123,107,0.2)",
                    background: "transparent",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    padding: "14px 0",
                    color: "var(--bark)",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.58rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "var(--stone)",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Group Size
                </label>
                <input
                  type="text"
                  name="GroupSize"
                  placeholder="e.g. 5 guests"
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: "1px solid rgba(140,123,107,0.2)",
                    background: "transparent",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    padding: "14px 0",
                    color: "var(--bark)",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.58rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "var(--stone)",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Message
              </label>
              <textarea
                name="Message"
                rows={5}
                style={{
                  width: "100%",
                  border: "1px solid rgba(140,123,107,0.2)",
                  background: "transparent",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  padding: "14px",
                  color: "var(--bark)",
                  outline: "none",
                  minHeight: "120px",
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <button
                type="submit"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  background: "var(--bark)",
                  color: "var(--cream)",
                  border: "none",
                  padding: "16px 40px",
                  cursor: "pointer",
                  transition: "opacity 0.3s ease",
                }}
              >
                Send Inquiry
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <CTABanner
        eyebrow="Private Events"
        headline="Plan your"
        headlineItalic="gathering."
        description="We'll handle the details. You bring the people who matter most."
        primaryCTA={{
          label: "Contact Us",
          href: "/contact",
        }}
        secondaryCTA={{
          label: "Call to Inquire",
          href: "tel:+12525310987",
        }}
      />

      <Footer />
    </main>
  );
}
