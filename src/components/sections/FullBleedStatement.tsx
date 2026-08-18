import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

/**
 * A full-height photograph carrying one line of type.
 *
 * The device that gives the page its rhythm: between the reading sections, the
 * screen empties out to a single image and a single sentence. Because it is one
 * line and one image, the caption can sit at the optical centre and the section
 * needs no heading structure of its own — pass `as="h2"` only when the line is
 * genuinely the section's heading.
 *
 * `priority` should be set on the first one in the document (it is the LCP);
 * every other instance stays lazy.
 */
interface FullBleedStatementProps {
  src: string;
  alt?: string;
  children: ReactNode;
  /** How dark the scrim over the photo is. Statement type is ivory, so this is what buys its contrast. */
  scrim?: "soft" | "medium" | "strong";
  height?: "screen" | "tall" | "short";
  priority?: boolean;
  /** object-position for the photo, e.g. "50% 30%" */
  focal?: string;
  className?: string;
}

const SCRIM = {
  soft: "bg-noir/35",
  medium: "bg-noir/50",
  strong: "bg-noir/65",
};

const HEIGHT = {
  screen: "min-h-[100svh]",
  tall: "min-h-[78svh]",
  short: "min-h-[56svh] md:min-h-[62svh]",
};

export default function FullBleedStatement({
  src,
  alt = "",
  children,
  scrim = "medium",
  height = "tall",
  priority = false,
  focal,
  className = "",
}: FullBleedStatementProps) {
  return (
    <section className={`relative flex items-center justify-center overflow-hidden ${HEIGHT[height]} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        style={focal ? { objectPosition: focal } : undefined}
        className="object-cover"
      />
      <div className={`absolute inset-0 ${SCRIM[scrim]}`} />
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16">
        <Reveal className="wrap text-center text-ivory">{children}</Reveal>
      </div>
    </section>
  );
}
