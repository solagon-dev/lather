"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A list you read *down*, with each entry arriving on the scroll.
 *
 * This is the page's answer to the three-boxes-in-a-row grid. Boxes force
 * every entry to the height of the longest one and ask you to read across
 * three things at once; a ledger gives each entry exactly the room its own
 * words need and hands them to you one at a time. Same content, and it stops
 * looking like a template.
 *
 * The arrival is scrubbed by position, not fired by a trigger. Its rule draws
 * across from the left, the lead rises out of the mask behind it, and the tail
 * follows a beat later — and scrolling back up puts all of it away again. A
 * triggered animation only ever plays forwards, which is most of what makes
 * triggered reveals read as decoration and scroll-linked ones read as the page
 * answering you.
 *
 * Reduced motion gets the same ledger, still and complete.
 */

export default function Ledger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`wrap ${className}`}>{children}</div>;
}

export function LedgerRow({
  aside,
  lead,
  tail,
}: {
  /** The narrow left column — an index number, a count, a date. */
  aside?: ReactNode;
  /** The line that rises out of the mask. Keep it to one block. */
  lead: ReactNode;
  /** Follows a beat behind: attribution, supporting copy. */
  tail?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // Opens as the row's top edge reaches the bottom of the frame and completes
  // by the time that edge is a third of the way up it. Anchored to the row's
  // top rather than to its whole box, so a long entry and a short one arrive
  // at exactly the same rate instead of the long one crawling.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 35%"] });

  // Clamped functions, never keyframe pairs. Handed stops and values,
  // framer-motion may hoist the value onto a scroll-linked Web Animations
  // timeline, where a range narrower than [0,1] does not hold at its endpoint —
  // so a reveal quietly undoes itself further down the page.
  const rule = useTransform(scrollYProgress, (p) => ramp(p, 0, 0.7));
  const lift = useTransform(scrollYProgress, (p) => ramp(p, 0.12, 0.86));
  const after = useTransform(scrollYProgress, (p) => ramp(p, 0.4, 1));

  const leadY = useTransform(lift, (t) => `${(1 - t) * 100}%`);
  const tailY = useTransform(after, (t) => (1 - t) * 14);

  if (reduced) {
    return (
      <article className="grid gap-4 border-t hairline py-12 md:grid-cols-[8rem_1fr] md:gap-12 md:py-16">
        <div className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-taupe">{aside}</div>
        <div>
          {lead}
          {tail && <div className="mt-6">{tail}</div>}
        </div>
      </article>
    );
  }

  return (
    <article ref={ref} className="relative py-12 md:py-16">
      {/* The row's top border, drawn rather than printed. */}
      <motion.div
        style={{ scaleX: rule }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-ink/15"
      />

      <div className="grid gap-4 md:grid-cols-[8rem_1fr] md:gap-12">
        <motion.div
          style={{ opacity: after, y: tailY }}
          className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-taupe"
        >
          {aside}
        </motion.div>

        <div>
          {/* One mask, one block inside it. Long-form copy cannot be split into
              lines that would still be lines at another width, so the block
              rises as a piece — the honest version of the same move. */}
          <div className="overflow-hidden pb-[0.12em]">
            <motion.div style={{ y: leadY, opacity: lift }}>{lead}</motion.div>
          </div>

          {tail && (
            <motion.div style={{ opacity: after, y: tailY }} className="mt-6">
              {tail}
            </motion.div>
          )}
        </div>
      </div>
    </article>
  );
}

/** 0 before `a`, 1 after `b`, linear between — and flat at both ends. */
function ramp(v: number, a: number, b: number) {
  return Math.min(1, Math.max(0, (v - a) / (b - a)));
}
