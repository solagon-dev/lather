import type { Metadata } from "next";
import Link from "next/link";
import { Figure, Leader, PageOpening, PriceMenu, SectionHead } from "@/components/site/Editorial";
import { WELLNESS_BOOK_URL, business, wellnessHoursShort } from "@/lib/business";
import { foundations, priceGroup, provider, usd } from "@/lib/menu";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Foundations Visit: Women's Wellness in Greenville, NC",
  description:
    "The Foundations Visit ($175) with Stacia Friend, CNM: a comprehensive wellness consultation on symptoms, health, lifestyle and goals, and an individualized plan.",
  alternates: { canonical: "/wellness/foundations" },
};

// The brochure's Hormone Support list, with a line on each from the practice's
// sneak-peek menu. Descriptions only; no outcome claims.
const areas = [
  { name: "Perimenopause", body: "Care for the changes that can begin years before menopause." },
  { name: "Menopause", body: "Hormone care through menopause and beyond." },
  {
    name: "Metabolic health & weight management",
    body: "Medical weight management and body composition, with GLP-1 therapy when appropriate.",
  },
  { name: "Sexual wellness", body: "Private, personalized care for women’s intimate wellness." },
  { name: "Postpartum wellness", body: "Support through the physical and hormonal changes of motherhood." },
  { name: "Peptide & longevity", body: "Individualized therapies for recovery and healthy aging, when medically appropriate." },
];

export default function FoundationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Lather Wellness", path: "/wellness" },
            { name: "Foundations Visit", path: "/wellness/foundations" },
          ]),
        )}
      />
      <PageOpening
        eyebrow="Lather Wellness"
        aside="By request"
        title="The Foundations Visit."
        figure={
          <Figure
            src="/media/experience/step-01-consultation.webp"
            alt="Stacia Friend, CNM, in conversation with a guest"
            caption={provider.line}
            focal="50% 30%"
            ratio="4/5"
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
        }
      >
        <p className="cap-m">{foundations.lead}</p>
        <p>{foundations.description}</p>
        <p>You don&rsquo;t need to know which hormone, lab or treatment you need before you come in. That is what the visit is for.</p>
        <div className="pt-2">
          <Leader name={foundations.name} price={usd(foundations.price)} />
        </div>
      </PageOpening>

      <section aria-labelledby="support" className="shell pt-20 lg:pt-32">
        <SectionHead num="01" label="Hormone support" as="h2" id="support" note="What a visit can lead to" />
        <ul className="mt-4 lg:ml-[88px] lg:grid lg:grid-cols-2 lg:gap-x-12">
          {areas.map((a) => (
            <li key={a.name} className="border-b border-line py-5">
              <h3 className="font-display text-[1.375rem] leading-snug">{a.name}</h3>
              <p className="note mt-1">{a.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="visit-prices" className="shell pb-20 pt-20 lg:pb-32 lg:pt-32">
        <SectionHead num="02" label="Prices" as="h2" id="visit-prices" note={wellnessHoursShort} />
        <div className="mt-8 max-w-[36rem] lg:ml-[88px]">
          <PriceMenu group={priceGroup("wellness-visits")} showHeading={false} />
          <div className="mt-8 flex flex-wrap items-baseline gap-x-7 gap-y-4">
            <a href={WELLNESS_BOOK_URL} target="_blank" rel="noopener noreferrer" className="lnk">
              Request a Foundations Visit
            </a>
            <a href={business.phoneHref} className="note text-ink hover:text-brass-dark">
              Questions? {business.phone}
            </a>
          </div>
          <p className="note mt-6">
            The practice confirms every request with you. This page is general information, not medical advice. See also{" "}
            <Link href="/wellness" className="text-ink underline decoration-line-dots underline-offset-4">
              all wellness treatments
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
