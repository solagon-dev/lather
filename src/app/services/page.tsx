import type { Metadata } from "next";
import BookCTA from "@/components/BookCTA";
import Marquee from "@/components/Marquee";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import { BOOK_URL } from "@/lib/business";
import { addOns, services } from "@/lib/data";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Head Spa Services & Pricing in Greenville, NC",
  description:
    "Explore Lather Head Spa's service menu — The Luxe Ritual ($200), The Classic Ritual ($125), Gentleman's Recharge ($100), and signature Blowouts (from $50) in Greenville, NC.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ])
        )}
      />
      <PageHero
        kicker="Services & Pricing"
        title={
          <>
            The service <span className="italic">menu</span>
          </>
        }
        sub="Four rituals, one philosophy: unhurried, results-oriented scalp care. Every session is private and by appointment only."
        image="/media/treatments/treatments-hero.webp"
        imageAlt="Scalp treatment in progress at Lather Head Spa"
      />

      <section className="section-pad bg-porcelain">
        <div className="wrap grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* ── ADD-ONS ──────────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-ivory">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="kicker-line">Enhancements</p>
            <h2 className="h-display mt-6 text-4xl sm:text-5xl">
              Make it <span className="italic">yours</span>
            </h2>
            <p className="mt-6 text-umber">
              Add any enhancement to your ritual when you book, or simply ask when you arrive.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border hairline bg-ink/10 sm:grid-cols-2">
            {addOns.map((a, i) => (
              <Reveal key={a.id} delay={i * 70} className="bg-ivory p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl">{a.name}</h3>
                  <p className="shrink-0 font-display text-xl text-brass-dark">${a.price}</p>
                </div>
                <p className="mt-1 text-[0.7rem] uppercase tracking-kicker text-taupe">{a.duration}</p>
                <p className="mt-4 text-[0.95rem] text-umber">{a.description}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 flex flex-wrap items-center gap-6">
            <a href={BOOK_URL} target="_blank" rel="noopener" className="btn-solid">
              Book on Vagaro
            </a>
            <p className="text-[0.85rem] text-taupe">
              Booking opens in Vagaro — Lather&rsquo;s secure scheduling partner.
            </p>
          </Reveal>
        </div>
      </section>

      <Marquee />
      <BookCTA title="Not sure which ritual is right?" body="Start with The Classic Ritual — our most popular treatment and the perfect introduction. Or call us and we'll match a service to your scalp." />
    </>
  );
}
