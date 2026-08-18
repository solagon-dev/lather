import type { Metadata } from "next";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import FaqAccordion from "@/components/FaqAccordion";
import ArticleHero from "@/components/heroes/ArticleHero";
import Reveal from "@/components/Reveal";
import { Em } from "@/components/ui/Type";
import { blogArticles } from "@/lib/blog";
import { headSpaFaqs } from "@/lib/data";
import { experienceSteps } from "@/lib/experience";
import { breadcrumbSchema, faqSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "What Is a Head Spa?",
  description:
    "What a head spa is, its Japanese origins, how it differs from a salon wash, what happens in a session, and what it costs. A complete guide.",
  alternates: { canonical: "/what-is-a-head-spa" },
};

const article = blogArticles.find((a) => a.slug === "what-is-a-head-spa")!;

const comparison = {
  salon: {
    title: "A salon wash",
    points: [
      "Designed to prepare hair for styling",
      "A few minutes at the basin",
      "One shampoo, a quick rinse",
      "Scalp contact is incidental",
      "You leave with clean hair",
    ],
  },
  headSpa: {
    title: "A head spa",
    points: [
      "Designed to restore scalp health",
      "A 45–90 minute dedicated ritual",
      "Analysis, layered cleanse, exfoliation",
      "Massage is the heart of the session",
      "You leave with a healthier scalp — and a quieter mind",
    ],
  },
};

export default function WhatIsAHeadSpaPage() {
  const pageFaqs = headSpaFaqs;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(pageFaqs))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "What Is a Head Spa?", path: "/what-is-a-head-spa" },
          ])
        )}
      />

      <ArticleHero
        breadcrumb={{ href: "/journal", label: "The Journal" }}
        category="Guide"
        title={
          <>
            What is a <Em>head spa?</Em>
          </>
        }
        dek={article.intro}
        image={{
          src: "/media/pages/head-spa-guide-hero.webp",
          alt: "A head spa treatment in progress at Lather in Greenville, NC",
        }}
      />

      {/* ── SECTION 1: ORIGINS ───────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h2 className="h-display text-balance text-4xl sm:text-5xl">
              Born in Japan
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-5">
            {article.sections[0].paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="max-w-prose2 text-umber">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── PULL QUOTE ───────────────────────────────────────── */}
      <section className="grain relative border-t hairline bg-noir py-20 text-ivory sm:py-28">
        <div className="wrap relative px-6">
          <Reveal>
            <blockquote className="h-display mx-auto max-w-3xl text-center text-3xl italic leading-snug text-brass-light sm:text-4xl md:text-5xl">
              &ldquo;The scalp deserves the same level of professional attention as the skin on
              your face.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 2: THE DIFFERENCE ────────────────────────── */}
      <section className="section-pad bg-ivory">
        <div className="wrap grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="space-y-5 lg:order-1">
            {article.sections[1].paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="max-w-prose2 text-umber">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120} className="lg:order-2 lg:text-right">
            <h2 className="h-display text-balance text-4xl sm:text-5xl">
              More than a wash
            </h2>
          </Reveal>
        </div>

        {/* Comparison strip */}
        <div className="wrap mt-16">
          <div className="grid gap-px overflow-hidden border hairline bg-ink/10 md:grid-cols-2">
            <Reveal className="bg-porcelain p-10">
              <h3 className="font-display text-2xl">{comparison.salon.title}</h3>
              <ul className="mt-8 space-y-4">
                {comparison.salon.points.map((point) => (
                  <li key={point} className="flex gap-3 border-b hairline pb-4 text-umber">
                    <span aria-hidden className="text-taupe">—</span> {point}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} className="grain relative bg-noir p-10 text-ivory">
              <h3 className="font-display text-2xl text-brass-light">{comparison.headSpa.title}</h3>
              <ul className="mt-8 space-y-4">
                {comparison.headSpa.points.map((point) => (
                  <li key={point} className="flex gap-3 border-b border-ivory/10 pb-4 text-ivory/75">
                    <span aria-hidden className="text-brass-light">—</span> {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: WHY NOW ───────────────────────────────── */}
      <section className="section-pad border-t hairline bg-porcelain">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h2 className="h-display text-balance text-4xl sm:text-5xl">
              Why it&rsquo;s everywhere
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-5">
            {article.sections[2].paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="max-w-prose2 text-umber">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── THE FIVE MOVEMENTS ───────────────────────────────── */}
      <section className="grain relative section-pad bg-noir text-ivory">
        <div className="wrap relative">
          <Reveal className="max-w-2xl">
            <h2 className="h-display text-balance text-4xl sm:text-5xl">
              The five movements
            </h2>
          </Reveal>
          <ol className="mt-16 grid gap-10 border-t border-ivory/10 pt-12 sm:grid-cols-2 lg:grid-cols-5">
            {experienceSteps.map((step, i) => (
              <Reveal key={step.number} as="li" delay={i * 80}>
                <p className="font-display text-3xl text-brass-light/70">{step.number}</p>
                <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ivory/60">{step.body}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-14">
            <Link href="/experience" className="btn-outline-light">
              Walk Through the Full Experience
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── CONCLUSION + INTERNAL LINKS ──────────────────────── */}
      <section className="section-pad bg-bone">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h2 className="h-display text-balance text-4xl sm:text-5xl">
              Intentional care
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-prose2 text-umber">{article.conclusion}</p>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              <Link
                href="/services"
                className="link-ul text-[0.75rem] font-semibold tracking-[0.02em]"
              >
                Browse the Rituals →
              </Link>
              <Link
                href="/scalp-concerns"
                className="link-ul text-[0.75rem] font-semibold tracking-[0.02em]"
              >
                Start With Your Concern →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-ivory">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <h2 className="h-display text-4xl sm:text-5xl">
              Before your first visit
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <FaqAccordion faqs={pageFaqs} />
          </Reveal>
        </div>
      </section>

      <BookCTA title="Curious? That's how it starts." />
    </>
  );
}
