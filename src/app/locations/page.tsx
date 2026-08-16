import type { Metadata } from "next";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import UtilityHero from "@/components/heroes/UtilityHero";
import Reveal from "@/components/Reveal";
import { Em } from "@/components/ui/Type";
import { business } from "@/lib/business";
import { servedCities } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Areas We Serve in Eastern NC",
  description:
    "Lather Spa & Wellness in Greenville, NC welcomes guests from Winterville, Ayden, Farmville, Washington, New Bern and across Eastern North Carolina.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <UtilityHero
        kicker="Areas we serve"
        title={
          <>
            One spa, all of <Em>Eastern North Carolina.</Em>
          </>
        }
        sub="Guests drive from every corner of the region for an hour that belongs entirely to them. Find your city — and your drive time — below."
      />

      {/* ── INTRO ────────────────────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap">
          <Reveal className="max-w-prose2">
            <p className="font-display text-2xl leading-relaxed sm:text-3xl">
              There is exactly one Lather — at {business.address.full} — and guests make the drive
              from all over Eastern North Carolina to be here.
            </p>
            <p className="mt-6 max-w-xl text-umber">
              For most of the region, a genuinely restorative spa and wellness experience is closer
              than you think. Every city below has a page covering the route, the drive time, and
              what you can book once you arrive.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CITY TABLE ───────────────────────────────────────────
          A distance ladder rather than a grid of cards: the one thing every
          visitor to this page wants is "how far am I", answered at a glance. */}
      <section className="section-pad border-t hairline bg-ivory">
        <div className="wrap">
          <Reveal>
            <h2 className="h-display text-4xl sm:text-5xl">Find your drive</h2>
          </Reveal>
          <Reveal delay={100} className="mt-14 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">
                Cities served by Lather Spa &amp; Wellness, with drive time and distance from each
                to our Greenville location.
              </caption>
              <thead>
                <tr className="border-b hairline text-[0.68rem] uppercase tracking-kicker text-taupe">
                  <th scope="col" className="py-4 pr-4 font-medium">City</th>
                  <th scope="col" className="py-4 pr-4 font-medium">Drive time</th>
                  <th scope="col" className="py-4 pr-4 font-medium">Distance</th>
                  <th scope="col" className="py-4 font-medium">Route in</th>
                </tr>
              </thead>
              <tbody>
                {servedCities.map((c) => (
                  <tr key={c.slug} className="group border-b hairline">
                    {/* Only the catchment cities have their own page; the rest
                        are listed for their drive time, which is the reason
                        anyone opens this table. */}
                    <th scope="row" className="py-5 pr-4 font-normal">
                      {c.hasPage ? (
                        <Link
                          href={`/locations/${c.slug}`}
                          className="link-ul font-display text-xl transition-colors group-hover:text-brass-dark sm:text-2xl"
                        >
                          {c.city}, {c.state}
                        </Link>
                      ) : (
                        <span className="font-display text-xl sm:text-2xl">
                          {c.city}, {c.state}
                        </span>
                      )}
                    </th>
                    <td className="py-5 pr-4 text-[0.9rem] text-umber">
                      {c.distanceMiles === 0 ? "You're here" : c.driveTime.replace("about ", "")}
                    </td>
                    <td className="py-5 pr-4 text-[0.9rem] text-umber">
                      {c.distanceMiles === 0 ? "In town" : `${c.distanceMiles} mi`}
                    </td>
                    <td className="py-5 text-[0.9rem] text-umber">{c.highway}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal className="mt-10">
            <p className="max-w-2xl text-[0.9rem] text-taupe">
              Don&rsquo;t see your city? We welcome guests from anywhere in Eastern North Carolina
              — call{" "}
              <a href={business.phoneHref} className="link-ul">
                {business.phone}
              </a>{" "}
              and we&rsquo;ll help you plan the visit.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── WHAT'S HERE ──────────────────────────────────────── */}
      <section className="grain relative section-pad bg-noir text-ivory">
        <div className="wrap relative grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h2 className="h-display text-balance text-3xl sm:text-4xl">
              What&rsquo;s worth the drive
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { href: "/services", label: "Spa & wellness services", body: "Head spa, facials, massage, skin, brows and red light — plus consultations, hormone therapy, peptides, injectables and vitamin therapy." },
                { href: "/book", label: "Head spa pricing", body: "Four rituals, 45 to 90 minutes, $50 to $200 — bookable online any time." },
                { href: "/what-is-a-head-spa", label: "What is a head spa?", body: "The Japanese origins, how it differs from a salon wash, and what to expect." },
                { href: "/contact", label: "Hours & directions", body: "Free parking at the door, by appointment, new guests always welcome." },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="group flex flex-col border border-ivory/15 p-7 transition-colors hover:bg-ink">
                  <h3 className="font-display text-xl transition-colors group-hover:text-brass-light">
                    {l.label}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-ivory/70">{l.body}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <BookCTA
        title="Whatever the drive, it's worth it."
        body="Sessions are by appointment only — every time slot is held exclusively for you. Book online in under a minute, or call and we'll take care of the rest."
      />
    </>
  );
}
