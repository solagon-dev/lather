import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLandingPage from "@/components/SeoLandingPage";
import { getSeoCity, getSeoService, seoCities } from "@/lib/seo-pages";

const service = getSeoService("scalp-massage")!;

interface Params {
  city: string;
}

export function generateStaticParams() {
  return seoCities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city } = await params;
  const seoCity = getSeoCity(city);
  if (!seoCity) return {};
  return {
    title: { absolute: service.metaTitle(seoCity.name, seoCity.state) },
    description: service.metaDesc(seoCity.name, seoCity.state, seoCity.driveTime),
    alternates: { canonical: `/${service.urlPrefix}/${seoCity.slug}` },
  };
}

export default async function ScalpMassageCityPage({ params }: { params: Promise<Params> }) {
  const { city } = await params;
  const seoCity = getSeoCity(city);
  if (!seoCity) notFound();
  return <SeoLandingPage city={seoCity} service={service} />;
}
