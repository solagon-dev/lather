import type { NextConfig } from "next";
import { citiesWithPages, legacyLocationSlugs } from "./src/lib/locations";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    // The four service-prefixed families were 52 near-duplicate pages built from
    // one template — /head-spa-near/<city>, /scalp-treatment/<city>,
    // /japanese-head-spa/<city> and /scalp-massage/<city>, all competing with
    // each other and with /locations for the same local queries. They share the
    // city slug with the surviving pages, so each family folds in with one rule.
    const servicePrefixes = ["head-spa-near", "scalp-treatment", "japanese-head-spa", "scalp-massage"];
    const citiesWithOwnPage = citiesWithPages.map((c) => c.slug).join("|");

    const consolidated = servicePrefixes.flatMap((prefix) => [
      // A city that kept its own page keeps its geography.
      {
        source: `/${prefix}/:city(${citiesWithOwnPage})`,
        destination: "/locations/:city",
        permanent: true,
      },
      // Everything else under that prefix — outlying cities that now live only
      // in the hub table, plus the bare prefix — goes to the hub rather than 404.
      { source: `/${prefix}/:city*`, destination: "/locations", permanent: true },
    ]);

    // The surviving city pages were renamed from <city>-head-spa to <city>-nc,
    // both to drop the head-spa-only framing after the rebrand and to match the
    // slugs the service families already used. Outlying cities point at the hub.
    const renamedCityPages = Object.entries(legacyLocationSlugs).map(([from, to]) => ({
      source: `/locations/${from}`,
      destination: to,
      permanent: true,
    }));

    return [
      // Routes renamed or removed in the 2026 redesign
      { source: "/treatments", destination: "/services", permanent: true },
      { source: "/treatments/:slug", destination: "/services/:slug", permanent: true },
      { source: "/team", destination: "/about", permanent: true },
      { source: "/memberships", destination: "/gift-cards", permanent: true },
      { source: "/spa-parties", destination: "/contact", permanent: true },

      // Routes consolidated in the 2026 duplicate-content cleanup
      ...renamedCityPages,
      ...consolidated,
    ];
  },
};

export default nextConfig;
