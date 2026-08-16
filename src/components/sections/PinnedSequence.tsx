"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

/**
 * A pinned panel whose photograph crossfades from step to step as you scroll.
 *
 * The section is N screens tall; inside it a single sticky viewport-height
 * panel holds every step stacked on top of one another, and scroll progress
 * drives their opacity. The page keeps scrolling normally — nothing is
 * hijacked, no scroll-jacking, no wheel listeners — so trackpads, keyboards,
 * screen readers and the scrollbar all behave exactly as they otherwise would.
 *
 * Accessibility: all step captions exist in the DOM at all times and only their
 * opacity changes, so the whole sequence is readable by assistive tech and by
 * search engines in document order. The dot rail is decorative.
 *
 * Reduced motion: the crossfade is replaced by a plain stacked list, because a
 * pinned section that only advances on scroll is disorienting for exactly the
 * people who ask for reduced motion.
 */

export interface SequenceStep {
  src: string;
  alt: string;
  /** Short label shown in the caption line, e.g. "Cleanse". */
  label: string;
  caption: React.ReactNode;
  focal?: string;
}

export default function PinnedSequence({
  steps,
  className = "",
}: {
  steps: SequenceStep[];
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useEffect(
    () =>
      scrollYProgress.on("change", (v) => {
        // Bias slightly forward so a step is "active" as it becomes readable
        // rather than only once it is fully opaque.
        const i = Math.min(steps.length - 1, Math.floor(v * steps.length + 0.15));
        setActive(i < 0 ? 0 : i);
      }),
    [scrollYProgress, steps.length]
  );

  // Reduced motion: a plain stack, no pinning, no crossfade.
  if (reduced) {
    return (
      <section className={`bg-noir ${className}`}>
        {steps.map((s) => (
          <div key={s.src} className="relative min-h-[70svh] overflow-hidden">
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="100vw"
              style={s.focal ? { objectPosition: s.focal } : undefined}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-noir/45" />
            <p className="absolute inset-x-6 bottom-10 text-center font-display text-2xl text-ivory sm:text-3xl">
              {s.caption}
            </p>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={ref} className={`relative bg-noir ${className}`} style={{ height: `${steps.length * 100}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Painted in document order, so a panel fading in simply covers the
            ones before it. Nothing ever fades out — see Panel. */}
        {steps.map((s, i) => (
          <Panel key={s.src} step={s} index={i} total={steps.length} progress={scrollYProgress} />
        ))}

        {/* step rail */}
        <div className="absolute left-5 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3 sm:left-8" aria-hidden>
          {steps.map((s, i) => (
            <span
              key={s.label}
              className={`block h-1.5 w-1.5 rounded-full transition-all duration-500 ease-luxe ${
                i === active ? "scale-125 bg-brass-light" : "bg-ivory/35"
              }`}
            />
          ))}
        </div>

        {/* caption line — all steps present, only opacity changes */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-14 sm:px-10 sm:pb-16">
          <div className="wrap relative h-[3.5em] text-center sm:h-[2.6em]">
            {steps.map((s, i) => (
              <p
                key={s.label}
                className={`absolute inset-x-0 top-0 font-display text-[1.6rem] leading-snug text-ivory transition-opacity duration-700 ease-luxe sm:text-[2.1rem] ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              >
                {s.caption}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({
  step,
  index,
  total,
  progress,
}: {
  step: SequenceStep;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const slice = 1 / total;
  // Panels only ever fade IN. Because they stack in document order, panel i
  // arriving at full opacity hides everything beneath it — so no panel needs a
  // fade-out, and the section can never flash its background between steps.
  //
  // Keeping it one-directional also keeps the input range strictly increasing
  // and strictly inside [0, 1]. A range that started before 0 (which a
  // symmetric crossfade on the first panel does) makes framer-motion hand a
  // negative keyframe offset to the Web Animations API, and WAAPI rejects it
  // with "Offsets must be monotonically non-decreasing" — which throws during
  // ref attach and takes the whole React tree down with it.
  const fadeStart = index * slice - slice * 0.35;
  const fadeEnd = index * slice;
  const opacity = useTransform(progress, [fadeStart, fadeEnd], [0, 1]);

  // The first panel is the base layer: always opaque, no motion value at all.
  if (index === 0) {
    return (
      <div className="absolute inset-0">
        <PanelMedia step={step} priority />
      </div>
    );
  }

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <PanelMedia step={step} />
    </motion.div>
  );
}

function PanelMedia({ step, priority = false }: { step: SequenceStep; priority?: boolean }) {
  return (
    <>
      <Image
        src={step.src}
        alt={step.alt}
        fill
        priority={priority}
        sizes="100vw"
        style={step.focal ? { objectPosition: step.focal } : undefined}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-noir/45" />
    </>
  );
}
