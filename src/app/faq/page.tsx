import type { Metadata } from "next";
import Image from "next/image";
import BookCTA from "@/components/BookCTA";
import FaqAccordion from "@/components/FaqAccordion";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { business } from "@/lib/business";
import { faqs, services, treatmentFAQs } from "@/lib/data";
import { breadcrumbSchema, faqSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Everything to know before your first head spa visit — what a head spa is, how long sessions last, how to prepare, and answers about each Lather ritual in Greenville, NC.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ])
        )}
      />
      <PageHero
        kicker="Questions & Answers"
        title={
          <>
            Everything you&rsquo;re <span className="italic">wondering</span>
          </>
        }
        sub="Most of our guests are first-timers — curiosity is part of the experience. Here's everything people ask before they settle into the chair."
        image="/media/pages/faq-hero.webp"
        imageAlt="A quiet corner of Lather Head Spa in Greenville, NC"
      />

      {/* ── GENERAL FAQS ─────────────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <p className="kicker-line">The Essentials</p>
            <h2 className="h-display mt-6 text-4xl sm:text-5xl">
              Before you <span className="italic">book</span>
            </h2>
            <p className="mt-6 max-w-md text-umber">
              The questions we hear most — from what a head spa actually is to how often you should
              come back.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <FaqAccordion faqs={[...faqs]} />
          </Reveal>
        </div>
      </section>

      {/* ── QUIET MID-STRIP ──────────────────────────────────── */}
      <section className="relative h-[42vh] min-h-[320px] overflow-hidden">
        <Image
          src="/media/pages/faq-detail-01.webp"
          alt="Soft light and calm details inside Lather Head Spa"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-noir/35 px-6">
          <Reveal>
            <p className="h-display max-w-2xl text-center text-3xl italic text-ivory sm:text-4xl">
              The only wrong question is the one you didn&rsquo;t ask.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── TREATMENT FAQS ───────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-ivory">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="kicker-line">About the Rituals</p>
            <h2 className="h-display mt-6 text-balance text-4xl sm:text-5xl">
              Ritual by <span className="italic">ritual</span>
            </h2>
            <p className="mt-6 text-umber">
              Each treatment has its own rhythm — and its own questions. Answers below, grouped by
              ritual.
            </p>
          </Reveal>
          <div className="mt-14 space-y-16">
            {services
              .filter((s) => treatmentFAQs[s.id]?.length)
              .map((s, i) => (
                <Reveal key={s.id} delay={i * 80}>
                  <p className="kicker-line">{s.name}</p>
                  <div className="mt-6">
                    <FaqAccordion faqs={treatmentFAQs[s.id]} />
                  </div>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* ── STILL CURIOUS ────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-bone">
        <div className="wrap text-center">
          <Reveal>
            <p className="kicker">Still Curious?</p>
            <h2 className="h-display mx-auto mt-6 max-w-2xl text-balance text-4xl sm:text-5xl">
              Ask us <span className="italic">anything</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-umber">
              If your question isn&rsquo;t answered here, call us during business hours or send a
              DM on Instagram — we&rsquo;re happy to talk you through any ritual before you book.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href={business.phoneHref} className="btn-solid">
                Call {business.phone}
              </a>
              <a href={business.instagram} target="_blank" rel="noopener" className="btn-outline">
                DM {business.instagramHandle}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <BookCTA />
    </>
  );
}
