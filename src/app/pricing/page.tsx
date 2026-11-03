import type { Metadata } from "next";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import PriceList from "@/components/PriceList";
import UtilityHero from "@/components/heroes/UtilityHero";
import Reveal from "@/components/Reveal";
import { Em } from "@/components/ui/Type";
import { BOOK_URL, WELLNESS_BOOK_URL, business } from "@/lib/business";
import { services } from "@/lib/data";
import { couplesRetreat, priceGroups } from "@/lib/menu";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Prices for Lather Spa & Wellness in Greenville, NC: head spa, Glo2Facials, massage, wellness visits, laser hair removal, and Secret RF & PRO.",
  alternates: { canonical: "/pricing" },
};

const spaGroups = priceGroups.filter((g) => g.pillar === "spa");
const wellnessGroups = priceGroups.filter((g) => g.pillar === "wellness");

/**
 * The whole menu on one page, split by the business it books with. The two
 * halves are anchors under a sticky switch rather than JS tabs, so the page is
 * one scroll, every price is findable with the browser's own search, and a
 * link to /pricing#wellness lands on the right half.
 */
export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ])
        )}
      />
      <UtilityHero
        title={
          <>
            Every price, <Em>in one place.</Em>
          </>
        }
        sub="The spa books instantly online. Wellness visits are requested online and confirmed by the practice."
      />

      <nav
        aria-label="Pricing sections"
        className="sticky top-[4.5rem] z-30 border-b hairline bg-porcelain/90 backdrop-blur-md sm:top-[5.5rem]"
      >
        {/* Sits just under the fixed header's controls rather than behind them. */}
        <div className="wrap flex justify-center gap-2 px-6 py-3">
          {[
            { href: "#spa", label: "Spa" },
            { href: "#wellness", label: "Wellness" },
          ].map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="border hairline px-6 py-2.5 text-[0.75rem] font-semibold tracking-[0.02em] transition-colors hover:border-ink/40 hover:bg-ivory"
            >
              {t.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── SPA ──────────────────────────────────────────────── */}
      <section id="spa" className="section-pad scroll-mt-40 bg-porcelain">
        <div className="wrap">
          <Reveal>
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-brass-dark">Lather Spa</p>
            <h2 className="h-display mt-3 text-4xl sm:text-5xl">Head spa rituals</h2>
          </Reveal>
          <div className="mt-8 border-t hairline">
            {services.map((s, i) => (
              <Reveal
                key={s.id}
                delay={i * 60}
                className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b hairline py-5"
              >
                <Link href={`/spa/head-spa/${s.id}`} className="group">
                  <h3 className="font-display text-xl transition-colors group-hover:text-brass-dark">{s.name}</h3>
                  <p className="mt-1 text-[0.85rem] text-taupe">{s.duration}</p>
                </Link>
                <p className="font-display text-xl text-brass-dark">${s.price}</p>
              </Reveal>
            ))}
            <Reveal className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-b hairline py-5">
              <div>
                <h3 className="font-display text-xl">{couplesRetreat.name}</h3>
                <p className="mt-1 text-[0.85rem] text-taupe">For two</p>
              </div>
              <p className="font-display text-xl text-brass-dark">${couplesRetreat.price}</p>
            </Reveal>
          </div>

          {spaGroups.map((g) => (
            <div key={g.key} className="mt-16">
              <PriceList group={g} showBook={false} />
            </div>
          ))}

          <Reveal className="mt-12">
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-solid">
              Book the Spa
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── WELLNESS ─────────────────────────────────────────── */}
      <section id="wellness" className="section-pad scroll-mt-40 border-t hairline bg-ivory">
        <div className="wrap">
          <Reveal>
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-brass-dark">Lather Wellness</p>
          </Reveal>
          {wellnessGroups.map((g, i) => (
            <div key={g.key} className={i === 0 ? "mt-3" : "mt-16"}>
              <PriceList group={g} showBook={false} />
            </div>
          ))}
          <Reveal>
            <p className="mt-8 text-[0.9rem] text-taupe">Xeomin® is priced per treatment and quoted at your visit.</p>
          </Reveal>
          <Reveal className="mt-10">
            <a href={WELLNESS_BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-solid">
              Request a Wellness Visit
            </a>
          </Reveal>
        </div>
      </section>

      <section className="border-t hairline bg-porcelain px-6 py-12 sm:px-10 lg:px-16">
        <p className="wrap text-[0.85rem] text-taupe">
          Every appointment is private and held exclusively for you. For same-day availability, call{" "}
          <a href={business.phoneHref} className="link-ul">
            {business.phone}
          </a>
          .
        </p>
      </section>

      <BookCTA />
    </>
  );
}
