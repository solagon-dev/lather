import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import {
  services,
  addOns,
  treatmentFAQs,
  treatmentDetails,
} from "@/lib/data";


const tierLabels: Record<string, string> = {
  foundation: "Foundation",
  specialized: "Specialized",
  premium: "Premium",
};

const firstTimeFitLabels: Record<string, string> = {
  recommended: "Recommended for first-timers",
  possible: "Suitable for first-timers",
};

/* ── helpers ─────────────────────────────────────── */

function splitLastWord(name: string) {
  const words = name.split(" ");
  if (words.length <= 1) return { head: "", tail: name };
  return { head: words.slice(0, -1).join(" "), tail: words[words.length - 1] };
}

function Dots({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: "5px", alignItems: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: i < filled ? "var(--blush)" : "rgba(140,123,107,0.18)",
            transition: "background 0.2s ease",
          }}
        />
      ))}
    </span>
  );
}

/* ── static params ───────────────────────────────── */

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}

/* ── metadata ────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) return { title: "Treatment Not Found" };
  return {
    title: `${service.name} — Lather Head Spa | Greenville, NC`,
    description: service.description.substring(0, 160),
  };
}

/* ── page ────────────────────────────────────────── */

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) notFound();

  const details = treatmentDetails[slug];
  const faqs = treatmentFAQs[slug];
  const { head, tail } = splitLastWord(service.name);
  const otherServices = services.filter((s) => s.id !== slug).slice(0, 3);

  const matchingAddOns = addOns.filter((a) =>
    service.recommendedAddOns?.includes(a.id)
  );
  const upgradeService = service.suggestedUpgrade
    ? services.find((s) => s.id === service.suggestedUpgrade)
    : null;

  return (
    <main>
      <ScrollReveal />
      <Navbar />

      {/* ═══════════════════════════════════════════════════
          1. PREMIUM HERO
      ═══════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: "62vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 clamp(20px, 4vw, 48px) clamp(56px, 8vw, 80px)",
          background: "var(--charcoal)",
          position: "relative",
          overflow: "hidden",
        }}
        className="grain-overlay"
      >
        {/* bg image */}
        <img
          src={service.image}
          alt={`${service.name} treatment at Lather Head Spa`}
          loading="eager"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 35%",
            opacity: 0.22,
          }}
        />
        {/* gradient */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(15,10,6,0.75) 0%, rgba(15,10,6,0.3) 40%, transparent 65%)",
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
          {/* breadcrumb */}
          <nav
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.58rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(237,230,219,0.45)",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Link
              href="/treatments"
              style={{
                color: "rgba(237,230,219,0.45)",
                textDecoration: "none",
              }}
            >
              Treatments
            </Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: "rgba(237,230,219,0.65)" }}>
              {service.name}
            </span>
          </nav>

          {/* tier badge */}
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)",
              fontSize: "0.52rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--charcoal)",
              background: "var(--blush)",
              padding: "5px 14px 4px",
              marginBottom: "1.4rem",
              opacity: 0.92,
            }}
          >
            {tierLabels[service.tier] || service.tier}
          </span>

          {/* tagline eyebrow */}
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
            {service.tagline}
          </p>

          {/* heading */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 7vw, 5.8rem)",
              fontWeight: 300,
              color: "var(--linen)",
              lineHeight: 1.04,
              letterSpacing: "-0.015em",
            }}
          >
            {head}{head ? " " : ""}
            <em style={{ fontStyle: "italic" }}>{tail}.</em>
          </h1>

          {/* quick facts row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2.5rem",
              marginTop: "2.2rem",
              alignItems: "flex-end",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.5rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(237,230,219,0.4)",
                  marginBottom: "4px",
                }}
              >
                Duration
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  color: "var(--linen)",
                  fontWeight: 300,
                }}
              >
                {service.duration}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.5rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(237,230,219,0.4)",
                  marginBottom: "4px",
                }}
              >
                Investment
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  color: "var(--linen)",
                  fontWeight: 300,
                }}
              >
                ${service.price}
              </p>
            </div>
            {service.firstTimeFit && firstTimeFitLabels[service.firstTimeFit] && (
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--linen)",
                  border: "1px solid rgba(237,230,219,0.2)",
                  padding: "8px 18px",
                  opacity: 0.78,
                }}
              >
                {firstTimeFitLabels[service.firstTimeFit]}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          2. QUICK FACTS BAR
      ═══════════════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--linen)",
          padding: "clamp(28px, 4vw, 44px) clamp(20px, 4vw, 48px)",
          borderBottom: "1px solid rgba(140,123,107,0.1)",
        }}
      >
        <div
          className="benefits-grid"
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.52rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--stone)",
                marginBottom: "6px",
              }}
            >
              Duration
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.15rem",
                color: "var(--bark)",
                fontWeight: 300,
              }}
            >
              {service.duration}
            </p>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.52rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--stone)",
                marginBottom: "6px",
              }}
            >
              Investment
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.15rem",
                color: "var(--bark)",
                fontWeight: 300,
              }}
            >
              ${service.price}
            </p>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.52rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--stone)",
                marginBottom: "6px",
              }}
            >
              Best For
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                color: "var(--mink)",
                fontWeight: 300,
              }}
            >
              {service.bestForTags.slice(0, 2).join(" · ")}
            </p>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.52rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--stone)",
                marginBottom: "6px",
              }}
            >
              Intensity
            </p>
            <Dots filled={service.intensity} />
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.52rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--stone)",
                marginBottom: "6px",
              }}
            >
              Luxury Level
            </p>
            <Dots filled={service.luxuryLevel} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          3. OVERVIEW + IMAGE
      ═══════════════════════════════════════════════════ */}
      <section
        className="reveal-section reveal-lift"
        style={{
          background: "var(--cream)",
          padding: "clamp(56px, 8.5vw, 100px) clamp(20px, 4vw, 48px)",
        }}
      >
        <div
          className="about-grid"
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
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
              About This Treatment
            </p>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.92,
                color: "var(--mink)",
                fontWeight: 300,
                marginBottom: "2rem",
              }}
            >
              {service.description}
            </p>

            {service.note && (
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.82rem",
                  color: "var(--stone)",
                  fontStyle: "italic",
                  marginBottom: "2.5rem",
                  paddingLeft: "1rem",
                  borderLeft: "2px solid var(--blush)",
                }}
              >
                {service.note}
              </p>
            )}

            <div style={{ marginBottom: "2.5rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--stone)",
                  marginBottom: "1rem",
                }}
              >
                What&apos;s Included
              </p>
              {service.highlights.map((h) => (
                <div
                  key={h}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      width: "22px",
                      height: "1px",
                      background: "var(--blush)",
                      display: "block",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.88rem",
                      color: "var(--mink)",
                      fontWeight: 300,
                    }}
                  >
                    {h}
                  </span>
                </div>
              ))}
            </div>

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
                padding: "16px 40px",
                textDecoration: "none",
                transition:
                  "background 0.3s ease, transform 0.3s var(--ease-luxury)",
              }}
            >
              Book This Treatment
            </a>
          </div>

          <div
            style={{
              overflow: "hidden",
              height: "clamp(380px, 50vw, 600px)",
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          4. WHO IT'S FOR
      ═══════════════════════════════════════════════════ */}
      {details && (
        <section
          className="reveal-section reveal-lift"
          style={{
            background: "var(--bark)",
            padding: "clamp(56px, 8.5vw, 100px) clamp(20px, 4vw, 48px)",
            color: "var(--cream)",
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
                "radial-gradient(circle at 10% 50%, rgba(212,184,168,0.12), transparent 50%)",
              pointerEvents: "none",
            }}
          />

          <div
            className="about-grid"
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: "5rem",
              alignItems: "center",
            }}
          >
            <div>
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
                Who It&apos;s For
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.05rem",
                  lineHeight: 1.92,
                  color: "rgba(237,230,219,0.75)",
                  fontWeight: 300,
                }}
              >
                {details.whoItsFor}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "flex-start",
              }}
            >
              {service.bestForTags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(237,230,219,0.7)",
                    border: "1px solid rgba(237,230,219,0.18)",
                    padding: "8px 18px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          5. WHAT TO EXPECT
      ═══════════════════════════════════════════════════ */}
      {details?.whatToExpect && details.whatToExpect.length > 0 && (
        <section
          className="reveal-section reveal-lift"
          style={{
            background: "var(--cream)",
            padding: "clamp(56px, 8.5vw, 100px) clamp(20px, 4vw, 48px)",
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
              <span
                style={{
                  display: "inline-block",
                  width: "28px",
                  height: "1px",
                  background: "var(--blush)",
                }}
              />
              What to Expect
            </p>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                fontWeight: 300,
                color: "var(--bark)",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                marginBottom: "clamp(40px, 6vw, 72px)",
              }}
            >
              Your <em style={{ fontStyle: "italic" }}>journey,</em> step by
              step
            </h2>

            <div
              style={{
                display: "grid",
                gap: "0",
                maxWidth: "820px",
              }}
            >
              {details.whatToExpect.map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr",
                    gap: "1.5rem",
                    alignItems: "start",
                    padding: "clamp(20px, 3vw, 32px) 0",
                    borderTop:
                      i === 0
                        ? "1px solid rgba(140,123,107,0.15)"
                        : "1px solid rgba(140,123,107,0.1)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.6rem",
                      fontWeight: 300,
                      fontStyle: "italic",
                      color: "var(--blush)",
                      lineHeight: 1.4,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      lineHeight: 1.82,
                      color: "var(--mink)",
                      fontWeight: 300,
                    }}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          6. BEFORE & AFTER
      ═══════════════════════════════════════════════════ */}
      {details && (
        <section
          className="reveal-section reveal-lift"
          style={{
            background: "var(--linen)",
            padding: "clamp(56px, 8.5vw, 100px) clamp(20px, 4vw, 48px)",
          }}
        >
          <div
            className="about-grid"
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5rem",
            }}
          >
            {/* Before */}
            <div>
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
                Before Your Visit
              </p>
              {details.beforeVisit.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                    marginBottom: "14px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--blush)",
                      opacity: 0.6,
                      flexShrink: 0,
                      marginTop: "8px",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      lineHeight: 1.78,
                      color: "var(--mink)",
                      fontWeight: 300,
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* After */}
            <div>
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
                After Your Treatment
              </p>
              {details.afterCare.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                    marginBottom: "14px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--blush)",
                      opacity: 0.6,
                      flexShrink: 0,
                      marginTop: "8px",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      lineHeight: 1.78,
                      color: "var(--mink)",
                      fontWeight: 300,
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          7. ADD-ONS & UPGRADES
      ═══════════════════════════════════════════════════ */}
      {(matchingAddOns.length > 0 || upgradeService) && (
        <section
          className="reveal-section reveal-lift"
          style={{
            background: "var(--cream)",
            padding: "clamp(56px, 8.5vw, 100px) clamp(20px, 4vw, 48px)",
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
              <span
                style={{
                  display: "inline-block",
                  width: "28px",
                  height: "1px",
                  background: "var(--blush)",
                }}
              />
              Enhance Your Ritual
            </p>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                fontWeight: 300,
                color: "var(--bark)",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                marginBottom: "clamp(36px, 5vw, 60px)",
              }}
            >
              Curated <em style={{ fontStyle: "italic" }}>additions</em>
            </h2>

            {/* add-on cards */}
            {matchingAddOns.length > 0 && (
              <div
                className="values-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${Math.min(matchingAddOns.length, 3)}, 1fr)`,
                  gap: "2rem",
                  marginBottom: upgradeService ? "3rem" : "0",
                }}
              >
                {matchingAddOns.map((addon) => (
                  <div
                    key={addon.id}
                    style={{
                      padding: "2rem",
                      border: "1px solid rgba(140,123,107,0.12)",
                      background: "var(--linen)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.2rem",
                          fontWeight: 300,
                          color: "var(--bark)",
                        }}
                      >
                        {addon.name}
                      </p>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.1rem",
                          fontWeight: 300,
                          color: "var(--bark)",
                          whiteSpace: "nowrap",
                          marginLeft: "1rem",
                        }}
                      >
                        +${addon.price}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.68rem",
                        letterSpacing: "0.12em",
                        color: "var(--stone)",
                        marginBottom: "1rem",
                      }}
                    >
                      {addon.duration}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.85rem",
                        lineHeight: 1.72,
                        color: "var(--mink)",
                        fontWeight: 300,
                      }}
                    >
                      {addon.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* upgrade callout */}
            {upgradeService && service.suggestedUpgradeReason && (
              <div
                style={{
                  padding: "clamp(24px, 3.5vw, 40px)",
                  background: "var(--bark)",
                  color: "var(--cream)",
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
                      "radial-gradient(circle at 80% 20%, rgba(212,184,168,0.1), transparent 50%)",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "var(--blush)",
                      marginBottom: "0.8rem",
                      opacity: 0.85,
                    }}
                  >
                    Looking for more?
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                      fontWeight: 300,
                      color: "var(--linen)",
                      marginBottom: "0.8rem",
                      lineHeight: 1.2,
                    }}
                  >
                    Upgrade to{" "}
                    <em style={{ fontStyle: "italic" }}>
                      {upgradeService.name}
                    </em>
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      lineHeight: 1.72,
                      color: "rgba(237,230,219,0.68)",
                      fontWeight: 300,
                      marginBottom: "1.5rem",
                      maxWidth: "600px",
                    }}
                  >
                    {service.suggestedUpgradeReason}
                  </p>
                  <Link
                    href={`/treatments/${upgradeService.id}`}
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--linen)",
                      border: "1px solid rgba(237,230,219,0.25)",
                      padding: "12px 28px",
                      textDecoration: "none",
                      transition: "border-color 0.25s ease",
                    }}
                  >
                    Explore {upgradeService.name}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          8. TREATMENT FAQ
      ═══════════════════════════════════════════════════ */}
      {faqs && faqs.length > 0 && (
        <section
          className="reveal-section reveal-lift"
          style={{
            background: "var(--linen)",
            padding: "clamp(56px, 8.5vw, 100px) clamp(20px, 4vw, 48px)",
          }}
        >
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
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
              Frequently Asked Questions
            </p>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                fontWeight: 300,
                color: "var(--bark)",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                marginBottom: "clamp(36px, 5vw, 56px)",
              }}
            >
              Common <em style={{ fontStyle: "italic" }}>questions</em>
            </h2>

            <div>
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  style={{
                    borderTop:
                      i === 0
                        ? "1px solid rgba(140,123,107,0.15)"
                        : "none",
                    borderBottom: "1px solid rgba(140,123,107,0.15)",
                  }}
                >
                  <summary
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      fontWeight: 400,
                      color: "var(--bark)",
                      padding: "clamp(16px, 2.5vw, 24px) 0",
                      cursor: "pointer",
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {faq.question}
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-display)",
                        fontSize: "1.2rem",
                        fontWeight: 200,
                        color: "var(--stone)",
                        transition: "transform 0.25s ease",
                      }}
                    >
                      +
                    </span>
                  </summary>
                  <div
                    style={{
                      paddingBottom: "clamp(16px, 2.5vw, 24px)",
                      paddingRight: "2rem",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.88rem",
                        lineHeight: 1.82,
                        color: "var(--mink)",
                        fontWeight: 300,
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          9. OTHER TREATMENTS
      ═══════════════════════════════════════════════════ */}
      <section
        className="reveal-section reveal-lift"
        style={{
          background: "var(--cream)",
          padding: "clamp(56px, 8.5vw, 100px) clamp(20px, 4vw, 48px)",
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
            <span
              style={{
                display: "inline-block",
                width: "28px",
                height: "1px",
                background: "var(--blush)",
              }}
            />
            Explore Other Rituals
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
              fontWeight: 300,
              color: "var(--bark)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              marginBottom: "clamp(36px, 5vw, 56px)",
            }}
          >
            Find your <em style={{ fontStyle: "italic" }}>ritual</em>
          </h2>

          <div
            className="values-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
            {otherServices.map((s) => (
              <Link
                key={s.id}
                href={`/treatments/${s.id}`}
                style={{
                  textDecoration: "none",
                  padding: "2.2rem",
                  border: "1px solid rgba(140,123,107,0.12)",
                  background: "var(--linen)",
                  transition:
                    "border-color 0.3s ease, transform 0.3s var(--ease-luxury)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.5rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--blush)",
                    marginBottom: "0.6rem",
                    opacity: 0.8,
                  }}
                >
                  {tierLabels[s.tier] || s.tier}
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    fontWeight: 300,
                    color: "var(--bark)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {s.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.12em",
                    color: "var(--stone)",
                    marginBottom: "1rem",
                  }}
                >
                  {s.duration} · ${s.price}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.82rem",
                    lineHeight: 1.7,
                    color: "var(--mink)",
                    fontWeight: 300,
                  }}
                >
                  {s.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          10. CTA BANNER
      ═══════════════════════════════════════════════════ */}
      <CTABanner
        eyebrow="Reserve Your Ritual"
        headline="Ready to"
        headlineItalic="begin?"
        description="Book your appointment online. Each session is by appointment only — your time slot is reserved exclusively for you."
        secondaryCTA={{ label: "Call to Book", href: "tel:+12525584344" }}
      />

      <Footer />
    </main>
  );
}
