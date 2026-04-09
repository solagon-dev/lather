"use client";

import Link from "next/link";

const items = [
  {
    eyebrow: "Membership",
    headline: "Invest in consistency.",
    body: "Monthly scalp rituals starting at $110/month. Priority booking, savings on every visit, and results that compound over time.",
    cta: { label: "View Memberships", href: "/memberships" },
    image: "/media/pages/memberships-hero.jpg",
  },
  {
    eyebrow: "Spa Parties",
    headline: "Gather. Restore.",
    body: "Private group experiences for bridal parties, birthdays, corporate wellness, and more. We'll curate every detail.",
    cta: { label: "Plan Your Event", href: "/spa-parties" },
    image: "/media/editorial/gift-card-detail.jpg",
  },
  {
    eyebrow: "Gift Cards",
    headline: "Give renewal.",
    body: "The gift of calm, starting at $50. Available for any treatment or custom amount — delivered digitally or in person.",
    cta: { label: "Send a Gift", href: "/gift-cards" },
    image: "/media/editorial/secondary-treatment.jpg",
  },
];

export default function SecondaryConversions() {
  return (
    <section
      className="reveal-section reveal-lift section-pad"
      style={{
        background: "var(--linen)",
        padding: "clamp(56px, 8.5vw, 100px) clamp(20px, 4vw, 48px)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          className="values-grid stagger-children"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(140,123,107,0.1)",
          }}
        >
          {items.map((item) => (
            <div
              key={item.eyebrow}
              style={{
                background: "var(--linen)",
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Small accent image */}
              <div
                style={{
                  width: "100%",
                  height: "180px",
                  overflow: "hidden",
                  marginBottom: "1.75rem",
                }}
              >
                <img
                  src={item.image}
                  alt={item.eyebrow}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 35%",
                    display: "block",
                  }}
                />
              </div>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--stone)",
                  marginBottom: "0.75rem",
                }}
              >
                {item.eyebrow}
              </p>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                  fontWeight: 300,
                  color: "var(--bark)",
                  lineHeight: 1.15,
                  marginBottom: "1rem",
                  fontStyle: "italic",
                }}
              >
                {item.headline}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.88rem",
                  lineHeight: 1.8,
                  color: "var(--mink)",
                  fontWeight: 300,
                  marginBottom: "1.5rem",
                  flex: 1,
                }}
              >
                {item.body}
              </p>

              <Link
                href={item.cta.href}
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
                  paddingBottom: "3px",
                  alignSelf: "flex-start",
                  transition: "opacity 0.25s, gap 0.3s var(--ease-luxury)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.5"; e.currentTarget.style.gap = "14px"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.gap = "8px"; }}
              >
                {item.cta.label}
                <span style={{ fontSize: "0.8rem" }}>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
