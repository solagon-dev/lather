"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger offset in milliseconds (kept in ms to match existing call sites). */
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}

// framer-motion needs the concrete motion component per tag; map the small set
// of elements Reveal is used as.
const motionTags = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  span: motion.span,
} as const;

/**
 * Scroll-reveal primitive — the site's animation engine, powered by
 * framer-motion. Elements rise and fade in once as they enter the viewport,
 * on the same luxe easing curve used across the design tokens.
 *
 * Behaviour: fires once, threshold ~0.12, a small bottom rootMargin. The
 * `reveal` class stays on as a no-JS hook — the <noscript> block in the root
 * layout forces those elements visible when JavaScript is unavailable.
 *
 * prefers-reduced-motion is handled entirely in CSS (see globals.css), NOT by
 * branching here on useReducedMotion(). That hook reads a media query, so it
 * is false during SSR and true on a reduced-motion client: the server would
 * ship `style="opacity:0;transform:translateY(28px)"` while the client
 * rendered `initial={false}` with no whileInView, so framer-motion never
 * animated and never cleared the inherited inline style. React reports the
 * attribute mismatch and declines to patch it, leaving every revealed element
 * invisible forever — i.e. a blank site for anyone with Reduce Motion on.
 * Keeping the markup identical on both sides and letting a stylesheet rule
 * override it is the only version that is safe to hydrate.
 */
export default function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const MotionTag = motionTags[as];

  return (
    <MotionTag
      className={`reveal ${className}`.trim()}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
