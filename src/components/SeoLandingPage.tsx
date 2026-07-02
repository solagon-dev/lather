import Image from "next/image";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import FaqAccordion from "@/components/FaqAccordion";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/data";
import { breadcrumbSchema, faqSchema, jsonLd } from "@/lib/seo";
import { getRelatedCities, type SeoCity, type SeoServiceType } from "@/lib/seo-pages";

interface SeoLandingPageProps {
  city: SeoCity;
  service: SeoServiceType;
}

/** Wrap the first occurrence of the city name in the h1 with an italic span. */
function accentedTitle(headline: string, accent: string) {
  const i = headline.indexOf(accent);
  if (i === -1) return <>{headline}</>;
  return (
    <>
      {headline.slice(0, i)}
      <span className="italic">{accent}</span>
      {headline.slice(i + accent.length)}
    </>
  );
}

export default function SeoLandingPage({ city, service }: SeoLandingPageProps) {
  const relatedCities = getRelatedCities(city.slug, 4);
  const isLocal = city.distanceMiles === 0;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(service.faqs))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            {
              name: `${service.label} Near ${city.name}, ${city.state}`,
              path: `/${service.urlPrefix}/${city.slug}`,
            },
          ])
        )}
      />

      <PageHero
        title={accentedTitle(service.h1(city.name, city.state), city.name)}
        sub={service.heroSub(city.name, city.driveTime)}
      />

      {/* ── INTRO ────────────────────────────────────────────── */}
      <section className="section-pad bg-ivory">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <h2 className="h-display text-balance text-3xl sm:text-4xl">{service.introH2}</h2>
            <p className="mt-8 max-w-xl leading-relaxed text-umber">{service.introP1(city.name)}</p>
            <p className="mt-6 max-w-xl leading-relaxed text-umber">{service.introP2}</p>
            <p className="mt-6 max-w-xl leading-relaxed text-umber">{service.introP3(city.name)}</p>
          </Reveal>
          <Reveal delay={150} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="arch relative aspect-[3/4]">
              <Image
                src="/media/services/service-treatment.webp"
                alt="A scalp treatment in progress at Lather Head Spa"
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────── */}
      <section className="grain relative section-pad bg-noir text-ivory">
        <div className="wrap relative">
          <Reveal className="max-w-2xl">
            <h2 className="h-display text-balance text-4xl sm:text-5xl">
              Five reasons guests return
            </h2>
          </Reveal>
          <ol className="mt-16 grid gap-10 border-t border-ivory/10 pt-12 sm:grid-cols-2 lg:grid-cols-5">
            {service.benefits.map((b, i) => (
              <Reveal key={b.title} as="li" delay={i * 80}>
                <p className="font-display text-3xl font-light text-brass-light/70">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-xl">{b.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ivory/60">{b.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── WHY LATHER ───────────────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap">
          <Reveal>
            <h2 className="h-display text-4xl sm:text-5xl">
              Built for this
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {service.whyLather.map((w, i) => (
              <Reveal key={w.title} delay={i * 100} className="h-full">
                <div className="flex h-full flex-col border hairline bg-ivory p-8">
                  <h3 className="font-display text-2xl">{w.title}</h3>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-umber">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RITUAL PRICE LIST ────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-bone">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <h2 className="h-display text-balance text-3xl sm:text-4xl">
              Choose your ritual
            </h2>
            <Link href="/services" className="link-ul mt-8 inline-block text-[0.75rem] font-semibold uppercase tracking-kicker">
              Full Menu & Add-Ons →
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <ul className="divide-y hairline border-y hairline">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.id}`} className="group flex items-baseline justify-between gap-6 py-5">
                    <span className="font-display text-xl transition-colors group-hover:text-brass-dark sm:text-2xl">
                      {s.name}
                    </span>
                    <span className="shrink-0 text-[0.75rem] uppercase tracking-kicker text-taupe">
                      {s.duration} · {s.id === "blowout" ? `from $${s.price}` : `$${s.price}`}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-ivory">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <h2 className="h-display text-balance text-3xl sm:text-4xl">
              Before you book
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <FaqAccordion faqs={service.faqs} />
          </Reveal>
        </div>
      </section>

      {/* ── RELATED READING ──────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-porcelain">
        <div className="wrap">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="h-display text-3xl sm:text-4xl">
                From the Journal
              </h2>
            </div>
            <Link href="/journal" className="link-ul mb-2 text-[0.75rem] font-semibold uppercase tracking-kicker">
              All Essays →
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {service.relatedBlogs.map((b, i) => (
              <Reveal key={b.slug} delay={i * 80} className="h-full">
                <Link href={`/journal/${b.slug}`} className="group flex h-full flex-col border hairline bg-ivory p-8">
                  <h3 className="h-display flex-1 text-balance text-2xl transition-colors group-hover:text-brass-dark">
                    {b.title}
                  </h3>
                  <span className="link-ul mt-6 self-start text-[0.7rem] font-semibold uppercase tracking-kicker text-ink">
                    Read the Essay →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED CITIES + DRIVE NOTE ──────────────────────── */}
      <section className="grain relative section-pad bg-noir text-ivory">
        <div className="wrap relative">
          <Reveal>
            <h2 className="h-display text-3xl sm:text-4xl">
              {service.shortLabel} for your neighbors
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {relatedCities.map((c, i) => (
              <Reveal key={c.slug} delay={i * 80} className="h-full">
                <Link
                  href={`/${service.urlPrefix}/${c.slug}`}
                  className="group flex h-full flex-col justify-between bg-noir p-8 transition-colors hover:bg-ink"
                >
                  <p className="font-display text-xl transition-colors group-hover:text-brass-light">{c.name}</p>
                  <span className="mt-8 text-[0.65rem] uppercase tracking-kicker text-ivory/50">
                    {c.distanceMiles === 0 ? "Right in Greenville" : `${c.driveTime} away`} →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 border-t border-ivory/10 pt-8">
            <p className="text-[0.85rem] uppercase tracking-kicker text-ivory/50">
              {isLocal
                ? `${city.name} guests are already home — find us near ${city.highway}`
                : `${city.name} is ${city.driveTime} from our door — ${city.highway}`}
            </p>
          </Reveal>
        </div>
      </section>

      <BookCTA title={isLocal ? undefined : `Worth the trip from ${city.name}.`} />
    </>
  );
}
