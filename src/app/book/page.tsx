import type { Metadata } from "next";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import UtilityHero from "@/components/heroes/UtilityHero";
import Reveal from "@/components/Reveal";
import { Em } from "@/components/ui/Type";
import { BOOK_URL, business } from "@/lib/business";
import { services } from "@/lib/data";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Book & Head Spa Pricing",
  description:
    "Book your appointment at Lather Spa & Wellness, Greenville NC. Head spa rituals $50–$200, bookable online. Wellness care by consultation.",
  alternates: { canonical: "/book" },
};

const steps = [
  {
    number: "01",
    title: "Choose your service",
    body: (
      <>
        Our four{" "}
        <a href="#ritual-menu" className="link-ul text-ivory">
          head spa rituals
        </a>{" "}
        book instantly online — 45 to 90 minutes. For facials, wellness care, and everything else,
        reach out and we&rsquo;ll schedule you personally.
      </>
    ),
  },
  {
    number: "02",
    title: "Pick your time",
    body: (
      <>
        Choose the day and time that suits you on our secure booking page — it takes under a
        minute.
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
      <UtilityHero
        title={
          <>
            Your hour of <Em>stillness</Em> starts here.
          </>
        }
        sub="Booking takes under a minute on our secure booking page. Sessions are by appointment only, and every slot is reserved exclusively for you."
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
                <p className="font-display text-3xl text-brass-light/70">{step.number}</p>
                <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ivory/60">{step.body}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-14">
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-solid-light">
              Book Appointment
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── PRICE LIST ───────────────────────────────────────── */}
      <section id="ritual-menu" className="section-pad border-t hairline bg-porcelain scroll-mt-28">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="h-display text-4xl sm:text-5xl">
              The head spa ritual menu
            </h2>
            <p className="mt-6 text-umber">
              Our head spa rituals book online below. Facials, massage, skin, and wellness services
              are scheduled by consultation — just{" "}
              <a href={business.phoneHref} className="link-ul">
                call or text
              </a>
              .
            </p>
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
                <p className="text-[0.75rem] tracking-[0.02em] text-taupe">{s.duration}</p>
                <p className="font-display text-xl text-brass-dark">
                  {s.tier === "express" ? `From $${s.price}` : `$${s.price}`}
                </p>
                <a
                  href={BOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-ul text-[0.75rem] font-semibold tracking-[0.02em]"
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
