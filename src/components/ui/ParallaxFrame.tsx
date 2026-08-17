"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * A photograph that drifts against the page inside a fixed frame.
 *
 * The picture is taller than the box that shows it, and it slides across that
 * slack as the box crosses the viewport. What you get is not "a moving image"
 * — the motion is far too small to read as motion — but the frame behaving
 * like a window onto something set back from the page rather than a rectangle
 * printed on it. It is the cheapest depth cue there is, and unlike a pinned
 * section it costs no scroll length at all, which is why it can go on every
 * photograph on the page without the page becoming exhausting.
 *
 * Deliberately subtle. Past about 12% of overhang the eye starts tracking the
 * image instead of reading the copy beside it, and the effect stops being
 * atmosphere and starts being a distraction.
 *
 * Reduced motion gets the picture, still.
 */

/** Overhang above and below the frame, as a percentage of the frame's height. */
const OVER = 9;
/**
 * The travel, expressed against the *image's* height rather than the frame's,
 * because that is what a percentage `y` on the moving element means. The image
 * is `100 + 2·OVER` percent as tall as the frame, so a drift of one frame-
 * percent is this many image-percent.
 */
const TRAVEL = (OVER * 100) / (100 + 2 * OVER);

export default function ParallaxFrame({
  src,
  alt,
  sizes,
  focal,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  /** `object-position`, when the subject is not in the middle. */
  focal?: string;
  priority?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // The whole crossing, not just the part where the frame is pinned to
  // anything: 0 as it comes on from below, 1 as it leaves at the top. Measuring
  // over the full crossing is what keeps the drift at a constant rate — a range
  // tied to the frame's own edges would speed up and slow down with it.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // A clamped function, not a keyframe pair: handed stops and values,
  // framer-motion may hoist the value onto a scroll-linked Web Animations
  // timeline, where a range narrower than [0,1] does not hold at its endpoints.
  const y = useTransform(scrollYProgress, (p) => `${(0.5 - Math.min(1, Math.max(0, p))) * 2 * TRAVEL}%`);

  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      style={focal ? { objectPosition: focal } : undefined}
      className="object-cover"
    />
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {reduced ? (
        image
      ) : (
        <motion.div
          style={{ y, top: `-${OVER}%`, bottom: `-${OVER}%` }}
          className="absolute inset-x-0"
        >
          {image}
        </motion.div>
      )}
    </div>
  );
}
