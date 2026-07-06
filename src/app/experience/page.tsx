import type { Metadata } from "next";
import Image from "next/image";
import BookCTA from "@/components/BookCTA";
import LazyVideo from "@/components/LazyVideo";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { treatmentDetails } from "@/lib/data";
import { experienceSteps } from "@/lib/experience";

export const metadata: Metadata = {
  title: "The Head Spa Experience — What Happens During a Session",
  description:
    "Walk through the five movements of a Lather head spa ritual — consultation, cleanse, massage, treatment, and renewal — and what to know before you arrive in Greenville, NC.",
  alternates: { canonical: "/experience" },
};

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

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        title={
          <>
            One unhurried hour, <span className="italic">five movements</span>
          </>
        }
        sub="Our signature head spa is one of Lather's Spa Experiences — and every ritual follows the same quiet arc: assessed, cleansed, massaged, treated, renewed. Here is what actually happens once you recline."
        image="/media/experience/step-03-massage.webp"
        imageAlt="Slow, intentional scalp massage during a Lather head spa ritual"
      />

      {/* ── THE FIVE MOVEMENTS ───────────────────────────────── */}
      {experienceSteps.map((step, i) => {
        const imageFirst = i % 2 === 0;
        return (
          <section
            key={step.number}
            className={`section-pad ${i % 2 === 0 ? "bg-porcelain" : "border-t hairline bg-ivory"}`}
          >
            <div className="wrap grid items-center gap-14 lg:grid-cols-2">
              <Reveal
                delay={80}
                className={`relative mx-auto w-full max-w-md lg:max-w-none ${
                  imageFirst ? "" : "lg:order-2"
                }`}
              >
                <div className="arch relative aspect-[3/4]">
                  <Image
                    src={step.image}
                    alt={`${step.title} — movement ${step.number} of the Lather head spa ritual`}
                    fill
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <Reveal className={imageFirst ? "" : "lg:order-1"}>
                <p className="font-display text-5xl font-light text-brass/60">{step.number}</p>
                <h2 className="h-display mt-6 text-4xl sm:text-5xl">
                  {step.title}
                </h2>
                <p className="mt-8 max-w-xl text-umber">{step.body}</p>
              </Reveal>
            </div>
          </section>
        );
      })}

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
            <div className="relative aspect-[4/5] overflow-hidden">
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
                <p className="font-display text-2xl font-light text-brass-dark">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-xl">{g.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-umber">{g.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BookCTA title="Ready to feel it for yourself?" />
    </>
  );
}
