"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ParallaxFrame from "@/components/ui/ParallaxFrame";
import { Kicker, Statement } from "@/components/ui/Type";
import type { Pillar } from "@/lib/menu";

/**
 * The two pillars, shown as a diptych.
 *
 * The brand's whole thesis is that two practices which usually live in
 * separate buildings sit here under one roof and one standard. The previous
 * layout — two mirrored image/text splits stacked one above the other — buried
 * that: it read as two ordinary content rows that happened to be adjacent, and
 * you had to already know they were a pair to see them as one.
 *
 * A diptych says it in the layout itself. The two pillars are one section, two
 * equal columns, meeting at a single hairline seam — the roof line made
 * literal. You take them in together and at a glance, which is the argument.
 *
 * It is deliberately *not* pinned. It sits between the robe sequence and the
 * ritual film, both of which pin and move; a third kinetic section there would
 * leave the page with no rest in it. This is the still beat between them —
 * architectural rather than cinematic. Its only motion is a slow opposite
 * drift on the two photographs, which leans them fractionally toward each
 * other, and the seam drawing down the middle as the section arrives.
 */
export default function PillarDiptych({
  pillars,
  kicker,
  heading,
}: {
  pillars: Pillar[];
  kicker: string;
  /** The centred display line above the diptych. */
  heading: React.ReactNode;
}) {
  return (
    <section className="section-pad overflow-hidden bg-porcelain">
      <div className="wrap">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Kicker className="text-brass-dark">{kicker}</Kicker>
          <Statement as="h2" size="md" className="mt-4">
            {heading}
          </Statement>
        </Reveal>

        {/* The seam is a real grid gap the section colour shows through, plus a
            drawn hairline over it. `items-start` so a taller column never
            stretches the other's image to match — each keeps its own crop. */}
        <div className="relative mt-16 grid items-start gap-x-12 gap-y-16 lg:mt-20 lg:grid-cols-2 lg:gap-x-16">
          {/* The roof line. Drawn top-down as the section enters, and only
              where the two columns actually sit side by side — on a stacked
              phone layout a vertical rule down the middle would cut through
              the content, so it is hidden below lg. */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 origin-top bg-ink/12 lg:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />

          {pillars.map((pillar, i) => (
            <Panel key={pillar.key} pillar={pillar} invert={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Panel({ pillar, invert }: { pillar: Pillar; invert: boolean }) {
  return (
    <div className="flex flex-col">
      <Reveal delay={invert ? 120 : 0}>
        <ParallaxFrame
          src={pillar.image}
          alt={pillar.label}
          focal={pillar.imagePosition}
          invert={invert}
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="aspect-[4/5]"
        />
      </Reveal>

      <Reveal delay={invert ? 220 : 100} className="mt-8 lg:mt-10">
        <div className="flex items-center gap-3">
          <p className="font-body text-[0.72rem] uppercase tracking-[0.18em] text-brass-dark">
            {pillar.tagline}
          </p>
          {pillar.comingSoon && (
            <span className="rounded-full border border-brass-dark/40 px-2.5 py-0.5 font-body text-[0.6rem] uppercase tracking-[0.16em] text-brass-dark">
              Opening soon
            </span>
          )}
        </div>
        <h3 className="mt-3 font-display text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.02]">
          {pillar.label}
        </h3>
        <p className="mt-5 max-w-[44ch] text-[1.02rem] leading-[1.7] text-umber">{pillar.intro}</p>

        <ul className="mt-8 flex flex-wrap gap-2">
          {pillar.items.map((item) => (
            <li
              key={item.name}
              className="border hairline px-3 py-1.5 text-[0.72rem] tracking-[0.015em] text-umber"
            >
              {item.name}
            </li>
          ))}
        </ul>

        <Link
          href={pillar.href}
          className="mt-9 inline-flex items-center gap-2 font-body text-[0.8rem] font-medium tracking-[0.02em] text-ink link-ul"
        >
          {pillar.comingSoon ? `Preview ${pillar.label}` : `View ${pillar.label}`}
          <span aria-hidden>&rarr;</span>
        </Link>
      </Reveal>
    </div>
  );
}
