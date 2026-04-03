// Scrolling brand strip — luxury editorial pause between Hero and ValueProp
const phrases = [
  "Scalp Restoration",
  "Japanese Head Spa Tradition",
  "Unhurried Ritual",
  "Therapeutic Precision",
  "Hair Renewal",
  "Private Sanctuary",
  "Curated Formulations",
  "Greenville, NC",
];

// Repeated 3× for seamless infinite loop
const track = [...phrases, ...phrases, ...phrases];

export default function CinematicMarquee() {
  return (
    <div
      style={{
        background: "var(--charcoal)",
        borderTop: "1px solid rgba(212,184,168,0.08)",
        borderBottom: "1px solid rgba(212,184,168,0.08)",
        padding: "0",
        overflow: "hidden",
        position: "relative",
        height: "54px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Fade masks on edges */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, var(--charcoal) 0%, transparent 6%, transparent 94%, var(--charcoal) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div
        className="animate-marquee"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          whiteSpace: "nowrap",
          willChange: "transform",
        }}
      >
        {track.map((phrase, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.58rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(212,184,168,0.5)",
                fontWeight: 400,
                padding: "0 2.5rem",
              }}
            >
              {phrase}
            </span>
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "rgba(212,184,168,0.2)",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
