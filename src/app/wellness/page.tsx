import type { Metadata } from "next";
import BookCTA from "@/components/BookCTA";
import UtilityHero from "@/components/heroes/UtilityHero";
import Reveal from "@/components/Reveal";
import ServiceCards from "@/components/ServiceCards";
import SplitFeature from "@/components/sections/SplitFeature";
import { Em, Lede, Statement } from "@/components/ui/Type";
import { WELLNESS_BOOK_URL, wellness, wellnessHours } from "@/lib/business";
import { featuredProvider, pillars, wellnessCards } from "@/lib/menu";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";
import { careAreas } from "@/lib/wellness";

const wellnessPillar = pillars.find((p) => p.key === "wellness")!;

export const metadata: Metadata = {
  title: "Women's Wellness in Greenville, NC",
  description:
    "Lather Wellness, led by Stacia Friend, CNM: hormone and midlife care, medical weight management, laser hair removal, Secret RF & PRO, injectables and body contouring.",
  alternates: { canonical: "/wellness" },
};

// How a first visit works. The practice books by request, so the first step is
// a request rather than an instant booking — saying so up front stops anyone
// expecting a confirmed slot the moment they submit.
const steps = [
  { title: "Request a visit", body: "Pick a time online. The practice confirms it with you." },
  {
    title: "Your Foundations visit",
    body: "An unhurried conversation about your symptoms, your history, and your goals — with labs and next steps discussed.",
  },
  { title: "A plan that's yours", body: "Treatments and follow-ups built around you, not a package." },
];

export default function WellnessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Wellness", path: "/wellness" },
          ])
        )}
      />
      <UtilityHero
        title={
          <>
            Lather <Em>Wellness</Em>
          </>
        }
        sub={wellnessPillar.intro}
        aside={{
          src: "/media/experience/step-01-consultation.webp",
          alt: "A consultation at Lather Wellness",
          focal: "50% 28%",
        }}
      >
        <a href={WELLNESS_BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-solid">
          Request a Foundations Visit
        </a>
      </UtilityHero>

      {/* ── IT STARTS WITH YOU ───────────────────────────────── */}
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
          <a href={WELLNESS_BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-solid">
            Request a Foundations Visit
          </a>
        }
      >
        <Statement as="h2" size="md">
          It starts <Em>with you.</Em>
        </Statement>
      </SplitFeature>

      {/* ── WHAT WE CARE FOR ─────────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="h-display text-4xl sm:text-5xl">What we care for</h2>
            <p className="mt-5 text-umber">
              Each of these begins with a Foundations visit, so you don&rsquo;t need to know which
              one you need before you walk in.
            </p>
          </Reveal>
          <ul className="mt-12 grid border-t hairline md:grid-cols-2 md:gap-x-12">
            {careAreas.map((c, i) => (
              <Reveal key={c.name} as="li" delay={i * 50} className="border-b hairline py-6">
                <h3 className="font-display text-2xl">{c.name}</h3>
                <p className="mt-2 max-w-[48ch] text-[0.95rem] text-umber">{c.blurb}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── TREATMENTS ───────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-ivory">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="h-display text-4xl sm:text-5xl">Treatments</h2>
          </Reveal>
          <div className="mt-12">
            <ServiceCards cards={wellnessCards} columns={4} />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS + HOURS ─────────────────────────────── */}
      <section className="section-pad border-t hairline bg-porcelain">
        <div className="wrap grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <h2 className="h-display text-4xl">How a first visit works</h2>
            </Reveal>
            <ol className="mt-10 border-t hairline">
              {steps.map((s, i) => (
                <Reveal key={s.title} as="li" delay={i * 80} className="grid grid-cols-[3rem_1fr] border-b hairline py-6">
                  <span className="font-display text-2xl text-brass-dark">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-2xl">{s.title}</h3>
                    <p className="mt-2 max-w-[52ch] text-[0.95rem] text-umber">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal delay={120}>
            <h2 className="text-[0.7rem] uppercase tracking-[0.18em] text-brass-dark">Wellness hours</h2>
            <ul className="mt-5 max-w-sm space-y-1 text-[0.95rem] text-umber">
              {wellnessHours.map((h) => (
                <li key={h.day} className="flex justify-between gap-3 border-b hairline pb-1">
                  <span>{h.day}</span>
                  <span className="whitespace-nowrap">{h.open ? `${h.open} – ${h.close}` : "Closed"}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.8rem] text-taupe">{wellness.legalName}</p>
          </Reveal>
        </div>
      </section>

      <BookCTA />
    </>
  );
}
