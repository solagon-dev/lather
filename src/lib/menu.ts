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
        blurb: "Therapeutic massage in 45, 60, or 90 minutes to release held tension and restore the body.",
      },
      {
        name: "Skin Treatments",
        blurb: "Advanced, results-driven treatments tailored to your skin goals.",
      },
      {
        name: "Brows",
        blurb: "Shaping and tinting for a clean, natural finish.",
      },
      {
        name: "Red Light Therapy",
        blurb: "Non-invasive light therapy to support skin health and recovery.",
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
// The four rituals carry their own pages and live in data.ts; everything else
// bookable online is listed here for /book. Copied from the two Vagaro
// profiles on 2026-11-02 — Vagaro is the source of truth, so re-check it there
// when prices change rather than editing these from memory.

export interface PriceItem {
  name: string;
  price: number;
  detail?: string;
}

export interface PriceGroup {
  heading: string;
  /** Which business the group books with. */
  bookUrl: string;
  bookLabel: string;
  items: PriceItem[];
}

export const priceGroups: PriceGroup[] = [
  {
    heading: "More from the spa",
    bookUrl: BOOK_URL,
    bookLabel: "Book the Spa",
    items: [
      { name: "Couples Head Spa Retreat", price: 250, detail: "Side by side, for two" },
      { name: "Glo2Facial Essential", price: 225, detail: "Exfoliation, oxygenation, ultrasound" },
      { name: "Glo2Facial Advanced", price: 275, detail: "Adds RF technology for firming" },
      { name: "Therapeutic Massage", price: 85, detail: "45 minutes" },
      { name: "Therapeutic Massage", price: 100, detail: "60 minutes" },
      { name: "Therapeutic Massage", price: 150, detail: "90 minutes" },
    ],
  },
  {
    heading: "Lather Wellness",
    bookUrl: WELLNESS_BOOK_URL,
    bookLabel: "Request a Visit",
    items: [
      { name: "Foundations Visit", price: 175, detail: "Your starting point, with Stacia Friend, CNM" },
      { name: "Wellness Follow-Up", price: 85, detail: "After your Foundations visit" },
      { name: "Body Contouring Consultation", price: 50, detail: "truSculpt and truFlex" },
      { name: "Wellness Injection Consultation", price: 50 },
      { name: "B12 Injection", price: 30 },
      { name: "Lipo-B Injection", price: 40 },
      { name: "L-Carnitine Injection", price: 40 },
      { name: "Glutathione Injection", price: 45 },
    ],
  },
];
