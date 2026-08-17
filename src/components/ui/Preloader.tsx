"use client";

import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Em } from "@/components/ui/Type";

/**
 * The opening. A statement holds a small window onto the room; as the page
 * loads the window grows, and when it is full it opens into the hero.
 *
 * It is not a screen that gets taken away — the tile expands into exactly the
 * image the hero is already showing, so the overlay can simply fade and
 * nothing appears to change hands. The hero then plays the same move in
 * reverse on scroll (see CollapsingHero), which makes the opening feel like
 * one continuous zoom.
 *
 * Performance: progress lives in a MotionValue, not React state. Driving this
 * from state re-rendered the whole overlay sixty times a second and restarted
 * framer's tween on every one of those renders, which is what made the growth
 * visibly step rather than glide. Now the rAF loop writes one number, the tile
 * and the rule read it directly, and React re-renders only when the phase
 * changes — three times in the entire sequence.
 *
 * Three rules keep it from becoming the thing everyone hates about preloaders:
 *
 * 1. Homepage only, and once per session in production.
 * 2. Capped at ~1.9s and resolves regardless of network.
 * 3. Skipped entirely under prefers-reduced-motion, and it renders nothing on
 *    the server, so no markup has to be undone on hydration.
 */

const SEEN_KEY = "lather:intro-seen";
/** Must match the hero exactly so the hand-off is invisible — same still
 *  underneath, same clip over it, same opacity. */
const HERO_IMAGE = "/media/hero/hero-landscape.webp";
const HERO_VIDEO = "/media/video/hero-landscape.mp4";

type Phase = "loading" | "opening" | "done";

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("done");
  const pathname = usePathname();

  // The single source of truth for the whole animation.
  const progress = useMotionValue(0);
  const countRef = useRef<HTMLSpanElement>(null);

  const tileW = useTransform(progress, [0, 1], [150, 268]);
  const tileH = useTransform(tileW, (w) => w * 0.66);
  const ruleScale = useTransform(progress, [0, 1], [0, 1]);

  useEffect(() => {
    // The tile opens into the homepage hero image — on any other route it
    // expands into a picture that page never shows.
    if (pathname !== "/") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // "skip" is an explicit override that wins in every environment — it is
    // what automated visual checks set. Otherwise: once per session in
    // production, always in development so the thing being worked on is
    // actually visible.
    const seen = sessionStorage.getItem(SEEN_KEY);
    if (seen === "skip") return;
    if (seen && process.env.NODE_ENV === "production") return;

    sessionStorage.setItem(SEEN_KEY, "1");
    setPhase("loading");

    const started = performance.now();
    const DURATION = 1900;
    let raf = 0;
    let lastShown = -1;

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / DURATION);
      // ease-out so the count decelerates into 100 rather than snapping
      const eased = 1 - Math.pow(1 - t, 3);
      progress.set(eased);

      // Write the number straight to the DOM, and only when it changes.
      const shown = Math.round(eased * 100);
      if (shown !== lastShown && countRef.current) {
        countRef.current.textContent = String(shown);
        lastShown = shown;
      }

      if (t < 1) raf = requestAnimationFrame(tick);
      else setPhase("opening");
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pathname, progress]);

  // Retire the overlay on a timer once the tile has opened. This used to hang
  // off onAnimationComplete on the overlay itself, which deadlocked: that
  // element only has an `exit` animation, exit only runs once the phase leaves
  // "opening", and the phase was waiting on the callback.
  useEffect(() => {
    if (phase !== "opening") return;
    const EXPAND_MS = 1150;
    const t = setTimeout(() => setPhase("done"), EXPAND_MS + 100);
    return () => clearTimeout(t);
  }, [phase]);

  // The overlay owns the scrollbar while it is up.
  useEffect(() => {
    document.documentElement.style.overflow = phase !== "done" ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [phase]);

  const opening = phase === "opening";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-noir"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          aria-hidden
        >
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <motion.p
              className="font-display text-[clamp(1.75rem,4.4vw,3.4rem)] leading-[1.1] tracking-[-0.008em] text-ivory"
              animate={{ opacity: opening ? 0 : 1, y: opening ? -18 : 0 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              Where modern wellness
            </motion.p>

            {/* Space held in the flow so the two lines sit where they will
                stay; the tile itself is fixed and centred, so it grows to fill
                the screen from its own centre rather than springing to a
                corner the moment it leaves the flex column. */}
            <motion.div aria-hidden className="my-5 sm:my-7" style={{ width: tileW, height: tileH }} />

            <motion.p
              className="font-display text-[clamp(1.75rem,4.4vw,3.4rem)] leading-[1.1] tracking-[-0.008em] text-ivory"
              animate={{ opacity: opening ? 0 : 1, y: opening ? 18 : 0 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              meets <Em>elevated self-care.</Em>
            </motion.p>
          </div>

          <motion.div
            className="pointer-events-none fixed left-1/2 top-1/2 overflow-hidden bg-[#241d18]"
            style={
              opening
                ? { x: "-50%", y: "-50%" }
                : { x: "-50%", y: "-50%", width: tileW, height: tileH }
            }
            animate={opening ? { width: "100vw", height: "100vh" } : undefined}
            transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Plain <img>: this is the one image on the site that must be
                decoded before it is shown, and next/image's lazy pipeline
                would let the tile open onto an empty box. The clip rides on
                top of it at the same opacity the hero uses, so the tile is
                already showing the hero's exact composite before it opens. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover" />
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
          </motion.div>

          {/* count + rule along the bottom edge */}
          <motion.div
            className="absolute inset-x-5 bottom-6 sm:inset-x-10 sm:bottom-8"
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="mb-4 flex items-baseline justify-between">
              <span className="font-body text-[0.62rem] tracking-[0.02em] text-brass-light/70">
                Lather Spa &amp; Wellness
              </span>
              <span className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-none tabular-nums text-ivory">
                <span ref={countRef}>0</span>
                <span className="ml-1 align-top font-body text-[0.7rem] tracking-[0.02em] text-brass-light/70">
                  %
                </span>
              </span>
            </div>
            {/* scaleX rather than width: a transform is composited, so the rule
                advances without laying out the page on every frame. */}
            <div className="h-px w-full bg-ivory/15">
              <motion.div className="h-px origin-left bg-brass-light" style={{ scaleX: ruleScale }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
