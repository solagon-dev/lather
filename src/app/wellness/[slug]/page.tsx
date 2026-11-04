import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/site/ServicePage";
import { priceGroup, wellnessSummary } from "@/lib/menu";
import { clampDescription } from "@/lib/seo";
import { getTreatment, treatments } from "@/lib/wellness";

type Params = { slug: string };

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const t = getTreatment((await params).slug);
  if (!t) return {};
  return {
    title: `${t.name.charAt(0).toUpperCase()}${t.name.slice(1)} in Greenville, NC`,
    description: clampDescription(t.description),
    alternates: { canonical: `/wellness/${t.slug}` },
  };
}

export default async function WellnessTreatmentPage({ params }: { params: Promise<Params> }) {
  const t = getTreatment((await params).slug);
  if (!t) notFound();

  return (
    <ServicePage
      practice="wellness"
      path={`/wellness/${t.slug}`}
      name={t.name}
      title={
        <>
          {t.name}
          <span className="mt-4 block font-body text-[0.875rem] font-light leading-[1.6] text-taupe lg:text-[0.9375rem]">
            {t.summary}
          </span>
        </>
      }
      intro={t.intro}
      image={{ ...t.image, caption: t.caption }}
      facts={t.facts}
      group={priceGroup(t.prices)}
      related={[
        { href: "/wellness/foundations", label: "Foundations Visit", aside: "$175" },
        ...wellnessSummary
          .filter((o) => o.slug !== t.slug)
          .map((o) => ({ href: `/wellness/${o.slug}`, label: o.name, aside: o.range })),
      ]}
    />
  );
}
