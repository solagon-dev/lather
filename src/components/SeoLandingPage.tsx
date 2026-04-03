import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { services } from "@/lib/data";
import {
  seoCities,
  getSeoCity,
  getSeoService,
  getRelatedCities,
} from "@/lib/seo-pages";

interface SeoLandingPageProps {
  serviceKey: string;
  citySlug: string;
}

const eyebrowStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.62rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "1rem",
  lineHeight: 1.9,
  fontWeight: 300,
};

export default function SeoLandingPage({ serviceKey, citySlug }: SeoLandingPageProps) {
  const city = getSeoCity(citySlug);
  const service = getSeoService(serviceKey);

  if (!city || !service) return null;

  const relatedCities = getRelatedCities(citySlug, 4);
  const otherServices = seoCities
    .find((c) => c.slug === citySlug)
    ? ["head-spa", "scalp-treatment", "japanese-head-spa", "scalp-massage"].filter(
        (k) => k !== serviceKey
      )
    : [];

  const serviceUrlPrefixMap: Record<string, string> = {
    "head-spa": "head-spa-near",
    "scalp-treatment": "scalp-treatment",
    "japanese-head-spa": "japanese-head-spa",
    "scalp-massage": "scalp-massage",
  };

  const serviceLabelMap: Record<string, string> = {
    "head-spa": "Head Spa",
    "scalp-treatment": "Scalp Treatment",
    "japanese-head-spa": "Japanese Head Spa",
    "scalp-massage": "Scalp Massage",
  };

  // JSON-LD schema
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "BeautySalon", "DaySpa"],
    name: "Lather Head Spa",
    description: service.metaDesc(city.name, city.state, city.driveTime),
    url: `https://www.latherheadspa.com/${service.urlPrefix}/${city.slug}`,
    telephone: "(252) 558-4344",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "",
      addressLocality: "Greenville",
      addressRegion: "NC",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "35.6127",
      longitude: "-77.3664",
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "State",
        name: "North Carolina",
      },
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    hasMap: "https://www.google.com/maps/search/Lather+Head+Spa+Greenville+NC",
    sameAs: [
      "https://www.instagram.com/latherheadspa",
      "https://www.facebook.com/latherheadspa",
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ScrollReveal />
      <Navbar />

      {/* ── SECTION 1: HERO ──────────────────────────────── */}
      <section
        style={{
          minHeight: "56vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(100px, 14vw, 140px) clamp(20px, 4vw, 48px) clamp(56px, 8vw, 88px)",
          background: "var(--bark)",
          position: "relative",
          overflow: "hidden",
        }}
        className="grain-overlay section-pad"
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 75% 20%, rgba(212,184,168,0.16), transparent 55%), radial-gradient(ellipse at 10% 85%, rgba(163,172,148,0.1), transparent 55%)",
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
          {/* Breadcrumb */}
          <nav
            aria-label="breadcrumb"
            style={{ marginBottom: "2.5rem" }}
          >
            <p
              style={{
                ...eyebrowStyle,
                color: "rgba(212,184,168,0.5)",
                fontSize: "0.52rem",
              }}
            >
              <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
                Home
              </Link>
              <span>·</span>
              <Link href="/treatments" style={{ color: "inherit", textDecoration: "none" }}>
                Services
              </Link>
              <span>·</span>
              <span style={{ color: "var(--blush)", opacity: 0.85 }}>
                {service.label} near {city.name}
              </span>
            </p>
          </nav>

          <p
            style={{
              ...eyebrowStyle,
              color: "var(--blush)",
              opacity: 0.8,
              marginBottom: "1.2rem",
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
            {service.heroTagline}
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
              fontWeight: 300,
              color: "var(--linen)",
              lineHeight: 1.04,
              letterSpacing: "-0.015em",
              marginBottom: "1.75rem",
              maxWidth: "880px",
            }}
          >
            {service.h1(city.name, city.state)}
          </h1>

          <p
            style={{
              ...bodyStyle,
              color: "rgba(237,230,219,0.65)",
              maxWidth: "580px",
              marginBottom: "2.5rem",
              fontSize: "0.96rem",
            }}
          >
            {service.heroSub(city.name, city.driveTime)}
          </p>

          <a
            href="/book"
            className="btn-light"
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
            }}
          >
            Book Your Appointment
          </a>
        </div>
      </section>

      {/* ── SECTION 2: INTRO ─────────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{ background: "var(--cream)", padding: "100px 48px" }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "6rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          <div>
            <p
              style={{
                ...eyebrowStyle,
                color: "var(--stone)",
                marginBottom: "1.2rem",
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
              {service.label} in Eastern NC
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.2vw, 3.2rem)",
                fontWeight: 300,
                color: "var(--bark)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              {service.introH2}
            </h2>
          </div>

          <div style={{ paddingTop: "0.5rem" }}>
            <p style={{ ...bodyStyle, color: "var(--mink)", marginBottom: "1.5rem" }}>
              {service.introP1(city.name)}
            </p>
            <p style={{ ...bodyStyle, color: "var(--mink)", marginBottom: "1.5rem" }}>
              {service.introP2}
            </p>
            <p style={{ ...bodyStyle, color: "var(--mink)" }}>
              {service.introP3(city.name)}
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: BENEFITS ──────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{ background: "var(--linen)", padding: "100px 48px" }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "56px",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div>
              <p
                style={{
                  ...eyebrowStyle,
                  color: "var(--stone)",
                  marginBottom: "1.2rem",
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
                What You Gain
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 300,
                  color: "var(--bark)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                The benefits of{" "}
                <em style={{ fontStyle: "italic" }}>every session.</em>
              </h2>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "2px",
              background: "rgba(140,123,107,0.12)",
            }}
            className="values-grid stagger-children"
          >
            {service.benefits.map((benefit, i) => (
              <div
                key={i}
                style={{
                  background: "var(--linen)",
                  padding: "2.5rem 2rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.52rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--blush)",
                    marginBottom: "1rem",
                  }}
                >
                  0{i + 1}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem",
                    fontWeight: 300,
                    color: "var(--bark)",
                    lineHeight: 1.2,
                    marginBottom: "0.875rem",
                  }}
                >
                  {benefit.title}
                </h3>
                <p
                  style={{
                    ...bodyStyle,
                    fontSize: "0.85rem",
                    color: "var(--mink)",
                    lineHeight: 1.75,
                  }}
                >
                  {benefit.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: SERVICES ──────────────────────────── */}
      <section
        className="reveal-section reveal-fade section-pad"
        style={{ background: "var(--cream)", padding: "100px 48px" }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ marginBottom: "56px" }}>
            <p
              style={{
                ...eyebrowStyle,
                color: "var(--stone)",
                marginBottom: "1.2rem",
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
              Our Rituals
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 300,
                  color: "var(--bark)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Services available{" "}
                <em style={{ fontStyle: "italic" }}>at Lather.</em>
              </h2>
              <Link
                href="/treatments"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--bark)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(61,46,34,0.35)",
                  paddingBottom: "3px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  flexShrink: 0,
                }}
              >
                View All Services →
              </Link>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1px",
              background: "rgba(140,123,107,0.12)",
            }}
            className="values-grid stagger-children"
          >
            {services.map((svc) => (
              <div
                key={svc.id}
                style={{
                  background: "var(--cream)",
                  padding: "3rem",
                  borderBottom: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1rem",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.3rem, 2.2vw, 1.65rem)",
                      fontWeight: 300,
                      color: "var(--bark)",
                      lineHeight: 1.2,
                    }}
                  >
                    {svc.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--stone)",
                      background: "var(--linen)",
                      padding: "4px 10px",
                    }}
                  >
                    {svc.duration}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--blush)",
                    marginBottom: "1rem",
                  }}
                >
                  {svc.tagline}
                </p>
                <p
                  style={{
                    ...bodyStyle,
                    fontSize: "0.88rem",
                    color: "var(--mink)",
                    lineHeight: 1.78,
                    maxHeight: "4.5em",
                    overflow: "hidden",
                  }}
                >
                  {svc.description}
                </p>
                {svc.price && (
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.88rem",
                      color: "var(--bark)",
                      marginTop: "1.25rem",
                      fontWeight: 400,
                    }}
                  >
                    From ${svc.price}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
            <a
              href="/book"
              className="btn-dark"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--cream)",
                background: "var(--bark)",
                padding: "18px 48px",
                textDecoration: "none",
              }}
            >
              Book Your Ritual
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: WHY LATHER ────────────────────────── */}
      <section
        className="reveal-section reveal-lift grain-overlay section-pad"
        style={{ background: "var(--charcoal)", padding: "100px 48px" }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ marginBottom: "56px" }}>
            <p
              style={{
                ...eyebrowStyle,
                color: "var(--blush)",
                opacity: 0.85,
                marginBottom: "1.2rem",
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
              Why Guests Choose Lather
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 300,
                color: "var(--linen)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                maxWidth: "600px",
              }}
            >
              Why {city.name} residents{" "}
              <em style={{ fontStyle: "italic" }}>make the drive.</em>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
              background: "rgba(237,230,219,0.07)",
            }}
            className="values-grid stagger-children"
          >
            {service.whyLather.map((item, i) => (
              <div
                key={i}
                style={{
                  background: "var(--charcoal)",
                  padding: "3rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.52rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(212,184,168,0.45)",
                    marginBottom: "1rem",
                  }}
                >
                  0{i + 1}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.45rem",
                    fontWeight: 300,
                    color: "var(--linen)",
                    lineHeight: 1.2,
                    marginBottom: "1rem",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    ...bodyStyle,
                    fontSize: "0.88rem",
                    color: "rgba(237,230,219,0.55)",
                    lineHeight: 1.8,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: LOCATION CONVENIENCE ─────────────── */}
      <section
        className="reveal-section reveal-fade section-pad"
        style={{ background: "var(--bark)", padding: "100px 48px", position: "relative", overflow: "hidden" }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 85% 50%, rgba(212,184,168,0.1), transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "6rem",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
          className="about-grid"
        >
          <div>
            <p
              style={{
                ...eyebrowStyle,
                color: "var(--blush)",
                opacity: 0.8,
                marginBottom: "1.2rem",
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
              Getting Here
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 300,
                color: "var(--linen)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              {city.distanceMiles > 0 ? (
                <>
                  {city.distanceMiles} miles from {city.name}.{" "}
                  <em style={{ fontStyle: "italic" }}>Worth every one.</em>
                </>
              ) : (
                <>
                  Right here in{" "}
                  <em style={{ fontStyle: "italic" }}>Greenville.</em>
                </>
              )}
            </h2>

            {city.distanceMiles > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "2.5rem",
                  marginTop: "2.5rem",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2.8rem",
                      fontWeight: 300,
                      color: "var(--blush)",
                      lineHeight: 1,
                      marginBottom: "0.4rem",
                    }}
                  >
                    {city.distanceMiles}
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.72rem",
                        letterSpacing: "0.15em",
                        color: "rgba(212,184,168,0.55)",
                        marginLeft: "6px",
                      }}
                    >
                      miles
                    </span>
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(237,230,219,0.4)",
                    }}
                  >
                    from {city.name}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2.8rem",
                      fontWeight: 300,
                      color: "var(--blush)",
                      lineHeight: 1,
                      marginBottom: "0.4rem",
                    }}
                  >
                    {city.driveTime.replace("about ", "").split(" ")[0]}
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.72rem",
                        letterSpacing: "0.15em",
                        color: "rgba(212,184,168,0.55)",
                        marginLeft: "6px",
                      }}
                    >
                      min
                    </span>
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(237,230,219,0.4)",
                    }}
                  >
                    by car
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <p
              style={{
                ...bodyStyle,
                color: "rgba(237,230,219,0.6)",
                lineHeight: 1.9,
                marginBottom: "2rem",
                fontSize: "0.96rem",
              }}
            >
              {city.distanceMiles > 0
                ? `From ${city.name}, Lather Head Spa in Greenville is a straightforward drive via ${city.highway}. No complicated navigation, no tolls. The route is easy, and the experience waiting at the other end makes the journey feel shorter on the way back. Many of our ${city.name} guests describe the drive as part of the ritual — a chance to decompress before they even arrive.`
                : `Lather Head Spa is right here in Greenville — no drive required. We're easily accessible from all parts of the city, whether you're near the university, the medical corridor, or Greenville's surrounding neighborhoods. Convenient, close, and genuinely worth the visit.`}
            </p>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              <a
                href="/book"
                className="btn-light"
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--bark)",
                  background: "var(--linen)",
                  padding: "16px 40px",
                  textDecoration: "none",
                }}
              >
                Book Online
              </a>
              <a
                href="https://www.google.com/maps/search/Lather+Head+Spa+Greenville+NC"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(237,230,219,0.7)",
                  border: "1px solid rgba(237,230,219,0.25)",
                  padding: "16px 36px",
                  textDecoration: "none",
                  transition: "border-color 0.3s ease, color 0.3s ease",
                }}
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FAQ ───────────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{ background: "var(--cream)", padding: "100px 48px" }}
      >
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <p
            style={{
              ...eyebrowStyle,
              color: "var(--stone)",
              marginBottom: "1.2rem",
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
            Common Questions
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "var(--bark)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              marginBottom: "3.5rem",
            }}
          >
            Everything you want to{" "}
            <em style={{ fontStyle: "italic" }}>know.</em>
          </h2>

          <div
            style={{
              borderTop: "1px solid rgba(140,123,107,0.15)",
            }}
          >
            {service.faqs.map((faq, i) => (
              <details
                key={i}
                style={{
                  borderBottom: "1px solid rgba(140,123,107,0.15)",
                  padding: "0",
                }}
              >
                <summary
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                    fontWeight: 300,
                    color: "var(--bark)",
                    lineHeight: 1.3,
                    padding: "1.75rem 0",
                    cursor: "pointer",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  {faq.question}
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "1.2rem",
                      color: "var(--blush)",
                      flexShrink: 0,
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </summary>
                <p
                  style={{
                    ...bodyStyle,
                    fontSize: "0.92rem",
                    color: "var(--mink)",
                    lineHeight: 1.85,
                    padding: "0 0 1.75rem",
                    maxWidth: "680px",
                  }}
                >
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: INTERNAL LINKS ────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{ background: "var(--linen)", padding: "80px 48px" }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5rem",
            }}
            className="about-grid"
          >
            {/* Related cities for same service */}
            <div>
              <p
                style={{
                  ...eyebrowStyle,
                  color: "var(--stone)",
                  marginBottom: "1.5rem",
                  fontSize: "0.58rem",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "1px",
                    background: "var(--blush)",
                  }}
                />
                {service.label} Near Other Cities
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {relatedCities.map((rc) => (
                  <Link
                    key={rc.slug}
                    href={`/${service.urlPrefix}/${rc.slug}`}
                    className="hover-fade"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1rem 0",
                      borderBottom: "1px solid rgba(140,123,107,0.12)",
                      textDecoration: "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.15rem",
                        fontWeight: 300,
                        color: "var(--bark)",
                      }}
                    >
                      {service.label} near {rc.name}, {rc.state}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.7rem",
                        color: "var(--blush)",
                      }}
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Other services for same city */}
            <div>
              <p
                style={{
                  ...eyebrowStyle,
                  color: "var(--stone)",
                  marginBottom: "1.5rem",
                  fontSize: "0.58rem",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "1px",
                    background: "var(--blush)",
                  }}
                />
                More Services Near {city.name}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {otherServices.map((sk) => (
                  <Link
                    key={sk}
                    href={`/${serviceUrlPrefixMap[sk]}/${city.slug}`}
                    className="hover-fade"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1rem 0",
                      borderBottom: "1px solid rgba(140,123,107,0.12)",
                      textDecoration: "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.15rem",
                        fontWeight: 300,
                        color: "var(--bark)",
                      }}
                    >
                      {serviceLabelMap[sk]} near {city.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.7rem",
                        color: "var(--blush)",
                      }}
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Related blog posts */}
          <div style={{ marginTop: "4rem", paddingTop: "3.5rem", borderTop: "1px solid rgba(140,123,107,0.15)" }}>
            <p
              style={{
                ...eyebrowStyle,
                color: "var(--stone)",
                marginBottom: "2rem",
                fontSize: "0.58rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "1px",
                  background: "var(--blush)",
                }}
              />
              From the Journal
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2.5rem",
              }}
              className="values-grid"
            >
              {service.relatedBlogs.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blog/${blog.slug}`}
                  className="hover-fade"
                  style={{
                    display: "block",
                    textDecoration: "none",
                    borderTop: "1px solid rgba(140,123,107,0.15)",
                    paddingTop: "1.5rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.52rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--stone)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {blog.category}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.2rem",
                      fontWeight: 300,
                      color: "var(--bark)",
                      lineHeight: 1.25,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {blog.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.58rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--mink)",
                    }}
                  >
                    Read →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: FINAL CTA ─────────────────────────── */}
      <section
        className="reveal-section reveal-lift grain-overlay section-pad"
        style={{
          background: "var(--bark)",
          padding: "100px 48px",
          textAlign: "center",
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
              "radial-gradient(ellipse at 50% 0%, rgba(212,184,168,0.1), transparent 55%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "580px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <p
            style={{
              ...eyebrowStyle,
              color: "var(--blush)",
              justifyContent: "center",
              marginBottom: "1.5rem",
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
            Reserve Your Ritual
            <span
              style={{
                display: "inline-block",
                width: "28px",
                height: "1px",
                background: "var(--blush)",
              }}
            />
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 300,
              color: "var(--linen)",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
              letterSpacing: "-0.01em",
            }}
          >
            Ready to experience it{" "}
            <em style={{ fontStyle: "italic" }}>yourself?</em>
          </h2>
          <p
            style={{
              ...bodyStyle,
              fontSize: "0.92rem",
              color: "rgba(237,230,219,0.55)",
              marginBottom: "2.5rem",
            }}
          >
            {city.distanceMiles > 0
              ? `${city.name} guests — Lather Head Spa is ${city.driveTime} away. Book online and your appointment is confirmed instantly.`
              : `Book online and your appointment at Lather Head Spa is confirmed instantly. We look forward to welcoming you.`}
          </p>
          <a
            href="/book"
            className="btn-light"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--bark)",
              background: "var(--linen)",
              padding: "18px 56px",
              textDecoration: "none",
            }}
          >
            Book Your {service.shortLabel} Appointment
          </a>

          <div
            style={{
              marginTop: "3rem",
              display: "flex",
              gap: "2.5rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(212,184,168,0.55)",
                textDecoration: "none",
              }}
            >
              Homepage
            </Link>
            <Link
              href="/treatments"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(212,184,168,0.55)",
                textDecoration: "none",
              }}
            >
              All Services
            </Link>
            <Link
              href="/blog"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(212,184,168,0.55)",
                textDecoration: "none",
              }}
            >
              The Journal
            </Link>
            <Link
              href="/contact"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(212,184,168,0.55)",
                textDecoration: "none",
              }}
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
