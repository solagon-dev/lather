import Link from "next/link";
import Finder from "@/components/site/Finder";
import { Figure, Leader, SectionHead } from "@/components/site/Editorial";
import Logo from "@/components/ui/Logo";
import {
  GIFT_CARD_URL,
  WELLNESS_BOOK_URL,
  business,
  spaHoursCompact,
  wellnessHoursCompact,
} from "@/lib/business";
import { testimonials } from "@/lib/data";
import {
  enhancements,
  facials,
  foundations,
  hormoneSupport,
  massages,
  provider,
  rituals,
  usd,
  wellnessSummary,
} from "@/lib/menu";

const review = testimonials[0];

const index = [
  { num: "01", href: "#spa", name: "Lather Spa", sub: "Head spa rituals, facials, massage", aside: "From $85" },
  { num: "02", href: "#wellness", name: "Lather Wellness", sub: "Medical & aesthetic treatments", aside: "From $175" },
  { num: "03", href: "#visit", name: "Visit", sub: `${business.address.street} · hours`, aside: "Map" },
];

function HoursList({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="mt-3 flex flex-col gap-1.5">
      {rows.map(([d, h]) => (
        <div key={d} className={`note flex justify-between gap-4 ${h === "Closed" ? "" : "text-ink"}`}>
          <dt>{d}</dt>
          <dd>{h}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Home() {
  return (
    <>
      {/* ── OPENING ─────────────────────────────────────────────
          An inset photograph with a caption, the way a printed page holds one. */}
      <section id="top" className="shell pt-5 lg:pt-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
            <div className="flex items-baseline justify-between gap-4 lg:hidden">
              <p className="cap-m">Greenville, North Carolina</p>
              <p className="cap-m">Spa · Wellness</p>
            </div>
            <Figure
              src="/media/pages/book-hero.webp"
              alt="A guest resting beneath the gold arc of the head spa basin"
              caption="The head spa basin, Fox Haven Drive"
              aside="I"
              ratio="35/44"
              focal="32% 50%"
              sizes="(min-width: 1024px) 55vw, 100vw"
              priority
              className="mt-3.5 lg:mt-0"
            />
          </div>
          <div className="lg:col-span-5 lg:row-start-1 lg:flex lg:flex-col lg:justify-between lg:pb-9">
            <p className="cap-m hidden lg:block">Greenville, North Carolina · Spa &amp; Wellness</p>
            <div>
              <h1 className="mt-11 max-w-[300px] font-display text-[2.375rem] leading-[1.1] lg:mt-0 lg:max-w-none lg:text-[4.25rem]">
                A place to pause.
              </h1>
              <p className="copy mt-4 max-w-[320px] lg:mt-6 lg:max-w-[26rem]">
                Lather Spa offers head spa rituals, facials, and massage. Lather Wellness provides personalized medical
                and wellness care.
              </p>

              {/* The house, as an index */}
              <nav aria-label="Lather at a glance" className="mt-[52px] border-t border-ink lg:mt-12">
                {index.map((r) => (
                  <a
                    key={r.num}
                    href={r.href}
                    className="group grid grid-cols-[44px_minmax(0,1fr)_auto] items-baseline border-b border-line py-[18px]"
                  >
                    <span className="num">{r.num}</span>
                    <span>
                      <span className="block font-display text-[1.375rem] leading-snug group-hover:text-brass-dark">
                        {r.name}
                      </span>
                      <span className="note">{r.sub}</span>
                    </span>
                    <span className="note">{r.aside}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINDER ──────────────────────────────────────────── */}
      <div className="shell mt-10 lg:mt-24">
        <Finder />
      </div>

      {/* ── 01 LATHER SPA ───────────────────────────────────── */}
      <section id="spa" aria-labelledby="spa-title" className="shell pt-[88px] lg:pt-36">
        <SectionHead num="01" label="Lather Spa" note="Booked online" />
        <h2
          id="spa-title"
          className="ml-11 mt-9 max-w-[280px] font-display text-[2rem] leading-[1.15] lg:ml-[88px] lg:mt-12 lg:max-w-[18ch] lg:text-[3rem]"
        >
          Head spa rituals, unhurried and private.
        </h2>

        <div className="lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-12">
          {/* An asymmetric pair: the second photograph steps down and in. */}
          <div className="relative mt-[34px] h-[470px] lg:col-span-6 lg:mt-0 lg:h-[720px]">
            <div className="absolute left-0 top-0 w-[71%]">
              <Figure
                src="/media/gallery/treatment-waterfall.webp"
                alt="Warm water over the scalp during a ritual"
                ratio="31/40"
                sizes="(min-width: 1024px) 34vw, 72vw"
              />
              <p className="note mt-3 max-w-[180px] lg:max-w-[240px]">Scalp cleanse, steam and massage &mdash; the Classic Ritual.</p>
            </div>
            <div className="absolute right-0 top-[196px] w-[43%] lg:top-[300px]">
              <Figure
                src="/media/about/spa-detail.webp"
                alt="Hands working through a scalp massage"
                ratio="150/196"
                sizes="(min-width: 1024px) 22vw, 44vw"
                frame
              />
            </div>
          </div>

          {/* The brochure's menu, kept as a menu. */}
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-6">
            <ul className="flex flex-col gap-6 lg:gap-8">
              {rituals.map((r) => (
                <li key={r.id}>
                  <Link href={`/spa/head-spa#${r.id}`} className="group block">
                    <Leader
                      name={<span className="group-hover:text-brass-dark">{r.name}</span>}
                      price={usd(r.price)}
                      nameClass="font-display text-[1.3125rem] leading-snug text-ink lg:text-[1.5rem]"
                      priceClass="font-display text-[1.1875rem] text-ink lg:text-[1.375rem]"
                    />
                    {r.minutes && <p className="cap-m mt-1">{r.minutes} minutes</p>}
                    <p className="copy mt-1.5 text-[0.8125rem] lg:text-[0.9375rem]">{r.includes}</p>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-[30px] border-t border-line pt-[18px]">
              <p className="cap-m">Enhancements</p>
              <ul className="mt-3 flex flex-col gap-2">
                {enhancements.map((e) => (
                  <li key={e.name}>
                    <Leader name={e.name} price={usd(e.price)} nameClass="note" priceClass="note" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Facials & massage: a narrow column against a tall photograph. */}
        <div className="mt-16 grid grid-cols-[128px_minmax(0,1fr)] items-start gap-[18px] lg:mt-28 lg:grid-cols-12 lg:gap-12">
          <Figure
            src="/media/editorial/ambiance-wide.webp"
            alt="The treatment room at Lather"
            caption="The treatment room"
            ratio="128/200"
            sizes="(min-width: 1024px) 30vw, 128px"
            className="lg:col-span-4 lg:col-start-2"
          />
          <div className="flex flex-col gap-[18px] lg:col-span-5 lg:col-start-7 lg:gap-6 lg:pt-10">
            <p className="cap">Facials &amp; massage</p>
            {facials.map((f) => (
              <Link key={f.name} href="/spa/facials" className="group block">
                <Leader
                  name={<span className="group-hover:text-brass-dark">{f.name}</span>}
                  price={usd(f.price)}
                  nameClass="font-display text-[1.125rem] leading-snug text-ink lg:text-[1.375rem]"
                  priceClass="font-display text-[1.0625rem] text-ink lg:text-[1.25rem]"
                />
                <p className="note mt-0.5">{f.includes.replace("The Essential experience with added", "With added")}</p>
              </Link>
            ))}
            {massages.map((m) => (
              <Link key={m.name} href="/spa/massage" className="group block">
                <span className="font-display text-[1.125rem] leading-snug group-hover:text-brass-dark lg:text-[1.375rem]">
                  {m.name}
                </span>
                <Leader
                  className="mt-1"
                  name={`${m.options.map((o) => o.minutes).join(" · ")} min`}
                  price={`$${m.options.map((o) => o.price).join(" · ")}`}
                  nameClass="note"
                  priceClass="note"
                />
              </Link>
            ))}
            <Link href="/spa" className="lnk mt-4 self-start lg:mt-6">
              The full spa menu
            </Link>
          </div>
        </div>
      </section>

      {/* ── 02 LATHER WELLNESS ──────────────────────────────── */}
      <section id="wellness" aria-labelledby="wellness-title" className="mt-24 bg-sand pb-[72px] pt-[30px] lg:mt-40 lg:pb-32 lg:pt-16">
        <div className="shell">
          <SectionHead num="02" label="Lather Wellness" note="By request" />

          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <div className="mt-9 grid grid-cols-[minmax(0,1fr)_150px] items-end gap-4 lg:mt-12 lg:block">
                <h2
                  id="wellness-title"
                  className="ml-11 font-display text-[1.75rem] leading-[1.15] lg:ml-[88px] lg:max-w-[16ch] lg:text-[3rem]"
                >
                  Medical &amp; aesthetic care, in the same quiet house.
                </h2>
                <Figure
                  src="/media/experience/step-01-consultation.webp"
                  alt="A Foundations Visit consultation"
                  caption="A Foundations Visit"
                  ratio="3/4"
                  focal="50% 30%"
                  sizes="(min-width: 1024px) 26vw, 150px"
                  className="lg:ml-[88px] lg:mt-12 lg:w-[62%]"
                />
              </div>
              <p className="copy ml-11 mt-[26px] lg:ml-[88px]">{provider.line}</p>
            </div>

            <div className="lg:col-span-5 lg:col-start-8 lg:pt-12">
              <div className="mt-10 border-t border-line-sand pt-[22px] lg:mt-0">
                <Leader
                  name={foundations.name}
                  price={usd(foundations.price)}
                  nameClass="font-display text-[1.5rem] leading-snug text-ink lg:text-[1.875rem]"
                  priceClass="font-display text-[1.375rem] text-ink lg:text-[1.625rem]"
                />
                <p className="cap-m mt-1.5">{foundations.lead}</p>
                <p className="copy mt-3 text-[0.84375rem] lg:text-[0.9375rem]">{foundations.description}</p>
                <p className="cap mt-[22px]">Hormone support</p>
                <ul className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2">
                  {hormoneSupport.map((h) => (
                    <li key={h} className="note text-ink">
                      &mdash; {h.replace(" management", "")}
                    </li>
                  ))}
                </ul>
                <div className="mt-[26px] flex flex-wrap gap-x-7 gap-y-4">
                  <a href={WELLNESS_BOOK_URL} target="_blank" rel="noopener noreferrer" className="lnk">
                    Request a wellness visit
                  </a>
                  <Link href="/wellness/foundations" className="lnk border-transparent text-umber hover:border-brass-dark">
                    About the visit
                  </Link>
                </div>
              </div>

              <div className="mt-[52px] flex flex-col">
                <p className="cap-m mb-1.5">Treatments</p>
                {wellnessSummary.map((t, i) => (
                  <Link
                    key={t.slug}
                    href={`/wellness/${t.slug}`}
                    className={`group border-t border-line-sand py-4 ${i === wellnessSummary.length - 1 ? "border-b" : ""}`}
                  >
                    <Leader
                      name={<span className="group-hover:text-brass-dark">{t.short ?? t.name}</span>}
                      price={t.range}
                      nameClass="font-display text-[1.25rem] leading-snug text-ink"
                      priceClass="note"
                    />
                    <p className="note mt-0.5">{t.note}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDERS ────────────────────────────────────────── */}
      <section aria-label="The founders" className="shell pt-24 lg:pt-40">
        <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-12">
          <Figure
            src="/media/founders/founders-hero.webp"
            alt="Hannah DeMotts, Abigail Baldwin and Stacia Friend, CNM, on the staircase at Lather"
            caption="Hannah DeMotts, Abigail Baldwin and Stacia Friend, CNM"
            ratio="350/438"
            focal="50% 20%"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="lg:col-span-6"
          />
          <div className="ml-11 mt-10 lg:col-span-5 lg:col-start-8 lg:ml-0 lg:mt-0 lg:pb-16">
            <p className="font-display text-[1.5rem] leading-[1.4] lg:text-[2rem]">
              Lather began with sisters Hannah DeMotts and Abigail Baldwin and their longtime friend, Stacia Friend, CNM.
            </p>
            <Link href="/about" className="lnk mt-[22px]">
              Our story
            </Link>
          </div>
        </div>
      </section>

      {/* ── ONE REVIEW, set small and true ──────────────────── */}
      <section aria-label="A guest review" className="shell mt-[88px] lg:mt-36">
        <figure className="grid grid-cols-[44px_minmax(0,1fr)] border-t border-line pt-[22px] lg:grid-cols-[88px_minmax(0,1fr)]">
          <Logo variant="mark" className="mt-1.5 h-auto w-[22px]" title="" />
          <div className="lg:max-w-[46rem]">
            <blockquote className="font-display text-[1.3125rem] leading-[1.45] lg:text-[1.75rem]">
              &ldquo;{review.quote}&rdquo;
            </blockquote>
            <figcaption className="note mt-3">{review.name} &mdash; verified Vagaro review</figcaption>
          </div>
        </figure>
      </section>

      {/* ── GIFT CARDS: one line ────────────────────────────── */}
      <div className="shell mt-16 lg:mt-24">
        <a
          href={GIFT_CARD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-baseline justify-between border-y border-ink py-5"
        >
          <span className="font-display text-[1.375rem] group-hover:text-brass-dark lg:text-[1.75rem]">Gift cards</span>
          <span className="cap">Give a ritual</span>
        </a>
      </div>

      {/* ── 03 VISIT ────────────────────────────────────────── */}
      <section id="visit" aria-labelledby="visit-title" className="shell pb-[72px] pt-[88px] lg:pb-36 lg:pt-36">
        <SectionHead num="03" label="Visit" as="h2" id="visit-title" />
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <address className="ml-11 mt-[34px] font-display text-[1.5rem] not-italic leading-[1.3] lg:ml-[88px] lg:mt-12 lg:text-[2.25rem]">
              {business.address.street}
              <br />
              {business.address.city}, {business.address.state} {business.address.zip}
            </address>
            <div className="ml-11 mt-[22px] flex flex-wrap gap-x-[26px] gap-y-4 lg:ml-[88px]">
              <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="lnk">
                Directions
              </a>
              <a href={business.phoneHref} className="lnk">
                {business.phone}
              </a>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 lg:ml-[88px] lg:mt-16 lg:max-w-[30rem]">
              <div>
                <p className="cap">Spa</p>
                <HoursList rows={spaHoursCompact} />
              </div>
              <div>
                <p className="cap">Wellness</p>
                <HoursList rows={wellnessHoursCompact} />
                <p className="note mt-1.5">By appointment</p>
              </div>
            </div>
          </div>
          <Figure
            src="/media/gallery/interior-gold-mirror.webp"
            alt="The gold mirror in the treatment room"
            caption="The gold mirror"
            ratio="4/5"
            sizes="(min-width: 1024px) 30vw, 58vw"
            className="ml-auto mt-12 w-[58%] lg:col-span-4 lg:col-start-9 lg:ml-0 lg:mt-12 lg:w-auto"
          />
        </div>
      </section>
    </>
  );
}
