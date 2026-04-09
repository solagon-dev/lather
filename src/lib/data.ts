// ── SERVICES ─────────────────────────────────────────────────
export const services = [
  {
    id: "classic-ritual",
    name: "The Classic Ritual",
    tagline: "A complete reset for scalp and spirit",
    price: 125,
    duration: "75 min",
    durationMin: 75,
    tier: "foundation" as const,
    description:
      "Experience our signature treatment designed to purify, replenish, and restore balance to the scalp and hair. This luxurious service features a detoxifying scalp cleanse, gentle exfoliation, and a tension-relieving massage to promote relaxation and circulation. A nourishing hair mask and therapeutic steam infusion deliver lasting hydration and shine, leaving hair refreshed and revitalized. Ideal for first-time guests or anyone seeking a complete reset — suitable for all hair types.",
    note: "Does not include blowdry service.",
    highlights: [
      "Detoxifying scalp cleanse",
      "Gentle exfoliation",
      "Tension-relieving massage",
      "Nourishing hair mask",
      "Therapeutic steam infusion",
    ],
    bestFor: "All hair types · First-time guests",
    bestForTags: ["All hair types", "First-time guests", "Monthly maintenance"],
    intensity: 3,
    luxuryLevel: 4,
    firstTimeFit: "recommended" as const,
    recommendedAddOns: ["aromatherapy", "hot-towel"],
    suggestedUpgrade: "nourish-fortify",
    suggestedUpgradeReason: "Want deeper repair? Nourish & Fortify adds professional bond rebuilding for lasting strength.",
    image: "/media/treatments/classic-ritual.jpg",
    concerns: ["Product buildup", "General maintenance", "Oily scalp", "Stress"],
  },
  {
    id: "revitalize-restore",
    name: "Revitalize & Restore",
    tagline: "Awaken dormant follicles, renew density",
    price: 165,
    duration: "90 min",
    durationMin: 90,
    tier: "specialized" as const,
    description:
      "Indulge in a rejuvenating scalp ritual designed to awaken the follicles and encourage fuller, denser hair. This treatment begins with a purifying cleanse and delicate exfoliation to detoxify and rebalance the scalp, followed by a soothing, restorative massage that melts away tension. Experience the revitalizing power of high-frequency combing and our signature anti-hair loss serum protocol — crafted to stimulate growth, strengthen strands, and restore vitality. Perfect for addressing postpartum, stress-induced, or seasonal thinning.",
    note: "Does not include blowdry service.",
    highlights: [
      "Purifying cleanse & exfoliation",
      "Restorative scalp massage",
      "High-frequency combing",
      "Anti-hair loss serum protocol",
    ],
    bestFor: "Postpartum · Stress-induced thinning · Seasonal shedding",
    bestForTags: ["Thinning hair", "Postpartum", "Stress shedding", "Seasonal loss"],
    intensity: 4,
    luxuryLevel: 4,
    firstTimeFit: "possible" as const,
    recommendedAddOns: ["led-therapy", "extended-massage"],
    suggestedUpgrade: null,
    suggestedUpgradeReason: null,
    image: "/media/treatments/revitalize-restore.jpg",
    concerns: ["Thinning hair", "Hair loss", "Postpartum shedding", "Stress"],
  },
  {
    id: "nourish-fortify",
    name: "Nourish & Fortify",
    tagline: "Bond rebuilding from root to tip",
    price: 175,
    duration: "90 min",
    durationMin: 90,
    tier: "premium" as const,
    description:
      "Immerse yourself in a decadent treatment that unites indulgent scalp care with advanced hair restoration. This experience begins with a purifying scalp cleanse and gentle exfoliation to renew and refresh, followed by a deeply relaxing massage that nourishes from root to tip. A professional-grade bond rebuilding treatment then fortifies and transforms the hair, restoring strength, softness, and radiant shine. Ideal for dry, damaged, or chemically treated hair — or anyone seeking to rejuvenate and fortify their strands.",
    note: "Does not include blowdry.",
    highlights: [
      "Scalp cleanse & exfoliation",
      "Deep relaxation massage",
      "Professional bond rebuilding treatment",
    ],
    bestFor: "Dry · Damaged · Chemically treated hair",
    bestForTags: ["Dry hair", "Color-treated", "Heat damage", "Bond repair"],
    intensity: 4,
    luxuryLevel: 5,
    firstTimeFit: "possible" as const,
    recommendedAddOns: ["aromatherapy", "hot-towel", "extended-massage"],
    suggestedUpgrade: null,
    suggestedUpgradeReason: null,
    image: "/media/treatments/nourish-fortify.jpg",
    concerns: ["Dry scalp", "Damaged hair", "Chemical damage", "Brittle strands"],
  },
  {
    id: "gentlemans-recharge",
    name: "Gentleman's Recharge",
    tagline: "Purpose-built restoration for men",
    price: 95,
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
    suggestedUpgrade: "revitalize-restore",
    suggestedUpgradeReason: "Noticing thinning? Revitalize & Restore adds high-frequency combing and growth serum protocols.",
    image: "/media/treatments/gentlemans-recharge.jpg",
    concerns: ["Stress", "General maintenance", "Tension"],
  },
];

// ── ADD-ONS ──────────────────────────────────────────────────
export const addOns = [
  {
    id: "scalp-analysis",
    name: "Scalp Analysis",
    price: 25,
    duration: "+15 min",
    description:
      "A detailed scalp assessment using magnification to evaluate follicle health, oil balance, buildup, and circulation. Helps us tailor your current treatment and recommend your ideal ongoing protocol.",
    bestWith: ["classic-ritual", "gentlemans-recharge"],
  },
  {
    id: "extended-massage",
    name: "Extended Massage",
    price: 30,
    duration: "+15 min",
    description:
      "Additional time for our signature scalp and neck massage — deeper pressure, slower tempo. Ideal for those carrying tension or simply wanting to extend the most relaxing part of the ritual.",
    bestWith: ["classic-ritual", "revitalize-restore", "gentlemans-recharge"],
  },
  {
    id: "aromatherapy",
    name: "Aromatherapy Enhancement",
    price: 20,
    duration: "—",
    description:
      "A custom essential oil blend selected for your session — lavender for calm, peppermint for invigoration, or rosemary for stimulation. Infused into your massage and steam treatment.",
    bestWith: ["classic-ritual", "nourish-fortify"],
  },
  {
    id: "led-therapy",
    name: "LED Light Therapy",
    price: 35,
    duration: "+10 min",
    description:
      "Red and near-infrared light applied to the scalp to promote circulation, reduce inflammation, and support follicle recovery. Clinically studied and especially effective alongside growth-focused treatments.",
    bestWith: ["revitalize-restore"],
  },
  {
    id: "hot-towel",
    name: "Hot Towel Compression",
    price: 15,
    duration: "—",
    description:
      "Warm herbal towel wraps applied to the scalp and neck during your treatment. Opens pores for deeper product absorption and adds an extra layer of sensory luxury.",
    bestWith: ["classic-ritual", "nourish-fortify"],
  },
];

// ── TREATMENT-SPECIFIC FAQs ──────────────────────────────────
export const treatmentFAQs: Record<string, { question: string; answer: string }[]> = {
  "classic-ritual": [
    {
      question: "Is The Classic Ritual a good first treatment?",
      answer: "Absolutely — this is our most popular treatment and the one we recommend for first-time guests. It gives you the full head spa experience without being overly specialized, so you can discover what your scalp responds to best.",
    },
    {
      question: "How is this different from a salon hair wash?",
      answer: "Night and day. A salon wash is functional — this is therapeutic. The Classic Ritual includes a dedicated scalp exfoliation, a full massage protocol, a targeted hair mask, and steam infusion. It's designed to treat the scalp, not just clean the hair.",
    },
    {
      question: "Can I get The Classic Ritual if I have a sensitive scalp?",
      answer: "Yes. We assess your scalp at the start of every session and adjust pressure, products, and technique accordingly. Our Natulique products are certified organic and formulated without harsh sulfates or fragrances.",
    },
    {
      question: "How often should I book The Classic Ritual?",
      answer: "For ongoing scalp health, once a month is ideal. Think of it like a facial — regular maintenance keeps your scalp balanced, clear, and healthy between visits.",
    },
  ],
  "revitalize-restore": [
    {
      question: "Will this treatment regrow my hair?",
      answer: "This treatment is designed to create optimal conditions for hair growth — improved circulation, follicle stimulation, reduced inflammation, and targeted serums. Results vary, but many guests notice reduced shedding and improved density over a series of sessions. It's therapeutic, not a miracle cure, and works best as part of a consistent protocol.",
    },
    {
      question: "How many sessions before I see results?",
      answer: "Most guests begin noticing reduced shedding after 2–3 sessions. Visible improvements in density and thickness typically emerge over 4–8 sessions. We'll discuss a personalized timeline during your first visit.",
    },
    {
      question: "Is this safe during pregnancy or postpartum?",
      answer: "The scalp massage and cleansing components are safe during pregnancy. However, we may adjust or omit certain serums depending on your trimester. Please let us know when booking so we can tailor the protocol appropriately.",
    },
    {
      question: "What is high-frequency combing?",
      answer: "A professional device that delivers a mild electrical current to the scalp through a glass electrode. It increases blood flow, stimulates follicles, and has antibacterial properties. It feels like a gentle tingling — most guests find it pleasant and relaxing.",
    },
  ],
  "nourish-fortify": [
    {
      question: "What does bond rebuilding actually do?",
      answer: "Chemical treatments, heat styling, and environmental stress break the disulfide bonds inside each hair strand — causing brittleness, frizz, and dullness. Our professional-grade bond treatment reconstructs those bonds at the molecular level, restoring internal structure, elasticity, and shine.",
    },
    {
      question: "I just got my hair colored — how long should I wait?",
      answer: "We recommend waiting at least 72 hours after chemical treatments. The bond rebuilding protocol actually helps protect and extend your color by strengthening the hair structure, so it's an excellent follow-up to color services.",
    },
    {
      question: "Is this worth it if my hair isn't damaged?",
      answer: "Yes — bond maintenance is preventive, not just corrective. Even healthy hair benefits from structural reinforcement. Think of it as strength training for your strands. You'll notice improved texture, shine, and resilience.",
    },
    {
      question: "Can I combine this with other Lather treatments?",
      answer: "The Nourish & Fortify is our most comprehensive single treatment. If you want to add targeted growth support, we can incorporate LED Light Therapy as an add-on. We don't recommend combining two full treatments in one session — your scalp needs time to absorb and respond.",
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
      answer: "The treatment is formulated and paced for men, but there's no exclusion. If you prefer a shorter, more streamlined session, you're welcome to book it. That said, most women prefer The Classic Ritual for the fuller 75-minute experience.",
    },
    {
      question: "I'm experiencing hair thinning — should I upgrade?",
      answer: "If thinning is a primary concern, Revitalize & Restore is the better fit. It includes high-frequency combing and an anti-hair loss serum protocol specifically designed for growth support. The Gentleman's Recharge is focused on maintenance and relaxation rather than targeted growth therapy.",
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
      "A final rinse and light styling — you'll leave feeling polished and renewed",
    ],
  },
  "revitalize-restore": {
    whoItsFor:
      "Those experiencing thinning, shedding, or hair loss — whether from stress, postpartum changes, seasonal shifts, or aging. This treatment is therapeutic, not cosmetic, and results deepen over a series of sessions.",
    beforeVisit: [
      "Come with clean, product-free hair if possible",
      "Be prepared to discuss your hair history and current concerns",
      "This treatment is most effective as part of a series — consider booking 3–4 sessions",
      "Avoid coloring or chemical treatments 48 hours before",
    ],
    afterCare: [
      "The anti-hair loss serum continues working for 24–48 hours — avoid washing",
      "Avoid heat styling for 24 hours after treatment",
      "You may notice reduced shedding within 2–3 sessions",
      "Follow-up every 2–3 weeks for best results during active treatment",
    ],
    whatToExpect: [
      "An in-depth scalp consultation covering your hair history, lifestyle, and concerns",
      "A purifying double cleanse and gentle exfoliation tailored to your scalp type",
      "A restorative scalp massage focused on circulation and follicle stimulation",
      "High-frequency combing — a gentle electrical treatment that increases blood flow",
      "Application of our targeted anti-hair loss serum protocol",
      "A calming cool-down and light styling to close the session",
    ],
  },
  "nourish-fortify": {
    whoItsFor:
      "Anyone with dry, damaged, or chemically treated hair that needs structural repair. If your hair feels brittle, porous, or has lost its natural shine, this bond-rebuilding treatment restores strength from the inside out.",
    beforeVisit: [
      "Come with unwashed hair — natural oils help the treatment absorb",
      "Avoid deep-conditioning treatments the week before",
      "Let us know about any recent chemical treatments (color, relaxer, perm)",
      "Wear a top that allows easy reclining",
    ],
    afterCare: [
      "Wait at least 48 hours before washing to maximize bond repair",
      "Use a gentle, sulfate-free shampoo going forward",
      "You should notice improved texture and shine immediately",
      "Recommended every 4–6 weeks to maintain and build on results",
    ],
    whatToExpect: [
      "A scalp and hair consultation to assess damage level and treatment goals",
      "A purifying cleanse and gentle exfoliation to prepare the scalp",
      "A deep, unhurried scalp and neck massage for relaxation and product prep",
      "Application of a professional-grade bond rebuilding treatment",
      "Steam or warmth infusion for deep absorption into the hair shaft",
      "A final rinse revealing noticeably softer, stronger, more luminous hair",
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
export const testimonials = [
  {
    quote:
      "I've been to many spas across the country, but Lather is in a category of its own. The Classic Ritual was deeply relaxing and my scalp hasn't felt this healthy in years. I walked out genuinely renewed.",
    name: "Sarah M.",
    location: "Greenville, NC",
    service: "The Classic Ritual",
  },
  {
    quote:
      "After months of stress-related thinning, I tried the Revitalize & Restore. Three sessions in and I can see and feel the difference. The environment is stunning, and the results are real.",
    name: "Jennifer K.",
    location: "Greenville, NC",
    service: "Revitalize & Restore",
  },
  {
    quote:
      "The Gentleman's Recharge was exactly what I needed — quiet, focused, completely professional. My scalp feels incredible and I slept better that night than I had in months.",
    name: "Marcus T.",
    location: "Greenville, NC",
    service: "Gentleman's Recharge",
  },
  {
    quote:
      "Lather is not just a spa treatment — it's a ritual. Everything from the products to the ambiance tells you that this is different. This is what luxury actually feels like.",
    name: "Amara J.",
    location: "Greenville, NC",
    service: "Nourish & Fortify",
  },
];

// ── FAQs ─────────────────────────────────────────────────────
export const faqs = [
  {
    question: "What is a head spa?",
    answer:
      "A head spa is a therapeutic treatment focused on scalp health and hair wellness. Rooted in Japanese beauty tradition, it combines deep cleansing, gentle exfoliation, scalp massage, and targeted treatments to purify, stimulate, and nourish the scalp. Unlike a traditional hair wash, a head spa is a complete sensory ritual with measurable scalp-care results.",
  },
  {
    question: "How long does a session last?",
    answer:
      "Sessions range from 60 to 90 minutes depending on the ritual you choose. The Gentleman's Recharge is 60 minutes, The Classic Ritual is 75 minutes, and both the Revitalize & Restore and Nourish & Fortify are 90-minute experiences. All sessions are appointment-only and reserved exclusively for you.",
  },
  {
    question: "How should I prepare for my appointment?",
    answer:
      "Arrive with your hair in its natural, unwashed state if possible — no need to pre-shampoo. Avoid heavy oils or styling products on the scalp the day before. Come ready to relax. Wear comfortable clothing, and plan to give yourself some quiet time afterward to enjoy the renewed feeling.",
  },
  {
    question: "Are your services suitable for all hair types?",
    answer:
      "Yes. All of our rituals are thoughtfully formulated for a wide range of hair types and scalp conditions — from fine and oily to thick and dry. During your consultation at the start of each session, we assess your scalp and customize the treatment protocol to match your specific needs.",
  },
  {
    question: "Do the treatments include a blowdry?",
    answer:
      "Our current rituals do not include a blowdry service. You're welcome to air dry, and we provide styling essentials to help you leave feeling polished. We recommend planning accordingly if you have somewhere to be directly after your appointment.",
  },
  {
    question: "How often should I come in?",
    answer:
      "For general scalp maintenance and wellbeing, once a month is ideal. If you're addressing a specific concern — such as thinning, dryness, or postpartum shedding — we may recommend a series of sessions spaced 2–3 weeks apart. We'll discuss a personalized cadence during your first visit.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can book directly through our website by clicking Book Now, or call us during business hours. Sessions are by appointment only — each time slot is held exclusively for you. We recommend booking in advance, especially for weekend appointments.",
  },
];

// ── BRAND VALUES ─────────────────────────────────────────────
export const brandValues = [
  {
    title: "Intentional Care",
    body: "Every touch, every product, every moment is chosen with purpose. We believe in treatments that honor both science and ritual.",
  },
  {
    title: "Rooted in Wellness",
    body: "The scalp is the foundation of healthy hair. Our protocols are designed to restore balance from the very root.",
  },
  {
    title: "Quiet Luxury",
    body: "No noise, no rush. Lather is a sanctuary — an unhurried space where you are the only priority.",
  },
];
