"use client";

import Link from "next/link";
import { services } from "@/lib/data";

const tierLabels: Record<string, string> = {
  foundation: "Foundation",
  specialized: "Specialized",
  premium: "Premium",
};

const firstTimeFitLabels: Record<string, { label: string; color: string }> = {
  recommended: { label: "Recommended", color: "var(--sage)" },
  possible: { label: "Yes", color: "var(--stone)" },
};

function Dots({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: i < count ? "var(--bark)" : "rgba(140,123,107,0.15)",
            transition: "background 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

export default function TreatmentComparison() {
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
        {/* Header */}
        <div style={{ marginBottom: "clamp(40px, 6vw, 64px)" }}>
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
            Compare Treatments
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
              fontWeight: 300,
              color: "var(--bark)",
              lineHeight: 1.06,
              letterSpacing: "-0.01em",
            }}
          >
            Find your <em style={{ fontStyle: "italic" }}>perfect ritual.</em>
          </h2>
        </div>

        {/* Comparison table */}
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table
            style={{
              width: "100%",
              minWidth: "740px",
              borderCollapse: "collapse",
              tableLayout: "fixed",
            }}
          >
            {/* Column header row */}
            <thead>
              <tr>
                <th
                  style={{
                    width: "160px",
                    padding: "0 16px 20px 0",
                    textAlign: "left",
                    verticalAlign: "bottom",
                    fontWeight: 300,
                  }}
                />
                {services.map((s) => (
                  <th
                    key={s.id}
                    style={{
                      padding: "0 12px 20px",
                      textAlign: "left",
                      verticalAlign: "bottom",
                      fontWeight: 300,
                      borderBottom: "2px solid var(--bark)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.52rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--stone)",
                        marginBottom: "6px",
                      }}
                    >
                      {tierLabels[s.tier] || s.tier}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                        color: "var(--bark)",
                        lineHeight: 1.2,
                      }}
                    >
                      {s.name}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Price */}
              <Row label="Price">
                {services.map((s) => (
                  <Cell key={s.id}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--bark)", fontWeight: 300 }}>
                      ${s.price}
                    </span>
                  </Cell>
                ))}
              </Row>

              {/* Duration */}
              <Row label="Duration">
                {services.map((s) => (
                  <Cell key={s.id}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--mink)" }}>{s.duration}</span>
                  </Cell>
                ))}
              </Row>

              {/* Best for */}
              <Row label="Best for">
                {services.map((s) => (
                  <Cell key={s.id}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {s.bestForTags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.68rem",
                            color: "var(--mink)",
                            background: "rgba(140,123,107,0.08)",
                            padding: "3px 8px",
                            lineHeight: 1.4,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Cell>
                ))}
              </Row>

              {/* Included extras */}
              <Row label="Key inclusions">
                {services.map((s) => (
                  <Cell key={s.id}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                      {s.highlights.slice(0, 3).map((h) => (
                        <span key={h} style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--mink)", lineHeight: 1.5 }}>
                          {h}
                        </span>
                      ))}
                      {s.highlights.length > 3 && (
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "var(--stone)", fontStyle: "italic" }}>
                          +{s.highlights.length - 3} more
                        </span>
                      )}
                    </div>
                  </Cell>
                ))}
              </Row>

              {/* Intensity */}
              <Row label="Intensity">
                {services.map((s) => (
                  <Cell key={s.id}><Dots count={s.intensity} /></Cell>
                ))}
              </Row>

              {/* Luxury level */}
              <Row label="Luxury level">
                {services.map((s) => (
                  <Cell key={s.id}><Dots count={s.luxuryLevel} /></Cell>
                ))}
              </Row>

              {/* First-time fit */}
              <Row label="First-time fit">
                {services.map((s) => {
                  const fit = firstTimeFitLabels[s.firstTimeFit];
                  return (
                    <Cell key={s.id}>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.78rem",
                          color: fit?.color || "var(--stone)",
                          fontWeight: s.firstTimeFit === "recommended" ? 500 : 300,
                        }}
                      >
                        {fit?.label || s.firstTimeFit}
                      </span>
                    </Cell>
                  );
                })}
              </Row>

              {/* CTA row */}
              <tr>
                <td style={{ padding: "24px 16px 0 0" }} />
                {services.map((s) => (
                  <td key={s.id} style={{ padding: "24px 12px 0" }}>
                    <Link
                      href={`/treatments/${s.id}`}
                      style={{
                        display: "inline-block",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.58rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--cream)",
                        background: "var(--bark)",
                        padding: "12px 20px",
                        textDecoration: "none",
                        transition: "background 0.3s ease",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--mink)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bark)")}
                    >
                      View Details
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr>
      <td
        style={{
          padding: "16px 16px 16px 0",
          fontFamily: "var(--font-body)",
          fontSize: "0.62rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--stone)",
          verticalAlign: "top",
          borderBottom: "1px solid rgba(140,123,107,0.08)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </td>
      {children}
    </tr>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return (
    <td
      style={{
        padding: "16px 12px",
        verticalAlign: "top",
        borderBottom: "1px solid rgba(140,123,107,0.08)",
      }}
    >
      {children}
    </td>
  );
}
