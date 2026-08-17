"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";
import LineReveal from "@/components/ui/LineReveal";

/**
 * The display voice: enormous roman capitals with lowercase italic connectives.
 *
 * The contrast is the whole device. The load-bearing words are set as upright
 * capitals and the joining words — *where*, *meets*, *without* — stay lowercase
 * italic, so a line reads as one spoken phrase with its emphasis already built
 * in rather than as a headline in a single uniform weight. Capitalisation is
 * applied in CSS, not typed into the copy, so the underlying text stays
 * readable to screen readers and searchable in source.
 *
 * Sized in `vw` on purpose. This type is meant to run nearly the full width of
 * the viewport at any size, which a fixed ramp cannot do; the clamp only stops
 * it collapsing on phones and running away on very wide displays.
 *
 * Lines arrive on a masked reveal, one after another, which is what gives the
 * device its weight — the words rise into place instead of appearing.
 */

export interface CinematicHeadingProps {
  /** Each entry is one line. Wrap connectives in <Soft> for the italic voice. */
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  /** `full` runs edge to edge and may crop; `contained` stays inside the wrap. */
  width?: "full" | "contained";
  align?: "left" | "center";
  tone?: "ink" | "ivory";
  /**
   * Drives the reveal from scroll instead of from entering the viewport.
   *
   * Inside a pinned section every line is technically on screen from the
   * moment the section mounts, so a viewport-triggered reveal fires once,
   * invisibly, long before the beat is actually shown — and the words then
   * simply appear. Handing the component a 0–1 value lets each line rise out
   * of its mask in sequence, in step with the scroll that revealed it.
   */
  reveal?: MotionValue<number>;
  className?: string;
}

export default function CinematicHeading({
  lines,
  as: Tag = "h2",
  width = "contained",
  align = "center",
  tone = "ink",
  reveal,
  className = "",
}: CinematicHeadingProps) {
  const size =
    width === "full"
      ? "text-[clamp(2.6rem,10.5vw,11rem)]"
      : "text-[clamp(2.2rem,7.6vw,8rem)]";

  return (
    <Tag
      className={`font-display ${size} leading-[0.9] tracking-[-0.022em] ${
        tone === "ivory" ? "text-ivory" : "text-ink"
      } ${align === "center" ? "text-center" : "text-left"} ${
        width === "full" ? "whitespace-nowrap" : ""
      } ${className}`}
    >
      {reveal ? (
        lines.map((l, i) => (
          <ScrollLine key={i} index={i} total={lines.length} reveal={reveal}>
            {l}
          </ScrollLine>
        ))
      ) : (
        <LineReveal lines={lines} stagger={110} />
      )}
    </Tag>
  );
}

/**
 * One line, rising out of its own mask as `reveal` runs 0 → 1.
 *
 * The mask is a plain `overflow-hidden` wrapper; the line translates from fully
 * below it to home. Lines are staggered across the first part of the range so
 * the phrase assembles top-down rather than arriving as a block.
 */
function ScrollLine({
  children,
  index,
  total,
  reveal,
}: {
  children: ReactNode;
  index: number;
  total: number;
  reveal: MotionValue<number>;
}) {
  const step = 0.22 / Math.max(1, total);
  const start = index * step;
  const end = start + 0.78;
  const y = useTransform(reveal, [start, end], ["112%", "0%"]);
  const opacity = useTransform(reveal, [start, start + 0.2], [0, 1]);
  return (
    // The mask needs room for descenders, or the tails of y/g/p are shaved off
    // by the very box that is supposed to be revealing them.
    <span className="block overflow-hidden pb-[0.16em]">
      <motion.span style={{ y, opacity }} className="block">
        {children}
      </motion.span>
    </span>
  );
}

/**
 * A connective word inside a CinematicHeading: lowercase, italic, and slightly
 * smaller so the capitals stay the line's structure.
 *
 * `normal-case` matters — the heading uppercases everything, and these words
 * only do their job if they opt back out of it.
 */
export function Soft({ children }: { children: ReactNode }) {
  return <em className="font-display text-[0.86em] normal-case italic tracking-[-0.01em]">{children}</em>;
}
