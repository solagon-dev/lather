import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export interface ServiceCard {
  href: string;
  title: string;
  body: string;
  /** e.g. "From $100" — the one number people scan for. */
  price?: string;
  image: { src: string; alt: string; focal?: string };
}

/**
 * A row of service doors. Each card is one link: photograph, name, a line of
 * what it is, and where its pricing starts.
 *
 * `rail` turns the phone layout into one swipeable row instead of a stack —
 * for pages like home that only preview the services, where four full-width
 * portrait cards would cost three screens of scrolling.
 */
export default function ServiceCards({
  cards,
  columns = 3,
  rail = false,
}: {
  cards: ServiceCard[];
  columns?: 2 | 3 | 4;
  rail?: boolean;
}) {
  const grid = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  const layout = rail
    ? "-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:gap-x-8 sm:gap-y-12 sm:overflow-visible sm:px-0 sm:pb-0"
    : "grid gap-x-8 gap-y-12";
  return (
    <ul className={`${layout} ${grid}`}>
      {cards.map((c, i) => (
        <Reveal key={c.href} as="li" delay={i * 80} className={rail ? "w-[78%] shrink-0 snap-start sm:w-auto" : undefined}>
          <Link href={c.href} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden bg-bone">
              <Image
                src={c.image.src}
                alt={c.image.alt}
                fill
                sizes={columns === 4 ? "(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 100vw" : "(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 100vw"}
                style={c.image.focal ? { objectPosition: c.image.focal } : undefined}
                className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl transition-colors group-hover:text-brass-dark">{c.title}</h3>
              {c.price && <span className="shrink-0 text-[0.8rem] text-brass-dark">{c.price}</span>}
            </div>
            <p className="mt-2 max-w-[42ch] text-[0.92rem] leading-relaxed text-umber">{c.body}</p>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
