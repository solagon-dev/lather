// ── LATHER WELLNESS TREATMENTS ───────────────────────────────
// Each discrete, priced treatment gets a page at /wellness/<slug>. The
// Foundations Visit has its own page at /wellness/foundations.
//
// Copy is drawn from the brochure, the practice's own Vagaro descriptions and
// the client's price list. It describes what each treatment is; it does not
// promise outcomes. Keep it that way — this is medical care, and results
// claims need the practice's sign-off.

import type { PriceGroup } from "@/lib/menu";

export interface Treatment {
  slug: string;
  name: string;
  /** The brochure's summary line. */
  summary: string;
  description: string;
  image: { src: string; alt: string; focal?: string };
  caption: string;
  intro: string[];
  facts: string[];
  prices: PriceGroup["key"];
}

export const treatments: Treatment[] = [
  {
    slug: "laser-hair-removal",
    name: "Laser hair removal",
    summary: "$125–$700 per area, per session.",
    description:
      "Laser hair removal at Lather Wellness in Greenville, NC — priced per area, per session, from upper lip to full legs.",
    image: { src: "/media/editorial/value-prop.webp", alt: "A treatment room at Lather Wellness", focal: "50% 40%" },
    caption: "A treatment room at Lather Wellness",
    intro: [
      "Laser hair removal targets hair at the follicle to reduce regrowth over a series of sessions. Every area is priced per session, from a single upper-lip treatment to full legs.",
      "Hair grows in cycles, so results build across a series spaced several weeks apart. Your first visit covers your skin, your hair, the areas you want treated, and how many sessions to plan for.",
    ],
    facts: [
      "Priced per area, per session",
      "Treated as a series — your provider sets the number and spacing",
      "Prep and aftercare instructions come with your consultation",
    ],
    prices: "laser",
  },
  {
    slug: "secret-rf-pro",
    name: "Secret RF & Secret PRO",
    summary: "Secret RF $225–$425 per session. Secret PRO $375–$2,000. Launch 3-session packages, $500–$4,000.",
    description:
      "Secret RF microneedling and Secret PRO CO₂ resurfacing at Lather Wellness in Greenville, NC — single sessions and three-session packages at launch pricing.",
    image: { src: "/media/gallery/interior-crystal-lamp.webp", alt: "Crystal lamp detail at Lather Wellness" },
    caption: "The treatment room, Fox Haven Drive",
    intro: [
      "Secret RF is fractional radiofrequency microneedling: fine needles deliver RF energy beneath the surface of the skin, and it is used for texture, tone, firmness, and stretch marks.",
      "Secret PRO adds fractional CO₂ laser resurfacing — from a gentle CO₂ treatment to full resurfacing, or RF and CO₂ together in one session. Which treatment fits, and how many sessions, is decided at your consultation.",
    ],
    facts: [
      "Single sessions or three-session packages",
      "Launch pricing on every three-session package",
      "Downtime differs by treatment — your provider walks you through it before you book",
    ],
    prices: "secret",
  },
  {
    slug: "injectables",
    name: "Injectables & vitamin injections",
    summary: "Xeomin® $11 per unit. B12, Lipo-B, L-Carnitine & Glutathione.",
    description:
      "Xeomin® at $11 per unit, and B12, Lipo-B, L-Carnitine and Glutathione injections, at Lather Wellness in Greenville, NC.",
    image: { src: "/media/gallery/interior-diffuser.webp", alt: "A quiet detail in the Lather treatment room" },
    caption: "A quiet corner of the treatment room",
    intro: [
      "Xeomin® is an FDA-approved wrinkle relaxer used to temporarily soften expression lines caused by repeated facial movement. Each treatment is planned around your facial anatomy, movement, and goals, and priced by the unit.",
      "Vitamin injections — B12, Lipo-B, L-Carnitine, and Glutathione — begin with a short consultation to decide what makes sense for you.",
    ],
    facts: [
      "Xeomin® is $11 per unit",
      "Vitamin injections from $30",
      "A consultation comes first, so every plan is your own",
    ],
    prices: "injectables",
  },
  {
    slug: "body-contouring",
    name: "Body contouring & recovery",
    summary: "truSculpt $1,250 per treatment. truFlex $1,800 for 6 treatments. Red light therapy & body composition.",
    description:
      "truSculpt body contouring, truFlex muscle conditioning, red light therapy and body composition at Lather Wellness in Greenville, NC.",
    image: { src: "/media/gallery/interior-reception-detail.webp", alt: "Reception at Lather Spa & Wellness" },
    caption: "Reception, Fox Haven Drive",
    intro: [
      "truSculpt uses radiofrequency energy to target stubborn fat, and truFlex uses electrical muscle stimulation to build and tone muscle. They can be used on their own or together, alongside red light therapy and body composition tracking.",
      "Everything starts with a consultation: your goals, the areas you want to change, which treatment is the right fit, and what to expect from it.",
    ],
    facts: [
      "Consultation first — $50",
      "truSculpt, truFlex, or a combination",
      "A personal plan before you commit",
    ],
    prices: "body",
  },
];

export function getTreatment(slug: string) {
  return treatments.find((t) => t.slug === slug);
}
