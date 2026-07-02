import type { MetadataRoute } from "next";
import { blogArticles } from "@/lib/blog";
import { business } from "@/lib/business";
import { services } from "@/lib/data";
import { locations } from "@/lib/locations";
import { seoCities, seoServiceTypes } from "@/lib/seo-pages";

const BASE = business.siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/experience`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/gift-cards`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/what-is-a-head-spa`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/scalp-concerns`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.65 },
    { url: `${BASE}/locations`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/services/${s.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const articlePages: MetadataRoute.Sitemap = blogArticles.map((a) => ({
    url: `${BASE}/journal/${a.slug}`,
    lastModified: new Date(a.publishDate),
    changeFrequency: "yearly",
    priority: 0.55,
  }));

  const locationPages: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${BASE}/locations/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const seoLandingPages: MetadataRoute.Sitemap = seoServiceTypes.flatMap((t) =>
    seoCities.map((c) => ({
      url: `${BASE}/${t.urlPrefix}/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: c.slug === "greenville-nc" ? 0.7 : 0.55,
    }))
  );

  return [...core, ...servicePages, ...articlePages, ...locationPages, ...seoLandingPages];
}
