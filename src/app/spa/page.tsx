import type { Metadata } from "next";
import Link from "next/link";
import { Figure, Leader, PageOpening, SectionHead } from "@/components/site/Editorial";
import { BOOK_URL, spaHoursCompact } from "@/lib/business";
import { enhancements, facials, massages, rituals, usd } from "@/lib/menu";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Spa in Greenville, NC: Head Spa, Facials & Massage",
  description:
    "Lather Spa in Greenville, NC: head spa rituals from $100, Glo2Facials from $225, and therapeutic and prenatal massage from $85. Book online.",
  alternates: { canonical: "/spa" },
};

function Block({
  num,
  id,
  label,
  href,
  more,
  figure,
  children,
}: {
  num: string;
  id: string;
  label: string;
  href: string;
  more: string;
  figure: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="shell pt-20 lg:pt-32">
      <SectionHead num={num} label={label} as="h2" id={id} />
      <div className="mt-8 grid grid-cols-[112px_minmax(0,1fr)] gap-[18px] lg:mt-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4 lg:col-start-2">{figure}</div>
        <div className="lg:col-span-6 lg:col-start-7">
          {children}
          <Link href={href} className="lnk mt-7">
            {more}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function SpaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Lather Spa", path: "/spa" },
          ]),
        )}
      />
      <PageOpening
        eyebrow="Lather Spa"
        aside="Booked online"
        title="Head spa rituals, facials, and massage."
        figure={
          <Figure
            src="/media/pages/book-hero.webp"
            alt="A guest resting beneath the gold arc of the head spa basin"
            caption="The head spa basin, Fox Haven Drive"
            focal="32% 50%"
            ratio="4/5"
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
        }
      >
        <p>
          Private rooms, unhurried time, and a menu that fits on one page. Choose a time online and it&rsquo;s
          confirmed.
        </p>
        <div className="flex flex-wrap gap-x-7 gap-y-4 pt-2">
          <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="lnk">
            Book the spa
          </a>
          <Link href="/menu" className="lnk border-transparent text-umber">
            The full menu
          </Link>
        </div>
      </PageOpening>

      <Block
        num="01"
        id="rituals"
        label="Head spa rituals"
        href="/spa/head-spa"
        more="The rituals"
        figure={
          <Figure
            src="/media/gallery/treatment-waterfall.webp"
            alt="Warm water over the scalp during a ritual"
            ratio="3/4"
            sizes="(min-width: 1024px) 30vw, 112px"
          />
        }
      >
        <ul className="flex flex-col gap-5">
          {rituals.map((r) => (
            <li key={r.id}>
              <Leader name={r.name} price={usd(r.price)} />
              {r.minutes && <p className="cap-m mt-1">{r.minutes} minutes</p>}
              <p className="note mt-1">{r.includes}</p>
            </li>
          ))}
        </ul>
        <p className="cap-m mt-7">Enhancements</p>
        <ul className="mt-2.5 flex flex-col gap-1.5">
          {enhancements.map((e) => (
            <li key={e.name}>
              <Leader name={e.name} price={usd(e.price)} nameClass="note" priceClass="note" />
            </li>
          ))}
        </ul>
      </Block>

      <Block
        num="02"
        id="facials"
        label="Glo2Facial"
        href="/spa/facials"
        more="About the facials"
        figure={
          <Figure
            src="/media/editorial/secondary-treatment.webp"
            alt="Skincare tools on marble"
            ratio="3/4"
            sizes="(min-width: 1024px) 30vw, 112px"
          />
        }
      >
        <ul className="flex flex-col gap-5">
          {facials.map((f) => (
            <li key={f.name}>
              <Leader name={f.name} price={usd(f.price)} />
              <p className="note mt-1">{f.includes}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block
        num="03"
        id="massage"
        label="Massage"
        href="/spa/massage"
        more="About massage"
        figure={
          <Figure
            src="/media/experience/step-03-massage.webp"
            alt="Massage at Lather Spa"
            ratio="3/4"
            sizes="(min-width: 1024px) 30vw, 112px"
          />
        }
      >
        <ul className="flex flex-col gap-5">
          {massages.map((m) => (
            <li key={m.name}>
              <p className="font-display text-[1.3125rem] leading-snug">{m.name}</p>
              <ul className="mt-1.5 flex flex-col gap-1">
                {m.options.map((o) => (
                  <li key={o.minutes}>
                    <Leader name={`${o.minutes} minutes`} price={usd(o.price)} nameClass="note text-ink" priceClass="note text-ink" />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Block>

      <section aria-labelledby="spa-hours" className="shell pb-20 pt-20 lg:pb-32 lg:pt-32">
        <SectionHead num="04" label="Spa hours" as="h2" id="spa-hours" note="Monday–Saturday" />
        <dl className="mt-6 max-w-[22rem] lg:ml-[88px]">
          {spaHoursCompact.map(([d, h]) => (
            <div key={d} className="copy flex justify-between border-b border-line py-2.5 text-ink">
              <dt>{d}</dt>
              <dd>{h}</dd>
            </div>
          ))}
        </dl>
        <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="lnk mt-8 lg:ml-[88px]">
          Book the spa
        </a>
      </section>
    </>
  );
}
