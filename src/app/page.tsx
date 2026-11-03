import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import Reveal from "@/components/Reveal";
import ServiceCards from "@/components/ServiceCards";
import CollapsingHero from "@/components/sections/CollapsingHero";
import Ledger, { LedgerRow } from "@/components/sections/Ledger";
import PillarDiptych from "@/components/sections/PillarDiptych";
import SplitFeature from "@/components/sections/SplitFeature";
import StickySplit, { SplitQuote } from "@/components/sections/StickySplit";
import { Em, Lede, Statement } from "@/components/ui/Type";
import { BOOK_URL, WELLNESS_BOOK_URL, business, hours, wellnessHoursShort } from "@/lib/business";
import { testimonials } from "@/lib/data";
import { featuredProvider, pillars, spaCards, wellnessCards } from "@/lib/menu";

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      {/* Opens full-bleed with the wordmark centred and draws back into a
          centred tile as you scroll — the intro's expansion, run backwards. */}
      <CollapsingHero
        src="/media/hero/hero-landscape.webp"
        video="/media/video/hero-landscape.mp4"
        alt=""
        tagline={
          <p className="text-base text-ivory/80 sm:text-lg">
            A luxury wellness destination in Greenville, North Carolina — restorative spa
            experiences and advanced, personalized wellness care, in one considered space.
          </p>
        }
      >
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-solid-light">
            Book the Spa
          </a>
          <a href={WELLNESS_BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
            Book Wellness
          </a>
        </div>
      </CollapsingHero>

      {/* h1 for the document, carried by the hero's wordmark visually. */}
      <h1 className="sr-only">
        Lather Spa &amp; Wellness — where modern wellness meets elevated self-care
      </h1>

      {/* ── THE TWO PILLARS ──────────────────────────────────── */}
      {/* One diptych rather than two stacked splits: the two practices sit as
          equal columns under a single seam, so the "one roof, one standard"
          idea is legible in the layout instead of only in the copy. */}
      <PillarDiptych
        pillars={pillars}
        kicker="The two pillars"
        heading={
          <>
            One roof, <Em>one standard.</Em>
          </>
        }
      />

      {/* ── THE SPA ──────────────────────────────────────────── */}
      {/* The three spa doors, each with its starting price. The ritual film
          that used to sit here now lives on /spa/head-spa, where the people
          who want it are already looking. */}
      <section className="section-pad bg-porcelain">
        <div className="wrap">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 text-[0.7rem] uppercase tracking-[0.18em] text-brass-dark">Lather Spa</p>
              <Statement as="h2" size="md">
                Unhurried, <Em>and entirely yours.</Em>
              </Statement>
            </div>
            <Link href="/spa" className="link-ul shrink-0 text-[0.9rem] font-medium">
              All spa services →
            </Link>
          </Reveal>
          <div className="mt-12">
            <ServiceCards cards={spaCards} rail />
          </div>
        </div>
      </section>

      {/* ── START HERE — WELLNESS ────────────────────────────── */}
      <SplitFeature
        src="/media/team/team-atmosphere.webp"
        alt="Inside Lather Spa & Wellness"
        side="right"
        tone="ivory"
        body={
          <>
            <Lede>{featuredProvider.blurb}</Lede>
            <p className="mt-8 font-display text-xl text-brass-dark">
              {featuredProvider.service} · ${featuredProvider.price}
              <span className="block text-[0.8rem] font-normal tracking-[0.015em] text-taupe">
                with {featuredProvider.name}, {featuredProvider.role}
              </span>
            </p>
          </>
        }
        actions={
          <>
            <a href={WELLNESS_BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-solid">
              Request a Foundations Visit
            </a>
            <Link href="/wellness" className="btn-outline">
              Explore Wellness
            </Link>
          </>
        }
      >
        {/* Every wellness plan starts with the Foundations visit, so that is
            the one thing this section asks for. It books on the wellness
            practice's own Vagaro profile, not the spa's. */}
        <p className="mb-4 font-body text-[0.7rem] uppercase tracking-[0.18em] text-brass-dark">
          Lather Wellness
        </p>
        <Statement as="h2" size="md">
          It starts <Em>with you.</Em>
        </Statement>
      </SplitFeature>

      <section className="section-pad border-t hairline bg-ivory pt-0 sm:pt-0">
        <div className="wrap">
          <ServiceCards cards={wellnessCards} columns={4} rail />
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="section-pad bg-bone">
        <div className="wrap">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Statement as="h2" size="md">
              <Em>In</Em> their words
            </Statement>
          </Reveal>
        </div>

        <Ledger className="mt-10">
          {testimonials.map((t, i) => (
            <LedgerRow
              key={t.name}
              aside={String(i + 1).padStart(2, "0")}
              lead={
                <blockquote className="font-display text-[clamp(1.55rem,3.2vw,2.75rem)] leading-[1.24]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              }
              tail={
                <footer className="font-body text-[0.8rem] tracking-[0.015em] text-taupe">
                  {/* The rating stays next to the name rather than sitting above
                      the quote. It is a real signal and worth carrying, but a row
                      of stars set large is the loudest thing on a page whose whole
                      argument is restraint. */}
                  <span aria-hidden className="mr-2 text-[0.72rem] tracking-[0.08em] text-brass-dark">
                    ★★★★★
                  </span>
                  <span className="sr-only">Rated 5 out of 5 stars. </span>
                  <span className="font-semibold text-ink">{t.name}</span> · {t.service}
                  <span className="mt-1 block text-[0.7rem]">{t.location}</span>
                </footer>
              }
            />
          ))}
        </Ledger>
      </section>

      {/* ── FOUNDERS ─────────────────────────────────────────── */}
      <StickySplit
        src="/media/founders/founders-staircase.webp"
        alt="Lather Spa & Wellness founders Hannah DeMotts, Abigail Baldwin, and Stacia Friend, CNM"
        side="left"
        tone="ivory"
        strip={[
          { src: "/media/gallery/interior-waiting-room.webp", alt: "The Lather lounge" },
          { src: "/media/gallery/interior-gold-mirror.webp", alt: "Gold-framed mirror in the treatment room" },
        ]}
      >
        <SplitQuote
          attribution="Hannah DeMotts, Abigail Baldwin & Stacia Friend, CNM"
          role="founders of Lather"
        >
          &ldquo;You could find a spa, or you could find clinical wellness care, but almost never
          both. We stopped waiting for someone else to build the room we wanted to walk into.&rdquo;
        </SplitQuote>

        <Reveal delay={260} className="mt-14">
          <div className="flex justify-center">
            <Link href="/about" className="btn-outline">
              Meet the Founders
            </Link>
          </div>
        </Reveal>
      </StickySplit>

      {/* ── VISIT ────────────────────────────────────────────── */}
      <SplitFeature
        src="/media/pages/locations-hero.webp"
        alt="The lounge at Lather Spa & Wellness in Greenville, NC"
        side="left"
        tone="porcelain"
        body={
          <>
            <address className="not-italic text-umber">
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
              <br />
              <a href={business.phoneHref} className="link-ul mt-4 inline-block">
                {business.phone}
              </a>
            </address>
            <p className="mt-4 text-[0.85rem] text-taupe">{business.parking} · By appointment</p>
            <p className="mt-8 text-[0.68rem] tracking-[0.02em] text-taupe">Spa hours</p>
            <ul className="mt-3 max-w-sm space-y-1 text-[0.9rem] text-umber">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-3 border-b hairline pb-1">
                  <span className="whitespace-nowrap">{h.day}</span>
                  <span className="whitespace-nowrap">
                    {h.open ? `${h.open} – ${h.close}` : "Closed"}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-sm text-[0.9rem] text-umber">
              Wellness <span className="text-taupe">·</span> {wellnessHoursShort}
            </p>
          </>
        }
      >
        <Statement as="h2" size="md">
          <Em>In the heart of</Em> Greenville.
        </Statement>
      </SplitFeature>

      <BookCTA />

    </>
  );
}
