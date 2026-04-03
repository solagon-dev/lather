import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLandingPage from "@/components/SeoLandingPage";
import { seoCities, getSeoService } from "@/lib/seo-pages";

type Props = { params: Promise<{ city: string }> };

const SERVICE_KEY = "japanese-head-spa";

export async function generateStaticParams() {
  return seoCities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = seoCities.find((c) => c.slug === citySlug);
  const service = getSeoService(SERVICE_KEY);
  if (!city || !service) return {};
  return {
    title: service.metaTitle(city.name, city.state),
    description: service.metaDesc(city.name, city.state, city.driveTime),
  };
}

export default async function JapaneseHeadSpaCityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = seoCities.find((c) => c.slug === citySlug);
  if (!city) notFound();
  return <SeoLandingPage serviceKey={SERVICE_KEY} citySlug={citySlug} />;
}
