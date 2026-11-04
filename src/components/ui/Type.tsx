import type { ElementType, ReactNode } from "react";

/**
 * The typographic voice.
 *
 * Two devices carry the whole system:
 *
 * 1. Scale. Display type runs far larger than a normal marketing page — a
 *    statement is meant to fill the screen, not sit politely at the top of a
 *    section. Sizes are clamped so the same component works from 390px to 2000px
 *    without a pile of breakpoint classes.
 *
 * 2. Mixed roman and italic inside one line. The content words stay roman; the
 *    connective words — of, your, the, a, meets, into — drop to italic. It is
 *    the trick that makes a short line of serif look composed rather than just
 *    set, and it is why <Em> exists as its own component: authors mark meaning,
 *    not styling.
 */

// ── size scale ────────────────────────────────────────────────
// xl is reserved for once-per-page moments; most sections use lg or md.
// Tracking is deliberately gentler than it would be for a workhorse serif:
// Instrument Serif ships tightly fitted, so the display sizes need only a
// hairline of negative tracking to look set rather than default.
const SIZES = {
  xl: "text-[clamp(2.375rem,5vw,4.25rem)] leading-[1.08]",
  lg: "text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.12]",
  md: "text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15]",
  sm: "text-[clamp(1.375rem,2vw,1.75rem)] leading-[1.25]",
} as const;

interface StatementProps {
  children: ReactNode;
  /** xl once per page; lg for section openers; md/sm for sub-heads */
  size?: keyof typeof SIZES;
  as?: ElementType;
  className?: string;
}

/** A display line. Serif, light, tight — the page's voice. */
export function Statement({ children, size = "lg", as: Tag = "h2", className = "" }: StatementProps) {
  return (
    <Tag className={`font-display text-balance ${SIZES[size]} ${className}`}>{children}</Tag>
  );
}

/**
 * The italic half of a display line.
 *
 * `not-italic` is never needed on the roman side because the surrounding
 * Statement is roman by default — only the emphasis opts in.
 */
export function Em({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <em className={`not-italic ${className}`}>{children}</em>;
}

/**
 * The small letterspaced label that sits above a Statement. Uppercase is
 * applied in CSS rather than in the copy so the underlying text stays readable
 * to screen readers and searchable in source.
 */
export function Kicker({
  children,
  className = "",
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      className={`cap-m ${className}`}
    >
      {children}
    </Tag>
  );
}

/**
 * Body copy at the measure the layout wants. `centered` narrows it further —
 * a centred paragraph needs a shorter line than a left-aligned one to stay
 * comfortable to read.
 */
export function Lede({
  children,
  className = "",
  centered = false,
}: {
  children: ReactNode;
  className?: string;
  centered?: boolean;
}) {
  return (
    <p
      className={`copy ${
        centered ? "mx-auto max-w-[46ch] text-center" : "max-w-[58ch]"
      } ${className}`}
    >
      {children}
    </p>
  );
}
