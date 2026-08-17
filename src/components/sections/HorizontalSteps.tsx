"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The five movements as a pinned horizontal track.
 *
 * Vertical scroll drives horizontal travel: the section is tall, a viewport-
 * height panel sticks to the top of it, and the row of steps inside slides
 * left in proportion to how far through the section you are. Reading a
 * sequence sideways makes its order legible in a way a vertical stack does
 * not — you can see where you are in it and how much is left.
 *
 * Nothing intercepts the wheel. The page scrolls normally the whole time, so
 * trackpads, keyboards, the scrollbar and assistive tech behave exactly as
 * they do everywhere else, and the section can be scrolled past at speed
 * without the animation swallowing input.
 *
 * The travel distance is measured from the real track width rather than
 * assumed, so it stays correct at any viewport and with any number of steps.
 *
 * Reduced motion gets a plain vertical list: a long sideways translation tied
 * to scroll is precisely what that preference is asking us not to do.
 */

export interface HorizontalStep {
  src: string;
  alt: string;
  /** Not rendered — kept only as a stable key for the list. */
  number: string;
  title: string;
  body: ReactNode;
}

export default function HorizontalSteps({
  steps,
  className = "",
}: {
  steps: HorizontalStep[];
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // Measure how far the track actually has to move, rather than guessing from
  // panel counts — the panels are responsive, so the number changes with the
  // viewport and with the scrollbar.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setTravel(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [steps.length]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // The track holds on each frame, then moves between them quickly, rather
  // than sliding at one constant rate. A uniform drag reads as one very wide
  // image being pulled past; holding makes each panel a shot you arrive at and
  // sit in, and the fast move between them reads as a cut. That dwell is the
  // whole difference between a section you scroll past and one you watch.
  const [stops, positions] = (() => {
    const n = steps.length;
    if (n < 2 || !travel) return [[0, 1], [0, -travel]] as const;
    const panel = travel / (n - 1);
    const t: number[] = [];
    const p: number[] = [];
    for (let i = 0; i < n; i++) {
      // Arrive, then hold for the remainder of this panel's slice.
      t.push(i / n, Math.min(1, (i + 0.58) / n));
      p.push(-i * panel, -i * panel);
    }
    // Strictly increasing, inside [0,1] — a range that repeats or dips outside
    // hands an invalid keyframe offset to the animation layer.
    for (let i = 1; i < t.length; i++) if (t[i] <= t[i - 1]) t[i] = t[i - 1] + 0.0001;
    return [t, p] as const;
  })();
  const x = useTransform(scrollYProgress, stops as number[], positions as number[]);

  if (reduced) {
    return (
      <section className={`section-pad bg-noir text-ivory ${className}`}>
        <div className="wrap grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <div key={s.number}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={s.src} alt={s.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <h3 className="mt-5 font-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ivory/70">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    // Height is the scroll budget: one screen to read each panel, plus one to
    // enter and leave.
    <section
      ref={ref}
      className={`relative bg-noir ${className}`}
      style={{ height: `${steps.length * 105 + 35}svh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Each panel is the whole screen: the photograph is the slide, and the
            copy sits on it. Inset cards read as a carousel; full-bleed frames
            read as film. */}
        <motion.div ref={trackRef} style={{ x }} className="flex h-full w-max">
          {steps.map((s, i) => (
            <Panel key={s.number} step={s} index={i} total={steps.length} progress={scrollYProgress} />
          ))}
        </motion.div>

        {/* Grain over the whole frame, not per panel, so it reads as one
            piece of film running rather than five images that each have
            texture of their own. */}
        <div className="pointer-events-none absolute inset-0 z-20 grain-overlay opacity-[0.18]" />
      </div>
    </section>
  );
}

/**
 * One full-screen frame.
 *
 * The copy reveals as the panel arrives rather than being present the whole
 * way across: each panel owns a slice of the section's scroll, and its text
 * rises and fades in over the first part of that slice. That is what stops a
 * long sideways track from feeling like a single wide image being dragged.
 */
function Panel({
  step,
  index,
  total,
  progress,
}: {
  step: HorizontalStep;
  index: number;
  total: number;
  progress: import("framer-motion").MotionValue<number>;
}) {
  const slice = 1 / total;
  const start = Math.max(0, index * slice - slice * 0.5);
  const mid = Math.min(1, index * slice + slice * 0.12);
  const opacity = useTransform(progress, [start, mid], [0, 1]);
  const y = useTransform(progress, [start, mid], [34, 0]);

  // This panel's own window, matching the track's timing exactly: it arrives at
  // `holdA`, is held through `holdB`, and is gone by `exit`. Measuring from the
  // real window is what keeps a frame at full brightness for the whole time it
  // is the one being looked at — a falloff wider than the hold dims the very
  // frame it is meant to be featuring.
  const holdA = index / total;
  const holdB = Math.min(1, (index + 0.58) / total);
  const enter = Math.max(0, holdA - 0.45 / total);
  const exit = Math.min(1, (index + 1) / total);
  const band = strictly([enter, holdA, holdB, exit]);

  // A slow push in across the hold, so a held frame is never quite a still.
  const scale = useTransform(progress, band, [index === 0 ? 1.06 : 1.1, 1.06, 1.0, 0.99]);
  // The photograph drifts against the track's travel. Two planes moving at
  // different rates is what gives a flat image depth.
  const imgX = useTransform(progress, band, ["5%", "2%", "-2%", "-5%"]);
  // Only the cut between frames darkens — never the frame being shown. The
  // first frame has no cut before it: its entry window is clamped against the
  // start of the section, so darkening it would just flash black at the moment
  // the section pins.
  const dim = useTransform(progress, band, [index === 0 ? 0 : 0.65, 0, 0, 0.65]);

  return (
    <article className="relative h-full w-screen shrink-0 overflow-hidden">
      <motion.div style={{ scale, x: imgX }} className="absolute -inset-x-[8%] inset-y-0">
        <Image
          src={step.src}
          alt={step.alt}
          fill
          sizes="120vw"
          priority={index === 0}
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-noir/25" />
      {/* Corners fall off, so the frame has a centre. */}
      <div className="pointer-events-none absolute inset-0 ambient-vignette opacity-60" />
      <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-noir" />


      <motion.div
        style={{ opacity, y }}
        className="absolute inset-x-0 bottom-0 px-6 pb-24 sm:px-10 sm:pb-28 lg:px-16"
      >
        <h3 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.04] text-ivory">
          {step.title}
        </h3>
        <p className="mt-5 max-w-[46ch] text-[0.98rem] leading-relaxed text-ivory/75">{step.body}</p>
      </motion.div>
    </article>
  );
}

/** Nudges a range to be strictly increasing, which interpolation requires. */
function strictly(values: number[]) {
  const out = [...values];
  for (let i = 1; i < out.length; i++) if (out[i] <= out[i - 1]) out[i] = out[i - 1] + 0.0001;
  return out;
}
