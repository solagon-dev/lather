import type { Metadata } from "next";
import Link from "next/link";
import { Figure, Leader, PageOpening, SectionHead } from "@/components/site/Editorial";
import { BOOK_URL, business } from "@/lib/business";
import { services, treatmentDetails } from "@/lib/data";
import { experienceSteps } from "@/lib/experience";
import { enhancements, rituals, usd } from "@/lib/menu";
import { breadcrumbSchema, jsonLd, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Head Spa Rituals in Greenville, NC",
  description:
    "Lather's head spa rituals in Greenville, NC: the Classic ($125, 75 min), the Luxe ($175, 90 min), Gentleman's Recharge ($100, 60 min) and a Couples Retreat ($250).",
  alternates: { canonical: "/spa/head-spa" },
};

const photos: Record<string, { src: string; alt: string; caption: string }> = {
  "classic-ritual": {
    src: "/media/treatments/classic-ritual.webp",
    alt: "An aromatherapy diffuser in the treatment room",
    caption: "The Classic Ritual",
  },
  "luxe-ritual": {
    src: "/media/treatments/nourish-fortify.webp",
    alt: "A nourishing hair mask during the Luxe Ritual",
    caption: "The Luxe Ritual",
  },
  "gentlemans-recharge": {
    src: "/media/treatments/gentlemans-recharge.webp",
    alt: "A scalp treatment during the Gentleman's Recharge",
    caption: "Gentleman’s Recharge",
  },
  "couples-retreat": {
    src: "/media/gallery/interior-waiting-room.webp",
    alt: "The lounge at Lather Spa",
    caption: "The lounge",
  },
};

const before = treatmentDetails["classic-ritual"].beforeVisit;

export default function HeadSpaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Lather Spa", path: "/spa" },
            { name: "Head spa rituals", path: "/spa/head-spa" },
          ]),
        )}
      />
      {services.map((s) => (
        <script key={s.id} type="application/ld+json" dangerouslySetInnerHTML={jsonLd(serviceSchema(s))} />
      ))}

      <PageOpening
        eyebrow="Lather Spa"
        aside="Booked online"
        title="Head spa rituals, unhurried and private."
        figure={
          <Figure
            src="/media/gallery/treatment-waterfall.webp"
            alt="Warm water over the scalp during a ritual"
            caption="The head spa basin"
            ratio="4/5"
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
        }
      >
        <p>
          A Japanese-inspired scalp ritual: cleanse, exfoliation, a long massage, a nourishing mask and steam. Every
          ritual follows the same quiet arc, and differs only in how far it goes.
        </p>
      </PageOpening>

      {/* ── THE RITUALS ─────────────────────────────────────── */}
      <section aria-labelledby="rituals" className="shell pt-20 lg:pt-32">
        <SectionHead num="01" label="The rituals" as="h2" id="rituals" note="From $100" />
        <ol className="mt-4">
          {rituals.map((r, i) => {
            const photo = photos[r.id];
            const detail = services.find((s) => s.id === r.id);
            return (
              <li
                key={r.id}
                id={r.id}
                className="grid scroll-mt-24 grid-cols-[96px_minmax(0,1fr)] gap-[18px] border-b border-line py-8 lg:grid-cols-12 lg:gap-12 lg:py-14"
              >
                <Figure
                  src={photo.src}
                  alt={photo.alt}
                  ratio="3/4"
                  sizes="(min-width: 1024px) 25vw, 96px"
                  className={`lg:col-span-3 lg:col-start-2 ${i % 2 ? "lg:col-start-9 lg:row-start-1" : ""}`}
                />
                <div className={`lg:col-span-6 ${i % 2 ? "lg:col-start-2 lg:row-start-1" : "lg:col-start-6"}`}>
                  <Leader
                    name={<h3 className="inline font-display">{r.name}</h3>}
                    price={usd(r.price)}
                    nameClass="font-display text-[1.3125rem] leading-snug text-ink lg:text-[1.875rem]"
                    priceClass="font-display text-[1.1875rem] text-ink lg:text-[1.625rem]"
                  />
                  <p className="cap-m mt-1">{r.minutes ? `${r.minutes} minutes` : "For two, side by side"}</p>
                  <p className="copy mt-2 text-ink">{r.includes}</p>
                  {detail && <p className="copy mt-3 hidden lg:block">{detail.description}</p>}
                  <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="lnk mt-5">
                    Book {r.id === "couples-retreat" ? "the retreat" : "this ritual"}
                  </a>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 lg:ml-[88px] lg:mt-14 lg:max-w-[36rem]">
          <p className="cap-m">Enhancements</p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {enhancements.map((e) => (
              <li key={e.name}>
                <Leader name={e.name} price={usd(e.price)} nameClass="copy text-ink" priceClass="copy text-ink" />
              </li>
            ))}
          </ul>
          <p className="note mt-3">Add any enhancement when you book.</p>
        </div>
      </section>

      {/* ── WHAT HAPPENS ────────────────────────────────────── */}
      <section aria-labelledby="movements" className="mt-20 bg-sand py-16 lg:mt-32 lg:py-28">
        <div className="shell">
          <SectionHead num="02" label="What happens" as="h2" id="movements" />
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <Figure
              src="/media/experience/step-03-massage.webp"
              alt="Slow scalp massage during a ritual"
              caption="The massage, the heart of the ritual"
              ratio="4/5"
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="mt-10 lg:col-span-4 lg:mt-14"
            />
            <ol className="mt-10 lg:col-span-7 lg:col-start-6 lg:mt-14">
              {experienceSteps.map((s) => (
                <li key={s.number} className="grid grid-cols-[44px_minmax(0,1fr)] border-t border-line-sand py-5">
                  <span className="num">{s.number}</span>
                  <div>
                    <h3 className="font-display text-[1.375rem] leading-snug">{s.title}</h3>
                    <p className="copy mt-1">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── BEFORE YOU COME ─────────────────────────────────── */}
      <section aria-labelledby="before" className="shell pb-20 pt-20 lg:pb-32 lg:pt-32">
        <SectionHead num="03" label="Before you come" as="h2" id="before" />
        <div className="mt-6 lg:ml-[88px] lg:grid lg:grid-cols-2 lg:gap-12">
          <ul className="border-t border-line lg:border-t-0">
            {before.map((b) => (
              <li key={b} className="copy border-b border-line py-3 text-ink">
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-10 lg:mt-0">
            <p className="copy">
              New to head spa?{" "}
              <Link href="/what-is-a-head-spa" className="text-ink underline decoration-line-dots underline-offset-4">
                What a head spa is
              </Link>
              , and{" "}
              <Link href="/scalp-concerns" className="text-ink underline decoration-line-dots underline-offset-4">
                which ritual suits which scalp
              </Link>
              .
            </p>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4">
              <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="lnk">
                Book a ritual
              </a>
              <a href={business.phoneHref} className="lnk border-transparent text-umber">
                {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
