import type { Metadata } from "next";
import Image from "next/image";
import BookCTA from "@/components/BookCTA";
import FaqAccordion from "@/components/FaqAccordion";
import UtilityHero from "@/components/heroes/UtilityHero";
import Reveal from "@/components/Reveal";
import { Em } from "@/components/ui/Type";
import { business } from "@/lib/business";
import { faqs, services, treatmentFAQs } from "@/lib/data";
import { breadcrumbSchema, faqSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about Lather Spa & Wellness in Greenville, NC — services, wellness consultations, booking, policies, and what to expect on a first visit.",
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
      <UtilityHero
        kicker="Questions"
        title={
          <>
            Everything you&rsquo;re <Em>wondering.</Em>
          </>
        }
        sub="New to Lather? Curiosity is part of it. Here's everything guests ask about our spa and wellness care — before they ever settle in."
      />

      {/* ── GENERAL FAQS ─────────────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <h2 className="h-display text-4xl sm:text-5xl">
              Before you book
            </h2>
            <p className="mt-6 max-w-md text-umber">
              The questions we hear most — from what makes Lather different to how our wellness
              consultations work.
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
          alt="Soft light and calm details inside Lather Spa & Wellness"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-noir/55 px-6">
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
            <h2 className="h-display text-balance text-4xl sm:text-5xl">
              Head spa, ritual by ritual
            </h2>
            <p className="mt-6 text-umber">
              Our signature head spa comes in four rituals — each with its own rhythm, and its own
              questions. Answers below, grouped by ritual.
            </p>
          </Reveal>
          <div className="mt-14 space-y-16">
            {services
              .filter((s) => treatmentFAQs[s.id]?.length)
              .map((s, i) => (
                <Reveal key={s.id} delay={i * 80}>
                  <h3 className="font-display text-2xl">{s.name}</h3>
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
            <h2 className="h-display mx-auto max-w-2xl text-balance text-4xl sm:text-5xl">
              Ask us anything
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-umber">
              If your question isn&rsquo;t answered here, call us during business hours or send a
              DM on Instagram — we&rsquo;re happy to talk you through any service before you book.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href={business.phoneHref} className="btn-solid">
                Call {business.phone}
              </a>
              <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline">
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
