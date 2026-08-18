import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import ParallaxFrame from "@/components/ui/ParallaxFrame";

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
        {/* The photograph drifts a little against the page as the section
            crosses, so the frame reads as a window rather than a printed
            rectangle. It costs no extra scroll, which is the only reason it
            can go on every split on the site. */}
        <ParallaxFrame
          src={src}
          alt={alt}
          focal={focal}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`min-h-[62svh] lg:min-h-[86svh] ${side === "right" ? "lg:order-2" : ""}`}
        />

        <div
          className={`flex flex-col justify-center px-6 py-20 sm:px-10 md:py-28 lg:px-16 lg:py-24 ${
            side === "right" ? "lg:order-1" : ""
          }`}
        >
          <Reveal>
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
