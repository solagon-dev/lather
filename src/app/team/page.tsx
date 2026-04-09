import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the team behind Lather Head Spa. Trained in Japanese head spa techniques and dedicated to scalp health, our therapists bring craft and care to every session.",
};

const teamMembers = [
  {
    image: "/media/team/madison-hoffschneider.jpg",
    role: "Founder & Lead Therapist",
    bio: "With years of experience in scalp health and wellness, our founder built Lather to bring the Japanese head spa tradition to eastern North Carolina. Every protocol, product, and detail reflects a commitment to results-driven care in a genuinely calming environment.",
  },
  {
    image: "/media/team/heidi-griggs.jpg",
    role: "Scalp Therapist",
    bio: "Trained in therapeutic scalp techniques and advanced treatment protocols, our scalp therapist brings precision and intuition to every session. Her approach blends technical expertise with a warm, attentive presence — ensuring every guest feels both cared for and restored.",
  },
];

const teamValues = [
  {
    title: "Trained, Not Scripted",
    body: "Every treatment is adapted to the individual. We assess, listen, and adjust — because no two scalps are the same, and no two sessions should be either.",
  },
  {
    title: "Quiet Expertise",
    body: "We let the results speak. Our therapists bring deep knowledge to every session without overwhelming you with jargon — just skilled hands and focused intention.",
  },
  {
    title: "Continuous Learning",
    body: "Scalp science evolves, and so do we. Our team pursues ongoing education in therapeutic technique, ingredient research, and treatment innovation.",
  },
];

export default function TeamPage() {
  return (
    <main>
      <ScrollReveal />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 48px 80px",
          background: "var(--charcoal)",
          position: "relative",
          overflow: "hidden",
        }}
        className="grain-overlay section-pad"
      >
        <img
          src="/media/team/team-atmosphere.jpg"
          alt="Lather Head Spa team at work"
          loading="eager"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
            opacity: 0.2,
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
            Our Team
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
            The hands behind
            <br />
            <em style={{ fontStyle: "italic" }}>the ritual.</em>
          </h1>
        </div>
      </section>

      {/* ── TEAM INTRO ───────────────────────────────────── */}
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
              Who We Are
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
              Founded on care.{" "}
              <em style={{ fontStyle: "italic" }}>Driven by craft.</em>
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
              Lather was built by a small team with one shared conviction: that scalp health deserves the same level of care and expertise as any other form of wellness. Trained in the Japanese head spa tradition and grounded in modern scalp science, we approach every session with precision, warmth, and deep attention to detail.
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
              We chose Greenville, NC because we saw a community that values authenticity and self-care — and we wanted to create a sanctuary that reflects both. Every element of the Lather experience, from the environment to the products to the hands-on technique, is designed to help you leave feeling lighter, clearer, and genuinely restored.
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
              This is personal work for us. We believe the best results come from therapists who are genuinely invested — in the craft, in the science, and in the people who sit in our chairs.
            </p>
          </div>
        </div>
      </section>

      {/* ── TEAM MEMBERS ─────────────────────────────────── */}
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
              Meet the Team
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
              The people behind{" "}
              <em style={{ fontStyle: "italic" }}>the practice.</em>
            </h2>
          </div>

          <div
            className="about-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
            }}
          >
            {teamMembers.map((member, i) => (
              <div key={i}>
                <div
                  style={{
                    width: "100%",
                    height: "420px",
                    overflow: "hidden",
                    marginBottom: "2rem",
                    position: "relative",
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.role}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center 20%",
                      display: "block",
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
                    fontWeight: 300,
                    color: "var(--bark)",
                    marginBottom: "0.75rem",
                    fontStyle: "italic",
                    lineHeight: 1.2,
                  }}
                >
                  {member.role}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    lineHeight: 1.88,
                    color: "var(--mink)",
                    fontWeight: 300,
                    maxWidth: "520px",
                  }}
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS & TRAINING ────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--cream)",
          padding: "clamp(56px, 8.5vw, 80px) clamp(20px, 4vw, 48px)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
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
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
            Our Standards
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "var(--bark)",
              lineHeight: 1.08,
              marginBottom: "clamp(40px, 6vw, 64px)",
            }}
          >
            Training & <em style={{ fontStyle: "italic" }}>credentials.</em>
          </h2>

          <div
            className="benefits-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
            }}
          >
            {[
              {
                label: "Japanese Head Spa Technique",
                detail: "Certified in traditional Japanese head spa methodology, including scalp assessment, therapeutic massage sequencing, and product application protocols.",
              },
              {
                label: "Natulique Product Certification",
                detail: "Trained and certified in the full Natulique organic product line — including scalp-specific formulations, bond rebuilding treatments, and growth support serums.",
              },
              {
                label: "High-Frequency & LED Therapy",
                detail: "Qualified in professional high-frequency combing and LED light therapy applications for scalp stimulation, anti-inflammatory support, and follicle recovery.",
              },
              {
                label: "Ongoing Education",
                detail: "Our team participates in continuing education on scalp science, trichology developments, and new therapeutic techniques. We evolve our protocols as the field advances.",
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: "2rem",
                  background: "var(--linen)",
                  border: "1px solid rgba(140,123,107,0.08)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem",
                    fontWeight: 300,
                    color: "var(--bark)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {item.label}
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
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────── */}
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
              How We Work
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
              Our <em style={{ fontStyle: "italic" }}>values.</em>
            </h2>
          </div>

          <div
            className="values-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "3.5rem",
              borderTop: "1px solid rgba(237,230,219,0.1)",
              paddingTop: "60px",
            }}
          >
            {teamValues.map((v, i) => (
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
                  {v.title}
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
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <CTABanner
        headline="Meet us in person."
        headlineItalic="Book a visit."
        secondaryCTA={{ label: "Contact Us", href: "/contact" }}
      />

      <Footer />
    </main>
  );
}
