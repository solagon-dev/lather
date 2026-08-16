import type { Metadata } from "next";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import FaqAccordion from "@/components/FaqAccordion";
import MapEmbed from "@/components/MapEmbed";
import UtilityHero from "@/components/heroes/UtilityHero";
import Reveal from "@/components/Reveal";
import { Em } from "@/components/ui/Type";
import { business, hours } from "@/lib/business";
import { faqs } from "@/lib/data";
import { getCity } from "@/lib/locations";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact, Hours & Directions",
  description:
    "Lather Spa & Wellness, 101 Fox Haven Drive, Greenville NC. Hours, phone, directions and free parking. By appointment — new guests welcome.",
  alternates: { canonical: "/contact" },
};

const wintervilleDrive = getCity("winterville-nc")?.driveTime ?? "about 10 minutes";

const gettingHere = [
  {
    title: "From ECU & downtown",
    body: "About 10 minutes from campus and downtown Greenville — an easy escape between classes, shifts, or meetings.",
  },
  {
    title: "From Winterville",
    body: `${wintervilleDrive.charAt(0).toUpperCase()}${wintervilleDrive.slice(1)} up Greenville Boulevard — closer than you think, quieter than you'd guess.`,
  },
  {
    title: "Parking",
    body: "Free parking right at the door. No garages, no meters — just walk in and exhale.",
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ])
        )}
      />
      <UtilityHero
        kicker="Visit"
        title={
          <>
            Come find your <Em>quiet.</Em>
          </>
        }
        sub="On Fox Haven Drive in Greenville, North Carolina — a calm, elevated space with free parking at the door. Designed with women in mind, all guests welcome."
        aside={{
          src: "/media/pages/contact-hero.webp",
          alt: "The calm interior of Lather Spa & Wellness in Greenville, NC",
        }}
      />

      {/* ── NAP + MAP ────────────────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap grid gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="h-display text-4xl sm:text-5xl">
              In the heart of Greenville
            </h2>
            <address className="mt-8 not-italic text-umber">
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-ul font-display text-2xl text-ink"
              >
                {business.address.street}
              </a>
              <br />
              {business.address.city}, {business.address.state} {business.address.zip}
              <div className="mt-6 space-y-2">
                <p>
                  <a href={business.phoneHref} className="link-ul">
                    {business.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${business.email}`} className="link-ul">
                    {business.email}
                  </a>
                </p>
                <p>
                  <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="link-ul">
                    {business.instagramHandle}
                  </a>
                </p>
              </div>
            </address>

            <div className="mt-10 max-w-sm">
              <p className="text-[0.68rem] uppercase tracking-kicker text-taupe">Hours</p>
              <ul className="mt-4 space-y-1 text-[0.9rem] text-umber">
                {hours.map((h) => (
                  <li key={h.day} className="flex justify-between border-b hairline pb-1">
                    <span>{h.day}</span>
                    <span>{h.open ? `${h.open} – ${h.close}` : "Closed"}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-8 text-[0.85rem] text-taupe">
              By appointment · Free parking · New guests welcome
            </p>
          </Reveal>

          <Reveal delay={120} className="flex">
            <div className="flex w-full overflow-hidden border hairline">
              <MapEmbed />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GETTING HERE ─────────────────────────────────────── */}
      <section className="grain relative section-pad border-t hairline bg-noir text-ivory">
        <div className="wrap relative">
          <Reveal className="max-w-2xl">
            <h2 className="h-display text-balance text-4xl sm:text-5xl">
              Closer than a day off
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-ivory/10 pt-12 md:grid-cols-3">
            {gettingHere.map((g, i) => (
              <Reveal key={g.title} delay={i * 80}>
                <h3 className="font-display text-2xl">{g.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ivory/60">{g.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ TEASER ───────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-ivory">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h2 className="h-display text-4xl sm:text-5xl">
              Good to know
            </h2>
            <p className="mt-6 max-w-md text-umber">
              A few things guests ask before their first visit — the full list lives on our FAQ
              page.
            </p>
            <Link
              href="/faq"
              className="link-ul mt-8 inline-block text-[0.75rem] font-semibold uppercase tracking-kicker"
            >
              All Questions →
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <FaqAccordion faqs={faqs.slice(0, 3)} />
          </Reveal>
        </div>
      </section>

      <BookCTA title="Ready when you are." />
    </>
  );
}
