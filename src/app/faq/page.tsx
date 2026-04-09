import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ + Policies",
  description:
    "Find answers to common questions about Japanese head spa treatments, booking, preparation, and our studio policies at Lather Head Spa in Greenville, NC.",
};

const aboutHeadSpaFAQs = [
  { question: "What is a head spa?", answer: "A head spa is a therapeutic scalp treatment rooted in the Japanese wellness tradition. At Lather, each session combines deep scalp cleansing, exfoliation, massage, and nourishing masks to promote scalp health, improve circulation, and encourage healthy hair growth. It is equal parts treatment and ritual — designed to restore both your scalp and your sense of calm." },
  { question: "How long does a session last?", answer: "Sessions range from 45 to 90 minutes depending on the ritual you choose. The Blowout is 45 minutes, the Gentleman's Recharge is 60 minutes, The Classic Ritual is 75 minutes, and The Luxe Ritual is a 90-minute experience. All sessions are appointment-only and reserved exclusively for you." },
  { question: "Are your services suitable for all hair types?", answer: "Absolutely. Our treatments are designed for every hair type and texture — straight, wavy, curly, coily, thin, thick, natural, or color-treated. Every session begins with a scalp analysis so we can tailor the products and techniques to your specific needs." },
  { question: "Do the treatments include a blowdry?", answer: "Our current rituals do not include a blowdry service. You are welcome to air dry, and we provide styling essentials to help you leave feeling polished. We recommend planning accordingly if you have somewhere to be directly after your appointment." },
  { question: "How often should I come in?", answer: "For general scalp maintenance and wellbeing, once a month is ideal. If you are addressing a specific concern — such as thinning, dryness, or postpartum shedding — we may recommend a series of sessions spaced 2 to 3 weeks apart. We will discuss a personalized cadence during your first visit." },
];

const bookingFAQs = [
  { question: "How do I book an appointment?", answer: "You can book online anytime through our website — just click the Book Now button on any page. Select your preferred ritual, choose a date and time, and confirm instantly. If you prefer, you can also call or text us at (252) 531-0987. We recommend booking in advance as appointments fill up quickly, especially on weekends." },
  { question: "How should I prepare for my appointment?", answer: "Come as you are. There is no need to wash your hair beforehand — in fact, we prefer to start with your scalp in its natural state so we can assess it accurately. Avoid heavy oils or styling products on the scalp the day before. Wear something comfortable and plan to relax. We handle everything else." },
  { question: "Can I book for a group?", answer: "Yes! We offer spa party packages for groups of 3 or more. Whether it is a bridal party, birthday celebration, or a simple afternoon with friends, we can create a customized group experience. Visit our Spa Parties page or reach out to us directly to coordinate." },
  { question: "What if I'm running late?", answer: "We understand that things come up. If you are running late, please call or text us as soon as possible. We will do our best to accommodate you, but your session may be shortened to avoid impacting the next guest. The full service price will still apply." },
];

const treatmentFAQs = [
  { question: "What add-ons do you offer?", answer: "We offer five enhancements: Scalp Analysis (+$25), Extended Massage (+15 min, +$30), Aromatherapy Enhancement (+$20), LED Light Therapy (+$35), and Hot Towel Compression (+$15). Mention them when booking or ask your therapist at the start of your session." },
  { question: "Can I combine treatments or add-ons in one visit?", answer: "You can add any enhancement to your treatment. However, we do not recommend combining two full treatments in a single session — your scalp needs time to absorb and respond. If you want a longer experience, add the Extended Massage to any ritual." },
  { question: "What should I expect after my treatment?", answer: "Your scalp will feel refreshed, lighter, and more balanced. Hair often has noticeably more shine and softness. Some guests experience deep relaxation and improved sleep. Avoid washing your hair for 24–48 hours to let the treatment continue working. Drink plenty of water." },
  { question: "I have a scalp condition — can I still book?", answer: "In most cases, yes. Please let us know about any conditions — psoriasis, eczema, dermatitis, or sensitivity — when booking. We will adapt our products and technique. If you have an active infection, open wounds, or severe inflammation, we may recommend consulting a dermatologist first. Our treatments are wellness-focused and complement, but do not replace, medical care." },
  { question: "Are your products safe for color-treated hair?", answer: "Absolutely. Our Natulique products are certified organic, sulfate-free, and formulated to be gentle on color-treated hair. Our treatments help strengthen and extend your color by reinforcing the hair's internal bonds." },
];

const policies = [
  { title: "Cancellation", body: "We require 24 hours' notice for cancellations or reschedules. Late cancellations or no-shows may be subject to a fee equal to 50% of the service price. We understand life happens — just communicate with us and we will always do our best to work with you." },
  { title: "Late Arrival", body: "If you arrive late, we will do our best to accommodate you, but your session may need to be shortened to respect the next guest's time. The full service price still applies. We recommend arriving 5 to 10 minutes early to settle in." },
  { title: "Health & Safety", body: "Please let us know about any scalp conditions, allergies, or sensitivities before your session. If you have an active scalp infection or open wounds, we may need to reschedule for your safety and comfort. We sanitize all tools between every client." },
  { title: "Minors", body: "Guests under 16 must be accompanied by a parent or guardian. We welcome younger guests with parental consent and are happy to adapt the experience to be comfortable for all ages." },
  { title: "Products", body: "We use certified organic Natulique products from Denmark, formulated without parabens, sulfates, or synthetic fragrances. If you have specific product sensitivities, please let us know in advance." },
  { title: "Payment", body: "We accept all major credit cards, debit, and cash. Payment is due at the time of service. Tips are appreciated but never expected." },
];

const allFAQs = [...aboutHeadSpaFAQs, ...bookingFAQs, ...treatmentFAQs];
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFAQs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FAQPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ScrollReveal />
      <Navbar />

      {/* ── HERO (dark) ──────────────────────────────────── */}
      <section
        className="grain-overlay section-pad"
        style={{
          minHeight: "48vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 clamp(20px, 4vw, 48px) clamp(56px, 8vw, 80px)",
          background: "var(--charcoal)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img src="/media/editorial/ambiance-wide.jpg" alt="Lather Head Spa detail" loading="eager" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", opacity: 0.12 }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,10,6,0.7) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--blush)", marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "12px", opacity: 0.85 }}>
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
            FAQ + Policies
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 300, color: "var(--linen)", lineHeight: 1.04, letterSpacing: "-0.015em" }}>
            Everything you <em style={{ fontStyle: "italic" }}>need to know.</em>
          </h1>
        </div>
      </section>

      {/* ── ABOUT HEAD SPA FAQs (cream) ──────────────────── */}
      <section className="reveal-section reveal-lift section-pad" style={{ background: "var(--cream)", padding: "clamp(72px, 10vw, 120px) clamp(20px, 4vw, 48px)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
            About Head Spa
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--bark)", lineHeight: 1.08, marginBottom: "3rem" }}>
            Understanding the <em style={{ fontStyle: "italic" }}>experience.</em>
          </h2>
          <FAQAccordion items={aboutHeadSpaFAQs} />
        </div>
      </section>

      {/* ── EDITORIAL IMAGE BREAK ────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2px", background: "rgba(140,123,107,0.06)" }} className="values-grid">
        {[
          { src: "/media/pages/faq-hero.jpg", alt: "Client relaxed in the treatment chair", focal: "center 25%" },
          { src: "/media/pages/faq-detail-01.jpg", alt: "Treatment tools on marble dish", focal: "center center" },
          { src: "/media/pages/faq-detail-02.jpg", alt: "Natulique products arranged on marble", focal: "center center" },
        ].map((img) => (
          <div key={img.src} style={{ overflow: "hidden", height: "clamp(140px, 16vw, 220px)" }}>
            <img src={img.src} alt={img.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: img.focal, display: "block" }} />
          </div>
        ))}
      </div>

      {/* ── BOOKING FAQs (bark — dark section for contrast) ── */}
      <section className="reveal-section reveal-lift grain-overlay section-pad" style={{ background: "var(--bark)", padding: "clamp(72px, 10vw, 120px) clamp(20px, 4vw, 48px)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 30%, rgba(212,184,168,0.08), transparent 55%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--blush)", marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "12px", opacity: 0.85 }}>
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
            Booking & Preparation
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--linen)", lineHeight: 1.08, marginBottom: "3rem" }}>
            Before your <em style={{ fontStyle: "italic" }}>visit.</em>
          </h2>
          <FAQAccordion items={bookingFAQs} />
        </div>
      </section>

      {/* ── TREATMENTS FAQs (cream) ──────────────────────── */}
      <section className="reveal-section reveal-lift section-pad" style={{ background: "var(--cream)", padding: "clamp(72px, 10vw, 120px) clamp(20px, 4vw, 48px)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
            Treatments & Add-Ons
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--bark)", lineHeight: 1.08, marginBottom: "3rem" }}>
            During & after <em style={{ fontStyle: "italic" }}>your ritual.</em>
          </h2>
          <FAQAccordion items={treatmentFAQs} />

          {/* Cross-links */}
          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(140,123,107,0.12)", display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            {[
              { label: "View All Treatments", href: "/treatments" },
              { label: "Scalp Concerns Guide", href: "/scalp-concerns" },
              { label: "What Is a Head Spa?", href: "/what-is-a-head-spa" },
              { label: "Memberships", href: "/memberships" },
            ].map((link) => (
              <Link key={link.href} href={link.href} style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--bark)", textDecoration: "none", borderBottom: "1px solid rgba(61,46,34,0.25)", paddingBottom: "2px" }}>
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── POLICIES (linen — 2-column grid layout) ──────── */}
      <section className="reveal-section reveal-lift section-pad" style={{ background: "var(--linen)", padding: "clamp(72px, 10vw, 120px) clamp(20px, 4vw, 48px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
            Studio Policies
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--bark)", lineHeight: 1.08, marginBottom: "clamp(40px, 6vw, 64px)" }}>
            Clear expectations, <em style={{ fontStyle: "italic" }}>mutual respect.</em>
          </h2>

          <div className="benefits-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(140,123,107,0.1)" }}>
            {policies.map((policy) => (
              <div key={policy.title} style={{ background: "var(--linen)", padding: "clamp(1.5rem, 2.5vw, 2.25rem)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 300, color: "var(--bark)", marginBottom: "0.75rem", lineHeight: 1.2 }}>
                  {policy.title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.85, color: "var(--mink)", fontWeight: 300 }}>
                  {policy.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="grain-overlay" style={{ background: "var(--charcoal)", padding: "clamp(64px, 9vw, 100px) clamp(20px, 4vw, 48px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% -10%, rgba(212,184,168,0.15), transparent 58%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "520px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 300, color: "var(--linen)", lineHeight: 1.06, marginBottom: "1.5rem" }}>
            Still have <em style={{ fontStyle: "italic" }}>questions?</em>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "rgba(237,230,219,0.55)", lineHeight: 1.85, fontWeight: 300, marginBottom: "2.5rem" }}>
            We are always happy to help. Reach out by phone, email, or visit us in Greenville.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/contact" style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--bark)", background: "var(--linen)", padding: "16px 40px", textDecoration: "none" }}>
              Contact Us
            </Link>
            <a href="tel:+12525310987" style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(237,230,219,0.62)", border: "1px solid rgba(237,230,219,0.18)", padding: "14px 32px", textDecoration: "none" }}>
              (252) 531-0987
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
