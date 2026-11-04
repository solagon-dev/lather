import type { Metadata } from "next";
import { Leader, PriceMenu, SectionHead } from "@/components/site/Editorial";
import { BOOK_URL, WELLNESS_BOOK_URL, business, hoursShort, wellnessHoursShort } from "@/lib/business";
import { enhancements, foundations, hormoneSupport, priceGroups, provider, rituals, usd } from "@/lib/menu";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Menu & Pricing",
  description:
    "The full Lather menu with prices: head spa rituals, Glo2Facials and massage at Lather Spa; Foundations Visits, laser, Secret RF & PRO, injectables and body contouring at Lather Wellness.",
  alternates: { canonical: "/menu" },
};

const spaGroups = priceGroups.filter((g) => g.pillar === "spa");
const wellnessGroups = priceGroups.filter((g) => g.pillar === "wellness" && g.key !== "wellness-visits");

/**
 * The brochure as one page, split by the practice it books with. The two
 * halves are anchors under a sticky switch rather than JS tabs: one scroll,
 * every price findable with the browser's own search, and /menu#wellness
 * lands on the right half.
 */
export default function MenuPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Menu & Pricing", path: "/menu" },
          ]),
        )}
      />

      <section className="shell pt-5 lg:pt-14">
        <p className="cap-m">Menu &amp; pricing</p>
        <h1 className="mt-11 font-display text-[2.375rem] leading-[1.1] lg:mt-12 lg:text-[3.5rem]">The menu.</h1>
        <p className="copy mt-4 max-w-[34rem]">
          Lather Spa offers head spa rituals, facials, and massage. Lather Wellness provides personalized medical and
          wellness care. Each books on its own calendar.
        </p>
      </section>

      <nav
        aria-label="Menu sections"
        className="sticky top-[60px] z-20 mt-10 border-b border-line-soft bg-porcelain lg:top-[76px]"
      >
        <div className="shell flex gap-8">
          <a href="#spa" className="cap py-4 hover:text-brass-dark">
            Lather Spa
          </a>
          <a href="#wellness" className="cap py-4 hover:text-brass-dark">
            Lather Wellness
          </a>
        </div>
      </nav>

      {/* ── SPA ─────────────────────────────────────────────── */}
      <section id="spa" aria-labelledby="menu-spa" className="shell scroll-mt-32 pt-14 lg:pt-20">
        <SectionHead num="01" label="Lather Spa" as="h2" id="menu-spa" note="Booked online" />
        <div className="mt-10 lg:ml-[88px] lg:grid lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="font-display text-[1.5rem] leading-tight">Head spa rituals</h3>
            <ul className="mt-5 flex flex-col gap-5">
              {rituals.map((r) => (
                <li key={r.id}>
                  <Leader
                    name={r.name}
                    price={usd(r.price)}
                    nameClass="font-display text-[1.125rem] leading-snug text-ink"
                    priceClass="font-display text-[1.0625rem] text-ink"
                  />
                  {r.minutes && <p className="cap-m mt-0.5">{r.minutes} minutes</p>}
                  <p className="note mt-0.5">{r.includes}</p>
                </li>
              ))}
            </ul>
            <p className="cap-m mt-8">Enhancements</p>
            <ul className="mt-3 flex flex-col gap-2">
              {enhancements.map((e) => (
                <li key={e.name}>
                  <Leader name={e.name} price={usd(e.price)} nameClass="note text-ink" priceClass="note text-ink" />
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-14 flex flex-col gap-14 lg:mt-0">
            {spaGroups.map((g) => (
              <PriceMenu key={g.key} group={g} />
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-baseline gap-x-7 gap-y-3 lg:ml-[88px]">
          <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="lnk">
            Book the spa
          </a>
          <span className="note">{hoursShort}</span>
        </div>
      </section>

      {/* ── WELLNESS ────────────────────────────────────────── */}
      <section id="wellness" aria-labelledby="menu-wellness" className="mt-20 scroll-mt-32 bg-sand pb-20 pt-14 lg:mt-32 lg:pb-32 lg:pt-20">
        <div className="shell">
          <SectionHead num="02" label="Lather Wellness" as="h2" id="menu-wellness" note="By request" />
          <p className="copy mt-6 lg:ml-[88px]">Medical &amp; aesthetic treatments. {provider.line}</p>

          <div className="mt-10 lg:ml-[88px] lg:grid lg:grid-cols-2 lg:gap-16">
            <div>
              <Leader
                name={foundations.name}
                price={usd(foundations.price)}
                nameClass="font-display text-[1.5rem] leading-snug text-ink"
                priceClass="font-display text-[1.375rem] text-ink"
              />
              <p className="cap-m mt-1">{foundations.lead}</p>
              <p className="note mt-2">{foundations.description}</p>
              <div className="mt-4">
                <Leader name="Wellness follow-up" price="$85" nameClass="note text-ink" priceClass="note text-ink" />
              </div>
              <p className="cap mt-7">Hormone support</p>
              <ul className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2">
                {hormoneSupport.map((h) => (
                  <li key={h} className="note text-ink">
                    &mdash; {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-14 flex flex-col gap-14 lg:mt-0">
              {wellnessGroups.slice(0, 1).map((g) => (
                <PriceMenu key={g.key} group={g} />
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-14 lg:ml-[88px] lg:grid lg:grid-cols-2 lg:gap-16">
            {wellnessGroups.slice(1).map((g) => (
              <div key={g.key} className={g.columns ? "lg:col-span-2 lg:max-w-[44rem]" : ""}>
                <PriceMenu group={g} />
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-baseline gap-x-7 gap-y-3 lg:ml-[88px]">
            <a href={WELLNESS_BOOK_URL} target="_blank" rel="noopener noreferrer" className="lnk">
              Request a wellness visit
            </a>
            <span className="note">{wellnessHoursShort}</span>
          </div>
        </div>
      </section>

      <p className="shell note pb-20 pt-10 lg:pb-28">
        Prices are subject to change. Questions? Call{" "}
        <a href={business.phoneHref} className="text-ink">
          {business.phone}
        </a>
        .
      </p>
    </>
  );
}
