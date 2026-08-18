"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * A gallery whose columns travel at different rates as you scroll.
 *
 * The grid is static; the movement is entirely differential — each column
 * drifts up or down at its own speed, so the composition reshuffles the whole
 * way past rather than arriving once and sitting still. Alternating direction
 * is what makes it read as a moving field instead of a block sliding.
 *
 * Everything moves on `y` only, which the compositor can handle without
 * laying out the page, so a dozen images in motion cost the same as one.
 *
 * Reduced motion gets the same grid, still — the arrangement is the point, the
 * drift is the flourish.
 */

export interface MatrixTile {
  src: string;
  alt: string;
  /** Tailwind aspect utility, e.g. "aspect-[3/4]". */
  ratio?: string;
  focal?: string;
}

export default function MatrixGallery({
  tiles,
  cta,
  className = "",
}: {
  tiles: MatrixTile[];
  cta?: { href: string; label: string };
  className?: string;
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

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Four columns, dealt round-robin so the source order still reads left to
  // right across the top.
  const columns: MatrixTile[][] = [[], [], [], []];
  tiles.forEach((t, i) => columns[i % 4].push(t));

  // Outer columns travel furthest, inner ones barely move — the field has a
  // centre rather than shearing uniformly.
  const speeds = [-150, 70, -60, 140];

  return (
    <section ref={ref} className={`overflow-hidden bg-porcelain py-20 sm:py-24 ${className}`}>
      <div className="wrap px-5 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
          {columns.map((col, ci) => (
            <Column key={ci} tiles={col} progress={scrollYProgress} speed={reduced ? 0 : speeds[ci]} />
          ))}
        </div>

        {cta && (
          <div className="mt-16 flex justify-center">
            <Link href={cta.href} className="pill-light ring-1 ring-ink/10">
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function Column({
  tiles,
  progress,
  speed,
}: {
  tiles: MatrixTile[];
  progress: MotionValue<number>;
  speed: number;
}) {
  const y = useTransform(progress, [0, 1], [speed, -speed]);
  return (
    <motion.div style={{ y }} className="flex flex-col gap-3 sm:gap-4 md:gap-5">
      {tiles.map((t) => (
        <div key={t.src} className={`relative overflow-hidden ${t.ratio ?? "aspect-[3/4]"}`}>
          <Image
            src={t.src}
            alt={t.alt}
            fill
            sizes="(min-width: 768px) 24vw, 46vw"
            style={t.focal ? { objectPosition: t.focal } : undefined}
            className="object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
}
