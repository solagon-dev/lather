import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import Marquee from "@/components/Marquee";
import UtilityHero from "@/components/heroes/UtilityHero";
import Reveal from "@/components/Reveal";
import { Em } from "@/components/ui/Type";
import { BOOK_URL } from "@/lib/business";
import { featuredProvider, pillars } from "@/lib/menu";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Spa & Wellness Services",
  description:
    "Head spa, Glo2Facials and massage, plus women's wellness, laser hair removal and Secret RF & PRO in Greenville, NC. Two pillars of care under one roof.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ])
        )}
      />
      <UtilityHero
        title={
          <>
            Care, <Em>in two forms.</Em>
          </>
        }
        sub="Restorative spa experiences and advanced, personalized wellness — tailored to your goals."
      />

      {/* Menu-pending note */}
      <section className="border-b hairline bg-porcelain px-5 py-10 sm:px-10 lg:px-16">
        <Reveal className="wrap">
          <p className="max-w-3xl text-umber">
            Head spa rituals, Glo2Facials, and massage book online with the spa. Wellness visits
            are requested online with Lather Wellness, and the practice confirms your time.{" "}
            <Link href="/book" className="link-ul font-medium text-ink">
              See the full menu and pricing
            </Link>
            , or tap any treatment below and we&rsquo;ll help you choose.
          </p>
        </Reveal>
      </section>

      {/* ── PILLARS ──────────────────────────────────────────── */}
      {pillars.map((pillar, idx) => (
        <section
          key={pillar.key}
          className={`section-pad ${idx % 2 === 0 ? "bg-porcelain" : "border-t hairline bg-ivory"}`}
        >
          <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-center gap-3">
                <p className="text-[0.7rem] font-semibold tracking-[0.02em] text-brass-dark">
                  {pillar.tagline}
                </p>
                {pillar.comingSoon && (
                  <span className="rounded-full border border-brass-dark/40 px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.16em] text-brass-dark">
                    Coming soon
                  </span>
                )}
              </div>
              <h2 className="h-display mt-4 text-4xl sm:text-5xl">{pillar.label}</h2>
              <p className="mt-6 max-w-md text-umber">{pillar.intro}</p>
              <div className="relative mt-8 hidden aspect-[4/3] w-full max-w-md overflow-hidden lg:block">
                <Image
                  src={pillar.image}
                  alt={pillar.label}
                  fill
                  sizes="40vw"
                  style={{ objectPosition: pillar.imagePosition }}
                  className="object-cover"
                />
              </div>
              {pillar.comingSoon ? (
                <>
                  {pillar.comingSoonNote && (
                    <p className="mt-8 max-w-md text-[0.9rem] text-umber">{pillar.comingSoonNote}</p>
                  )}
                  <a
                    href={BOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-solid mt-5 w-full sm:w-auto"
                  >
                    Book the Spa
                  </a>
                </>
              ) : (
                <a
                  href={pillar.bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-solid mt-8 w-full sm:w-auto"
                >
                  Book {pillar.label}
                </a>
              )}
            </Reveal>

            <div className="divide-y hairline border-y hairline">
              {/* A coming-soon pillar lists its menu but does not link each row
                  to a booking that cannot yet be honoured — the rows are the
                  published preview, informational until wellness opens. A live
                  pillar keeps every row a link (services without a detail page
                  route to Visit & Contact, where those bookings are arranged).*/}
              {pillar.items.map((item, i) =>
                pillar.comingSoon ? (
                  <Reveal key={item.name} as="div" delay={i * 50}>
                    <div className="py-6">
                      <h3 className="font-display text-2xl">{item.name}</h3>
                      <p className="mt-2 max-w-2xl text-[0.95rem] text-umber">{item.blurb}</p>
                    </div>
                  </Reveal>
                ) : (
                  <Reveal key={item.name} as="div" delay={i * 50}>
                    <Link
                      href={item.href ?? "/contact"}
                      className="group block py-6 transition-colors duration-300 hover:bg-ink/[0.03]"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-2xl transition-colors duration-300 group-hover:text-brass-dark">
                          {item.name}
                        </h3>
                        <span className="shrink-0 text-[0.7rem] tracking-[0.015em] text-brass-dark">
                          {item.href ? "Learn more →" : "Ask about this →"}
                        </span>
                      </div>
                      <p className="mt-2 max-w-2xl text-[0.95rem] text-umber">{item.blurb}</p>
                    </Link>
                  </Reveal>
                )
              )}

              {pillar.key === "wellness" && (
                <Reveal className="bg-noir p-8 text-ivory">
                  <p className="text-[0.7rem] font-semibold tracking-[0.02em] text-brass-light">
                    It starts with you
                  </p>
                  <p className="mt-4 font-display text-2xl">
                    {featuredProvider.service} with {featuredProvider.name}
                  </p>
                  <p className="mt-3 max-w-xl text-[0.95rem] text-ivory/70">{featuredProvider.blurb}</p>
                  <p className="mt-5 text-[0.8rem] tracking-[0.015em] text-brass-light">
                    ${featuredProvider.price} · Requested online, confirmed by the practice
                  </p>
                  <a
                    href={pillar.bookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-solid-light mt-6 w-full sm:w-auto"
                  >
                    Request a Foundations Visit
                  </a>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      ))}

      <Marquee />
      <BookCTA
        title="Not sure where to start?"
        body="Book a wellness consultation or reach out — we'll help you build a plan around your goals. New guests always welcome."
      />
    </>
  );
}
