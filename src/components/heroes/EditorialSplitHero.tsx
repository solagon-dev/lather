import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import LineReveal from "@/components/ui/LineReveal";
import { Statement } from "@/components/ui/Type";

/**
 * Asymmetric image-and-text masthead, for the pages whose subject is a
 * particular thing you should be looking at while you read: the founders, the
 * gift card.
 *
 * The image column is intentionally the wider one and runs to the page edge —
 * an inset, evenly-split hero reads as a content block, not as an opening. The
 * text column keeps the container's outer padding so the asymmetry looks
 * chosen rather than broken.
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

interface EditorialSplitHeroPropsBase {
  src: string;
  alt: string;
  sub?: ReactNode;
  /** Which edge the photograph runs to. */
  side?: "left" | "right";
  focal?: string;
  children?: ReactNode;
}

type EditorialSplitHeroProps = EditorialSplitHeroPropsBase & HeroTitle;

export default function EditorialSplitHero({
  src,
  alt,
  title,
  lines,
  sub,
  side = "right",
  focal,
  children,
}: EditorialSplitHeroProps) {
  return (
    <section className="overflow-hidden border-b hairline bg-porcelain">
      <div className="grid items-stretch lg:grid-cols-[1fr_1.15fr]">
        <div
          className={`flex flex-col justify-center px-6 pb-14 pt-32 sm:px-10 md:pb-20 md:pt-40 lg:px-16 lg:py-32 ${
            side === "left" ? "lg:order-2" : ""
          }`}
        >
          <Reveal>
            <Statement as="h1" size="md">
              {lines ? <LineReveal lines={lines} /> : title}
            </Statement>
          </Reveal>
          {sub && (
            <Reveal delay={180}>
              <p className="mt-6 max-w-[52ch] text-umber">{sub}</p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={260} className="mt-9">
              {children}
            </Reveal>
          )}
        </div>

        <Reveal
          delay={140}
          className={`relative min-h-[52svh] lg:min-h-[80svh] ${side === "left" ? "lg:order-1" : ""}`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 54vw, 100vw"
            style={focal ? { objectPosition: focal } : undefined}
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
