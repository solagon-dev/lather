import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import LineReveal from "@/components/ui/LineReveal";
import { Statement } from "@/components/ui/Type";

/**
 * Full-bleed media masthead, reserved for the two pages that are meant to feel
 * like an experience before they feel like information: the homepage and the
 * head spa ritual.
 *
 * Reserved is the operative word. Its impact comes entirely from being rare —
 * when every interior page opened this way, the treatment stopped reading as
 * emphasis and started reading as a template.
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

interface CinematicHeroPropsBase {
  src: string;
  alt?: string;
  sub?: ReactNode;
  focal?: string;
  children?: ReactNode;
}

type CinematicHeroProps = CinematicHeroPropsBase & HeroTitle;

export default function CinematicHero({
  src,
  alt = "",
  title,
  lines,
  sub,
  focal,
  children,
}: CinematicHeroProps) {
  return (
    <section className="relative flex min-h-[86svh] items-end overflow-hidden bg-noir">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        style={focal ? { objectPosition: focal } : undefined}
        className="object-cover"
      />
      {/* Bottom-weighted scrim: the type sits low, so the gradient does its
          work where the words are instead of flattening the whole frame. */}
      <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/55 to-noir/25" />

      <div className="relative z-10 w-full px-6 pb-16 pt-32 text-ivory sm:px-10 md:pb-24 lg:px-16">
        <div className="wrap">
          <Reveal>
            <Statement as="h1" size="lg" className="max-w-5xl">
              {lines ? <LineReveal lines={lines} /> : title}
            </Statement>
          </Reveal>
          {sub && (
            <Reveal delay={200}>
              <p className="mt-8 max-w-xl text-ivory/75">{sub}</p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={280} className="mt-10">
              {children}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
