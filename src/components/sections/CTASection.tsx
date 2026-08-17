"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * The closing ask.
 *
 * Everything arrives on one orchestrated reveal rather than each element
 * fading in on its own schedule: the rule draws itself, the statement rises out
 * of a mask, then the actions. A single sequence reads as the page arriving at
 * a conclusion; several independent fades read as a list of things loading.
 *
 * It fires once, on entry, and never replays — a CTA that re-animates every
 * time it scrolls back into view is asking for attention it has already had.
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
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const dark = tone === "noir";

  // One shared clock. Each element takes its own slice of it, so the order is
  // guaranteed rather than being whatever the animations happen to resolve to.
  const at = (i: number) => ({
    initial: { opacity: 0, y: 34 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 },
    transition: { duration: 1.05, delay: 0.12 + i * 0.13, ease: [0.22, 1, 0.36, 1] as const },
  });

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
            // The mask is the wrapper; the line rides up out of it. Extra bottom
            // padding so descenders are not shaved by the reveal itself.
            <span key={i} className="block overflow-hidden pb-[0.14em]">
              <motion.span
                initial={{ y: "110%" }}
                animate={inView ? { y: "0%" } : { y: "110%" }}
                transition={{
                  duration: 1.15,
                  delay: 0.2 + i * 0.11,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block"
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h2>

        {body && (
          <motion.div
            {...at(3)}
            className={`mt-9 max-w-[46ch] text-[1.02rem] leading-relaxed ${
              dark ? "text-ivory/70" : "text-umber"
            }`}
          >
            {body}
          </motion.div>
        )}

        {actions && (
          <motion.div {...at(4)} className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            {actions}
          </motion.div>
        )}
      </div>
    </section>
  );
}
