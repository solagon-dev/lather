import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import LazyVideo from "@/components/LazyVideo";
import CinematicHero from "@/components/heroes/CinematicHero";
import Reveal from "@/components/Reveal";
import HorizontalSteps from "@/components/sections/HorizontalSteps";
import { Em } from "@/components/ui/Type";
import { BOOK_URL } from "@/lib/business";
import { services, treatmentDetails } from "@/lib/data";
import { experienceSteps } from "@/lib/experience";
import { couplesRetreat } from "@/lib/menu";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Japanese Head Spa in Greenville, NC",
  description:
    "Lather's head spa rituals in Greenville, NC — Classic, Luxe, Gentleman's Recharge and a couples retreat, $100–$250 — and the five movements of every session.",
  alternates: { canonical: "/spa/head-spa" },
};

const ritualSteps = experienceSteps.map((s) => ({
  src: s.image,
  alt: `${s.title} — movement ${s.number} of the Lather head spa ritual`,
  number: s.number,
  title: s.title,
  body: s.body,
}));

const guides = [
  { href: "/what-is-a-head-spa", label: "What is a head spa?", body: "The Japanese origins, and how it differs from a salon wash." },
  { href: "/scalp-concerns", label: "Scalp concerns", body: "Buildup, dryness, sensitivity, thinning — and which ritual fits." },
  { href: "/journal", label: "The journal", body: "Longer reads on scalp health and the head spa ritual." },
];

// Practical notes — copy sourced from treatmentDetails (classic-ritual beforeVisit + faqs).
const goodToKnow = [
  {
    title: "Arrive a few minutes early",
    body: treatmentDetails["classic-ritual"].beforeVisit[3],
  },
  {
    title: "Come with unwashed hair",
    body: treatmentDetails["classic-ritual"].beforeVisit[0],
  },
  {
    title: "Dress for reclining",
    body: treatmentDetails["classic-ritual"].beforeVisit[2],
  },
  {
    title: "Plan quiet time after",
    body: "Give yourself some unhurried time afterward — the renewed feeling lingers, and it deserves a slow return to the world.",
  },
];

export default function HeadSpaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Spa", path: "/spa" },
            { name: "Head Spa", path: "/spa/head-spa" },
          ])
        )}
      />
      <CinematicHero
        src="/media/experience/step-03-massage.webp"
        alt="Slow, intentional scalp massage during a Lather head spa ritual"
        lines={[
          <Fragment key="a">One unhurried hour,</Fragment>,
          <Fragment key="b">
            <Em>five movements.</Em>
          </Fragment>,
        ]}
        sub="Our signature Japanese-inspired head spa. Every ritual follows the same quiet arc — assessed, cleansed, massaged, treated, renewed — and differs only in how far it goes."
      />

      {/* ── THE RITUALS ──────────────────────────────────────── */}
      {/* What people came for, first: the menu with prices, before the
          explanation of what happens inside it. */}
      <section className="section-pad bg-porcelain">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="h-display text-4xl sm:text-5xl">The rituals</h2>
          </Reveal>
          <div className="mt-12 border-t hairline">
            {services.map((s, i) => (
              <Reveal
                key={s.id}
                delay={i * 70}
                className="grid items-baseline gap-2 border-b hairline py-6 sm:grid-cols-[1.6fr_auto_auto_auto] sm:gap-8"
              >
                <Link href={`/spa/head-spa/${s.id}`} className="group">
                  <h3 className="font-display text-2xl transition-colors group-hover:text-brass-dark">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-[0.85rem] text-taupe">{s.tagline}</p>
                </Link>
                <p className="text-[0.75rem] tracking-[0.02em] text-taupe">{s.duration}</p>
                <p className="font-display text-xl text-brass-dark">${s.price}</p>
                <Link href={`/spa/head-spa/${s.id}`} className="link-ul text-[0.75rem] font-semibold tracking-[0.02em]">
                  Details →
                </Link>
              </Reveal>
            ))}
            <Reveal className="grid items-baseline gap-2 border-b hairline py-6 sm:grid-cols-[1.6fr_auto_auto] sm:gap-8">
              <div>
                <h3 className="font-display text-2xl">{couplesRetreat.name}</h3>
                <p className="mt-1 text-[0.85rem] text-taupe">{couplesRetreat.tagline}</p>
              </div>
              <p className="font-display text-xl text-brass-dark">${couplesRetreat.price}</p>
              <span className="text-[0.75rem] tracking-[0.02em] text-taupe">For two</span>
            </Reveal>
          </div>
          <Reveal className="mt-10">
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-solid">
              Book a Ritual
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── THE FIVE MOVEMENTS ───────────────────────────────── */}
      <section className="section-pad bg-ivory pb-12 text-center">
        <Reveal className="wrap-narrow">
          <h2 className="h-display text-4xl sm:text-5xl">
            Five <Em>movements</Em>
          </h2>
        </Reveal>
      </section>
      <HorizontalSteps steps={ritualSteps} />

      {/* ── THE SPACE BETWEEN ────────────────────────────────── */}
      <section className="grain relative section-pad bg-noir text-ivory">
        <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="h-display text-balance text-4xl sm:text-5xl">
              The space between
            </h2>
            <p className="mt-8 max-w-xl text-ivory/70">
              The movements matter — but so does everything around them. Lather is a quiet,
              adults-focused space with no busy salon floor and no background noise competing for
              your attention. Every appointment is private, held exclusively for you, so the only
              sounds are warm water, slow breathing, and the occasional soft word from your
              therapist.
            </p>
            <p className="mt-5 max-w-xl text-ivory/70">
              Between each movement there is a pause — a moment for the scalp to settle and for you
              to drift a little deeper. Nothing is rushed, because the slower the session moves, the
              better it works.
            </p>
          </Reveal>
          <Reveal delay={120}>
            {/* 4:5 matches the clip's encoded frame exactly — see HeroMedia for
                why these sources are cropped at encode time rather than in CSS. */}
            <div className="relative aspect-[404/506] overflow-hidden">
              <LazyVideo
                className="absolute inset-0 h-full w-full object-cover"
                src="/media/video/experience-cleanse.mp4"
                poster="/media/experience/step-02-cleanse.webp"
                ariaLabel="Warm water cleanse during a Lather head spa session"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GOOD TO KNOW ─────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-bone">
        <div className="wrap">
          <Reveal>
            <h2 className="h-display text-4xl sm:text-5xl">
              Before you arrive
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border hairline bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {goodToKnow.map((g, i) => (
              <Reveal key={g.title} delay={i * 80} className="flex flex-col bg-ivory p-8">
                <p className="font-display text-2xl text-brass-dark">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-xl">{g.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-umber">{g.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARN MORE ───────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-porcelain">
        <div className="wrap grid gap-px overflow-hidden border hairline bg-ink/10 md:grid-cols-3">
          {guides.map((g, i) => (
            <Reveal key={g.href} delay={i * 80} className="bg-porcelain">
              <Link href={g.href} className="group block h-full p-8 transition-colors hover:bg-ivory">
                <h2 className="font-display text-2xl transition-colors group-hover:text-brass-dark">{g.label} →</h2>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-umber">{g.body}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <BookCTA title="Ready to feel it for yourself?" />
    </>
  );
}
