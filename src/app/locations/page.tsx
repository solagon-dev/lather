import type { Metadata } from "next";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { business } from "@/lib/business";
import { locations } from "@/lib/locations";
import { seoServiceTypes } from "@/lib/seo-pages";

export const metadata: Metadata = {
  title: "Areas We Serve — Head Spa for Eastern North Carolina",
  description:
    "Lather Head Spa in Greenville, NC welcomes guests from Winterville, Ayden, Farmville, Washington, New Bern, and across Eastern North Carolina. Find your drive time.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        kicker="Areas We Serve"
        title={
          <>
            One spa, all of <span className="italic">Eastern North Carolina</span>
          </>
        }
        sub="Guests drive from every corner of the region for an hour that belongs entirely to them. Find your city — and your drive time — below."
        image="/media/pages/locations-hero.webp"
        imageAlt="The quiet interior of Lather Head Spa in Greenville, NC"
      />

      {/* ── INTRO ────────────────────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap">
          <Reveal className="max-w-prose2">
            <p className="kicker-line">Where to Find Us</p>
            <p className="mt-8 font-display text-2xl font-light leading-relaxed sm:text-3xl">
              There is exactly one Lather — at {business.address.full} — and guests make the drive
              from all over Eastern North Carolina to be here.
            </p>
            <p className="mt-6 max-w-xl text-umber">
              For most of the region, a genuinely restorative head spa ritual is closer than you
              think. The pages below cover what the drive looks like from your city, and why so
              many of your neighbors have already made it a habit.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CITY GRID ────────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-ivory">
        <div className="wrap">
          <Reveal>
            <p className="kicker-line">By City</p>
            <h2 className="h-display mt-6 text-4xl sm:text-5xl">
              Find your <span className="italic">drive</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border hairline bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc, i) => (
              <Reveal key={loc.slug} delay={i * 60} className="h-full">
                <Link
                  href={`/locations/${loc.slug}`}
                  className="group flex h-full flex-col justify-between bg-porcelain p-8 transition-colors hover:bg-bone"
                >
                  <div>
                    <h3 className="font-display text-2xl font-normal transition-colors group-hover:text-brass-dark sm:text-3xl">
                      {loc.city}
                    </h3>
                    <p className="mt-3 text-[0.9rem] text-umber">
                      {loc.driveTime ? `${loc.driveTime} away` : "Right in Greenville"}
                      {loc.distanceMiles ? ` · ${loc.distanceMiles} miles` : ""}
                    </p>
                  </div>
                  <span className="link-ul mt-8 inline-block self-start text-[0.7rem] font-semibold uppercase tracking-kicker text-ink group-hover:text-brass-dark">
                    {loc.city}, {loc.state} →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO CROSS-LINKS ──────────────────────────────────── */}
      <section className="grain relative section-pad bg-noir text-ivory">
        <div className="wrap relative">
          <Reveal className="max-w-2xl">
            <p className="kicker-line text-brass-light">Looking for Something Specific?</p>
            <h2 className="h-display mt-6 text-balance text-3xl sm:text-4xl">
              Four ways to search, <span className="italic text-brass-light">one address</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {seoServiceTypes.map((s, i) => (
              <Reveal key={s.key} delay={i * 80} className="h-full">
                <Link
                  href={`/${s.urlPrefix}/greenville-nc`}
                  className="group flex h-full flex-col justify-between bg-noir p-8 transition-colors hover:bg-ink"
                >
                  <p className="font-display text-xl text-ivory transition-colors group-hover:text-brass-light">
                    {s.label}
                  </p>
                  <span className="mt-8 text-[0.65rem] uppercase tracking-kicker text-ivory/50">
                    Greenville, NC →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BookCTA
        title="Whatever the drive, it's worth it."
        body="Sessions are by appointment only — every time slot is held exclusively for you. Book online in under a minute, or call and we'll take care of the rest."
      />
    </>
  );
}
