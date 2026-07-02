import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookCTA from "@/components/BookCTA";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { services, testimonials } from "@/lib/data";
import { locations } from "@/lib/locations";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

interface Params {
  city: string;
}

export function generateStaticParams() {
  return locations.map((l) => ({ city: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city } = await params;
  const location = locations.find((l) => l.slug === city);
  if (!location) return {};
  return {
    title: { absolute: location.metaTitle },
    description: location.metaDescription,
    alternates: { canonical: `/locations/${location.slug}` },
  };
}

/** Wrap the first occurrence of `accent` in the headline with an italic span. */
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

export default async function LocationPage({ params }: { params: Promise<Params> }) {
  const { city } = await params;
  const location = locations.find((l) => l.slug === city);
  if (!location) notFound();

  const testimonial = testimonials[location.testimonialIndex % testimonials.length];
  const relatedCities = locations.filter((l) => l.slug !== location.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Areas We Serve", path: "/locations" },
            { name: `${location.city}, ${location.state}`, path: `/locations/${location.slug}` },
          ])
        )}
      />

      <PageHero
        kicker={`Serving ${location.city}, ${location.state}`}
        title={accentedTitle(location.heroHeadline, location.city)}
        sub={location.heroSub}
      />

      {/* ── INTRO ────────────────────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <p className="kicker-line">The Experience</p>
            <h2 className="h-display mt-6 text-balance text-3xl sm:text-4xl">{location.introTitle}</h2>
            {location.introBody.map((p) => (
              <p key={p.slice(0, 40)} className="mt-6 max-w-xl leading-relaxed text-umber">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={150} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="arch relative aspect-[3/4]">
              <Image
                src="/media/editorial/value-prop.webp"
                alt="A quiet moment during a Lather Head Spa ritual"
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHY VISIT ────────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-ivory">
        <div className="wrap">
          <Reveal>
            <p className="kicker-line">Why Guests Make the Trip</p>
            <h2 className="h-display mt-6 text-4xl sm:text-5xl">
              Worth every <span className="italic">mile</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {location.whyVisit.map((w, i) => (
              <Reveal key={w.title} delay={i * 100} className="h-full">
                <div className="flex h-full flex-col border hairline bg-porcelain p-8">
                  <h3 className="font-display text-2xl">{w.title}</h3>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-umber">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ──────────────────────────────────────── */}
      <section className="section-pad bg-bone">
        <div className="wrap">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-brass" aria-label="5 out of 5 stars">
              ★★★★★
            </p>
            <blockquote className="h-display mt-8 text-balance text-2xl italic leading-relaxed sm:text-3xl">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <footer className="mt-8 text-[0.75rem] uppercase tracking-kicker text-taupe">
              <span className="font-semibold text-ink">{testimonial.name}</span> · {testimonial.service}
              <br />
              <span className="text-[0.65rem]">{testimonial.location}</span>
            </footer>
          </Reveal>
        </div>
      </section>

      {/* ── DIRECTIONS ───────────────────────────────────────── */}
      <section className="grain relative section-pad bg-noir text-ivory">
        <div className="wrap relative grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="kicker-line text-brass-light">Getting Here</p>
            <h2 className="h-display mt-6 text-balance text-3xl sm:text-4xl">
              The drive from <span className="italic text-brass-light">{location.city}</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="leading-relaxed text-ivory/70">{location.directionsText}</p>
            <Link
              href="/contact"
              className="link-ul mt-8 inline-block text-[0.75rem] font-semibold uppercase tracking-kicker text-brass-light"
            >
              Map, Parking & Contact Details →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── RITUAL PRICE LIST ────────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <p className="kicker-line">The Menu</p>
            <h2 className="h-display mt-6 text-balance text-3xl sm:text-4xl">
              Rituals worth the <span className="italic">drive</span>
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

      {/* ── RELATED CITIES ───────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-ivory">
        <div className="wrap">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="kicker-line">Nearby</p>
              <h2 className="h-display mt-6 text-3xl sm:text-4xl">
                We also serve <span className="italic">your neighbors</span>
              </h2>
            </div>
            <Link href="/locations" className="link-ul mb-2 text-[0.75rem] font-semibold uppercase tracking-kicker">
              All Areas We Serve →
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden border hairline bg-ink/10 md:grid-cols-3">
            {relatedCities.map((l, i) => (
              <Reveal key={l.slug} delay={i * 80} className="h-full">
                <Link
                  href={`/locations/${l.slug}`}
                  className="group flex h-full flex-col justify-between bg-porcelain p-8 transition-colors hover:bg-bone"
                >
                  <div>
                    <h3 className="font-display text-2xl transition-colors group-hover:text-brass-dark">{l.city}</h3>
                    <p className="mt-2 text-[0.85rem] text-umber">
                      {l.driveTime ? `${l.driveTime} away` : "Right in Greenville"}
                    </p>
                  </div>
                  <span className="link-ul mt-8 self-start text-[0.7rem] font-semibold uppercase tracking-kicker text-ink">
                    {l.city}, {l.state} →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BookCTA />
    </>
  );
}
