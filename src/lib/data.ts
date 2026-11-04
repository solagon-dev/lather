// ── SERVICES ─────────────────────────────────────────────────
export const services = [
  {
    id: "luxe-ritual",
    name: "The Luxe Ritual",
    tagline: "Our most complete experience — scalp, hair, and skin",
    price: 175,
    duration: "90 min",
    durationMin: 90,
    tier: "premium" as const,
    description:
      "Designed for deeper relaxation. This luxurious service begins with a detoxifying scalp cleanse to remove buildup and impurities, followed by a gentle exfoliation to promote a healthy, balanced foundation. Enjoy an extended, tension-relieving massage, a deeply nourishing hair mask, and therapeutic steam infusion. A rejuvenating facial featuring a soothing rose petal jelly mask leaves your skin refreshed and radiant. Service is completed with a professional blowout, leaving your hair soft and beautifully styled.",
    note: "Includes blowout and rose petal facial.",
    highlights: [
      "Detoxifying scalp cleanse & exfoliation",
      "Extended tension-relieving massage",
      "Nourishing hair mask & steam infusion",
      "Rose petal jelly facial",
      "Professional blowout finish",
    ],
    bestFor: "Special occasions · Deep relaxation · Full restoration",
    bestForTags: ["Special occasions", "Deep relaxation", "Restorative", "Gift-worthy"],
    intensity: 4,
    luxuryLevel: 5,
    firstTimeFit: "possible" as const,
    recommendedAddOns: ["aromatherapy", "extended-massage"],
    suggestedUpgrade: null,
    suggestedUpgradeReason: null,
    image: "/media/treatments/nourish-fortify.webp",
    concerns: ["Dry scalp", "Stress", "Dull skin", "Special occasion prep"],
  },
  {
    id: "classic-ritual",
    name: "The Classic Ritual",
    tagline: "A complete reset for scalp, hair, and spirit",
    price: 125,
    duration: "75 min",
    durationMin: 75,
    tier: "foundation" as const,
    description:
      "This luxurious service features a detoxifying scalp cleanse, gentle exfoliation, and a tension-relieving massage to promote relaxation and circulation. A nourishing hair mask and therapeutic steam infusion deliver lasting hydration and shine. The service is finished with a blowdry, leaving your hair and scalp refreshed and revitalized. Suitable for all hair types.",
    note: "Includes blowdry.",
    highlights: [
      "Detoxifying scalp cleanse",
      "Gentle exfoliation",
      "Tension-relieving massage",
      "Nourishing hair mask & steam infusion",
      "Professional blowdry finish",
    ],
    bestFor: "All hair types · First-time guests",
    bestForTags: ["All hair types", "First-time guests", "Monthly maintenance"],
    intensity: 3,
    luxuryLevel: 4,
    firstTimeFit: "recommended" as const,
    recommendedAddOns: ["aromatherapy", "extended-massage"],
    suggestedUpgrade: "luxe-ritual",
    suggestedUpgradeReason: "Want the full experience? The Luxe Ritual adds an extended massage, rose petal facial, and professional blowout.",
    image: "/media/treatments/classic-ritual.webp",
    concerns: ["Product buildup", "General maintenance", "Oily scalp", "Stress"],
  },
  {
    id: "gentlemans-recharge",
    name: "Gentleman's Recharge",
    tagline: "Purpose-built restoration for men",
    price: 100,
    duration: "60 min",
    durationMin: 60,
    tier: "foundation" as const,
    description:
      "A restorative experience designed specifically for men. This service combines a deep cleanse, scalp massage, and revitalizing hair treatment to relieve tension and promote healthy hair and scalp. No fuss, no pretense — just focused, effective care in a quiet space.",
    note: null,
    highlights: [
      "Deep scalp cleanse",
      "Therapeutic scalp massage",
      "Revitalizing hair treatment",
    ],
    bestFor: "All hair types · Men",
    bestForTags: ["Men", "All hair types", "Tension relief", "Low maintenance"],
    intensity: 3,
    luxuryLevel: 3,
    firstTimeFit: "recommended" as const,
    recommendedAddOns: ["scalp-analysis", "extended-massage"],
    suggestedUpgrade: "classic-ritual",
    suggestedUpgradeReason: "Want more? The Classic Ritual extends the massage and adds a nourishing hair mask with steam infusion.",
    image: "/media/treatments/gentlemans-recharge.webp",
    concerns: ["Stress", "General maintenance", "Tension"],
  },
];

// ── ENHANCEMENTS ─────────────────────────────────────────────
// Head spa add-ons, exactly as the client's printed menu lists them.
export const addOns = [
  { id: "extended-massage", name: "Extended massage, 15 minutes", price: 30 },
  { id: "bond-repair", name: "Bond Repair Protocol", price: 30 },
  { id: "anti-hair-loss", name: "Anti hair loss protocol", price: 30 },
  { id: "extension-removal", name: "Extension removal (wefts only)", price: 25 },
];

// ── TREATMENT-SPECIFIC FAQs ──────────────────────────────────
export const treatmentFAQs: Record<string, { question: string; answer: string }[]> = {
  "luxe-ritual": [
    {
      question: "What makes The Luxe Ritual different from The Classic?",
      answer: "The Luxe Ritual builds on everything in The Classic — adding an extended massage, a rejuvenating rose petal jelly facial, and a professional blowout. It's our most comprehensive single-session experience, designed for guests who want the most complete treatment.",
    },
    {
      question: "What is the rose petal jelly mask?",
      answer: "A soothing, hydrating facial mask made with rose petal extract. It calms the skin, reduces redness, and leaves your face feeling refreshed and radiant. It's applied while the scalp treatment absorbs, so you're being cared for head to face simultaneously.",
    },
    {
      question: "Is The Luxe Ritual good for a first visit?",
      answer: "It can be a wonderful first experience if you want the most complete introduction to Lather. That said, many first-time guests start with The Classic Ritual and upgrade to The Luxe on their next visit once they know what to expect.",
    },
    {
      question: "Does the blowout work for all hair types?",
      answer: "Yes. Our stylists tailor the blowout to your hair texture, length, and desired look. Whether you want sleek and smooth, voluminous, or a soft natural finish, we'll work with you to get the result you want.",
    },
  ],
  "classic-ritual": [
    {
      question: "Is The Classic Ritual a good first treatment?",
      answer: "Absolutely — this is our most popular treatment and the one we recommend for first-time guests. It gives you the full head spa experience, so you can discover what your scalp responds to best.",
    },
    {
      question: "How is this different from a salon hair wash?",
      answer: "Night and day. A salon wash is functional — this is therapeutic. The Classic Ritual includes a dedicated scalp exfoliation, a full massage protocol, a targeted hair mask, and steam infusion. It's designed to treat the scalp, not just clean the hair.",
    },
    {
      question: "Does it include a blowdry?",
      answer: "Yes. The Classic Ritual now includes a professional blowdry, so you leave looking polished and feeling renewed.",
    },
    {
      question: "How often should I book The Classic Ritual?",
      answer: "For ongoing scalp health, once a month is ideal. Think of it like a facial — regular maintenance keeps your scalp balanced, clear, and healthy between visits.",
    },
  ],
  "gentlemans-recharge": [
    {
      question: "Is this just a head spa for men, or is it actually different?",
      answer: "Both. The core techniques are rooted in the same Japanese head spa tradition, but the protocol, pacing, products, and environment are calibrated for men. Shorter session, more focused pressure, no unnecessary frills. It's efficient, effective, and deeply relaxing.",
    },
    {
      question: "I've never been to a spa before. Will I feel comfortable?",
      answer: "This is designed for exactly that situation. There's no busy waiting room, no awkward small talk, no upselling. You arrive, recline, and let us work. Many of our male guests tell us it's the most relaxed they've felt in months.",
    },
    {
      question: "Can women book the Gentleman's Recharge?",
      answer: "The treatment is formulated and paced for men, but there's no exclusion. If you prefer a shorter, more streamlined session, you're welcome to book it. That said, most women prefer The Classic Ritual for the fuller experience.",
    },
    {
      question: "I'm experiencing hair thinning — should I upgrade?",
      answer: "The Classic Ritual or The Luxe Ritual both offer deeper scalp treatment protocols. If thinning is a primary concern, let us know when you book and we can tailor the treatment to focus on scalp stimulation and circulation.",
    },
  ],
};

// ── TREATMENT DETAILS (before/after, who it's for) ───────────
export const treatmentDetails: Record<string, {
  whoItsFor: string;
  beforeVisit: string[];
  afterCare: string[];
  whatToExpect: string[];
}> = {
  "luxe-ritual": {
    whoItsFor:
      "Anyone seeking the most complete, restorative experience Lather offers. Ideal for special occasions, milestone celebrations, or guests who simply want to be fully taken care of — scalp, hair, and skin.",
    beforeVisit: [
      "Arrive with your hair in its natural state if possible",
      "Come makeup-free or light — we'll be applying a facial mask",
      "Wear comfortable clothing — you'll be reclining for the full session",
      "Plan to arrive 5 minutes early to settle in",
    ],
    afterCare: [
      "Your blowout will last 2–3 days with proper care",
      "Avoid washing your hair for 24 hours to extend the treatment benefits",
      "Your skin may glow for days — the rose petal mask continues to hydrate",
      "Monthly visits are recommended for ongoing results",
    ],
    whatToExpect: [
      "A thorough scalp consultation to assess your needs",
      "A detoxifying scalp cleanse and gentle exfoliation",
      "An extended tension-relieving scalp and neck massage",
      "A deeply nourishing hair mask sealed with therapeutic steam",
      "A rejuvenating rose petal jelly facial while the treatment absorbs",
      "A professional blowout — you leave looking and feeling your absolute best",
    ],
  },
  "classic-ritual": {
    whoItsFor:
      "Anyone seeking a full scalp reset — from first-time head spa guests to regulars maintaining their scalp health. This is our most popular treatment and the perfect introduction to the Lather experience.",
    beforeVisit: [
      "Arrive with your hair in its natural, unwashed state if possible",
      "Avoid heavy oils or styling products on the day of your visit",
      "Wear comfortable clothing — you'll be reclining",
      "Plan to arrive 5 minutes early to settle in",
    ],
    afterCare: [
      "Allow the treatment to continue working — avoid washing for 24 hours if possible",
      "Drink plenty of water to support the detoxification process",
      "You may notice increased shine and softness immediately",
      "Monthly visits are recommended for optimal scalp maintenance",
    ],
    whatToExpect: [
      "A brief scalp consultation to assess your current condition and goals",
      "A warm, therapeutic double cleanse to remove buildup and impurities",
      "Gentle scalp exfoliation using professional-grade organic products",
      "A slow, intentional scalp and neck massage to release tension and improve circulation",
      "A nourishing hair mask sealed with steam for deep absorption",
      "A professional blowdry — you leave polished, refreshed, and renewed",
    ],
  },
  "gentlemans-recharge": {
    whoItsFor:
      "Men of all ages and hair types seeking scalp maintenance, tension relief, and a genuinely relaxing grooming experience. No prior head spa experience necessary — this treatment is designed to be accessible, focused, and deeply effective.",
    beforeVisit: [
      "No special preparation needed — just come as you are",
      "You don't need to wash your hair beforehand",
      "This is a quiet, individual experience — no busy waiting room",
      "Sessions are 60 minutes and always on time",
    ],
    afterCare: [
      "Scalp will feel refreshed and light — enjoy it",
      "Many guests report improved sleep the night of their treatment",
      "Monthly sessions keep the scalp healthy and balanced",
      "Results are cumulative — the more consistent, the better",
    ],
    whatToExpect: [
      "A brief, no-pressure scalp consultation",
      "A thorough deep cleanse to remove daily buildup and environmental residue",
      "A focused scalp massage — firm, intentional pressure to dissolve tension",
      "Application of a lightweight revitalizing treatment for scalp and hair",
      "A clean finish — you'll leave looking sharp and feeling completely recharged",
    ],
  },
};

// ── TESTIMONIALS ─────────────────────────────────────────────
// Real 5-star guest reviews from Lather's Vagaro profile.
export const testimonials = [
  {
    quote:
      "I was completely delighted. My first time experience exceeded my expectations. I wouldn't change a thing.",
    name: "Carolyn J.",
    location: "Verified Vagaro review",
    service: "First visit",
  },
  {
    quote:
      "For a girl who loves having her hair played with and having it styled, this was the perfect afternoon. From beginning to end the entire experience was completely relaxing — I can't wait to book again!",
    name: "Courtney B.",
    location: "Verified Vagaro review",
    service: "Head Spa Ritual",
  },
];

// ── FAQs ─────────────────────────────────────────────────────
// Answered on /visit. Facts follow the brochure and the two Vagaro profiles.
export const faqs = [
  {
    question: "What is the difference between Lather Spa and Lather Wellness?",
    answer:
      "They are two practices under one roof. Lather Spa offers head spa rituals, Glo2Facials, and massage. Lather Wellness provides personalized medical and wellness care, led by Stacia Friend, CNM, Certified Nurse Midwife. Each keeps its own calendar, so each books separately.",
  },
  {
    question: "How do I book?",
    answer:
      "Spa appointments book instantly online through Vagaro: choose a time and it's confirmed. Wellness visits are requested online and the practice confirms the time with you. You can also call (252) 531-0987.",
  },
  {
    question: "Where should I start with Lather Wellness?",
    answer:
      "With a Foundations Visit ($175), our signature starting point. It is a comprehensive wellness consultation where we take the time to talk about symptoms, health, lifestyle and goals, then build an individualized plan for what comes next. You don't need to know what you need before you come in.",
  },
  {
    question: "What happens during a head spa ritual?",
    answer:
      "A scalp cleanse and exfoliation, a long massage, a nourishing mask and steam, finished with a blowdry. The Luxe Ritual adds an extended massage, a rose petal jelly facial, and a blowout. Rituals run 60 to 90 minutes.",
  },
  {
    question: "Do you offer prenatal massage?",
    answer:
      "Yes — prenatal massage in 60 or 90 minutes, $100 or $150.",
  },
  {
    question: "Is Lather only for women?",
    answer:
      "No. Lather Spa welcomes everyone, and the Gentleman's Recharge was made for men. Lather Wellness focuses on women's health, from perimenopause and menopause to postpartum wellness.",
  },
  {
    question: "Where do I park?",
    answer:
      "Lather is at 101 Fox Haven Drive, Greenville, NC 27858, with free parking at the door. Arrive a few minutes early to settle in.",
  },
  {
    question: "Can I buy a gift card?",
    answer:
      "Yes. Gift cards are sold online through Vagaro, or call us and we will help.",
  },
];

// ── HEAD-SPA FAQs ────────────────────────────────────────────
// Specific to the Head Spa service line — used on /what-is-a-head-spa.
export const headSpaFaqs = [
  {
    question: "What is a head spa?",
    answer:
      "A head spa is a therapeutic treatment focused on scalp health and hair wellness. Rooted in Japanese tradition, it combines deep cleansing, gentle exfoliation, scalp massage, and targeted treatments to purify, stimulate, and nourish the scalp. Unlike a traditional hair wash, a head spa is a complete sensory ritual with measurable scalp-care results — one of the signature spa experiences at Lather.",
  },
  {
    question: "How long does a head spa session last?",
    answer:
      "Head spa sessions range from 60 to 90 minutes depending on the ritual you choose. The Gentleman's Recharge is 60 minutes, The Classic Ritual is 75 minutes, and The Luxe Ritual is a full 90-minute experience. All sessions are by appointment and reserved exclusively for you.",
  },
  {
    question: "How should I prepare for my head spa appointment?",
    answer:
      "Arrive with your hair in its natural, unwashed state if possible — no need to pre-shampoo. Avoid heavy oils or styling products on the scalp the day before. Come ready to relax, wear comfortable clothing, and give yourself some quiet time afterward to enjoy the renewed feeling.",
  },
  {
    question: "Are your head spa treatments suitable for all hair types?",
    answer:
      "Yes. Every ritual is thoughtfully formulated for a wide range of hair types and scalp conditions — from fine and oily to thick and dry. During the consultation at the start of each session, we assess your scalp and customize the protocol to match your specific needs.",
  },
  {
    question: "Do the head spa treatments include a blowdry?",
    answer:
      "The Classic Ritual includes a professional blowdry finish, and The Luxe Ritual includes a full professional blowout. The Gentleman's Recharge includes a clean finish appropriate for men's styling.",
  },
  {
    question: "How often should I come in for a head spa?",
    answer:
      "For general scalp maintenance and wellbeing, once a month is ideal. If you're addressing a specific concern — such as dryness, buildup, or stress-related tension — we may recommend more frequent visits initially. We'll discuss a personalized cadence during your first visit.",
  },
];

// ── BRAND VALUES ─────────────────────────────────────────────
export const brandValues = [
  {
    title: "Intentional Care",
    body: "Every treatment, product, and moment is chosen with purpose — personalized to you, never fit to a template.",
  },
  {
    title: "Results & Restoration",
    body: "Advanced, effective care delivered in a space built for genuine relaxation. You never have to choose between the two.",
  },
  {
    title: "Quiet Luxury",
    body: "No noise, no pressure, no rush. Lather is an unhurried space where your well-being is the only priority.",
  },
];
