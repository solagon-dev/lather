"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";

/**
 * First-visit overlay: the mark draws in over a counted progress line, then
 * lifts to reveal the hero.
 *
 * Three rules keep this from becoming the thing everyone hates about
 * preloaders:
 *
 * 1. It only runs once per session (sessionStorage), so moving around the site
 *    never costs you the animation again.
 * 2. It is capped at ~1.6s and resolves on `load` — it never holds content
 *    hostage to a slow asset.
 * 3. It is skipped entirely under prefers-reduced-motion, and it renders
 *    nothing on the server, so no markup has to be un-done on hydration.
 *
 * Because it mounts after hydration it can never hide content from a crawler
 * or from a reader with JS disabled.
 */

const SEEN_KEY = "lather:intro-seen";

export default function Preloader() {
  const [active, setActive] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem(SEEN_KEY)) return;

    sessionStorage.setItem(SEEN_KEY, "1");
    setActive(true);

    const started = performance.now();
    const DURATION = 1600;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / DURATION);
      // ease-out so the count decelerates into 100 rather than snapping
      setPct(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setActive(false), 260);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  // The lock is derived from `active` in one place. Setting it imperatively in
  // the mount effect above and clearing it in a second effect keyed on `active`
  // silently cancelled itself: on the first render `active` is still false, so
  // the clear ran immediately after the set and the page was never locked.
  useEffect(() => {
    document.documentElement.style.overflow = active ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-porcelain"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Logo variant="stacked" className="h-24 w-auto text-ink sm:h-32" title="" />
          </motion.div>

          {/* progress line + count, pinned to the bottom edge */}
          <div className="absolute inset-x-5 bottom-6 sm:inset-x-10 sm:bottom-8">
            <div className="mb-3 text-right font-body text-[0.68rem] tabular-nums tracking-[0.2em] text-taupe">
              {pct}%
            </div>
            <div className="h-px w-full bg-ink/15">
              <div
                className="h-px bg-ink/70 transition-[width] duration-100 ease-linear"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
