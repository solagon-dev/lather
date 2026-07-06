// ── SERVICE MENU (STRUCTURE) ─────────────────────────────────
// Two pillars — Spa and Wellness — per the brand blueprint. The final menu
// and pricing are pending, so services are listed by name and intent only.
// Head spa is retained as a Spa service line (its ritual pages still live
// under /services and /experience).

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
  items: MenuItem[];
}

export const pillars: Pillar[] = [
  {
    key: "spa",
    label: "Spa Experiences",
    tagline: "Restore",
    intro:
      "Restorative treatments in a quiet, considered space — care for the scalp, skin, and body that leaves you feeling genuinely better than when you arrived.",
    image: "/media/experience/step-03-massage.webp",
    items: [
      {
        name: "Head Spa",
        blurb:
          "Our signature Japanese-inspired scalp ritual — cleanse, exfoliation, extended massage, and targeted treatment.",
        href: "/experience",
      },
      {
        name: "Facials",
        blurb: "Personalized facials that clarify, hydrate, and renew the skin.",
      },
      {
        name: "Massage",
        blurb: "Therapeutic massage to release held tension and restore the body.",
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
    intro:
      "Advanced, personalized care led by licensed providers — a whole-body approach to feeling well, delivered in a setting that never feels clinical.",
    image: "/media/scalp-concerns/concerns-hero.webp",
    items: [
      {
        name: "Wellness Consultations",
        blurb: "A one-on-one assessment to build a wellness plan around your goals.",
      },
      {
        name: "Hormone Therapy",
        blurb: "Personalized hormone support for balance, energy, and vitality.",
      },
      {
        name: "Peptides",
        blurb: "Targeted peptide therapy to support recovery and whole-body wellness.",
      },
      {
        name: "Injectables",
        blurb: "Administered by licensed nurse injectors and tailored to you.",
      },
      {
        name: "Vitamin Therapy",
        blurb: "Vitamin and nutrient support to help you feel your best.",
      },
    ],
  },
];

// Featured provider highlighted on the homepage and wellness pillar.
export const featuredProvider = {
  name: "Stacia Friend, CNM",
  role: "Certified Nurse Midwife",
  service: "Wellness Consultation",
  blurb:
    "Start with a personalized wellness consultation. Stacia brings a whole-person, preventative approach to help you understand your body and build a plan that fits your life.",
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
