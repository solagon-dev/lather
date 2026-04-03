"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="reveal-section reveal-lift section-pad"
      style={{
        background: "var(--cream)",
        padding: "clamp(56px, 8.5vw, 120px) clamp(20px, 4vw, 48px)",
        position: "relative",
      }}
    >
      {/* Subtle divider at top */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "48px",
          right: "48px",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(140,123,107,0.2) 25%, rgba(140,123,107,0.2) 75%, transparent)",
        }}
      />

      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "72px" }}>
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
            <span
              style={{
                display: "inline-block",
                width: "28px",
                height: "1px",
                background: "var(--blush)",
              }}
            />
            Common Questions
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
            Frequently asked{" "}
            <em style={{ fontStyle: "italic" }}>questions.</em>
          </h2>
        </div>

        {/* Accordion */}
        <div>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: "1px solid rgba(140,123,107,0.15)",
                borderTop: i === 0 ? "1px solid rgba(140,123,107,0.15)" : "none",
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "28px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: "2.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
                    fontWeight: 300,
                    color: "var(--bark)",
                    lineHeight: 1.35,
                    flex: 1,
                  }}
                >
                  {faq.question}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1.1rem",
                    color: "var(--stone)",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "24px",
                    height: "24px",
                    transition: "transform 0.35s var(--ease-luxury)",
                    transform: openIndex === i ? "rotate(45deg)" : "none",
                    marginTop: "2px",
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              <div
                style={{
                  overflow: "hidden",
                  maxHeight: openIndex === i ? "400px" : "0",
                  transition: "max-height 0.45s var(--ease-luxury)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    lineHeight: 1.88,
                    color: "var(--mink)",
                    fontWeight: 300,
                    paddingBottom: "32px",
                    paddingRight: "clamp(0.5rem, 4vw, 3.5rem)",
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
