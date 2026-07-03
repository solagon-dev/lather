import Image from "next/image";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import FaqAccordion from "@/components/FaqAccordion";
import HeroMedia from "@/components/HeroMedia";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import SocialSection from "@/components/SocialSection";
import { BOOK_URL, business, hours } from "@/lib/business";
import { faqs, services, testimonials } from "@/lib/data";
import { experienceSteps } from "@/lib/experience";

const galleryStrip = [
  { src: "/media/gallery/interior-gold-mirror.webp", alt: "Gold-framed mirror in the Lather treatment room" },
  { src: "/media/gallery/interior-waiting-room.webp", alt: "The Lather waiting lounge" },
  { src: "/media/gallery/interior-lamp-brass.webp", alt: "Brass lamp detail inside Lather Head Spa" },
  { src: "/media/gallery/interior-reception-detail.webp", alt: "Reception details at Lather Head Spa" },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="grain relative flex min-h-[100svh] flex-col justify-center gap-7 overflow-hidden bg-noir pt-20 text-ivory md:justify-end md:gap-0 md:pt-0">
        <HeroMedia />

        <div className="wrap relative z-10 px-6 pb-6 sm:px-10 md:pb-24 md:pt-44 lg:px-16">
          <Reveal>
            <h1 className="h-display max-w-4xl text-balance text-5xl leading-[1.03] sm:text-6xl md:text-7xl lg:text-8xl">
              A facial <span className="italic text-brass-light">for your scalp.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-ivory/75 sm:mt-8 sm:text-lg">
              Japanese-inspired scalp rituals, therapeutic massage, and hair wellness in a
              sanctuary built for stillness. Greenville, North Carolina.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a href={BOOK_URL} target="_blank" rel="noopener" className="btn-solid-light">
                Book Your Ritual
              </a>
              <Link href="/services" className="btn-outline-light">
                Explore Services
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-8 right-8 hidden items-center gap-3 text-[0.65rem] uppercase tracking-kicker text-ivory/50 md:flex">
          <span>Scroll</span>
          <span className="block h-10 w-px animate-pulse bg-ivory/40" />
        </div>
      </section>

      <Marquee />

      {/* ── PHILOSOPHY ───────────────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="arch relative aspect-[3/4]">
              <Image
                src="/media/gallery/treatment-waterfall.webp"
                alt="Warm water poured over the scalp during a Lather head spa ritual"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 right-2 bg-noir px-5 py-4 text-ivory sm:-bottom-6 sm:-right-4 sm:px-6 sm:py-5 md:-right-10">
              <p className="font-display text-3xl text-brass-light">5.0</p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-kicker text-ivory/60">Guest Rating</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="h-display text-balance text-4xl sm:text-5xl">
              Where the scalp breathes again
            </h2>
            <p className="mt-8 max-w-xl text-umber">
              Lather is a premier beauty-wellness establishment in Greenville, North Carolina —
              built on a simple belief: the scalp deserves the same professional care as the skin
              on your face. We combine ultimate relaxation with results-oriented scalp and hair
              treatments, rooted in Japanese head spa tradition.
            </p>
            <p className="mt-5 max-w-xl text-umber">
              No noise, no rush, no busy salon floor. Step into our tranquil oasis, recline beneath
              the arch of warm water, and let skilled hands take it from there.
            </p>
            <dl className="mt-10 grid grid-cols-1 gap-5 border-t hairline pt-8 sm:grid-cols-3 sm:gap-6">
              <div>
                <dt className="text-[0.62rem] uppercase tracking-kicker text-taupe">Appointments</dt>
                <dd className="mt-2 font-display text-lg">Private, one-on-one</dd>
              </div>
              <div>
                <dt className="text-[0.62rem] uppercase tracking-kicker text-taupe">Tradition</dt>
                <dd className="mt-2 font-display text-lg">Japanese-inspired</dd>
              </div>
              <div>
                <dt className="text-[0.62rem] uppercase tracking-kicker text-taupe">Rituals from</dt>
                <dd className="mt-2 font-display text-lg">45–90 minutes</dd>
              </div>
            </dl>
            <Link href="/about" className="link-ul mt-10 inline-block text-[0.75rem] font-semibold uppercase tracking-kicker">
              Our Story →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-ivory">
        <div className="wrap">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-display text-4xl sm:text-5xl">Choose your ritual</h2>
            <Link href="/services" className="link-ul mb-2 text-[0.75rem] font-semibold uppercase tracking-kicker">
              Full Menu & Add-Ons →
            </Link>
          </Reveal>
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────── */}
      <section className="grain relative section-pad bg-noir text-ivory">
        <div className="wrap relative">
          <Reveal className="max-w-2xl">
            <h2 className="h-display text-balance text-4xl sm:text-5xl">
              One unhurried hour, five movements
            </h2>
          </Reveal>
          <ol className="mt-16 grid gap-10 border-t border-ivory/10 pt-12 sm:grid-cols-2 lg:grid-cols-5">
            {experienceSteps.map((step, i) => (
              <Reveal key={step.number} as="li" delay={i * 80}>
                <p className="font-display text-3xl font-light text-brass-light/70">{step.number}</p>
                <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ivory/60">{step.body}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-14">
            <Link href="/experience" className="btn-outline-light">
              The Full Experience
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── EDITORIAL BREAK ──────────────────────────────────── */}
      <section className="relative h-[52vh] min-h-[380px] overflow-hidden">
        <Image
          src="/media/editorial/editorial-break.webp"
          alt="Quiet ambiance inside Lather Head Spa"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-noir/35 px-6">
          <Reveal>
            <p className="h-display max-w-3xl text-center text-3xl italic text-ivory sm:text-4xl md:text-5xl">
              &ldquo;Sorry, I have plans&rdquo; — the plans:
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="section-pad bg-bone">
        <div className="wrap">
          <Reveal className="text-center">
            <h2 className="h-display text-4xl sm:text-5xl">Five stars, every one</h2>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100} className="flex flex-col border hairline bg-ivory p-8">
                <blockquote className="flex-1 font-display text-xl font-light leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 border-t hairline pt-4 text-[0.75rem] uppercase tracking-wideish text-taupe">
                  <span className="font-semibold text-ink">{t.name}</span> · {t.service}
                  <br />
                  <span className="text-[0.65rem]">{t.location}</span>
                </footer>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPACE / GALLERY STRIP ────────────────────────────── */}
      <section className="section-pad border-t hairline bg-porcelain">
        <div className="wrap">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-display text-4xl sm:text-5xl">Designed for stillness</h2>
            <Link href="/about" className="link-ul mb-2 text-[0.75rem] font-semibold uppercase tracking-kicker">
              Step Inside →
            </Link>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryStrip.map((g, i) => (
              <Reveal key={g.src} delay={i * 80} className={i % 2 === 1 ? "md:mt-10" : ""}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] ease-luxe hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ TEASER ───────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-ivory">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h2 className="h-display text-4xl sm:text-5xl">First time at a head spa?</h2>
            <p className="mt-6 max-w-md text-umber">
              Most of our guests are first-timers. Here&rsquo;s what people ask before they book —
              and everything else lives on the FAQ page.
            </p>
            <Link href="/faq" className="link-ul mt-8 inline-block text-[0.75rem] font-semibold uppercase tracking-kicker">
              All Questions →
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <FaqAccordion faqs={faqs.slice(0, 4)} />
          </Reveal>
        </div>
      </section>

      {/* ── SOCIAL / INSTAGRAM ───────────────────────────────── */}
      <SocialSection />

      {/* ── VISIT ────────────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-porcelain">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="h-display text-4xl sm:text-5xl">In the heart of Greenville</h2>
            <address className="mt-8 not-italic text-umber">
              <a href={business.mapsUrl} target="_blank" rel="noopener" className="link-ul font-display text-2xl text-ink">
                620 Lynndale Court, Unit B
              </a>
              <br />
              Greenville, NC 27858
              <br />
              <a href={business.phoneHref} className="link-ul mt-4 inline-block">
                {business.phone}
              </a>
            </address>
            <p className="mt-4 text-[0.85rem] text-taupe">{business.parking} · By appointment only</p>
            <div className="mt-8 max-w-sm">
              <ul className="space-y-1 text-[0.9rem] text-umber">
                {hours.map((h) => (
                  <li key={h.day} className="flex justify-between border-b hairline pb-1">
                    <span>{h.day}</span>
                    <span>{h.open ? `${h.open} – ${h.close}` : "Closed"}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120} className="relative">
            <div className="arch relative aspect-[3/4] max-h-[560px] w-full">
              <Image
                src="/media/about/about-hero.webp"
                alt="The entrance of Lather Head Spa in Greenville, NC"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <BookCTA />
    </>
  );
}
