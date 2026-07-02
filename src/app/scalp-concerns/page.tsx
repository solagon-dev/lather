import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/data";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Scalp Concerns — Find the Right Ritual",
  description:
    "Thinning, dryness, buildup, tension, sensitivity, or damage — match your scalp concern to the right head spa ritual at Lather in Greenville, NC.",
  alternates: { canonical: "/scalp-concerns" },
};

interface Concern {
  title: string;
  subtitle: string;
  body: string;
  image: string;
  imageAlt: string;
  serviceId: string;
  note?: string;
}

const concerns: Concern[] = [
  {
    title: "Thinning & Loss",
    subtitle: "Stress · Postpartum · Seasonal · Aging",
    body: "Thinning deserves a thoughtful response, not a miracle promise. Extended massage draws circulation to the follicles, while targeted treatment and steam give the scalp its best conditions to support healthier growth over time.",
    image: "/media/scalp-concerns/thinning-loss.webp",
    imageAlt: "A guest receiving stimulating scalp massage for thinning hair",
    serviceId: "luxe-ritual",
  },
  {
    title: "Dryness & Flaking",
    subtitle: "Itching · Tightness · Visible flakes",
    body: "A dry, flaking scalp is a barrier asking for help. Gentle exfoliation lifts what's ready to go, and a nourishing mask sealed with steam restores the moisture balance underneath — relief you can feel on the drive home.",
    image: "/media/scalp-concerns/dryness-flaking.webp",
    imageAlt: "Hydrating scalp treatment for dryness and flaking",
    serviceId: "classic-ritual",
  },
  {
    title: "Buildup & Oily Scalp",
    subtitle: "Product residue · Excess oil · Heaviness",
    body: "Dry shampoo, styling products, hard water, sebum — it accumulates quietly until hair falls flat and the scalp can't breathe. A detoxifying double cleanse and exfoliation clear it layer by layer and rebalance oil production.",
    image: "/media/scalp-concerns/buildup-oily.webp",
    imageAlt: "Deep cleansing treatment for product buildup and oily scalp",
    serviceId: "classic-ritual",
  },
  {
    title: "Tension & Stress",
    subtitle: "Tight scalp · Headaches · Poor sleep",
    body: "Stress settles into the scalp and neck first. Slow, firm massage rooted in Japanese technique releases what you've been carrying — many guests report their best night of sleep in months.",
    image: "/media/scalp-concerns/tension-stress.webp",
    imageAlt: "Tension-relieving scalp and neck massage",
    serviceId: "gentlemans-recharge",
    note: "Prefer the fuller experience? The Classic Ritual carries the same massage protocol.",
  },
  {
    title: "Sensitivity",
    subtitle: "Redness · Irritation · Reactive scalp",
    body: "A sensitive scalp needs a lighter hand, not less care. We adapt The Classic Ritual with a gentle protocol — softer pressure, soothing products, and constant check-ins — so the session calms rather than provokes.",
    image: "/media/scalp-concerns/sensitivity.webp",
    imageAlt: "Gentle, soothing treatment for a sensitive scalp",
    serviceId: "classic-ritual",
    note: "Mention sensitivity when you book and we'll plan the gentle protocol.",
  },
  {
    title: "Damage & Repair",
    subtitle: "Color · Heat styling · Breakage",
    body: "Color, heat, and chemical processing take their toll on hair and the scalp beneath it. Our most complete ritual delivers concentrated moisture, an extended massage, and a professional finish — repair from the root out.",
    image: "/media/scalp-concerns/damage-repair.webp",
    imageAlt: "Reparative hair and scalp treatment for damaged hair",
    serviceId: "luxe-ritual",
  },
];

function ConcernCard({ concern, index }: { concern: Concern; index: number }) {
  const service = services.find((s) => s.id === concern.serviceId)!;
  return (
    <Reveal delay={index * 80} className="flex flex-col border hairline bg-ivory">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={concern.image}
          alt={concern.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
          className="object-cover transition-transform duration-[1.2s] ease-luxe hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-8">
        <p className="text-[0.62rem] uppercase tracking-kicker text-taupe">{concern.subtitle}</p>
        <h3 className="mt-3 font-display text-2xl">{concern.title}</h3>
        <p className="mt-4 flex-1 text-[0.9rem] leading-relaxed text-umber">{concern.body}</p>
        {concern.note && <p className="mt-4 text-[0.8rem] italic text-taupe">{concern.note}</p>}
        <div className="mt-6 border-t hairline pt-5">
          <p className="text-[0.62rem] uppercase tracking-kicker text-taupe">We recommend</p>
          <Link
            href={`/services/${service.id}`}
            className="link-ul mt-2 inline-block font-display text-xl text-ink"
          >
            {service.name} →
          </Link>
          <p className="mt-1 text-[0.75rem] text-taupe">
            {service.duration} · {service.id === "blowout" ? `from $${service.price}` : `$${service.price}`}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function ScalpConcernsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Scalp Concerns", path: "/scalp-concerns" },
          ])
        )}
      />

      <PageHero
        kicker="Start With Your Concern"
        title={
          <>
            What is your scalp <span className="italic">telling you?</span>
          </>
        }
        sub="Every scalp tells a story. Find yours below, and we'll point you to the ritual that answers it."
        image="/media/scalp-concerns/concerns-hero.webp"
        imageAlt="A therapist assessing a guest's scalp at Lather Head Spa"
      />

      {/* ── CONCERNS 1–3 ─────────────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="kicker-line">Common Concerns</p>
            <h2 className="h-display mt-6 text-4xl sm:text-5xl">
              Six pathways <span className="italic">in</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {concerns.slice(0, 3).map((c, i) => (
              <ConcernCard key={c.title} concern={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── NOT SURE? ────────────────────────────────────────── */}
      <section className="grain relative bg-noir py-20 text-ivory sm:py-28">
        <div className="wrap relative px-6 text-center">
          <Reveal>
            <p className="kicker text-brass-light">Not Sure?</p>
            <h2 className="h-display mx-auto mt-6 max-w-3xl text-balance text-3xl sm:text-4xl md:text-5xl">
              Start with a consultation — every ritual{" "}
              <span className="italic text-brass-light">begins with one.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-ivory/70">
              You don&rsquo;t need to diagnose yourself. Every session opens with a scalp
              assessment, and your therapist tailors the treatment to what we find — not what you
              guessed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CONCERNS 4–6 ─────────────────────────────────────── */}
      <section className="section-pad bg-ivory">
        <div className="wrap">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {concerns.slice(3).map((c, i) => (
              <ConcernCard key={c.title} concern={c} index={i} />
            ))}
          </div>
          <Reveal className="mt-14 border-t hairline pt-8">
            <p className="max-w-xl text-umber">
              Want to compare everything side by side?{" "}
              <Link href="/services" className="link-ul">
                Browse the full ritual menu
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <BookCTA title="Your concern has an answer." />
    </>
  );
}
