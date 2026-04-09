import type { MetadataRoute } from "next";
import { services } from "@/lib/data";

const BASE = "https://www.latherspas.com";

const seoCities = [
  "greenville-nc", "winterville-nc", "ayden-nc", "farmville-nc",
  "washington-nc", "new-bern-nc", "kinston-nc", "wilson-nc",
  "rocky-mount-nc", "tarboro-nc", "goldsboro-nc", "morehead-city-nc",
  "jacksonville-nc",
];

const locationSlugs = [
  "greenville-head-spa", "winterville-head-spa", "ayden-head-spa",
  "farmville-head-spa", "washington-nc-head-spa", "new-bern-head-spa",
  "kinston-head-spa", "wilson-head-spa", "rocky-mount-head-spa",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Core pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/treatments`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/what-is-a-head-spa`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/scalp-concerns`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/memberships`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/spa-parties`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/gift-cards`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/locations`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  // Individual treatment pages
  const treatmentPages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/treatments/${s.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Location pages
  const locationPages: MetadataRoute.Sitemap = locationSlugs.map((slug) => ({
    url: `${BASE}/locations/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // SEO landing pages
  const seoPages: MetadataRoute.Sitemap = ["head-spa-near", "scalp-treatment", "japanese-head-spa", "scalp-massage"]
    .flatMap((prefix) =>
      seoCities.map((city) => ({
        url: `${BASE}/${prefix}/${city}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      }))
    );

  return [...staticPages, ...treatmentPages, ...locationPages, ...seoPages];
}
