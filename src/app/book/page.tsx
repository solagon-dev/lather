import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingFlow from "./BookingFlow";

export const metadata: Metadata = {
  title: "Book Your Ritual",
  description:
    "Book a luxury head spa appointment at Lather in Greenville, NC. Choose your treatment, select a time, and reserve your private session.",
};

export default function BookPage() {
  return (
    <main>
      <ScrollReveal />
      <Navbar />

      {/* ── HERO ──────────────────────────────────────── */}
      <section
        className="grain-overlay section-pad"
        style={{
          minHeight: "44vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 clamp(20px, 4vw, 48px) clamp(48px, 7vw, 72px)",
          background: "var(--charcoal)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="/media/pages/book-hero.jpg"
          alt="Client relaxing during head spa treatment"
          loading="eager"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 35%",
            opacity: 0.15,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(15,10,6,0.8) 0%, transparent 60%)",
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
            Reserve Your Ritual
          </p>
          <h1
            className="book-hero-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 300,
              color: "var(--linen)",
              lineHeight: 1.04,
              letterSpacing: "-0.015em",
            }}
          >
            Book your <em style={{ fontStyle: "italic" }}>appointment.</em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
              lineHeight: 1.88,
              color: "rgba(237,230,219,0.55)",
              fontWeight: 300,
              maxWidth: "440px",
              marginTop: "1.5rem",
            }}
          >
            Choose your treatment, select a time, and we will handle the rest. Every session is private and reserved exclusively for you.
          </p>
        </div>
      </section>

      {/* ── BOOKING FLOW ──────────────────────────────── */}
      <section
        style={{
          background: "var(--cream)",
          padding: "clamp(56px, 8vw, 88px) clamp(20px, 4vw, 48px) clamp(72px, 10vw, 120px)",
        }}
      >
        <BookingFlow />
      </section>

      {/* ── INFO BAR ──────────────────────────────────── */}
      <section
        className="grain-overlay"
        style={{
          background: "var(--charcoal)",
          padding: "clamp(48px, 7vw, 72px) clamp(20px, 4vw, 48px)",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "2rem",
            textAlign: "center",
          }}
          className="book-info-bar"
        >
          {[
            { label: "Location", value: "Greenville, NC" },
            { label: "Hours", value: "Tue – Sat\n10am – 7pm" },
            { label: "Contact", value: "(252) 531-0987" },
          ].map((item) => (
            <div key={item.label}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.55rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(237,230,219,0.3)", marginBottom: "10px" }}>
                {item.label}
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--linen)", fontWeight: 300, whiteSpace: "pre-line", lineHeight: 1.4 }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
