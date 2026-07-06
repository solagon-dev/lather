import Image from "next/image";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import HeroMedia from "@/components/HeroMedia";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import SocialSection from "@/components/SocialSection";
import { BOOK_URL, business, hours } from "@/lib/business";
import { testimonials } from "@/lib/data";
import { featuredProvider, pillars, whyLather } from "@/lib/menu";

const galleryStrip = [
  { src: "/media/gallery/interior-gold-mirror.webp", alt: "Gold-framed mirror in the Lather treatment room" },
  { src: "/media/gallery/interior-waiting-room.webp", alt: "The Lather lounge" },
  { src: "/media/gallery/interior-lamp-brass.webp", alt: "Brass lamp detail at Lather Spa & Wellness" },
  { src: "/media/gallery/interior-reception-detail.webp", alt: "Reception details at Lather Spa & Wellness" },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="grain relative flex min-h-[100svh] flex-col justify-center gap-7 overflow-hidden bg-noir pt-20 text-ivory md:justify-end md:gap-0 md:pt-0">
        <HeroMedia />

        <div className="wrap relative z-10 px-6 pb-6 sm:px-10 md:pb-24 md:pt-44 lg:px-16">
          <Reveal>
            <h1 className="h-display max-w-4xl text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
              Where modern wellness meets <span className="italic text-brass-light">elevated self-care.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-ivory/75 sm:mt-8 sm:text-lg">
              A luxury wellness destination in Greenville, North Carolina — restorative spa
              experiences and advanced, personalized wellness care, in one considered space.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a href={BOOK_URL} target="_blank" rel="noopener" className="btn-solid-light">
                Book Appointment
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

      {/* ── INTRO ────────────────────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="arch relative aspect-[3/4]">
              <Image
                src="/media/gallery/treatment-waterfall.webp"
                alt="A restorative treatment at Lather Spa & Wellness"
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
              Two kinds of care, one destination
            </h2>
            <p className="mt-8 max-w-xl text-umber">
              Lather Spa &amp; Wellness blends restorative spa experiences with advanced, personalized
              wellness care. We bridge the gap between clinical wellness and restorative spa — offering
              both in one thoughtfully designed space.
            </p>
            <p className="mt-5 max-w-xl text-umber">
              Results-driven treatments in a calm, elevated environment. Somewhere to slow down, feel
              genuinely cared for, and invest in yourself without guilt.
            </p>
            <dl className="mt-10 grid grid-cols-1 gap-5 border-t hairline pt-8 sm:grid-cols-3 sm:gap-6">
              <div>
                <dt className="text-[0.62rem] uppercase tracking-kicker text-taupe">Located</dt>
                <dd className="mt-2 font-display text-lg">Greenville, NC</dd>
              </div>
              <div>
                <dt className="text-[0.62rem] uppercase tracking-kicker text-taupe">Every plan</dt>
                <dd className="mt-2 font-display text-lg">Personalized</dd>
              </div>
              <div>
                <dt className="text-[0.62rem] uppercase tracking-kicker text-taupe">Delivered by</dt>
                <dd className="mt-2 font-display text-lg">Licensed providers</dd>
              </div>
            </dl>
            <Link href="/about" className="link-ul mt-10 inline-block text-[0.75rem] font-semibold uppercase tracking-kicker">
              Our Story →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── PILLARS ──────────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-ivory">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="h-display text-4xl sm:text-5xl">
              Spa <span className="italic text-brass-dark">&amp;</span> wellness
            </h2>
            <p className="mt-6 text-umber">
              Two pillars of care under one roof — restore the body and skin, and renew your
              long-term well-being.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.key} delay={i * 120} className="group flex flex-col border hairline bg-porcelain">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt={pillar.label}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 bg-noir/80 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-kicker text-brass-light backdrop-blur-sm">
                    {pillar.tagline}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="font-display text-3xl">{pillar.label}</h3>
                  <p className="mt-4 text-umber">{pillar.intro}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {pillar.items.map((item) => (
                      <li
                        key={item.name}
                        className="border hairline px-3 py-1.5 text-[0.72rem] uppercase tracking-wideish text-umber"
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/services"
                    className="link-ul mt-8 inline-block text-[0.75rem] font-semibold uppercase tracking-kicker"
                  >
                    View {pillar.label} →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED: WELLNESS CONSULTATION ──────────────────── */}
      <section className="grain relative overflow-hidden bg-noir text-ivory">
        <div className="wrap grid items-stretch gap-0 lg:grid-cols-2">
          <div className="relative min-h-[22rem] lg:min-h-[32rem]">
            <Image
              src="/media/team/team-atmosphere.webp"
              alt="Inside Lather Spa & Wellness"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <Reveal className="flex flex-col justify-center px-6 py-16 sm:px-10 md:py-24 lg:px-16">
            <p className="text-[0.7rem] font-semibold uppercase tracking-kicker text-brass-light">
              Start here
            </p>
            <h2 className="h-display mt-5 text-balance text-4xl sm:text-5xl">
              Begin with a wellness consultation
            </h2>
            <p className="mt-6 max-w-lg text-ivory/75">{featuredProvider.blurb}</p>
            <p className="mt-6 font-display text-xl text-brass-light">
              {featuredProvider.name}
              <span className="block text-[0.8rem] font-normal uppercase tracking-wideish text-ivory/50">
                {featuredProvider.role}
              </span>
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a href={BOOK_URL} target="_blank" rel="noopener" className="btn-solid-light">
                Book a Consultation
              </a>
              <Link href="/services" className="btn-outline-light">
                All Wellness Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHY LATHER ───────────────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="h-display text-4xl sm:text-5xl">Why Lather</h2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {whyLather.map((item, i) => (
              <Reveal key={item.title} as="div" delay={i * 70} className="border-t hairline pt-6">
                <p className="font-display text-2xl">{item.title}</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-umber">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL BREAK ──────────────────────────────────── */}
      <section className="relative h-[52vh] min-h-[380px] overflow-hidden">
        <Image
          src="/media/editorial/editorial-break.webp"
          alt="Quiet ambiance inside Lather Spa & Wellness"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-noir/40 px-6">
          <Reveal>
            <p className="h-display max-w-3xl text-center text-3xl italic text-ivory sm:text-4xl md:text-5xl">
              Leave better than you arrived.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="section-pad bg-bone">
        <div className="wrap">
          <Reveal className="text-center">
            <h2 className="h-display text-4xl sm:text-5xl">In their words</h2>
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
            <h2 className="h-display text-4xl sm:text-5xl">Step inside</h2>
            <Link href="/about" className="link-ul mb-2 text-[0.75rem] font-semibold uppercase tracking-kicker">
              Our Space →
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

      {/* ── SOCIAL / INSTAGRAM ───────────────────────────────── */}
      <SocialSection />

      {/* ── VISIT ────────────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-porcelain">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="h-display text-4xl sm:text-5xl">In the heart of Greenville</h2>
            <address className="mt-8 not-italic text-umber">
              <a href={business.mapsUrl} target="_blank" rel="noopener" className="link-ul font-display text-2xl text-ink">
                {business.address.street}
              </a>
              <br />
              {business.address.city}, {business.address.state} {business.address.zip}
              <br />
              <a href={business.phoneHref} className="link-ul mt-4 inline-block">
                {business.phone}
              </a>
            </address>
            <p className="mt-4 text-[0.85rem] text-taupe">{business.parking} · By appointment</p>
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
                alt="Lather Spa & Wellness in Greenville, NC"
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
