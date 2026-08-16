import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

/**
 * An irregular grid of small photographs — the "step inside" board.
 *
 * The irregularity is the point: tiles vary in aspect and carry per-column
 * vertical offsets so the grid reads as a considered arrangement rather than a
 * spreadsheet. The offsets are declared per tile instead of by nth-child so a
 * given photo always lands in the same place regardless of how many are passed.
 *
 * Tiles are decorative-adjacent but still described, because they are the only
 * look inside the space a visitor gets before booking.
 */
export interface MoodTile {
  src: string;
  alt: string;
  /** Tailwind aspect utility, e.g. "aspect-[3/4]" */
  ratio?: string;
  /** Tailwind translate utility applied from md up, e.g. "md:translate-y-8" */
  offset?: string;
  focal?: string;
}

interface MoodGridProps {
  tiles: MoodTile[];
  cta?: { href: string; label: string };
  className?: string;
}

export default function MoodGrid({ tiles, cta, className = "" }: MoodGridProps) {
  return (
    <section className={`section-pad-tight bg-porcelain ${className}`}>
      <div className="wrap">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
          {tiles.map((t, i) => (
            <Reveal key={t.src} delay={i * 70} className={t.offset ?? ""}>
              <div className={`relative overflow-hidden ${t.ratio ?? "aspect-[3/4]"}`}>
                <Image
                  src={t.src}
                  alt={t.alt}
                  fill
                  sizes="(min-width: 768px) 24vw, 46vw"
                  style={t.focal ? { objectPosition: t.focal } : undefined}
                  className="object-cover transition-transform duration-[1.4s] ease-luxe hover:scale-[1.05]"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {cta && (
          <Reveal delay={200} className="mt-14 flex justify-center">
            <Link href={cta.href} className="pill-light ring-1 ring-ink/10">
              {cta.label}
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
