"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import CoinScene from "@/components/three/CoinScene";
import Logo from "@/components/ui/Logo";

/**
 * The coin falling through a block of display type.
 *
 * The words hold still and the coin travels: it arrives at the top of the
 * frame, descends through every line, and leaves at the bottom. Each line opens
 * a channel as the coin reaches it and closes again once it has passed, so the
 * type is genuinely displaced by the object rather than printed around a hole.
 *
 * The channel width is `2·√(r² − d²)` — the chord of a circle at distance `d`
 * from its centre — which is the outline of the coin drawn in negative space by
 * the words. That is why it has to be computed rather than authored: a
 * hand-placed gap is only correct at one position, and this object is moving.
 *
 * It follows a spring-smoothed copy of the scroll. Raw scroll arrives as
 * discrete jumps, and a coin bound straight to it lurches; chasing a spring it
 * keeps moving between events and settles into every change of pace.
 */

export interface CoinLine {
  left: ReactNode;
  right: ReactNode;
}

export interface CoinStatementProps {
  lines: CoinLine[];
  className?: string;
}

/** The coin's diameter as a fraction of the viewport's smaller side. */
const COIN_VMIN = 0.2;

export default function CoinStatement({ lines, className = "" }: CoinStatementProps) {
  const ref = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const glide = useSpring(scrollYProgress, { stiffness: 62, damping: 27, mass: 1 });
  const coinProgress = useMotionNumber(glide);

  // The gap maths is in pixels, so the line box and the coin's real radius have
  // to be measured rather than assumed.
  const [m, setM] = useState({ lineH: 130, radius: 150, viewH: 900 });
  useLayoutEffect(() => {
    const measure = () => {
      const h = lineRef.current?.offsetHeight;
      const vmin = Math.min(window.innerWidth, window.innerHeight);
      setM({
        lineH: h && h > 8 ? h : 130,
        // CoinScene frames the disc at 92% of its canvas, so the box radius
        // overstates the metal — measure the metal, then add air on top.
        radius: ((vmin * COIN_VMIN) / 2) * 0.92 + vmin * 0.02,
        viewH: window.innerHeight,
      });
    };
    measure();
    const t = setTimeout(measure, 400);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Reveals just clear of the header and leaves below the frame.
  //
  // It must not start above the top edge: the navigation is fixed at z-50 and
  // the coin lives at z-20 inside the section, so anything entering from off
  // the top slides *underneath* the bar and wears the wordmark and the booking
  // button across its face. Beginning below the header — and arriving by
  // scaling up rather than by sliding in — keeps its face clear the whole way.
  const coinY = useTransform(glide, [0, 1], [m.viewH * 0.1, m.viewH * 1.16]);
  // Reveals as it arrives, and is gone by the time it clears the bottom.
  const coinOpacity = useTransform(glide, [0, 0.09, 0.9, 1], [0, 1, 1, 0]);
  const coinScale = useTransform(glide, [0, 0.09], [0.55, 1]);

  const blockH = lines.length * m.lineH;
  const blockTop = (m.viewH - blockH) / 2;
  const coinPx = `${COIN_VMIN * 100}vmin`;

  return (
    <section
      ref={ref}
      className={`relative bg-noir ${className}`}
      style={{ height: `${Math.max(200, lines.length * 44)}svh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 ambient-bloom-dark" />

        {/* The type, still. */}
        <div className="absolute inset-x-0 top-0 z-10" style={{ paddingTop: blockTop }}>
          {lines.map((l, i) => (
            <Line
              key={i}
              line={l}
              index={i}
              m={m}
              blockTop={blockTop}
              coinY={coinY}
              innerRef={i === 0 ? lineRef : undefined}
            />
          ))}
        </div>

        {/* The coin, falling through them. */}
        {/* The centring `-50%` has to live in the motion style, not in a
            `-translate-x-1/2` class. Framer writes the whole `transform`
            property from the values it is given, so a translate coming from CSS
            is silently overwritten and the coin sits exactly half its own width
            to the right of centre. */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-0 z-20"
          style={{
            width: coinPx,
            height: coinPx,
            x: "-50%",
            y: coinY,
            opacity: coinOpacity,
            scale: coinScale,
          }}
        >
          <CoinScene
            progress={coinProgress}
            className="h-full w-full"
            fallback={
              <span className="flex h-full w-full items-center justify-center rounded-full bg-brass/25">
                <Logo variant="mark" className="h-[58%] w-auto text-brass-light" title="" />
              </span>
            }
          />
        </motion.div>
      </div>
    </section>
  );
}

function Line({
  line,
  index,
  m,
  blockTop,
  coinY,
  innerRef,
}: {
  line: CoinLine;
  index: number;
  m: { lineH: number; radius: number; viewH: number };
  blockTop: number;
  coinY: MotionValue<number>;
  innerRef?: React.Ref<HTMLSpanElement>;
}) {
  // Where this line sits, against where the coin currently is.
  //
  // The distance that matters is from the coin's centre to the nearest edge of
  // the line's *ink band*, not to the line's centre. A line is not a hairline —
  // it is as tall as its glyphs — so while the coin's centre is anywhere inside
  // that band the words have to clear the coin's full diameter, and measuring
  // to the centre instead lets the widest part of the coin sit inside letters
  // that have already begun closing. Clamping the distance to zero across the
  // band is what makes the type track the rim exactly rather than approximately.
  const gap = useTransform(coinY, (y) => {
    const centre = blockTop + index * m.lineH + m.lineH / 2;
    const half = m.lineH * 0.42;
    const cy = y + m.radius;
    const d = cy < centre - half ? centre - half - cy : cy > centre + half ? cy - centre - half : 0;
    // Never fully closed: the halves are separate words and still need a space.
    const space = m.lineH * 0.22;
    if (d >= m.radius) return space;
    return Math.max(space, 2 * Math.sqrt(m.radius * m.radius - d * d));
  });

  return (
    <motion.span
      ref={innerRef}
      className="flex w-full items-center justify-center whitespace-nowrap px-4 font-display text-[clamp(2.2rem,9.4vw,8.5rem)] leading-[1.04] tracking-[-0.025em] text-ivory"
    >
      {/* Equal-width halves (`min-w-0` defeats min-width:auto) so the channel
          stays on the section's centre line whatever the two phrases weigh.

          Each half is itself a flex box rather than a text-aligned one, and
          that is load-bearing: `text-align` has no effect on inline content
          wider than its box, and overflowing LTR text always spills to the
          *right*. So a right-aligned left half quietly overflowed rightward,
          straight into the channel and under the coin. `justify-end` puts the
          overflow on the outside edge, where the section clips it, and leaves
          the inner edge pinned exactly to the gap. */}
      <span className="flex min-w-0 flex-1 basis-0 justify-end">{line.left}</span>
      <motion.span aria-hidden className="shrink-0" style={{ width: gap }} />
      <span className="flex min-w-0 flex-1 basis-0 justify-start">{line.right}</span>
    </motion.span>
  );
}

/** Mirrors a MotionValue into React state so the canvas can read a plain number. */
function useMotionNumber(value: MotionValue<number>) {
  const [n, setN] = useState(0);
  useEffect(() => value.on("change", setN), [value]);
  return n;
}
