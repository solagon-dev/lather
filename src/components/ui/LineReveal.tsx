"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Line-by-line masked reveal.
 *
 * A block fade moves the whole paragraph at once; this clips each line to its
 * own box and slides the text up from underneath, so the copy appears to be
 * set rather than to arrive. Lines are declared explicitly as children rather
 * than being split from a text node at runtime — measuring and re-splitting on
 * resize is what makes DOM-splitting libraries janky, and explicit lines also
 * survive SSR and translation without re-wrapping into nonsense.
 *
 * IMPORTANT — the reduced-motion contract:
 * this renders identical markup on server and client, and prefers-reduced-motion
 * is handled by a stylesheet rule on `.reveal-line` in globals.css. Branching on
 * useReducedMotion() here would ship `opacity:0` from the server, then render a
 * no-animation tree on a reduced-motion client, and React would refuse to patch
 * the mismatch — leaving the text invisible forever. See Reveal.tsx.
 */

interface LineRevealProps {
  /**
   * One entry per visual line.
   *
   * An array rather than children on purpose: React.Children.toArray flattens
   * fragments, so passing lines as children silently explodes
   * `<>One destination <Em>for</Em></>` into two separate lines and wrecks the
   * line breaks. An explicit array is the only way to keep a line intact.
   */
  lines: ReactNode[];
  className?: string;
  /** Milliseconds between lines. */
  stagger?: number;
  /** Milliseconds before the first line. */
  delay?: number;
}

/**
 * Renders a block-level <span>, never a <div>, so it is valid inside a heading.
 *
 * This matters more than it looks: <h2><div>…</div></h2> is invalid — a heading
 * takes phrasing content only — and the HTML parser silently hoists the div out
 * of the heading. The server markup and the client tree then disagree, React
 * throws during hydration, and the whole page unmounts. Wrap this in a heading
 * (or in <Statement as="h2">) rather than asking it to be one.
 */
export default function LineReveal({
  lines,
  className = "",
  stagger = 90,
  delay = 0,
}: LineRevealProps) {
  return (
    // The viewport trigger lives on the WRAPPER, and the lines animate via
    // variants inherited through context.
    //
    // Putting whileInView on the line itself deadlocks: the line starts
    // translated 110% down, which puts it entirely outside its own
    // overflow-hidden mask. IntersectionObserver accounts for clipping by
    // ancestors, so the line reports zero intersection, never enters the
    // viewport, and never animates — the mask hides the element that is
    // waiting to be seen. The wrapper is never clipped, so it is the only
    // sound thing to observe.
    <motion.span
      className={`block ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -10% 0px" }}
    >
      {lines.map((line, i) => (
        // overflow-hidden is the mask; the padding stops descenders (y, g, p)
        // and the italic's overshoot from being clipped by their own mask.
        <span key={i} className="block overflow-hidden pb-[0.12em] pt-[0.02em]">
          <motion.span
            className="reveal-line block"
            variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
            transition={{
              duration: 1.05,
              delay: (delay + i * stagger) / 1000,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
