import Link from "next/link";
import type { ReactNode } from "react";
import BookCTA from "@/components/BookCTA";
import PriceList from "@/components/PriceList";
import UtilityHero from "@/components/heroes/UtilityHero";
import Reveal from "@/components/Reveal";
import type { PriceGroup, PriceItem } from "@/lib/menu";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

/**
 * One page per service line — Facials, Massage, and each wellness treatment.
 *
 * The order is the order a visitor's questions arrive in: what is it, what
 * does it cost, how do I book it. Price sits directly under the explanation
 * rather than on a separate page, because "how much" is the question that
 * sends people away when it goes unanswered.
 */
export default function TreatmentLayout({
  pillar,
  path,
  name,
  tagline,
  image,
  intro,
  facts,
  prices,
  priceNote,
  book,
  related,
}: {
  pillar: { label: string; href: string };
  /** This page's own path, for the breadcrumb. */
  path: string;
  name: string;
  tagline: string;
  image: { src: string; alt: string; focal?: string };
  intro: string[];
  facts: string[];
  prices: { group: PriceGroup; items?: PriceItem[]; heading?: string };
  priceNote?: string;
  book: { url: string; label: string };
  related: { href: string; label: string }[];
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: pillar.label, path: pillar.href },
            { name, path },
          ])
        )}
      />
      <UtilityHero title={name} sub={tagline} aside={image} meta={<Link href={pillar.href} className="link-ul">{pillar.label}</Link>}>
        <a href={book.url} target="_blank" rel="noopener noreferrer" className="btn-solid">
          {book.label}
        </a>
      </UtilityHero>

      <section className="section-pad bg-porcelain">
        <div className="wrap grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal>
            {intro.map((p) => (
              <p key={p.slice(0, 32)} className="mb-6 max-w-[60ch] text-[1.05rem] leading-[1.75] text-umber last:mb-0">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-[0.7rem] uppercase tracking-[0.18em] text-brass-dark">Good to know</h2>
            <ul className="mt-5 border-t hairline">
              {facts.map((f) => (
                <li key={f} className="border-b hairline py-4 text-[0.95rem] text-ink">
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-t hairline bg-ivory">
        <div className="wrap">
          <PriceList group={prices.group} items={prices.items} heading={prices.heading ?? "Pricing"} showBook={false} />
          {priceNote && (
            <Reveal>
              <p className="mt-6 text-[0.9rem] text-taupe">{priceNote}</p>
            </Reveal>
          )}
          <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a href={book.url} target="_blank" rel="noopener noreferrer" className="btn-solid">
              {book.label}
            </a>
            <Link href="/pricing" className="btn-outline">
              All pricing
            </Link>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <nav aria-label={`More from ${pillar.label}`} className="border-t hairline bg-porcelain px-6 py-14 sm:px-10 lg:px-16">
          <div className="wrap flex flex-wrap items-baseline gap-x-10 gap-y-3">
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-taupe">Also at {pillar.label}</p>
            {related.map((r) => (
              <Link key={r.href} href={r.href} className="link-ul font-display text-xl">
                {r.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      <BookCTA />
    </>
  );
}

