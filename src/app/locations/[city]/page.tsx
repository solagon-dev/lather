import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookCTA from "@/components/BookCTA";
import UtilityHero from "@/components/heroes/UtilityHero";
import Reveal from "@/components/Reveal";
import { Em } from "@/components/ui/Type";
import { BOOK_URL, business, hoursShort } from "@/lib/business";
import { services, testimonials } from "@/lib/data";
import { citiesWithPages, getCity, getNearbyCities, type ServedCity } from "@/lib/locations";
import { pillars } from "@/lib/menu";
import { breadcrumbSchema, clampDescription, jsonLd } from "@/lib/seo";

interface Params {
  city: string;
}

export function generateStaticParams() {
  return citiesWithPages.map((c) => ({ city: c.slug }));
}

/** Greenville is home; everywhere else is a drive. Almost all copy forks here. */
const isHome = (c: ServedCity) => c.distanceMiles === 0;

function title(c: ServedCity) {
  return isHome(c)
    ? `Spa & Wellness in ${c.city}, ${c.state}`
    : `Spa & Wellness Near ${c.city}, ${c.state}`;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return {};
  return {
    title: { absolute: `${title(c)} | Lather Spa & Wellness` },
    description: clampDescription(
      isHome(c)
        ? `Lather Spa & Wellness is ${c.city}'s spa and wellness destination — head spa rituals, facials, massage, skin and wellness care at ${business.address.street}.`
        : `Lather Spa & Wellness in Greenville is ${c.driveTime} from ${c.city}, ${c.state} — ${c.distanceMiles} miles via ${c.highway}. Head spa rituals, facials, massage and wellness care.`
    ),
    alternates: { canonical: `/locations/${c.slug}` },
  };
}

export default async function LocationPage({ params }: { params: Promise<Params> }) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();

  const home = isHome(c);
  const testimonial = testimonials[c.testimonialIndex % testimonials.length];
  const nearby = getNearbyCities(c.slug, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Areas We Serve", path: "/locations" },
            { name: `${c.city}, ${c.state}`, path: `/locations/${c.slug}` },
          ])
        )}
      />

      <UtilityHero
        kicker="Areas we serve"
        title={
          <>
            Spa &amp; wellness {home ? "in" : "near"}{" "}
            <Em>
              {c.city}, {c.state}
            </Em>
          </>
        }
        sub={
          home
            ? `Lather is right here in Greenville, on ${business.address.street} — restorative spa experiences and advanced wellness care in one considered space.`
            : `Lather Spa & Wellness is ${c.driveTime} from ${c.city} — ${c.distanceMiles} miles ${c.direction} Greenville, straight in on ${c.highway}.`
        }
        meta={
          home ? (
            <>{business.parking} · By appointment</>
          ) : (
            <>
              {c.driveTime} · {c.distanceMiles} miles · via {c.highway}
            </>
          )
        }
      />

      {/* ── THE DRIVE ────────────────────────────────────────────
          The genuinely city-specific part of the page. Everything below is
          shared, because it describes one business at one address. */}
      <section className="section-pad bg-porcelain">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.7rem] font-semibold uppercase tracking-kicker text-brass-dark">
              Plan your visit
            </p>
            <h2 className="h-display mt-4 text-balance text-3xl sm:text-4xl">
              {home ? "Finding us in Greenville" : `Getting here from ${c.city}`}
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-umber">
              {home
                ? "Right in town, with free parking at the door — the calm starts the moment you step inside."
                : `A little over ${c.driveTime.replace("about ", "")} of open road, then an hour that belongs entirely to you.`}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <dl className="grid grid-cols-2 gap-px border hairline bg-ink/10 sm:grid-cols-4">
              {[
                { k: "Drive time", v: home ? "You're here" : c.driveTime.replace("about ", "") },
                { k: "Distance", v: home ? "In town" : `${c.distanceMiles} mi` },
                { k: "Route", v: c.highway },
                { k: "Parking", v: "Free, on site" },
              ].map((row) => (
                <div key={row.k} className="bg-ivory p-5">
                  <dt className="text-[0.68rem] uppercase tracking-kicker text-taupe">{row.k}</dt>
                  <dd className="mt-2 font-display text-lg leading-snug">{row.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 max-w-2xl leading-relaxed text-umber">
              {home
                ? `We're at ${business.address.full}, with free parking at the door. Everything is by appointment, so the room is held for you alone — no waiting area, no overlap with another guest.`
                : `${c.city} sits ${c.distanceMiles} miles ${c.direction} Greenville, and the run in on ${c.highway} takes ${c.driveTime}. We're at ${business.address.full} with free parking at the door, so the only thing to plan around is the appointment itself.`}
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed text-umber">
              Everything at Lather is by appointment — {hoursShort}. If you&rsquo;re coming any
              distance, call ahead and we&rsquo;ll help you group treatments into a single visit.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-solid">
                Get Directions
              </a>
              <a href={business.phoneHref} className="btn-outline">
                Call {business.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHAT WE OFFER ────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-ivory">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="h-display text-4xl sm:text-5xl">What you can book</h2>
            <p className="mt-6 text-umber">
              Two pillars of care under one roof — the same menu for every guest, whether you live
              in Greenville or drive in for the afternoon.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.key} delay={i * 120} className="h-full">
                <div className="flex h-full flex-col border hairline bg-porcelain p-8">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-kicker text-brass-dark">
                    {pillar.tagline}
                  </p>
                  <h3 className="mt-3 font-display text-2xl">{pillar.label}</h3>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-umber">{pillar.intro}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {pillar.items.map((item) => (
                      <li
                        key={item.name}
                        className="border hairline px-3 py-1.5 text-[0.72rem] uppercase tracking-wideish text-umber"
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/services"
                    className="link-ul mt-auto inline-block pt-8 text-[0.75rem] font-semibold uppercase tracking-kicker"
                  >
                    View {pillar.label} →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HEAD SPA PRICING ─────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-bone">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <h2 className="h-display text-balance text-3xl sm:text-4xl">Head spa rituals</h2>
            <p className="mt-6 max-w-md text-umber">
              Our signature Japanese-inspired scalp ritual — cleanse, exfoliation, extended massage
              and targeted treatment. These book instantly online; facials, massage and wellness care
              are scheduled by consultation.
            </p>
            <Link
              href="/book"
              className="link-ul mt-8 inline-block text-[0.75rem] font-semibold uppercase tracking-kicker"
            >
              Full Menu &amp; Booking →
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <ul className="divide-y hairline border-y hairline">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.id}`}
                    className="group flex items-baseline justify-between gap-6 py-5"
                  >
                    <span className="font-display text-xl transition-colors group-hover:text-brass-dark sm:text-2xl">
                      {s.name}
                    </span>
                    <span className="shrink-0 text-[0.75rem] uppercase tracking-kicker text-taupe">
                      {s.duration} · {s.tier === "express" ? `from $${s.price}` : `$${s.price}`}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid mt-10 w-full sm:w-auto"
            >
              Book Appointment
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIAL ──────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-porcelain">
        <div className="wrap">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p aria-hidden className="mb-6 text-[0.85rem] tracking-[0.35em] text-brass-dark">
              ★★★★★
            </p>
            <span className="sr-only">Rated 5 out of 5 stars.</span>
            <blockquote className="h-display text-balance text-2xl italic leading-relaxed sm:text-3xl">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <footer className="mt-8 text-[0.75rem] uppercase tracking-kicker text-taupe">
              <span className="font-semibold text-ink">{testimonial.name}</span> · {testimonial.service}
              <br />
              <span className="text-[0.7rem]">{testimonial.location}</span>
            </footer>
          </Reveal>
        </div>
      </section>

      {/* ── NEARBY CITIES ────────────────────────────────────── */}
      <section className="grain relative section-pad bg-noir text-ivory">
        <div className="wrap relative">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-display text-3xl sm:text-4xl">Also driving in from</h2>
            <Link
              href="/locations"
              className="link-ul mb-2 text-[0.75rem] font-semibold uppercase tracking-kicker text-brass-light"
            >
              All Areas We Serve →
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-px border border-ivory/15 bg-ivory/15 sm:grid-cols-2 lg:grid-cols-4">
            {nearby.map((n, i) => (
              <Reveal key={n.slug} delay={i * 80} className="h-full">
                <Link
                  href={`/locations/${n.slug}`}
                  className="group flex h-full flex-col justify-between bg-noir p-8 transition-colors hover:bg-ink"
                >
                  <p className="font-display text-xl transition-colors group-hover:text-brass-light">
                    {n.city}
                  </p>
                  <span className="mt-8 text-[0.7rem] uppercase tracking-kicker text-ivory/65">
                    {isHome(n) ? "Right in Greenville" : `${n.driveTime} away`} →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW HERE ─────────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-ivory">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h2 className="h-display text-balance text-3xl sm:text-4xl">New to Lather?</h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { href: "/what-is-a-head-spa", label: "What is a head spa?", body: "The Japanese origins, how it differs from a salon wash, and what it costs." },
                { href: "/experience", label: "What happens in a session", body: "The five movements of the ritual, start to finish, and how to prepare." },
                { href: "/scalp-concerns", label: "Find a ritual by concern", body: "Thinning, dryness, buildup, tension, sensitivity or damage — matched to a treatment." },
                { href: "/faq", label: "Questions before booking", body: "Policies, timing, what to expect on a first visit, and how consultations work." },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="group flex flex-col border hairline bg-porcelain p-7">
                  <h3 className="font-display text-xl transition-colors group-hover:text-brass-dark">
                    {l.label}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-umber">{l.body}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <BookCTA
        title={home ? "Ready when you are." : `Worth the drive from ${c.city}.`}
        body={
          home
            ? undefined
            : `Book online in under a minute, or call and we'll help you plan a visit that's worth the ${c.driveTime.replace("about ", "")} each way.`
        }
      />
    </>
  );
}
