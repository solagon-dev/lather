// ── THE MENU ─────────────────────────────────────────────────
// Everything Lather sells, with its price, in one place. The client's printed
// brochure (output/brochure-v12) is the source of truth: names, prices,
// durations and the one-line "what's included" are copied from it, so the site
// and the paper menu never disagree. Detailed tables the brochure only
// summarises (laser by area, Secret RF/PRO by treatment, vitamin injections)
// come from the client's price list and the two Vagaro profiles.
//
// Two practices, each with its own booking:
//   Lather Spa       vagaro.com/latherspa       booked instantly online
//   Lather Wellness  vagaro.com/latherwellness  requested, then confirmed

import { BOOK_URL, WELLNESS_BOOK_URL } from "@/lib/business";

// ── LATHER SPA ───────────────────────────────────────────────

export interface Ritual {
  /** Anchor on /spa/head-spa, and the id in data.ts where there is one. */
  id: string;
  name: string;
  price: number;
  minutes?: number;
  /** The brochure's one line. */
  includes: string;
}

export const rituals: Ritual[] = [
  {
    id: "classic-ritual",
    name: "The Classic Ritual",
    price: 125,
    minutes: 75,
    includes: "Scalp cleanse, exfoliation, massage, nourishing mask, steam, and a blowdry.",
  },
  {
    id: "luxe-ritual",
    name: "The Luxe Ritual",
    price: 175,
    minutes: 90,
    includes: "Our complete ritual with extended massage, rose petal jelly facial, and a blowout.",
  },
  {
    id: "gentlemans-recharge",
    name: "Gentleman’s Recharge",
    price: 100,
    minutes: 60,
    includes: "A deep scalp cleanse, restorative massage, and revitalizing hair treatment.",
  },
  {
    id: "couples-retreat",
    name: "Couples Head Spa Retreat",
    price: 250,
    includes: "A scalp ritual for two, enjoyed side by side.",
  },
];

export const enhancements = [
  { name: "Extended massage, 15 minutes", price: 30 },
  { name: "Bond Repair Protocol", price: 30 },
  { name: "Anti hair loss protocol", price: 30 },
  { name: "Extension removal (wefts only)", price: 25 },
];

export const facials = [
  { name: "Glo2Facial Essential", price: 225, includes: "Exfoliation, oxygenation, and ultrasound." },
  {
    name: "Glo2Facial Advanced",
    price: 275,
    includes: "The Essential experience with added RF technology for firming.",
  },
];

export const massages = [
  { name: "Therapeutic massage", options: [{ minutes: 45, price: 85 }, { minutes: 60, price: 100 }, { minutes: 90, price: 150 }] },
  { name: "Prenatal massage", options: [{ minutes: 60, price: 100 }, { minutes: 90, price: 150 }] },
];

// ── LATHER WELLNESS ──────────────────────────────────────────

export const provider = {
  name: "Stacia Friend, CNM",
  role: "Certified Nurse Midwife",
  line: "Led by Stacia Friend, CNM, Certified Nurse Midwife.",
};

export const foundations = {
  name: "Foundations Visit",
  price: 175,
  lead: "Our signature starting point",
  description:
    "A comprehensive wellness consultation where we take the time to talk about symptoms, health, lifestyle and goals — then build an individualized plan for what comes next.",
};

/** The brochure's "Hormone support" list — what a Foundations Visit can lead into. */
export const hormoneSupport = [
  "Perimenopause",
  "Menopause",
  "Metabolic health & weight management",
  "Sexual wellness",
  "Postpartum wellness",
  "Peptide & longevity",
];

/** One line per wellness treatment, as the brochure sets them. */
export const wellnessSummary: { slug: string; name: string; short?: string; range: string; note: string }[] = [
  { slug: "laser-hair-removal", name: "Laser hair removal", range: "$125–700", note: "Per area, per session" },
  { slug: "secret-rf-pro", name: "Secret RF & Secret PRO", range: "$225–2,000", note: "Launch 3-session packages, $500–$4,000" },
  { slug: "injectables", name: "Injectables & vitamin injections", short: "Injectables & vitamins", range: "$11 / unit", note: "Xeomin® · B12, Lipo-B, L-Carnitine & Glutathione" },
  { slug: "body-contouring", name: "Body contouring & recovery", range: "$1,250", note: "truSculpt · truFlex, 6 for $1,800 · red light & body composition" },
];

// ── PRICE TABLES ─────────────────────────────────────────────
// The detailed lists behind the summary lines, rendered on each service page
// and on /menu.

export interface PriceItem {
  name: string;
  detail?: string;
  /** One price per column — a single price unless the group has `columns`. Empty: priced at the visit. */
  prices: number[];
  /** Printed after the price, e.g. "/ unit". */
  unit?: string;
}

export interface PriceGroup {
  key: "facials" | "massage" | "wellness-visits" | "laser" | "secret" | "injectables" | "body";
  pillar: "spa" | "wellness";
  heading: string;
  intro?: string;
  /** Column headings for groups priced more than one way (single, packs). */
  columns?: string[];
  items: PriceItem[];
  book: { url: string; label: string };
}

const spaBook = { url: BOOK_URL, label: "Book the spa" };
const wellnessBook = { url: WELLNESS_BOOK_URL, label: "Request a wellness visit" };

export const priceGroups: PriceGroup[] = [
  {
    key: "facials",
    pillar: "spa",
    heading: "Glo2Facial",
    items: facials.map((f) => ({ name: f.name, detail: f.includes, prices: [f.price] })),
    book: spaBook,
  },
  {
    key: "massage",
    pillar: "spa",
    heading: "Massage",
    items: massages.flatMap((m) =>
      m.options.map((o) => ({ name: m.name, detail: `${o.minutes} minutes`, prices: [o.price] })),
    ),
    book: spaBook,
  },
  {
    key: "wellness-visits",
    pillar: "wellness",
    heading: "Wellness visits",
    items: [
      { name: "Foundations Visit", detail: "Your starting point, with Stacia Friend, CNM", prices: [175] },
      { name: "Wellness follow-up", detail: "After your Foundations Visit", prices: [85] },
    ],
    book: wellnessBook,
  },
  {
    key: "laser",
    pillar: "wellness",
    heading: "Laser hair removal",
    intro: "Per area, per session.",
    items: [
      { name: "Upper lip", prices: [125] },
      { name: "Chin", prices: [125] },
      { name: "Lower face & neck", prices: [200] },
      { name: "Underarms", prices: [200] },
      { name: "Forearms", prices: [250] },
      { name: "Chest", prices: [275] },
      { name: "Lower back", prices: [250] },
      { name: "Full back", prices: [400] },
      { name: "Bikini line", prices: [175] },
      { name: "Extended bikini", prices: [250] },
      { name: "French bikini", prices: [300] },
      { name: "Full Brazilian", prices: [350] },
      { name: "Lower legs", prices: [350] },
      { name: "Upper legs", prices: [400] },
      { name: "Full legs", prices: [700] },
    ],
    book: wellnessBook,
  },
  {
    key: "secret",
    pillar: "wellness",
    heading: "Secret RF & Secret PRO",
    intro: "RF microneedling and CO₂ resurfacing. Launch pricing on three-session packages.",
    columns: ["Single", "3 sessions", "Launch"],
    items: [
      { name: "Secret RF — face", prices: [375, 900, 750] },
      { name: "Secret RF — face & neck", prices: [425, 1050, 900] },
      { name: "Secret RF — stretch marks", prices: [225, 600, 500] },
      { name: "Secret PRO — gentle CO₂", prices: [375, 900, 750] },
      { name: "Secret PRO — CO₂ resurfacing", prices: [1750, 4200, 3500] },
      { name: "Secret PRO — RF + CO₂", prices: [2000, 4800, 4000] },
    ],
    book: wellnessBook,
  },
  {
    key: "injectables",
    pillar: "wellness",
    heading: "Injectables & vitamin injections",
    items: [
      { name: "Xeomin®", detail: "Wrinkle relaxer", prices: [11], unit: "/ unit" },
      { name: "Wellness injection consultation", prices: [50] },
      { name: "B12", prices: [30] },
      { name: "Lipo-B", prices: [40] },
      { name: "L-Carnitine", prices: [40] },
      { name: "Glutathione", prices: [45] },
    ],
    book: wellnessBook,
  },
  {
    key: "body",
    pillar: "wellness",
    heading: "Body contouring & recovery",
    items: [
      { name: "truSculpt", detail: "Per treatment", prices: [1250] },
      { name: "truFlex", detail: "Six treatments", prices: [1800] },
      { name: "Body contouring consultation", prices: [50] },
      { name: "Red light therapy & body composition", detail: "Priced at your consultation", prices: [] },
    ],
    book: wellnessBook,
  },
];

export function priceGroup(key: PriceGroup["key"]) {
  return priceGroups.find((g) => g.key === key)!;
}

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

// ── THE FINDER ───────────────────────────────────────────────
// "I'm looking for …" on the homepage. Starts from the feeling, not the
// treatment name, and suggests one place to begin.

export const finder = [
  { want: "deep relaxation", suggest: "a head spa ritual", detail: "start with the Classic, 75 minutes.", href: "/spa/head-spa#classic-ritual" },
  { want: "glowing skin", suggest: "a Glo2Facial", detail: "the Essential is $225.", href: "/spa/facials" },
  { want: "tension relief", suggest: "a therapeutic massage", detail: "60 minutes is $100.", href: "/spa/massage" },
  { want: "hormone & energy support", suggest: "a Foundations Visit", detail: "time to talk with Stacia Friend, CNM.", href: "/wellness/foundations" },
  { want: "firmer, smoother skin", suggest: "Secret RF microneedling", detail: "from $225 a session.", href: "/wellness/secret-rf-pro" },
  { want: "smooth, hair-free skin", suggest: "laser hair removal", detail: "priced per area, from $125.", href: "/wellness/laser-hair-removal" },
  { want: "a gift for someone", suggest: "a Lather gift card", detail: "for any ritual or treatment.", href: "/gift-cards" },
];

// ── PILLARS ──────────────────────────────────────────────────
// The two practices in brief, for the Areas We Serve pages.

export interface Pillar {
  key: "spa" | "wellness";
  label: string;
  intro: string;
  href: "/spa" | "/wellness";
  bookUrl: string;
  items: { name: string; blurb: string; href: string }[];
}

export const pillars: Pillar[] = [
  {
    key: "spa",
    label: "Lather Spa",
    intro: "Head spa rituals, facials, and massage.",
    href: "/spa",
    bookUrl: BOOK_URL,
    items: [
      { name: "Head spa rituals", blurb: "Classic, Luxe, Gentleman’s Recharge, and a couples retreat. From $100.", href: "/spa/head-spa" },
      { name: "Glo2Facial", blurb: "Essential and Advanced. From $225.", href: "/spa/facials" },
      { name: "Massage", blurb: "Therapeutic and prenatal. From $85.", href: "/spa/massage" },
    ],
  },
  {
    key: "wellness",
    label: "Lather Wellness",
    intro: "Medical & aesthetic treatments, led by Stacia Friend, CNM.",
    href: "/wellness",
    bookUrl: WELLNESS_BOOK_URL,
    items: [
      { name: "Foundations Visit", blurb: "Our signature starting point. $175.", href: "/wellness/foundations" },
      ...wellnessSummary.map((t) => ({ name: t.name, blurb: `${t.note}. ${t.range}.`, href: `/wellness/${t.slug}` })),
    ],
  },
];
