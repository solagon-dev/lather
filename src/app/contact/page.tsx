"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";


const bookingFaqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "The easiest way is through our online booking page — just click the Book Now button on our site. Select your preferred ritual, choose a date and time that works for you, and confirm instantly. You can also call us at (252) 531-0987 or email hello@latherspas.com to book by phone or message.",
  },
  {
    question: "How should I prepare for my appointment?",
    answer:
      "Arrive with clean, product-free hair if possible. Wear something comfortable that you don't mind relaxing in. We recommend arriving five minutes early so you can settle in without rushing. Most importantly, come ready to slow down.",
  },
  {
    question: "What if I need to cancel or reschedule?",
    answer:
      "We understand plans change. We ask for at least 24 hours notice for cancellations or reschedules so we can offer your time slot to someone else. You can manage your appointment directly through our booking system or by contacting us.",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes. Free parking is available directly in front of our studio. Street parking is also available on adjacent streets. You won't need to worry about meters or garages.",
  },
  {
    question: "Can I bring a friend?",
    answer:
      "Absolutely. If you'd like to share the experience, we recommend booking side-by-side appointments so you can enjoy your rituals together. For group bookings of three or more, check out our Spa Parties page or contact us directly to arrange something special.",
  },
  {
    question: "Do you accept walk-ins?",
    answer:
      "We operate by appointment only to ensure every guest receives our full, undivided attention. Same-day availability does open up from time to time, so feel free to call us at (252) 531-0987 if you'd like to check.",
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main>
      <ScrollReveal />
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="grain-overlay section-pad contact-page-hero"
        style={{
          minHeight: "52vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 clamp(20px, 4vw, 48px) clamp(48px, 8vw, 80px)",
          background: "var(--charcoal)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="/media/pages/contact-hero.jpg"
          alt="Inside Lather Head Spa — warm, inviting treatment space in Greenville, NC"
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
            Greenville, NC
          </p>
          <h1
            className="contact-page-hero-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 300,
              color: "var(--linen)",
              lineHeight: 1.04,
              letterSpacing: "-0.015em",
              marginBottom: "1.5rem",
            }}
          >
            Begin your
            <br />
            <em style={{ fontStyle: "italic" }}>ritual.</em>
          </h1>
          <p
            className="contact-page-hero-sub"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              lineHeight: 1.85,
              color: "rgba(237,230,219,0.6)",
              fontWeight: 300,
              maxWidth: "480px",
            }}
          >
            Every visit to Lather is time set aside for you. Book your
            appointment, find us in Greenville, and arrive ready to breathe.
          </p>
        </div>
      </section>

      {/* ── PRIMARY BOOKING SECTION ───────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--cream)",
          padding: "clamp(56px, 8.5vw, 100px) clamp(20px, 4vw, 48px)",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: "6rem",
            alignItems: "start",
          }}
          className="about-grid contact-booking-grid"
        >
          {/* Left column — sticky on desktop */}
          <div
            className="contact-info-sticky contact-booking-info"
            style={{ position: "sticky", top: "120px" }}
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
              Reserve Your Ritual
            </p>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 4.5vw, 3.5rem)",
                fontWeight: 300,
                color: "var(--bark)",
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
                marginBottom: "2rem",
              }}
            >
              Ready to{" "}
              <em style={{ fontStyle: "italic" }}>exhale?</em>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.92rem",
                lineHeight: 1.88,
                color: "var(--mink)",
                fontWeight: 300,
                marginBottom: "1.25rem",
              }}
            >
              Sessions at Lather are by appointment only. Each time slot is
              reserved exclusively for you — no overlap, no waiting room, no
              distractions.
            </p>
            <p
              className="contact-booking-info-desc"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.92rem",
                lineHeight: 1.88,
                color: "var(--mink)",
                fontWeight: 300,
                marginBottom: "2.5rem",
              }}
            >
              Book online for instant confirmation, or reach out
              directly by phone or email. We are happy to help you find the right
              ritual for your needs.
            </p>

            {/* After You Book info box */}
            <div
              className="contact-after-book"
              style={{
                padding: "1.5rem",
                border: "1px solid rgba(140,123,107,0.15)",
                background: "var(--linen)",
                marginBottom: "2.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--stone)",
                  marginBottom: "0.75rem",
                }}
              >
                After You Book
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  lineHeight: 1.8,
                  color: "var(--mink)",
                  fontWeight: 300,
                }}
              >
                You will receive a confirmation email with everything you need to
                know. Arrive with clean, product-free hair if possible. Wear
                something comfortable. And plan to give yourself a little quiet
                time afterward — you will want it.
              </p>
            </div>

            {/* Contact Details */}
            <div
              className="contact-details-list"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {[
                { label: "Location", value: "620 Lynndale Court\nGreenville, NC 27858", href: null },
                {
                  label: "Hours",
                  value: "Tue\u2013Sat \u00b7 10am\u20137pm",
                  href: null,
                },
                {
                  label: "Phone",
                  value: "(252) 531-0987",
                  href: "tel:+12525310987",
                },
                {
                  label: "Email",
                  value: "hello@latherspas.com",
                  href: "mailto:hello@latherspas.com",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "baseline",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.58rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--stone)",
                      flexShrink: 0,
                      width: "70px",
                    }}
                  >
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.88rem",
                        color: "var(--bark)",
                        textDecoration: "none",
                        fontWeight: 300,
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "0.55")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.88rem",
                        color: "var(--mink)",
                        fontWeight: 300,
                      }}
                    >
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right column — booking card + alternatives */}
          <div className="contact-booking-card">
            {/* Dark booking card */}
            <div
              style={{
                background: "var(--bark)",
                padding: "clamp(2.5rem, 5vw, 4rem)",
                position: "relative",
                overflow: "hidden",
                marginBottom: "1.5rem",
              }}
              className="grain-overlay"
            >
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

              <div style={{ position: "relative", zIndex: 1 }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "var(--blush)",
                    marginBottom: "1rem",
                    opacity: 0.85,
                  }}
                >
                  Online Booking
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    fontWeight: 300,
                    color: "var(--linen)",
                    lineHeight: 1.15,
                    marginBottom: "1.25rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Book{" "}
                  <em style={{ fontStyle: "italic" }}>online.</em>
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.88rem",
                    color: "rgba(237,230,219,0.62)",
                    lineHeight: 1.85,
                    fontWeight: 300,
                    marginBottom: "2.25rem",
                    maxWidth: "420px",
                  }}
                >
                  Select your ritual, choose a date and time, and confirm
                  instantly. You will receive an email confirmation with
                  all the details you need.
                </p>

                <a
                  href="/book"
                  className="book-online-btn"
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--bark)",
                    background: "var(--linen)",
                    padding: "18px 48px",
                    textDecoration: "none",
                    transition:
                      "background 0.3s ease, transform 0.3s var(--ease-luxury)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--cream)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--linen)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  Book Online →
                </a>
              </div>
            </div>

            {/* Alternative contact row */}
            <div
              className="contact-alt-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <a
                href="tel:+12525310987"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  padding: "1.5rem",
                  border: "1px solid rgba(140,123,107,0.15)",
                  textDecoration: "none",
                  background: "transparent",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--linen)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--stone)",
                  }}
                >
                  Call to Book
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    color: "var(--bark)",
                    fontWeight: 300,
                  }}
                >
                  (252) 531-0987
                </p>
              </a>

              <a
                href="mailto:hello@latherspas.com"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  padding: "1.5rem",
                  border: "1px solid rgba(140,123,107,0.15)",
                  textDecoration: "none",
                  background: "transparent",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--linen)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--stone)",
                  }}
                >
                  Email Us
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    color: "var(--bark)",
                    fontWeight: 300,
                  }}
                >
                  hello@latherspas.com
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION & DIRECTIONS ─────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--linen)",
          padding: "clamp(56px, 8.5vw, 100px) clamp(20px, 4vw, 48px)",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
            alignItems: "start",
          }}
          className="about-grid contact-location-grid"
        >
          {/* Left — directions info */}
          <div className="contact-location-copy">
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
              Find Us
            </p>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                fontWeight: 300,
                color: "var(--bark)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                marginBottom: "2rem",
              }}
            >
              Located in{" "}
              <em style={{ fontStyle: "italic" }}>Greenville, NC.</em>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.92rem",
                lineHeight: 1.88,
                color: "var(--mink)",
                fontWeight: 300,
                marginBottom: "1.25rem",
              }}
            >
              Lather Head Spa is rooted in eastern North Carolina, serving
              Greenville and the surrounding communities of Winterville, Ayden,
              Kinston, Washington, and beyond. We are easy to find and worth the
              drive.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.92rem",
                lineHeight: 1.88,
                color: "var(--mink)",
                fontWeight: 300,
                marginBottom: "2.5rem",
              }}
            >
              Our studio is a calm, private space designed for focused care.
              When you arrive, you will know you are in the right place.
            </p>

            {/* Parking */}
            <div style={{ marginBottom: "2rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--stone)",
                  marginBottom: "0.6rem",
                }}
              >
                Parking
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.88rem",
                  lineHeight: 1.85,
                  color: "var(--mink)",
                  fontWeight: 300,
                }}
              >
                Free parking is available directly in front of our studio.
                Street parking is also available on adjacent streets.
              </p>
            </div>

            {/* Accessibility */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--stone)",
                  marginBottom: "0.6rem",
                }}
              >
                Accessibility
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.88rem",
                  lineHeight: 1.85,
                  color: "var(--mink)",
                  fontWeight: 300,
                }}
              >
                Our studio is ground-level with step-free entry. If you have
                specific accessibility needs, please let us know when booking
                and we will ensure your comfort.
              </p>
            </div>
          </div>

          {/* Right — Google Map */}
          <div
            className="contact-map-container"
            style={{
              overflow: "hidden",
              minHeight: "420px",
              position: "relative",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAX0ejy_st1v_b74pD_JonXQph-bGGP04A&q=Lather+Head+Spa,Greenville,NC&zoom=14&maptype=roadmap"
              width="100%"
              height="100%"
              style={{
                border: "none",
                display: "block",
                position: "absolute",
                inset: 0,
                filter: "grayscale(0.3) contrast(0.95)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lather Head Spa location — Greenville, NC"
            />
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ────────────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--cream)",
          padding: "clamp(56px, 8.5vw, 100px) clamp(20px, 4vw, 48px)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "6rem",
              alignItems: "start",
            }}
            className="about-grid contact-expect-grid"
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
                Your Visit
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
                What to{" "}
                <em style={{ fontStyle: "italic" }}>expect.</em>
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
              }}
              className="benefits-grid contact-expect-steps"
            >
              {[
                {
                  step: "01",
                  label: "Arrival",
                  body: "You\u2019ll be welcomed into a calm, private space. No busy waiting room. Just you.",
                },
                {
                  step: "02",
                  label: "Consultation",
                  body: "We begin with a brief scalp assessment to understand your needs and tailor your treatment.",
                },
                {
                  step: "03",
                  label: "The Ritual",
                  body: "Recline, close your eyes, and let us work. Every touch is intentional, every product is considered.",
                },
                {
                  step: "04",
                  label: "Renewal",
                  body: "You leave with a scalp that breathes and hair that shines. Plan some quiet time afterward\u00a0\u2014\u00a0you\u2019ll want it.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="contact-expect-step"
                  style={{
                    padding: "2rem",
                    background: "rgba(237,230,219,0.5)",
                    border: "1px solid rgba(140,123,107,0.1)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.4rem",
                      color: "var(--blush)",
                      fontStyle: "italic",
                      opacity: 0.7,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.step}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      color: "var(--bark)",
                      fontWeight: 400,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.82rem",
                      lineHeight: 1.8,
                      color: "var(--stone)",
                      fontWeight: 300,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ PREVIEW ───────────────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--linen)",
          padding: "clamp(56px, 8.5vw, 100px) clamp(20px, 4vw, 48px)",
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
              Booking Questions
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
              Before you{" "}
              <em style={{ fontStyle: "italic" }}>book.</em>
            </h2>
          </div>

          <div>
            {bookingFaqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid rgba(140,123,107,0.15)",
                  borderTop:
                    i === 0
                      ? "1px solid rgba(140,123,107,0.15)"
                      : "none",
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
                      transition:
                        "transform 0.35s var(--ease-luxury)",
                      transform:
                        openFaq === i ? "rotate(45deg)" : "none",
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
                    transition:
                      "max-height 0.45s var(--ease-luxury)",
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

          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <Link
              href="/faq"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--bark)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(61,46,34,0.35)",
                paddingBottom: "2px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.opacity = "0.5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.opacity = "1")
              }
            >
              View All FAQ + Policies →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <CTABanner
        eyebrow="We Are Here to Help"
        headline="Still have"
        headlineItalic="questions?"
        description="Whether you are unsure which ritual is right for you, have a concern about your scalp, or just want to know more before booking — reach out. We would love to hear from you."
        primaryCTA={{
          label: "Call (252) 531-0987",
          href: "tel:+12525310987",
        }}
        secondaryCTA={{
          label: "View FAQ",
          href: "/faq",
        }}
      />

      <Footer />
    </main>
  );
}
