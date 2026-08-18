import { Fragment } from "react";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import Reveal from "@/components/Reveal";
import SocialSection from "@/components/SocialSection";
import CollapsingHero from "@/components/sections/CollapsingHero";
import FullBleedStatement from "@/components/sections/FullBleedStatement";
import ImageRow from "@/components/sections/ImageRow";
import Ledger, { LedgerRow } from "@/components/sections/Ledger";
import MatrixGallery from "@/components/sections/MatrixGallery";
import CoinStatement from "@/components/sections/CoinStatement";
import CTASection from "@/components/sections/CTASection";
import PinnedObjectSequence from "@/components/sections/PinnedObjectSequence";
import HorizontalSteps from "@/components/sections/HorizontalSteps";
import SplitFeature from "@/components/sections/SplitFeature";
import StickySplit, { SplitQuote } from "@/components/sections/StickySplit";
import StatementSection from "@/components/sections/StatementSection";
import LineReveal from "@/components/ui/LineReveal";
import { Em, Lede, Statement } from "@/components/ui/Type";
import { Soft } from "@/components/ui/CinematicHeading";
import { BOOK_URL, business, hours } from "@/lib/business";
import { testimonials } from "@/lib/data";
import { experienceSteps } from "@/lib/experience";
import { featuredProvider, pillars, whyLather } from "@/lib/menu";

// The board that opens "Step inside" — interiors only, and deliberately none
// of the photos the Instagram strip further down uses.
const galleryTiles = [
  { src: "/media/gallery/interior-gold-mirror.webp", alt: "Gold-framed mirror in the Lather treatment room", ratio: "aspect-[3/4]" },
  { src: "/media/gallery/interior-waiting-room.webp", alt: "The Lather lounge", ratio: "aspect-[4/5]" },
  { src: "/media/gallery/interior-lamp-brass.webp", alt: "Brass lamp detail at Lather Spa & Wellness", ratio: "aspect-[3/4]" },
  { src: "/media/gallery/interior-reception-detail.webp", alt: "Reception details at Lather Spa & Wellness", ratio: "aspect-[4/5]" },
  { src: "/media/gallery/interior-crystal-lamp.webp", alt: "Crystal lamp detail", ratio: "aspect-[4/5]" },
  { src: "/media/gallery/interior-diffuser.webp", alt: "Diffuser detail in the treatment room", ratio: "aspect-[3/4]" },
  { src: "/media/gallery/interior-team-portrait.webp", alt: "The Lather team", ratio: "aspect-[3/4]" },
  { src: "/media/editorial/secondary-treatment.webp", alt: "A treatment detail", ratio: "aspect-[4/5]" },
  { src: "/media/experience/step-04-treatment.webp", alt: "Targeted scalp treatment", ratio: "aspect-[3/4]" },
  { src: "/media/editorial/value-prop.webp", alt: "A quiet moment at Lather", ratio: "aspect-[4/5]" },
  { src: "/media/treatments/classic-ritual.webp", alt: "The Classic Ritual", ratio: "aspect-[3/4]" },
  { src: "/media/gallery/treatment-waterfall.webp", alt: "Warm water over the scalp", ratio: "aspect-[4/5]" },
];

/**
 * The robe model.
 *
 * Converted from the purchased Marvelous Designer OBJ: 210k faces and two
 * 8192px maps became 53k faces and 2048px WebP, meshopt-compressed —
 * 11.1MB to 797KB. Point this at undefined to fall back to photography.
 */
const ROBE_MODEL: string | undefined = "/models/robe.glb";

// The five movements, reused from /experience so the two pages can never drift.
const ritualSteps = experienceSteps.map((s) => ({
  src: s.image,
  alt: `${s.title} — movement ${s.number} of the Lather head spa ritual`,
  number: s.number,
  title: s.title,
  body: s.body,
}));

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
            Book Appointment
          </a>
          <Link href="/services" className="btn-outline-light">
            Explore Services
          </Link>
        </div>
      </CollapsingHero>

      {/* h1 for the document, carried by the hero's wordmark visually. */}
      <h1 className="sr-only">
        Lather Spa &amp; Wellness — where modern wellness meets elevated self-care
      </h1>

      {/* ── THE FOUNTAIN, PINNED ─────────────────────────────── */}
      {/* One object held across three beats: the mark rises and turns while
          the argument changes over it. */}
      <PinnedObjectSequence
        modelSrc={ROBE_MODEL}
        beats={[
          {
            place: "under",
            lines: [
              <Fragment key="1a">
                One destination <Soft>for the</Soft>
              </Fragment>,
              <Fragment key="1b">whole of you</Fragment>,
            ],
          },
          {
            place: "left",
            lines: [
              <Fragment key="2a">
                Restorative <Soft>spa,</Soft>
              </Fragment>,
              <Fragment key="2b">
                <Soft>and</Soft> clinical care
              </Fragment>,
            ],
            note: "Two practices that usually live in different buildings, kept under one roof and one standard.",
          },
          {
            place: "right",
            lines: [
              <Fragment key="3a">Results without</Fragment>,
              <Fragment key="3b">
                <Soft>the</Soft> trade-off
              </Fragment>,
            ],
            note: "Outcomes you can measure, in a room that never once feels clinical.",
          },
          {
            place: "centre",
            lines: [
              <Fragment key="4a">
                <Soft>and every hour of it is</Soft>
              </Fragment>,
              <Fragment key="4b">yours alone</Fragment>,
            ],
            tail: (
              <>
                <Lede centered className="max-w-[52ch] text-umber">
                  Lather blends restorative spa experiences with advanced, personalized wellness
                  care — bridging the gap between clinical wellness and the restorative spa, in one
                  thoughtfully designed space.
                </Lede>
                <Link href="/about" className="btn-outline pointer-events-auto mt-9">
                  Our story
                </Link>
              </>
            ),
          },
        ]}
      />

      {/* ── THE TWO PILLARS ──────────────────────────────────── */}
      {pillars.map((pillar, i) => (
        <SplitFeature
          key={pillar.key}
          src={pillar.image}
          alt={pillar.label}
          focal={pillar.imagePosition}
          side={i % 2 === 0 ? "left" : "right"}
          tone={i % 2 === 0 ? "ivory" : "porcelain"}
          body={
            <>
              <Lede>{pillar.intro}</Lede>
              <ul className="mt-8 flex flex-wrap gap-2">
                {pillar.items.map((item) => (
                  <li
                    key={item.name}
                    className="border hairline px-3 py-1.5 text-[0.72rem] tracking-[0.015em] text-umber"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </>
          }
          actions={
            <Link href="/services" className="btn-outline">
              View {pillar.label}
            </Link>
          }
        >
          <Statement as="h2" size="md">
            {pillar.label}
          </Statement>
        </SplitFeature>
      ))}

      {/* ── THE RITUAL, PINNED ───────────────────────────────── */}
      {/* The page's ground is light throughout; the only dark on it comes from
          a photograph or a rendered object, never from a panel painted noir.
          So the film below is dark because it *is* film, and the two beats
          that bracket it are light — which is also what stops the ritual from
          arriving as one undifferentiated black stretch. */}
      <StatementSection tone="ivory">
        <Statement as="h2" size="lg">
          <LineReveal
            lines={[
              <Fragment key="a">
                One unhurried hour, <Em>five</Em>
              </Fragment>,
              <Fragment key="b">
                <Em>movements.</Em>
              </Fragment>,
            ]}
          />
        </Statement>
      </StatementSection>

      <HorizontalSteps steps={ritualSteps} />

      <StatementSection
        tone="porcelain"
        body={
          <Lede centered className="text-umber">
            Assessed, cleansed, massaged, treated, renewed. Every appointment is private and held
            exclusively for you — nothing is rushed, because the slower the session moves, the
            better it works.
          </Lede>
        }
        actions={
          <Link href="/experience" className="btn-solid">
            The full experience
          </Link>
        }
      >
        <Statement as="h2" size="md">
          The slower it moves, <Em>the better</Em> it works.
        </Statement>
      </StatementSection>

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
              {featuredProvider.name}
              <span className="block text-[0.8rem] font-normal tracking-[0.015em] text-taupe">
                {featuredProvider.role}
              </span>
            </p>
          </>
        }
        actions={
          <>
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-solid">
              Book a Consultation
            </a>
            <Link href="/services" className="btn-outline">
              All Wellness Services
            </Link>
          </>
        }
      >
        <Statement as="h2" size="md">
          Begin with a <Em>wellness</Em> consultation.
        </Statement>
      </SplitFeature>

      {/* ── WHY LATHER ───────────────────────────────────────── */}
      {/* Five reasons read as an index rather than as a wrapped grid — the old
          three-then-two layout left a ragged short row that read as a mistake,
          and no amount of centring fixed it. */}
      <section className="section-pad bg-porcelain">
        <div className="wrap">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Statement as="h2" size="md">
              Why <Em>Lather</Em>
            </Statement>
          </Reveal>
        </div>

        <Ledger className="mt-10">
          {whyLather.map((item, i) => (
            <LedgerRow
              key={item.title}
              aside={String(i + 1).padStart(2, "0")}
              lead={
                <h3 className="font-display text-[clamp(1.5rem,2.8vw,2.35rem)] leading-[1.24]">
                  {item.title}
                </h3>
              }
              tail={
                <p className="max-w-[54ch] text-[0.98rem] leading-relaxed text-umber">{item.body}</p>
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

      {/* ── EDITORIAL BREAK ──────────────────────────────────── */}
      <FullBleedStatement
        src="/media/editorial/editorial-break.webp"
        alt=""
        scrim="strong"
        height="short"
      >
        <Statement as="p" size="md" className="mx-auto max-w-4xl">
          Somewhere <Em>to slow down,</Em> feel genuinely cared for, <Em>and</Em> invest in yourself{" "}
          <Em>without guilt.</Em>
        </Statement>
      </FullBleedStatement>

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

      {/* ── STEP INSIDE ──────────────────────────────────────── */}
      <StatementSection className="pb-0">
        <Statement as="h2" size="md">
          Step <Em>inside.</Em>
        </Statement>
      </StatementSection>
      <MatrixGallery tiles={galleryTiles} cta={{ href: "/about", label: "Our space" }} />

      {/* ── SOCIAL ───────────────────────────────────────────── */}
      <SocialSection />

      {/* ── A LINE TO LIVE BY ────────────────────────────────── */}
      {/* The mark set into the middle of the line: the first half passes
          behind it, the second half crosses in front. */}
      <CoinStatement
        lines={[
          { left: "You arrive", right: "carrying" },
          { left: "the whole week", right: "in your neck," },
          { left: "your jaw,", right: "your hands." },
          { left: "You leave", right: "carrying none" },
          { left: "of it, and better", right: "than you arrived." },
        ]}
      />

      {/* ── THE ASK ──────────────────────────────────────────── */}
      <CTASection
        lines={[
          <Fragment key="c1">Come and see</Fragment>,
          <Fragment key="c2">
            what an hour <Em>can do.</Em>
          </Fragment>,
        ]}
        body="Book a single ritual or a full afternoon. Either way the room is yours, and nothing about it is rushed."
        actions={
          <>
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-solid-light">
              Book appointment
            </a>
            <Link href="/services" className="btn-outline-light">
              Explore services
            </Link>
          </>
        }
      />

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
            <ul className="mt-8 max-w-sm space-y-1 text-[0.9rem] text-umber">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-3 border-b hairline pb-1">
                  <span className="whitespace-nowrap">{h.day}</span>
                  <span className="whitespace-nowrap">
                    {h.open ? `${h.open} – ${h.close}` : "Closed"}
                  </span>
                </li>
              ))}
            </ul>
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
