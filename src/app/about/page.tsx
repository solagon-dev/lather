import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import BookCTA from "@/components/BookCTA";
import EditorialSplitHero from "@/components/heroes/EditorialSplitHero";
import Reveal from "@/components/Reveal";
import { Em } from "@/components/ui/Type";
import { BOOK_URL } from "@/lib/business";

export const metadata: Metadata = {
  title: "About — Our Story & Team",
  description:
    "The story behind Lather Spa & Wellness in Greenville, NC — founded by sisters Hannah DeMotts and Abigail Baldwin with Stacia Friend, CNM.",
  alternates: { canonical: "/about" },
};

const founders = [
  {
    name: "Hannah DeMotts",
    role: "Co-Founder",
    line: "One half of the sisters behind Lather, driven by a love of caring for others and creating spaces where people feel at ease.",
  },
  {
    name: "Abigail Baldwin",
    role: "Co-Founder",
    line: "The other half of the pair, shaping the Lather experience around genuine hospitality and thoughtful, elevated design.",
  },
  {
    name: "Stacia Friend, CNM",
    role: "Co-Founder · Certified Nurse Midwife",
    line: "A longtime friend and Lather's wellness lead, bringing a whole-person, preventative approach to personalized care.",
  },
];

const values = [
  { title: "Education", body: "Informed guests make the best decisions. We take the time to explain, answer, and guide." },
  { title: "Compassion", body: "Every guest is met with genuine care, and never with judgment." },
  { title: "Excellence", body: "Licensed providers, considered protocols, and a standard we hold to on every visit." },
  { title: "Community", body: "Built for Greenville and invested in the people we serve." },
  { title: "Whole-person wellness", body: "We care for the whole person — skin, body, and long-term well-being." },
];

const gallery = [
  { src: "/media/gallery/interior-waiting-room.webp", alt: "The lounge at Lather Spa & Wellness" },
  { src: "/media/gallery/interior-gold-mirror.webp", alt: "Gold-framed mirror in the treatment room" },
  { src: "/media/gallery/treatment-waterfall.webp", alt: "A restorative treatment at Lather" },
  { src: "/media/gallery/interior-lamp-brass.webp", alt: "Brass lamp glowing inside Lather Spa & Wellness" },
  { src: "/media/gallery/interior-diffuser.webp", alt: "Aromatherapy detail in the treatment space" },
  { src: "/media/gallery/interior-reception-detail.webp", alt: "Reception details at Lather in Greenville, NC" },
];

export default function AboutPage() {
  return (
    <>
      <EditorialSplitHero
        src="/media/founders/founders-hero.webp"
        alt="Lather Spa & Wellness founders Hannah DeMotts, Abigail Baldwin, and Stacia Friend, CNM"
        side="right"
        kicker="Who we are"
        lines={[
          <Fragment key="a">Built on</Fragment>,
          <Fragment key="b">
            <Em>relationships.</Em>
          </Fragment>,
        ]}
        sub="Lather Spa & Wellness was founded by two sisters and a lifelong friend — on shared experience, trust, and a passion for caring for others."
      />

      {/* ── STORY ────────────────────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="arch relative aspect-[3/4]">
              <Image
                src="/media/founders/founders-story.webp"
                alt="The three founders of Lather Spa & Wellness together at golden hour"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="h-display text-balance text-4xl sm:text-5xl">How Lather began</h2>
            <p className="mt-8 max-w-xl text-umber">
              Lather started with the relationships between sisters Hannah DeMotts and Abigail
              Baldwin and their longtime friend Stacia Friend, CNM — built on shared experience,
              trust, and a genuine passion for caring for others.
            </p>
            <p className="mt-5 max-w-xl text-umber">
              They saw the same gap, again and again: you could find a spa, or you could find
              clinical wellness care, but rarely both — and almost never in a place that felt calm,
              personal, and truly elevated. So they built one. A single, thoughtfully designed space
              where restorative spa experiences and advanced wellness care live side by side.
            </p>
            <p className="mt-5 max-w-xl text-umber">
              That&rsquo;s Lather: modern wellness and elevated self-care, delivered by people who
              genuinely care how you feel when you leave.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── MISSION + VALUES ─────────────────────────────────── */}
      <section className="grain relative section-pad bg-noir text-ivory">
        <div className="wrap relative">
          <Reveal className="max-w-3xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-kicker text-brass-light">
              Our mission
            </p>
            <p className="mt-6 font-display text-2xl leading-relaxed sm:text-3xl">
              To create experiences that leave people feeling refreshed, restored, and genuinely
              cared for.
            </p>
          </Reveal>
          <div className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-10 border-t border-ivory/10 pt-12">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70} className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.667rem)]">
                <h3 className="font-display text-2xl text-brass-light">{v.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ivory/65">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDERS + TEAM ──────────────────────────────────── */}
      <section className="section-pad bg-bone">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="h-display text-4xl sm:text-5xl">The people behind Lather</h2>
            <p className="mt-6 text-umber">
              Two sisters, one lifelong friend, and a team of licensed providers who care for you
              like they know you.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {founders.map((f, i) => (
              <Reveal key={f.name} delay={i * 90} className="border-t hairline pt-6">
                <p className="font-display text-2xl">{f.name}</p>
                <p className="mt-1 text-[0.7rem] uppercase tracking-wideish text-brass-dark">{f.role}</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-umber">{f.line}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-14">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src="/media/founders/founders-steps.webp"
                alt="Lather's three founders together on the front steps"
                fill
                sizes="(min-width: 1024px) 72rem, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="mt-12 grid gap-6 border-t hairline pt-8 lg:grid-cols-[1fr_1.2fr]">
            <h3 className="font-display text-2xl">Our team</h3>
            <div>
              <p className="max-w-xl text-umber">
                Behind every visit is a team of licensed estheticians, cosmetologists, massage
                therapists, nurse injectors, and guest coordinators — each here for the same reason:
                to help you feel genuinely well.
              </p>
              <p className="mt-5 max-w-xl text-umber">
                Have a preference?{" "}
                <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="link-ul">
                  Request your provider when you book
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── THE SPACE ────────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-porcelain">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="h-display text-4xl sm:text-5xl">Step inside</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.map((g, i) => (
              <Reveal key={g.src} delay={i * 80} className={i % 2 === 1 ? "md:mt-10" : ""}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] ease-luxe hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BookCTA title="Come see it for yourself." />
    </>
  );
}
