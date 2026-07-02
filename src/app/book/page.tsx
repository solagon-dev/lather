import type { Metadata } from "next";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { BOOK_URL, business } from "@/lib/business";
import { services } from "@/lib/data";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Book Your Ritual — Online Scheduling",
  description:
    "Book your head spa ritual at Lather in Greenville, NC. Secure online scheduling through Vagaro — choose your ritual, pick your time, and arrive five minutes early. We handle the rest.",
  alternates: { canonical: "/book" },
};

const steps = [
  {
    number: "01",
    title: "Choose your ritual",
    body: (
      <>
        Browse the{" "}
        <Link href="/services" className="link-ul text-ivory">
          service menu
        </Link>{" "}
        — four rituals, 45 to 90 minutes, from a quick blowout to the full Luxe experience.
      </>
    ),
  },
  {
    number: "02",
    title: "Pick your time on Vagaro",
    body: (
      <>
        Booking happens through Vagaro, our secure scheduling partner. Choose a time that suits you
        — it takes under a minute.
      </>
    ),
  },
  {
    number: "03",
    title: "Arrive 5 minutes early",
    body: <>Settle in, exhale, and let us take it from there. We handle the rest.</>,
  },
];

export default function BookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Book", path: "/book" },
          ])
        )}
      />
      <PageHero
        title={
          <>
            Your hour of <span className="italic">stillness</span> starts here
          </>
        }
        sub="Booking takes under a minute through Vagaro — our secure scheduling partner. Sessions are by appointment only, and every slot is reserved exclusively for you."
        image="/media/pages/book-hero.webp"
        imageAlt="A treatment chair awaiting the next guest at Lather Head Spa"
      />

      {/* ── THREE STEPS ──────────────────────────────────────── */}
      <section className="grain relative section-pad bg-noir text-ivory">
        <div className="wrap relative">
          <Reveal className="max-w-2xl">
            <h2 className="h-display text-balance text-4xl sm:text-5xl">
              Three steps to quiet
            </h2>
          </Reveal>
          <ol className="mt-16 grid gap-10 border-t border-ivory/10 pt-12 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.number} as="li" delay={i * 80}>
                <p className="font-display text-3xl font-light text-brass-light/70">{step.number}</p>
                <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ivory/60">{step.body}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-14">
            <a href={BOOK_URL} target="_blank" rel="noopener" className="btn-solid-light">
              Book on Vagaro
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── PRICE LIST ───────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-porcelain">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="h-display text-4xl sm:text-5xl">
              Four rituals, one price list
            </h2>
          </Reveal>
          <div className="mt-14 border-t hairline">
            {services.map((s, i) => (
              <Reveal
                key={s.id}
                delay={i * 70}
                className="grid items-baseline gap-2 border-b hairline py-6 sm:grid-cols-[1.6fr_auto_auto_auto] sm:gap-8"
              >
                <Link href={`/services/${s.id}`} className="group">
                  <h3 className="font-display text-2xl transition-colors group-hover:text-brass-dark">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-[0.85rem] text-taupe">{s.tagline}</p>
                </Link>
                <p className="text-[0.75rem] uppercase tracking-kicker text-taupe">{s.duration}</p>
                <p className="font-display text-xl text-brass-dark">
                  {s.tier === "express" ? `From $${s.price}` : `$${s.price}`}
                </p>
                <a
                  href={BOOK_URL}
                  target="_blank"
                  rel="noopener"
                  className="link-ul text-[0.75rem] font-semibold uppercase tracking-kicker"
                >
                  Book →
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 max-w-2xl">
            <p className="text-[0.85rem] text-taupe">
              Sessions are by appointment only — each time slot is reserved exclusively for you.
              For same-day availability, call{" "}
              <a href={business.phoneHref} className="link-ul">
                {business.phone}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <BookCTA />
    </>
  );
}
