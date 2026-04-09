import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { locations } from "@/lib/locations";
import { testimonials, services } from "@/lib/data";

type Props = { params: Promise<{ city: string }> };

export async function generateStaticParams() {
  return locations.map((l) => ({ city: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const loc = locations.find((l) => l.slug === city);
  if (!loc) return {};
  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
  };
}

const linkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  fontFamily: "var(--font-body)",
  fontSize: "0.62rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--bark)",
  textDecoration: "none",
  borderBottom: "1px solid rgba(61,46,34,0.35)",
  paddingBottom: "3px",
};

export default async function LocationPage({ params }: Props) {
  const { city } = await params;
  const loc = locations.find((l) => l.slug === city);
  if (!loc) notFound();

  const testimonial = testimonials[loc.testimonialIndex ?? 0];

  // JSON-LD for this location page
  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "DaySpa",
    name: "Lather Head Spa",
    description: loc.metaDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: "620 Lynndale Court",
      addressLocality: "Greenville",
      addressRegion: "NC",
      postalCode: "27858",
      addressCountry: "US",
    },
    url: `https://www.latherspas.com/locations/${loc.slug}`,
    areaServed: {
      "@type": "City",
      name: loc.city,
      containedInPlace: { "@type": "State", name: "North Carolina" },
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />
      <ScrollReveal />
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "52vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingTop: "clamp(100px, 14vw, 140px)",
          paddingBottom: "clamp(56px, 8vw, 80px)",
          paddingLeft: "clamp(20px, 4vw, 48px)",
          paddingRight: "clamp(20px, 4vw, 48px)",
          background: "var(--bark)",
          position: "relative",
          overflow: "hidden",
        }}
        className="grain-overlay section-pad"
      >
        <img
          src="/media/pages/locations-hero.jpg"
          alt="Lather Head Spa interior — luxury waiting area in Greenville, NC"
          loading="eager"
          aria-hidden="true"
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

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
          {/* Breadcrumb */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.55rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(212,184,168,0.5)",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
            <span>·</span>
            <Link href="/locations" style={{ color: "inherit", textDecoration: "none" }}>Locations</Link>
            <span>·</span>
            <span>{loc.city}</span>
          </p>

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
            {loc.city}, {loc.state}
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 6.5vw, 5.6rem)",
              fontWeight: 300,
              color: "var(--linen)",
              lineHeight: 1.04,
              letterSpacing: "-0.015em",
              maxWidth: "900px",
            }}
          >
            {loc.heroHeadline}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.85rem, 1.6vw, 0.98rem)",
              lineHeight: 1.85,
              color: "rgba(237,230,219,0.65)",
              maxWidth: "520px",
              marginTop: "1.5rem",
              fontWeight: 300,
            }}
          >
            {loc.heroSub}
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2.5rem" }}>
            <a
              href="/book"
              className="btn-light"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--bark)",
                background: "var(--linen)",
                padding: "16px 40px",
                textDecoration: "none",
              }}
            >
              Book Your Appointment
            </a>
            <Link
              href="/treatments"
              className="btn-outline-light"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(237,230,219,0.75)",
                border: "1px solid rgba(237,230,219,0.28)",
                padding: "16px 40px",
                textDecoration: "none",
              }}
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── DISTANCE / INTRO BAR ─────────────────────────── */}
      {loc.driveTime && (
        <div
          style={{
            background: "var(--charcoal)",
            padding: "20px 48px",
            borderBottom: "1px solid rgba(237,230,219,0.06)",
          }}
          className="section-pad"
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              gap: "3rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Drive Time", value: loc.driveTime ?? "" },
              { label: "Distance", value: `${loc.distanceMiles} miles` },
              { label: "Location", value: "Greenville, NC" },
            ].map((item) => (
              <div key={item.label}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.5rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(237,230,219,0.3)", marginBottom: "4px" }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--linen)", fontWeight: 300 }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── INTRO SECTION ─────────────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{ background: "var(--cream)", padding: "100px 48px", position: "relative" }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "6rem",
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
              <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
              Serving {loc.city}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
                fontWeight: 300,
                color: "var(--bark)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              {loc.introTitle}
            </h2>
          </div>

          <div style={{ paddingTop: "0.25rem" }}>
            {loc.introBody.map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: 1.92,
                  color: "var(--mink)",
                  fontWeight: 300,
                  marginBottom: i < loc.introBody.length - 1 ? "1.5rem" : 0,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ─────────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--linen)",
          padding: "100px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0, left: 0,
            width: "50%", height: "60%",
            background: "radial-gradient(ellipse at 10% 100%, rgba(212,184,168,0.18), transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}>
          <div style={{ marginBottom: "60px" }}>
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
              Our Rituals
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
                fontWeight: 300,
                color: "var(--bark)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Treatments available at{" "}
              <em style={{ fontStyle: "italic" }}>Lather.</em>
            </h2>
          </div>

          <div
            className="benefits-grid stagger-children"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}
          >
            {services.map((service) => (
              <div
                key={service.id}
                style={{
                  padding: "2.5rem",
                  background: "rgba(247,243,238,0.75)",
                  border: "1px solid rgba(140,123,107,0.1)",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 300,
                      color: "var(--bark)",
                      lineHeight: 1.15,
                    }}
                  >
                    {service.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.58rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--stone)",
                    }}
                  >
                    {service.duration}{service.price ? ` · $${service.price}` : ""}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--sage)",
                    marginBottom: "1rem",
                  }}
                >
                  {service.tagline}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    lineHeight: 1.82,
                    color: "var(--stone)",
                    fontWeight: 300,
                  }}
                >
                  {service.description.substring(0, 160)}…
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2.5rem" }}>
            <Link href="/treatments" style={linkStyle}>
              View all services &amp; pricing <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY VISIT ─────────────────────────────────────── */}
      <section
        className="reveal-section reveal-lift grain-overlay section-pad"
        style={{
          background: "var(--bark)",
          padding: "100px 48px",
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
              "radial-gradient(circle at 10% 50%, rgba(212,184,168,0.1), transparent 50%), radial-gradient(circle at 90% 20%, rgba(163,172,148,0.08), transparent 50%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: "64px" }}>
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
              Why Guests from {loc.city} Choose Lather
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
                fontWeight: 300,
                color: "var(--linen)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              The experience is{" "}
              <em style={{ fontStyle: "italic" }}>worth the drive.</em>
            </h2>
          </div>

          <div
            className="values-grid stagger-children"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "3rem",
              borderTop: "1px solid rgba(237,230,219,0.1)",
              paddingTop: "56px",
            }}
          >
            {loc.whyVisit.map((item, i) => (
              <div key={i}>
                <div style={{ width: "28px", height: "1px", background: "var(--blush)", marginBottom: "1.5rem", opacity: 0.7 }} />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.4rem",
                    fontWeight: 300,
                    color: "var(--linen)",
                    marginBottom: "0.875rem",
                    fontStyle: "italic",
                    lineHeight: 1.2,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    lineHeight: 1.85,
                    color: "rgba(237,230,219,0.6)",
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

      {/* ── DIRECTIONS ────────────────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{ background: "var(--cream)", padding: "80px 48px" }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.8fr",
            gap: "5rem",
            alignItems: "center",
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
              <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
              Getting Here
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 300,
                color: "var(--bark)",
                lineHeight: 1.12,
                letterSpacing: "-0.01em",
              }}
            >
              {loc.driveTime
                ? `${loc.driveTime.charAt(0).toUpperCase() + loc.driveTime.slice(1)} from ${loc.city}`
                : `Located in Greenville, NC`}
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
                marginBottom: "2rem",
              }}
            >
              {loc.directionsText}
            </p>
            <a
              href="/book"
              className="btn-dark"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--cream)",
                background: "var(--bark)",
                padding: "16px 36px",
                textDecoration: "none",
              }}
            >
              Book Before You Drive
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ───────────────────────────────────── */}
      <section
        className="reveal-section reveal-lift grain-overlay section-pad"
        style={{
          background: "var(--charcoal)",
          padding: "100px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 110%, rgba(212,184,168,0.1), transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
          <p
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(5rem, 10vw, 8rem)",
              color: "var(--blush)",
              opacity: 0.1,
              lineHeight: 0.7,
              marginBottom: "1.5rem",
              fontStyle: "italic",
            }}
          >
            &ldquo;
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.3rem, 3vw, 2rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--linen)",
              lineHeight: 1.55,
              marginBottom: "2.5rem",
              letterSpacing: "-0.005em",
            }}
          >
            {testimonial.quote}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--blush)", opacity: 0.6 }} />
            <div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--linen)", letterSpacing: "0.08em" }}>
                {testimonial.name}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", color: "rgba(237,230,219,0.4)", letterSpacing: "0.1em", marginTop: "3px" }}>
                {testimonial.service}
              </p>
            </div>
            <div style={{ width: "24px", height: "1px", background: "var(--blush)", opacity: 0.6 }} />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{ background: "var(--linen)", padding: "100px 48px", textAlign: "center" }}
      >
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
          {loc.driveTime ? `Guests from ${loc.city} Welcome` : "Book Your Ritual"}
          <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            fontWeight: 300,
            color: "var(--bark)",
            lineHeight: 1.06,
            marginBottom: "1.5rem",
            letterSpacing: "-0.01em",
          }}
        >
          Your ritual{" "}
          <em style={{ fontStyle: "italic" }}>awaits.</em>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.92rem",
            color: "var(--mink)",
            lineHeight: 1.85,
            maxWidth: "440px",
            margin: "0 auto 2.5rem",
            fontWeight: 300,
          }}
        >
          {loc.driveTime
            ? `Guests regularly make the trip from ${loc.city} to experience Lather. Book online and we\u2019ll be ready for you.`
            : "Lather is Greenville\u2019s premier head spa. Book your appointment and experience the difference."}
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
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
            Book Online
          </a>
          <Link
            href="/treatments"
            className="btn-outline-light"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--mink)",
              border: "1px solid rgba(61,46,34,0.3)",
              padding: "18px 48px",
              textDecoration: "none",
            }}
          >
            Our Services
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
