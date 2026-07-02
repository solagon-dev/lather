import type { Metadata } from "next";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import FaqAccordion from "@/components/FaqAccordion";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { business, hours } from "@/lib/business";
import { faqs } from "@/lib/data";
import { seoCities } from "@/lib/seo-pages";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact, Hours & Directions — Greenville, NC",
  description:
    "Find Lather Head Spa at 620 Lynndale Court, Unit B in Greenville, NC. Hours, phone, directions, and free parking — a quiet, adults-focused head spa, by appointment only.",
  alternates: { canonical: "/contact" },
};

const wintervilleDrive =
  seoCities.find((c) => c.slug === "winterville-nc")?.driveTime ?? "about 10 minutes";

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
      <PageHero
        kicker="Visit Us"
        title={
          <>
            Come find your <span className="italic">quiet</span>
          </>
        }
        sub="Tucked off Lynndale Court in Greenville, North Carolina — a private, adults-focused sanctuary with free parking at the door."
        image="/media/pages/contact-hero.webp"
        imageAlt="The calm interior of Lather Head Spa in Greenville, NC"
      />

      {/* ── NAP + MAP ────────────────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="kicker-line">Where to Find Us</p>
            <h2 className="h-display mt-6 text-4xl sm:text-5xl">
              In the heart of <span className="italic">Greenville</span>
            </h2>
            <address className="mt-8 not-italic text-umber">
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener"
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
                  <a href={business.instagram} target="_blank" rel="noopener" className="link-ul">
                    {business.instagramHandle}
                  </a>
                </p>
              </div>
            </address>

            <div className="mt-10 max-w-sm">
              <p className="text-[0.62rem] uppercase tracking-kicker text-taupe">Hours</p>
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
              By appointment only · Free parking · A quiet, adults-focused space
            </p>
          </Reveal>

          <Reveal delay={120} className="flex">
            <div className="w-full overflow-hidden border hairline">
              <iframe
                src={
                  "https://www.google.com/maps?q=" +
                  encodeURIComponent("Lather Head Spa, 620 Lynndale Court, Greenville, NC 27858") +
                  "&output=embed"
                }
                title="Map to Lather Head Spa"
                loading="lazy"
                className="h-full min-h-[420px] w-full border-0"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GETTING HERE ─────────────────────────────────────── */}
      <section className="grain relative section-pad border-t hairline bg-noir text-ivory">
        <div className="wrap relative">
          <Reveal className="max-w-2xl">
            <p className="kicker-line text-brass-light">Getting Here</p>
            <h2 className="h-display mt-6 text-balance text-4xl sm:text-5xl">
              Closer than a <span className="italic text-brass-light">day off</span>
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
            <p className="kicker-line">Before You Arrive</p>
            <h2 className="h-display mt-6 text-4xl sm:text-5xl">
              Good to <span className="italic">know</span>
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
