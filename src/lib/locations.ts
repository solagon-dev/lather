// ── AREAS SERVED ─────────────────────────────────────────────
//
// Lather has exactly one location, in Greenville. These are the cities guests
// drive from, and they back a single page each at /locations/<slug>.
//
// This file replaced five overlapping families of templated pages —
// /locations/<city>-head-spa plus /head-spa-near, /scalp-treatment,
// /japanese-head-spa and /scalp-massage under /<service>/<city>. That was 61
// pages competing for one query set, each a copy of the same prose with the
// city name swapped. They are now one page per city, and the old URLs 301 to
// them (see next.config.ts).
//
// The rule for what lives here: only facts that genuinely differ by city —
// distance, drive time, direction, and the road you actually take. Everything
// else on a city page (services, pricing, what to expect) is shared content
// rendered from the same source as the rest of the site, because it is the
// same business. Do not add per-city paragraphs that only differ by adjective;
// that is what made the previous version thin.

export interface ServedCity {
  slug: string;
  city: string;
  state: string;
  /** Human-readable travel time, e.g. "about 10 minutes". */
  driveTime: string;
  /** Road miles from the Fox Haven Drive location. 0 for Greenville itself. */
  distanceMiles: number;
  /** Compass relation of the city to Greenville, e.g. "south of". */
  direction: string;
  /** The main road guests take in. */
  highway: string;
  /** Index into `testimonials` in data.ts — rotates the quote shown per city. */
  testimonialIndex: number;
  /**
   * Whether this city gets its own /locations/<slug> page.
   *
   * Only the genuine catchment does. A page for a city 80 minutes away would be
   * ~150 words of real content wrapped in the same shared boilerplate as every
   * other city page — thin, and the reason the previous 61-page version failed.
   * Cities without a page still appear in the /locations table with their drive
   * time, distance and route, which is the thing a searcher actually wants; the
   * slug 301s to that hub.
   *
   * Flip this to true to give a city a page — the route, sitemap and redirect
   * all follow automatically.
   */
  hasPage: boolean;
}

/** Sorted nearest-first so the /locations hub reads as a distance ladder. */
export const servedCities: ServedCity[] = [
  { slug: "greenville-nc",     city: "Greenville",    state: "NC", driveTime: "you're already here", distanceMiles: 0,  direction: "in",           highway: "Fox Haven Drive",       testimonialIndex: 0, hasPage: true  },
  { slug: "winterville-nc",    city: "Winterville",   state: "NC", driveTime: "about 10 minutes",    distanceMiles: 5,  direction: "south of",     highway: "Greenville Boulevard",  testimonialIndex: 1, hasPage: true  },
  { slug: "grimesland-nc",     city: "Grimesland",    state: "NC", driveTime: "about 10 minutes",    distanceMiles: 8,  direction: "east of",      highway: "NC-33 West",            testimonialIndex: 2, hasPage: true  },
  { slug: "ayden-nc",          city: "Ayden",         state: "NC", driveTime: "about 18 minutes",    distanceMiles: 13, direction: "southwest of", highway: "NC-11 North",           testimonialIndex: 0, hasPage: true  },
  { slug: "farmville-nc",      city: "Farmville",     state: "NC", driveTime: "about 22 minutes",    distanceMiles: 18, direction: "west of",      highway: "US-264 East",           testimonialIndex: 1, hasPage: true  },
  { slug: "washington-nc",     city: "Washington",    state: "NC", driveTime: "about 40 minutes",    distanceMiles: 35, direction: "northwest of", highway: "US-264 East",           testimonialIndex: 2, hasPage: true  },
  { slug: "tarboro-nc",        city: "Tarboro",       state: "NC", driveTime: "about 50 minutes",    distanceMiles: 44, direction: "north of",     highway: "US-64 East",            testimonialIndex: 0, hasPage: false },
  { slug: "new-bern-nc",       city: "New Bern",      state: "NC", driveTime: "about 55 minutes",    distanceMiles: 47, direction: "southeast of", highway: "US-70 West",            testimonialIndex: 1, hasPage: false },
  { slug: "wilson-nc",         city: "Wilson",        state: "NC", driveTime: "about 55 minutes",    distanceMiles: 47, direction: "northwest of", highway: "US-264 East",           testimonialIndex: 2, hasPage: false },
  { slug: "goldsboro-nc",      city: "Goldsboro",     state: "NC", driveTime: "about 55 minutes",    distanceMiles: 50, direction: "west of",      highway: "US-70 West",            testimonialIndex: 0, hasPage: false },
  { slug: "rocky-mount-nc",    city: "Rocky Mount",   state: "NC", driveTime: "about 60 minutes",    distanceMiles: 56, direction: "northwest of", highway: "US-264 East",           testimonialIndex: 1, hasPage: false },
  { slug: "morehead-city-nc",  city: "Morehead City", state: "NC", driveTime: "about 75 minutes",    distanceMiles: 70, direction: "southeast of", highway: "US-70 West",            testimonialIndex: 2, hasPage: false },
  { slug: "jacksonville-nc",   city: "Jacksonville",  state: "NC", driveTime: "about 80 minutes",    distanceMiles: 75, direction: "south of",     highway: "NC-24 West",            testimonialIndex: 0, hasPage: false },
];

/** The subset with their own page — drives generateStaticParams and the sitemap. */
export const citiesWithPages = servedCities.filter((c) => c.hasPage);

export function getCity(slug: string): ServedCity | undefined {
  return citiesWithPages.find((c) => c.slug === slug);
}

/** Nearest other cities to a given one — used for the cross-link row. */
export function getNearbyCities(slug: string, count = 4): ServedCity[] {
  const current = getCity(slug);
  if (!current) return citiesWithPages.slice(0, count);
  return citiesWithPages
    .filter((c) => c.slug !== slug)
    .sort(
      (a, b) =>
        Math.abs(a.distanceMiles - current.distanceMiles) -
        Math.abs(b.distanceMiles - current.distanceMiles)
    )
    .slice(0, count);
}

/**
 * 301 targets for the legacy /locations/<city>-head-spa slugs. Cities that kept
 * a page go to it; the rest go to the hub, which still lists them. The four
 * service-prefixed families share the new city slug, so they fold in with a
 * wildcard rule in next.config.ts rather than needing a map.
 */
export const legacyLocationSlugs: Record<string, string> = Object.fromEntries(
  [
    ["greenville-head-spa", "greenville-nc"],
    ["winterville-head-spa", "winterville-nc"],
    ["ayden-head-spa", "ayden-nc"],
    ["farmville-head-spa", "farmville-nc"],
    ["washington-head-spa", "washington-nc"],
    ["grimesland-head-spa", "grimesland-nc"],
    ["new-bern-head-spa", "new-bern-nc"],
    ["wilson-head-spa", "wilson-nc"],
    ["rocky-mount-head-spa", "rocky-mount-nc"],
  ].map(([from, to]) => [from, getCity(to) ? `/locations/${to}` : "/locations"])
);
