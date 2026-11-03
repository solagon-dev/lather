// ── LATHER WELLNESS ──────────────────────────────────────────
// The medical practice's two kinds of offering. Care areas are what a
// Foundations visit can lead into — they are conversations with Stacia, not
// menu items, so they live on the hub. Treatments are discrete, priced
// procedures, and each gets its own page under /wellness/<slug>.
//
// Copy here is drawn from the practice's own Vagaro descriptions, the
// sneak-peek menu and the client's price list. It describes what each
// treatment is; it does not promise outcomes. Keep it that way — this is
// medical care, and results claims need the practice's sign-off.

import type { PriceGroup } from "@/lib/menu";

export interface CareArea {
  name: string;
  blurb: string;
}

export const careAreas: CareArea[] = [
  {
    name: "Hormone + Midlife",
    blurb: "Perimenopause, menopause, and hormone care.",
  },
  {
    name: "Metabolic + Body",
    blurb:
      "Medical weight management, GLP-1 therapy when appropriate, body composition, and muscle-focused wellness.",
  },
  {
    name: "Sexual Wellness",
    blurb: "Private, personalized care for women's intimate wellness.",
  },
  {
    name: "Postpartum + Mom",
    blurb: "Support through the physical and hormonal changes of motherhood.",
  },
  {
    name: "Peptides + Longevity",
    blurb: "Individualized therapies for wellness, recovery, and healthy aging, when medically appropriate.",
  },
];

export interface Treatment {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: { src: string; alt: string; focal?: string };
  intro: string[];
  facts: string[];
  /** Price list shown on the page: a whole group, or named items picked from one. */
  prices: { group: PriceGroup["key"]; only?: string[]; heading?: string };
  /** A line for anything on the page that has no published price. */
  priceNote?: string;
}

export const treatments: Treatment[] = [
  {
    slug: "laser-hair-removal",
    name: "Laser Hair Removal",
    tagline: "Lasting hair reduction for face and body, priced by area.",
    description:
      "Laser hair removal at Lather Wellness in Greenville, NC — priced per area, from upper lip to full legs, with a consultation to plan your sessions.",
    image: { src: "/media/editorial/value-prop.webp", alt: "A treatment room at Lather Wellness", focal: "50% 40%" },
    intro: [
      "Laser hair removal targets hair at the follicle to reduce regrowth over a series of sessions. Every area on the menu is priced per session, from a single upper-lip treatment to full legs.",
      "Hair grows in cycles, so results build across a series spaced several weeks apart. Your first visit covers your skin, your hair, the areas you want treated, and how many sessions to plan for.",
    ],
    facts: [
      "Priced per area, per session",
      "Treated as a series — your provider sets the number and spacing",
      "Prep and aftercare instructions come with your consultation",
    ],
    prices: { group: "laser" },
  },
  {
    slug: "secret-rf-pro",
    name: "Secret RF & Secret PRO",
    tagline: "RF microneedling and CO₂ resurfacing, with launch pricing on packages.",
    description:
      "Secret RF microneedling and Secret PRO CO₂ resurfacing at Lather Wellness in Greenville, NC — single sessions and three-session packages at launch pricing.",
    image: { src: "/media/gallery/interior-crystal-lamp.webp", alt: "Crystal lamp detail at Lather Wellness" },
    intro: [
      "Secret RF is fractional radiofrequency microneedling: fine needles deliver RF energy beneath the surface of the skin, and it is used for texture, tone, firmness, and stretch marks.",
      "Secret PRO adds fractional CO₂ laser resurfacing — from a gentle CO₂ treatment to full resurfacing, or RF and CO₂ together in one combined session. Which treatment fits, and how many sessions, is decided at your consultation.",
    ],
    facts: [
      "Single sessions or three-session packages",
      "Launch pricing on every three-pack",
      "Downtime differs by treatment — your provider walks you through it before you book",
    ],
    prices: { group: "secret" },
  },
  {
    slug: "injectables",
    name: "Injectables & Vitamin Injections",
    tagline: "Xeomin® for expression lines, and B12, Lipo-B, L-Carnitine, and Glutathione.",
    description:
      "Xeomin wrinkle relaxer and vitamin injections — B12, Lipo-B, L-Carnitine, Glutathione — at Lather Wellness in Greenville, NC.",
    image: { src: "/media/gallery/interior-diffuser.webp", alt: "A quiet detail in the Lather treatment room" },
    intro: [
      "Xeomin® is an FDA-approved wrinkle relaxer used to temporarily soften expression lines caused by repeated facial movement. Each treatment is planned around your facial anatomy, movement, and goals, for a natural, refreshed look.",
      "Vitamin injections — B12, Lipo-B, L-Carnitine, and Glutathione — begin with a short consultation to decide what makes sense for you.",
    ],
    facts: [
      "Xeomin is priced per treatment at your visit",
      "Vitamin injections from $30",
      "A consultation comes first, so every plan is your own",
    ],
    prices: {
      group: "wellness-visits",
      heading: "Vitamin injections",
      only: [
        "Wellness Injection Consultation",
        "B12 Injection",
        "Lipo-B Injection",
        "L-Carnitine Injection",
        "Glutathione Injection",
      ],
    },
    priceNote: "Xeomin® is priced per treatment and quoted at your visit.",
  },
  {
    slug: "body-contouring",
    name: "Body Contouring",
    tagline: "truSculpt and truFlex, planned around your goals.",
    description:
      "truSculpt body contouring and truFlex muscle conditioning at Lather Wellness in Greenville, NC. Start with a $50 consultation.",
    image: { src: "/media/gallery/interior-reception-detail.webp", alt: "Reception at Lather Spa & Wellness" },
    intro: [
      "truSculpt uses radiofrequency energy to target stubborn fat, and truFlex uses electrical muscle stimulation to build and tone muscle. They can be used on their own or together.",
      "Everything starts with a consultation: your goals, the areas you want to change, which treatment is the right fit, and what to expect from it.",
    ],
    facts: [
      "Consultation first — $50",
      "truSculpt, truFlex, or a combination",
      "A personal plan with expected outcomes before you commit",
    ],
    prices: { group: "wellness-visits", heading: "Consultation", only: ["Body Contouring Consultation"] },
  },
];

export function getTreatment(slug: string) {
  return treatments.find((t) => t.slug === slug);
}
