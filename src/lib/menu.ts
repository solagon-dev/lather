// ── SERVICE MENU (STRUCTURE) ─────────────────────────────────
// Two pillars — Spa and Wellness — per the brand blueprint. Each books on its
// own Vagaro profile (see business.ts). Head spa is retained as a Spa service
// line (its ritual pages still live under /services and /experience).

import { BOOK_URL, WELLNESS_BOOK_URL } from "@/lib/business";

export interface MenuItem {
  name: string;
  blurb: string;
  href?: string; // internal link when a dedicated page already exists
}

export interface Pillar {
  key: "spa" | "wellness";
  label: string;
  tagline: string;
  intro: string;
  image: string;
  /**
   * object-position for the card image. These photos are tall portraits shown
   * in landscape crops (16:10 / 4:3); a plain center crop decapitates standing
   * subjects, so bias the focal point per image. Defaults to center.
   */
  imagePosition?: string;
  items: MenuItem[];
  /** Where this pillar books — the spa and the wellness practice are separate Vagaro profiles. */
  bookUrl: string;
  /**
   * The pillar is announced but not yet open for booking — the surfaces that
   * list it say so rather than offering a booking that cannot yet be honoured.
   * Lather Wellness launched this way; it is now open and the flag is off.
   */
  comingSoon?: boolean;
  /** A short line shown with the pillar's status, e.g. under a "coming soon". */
  comingSoonNote?: string;
}

export const pillars: Pillar[] = [
  {
    key: "spa",
    label: "Spa Experiences",
    tagline: "Restore",
    intro:
      "Restorative treatments in a quiet, considered space — care for the scalp, skin, and body that leaves you feeling genuinely better than when you arrived.",
    image: "/media/experience/step-03-massage.webp",
    imagePosition: "50% 35%",
    bookUrl: BOOK_URL,
    items: [
      {
        name: "Head Spa",
        blurb:
          "Our signature Japanese-inspired scalp ritual — cleanse, exfoliation, extended massage, and targeted treatment.",
        href: "/experience",
      },
      {
        name: "Facials",
        blurb:
          "Glo2Facial Essential and Advanced — exfoliation, oxygenation, and ultrasound, with RF technology in the Advanced for firming.",
      },
      {
        name: "Massage",
        blurb:
          "Therapeutic massage in 45, 60, or 90 minutes, and prenatal massage for expecting mothers.",
      },
    ],
  },
  {
    key: "wellness",
    label: "Wellness Services",
    tagline: "Renew",
    // Lather Wellness is women's wellness, led by Stacia Friend, CNM — a place
    // with time to talk, where symptoms are not dismissed and care is not
    // one-size-fits-all. The menu below follows the sneak peek, corrected to
    // what the practice actually books on Vagaro.
    intro:
      "Women's wellness, reimagined — led by Stacia Friend, CNM. A place where you have time to talk, where your symptoms aren't dismissed, and where your care is never one-size-fits-all.",
    // A provider-and-client consultation — the image that actually reads
    // "wellness care," and visually distinct from the hands-on Spa photo above.
    image: "/media/experience/step-01-consultation.webp",
    imagePosition: "50% 28%",
    bookUrl: WELLNESS_BOOK_URL,
    // From the Lather Wellness sneak-peek menu. Foundations Wellness
    // leads because it is the entry point every plan is built from — the visit
    // where we listen first and prescribe second.
    items: [
      {
        name: "Foundations Wellness",
        blurb:
          "Your personalized starting point — an unhurried visit to hear your symptoms, your story, and your goals, then build a plan that's yours.",
      },
      {
        name: "Hormone + Midlife Wellness",
        blurb: "Perimenopause, menopause, and hormone care.",
      },
      {
        name: "Metabolic + Body Wellness",
        blurb:
          "Medical weight management, GLP-1 therapy when appropriate, body composition, and muscle-focused wellness.",
      },
      {
        name: "Sexual Wellness",
        blurb: "Private, personalized care for women's intimate wellness.",
      },
      {
        name: "Postpartum + Mom Wellness",
        blurb:
          "Support for women through the physical and hormonal changes of motherhood.",
      },
      {
        name: "Peptide + Longevity Wellness",
        blurb:
          "Individualized therapies for wellness, recovery, and healthy aging, when medically appropriate.",
      },
      {
        name: "Vitamin + Wellness Injections",
        blurb: "B12, Lipo-B, L-Carnitine, and Glutathione.",
      },
      {
        name: "Body + Recovery",
        blurb:
          "truSculpt body contouring, truFlex muscle conditioning, red light therapy, and body composition.",
      },
      {
        name: "Laser Hair Removal",
        blurb: "Lasting hair reduction for face and body, priced by area.",
      },
      {
        name: "Secret RF + Secret PRO",
        blurb:
          "RF microneedling and CO₂ resurfacing for texture, tone, firmness, and stretch marks.",
      },
      {
        // The practice uses Xeomin, not Botox — "Botox" is both inaccurate and
        // someone else's trademark.
        name: "Injectables + Aesthetics",
        blurb: "Xeomin® wrinkle relaxer and natural-looking aesthetic treatments, with a thoughtful approach.",
      },
    ],
  },
];

// Featured provider highlighted on the homepage and wellness pillar.
export const featuredProvider = {
  name: "Stacia Friend, CNM",
  role: "Certified Nurse Midwife",
  service: "Foundations Wellness Visit",
  price: 175,
  // From the Lather Wellness sneak peek — "It starts with you." You don't have
  // to know which hormone, lab, or treatment you need before you walk in; the
  // Foundations visit exists to listen first and build the plan from there.
  blurb:
    "You don't have to know which hormone, lab, or treatment you need before you walk in. The Foundations Wellness Visit is time to listen — to your symptoms, your story, and your goals — and to build a plan that's yours.",
};

export const whyLather = [
  {
    title: "Results without the trade-off",
    body: "Advanced, effective treatments delivered in a space built for genuine relaxation — you never have to choose between results and rest.",
  },
  {
    title: "Whole-body wellness",
    body: "Skin, body, and long-term well-being, considered together. Care that looks past a single visit toward how you feel over time.",
  },
  {
    title: "Personalized care",
    body: "Every plan begins with you. We tailor treatments to your goals rather than fitting you to a menu.",
  },
  {
    title: "A luxury environment",
    body: "A calm, elegant, modern space — high-end and welcoming, never clinical and never rushed.",
  },
  {
    title: "Licensed providers",
    body: "Estheticians, cosmetologists, massage therapists, and nurse injectors you can trust with your care.",
  },
];

// ── PRICE LIST (BEYOND THE HEAD SPA RITUALS) ─────────────────
// The three rituals carry their own pages and live in data.ts; everything else
// on the menu is listed here for /book. From the client's own menu, 2026-11-02.
// Laser and Secret RF/PRO are not on either Vagaro profile yet, so their
// groups send people to request a visit with the wellness practice.

export interface PriceItem {
  name: string;
  detail?: string;
  /** One price per column — a single price unless the group has `columns`. */
  prices: number[];
}

export interface PriceGroup {
  heading: string;
  intro?: string;
  /** Column headings for groups priced more than one way (single, packs). */
  columns?: string[];
  items: PriceItem[];
  /** Shown after the group; groups that share a booking door can leave it to the last one. */
  book?: { url: string; label: string };
}

/** The one head-spa booking without a page of its own. Listed with the rituals on /book. */
export const couplesRetreat = {
  name: "Couples Head Spa Retreat",
  tagline: "Side by side, for two — scalp treatment, cleanse, hydration, and massage",
  price: 250,
};

export const priceGroups: PriceGroup[] = [
  {
    heading: "Facials",
    items: [
      { name: "Glo2Facial Essential", detail: "Exfoliation, oxygenation, and ultrasound", prices: [225] },
      { name: "Glo2Facial Advanced", detail: "Adds RF technology for firming", prices: [275] },
    ],
  },
  {
    heading: "Massage",
    items: [
      { name: "Therapeutic Massage", detail: "45 minutes", prices: [85] },
      { name: "Therapeutic Massage", detail: "60 minutes", prices: [100] },
      { name: "Therapeutic Massage", detail: "90 minutes", prices: [150] },
      { name: "Prenatal Massage", detail: "60 minutes", prices: [100] },
      { name: "Prenatal Massage", detail: "90 minutes", prices: [150] },
    ],
    book: { url: BOOK_URL, label: "Book the Spa" },
  },
  {
    heading: "Wellness visits",
    items: [
      { name: "Foundations Visit", detail: "Your starting point, with Stacia Friend, CNM", prices: [175] },
      { name: "Wellness Follow-Up", detail: "After your Foundations visit", prices: [85] },
      { name: "Body Contouring Consultation", detail: "truSculpt and truFlex", prices: [50] },
      { name: "Wellness Injection Consultation", prices: [50] },
      { name: "B12 Injection", prices: [30] },
      { name: "Lipo-B Injection", prices: [40] },
      { name: "L-Carnitine Injection", prices: [40] },
      { name: "Glutathione Injection", prices: [45] },
    ],
  },
  {
    heading: "Laser hair removal",
    intro: "Priced per area, per session.",
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
  },
  {
    heading: "Secret RF & Secret PRO",
    intro: "RF microneedling and CO₂ resurfacing. Launch pricing on three-session packages.",
    columns: ["Single", "3-pack", "Launch 3-pack"],
    items: [
      { name: "Secret RF — Face", prices: [375, 900, 750] },
      { name: "Secret RF — Face & Neck", prices: [425, 1050, 900] },
      { name: "Secret RF — Stretch Marks", prices: [225, 600, 500] },
      { name: "Secret PRO — Gentle CO₂", prices: [375, 900, 750] },
      { name: "Secret PRO — CO₂ Resurfacing", prices: [1750, 4200, 3500] },
      { name: "Secret PRO — RF + CO₂ Combo", prices: [2000, 4800, 4000] },
    ],
    book: { url: WELLNESS_BOOK_URL, label: "Request a Wellness Visit" },
  },
];
