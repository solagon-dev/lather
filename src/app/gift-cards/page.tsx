import type { Metadata } from "next";
import { Figure, Leader, PageOpening, SectionHead } from "@/components/site/Editorial";
import { GIFT_CARD_URL, business } from "@/lib/business";
import { rituals, usd } from "@/lib/menu";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Gift Cards",
  description:
    "Digital gift cards for Lather Spa in Greenville, NC, in any amount, sent by email. A head spa ritual from $100.",
  alternates: { canonical: "/gift-cards" },
};

const steps = [
  { title: "Choose an amount", body: "Any amount, bought securely online through Vagaro." },
  { title: "Sent by email", body: "To them, or to you if you’d rather hand it over in person." },
  { title: "They book their visit", body: "Whenever the moment is right." },
];

export default function GiftCardsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Gift Cards", path: "/gift-cards" },
          ]),
        )}
      />
      <PageOpening
        eyebrow="Gift cards"
        title="Give a ritual."
        figure={
          <Figure
            src="/media/editorial/gift-card-detail.webp"
            alt="A Lather gift card"
            caption="A Lather gift card"
            ratio="4/5"
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
        }
      >
        <p>An unhurried hour with someone else&rsquo;s name on it. Digital, in any amount, sent by email.</p>
        <div className="pt-2">
          <a href={GIFT_CARD_URL} target="_blank" rel="noopener noreferrer" className="lnk">
            Buy a gift card
          </a>
        </div>
      </PageOpening>

      <section aria-labelledby="ideas" className="shell pt-20 lg:pt-32">
        <SectionHead num="01" label="A few ideas" as="h2" id="ideas" note="Any amount" />
        <ul className="mt-8 flex max-w-[40rem] flex-col gap-5 lg:ml-[88px]">
          {rituals.map((r) => (
            <li key={r.id}>
              <Leader name={r.name} price={usd(r.price)} />
              <p className="note mt-1">{r.includes}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how-gift" className="shell pb-20 pt-20 lg:pb-32 lg:pt-32">
        <SectionHead num="02" label="How it works" as="h2" id="how-gift" />
        <ol className="mt-4 lg:ml-[88px] lg:grid lg:grid-cols-3 lg:gap-12">
          {steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[44px_minmax(0,1fr)] border-b border-line py-5 lg:block lg:border-b-0 lg:border-t lg:pt-6">
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <div className="lg:mt-4">
                <h3 className="font-display text-[1.375rem] leading-snug">{s.title}</h3>
                <p className="copy mt-1">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap items-baseline gap-x-7 gap-y-4 lg:ml-[88px]">
          <a href={GIFT_CARD_URL} target="_blank" rel="noopener noreferrer" className="lnk">
            Buy a gift card
          </a>
          <a href={business.phoneHref} className="note text-ink">
            Or call {business.phone}
          </a>
        </div>
      </section>
    </>
  );
}
