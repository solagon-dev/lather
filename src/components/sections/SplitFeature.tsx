import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import { Kicker } from "@/components/ui/Type";

/**
 * A photograph running to one screen edge, with a text column beside it.
 *
 * The image is deliberately not inset: it bleeds off its own side of the page
 * so the composition feels like a spread rather than a two-column grid. The
 * text column keeps the normal container padding on its outer side, which is
 * what stops the pairing from looking accidental.
 */
interface SplitFeatureProps {
  src: string;
  alt: string;
  /** Which edge the photo runs to. */
  side?: "left" | "right";
  kicker?: ReactNode;
  children: ReactNode;
  body?: ReactNode;
  actions?: ReactNode;
  tone?: "porcelain" | "ivory" | "bone" | "noir";
  focal?: string;
  className?: string;
}

const TONE = {
  porcelain: "bg-porcelain text-ink",
  ivory: "bg-ivory text-ink",
  bone: "bg-bone text-ink",
  noir: "bg-noir text-ivory",
};

export default function SplitFeature({
  src,
  alt,
  side = "left",
  kicker,
  children,
  body,
  actions,
  tone = "porcelain",
  focal,
  className = "",
}: SplitFeatureProps) {
  const dark = tone === "noir";
  return (
    <section className={`overflow-hidden ${TONE[tone]} ${className}`}>
      <div className="grid items-stretch lg:grid-cols-2">
        <div
          className={`relative min-h-[62svh] lg:min-h-[86svh] ${side === "right" ? "lg:order-2" : ""}`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={focal ? { objectPosition: focal } : undefined}
            className="object-cover"
          />
        </div>

        <div
          className={`flex flex-col justify-center px-6 py-20 sm:px-10 md:py-28 lg:px-16 lg:py-24 ${
            side === "right" ? "lg:order-1" : ""
          }`}
        >
          {kicker && (
            <Reveal>
              <Kicker className={dark ? "text-brass-light" : "text-brass-dark"}>{kicker}</Kicker>
            </Reveal>
          )}
          <Reveal delay={kicker ? 90 : 0} className={kicker ? "mt-6" : ""}>
            {children}
          </Reveal>
          {body && (
            <Reveal delay={180} className="mt-8">
              <div className={dark ? "text-ivory/70" : "text-umber"}>{body}</div>
            </Reveal>
          )}
          {actions && (
            <Reveal delay={260} className="mt-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">{actions}</div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
