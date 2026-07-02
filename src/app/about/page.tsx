import type { Metadata } from "next";
import Image from "next/image";
import BookCTA from "@/components/BookCTA";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { BOOK_URL, business } from "@/lib/business";
import { brandValues } from "@/lib/data";

export const metadata: Metadata = {
  title: "About — Our Story & The Space",
  description:
    "The story behind Lather Head Spa in Greenville, NC — bringing the Japanese head spa tradition to Eastern North Carolina in a sanctuary built for stillness. Meet the team and step inside.",
  alternates: { canonical: "/about" },
};

const team = [
  {
    image: "/media/team/madison-hoffschneider.webp",
    role: "Founder & Lead Therapist",
    bio: "With years of experience in scalp health and wellness, our founder built Lather to bring the Japanese head spa tradition to eastern North Carolina. Every protocol, product, and detail reflects a commitment to results-driven care in a genuinely calming environment.",
  },
  {
    image: "/media/team/heidi-griggs.webp",
    role: "Scalp Therapist",
    bio: "Trained in therapeutic scalp techniques and advanced treatment protocols, our scalp therapist brings precision and intuition to every session. Her approach blends technical expertise with a warm, attentive presence — ensuring every guest feels both cared for and restored.",
  },
];

const gallery = [
  { src: "/media/gallery/interior-waiting-room.webp", alt: "The quiet waiting lounge at Lather Head Spa" },
  { src: "/media/gallery/interior-gold-mirror.webp", alt: "Gold-framed mirror in the Lather treatment room" },
  { src: "/media/gallery/treatment-waterfall.webp", alt: "Warm water poured over the scalp at the treatment basin" },
  { src: "/media/gallery/interior-lamp-brass.webp", alt: "Brass lamp glowing softly inside Lather Head Spa" },
  { src: "/media/gallery/interior-diffuser.webp", alt: "Aromatherapy diffuser detail in the treatment space" },
  { src: "/media/gallery/interior-reception-detail.webp", alt: "Reception details at Lather Head Spa in Greenville, NC" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Our Story"
        title={
          <>
            Built for <span className="italic">stillness</span>
          </>
        }
        sub="A facial for your scalp — and a quiet answer to the question of where Eastern North Carolina goes to truly slow down."
        image="/media/about/about-hero.webp"
        imageAlt="The entrance of Lather Head Spa in Greenville, NC"
      />

      {/* ── STORY / PHILOSOPHY ───────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="arch relative aspect-[3/4]">
              <Image
                src="/media/about/spa-detail.webp"
                alt="Quiet interior details inside Lather Head Spa"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="kicker-line">The Lather Philosophy</p>
            <h2 className="h-display mt-6 text-balance text-4xl sm:text-5xl">
              A tradition, <span className="italic">transplanted</span>
            </h2>
            <p className="mt-8 max-w-xl text-umber">{business.description}</p>
            <p className="mt-5 max-w-xl text-umber">
              Lather began with a simple observation: the Japanese head spa tradition — careful,
              methodical, deeply restorative — had reached the coasts and the big cities, but not
              here. Eastern North Carolina had salons, and it had spas, but nowhere devoted entirely
              to the scalp. So we built one, in Greenville, from the ground up.
            </p>
            <p className="mt-5 max-w-xl text-umber">
              Everything about the space was chosen for stillness — the light, the temperature, the
              absence of a busy salon floor. Appointments are private and one-on-one. You recline
              beneath the arch of warm water, and for an hour or so, nothing is asked of you at all.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────── */}
      <section className="grain relative section-pad bg-noir text-ivory">
        <div className="wrap relative">
          <Reveal className="max-w-2xl">
            <p className="kicker-line text-brass-light">What Guides Us</p>
            <h2 className="h-display mt-6 text-balance text-4xl sm:text-5xl">
              Three things we <span className="italic text-brass-light">believe</span>
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-10 border-t border-ivory/10 pt-12 md:grid-cols-3">
            {brandValues.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <p className="font-display text-3xl font-light text-brass-light/70">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-2xl">{v.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ivory/60">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE TEAM ─────────────────────────────────────────── */}
      <section className="section-pad bg-bone">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="kicker-line">The Team</p>
            <h2 className="h-display mt-6 text-4xl sm:text-5xl">
              Skilled hands, <span className="italic">quiet presence</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-2">
            {team.map((member, i) => (
              <Reveal key={member.role} delay={i * 100}>
                <div className="arch relative aspect-[3/4] max-w-md">
                  <Image
                    src={member.image}
                    alt={`${member.role} at Lather Head Spa`}
                    fill
                    sizes="(min-width: 768px) 45vw, 90vw"
                    className="object-cover object-top"
                  />
                </div>
                <p className="mt-6 text-[0.7rem] uppercase tracking-kicker text-taupe">{member.role}</p>
                <p className="mt-3 max-w-md text-umber">{member.bio}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 border-t hairline pt-8">
            <p className="max-w-xl text-umber">
              Have a preference? You&rsquo;re welcome to request your therapist when you{" "}
              <a href={BOOK_URL} target="_blank" rel="noopener" className="link-ul">
                book on Vagaro
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── THE SPACE ────────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-porcelain">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="kicker-line">The Space</p>
            <h2 className="h-display mt-6 text-4xl sm:text-5xl">
              Step <span className="italic">inside</span>
            </h2>
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
