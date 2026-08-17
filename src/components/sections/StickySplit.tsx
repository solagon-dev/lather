"use client";

import Image from "next/image";
import { type ReactNode } from "react";
import Reveal from "@/components/Reveal";

/**
 * One photograph held still while a column of content moves past it.
 *
 * The asymmetry is the point. A normal two-column section scrolls as one block
 * and reads as a layout; pinning one side turns the page into two planes moving
 * at different rates, so the image behaves like a set the copy is walking
 * through. It also lets a single image be looked at for far longer than a
 * scrolling image ever gets — which is what you want for the one photograph
 * that is carrying a whole section.
 *
 * The pin is `position: sticky` inside a tall grid cell. Nothing hijacks the
 * wheel, so trackpads, keyboards, the scrollbar and assistive tech behave
 * exactly as they do everywhere else, and the section can be scrolled past at
 * speed without the effect swallowing input.
 *
 * Below `lg` it degrades to the obvious thing: image, then content, stacked.
 * A sticky pane needs a tall viewport beside it to be worth anything, and a
 * phone has neither the width nor the height.
 */

export interface StickySplitProps {
  src: string;
  alt: string;
  /** Which side is pinned. */
  side?: "left" | "right";
  /** A strip of smaller images running above the content. */
  strip?: { src: string; alt: string }[];
  children: ReactNode;
  tone?: "porcelain" | "ivory" | "noir";
  focal?: string;
  className?: string;
}

const TONE = {
  porcelain: "bg-porcelain text-ink",
  ivory: "bg-ivory text-ink",
  noir: "bg-noir text-ivory",
};

export default function StickySplit({
  src,
  alt,
  side = "left",
  strip,
  children,
  tone = "porcelain",
  focal,
  className = "",
}: StickySplitProps) {
  return (
    <section className={`${TONE[tone]} ${className}`}>
      <div className="grid items-start lg:grid-cols-2">
        {/* The pinned pane. `self-start` matters: a stretched grid item is as
            tall as the row, and a sticky element can never move within a box
            that is already the full height of its container. */}
        <div
          className={`relative hidden self-start lg:sticky lg:top-0 lg:block lg:h-[100svh] ${
            side === "right" ? "lg:order-2" : ""
          }`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="50vw"
            style={focal ? { objectPosition: focal } : undefined}
            className="object-cover"
          />
        </div>

        {/* The same photograph, in flow, for narrow screens. */}
        <div className="relative aspect-[4/5] lg:hidden">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            style={focal ? { objectPosition: focal } : undefined}
            className="object-cover"
          />
        </div>

        <div className={`${side === "right" ? "lg:order-1" : ""}`}>
          {strip && strip.length > 0 && (
            <div className="grid grid-cols-2 gap-px">
              {strip.slice(0, 2).map((s) => (
                <div key={s.src} className="relative aspect-[4/3]">
                  <Image src={s.src} alt={s.alt} fill sizes="25vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}

          <div className="flex min-h-[100svh] flex-col justify-center px-6 py-24 sm:px-10 lg:px-16">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The pull quote this section is usually built around: a large statement, then
 * the attribution set small underneath.
 */
export function SplitQuote({
  children,
  attribution,
  role,
}: {
  children: ReactNode;
  attribution: string;
  role?: string;
}) {
  return (
    <figure className="text-center">
      <Reveal>
        <blockquote className="font-body text-[clamp(1.35rem,2.4vw,2rem)] font-medium leading-[1.28] tracking-[-0.01em]">
          {children}
        </blockquote>
      </Reveal>
      <Reveal delay={160}>
        <figcaption className="mt-9 font-body text-[0.7rem] tracking-[0.02em] text-taupe">
          {attribution}
          {role && (
            <span className="mt-1 block font-display normal-case italic tracking-normal">
              {role}
            </span>
          )}
        </figcaption>
      </Reveal>
    </figure>
  );
}
