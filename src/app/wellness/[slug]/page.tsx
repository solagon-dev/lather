import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TreatmentLayout from "@/components/TreatmentLayout";
import { WELLNESS_BOOK_URL } from "@/lib/business";
import { priceGroup } from "@/lib/menu";
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
    title: `${t.name} in Greenville, NC`,
    description: clampDescription(t.description),
    alternates: { canonical: `/wellness/${t.slug}` },
  };
}

export default async function WellnessTreatmentPage({ params }: { params: Promise<Params> }) {
  const t = getTreatment((await params).slug);
  if (!t) notFound();

  const group = priceGroup(t.prices.group);
  const items = t.prices.only ? group.items.filter((i) => t.prices.only!.includes(i.name)) : undefined;

  return (
    <TreatmentLayout
      pillar={{ label: "Lather Wellness", href: "/wellness" }}
      path={`/wellness/${t.slug}`}
      name={t.name}
      tagline={t.tagline}
      image={t.image}
      intro={t.intro}
      facts={t.facts}
      prices={{ group, items, heading: t.prices.heading }}
      priceNote={t.priceNote}
      book={{ url: WELLNESS_BOOK_URL, label: "Request a Visit" }}
      related={treatments.filter((o) => o.slug !== t.slug).map((o) => ({ href: `/wellness/${o.slug}`, label: o.name }))}
    />
  );
}
