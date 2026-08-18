"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * The closing ask.
 *
 * Everything arrives on one orchestrated sequence rather than each element
 * fading in on its own schedule: the statement rises out of a mask, then the
 * body, then the actions. One sequence reads as the page arriving at a
 * conclusion; several independent fades read as a list of things loading.
 *
 * That sequence is *scrubbed by scroll*, and it starts while this section is
 * still climbing into view — which is the whole point. Above it sits the coin,
 * on a pinned panel that is drifting up and out of frame at exactly that
 * moment. Beginning the ask before the coin has finished leaving puts both in
 * the same frame, moving opposite ways, and the two sections dissolve into
 * each other instead of cutting. Waiting until this section is a third on
 * screen — which a `useInView` trigger does — guarantees the cut.
 *
 * The cost is that it plays backwards on the way up, where the old triggered
 * version fired once and stayed put. Worth it: a hand-off you can only see by
 * scrolling down past it at the right speed is not a hand-off.
 */

export interface CTASectionProps {
  lines: ReactNode[];
  body?: ReactNode;
  actions?: ReactNode;
  tone?: "noir" | "porcelain";
  className?: string;
}

export default function CTASection({
  lines,
  body,
  actions,
  tone = "noir",
  className = "",
}: CTASectionProps) {
  const ref = useRef<HTMLElement>(null);
  const dark = tone === "noir";

  // Opens the moment this section's top edge clears the bottom of the frame —
  // while the section above is still on screen — and is complete by the time
  // that edge is a third of the way up.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 30%"] });

  // One shared clock; each element takes its own slice of it, so the order is
  // guaranteed rather than being whatever the animations happen to resolve to.
  // Declared flat and unconditionally — `body` and `actions` are optional, and
  // a hook behind an `if` is a hook that changes count between renders.
  //
  // Clamped functions, never keyframe pairs: handed stops and values,
  // framer-motion may hoist the value onto a scroll-linked Web Animations
  // timeline, where a range narrower than [0,1] does not hold at its endpoint.
  const bodyIn = useTransform(scrollYProgress, (p) => ramp(p, 0.34, 0.86));
  const actionsIn = useTransform(scrollYProgress, (p) => ramp(p, 0.45, 0.97));
  const bodyY = useTransform(bodyIn, (t) => (1 - t) * 34);
  const actionsY = useTransform(actionsIn, (t) => (1 - t) * 34);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${dark ? "bg-noir" : "bg-porcelain"} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className={dark ? "ambient-bloom-dark absolute inset-0" : "ambient-bloom absolute inset-0"} />
      </div>

      <div className="wrap-narrow relative flex min-h-[82svh] flex-col items-center justify-center px-6 py-28 text-center sm:px-10">

        <h2
          className={`font-display text-[clamp(2.4rem,7.2vw,6rem)] leading-[0.98] tracking-[-0.022em] ${
            dark ? "text-ivory" : "text-ink"
          }`}
        >
          {lines.map((l, i) => (
            <Line key={i} index={i} progress={scrollYProgress}>
              {l}
            </Line>
          ))}
        </h2>

        {body && (
          <motion.div
            style={{ opacity: bodyIn, y: bodyY }}
            className={`mt-9 max-w-[46ch] text-[1.02rem] leading-relaxed ${
              dark ? "text-ivory/70" : "text-umber"
            }`}
          >
            {body}
          </motion.div>
        )}

        {actions && (
          <motion.div
            style={{ opacity: actionsIn, y: actionsY }}
            className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            {actions}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/**
 * One line of the statement, riding up out of its own mask.
 *
 * A component rather than a loop body so each line can own its hooks: the
 * number of lines is a prop, and hooks called in a loop over a prop are hooks
 * whose count can change between renders.
 */
function Line({
  index,
  progress,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  const a = 0.12 + index * 0.1;
  const t = useTransform(progress, (p) => ramp(p, a, Math.min(1, a + 0.58)));
  const y = useTransform(t, (v) => `${(1 - v) * 110}%`);

  return (
    // The mask is the wrapper; the line rides up out of it. Extra bottom
    // padding so descenders are not shaved by the reveal itself.
    <span className="block overflow-hidden pb-[0.14em]">
      <motion.span style={{ y }} className="block">
        {children}
      </motion.span>
    </span>
  );
}

/** 0 before `a`, 1 after `b`, linear between — and flat at both ends. */
function ramp(v: number, a: number, b: number) {
  return Math.min(1, Math.max(0, (v - a) / (b - a)));
}
