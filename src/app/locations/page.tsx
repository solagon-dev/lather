import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Head Spa Near You",
  description:
    "Lather Head Spa in Greenville, NC serves guests from across Eastern North Carolina. Find your closest location and book a luxury scalp ritual today.",
};

const nearbyLocations = [
  { city: "Greenville", label: "Greenville, NC", slug: "greenville-head-spa", note: "Home location" },
  { city: "Winterville", label: "Winterville, NC", slug: "winterville-head-spa", note: "~10 min · 5 miles" },
  { city: "Ayden", label: "Ayden, NC", slug: "ayden-head-spa", note: "~18 min · 13 miles" },
  { city: "Farmville", label: "Farmville, NC", slug: "farmville-head-spa", note: "~22 min · 18 miles" },
  { city: "Kinston", label: "Kinston, NC", slug: "kinston-head-spa", note: "~38 min · 33 miles" },
  { city: "Washington", label: "Washington, NC", slug: "washington-nc-head-spa", note: "~40 min · 35 miles" },
  { city: "Wilson", label: "Wilson, NC", slug: "wilson-head-spa", note: "~55 min · 47 miles" },
  { city: "New Bern", label: "New Bern, NC", slug: "new-bern-head-spa", note: "~55 min · 47 miles" },
  { city: "Rocky Mount", label: "Rocky Mount, NC", slug: "rocky-mount-head-spa", note: "~60 min · 56 miles" },
];

export default function LocationsPage() {
  return (
    <main>
      <ScrollReveal />
      <Navbar />

      {/* Hero */}
      <section
        style={{
          minHeight: "52vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(100px, 14vw, 140px) clamp(20px, 4vw, 48px) clamp(56px, 8vw, 80px)",
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
              "radial-gradient(ellipse at 15% 30%, rgba(212,184,168,0.14), transparent 55%), radial-gradient(ellipse at 85% 80%, rgba(163,172,148,0.1), transparent 55%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
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
            Eastern North Carolina
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 300,
              color: "var(--linen)",
              lineHeight: 1.04,
              letterSpacing: "-0.015em",
              maxWidth: "800px",
            }}
          >
            Serving guests across{" "}
            <em style={{ fontStyle: "italic" }}>Eastern NC.</em>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{ background: "var(--cream)", padding: "100px 48px" }}
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
              Our Reach
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                fontWeight: 300,
                color: "var(--bark)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              One location.{" "}
              <em style={{ fontStyle: "italic" }}>A region's destination.</em>
            </h2>
          </div>
          <div style={{ paddingTop: "0.5rem" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.92,
                color: "var(--mink)",
                fontWeight: 300,
                marginBottom: "1.5rem",
              }}
            >
              Lather Head Spa is located in Greenville, NC — the heart of Eastern North Carolina. Guests travel from across the region for our scalp rituals because they simply cannot find this level of care closer to home.
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
              Whether you&apos;re in Winterville, New Bern, Wilson, or Rocky Mount — we welcome you. The drive is easy. The experience is worth every minute.
            </p>
          </div>
        </div>
      </section>

      {/* Location grid */}
      <section
        className="reveal-section reveal-lift grain-overlay section-pad"
        style={{ background: "var(--charcoal)", padding: "100px 48px" }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ marginBottom: "56px" }}>
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
              Nearby Cities
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                fontWeight: 300,
                color: "var(--linen)",
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
              }}
            >
              Find your nearest{" "}
              <em style={{ fontStyle: "italic" }}>guide.</em>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
              background: "rgba(237,230,219,0.07)",
            }}
            className="values-grid"
          >
            {nearbyLocations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="location-card"
                style={{
                  display: "block",
                  background: "var(--charcoal)",
                  padding: "2.75rem",
                  textDecoration: "none",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(212,184,168,0.45)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {loc.note}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
                    fontWeight: 300,
                    color: "var(--linen)",
                    marginBottom: "1rem",
                    lineHeight: 1.15,
                  }}
                >
                  {loc.label}
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(212,184,168,0.6)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  View guide <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
          Ready to Visit
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
          Reserve your{" "}
          <em style={{ fontStyle: "italic" }}>ritual.</em>
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
          Wherever you&apos;re coming from, your appointment at Lather begins the moment you book.
        </p>
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
      </section>

      <Footer />
    </main>
  );
}
