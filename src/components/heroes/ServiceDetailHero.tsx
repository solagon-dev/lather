import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import { Statement } from "@/components/ui/Type";

/**
 * Ritual masthead: name, tagline, the three facts that decide the booking
 * (price, duration, who it suits), and the Book action — all above the fold.
 *
 * The spec is explicit that these should be visible without scrolling, which
 * is why this variant stays a split rather than becoming cinematic: a
 * full-bleed image would push the price and the button below the fold on
 * every laptop.
 */
export interface ServiceDetailHeroProps {
  name: string;
  tagline?: ReactNode;
  price: ReactNode;
  duration: ReactNode;
  bestFor?: ReactNode;
  description?: ReactNode;
  note?: ReactNode;
  image: { src: string; alt: string; focal?: string };
  actions?: ReactNode;
}

export default function ServiceDetailHero({
  name,
  tagline,
  price,
  duration,
  bestFor,
  description,
  note,
  image,
  actions,
}: ServiceDetailHeroProps) {
  return (
    <section className="border-b hairline bg-porcelain px-6 pt-32 sm:px-10 md:pt-40 lg:px-16">
      <div className="wrap grid gap-12 pb-16 md:grid-cols-[1.15fr_1fr] md:pb-24">
        <Reveal>
          <nav aria-label="Breadcrumb" className="text-[0.7rem] tracking-[0.02em] text-taupe">
            <Link href="/services" className="link-ul">
              Services
            </Link>{" "}
            / {name}
          </nav>

          <Statement as="h1" size="md" className="mt-6">
            {name}
          </Statement>

          {tagline && <p className="mt-4 font-display text-xl italic text-brass-dark">{tagline}</p>}

          {/* The decision row. tabular-nums keeps the price from shifting the
              rule when a ritual is priced "From $50". */}
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y hairline py-5 text-[0.75rem] tracking-[0.02em] text-umber">
            <div>
              <dt className="sr-only">Price</dt>
              <dd className="tabular-nums">{price}</dd>
            </div>
            <div>
              <dt className="sr-only">Duration</dt>
              <dd>{duration}</dd>
            </div>
            {bestFor && (
              <div>
                <dt className="sr-only">Best for</dt>
                <dd>{bestFor}</dd>
              </div>
            )}
          </dl>

          {description && <p className="mt-8 max-w-xl text-umber">{description}</p>}
          {note && <p className="mt-4 text-[0.85rem] italic text-taupe">{note}</p>}
          {actions && <div className="mt-10 flex flex-wrap gap-4">{actions}</div>}
        </Reveal>

        <Reveal delay={150} className="relative">
          <div className="arch relative mx-auto aspect-[3/4] w-full max-w-md md:max-w-none">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 768px) 45vw, 90vw"
              style={image.focal ? { objectPosition: image.focal } : undefined}
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
