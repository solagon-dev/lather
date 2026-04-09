import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Scalp Concerns & Treatment Guide",
  description:
    "Match your scalp concern to the ideal head spa treatment at Lather in Greenville, NC. Personalized pathways for thinning, dryness, buildup, stress, and more.",
};

const concerns = [
  {
    title: "Oily or Congested Scalp",
    subtitle: "Buildup · Excess oil · Clogged follicles",
    description:
      "Excess sebum, product buildup, and clogged follicles leave your scalp feeling heavy and your hair looking flat. A deep cleansing ritual lifts away impurities, rebalances oil production, and restores lightness from root to tip.",
    treatment: "The Classic Ritual",
    treatmentDetail: "75 min · $125",
    href: "/treatments/classic-ritual",
    addon: "Scalp Analysis (+$25)",
    image: "/media/scalp-concerns/buildup-oily.jpg",
  },
  {
    title: "Dry, Flaky, or Irritated Scalp",
    subtitle: "Dryness · Flaking · Sensitivity",
    description:
      "Persistent dryness, itching, and flaking are signs your scalp barrier needs support. Targeted hydration and nourishing botanicals calm inflammation, restore moisture balance, and bring lasting relief.",
    treatment: "The Luxe Ritual",
    treatmentDetail: "90 min · $200",
    href: "/treatments/luxe-ritual",
    addon: "Hot Towel Compression (+$15)",
    image: "/media/scalp-concerns/dryness-flaking.jpg",
  },
  {
    title: "Thinning or Hair Loss",
    subtitle: "Stress · Postpartum · Seasonal · Aging",
    description:
      "Whether it stems from stress, hormonal shifts, postpartum changes, or aging, hair loss deserves a thoughtful response. Stimulating scalp massage paired with revitalizing serums encourages circulation and supports healthier follicle activity over time.",
    treatment: "The Classic Ritual",
    treatmentDetail: "75 min · $125",
    href: "/treatments/classic-ritual",
    addon: "LED Light Therapy (+$35)",
    image: "/media/scalp-concerns/damage-repair.jpg",
  },
  {
    title: "Product Buildup",
    subtitle: "Styling residue · Dry shampoo · Hard water",
    description:
      "Heavy styling products, dry shampoo residue, and hard water mineral deposits accumulate gradually, suffocating the scalp. A thorough purifying treatment removes layers of buildup so your scalp can breathe and your hair can shine again.",
    treatment: "The Classic Ritual",
    treatmentDetail: "75 min · $125",
    href: "/treatments/classic-ritual",
    addon: "Scalp Analysis (+$25)",
    image: "/media/scalp-concerns/thinning-loss.jpg",
  },
  {
    title: "Stress & Tension",
    subtitle: "Tightness · Headaches · Poor sleep",
    description:
      "Scalp tightness, tension headaches, and poor sleep all leave their mark. Extended scalp massage using pressure-point techniques releases held tension, quiets the nervous system, and helps you find a deeper state of rest.",
    treatment: "Gentleman's Recharge",
    treatmentDetail: "60 min · $100",
    href: "/treatments/gentlemans-recharge",
    addon: "Extended Massage (+$30)",
    image: "/media/scalp-concerns/tension-stress.jpg",
  },
  {
    title: "Damaged or Color-Treated Hair",
    subtitle: "Chemical damage · Heat damage · Breakage",
    description:
      "Color treatments, heat styling, and chemical processing weaken hair bonds and compromise the scalp's natural defenses. Reparative rituals deliver concentrated moisture and bond-strengthening care to rebuild resilience from the inside out.",
    treatment: "The Luxe Ritual",
    treatmentDetail: "90 min · $200",
    href: "/treatments/luxe-ritual",
    addon: "Aromatherapy Enhancement (+$20)",
    image: "/media/scalp-concerns/sensitivity.jpg",
  },
];

export default function ScalpConcernsPage() {
  return (
    <main>
      <ScrollReveal />
      <Navbar />

      {/* ── HERO ───────────────────────────────────────────── */}
      <section
        className="grain-overlay section-pad"
        style={{
          minHeight: "52vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 clamp(20px, 4vw, 48px) clamp(56px, 8vw, 80px)",
          background: "var(--charcoal)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="/media/scalp-concerns/concerns-hero.jpg"
          alt="Therapist performing scalp treatment at the wash basin"
          loading="eager"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", opacity: 0.2 }}
        />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,10,6,0.8) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--blush)", marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "12px", opacity: 0.85 }}>
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
            Scalp Health
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 300, color: "var(--linen)", lineHeight: 1.04, letterSpacing: "-0.015em", maxWidth: "700px" }}>
            Find your <em style={{ fontStyle: "italic" }}>pathway.</em>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.88rem, 1.4vw, 1rem)", lineHeight: 1.88, color: "rgba(237,230,219,0.65)", fontWeight: 300, maxWidth: "480px", marginTop: "1.75rem" }}>
            Every scalp tells a story. Match your concern to the ritual that brings real, lasting relief.
          </p>
        </div>
      </section>

      {/* ── CONCERNS — mixed editorial layouts ─────────────── */}

      {/* ROW 1: Top 3 as cards on a dark background */}
      <section
        className="reveal-section reveal-lift grain-overlay"
        style={{
          background: "var(--bark)",
          padding: "clamp(72px, 10vw, 120px) clamp(20px, 4vw, 48px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 30%, rgba(212,184,168,0.08), transparent 55%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--blush)", marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "12px", opacity: 0.85 }}>
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
            Common Concerns
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", fontWeight: 300, color: "var(--linen)", lineHeight: 1.06, marginBottom: "clamp(48px, 7vw, 72px)" }}>
            What is your scalp <em style={{ fontStyle: "italic" }}>telling you?</em>
          </h2>

          <div
            className="values-grid stagger-children"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(237,230,219,0.06)" }}
          >
            {concerns.slice(0, 3).map((concern) => (
              <div
                key={concern.title}
                style={{ background: "rgba(61,46,34,0.95)", display: "flex", flexDirection: "column" }}
              >
                {/* Image */}
                <div style={{ overflow: "hidden", height: "clamp(180px, 18vw, 240px)" }}>
                  <img src={concern.image} alt={concern.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%", display: "block" }} />
                </div>
                {/* Content */}
                <div style={{ padding: "clamp(1.5rem, 2.5vw, 2rem)", flex: 1, display: "flex", flexDirection: "column" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.5rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--blush)", opacity: 0.6, marginBottom: "0.75rem" }}>
                    {concern.subtitle}
                  </p>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 2.2vw, 1.65rem)", fontWeight: 300, color: "var(--linen)", lineHeight: 1.15, marginBottom: "1rem" }}>
                    {concern.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", lineHeight: 1.8, color: "rgba(237,230,219,0.55)", fontWeight: 300, marginBottom: "1.5rem", flex: 1 }}>
                    {concern.description}
                  </p>
                  <div style={{ borderTop: "1px solid rgba(237,230,219,0.08)", paddingTop: "1rem" }}>
                    <Link
                      href={concern.href}
                      style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--linen)", textDecoration: "none", fontWeight: 300, display: "inline-flex", alignItems: "center", gap: "8px" }}
                    >
                      {concern.treatment} <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>→</span>
                    </Link>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", color: "rgba(237,230,219,0.35)", marginTop: "0.35rem" }}>
                      {concern.treatmentDetail} · {concern.addon}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROW 2: Bottom 3 as wide editorial rows on light background */}
      <section
        className="reveal-section reveal-lift"
        style={{
          background: "var(--cream)",
          padding: "clamp(72px, 10vw, 120px) clamp(20px, 4vw, 48px)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "clamp(48px, 7vw, 72px)", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
            More Concerns
          </p>

          {concerns.slice(3).map((concern, i) => (
            <div
              key={concern.title}
              className="reveal-section reveal-fade"
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "clamp(1.5rem, 3vw, 3rem)",
                alignItems: "center",
                padding: "clamp(1.5rem, 2.5vw, 2.5rem) 0",
                borderTop: i === 0 ? "1px solid rgba(140,123,107,0.12)" : "none",
                borderBottom: "1px solid rgba(140,123,107,0.12)",
              }}
            >
              {/* Small image thumbnail */}
              <div style={{ width: "clamp(80px, 10vw, 120px)", height: "clamp(80px, 10vw, 120px)", overflow: "hidden", flexShrink: 0 }}>
                <img src={concern.image} alt={concern.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%", display: "block" }} />
              </div>

              {/* Text */}
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "0.4rem" }}>
                  {concern.subtitle}
                </p>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 300, color: "var(--bark)", lineHeight: 1.15, marginBottom: "0.5rem" }}>
                  {concern.title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.75, color: "var(--mink)", fontWeight: 300, maxWidth: "540px" }}>
                  {concern.description}
                </p>
              </div>

              {/* Treatment link */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <Link
                  href={concern.href}
                  style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--bark)", textDecoration: "none", fontWeight: 300, display: "inline-flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}
                >
                  {concern.treatment} <span style={{ fontSize: "0.75rem" }}>→</span>
                </Link>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", color: "var(--stone)", marginTop: "0.35rem" }}>
                  {concern.treatmentDetail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DISCLAIMER ─────────────────────────────────────── */}
      <section style={{ background: "var(--linen)", padding: "clamp(36px, 5vw, 56px) clamp(20px, 4vw, 48px)" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", lineHeight: 1.85, color: "var(--stone)", fontStyle: "italic", fontWeight: 300 }}>
            <strong style={{ fontWeight: 400 }}>Important:</strong> Our treatments are wellness-focused and not intended to diagnose, treat, or cure any medical condition. If you are experiencing sudden or severe hair loss, persistent scalp pain, open sores, or signs of infection, we recommend consulting a dermatologist before booking. We are always happy to work alongside your healthcare provider.
          </p>
        </div>
      </section>

      {/* ── NOT SURE? — final CTA ─────────────────────────── */}
      <section
        className="reveal-section reveal-lift grain-overlay section-pad"
        style={{
          background: "var(--charcoal)",
          padding: "clamp(72px, 10vw, 140px) clamp(20px, 4vw, 48px)",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% -10%, rgba(212,184,168,0.18), transparent 58%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--blush)", marginBottom: "1.75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", opacity: 0.85 }}>
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
            Personalized Care
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5.5vw, 4rem)", fontWeight: 300, color: "var(--linen)", lineHeight: 1.04, marginBottom: "1.5rem", letterSpacing: "-0.015em" }}>
            Not sure where to <em style={{ fontStyle: "italic" }}>start?</em>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(237,230,219,0.62)", lineHeight: 1.88, fontWeight: 300, marginBottom: "2.5rem" }}>
            Every session begins with a consultation. We assess your scalp, discuss your goals, and recommend the treatment that makes the most sense for where you are right now.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href="/book"
              style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--bark)", background: "var(--linen)", padding: "16px 40px", textDecoration: "none" }}
            >
              Book a Consultation
            </a>
            <Link
              href="/treatments"
              style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(237,230,219,0.62)", border: "1px solid rgba(237,230,219,0.18)", padding: "14px 32px", textDecoration: "none" }}
            >
              View All Treatments
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
