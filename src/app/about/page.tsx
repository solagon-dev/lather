import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import { brandValues } from "@/lib/data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Lather's philosophy, our Japanese head spa roots, and why we believe slow care delivers the deepest results.",
};

export default function AboutPage() {
  return (
    <main>
      <ScrollReveal />
      <Navbar />

      {/* ── PAGE HERO ──────────────────────────────────────── */}
      <section
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 48px 80px",
          background: "var(--bark)",
          position: "relative",
          overflow: "hidden",
        }}
        className="grain-overlay section-pad"
      >
        <img
          src="/Photos/Finalized/2.10.26_LHS-4.jpg"
          alt="Elegant gold mirror reflecting the Lather Head Spa interior"
          loading="eager"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
            opacity: 0.22,
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
            About Lather
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
            Slow care.
            <br />
            <em style={{ fontStyle: "italic" }}>Deep results.</em>
          </h1>
        </div>
      </section>

      {/* ── BRAND STORY ────────────────────────────────────── */}
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--cream)",
          padding: "120px 48px",
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
              <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
              Our Story
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
              Born from a belief in{" "}
              <em style={{ fontStyle: "italic" }}>unhurried beauty.</em>
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
              At Lather, we believe that the most transformative beauty experiences are also the most unhurried ones. Rooted in the Japanese head spa tradition and elevated with modern therapeutic technique, each ritual is a deliberate sequence of touch, warmth, and intention.
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
              We are located in Greenville, NC—serving guests who understand that caring for the scalp is an act of self-preservation, not indulgence.
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
              Every product we choose, every technique we practice, every detail of the environment is calibrated to support one thing: your complete restoration.
            </p>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY IMAGE BREAK ─────────────────────────── */}
      {/* TEMP MEDIA: Replace with editorial Lather studio / product photography */}
      <section
        className="reveal-section reveal-fade"
        style={{
          height: "clamp(320px, 50vw, 580px)",
          position: "relative",
          overflow: "hidden",
          background: "var(--linen)",
        }}
      >
        <img
          src="/Photos/RAW/02.10.2026_LHS_RAWS/IMG_4137.jpg"
          alt="Lather stylist holding a treatment brush — warm studio lighting"
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 50%",
            display: "block",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(61,46,34,0.5) 0%, rgba(61,46,34,0.1) 50%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "clamp(32px, 5vw, 60px)",
            left: "clamp(20px, 4vw, 60px)",
            maxWidth: "480px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 3.5vw, 2.5rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--linen)",
              lineHeight: 1.25,
            }}
          >
            "The scalp is the foundation of everything. We start there."
          </p>
        </div>
      </section>

      {/* ── VALUES ─────────────────────────────────────────── */}
      <section
        className="reveal-section reveal-lift grain-overlay section-pad"
        style={{
          background: "var(--bark)",
          padding: "120px 48px",
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
              <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
              What We Believe
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
            {brandValues.map((v, i) => (
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

      {/* ── MEET THE TEAM ─────────────────────────────────── */}
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
          <div style={{ overflow: "hidden", height: "340px" }}>
            <img
              src="/Photos/RAW/02.10.2026_LHS_RAWS/IMG_4116.jpg"
              alt="The Lather team in the treatment space"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }}
            />
          </div>
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
              The People
            </p>
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
              Small team. <em style={{ fontStyle: "italic" }}>Deep expertise.</em>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                lineHeight: 1.88,
                color: "var(--mink)",
                fontWeight: 300,
                marginBottom: "2rem",
              }}
            >
              Every therapist at Lather is trained in Japanese head spa technique, advanced scalp assessment, and organic product protocols. We're a small team by design — because great care requires focus.
            </p>
            <Link
              href="/team"
              style={{
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
              }}
            >
              Meet the team <span style={{ fontSize: "0.85rem" }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <CTABanner
        eyebrow="Begin Your Ritual"
        headline="Experience the"
        headlineItalic="difference."
        description="Every appointment is an act of self-care. Book yours today and let us show you what intentional rest feels like."
        secondaryCTA={{ label: "View Treatments", href: "/treatments" }}
      />

      <Footer />
    </main>
  );
}
