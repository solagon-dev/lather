"use client";

interface PageHeroProps {
  eyebrow: string;
  headline: string;
  headlineItalic?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  dark?: boolean; // true = charcoal bg, false = cream bg
  compact?: boolean; // true = smaller hero for sub-pages
}

export default function PageHero({
  eyebrow,
  headline,
  headlineItalic,
  description,
  image,
  imageAlt,
  dark = true,
  compact = false,
}: PageHeroProps) {
  const bg = dark ? "var(--charcoal)" : "var(--cream)";
  const headlineColor = dark ? "var(--linen)" : "var(--bark)";
  const eyebrowColor = dark ? "var(--blush)" : "var(--stone)";
  const descColor = dark
    ? "rgba(237,230,219,0.62)"
    : "var(--mink)";

  return (
    <section
      style={{
        minHeight: compact ? "44vh" : "52vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 clamp(20px, 4vw, 48px) clamp(56px, 8vw, 80px)",
        background: bg,
        position: "relative",
        overflow: "hidden",
      }}
      className="grain-overlay section-pad"
    >
      {image && (
        <img
          src={image}
          alt={imageAlt || ""}
          loading="eager"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
            opacity: dark ? 0.18 : 0.12,
          }}
        />
      )}

      {dark && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(212,184,168,0.12), transparent 55%)",
            pointerEvents: "none",
          }}
        />
      )}

      {!dark && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 80% 20%, rgba(212,184,168,0.2), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(163,172,148,0.12), transparent 55%)",
            pointerEvents: "none",
          }}
        />
      )}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.62rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: eyebrowColor,
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
          {eyebrow}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: compact
              ? "clamp(2.4rem, 5.5vw, 4.5rem)"
              : "clamp(3rem, 7vw, 6rem)",
            fontWeight: 300,
            color: headlineColor,
            lineHeight: 1.04,
            letterSpacing: "-0.015em",
            maxWidth: "900px",
          }}
        >
          {headline}
          {headlineItalic && (
            <>
              <br />
              <em style={{ fontStyle: "italic" }}>{headlineItalic}</em>
            </>
          )}
        </h1>
        {description && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
              lineHeight: 1.88,
              color: descColor,
              fontWeight: 300,
              maxWidth: "520px",
              marginTop: "1.75rem",
            }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
