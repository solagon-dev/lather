import type { MetadataRoute } from "next";
import { blogArticles } from "@/lib/blog";
import { business } from "@/lib/business";
import { citiesWithPages } from "@/lib/locations";
import { treatments } from "@/lib/wellness";

const BASE = business.siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/spa`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE}/wellness`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE}/menu`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/spa/head-spa`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/spa/facials`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/spa/massage`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/wellness/foundations`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/gift-cards`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/visit`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/what-is-a-head-spa`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/scalp-concerns`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/locations`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const wellnessPages: MetadataRoute.Sitemap = treatments.map((t) => ({
    url: `${BASE}/wellness/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const articlePages: MetadataRoute.Sitemap = blogArticles.map((a) => ({
    url: `${BASE}/journal/${a.slug}`,
    lastModified: new Date(a.publishDate),
    changeFrequency: "yearly",
    priority: 0.55,
  }));

  // One page per city served. The four service-prefixed families that used to
  // sit alongside these were near-duplicates of each other and now 301 here.
  const cityPages: MetadataRoute.Sitemap = citiesWithPages.map((c) => ({
    url: `${BASE}/locations/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: c.distanceMiles === 0 ? 0.75 : 0.55,
  }));

  return [...core, ...wellnessPages, ...articlePages, ...cityPages];
}
