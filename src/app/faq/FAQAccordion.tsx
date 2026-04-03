"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            style={{
              borderBottom: "1px solid rgba(140,123,107,0.12)",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "2rem",
                padding: "28px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.15rem, 2.2vw, 1.45rem)",
                  fontWeight: 300,
                  color: "var(--bark)",
                  lineHeight: 1.3,
                }}
              >
                {item.question}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.4rem",
                  color: "var(--stone)",
                  flexShrink: 0,
                  transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  lineHeight: 1,
                }}
              >
                +
              </span>
            </button>
            <div
              style={{
                overflow: "hidden",
                maxHeight: isOpen ? "600px" : "0",
                opacity: isOpen ? 1 : 0,
                transition:
                  "max-height 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  lineHeight: 1.88,
                  color: "var(--mink)",
                  fontWeight: 300,
                  paddingBottom: "28px",
                  maxWidth: "680px",
                }}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
