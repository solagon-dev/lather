"use client";

import Link from "next/link";

interface CTABannerProps {
  eyebrow?: string;
  headline: string;
  headlineItalic?: string;
  description?: string;
  primaryCTA?: { label: string; href: string; external?: boolean };
  secondaryCTA?: { label: string; href: string; external?: boolean };
  variant?: "dark" | "light";
}

export default function CTABanner({
  eyebrow,
  headline,
  headlineItalic,
  description,
  primaryCTA = {
    label: "Book Online",
    href: "/book",
  },
  secondaryCTA,
  variant = "dark",
}: CTABannerProps) {
  const isDark = variant === "dark";
  const bg = isDark ? "var(--charcoal)" : "var(--linen)";
  const headlineColor = isDark ? "var(--linen)" : "var(--bark)";
  const eyebrowColor = isDark ? "var(--blush)" : "var(--stone)";
  const descColor = isDark ? "rgba(237,230,219,0.62)" : "var(--mink)";
  const btnBg = isDark ? "var(--linen)" : "var(--bark)";
  const btnColor = isDark ? "var(--bark)" : "var(--cream)";
  const btnHoverBg = isDark ? "var(--cream)" : "var(--mink)";

  const renderLink = (
    cta: { label: string; href: string; external?: boolean },
    isPrimary: boolean,
  ) => {
    const style: React.CSSProperties = isPrimary
      ? {
          display: "inline-block",
          fontFamily: "var(--font-body)",
          fontSize: "0.62rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: btnColor,
          background: btnBg,
          padding: "16px 40px",
          textDecoration: "none",
          transition: "background 0.3s ease, transform 0.3s var(--ease-luxury)",
        }
      : {
          display: "inline-block",
          fontFamily: "var(--font-body)",
          fontSize: "0.62rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: isDark ? "rgba(237,230,219,0.62)" : "var(--stone)",
          border: `1px solid ${isDark ? "rgba(237,230,219,0.18)" : "rgba(140,123,107,0.25)"}`,
          padding: "14px 32px",
          textDecoration: "none",
          transition: "border-color 0.25s ease, color 0.25s ease",
        };

    if (cta.external) {
      return (
        <a
          key={cta.label}
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          style={style}
          onMouseEnter={(e) => {
            if (isPrimary) {
              e.currentTarget.style.background = btnHoverBg;
              e.currentTarget.style.transform = "translateY(-2px)";
            }
          }}
          onMouseLeave={(e) => {
            if (isPrimary) {
              e.currentTarget.style.background = btnBg;
              e.currentTarget.style.transform = "none";
            }
          }}
        >
          {cta.label}
        </a>
      );
    }
    return (
      <Link
        key={cta.label}
        href={cta.href}
        style={style}
        onMouseEnter={(e) => {
          if (isPrimary) {
            e.currentTarget.style.background = btnHoverBg;
            e.currentTarget.style.transform = "translateY(-2px)";
          }
        }}
        onMouseLeave={(e) => {
          if (isPrimary) {
            e.currentTarget.style.background = btnBg;
            e.currentTarget.style.transform = "none";
          }
        }}
      >
        {cta.label}
      </Link>
    );
  };

  return (
    <section
      className="reveal-section reveal-lift grain-overlay section-pad"
      style={{
        background: bg,
        padding: "clamp(64px, 10vw, 120px) clamp(20px, 4vw, 48px)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: isDark
            ? "radial-gradient(ellipse at 50% -10%, rgba(212,184,168,0.18), transparent 58%)"
            : "radial-gradient(ellipse at 50% 50%, rgba(212,184,168,0.15), transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {eyebrow && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.62rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: eyebrowColor,
              marginBottom: "1.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
            {eyebrow}
            <span
              style={{
                display: "inline-block",
                width: "28px",
                height: "1px",
                background: "var(--blush)",
              }}
            />
          </p>
        )}

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
            fontWeight: 300,
            color: headlineColor,
            lineHeight: 1.04,
            marginBottom: "1.75rem",
            letterSpacing: "-0.015em",
          }}
        >
          {headline}{" "}
          {headlineItalic && (
            <em style={{ fontStyle: "italic" }}>{headlineItalic}</em>
          )}
        </h2>

        {description && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: descColor,
              lineHeight: 1.88,
              maxWidth: "480px",
              margin: "0 auto 3rem",
              fontWeight: 300,
            }}
          >
            {description}
          </p>
        )}

        <div
          className="hero-ctas"
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {renderLink(primaryCTA, true)}
          {secondaryCTA && renderLink(secondaryCTA, false)}
        </div>
      </div>
    </section>
  );
}
