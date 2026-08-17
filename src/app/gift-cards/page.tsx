import type { Metadata } from "next";
import BookCTA from "@/components/BookCTA";
import EditorialSplitHero from "@/components/heroes/EditorialSplitHero";
import Reveal from "@/components/Reveal";
import { Em } from "@/components/ui/Type";
import { GIFT_CARD_URL } from "@/lib/business";
import { services } from "@/lib/data";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Gift Cards — Give the Ritual",
  description:
    "Digital gift certificates for Lather Spa & Wellness in Greenville, NC. Any amount, any service, delivered instantly by email.",
  alternates: { canonical: "/gift-cards" },
};

const steps = [
  {
    number: "01",
    title: "Choose an amount",
    body: "Any amount you like, bought through our secure payment page.",
  },
  {
    number: "02",
    title: "Sent instantly by email",
    body: "The digital certificate arrives in their inbox moments after purchase — or in yours, if you'd rather hand it over in person.",
  },
  {
    number: "03",
    title: "They book their ritual",
    body: "Redeemable toward any service on the menu, whenever the moment is right. No printing, no fine print.",
  },
];

export default function GiftCardsPage() {
  const blowout = services.find((s) => s.id === "blowout");
  const classic = services.find((s) => s.id === "classic-ritual");
  const luxe = services.find((s) => s.id === "luxe-ritual");

  const amounts = [
    blowout && {
      price: blowout.price,
      name: blowout.name,
      note: "A polished wash, blowdry, and style — the perfect small luxury.",
    },
    classic && {
      price: classic.price,
      name: classic.name,
      note: "Our most popular ritual — the full head spa experience, start to finish.",
    },
    luxe && {
      price: luxe.price,
      name: luxe.name,
      note: "The most complete gift on the menu — a full head spa ritual for scalp, hair, and skin.",
    },
  ].filter(Boolean) as { price: number; name: string; note: string }[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Gift Cards", path: "/gift-cards" },
          ])
        )}
      />
      <EditorialSplitHero
        src="/media/editorial/gift-card-detail.webp"
        alt="A Lather Spa & Wellness gift card styled with quiet, editorial detail"
        side="left"
        title={
          <>
            The <Em>&ldquo;sorry, I have plans&rdquo;</Em> gift.
          </>
        }
        sub="A Lather gift card is an hour of stillness with someone else's name on it — digital, instant, and redeemable toward any spa or wellness service on the menu."
      />

      {/* ── INTRO ────────────────────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <h2 className="h-display text-balance text-4xl sm:text-5xl">
              Stillness, gift-wrapped
            </h2>
            <p className="mt-8 max-w-xl text-umber">
              Lather gift certificates are digital and bought securely online in any amount you
              choose. They arrive by email and can be put toward any spa or wellness service on the
              menu.
            </p>
            <p className="mt-5 max-w-xl text-umber">
              And because a gift card never feels rushed, your recipient books whenever the moment
              is right — this month or six months from now.
            </p>
            <div className="mt-10">
              <a href={GIFT_CARD_URL} target="_blank" rel="noopener noreferrer" className="btn-solid">
                Buy a Gift Card
              </a>
            </div>
          </Reveal>
          <ol className="space-y-8 border-t hairline pt-8">
            {steps.map((step, i) => (
              <Reveal key={step.number} as="li" delay={i * 80} className="flex gap-6">
                <p className="font-display text-3xl text-brass-dark">{step.number}</p>
                <div>
                  <h3 className="font-display text-2xl">{step.title}</h3>
                  <p className="mt-2 text-[0.95rem] text-umber">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── SUGGESTED AMOUNTS ────────────────────────────────── */}
      <section className="grain relative section-pad border-t hairline bg-noir text-ivory">
        <div className="wrap relative">
          <Reveal className="max-w-2xl">
            <h2 className="h-display text-balance text-4xl sm:text-5xl">
              Amounts that map to a head spa ritual
            </h2>
            <p className="mt-6 text-ivory/70">
              Any amount works toward any service — but if you want the gift to cover a full head spa
              ritual, these are the numbers to know.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-ivory/10 pt-12 md:grid-cols-3">
            {amounts.map((a, i) => (
              <Reveal key={a.name} delay={i * 80}>
                <p className="font-display text-4xl text-brass-light">${a.price}</p>
                <h3 className="mt-4 font-display text-2xl">{a.name}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ivory/60">{a.note}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <a href={GIFT_CARD_URL} target="_blank" rel="noopener noreferrer" className="btn-solid-light">
              Buy a Gift Card
            </a>
          </Reveal>
        </div>
      </section>

      <BookCTA title="Or treat yourself instead." />
    </>
  );
}
