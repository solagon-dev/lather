import { Fragment } from "react";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import HeroMedia from "@/components/HeroMedia";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import SocialSection from "@/components/SocialSection";
import FullBleedStatement from "@/components/sections/FullBleedStatement";
import ImageRow from "@/components/sections/ImageRow";
import MoodGrid from "@/components/sections/MoodGrid";
import OversizedQuote from "@/components/sections/OversizedQuote";
import PinnedSequence from "@/components/sections/PinnedSequence";
import SplitFeature from "@/components/sections/SplitFeature";
import StatementSection from "@/components/sections/StatementSection";
import LineReveal from "@/components/ui/LineReveal";
import { Em, Kicker, Lede, Statement } from "@/components/ui/Type";
import { BOOK_URL, business, hours } from "@/lib/business";
import { testimonials } from "@/lib/data";
import { experienceSteps } from "@/lib/experience";
import { featuredProvider, pillars, whyLather } from "@/lib/menu";

// The board that opens "Step inside" — interiors only, and deliberately none
// of the photos the Instagram strip further down uses.
const moodTiles = [
  { src: "/media/gallery/interior-gold-mirror.webp", alt: "Gold-framed mirror in the Lather treatment room", ratio: "aspect-[3/4]" },
  { src: "/media/gallery/interior-waiting-room.webp", alt: "The Lather lounge", ratio: "aspect-[3/4]", offset: "md:translate-y-10" },
  { src: "/media/gallery/interior-lamp-brass.webp", alt: "Brass lamp detail at Lather Spa & Wellness", ratio: "aspect-[3/4]" },
  { src: "/media/gallery/interior-reception-detail.webp", alt: "Reception details at Lather Spa & Wellness", ratio: "aspect-[3/4]", offset: "md:translate-y-10" },
];

// The five movements, reused from /experience so the two pages can never drift.
const ritualSteps = experienceSteps.map((s) => ({
  src: s.image,
  alt: `${s.title} — movement ${s.number} of the Lather head spa ritual`,
  label: s.title,
  caption: (
    <>
      <Em>{s.number}</Em> — {s.title}
    </>
  ),
}));

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="grain relative flex min-h-[100svh] flex-col justify-center gap-5 overflow-hidden bg-noir pt-20 text-ivory md:justify-end md:gap-0 md:pt-0">
        <HeroMedia />

        <div className="wrap relative z-10 px-6 pb-6 sm:px-10 md:pb-28 md:pt-44 lg:px-16">
          <h1 className="h-display max-w-5xl text-[clamp(2.6rem,6.4vw,6rem)] leading-[1.02] tracking-[-0.012em]">
            <LineReveal
              lines={[
                <Fragment key="a">Where modern wellness</Fragment>,
                <Fragment key="b">
                  meets <Em className="text-brass-light">elevated self-care.</Em>
                </Fragment>,
              ]}
            />
          </h1>

          <Reveal delay={420}>
            <p className="mt-6 max-w-xl text-base text-ivory/75 sm:mt-8 sm:text-lg">
              A luxury wellness destination in Greenville, North Carolina — restorative spa
              experiences and advanced, personalized wellness care, in one considered space.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-solid-light">
                Book Appointment
              </a>
              <Link href="/services" className="btn-outline-light">
                Explore Services
              </Link>
            </div>
            {/* Trust integrated into the hero rather than parked in a badge. */}
            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.68rem] uppercase tracking-wideish text-ivory/60">
              <span>{business.address.city}, {business.address.state}</span>
              <span aria-hidden>·</span>
              <span>Licensed providers</span>
              <span aria-hidden>·</span>
              <span>By appointment</span>
            </p>
          </Reveal>
        </div>
      </section>

      <Marquee />

      {/* ── THESIS ───────────────────────────────────────────── */}
      <StatementSection
        kicker="Two kinds of care"
        body={
          <Lede centered>
            Lather blends restorative spa experiences with advanced, personalized wellness care —
            bridging the gap between clinical wellness and the restorative spa, in one thoughtfully
            designed space.
          </Lede>
        }
        actions={
          <Link href="/about" className="pill-light ring-1 ring-ink/10">
            Our story
          </Link>
        }
      >
        <Statement as="h2" size="lg">
          <LineReveal
            lines={[
              <Fragment key="a">
                One destination <Em>for</Em>
              </Fragment>,
              <Fragment key="b">
                <Em>the</Em> whole of you.
              </Fragment>,
            ]}
          />
        </Statement>
      </StatementSection>

      {/* ── THE TWO PILLARS ──────────────────────────────────── */}
      {pillars.map((pillar, i) => (
        <SplitFeature
          key={pillar.key}
          src={pillar.image}
          alt={pillar.label}
          focal={pillar.imagePosition}
          side={i % 2 === 0 ? "left" : "right"}
          tone={i % 2 === 0 ? "ivory" : "porcelain"}
          kicker={pillar.tagline}
          body={
            <>
              <Lede>{pillar.intro}</Lede>
              <ul className="mt-8 flex flex-wrap gap-2">
                {pillar.items.map((item) => (
                  <li
                    key={item.name}
                    className="border hairline px-3 py-1.5 text-[0.72rem] uppercase tracking-wideish text-umber"
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
      <StatementSection tone="noir" kicker="The signature ritual" divided>
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

      <PinnedSequence steps={ritualSteps} />

      <StatementSection
        tone="noir"
        body={
          <Lede centered className="text-ivory/70">
            Assessed, cleansed, massaged, treated, renewed. Every appointment is private and held
            exclusively for you — nothing is rushed, because the slower the session moves, the
            better it works.
          </Lede>
        }
        actions={
          <Link href="/experience" className="btn-solid-light">
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
        tone="noir"
        kicker="Start here"
        body={
          <>
            <Lede className="text-ivory/75">{featuredProvider.blurb}</Lede>
            <p className="mt-8 font-display text-xl text-brass-light">
              {featuredProvider.name}
              <span className="block text-[0.8rem] font-normal uppercase tracking-wideish text-ivory/65">
                {featuredProvider.role}
              </span>
            </p>
          </>
        }
        actions={
          <>
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-solid-light">
              Book a Consultation
            </a>
            <Link href="/services" className="btn-outline-light">
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
      <section className="section-pad bg-porcelain">
        <div className="wrap">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Statement as="h2" size="md">
              Why <Em>Lather</Em>
            </Statement>
          </Reveal>
          <div className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-12">
            {whyLather.map((item, i) => (
              <Reveal
                key={item.title}
                as="div"
                delay={i * 70}
                className="w-full border-t hairline pt-6 sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.667rem)]"
              >
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-umber">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDERS ─────────────────────────────────────────── */}
      <SplitFeature
        src="/media/founders/founders-staircase.webp"
        alt="Lather Spa & Wellness founders Hannah DeMotts, Abigail Baldwin, and Stacia Friend, CNM"
        side="right"
        tone="ivory"
        kicker="Who we are"
        body={
          <>
            <Lede>
              Lather began with the relationships between sisters Hannah DeMotts and Abigail Baldwin
              and their longtime friend Stacia Friend, CNM — built on shared experience, trust, and a
              genuine passion for caring for others.
            </Lede>
            <Lede className="mt-5">
              They saw the same gap again and again: you could find a spa, or you could find clinical
              wellness care, but rarely both. So they built one.
            </Lede>
          </>
        }
        actions={
          <Link href="/about" className="btn-outline">
            Meet the Founders
          </Link>
        }
      >
        <Statement as="h2" size="md">
          Two sisters <Em>and a</Em> lifelong friend.
        </Statement>
      </SplitFeature>

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
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100} className="flex flex-col border hairline bg-ivory p-8">
                <p aria-hidden className="mb-5 text-[0.8rem] tracking-[0.35em] text-brass-dark">
                  ★★★★★
                </p>
                <span className="sr-only">Rated 5 out of 5 stars.</span>
                <blockquote className="flex-1 font-display text-xl leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 border-t hairline pt-4 text-[0.75rem] uppercase tracking-wideish text-taupe">
                  <span className="font-semibold text-ink">{t.name}</span> · {t.service}
                  <br />
                  <span className="text-[0.7rem]">{t.location}</span>
                </footer>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEP INSIDE ──────────────────────────────────────── */}
      <StatementSection kicker="The space" className="pb-0">
        <Statement as="h2" size="md">
          Step <Em>inside.</Em>
        </Statement>
      </StatementSection>
      <MoodGrid tiles={moodTiles} cta={{ href: "/about", label: "Our space" }} />

      {/* ── SOCIAL ───────────────────────────────────────────── */}
      <SocialSection />

      {/* ── A LINE TO LIVE BY ────────────────────────────────── */}
      <OversizedQuote
        tone="bone"
        lines={[
          <Fragment key="a">
            Leave <Em>better</Em>
          </Fragment>,
          <Fragment key="b">than you arrived.</Fragment>,
        ]}
      />

      {/* ── VISIT ────────────────────────────────────────────── */}
      <SplitFeature
        src="/media/pages/locations-hero.webp"
        alt="The lounge at Lather Spa & Wellness in Greenville, NC"
        side="left"
        tone="porcelain"
        kicker="Visit"
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
