"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import FountainMark3D from "@/components/three/FountainMark3D";
import Logo from "@/components/ui/Logo";

/**
 * The mark as a brass object at the foot of the page, with the name moulded
 * around it.
 *
 * Two motions, both driven by the same scroll value so they read as one
 * mechanism: the object turns on its X axis — tipping from face-on to edge-on
 * and back, which is what makes an extruded mark look genuinely solid — while
 * the ring of type counter-rotates around it.
 *
 * The ring is real characters on a real circle: each glyph is rotated into
 * place about a shared centre and tipped with the ring, so the text appears to
 * wrap the object in three dimensions rather than sit flat on top of it. It
 * stays crisp at any size because nothing is baked into an image.
 *
 * The ring is decorative and hidden from assistive tech — the name is exposed
 * once, as a sentence, rather than a hundred times letter by letter.
 */

const RING_TEXT = "LATHER SPA & WELLNESS · GREENVILLE, NORTH CAROLINA · ";
const REPEATS = 2;

export default function OrbitingMark({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const markProgress = useMotionNumber(scrollYProgress);

  // The ring turns about the page normal, and tips with the object so the two
  // share a horizon.
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-52, 52]);
  const ringTiltDeg = useTransform(scrollYProgress, [0, 1], [58, -58]);

  const chars = RING_TEXT.repeat(REPEATS).split("");
  const step = 360 / chars.length;

  return (
    <section ref={ref} className={`relative overflow-hidden bg-noir py-24 sm:py-32 ${className}`}>
      <div
        className="relative mx-auto flex aspect-square w-[min(80vw,32rem)] items-center justify-center"
        style={{ ["--ring-r" as string]: "calc(min(40vw, 16rem) - 1.2rem)" }}
      >
        {/* the object — X-axis spin */}
        <FountainMark3D
          progress={markProgress}
          rise={0.3}
          yaw={0.5}
          pitch={Math.PI * 1.6}
          color="#C9AE7E"
          className="h-[68%] w-[68%]"
          fallback={<Logo variant="mark" className="h-[50%] w-auto" title="" />}
        />

        {/* the ring, tipped into the same perspective as the object */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            rotate: ringRotate,
            rotateX: ringTiltDeg,
            transformPerspective: 900,
            transformStyle: "preserve-3d",
          }}
          aria-hidden
        >
          {chars.map((ch, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 font-body text-[0.6rem] tracking-[0.02em] text-ivory/70 sm:text-[0.7rem]"
              style={{
                // centre the glyph, swing it to its angle, then push it out to
                // the radius along its own (now rotated) vertical axis
                transform: `translate(-50%, -50%) rotate(${i * step}deg) translateY(calc(var(--ring-r) * -1))`,
              }}
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
        </motion.div>

        {/* the name, once, for anything that reads rather than looks */}
        <span className="sr-only">Lather Spa &amp; Wellness — Greenville, North Carolina</span>
      </div>
    </section>
  );
}

/** Mirrors a MotionValue into React state so the canvas can read a plain number. */
function useMotionNumber(value: MotionValue<number>) {
  const [n, setN] = useState(0);
  useEffect(() => value.on("change", setN), [value]);
  return n;
}
