import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import TreatmentComparison from "@/components/TreatmentComparison";
import { services, addOns } from "@/lib/data";


const tierLabels: Record<string, string> = {
  foundation: "Foundation",
  specialized: "Specialized",
  premium: "Premium",
};

export const metadata: Metadata = {
  title: "Treatments",
  description:
    "Explore Lather's full menu of scalp rituals and head spa treatments. Compare services by duration, price, and results to find your perfect ritual in Greenville, NC.",
};

export default function TreatmentsPage() {
  return (
    <main>
      <ScrollReveal />
      <Navbar />

      {/* ── HERO ──────────────────────────────────────── */}
      <section
        style={{
          minHeight: "55vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 clamp(20px, 4vw, 48px) clamp(56px, 8vw, 80px)",
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
              "radial-gradient(ellipse at 80% 20%, rgba(212,184,168,0.22), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(163,172,148,0.12), transparent 55%)",
            pointerEvents: "none",
          }}
        />

        <img
          src="/media/treatments/treatments-hero.jpg"
          alt="Treatment brushes in wooden holder at Lather"
          loading="eager"
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "clamp(20px, 4vw, 48px)",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(200px, 30vw, 380px)",
            height: "clamp(280px, 45vw, 480px)",
            objectFit: "cover",
            opacity: 0.15,
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
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
            Our Treatments
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
            The rituals that{" "}
            <em style={{ fontStyle: "italic" }}>restore.</em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
              lineHeight: 1.88,
              color: "var(--mink)",
              fontWeight: 300,
              maxWidth: "520px",
              marginTop: "1.75rem",
            }}
          >
            Four distinct rituals, one shared intention: restore the scalp, renew the hair, and give your nervous system permission to rest. Every session is private, unhurried, and tailored to you.
          </p>
        </div>
      </section>

      {/* ── SERVICE HIERARCHY ─────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--cream)",
          padding: "clamp(56px, 8.5vw, 100px) clamp(20px, 4vw, 48px)",
          position: "relative",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "clamp(20px, 4vw, 48px)",
            right: "clamp(20px, 4vw, 48px)",
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(140,123,107,0.25) 30%, rgba(140,123,107,0.25) 70%, transparent)",
          }}
        />

        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="about-grid reveal-section reveal-fade"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(2rem, 5vw, 5rem)",
                alignItems: "start",
                padding: "clamp(40px, 6vw, 72px) 0",
                borderBottom: idx < services.length - 1 ? "1px solid rgba(140,123,107,0.12)" : "none",
                transitionDelay: `${idx * 80}ms`,
              }}
            >
              {/* Left: image */}
              <div
                className="service-image-col"
                style={{
                  overflow: "hidden",
                  height: "clamp(300px, 40vw, 440px)",
                  order: idx % 2 === 0 ? 0 : 1,
                }}
              >
                <img
                  src={service.image}
                  alt={`${service.name} at Lather Head Spa`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* Right: details */}
              <div style={{ order: idx % 2 === 0 ? 1 : 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.52rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--stone)",
                      padding: "4px 10px",
                      border: "1px solid rgba(140,123,107,0.2)",
                    }}
                  >
                    {tierLabels[service.tier]}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.85rem",
                      fontStyle: "italic",
                      color: "var(--blush)",
                      opacity: 0.7,
                    }}
                  >
                    0{idx + 1}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    fontWeight: 300,
                    color: "var(--bark)",
                    lineHeight: 1.1,
                    marginBottom: "0.5rem",
                  }}
                >
                  {service.name}
                </h2>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.12em",
                    color: "var(--stone)",
                    marginBottom: "1.5rem",
                  }}
                >
                  {service.duration} · ${service.price} · {service.bestForTags[0]}
                </p>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.92rem",
                    lineHeight: 1.88,
                    color: "var(--mink)",
                    fontWeight: 300,
                    marginBottom: "1.75rem",
                  }}
                >
                  {service.tagline}. {service.description.split(". ").slice(0, 2).join(". ")}.
                </p>

                <div style={{ marginBottom: "2rem" }}>
                  {service.highlights.map((h) => (
                    <div key={h} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                      <span style={{ width: "18px", height: "1px", background: "var(--blush)", flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--mink)", fontWeight: 300 }}>{h}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                  <a
                    href="/book"
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--cream)",
                      background: "var(--bark)",
                      padding: "13px 28px",
                      textDecoration: "none",
                      transition: "background 0.3s ease",
                    }}
                  >
                    Book Now
                  </a>
                  <Link
                    href={`/treatments/${service.id}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--bark)",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(61,46,34,0.3)",
                      paddingBottom: "2px",
                      transition: "opacity 0.25s",
                    }}
                  >
                    Full details <span style={{ fontSize: "0.8rem" }}>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────── */}
      <TreatmentComparison />

      {/* ── ADD-ONS ───────────────────────────────────── */}
      <section
        className="reveal-section reveal-lift grain-overlay section-pad"
        style={{
          background: "var(--bark)",
          padding: "clamp(56px, 8.5vw, 100px) clamp(20px, 4vw, 48px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 85% 25%, rgba(212,184,168,0.1), transparent 50%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
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
            Enhancements
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
              fontWeight: 300,
              color: "var(--linen)",
              lineHeight: 1.06,
              letterSpacing: "-0.01em",
              marginBottom: "1.2rem",
            }}
          >
            Elevate your <em style={{ fontStyle: "italic" }}>ritual.</em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              lineHeight: 1.85,
              color: "rgba(237,230,219,0.55)",
              fontWeight: 300,
              maxWidth: "480px",
              marginBottom: "clamp(40px, 6vw, 64px)",
            }}
          >
            Add any of these enhancements to your treatment. Mention them when booking or let your therapist know at the start of your session.
          </p>

          <div
            className="values-grid stagger-children"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
              background: "rgba(237,230,219,0.06)",
            }}
          >
            {addOns.map((addon) => (
              <div
                key={addon.id}
                style={{
                  background: "rgba(61,46,34,0.95)",
                  padding: "clamp(1.5rem, 2.5vw, 2rem)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.15rem",
                      fontWeight: 300,
                      color: "var(--linen)",
                      lineHeight: 1.25,
                    }}
                  >
                    {addon.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.05rem",
                      color: "var(--linen)",
                      fontWeight: 300,
                      flexShrink: 0,
                      marginLeft: "12px",
                    }}
                  >
                    +${addon.price}
                  </span>
                </div>

                {addon.duration !== "—" && (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", letterSpacing: "0.12em", color: "rgba(237,230,219,0.4)", marginBottom: "0.75rem" }}>
                    {addon.duration}
                  </p>
                )}

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    lineHeight: 1.75,
                    color: "rgba(237,230,219,0.55)",
                    fontWeight: 300,
                  }}
                >
                  {addon.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOT SURE? ─────────────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--cream)",
          padding: "clamp(56px, 8.5vw, 80px) clamp(20px, 4vw, 48px)",
        }}
      >
        <div
          className="about-grid"
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                color: "var(--bark)",
                lineHeight: 1.08,
                marginBottom: "1.5rem",
              }}
            >
              Not sure which ritual is{" "}
              <em style={{ fontStyle: "italic" }}>right for you?</em>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                lineHeight: 1.88,
                color: "var(--mink)",
                fontWeight: 300,
                marginBottom: "1.5rem",
              }}
            >
              Every session begins with a consultation. We assess your scalp, discuss your goals, and recommend the treatment that makes the most sense for where you are right now. No pressure, no upselling — just honest guidance.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
            <Link
              href="/scalp-concerns"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--bark)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(61,46,34,0.3)",
                paddingBottom: "3px",
              }}
            >
              Find your treatment by concern <span style={{ fontSize: "0.8rem" }}>→</span>
            </Link>
            <Link
              href="/what-is-a-head-spa"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--bark)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(61,46,34,0.3)",
                paddingBottom: "3px",
              }}
            >
              What is a head spa? <span style={{ fontSize: "0.8rem" }}>→</span>
            </Link>
            <Link
              href="/faq"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--bark)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(61,46,34,0.3)",
                paddingBottom: "3px",
              }}
            >
              FAQ + policies <span style={{ fontSize: "0.8rem" }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <CTABanner
        eyebrow="Reserve Your Ritual"
        headline="Ready to"
        headlineItalic="begin?"
        description="Book your appointment online. Each session is private, unhurried, and reserved exclusively for you."
        secondaryCTA={{ label: "Call to Book", href: "tel:+12525310987" }}
      />

      <Footer />
    </main>
  );
}
