import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import LineReveal from "@/components/ui/LineReveal";
import { Kicker, Statement } from "@/components/ui/Type";

/**
 * Compact typographic masthead — the default for pages people arrive at with
 * an errand rather than an appetite: booking, questions, directions, the
 * service index.
 *
 * There is no large emotional image on purpose. A full-bleed photograph on
 * /book or /faq delays the thing the visitor came for by most of a screen, and
 * when every interior page opens with one the site stops having a hierarchy at
 * all. This variant earns its keep by being short.
 *
 * `aside` is a small inset image for the pages that want a note of atmosphere
 * (Visit) without becoming cinematic; `meta` is a single line of facts (drive
 * time, count) that belongs with the title rather than in the body.
 */

/**
 * A hero takes either a ready-made `title` or pre-split `lines` for the masked
 * reveal — never both, and never neither. Expressing that as a union rather
 * than two optional props means a hero can't be rendered with no heading at
 * all, and can't be given two competing ones.
 */
type HeroTitle =
  | { title: ReactNode; lines?: never }
  | { lines: ReactNode[]; title?: never };

interface UtilityHeroPropsBase {
  sub?: ReactNode;
  kicker?: ReactNode;
  meta?: ReactNode;
  aside?: { src: string; alt: string; focal?: string };
  children?: ReactNode;
}

type UtilityHeroProps = UtilityHeroPropsBase & HeroTitle;

export default function UtilityHero({
  title,
  lines,
  sub,
  kicker,
  meta,
  aside,
  children,
}: UtilityHeroProps) {
  const text = (
    <>
      {kicker && (
        <Reveal>
          <Kicker className="text-brass-dark">{kicker}</Kicker>
        </Reveal>
      )}
      <Reveal delay={kicker ? 90 : 0} className={kicker ? "mt-6" : ""}>
        <Statement as="h1" size="md">
          {lines ? <LineReveal lines={lines} /> : title}
        </Statement>
      </Reveal>
      {sub && (
        <Reveal delay={180}>
          <p className="mt-6 max-w-[54ch] text-umber">{sub}</p>
        </Reveal>
      )}
      {meta && (
        <Reveal delay={240}>
          <p className="mt-6 border-t hairline pt-5 text-[0.72rem] uppercase tracking-wideish text-taupe">
            {meta}
          </p>
        </Reveal>
      )}
      {children && (
        <Reveal delay={300} className="mt-9">
          {children}
        </Reveal>
      )}
    </>
  );

  return (
    <section className="border-b hairline bg-porcelain px-6 pb-16 pt-32 sm:px-10 md:pb-20 md:pt-40 lg:px-16">
      {aside ? (
        <div className="wrap grid items-center gap-10 md:grid-cols-[1.35fr_1fr] md:gap-14">
          <div>{text}</div>
          <Reveal delay={220} className="relative">
            <div className="relative aspect-[5/4] w-full overflow-hidden">
              <Image
                src={aside.src}
                alt={aside.alt}
                fill
                priority
                sizes="(min-width: 768px) 38vw, 100vw"
                style={aside.focal ? { objectPosition: aside.focal } : undefined}
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      ) : (
        <div className="wrap max-w-4xl">{text}</div>
      )}
    </section>
  );
}
