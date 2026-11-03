import type { Metadata } from "next";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import UtilityHero from "@/components/heroes/UtilityHero";
import Reveal from "@/components/Reveal";
import ServiceCards from "@/components/ServiceCards";
import { Em } from "@/components/ui/Type";
import { BOOK_URL, hours } from "@/lib/business";
import { couplesRetreat, pillars, spaCards } from "@/lib/menu";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

const spa = pillars.find((p) => p.key === "spa")!;

export const metadata: Metadata = {
  title: "Spa in Greenville, NC — Head Spa, Facials & Massage",
  description:
    "Lather Spa in Greenville, NC: Japanese head spa rituals, Glo2Facials and therapeutic and prenatal massage, in a private, quiet space. Book online.",
  alternates: { canonical: "/spa" },
};

export default function SpaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Spa", path: "/spa" },
          ])
        )}
      />
      <UtilityHero
        title={
          <>
            Lather <Em>Spa</Em>
          </>
        }
        sub={spa.intro}
        aside={{ src: "/media/pages/book-hero.webp", alt: "A guest resting during a treatment at Lather Spa" }}
      >
        <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-solid">
          Book the Spa
        </a>
      </UtilityHero>

      <section className="section-pad bg-porcelain">
        <div className="wrap">
          <ServiceCards cards={spaCards} />
        </div>
      </section>

      {/* ── FOR TWO ──────────────────────────────────────────── */}
      <section className="border-t hairline bg-ivory px-6 py-16 sm:px-10 lg:px-16">
        <Reveal className="wrap flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-brass-dark">For two</p>
            <h2 className="mt-3 font-display text-3xl">
              {couplesRetreat.name} <span className="text-brass-dark">· ${couplesRetreat.price}</span>
            </h2>
            <p className="mt-2 max-w-xl text-[0.95rem] text-umber">{couplesRetreat.tagline}.</p>
          </div>
          <Link href="/spa/head-spa" className="btn-outline shrink-0">
            See the rituals
          </Link>
        </Reveal>
      </section>

      {/* ── HOURS ────────────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-porcelain">
        <div className="wrap grid gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="h-display text-4xl">Spa hours</h2>
            <p className="mt-4 max-w-md text-umber">
              Every appointment is private and held exclusively for you. Same-day openings? Call or
              text and we&rsquo;ll check.
            </p>
            <Link href="/pricing" className="link-ul mt-6 inline-block text-[0.9rem] font-medium">
              See full pricing →
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <ul className="max-w-sm space-y-1 text-[0.95rem] text-umber">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-3 border-b hairline pb-1">
                  <span>{h.day}</span>
                  <span className="whitespace-nowrap">{h.open ? `${h.open} – ${h.close}` : "Closed"}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <BookCTA />
    </>
  );
}
