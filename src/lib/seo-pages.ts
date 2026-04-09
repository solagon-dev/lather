export interface SeoCity {
  slug: string;
  name: string;
  state: string;
  driveTime: string;
  distanceMiles: number;
  direction: string;
  highway: string;
}

export interface SeoServiceType {
  key: string;
  urlPrefix: string;
  label: string;
  shortLabel: string;
  heroTagline: string;
  h1: (city: string, state: string) => string;
  heroSub: (city: string, driveTime: string) => string;
  metaTitle: (city: string, state: string) => string;
  metaDesc: (city: string, state: string, driveTime: string) => string;
  introH2: string;
  introP1: (city: string) => string;
  introP2: string;
  introP3: (city: string) => string;
  benefits: Array<{ title: string; body: string }>;
  whyLather: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedBlogs: Array<{ slug: string; title: string; category: string }>;
}

export const seoCities: SeoCity[] = [
  {
    slug: "greenville-nc",
    name: "Greenville",
    state: "NC",
    driveTime: "right in Greenville",
    distanceMiles: 0,
    direction: "in",
    highway: "downtown Greenville",
  },
  {
    slug: "winterville-nc",
    name: "Winterville",
    state: "NC",
    driveTime: "about 10 minutes",
    distanceMiles: 5,
    direction: "south of",
    highway: "Greenville Boulevard",
  },
  {
    slug: "ayden-nc",
    name: "Ayden",
    state: "NC",
    driveTime: "about 18 minutes",
    distanceMiles: 13,
    direction: "southwest of",
    highway: "NC-11 North",
  },
  {
    slug: "farmville-nc",
    name: "Farmville",
    state: "NC",
    driveTime: "about 22 minutes",
    distanceMiles: 18,
    direction: "west of",
    highway: "US-264 East",
  },
  {
    slug: "washington-nc",
    name: "Washington",
    state: "NC",
    driveTime: "about 40 minutes",
    distanceMiles: 35,
    direction: "northwest of",
    highway: "US-264 East",
  },
  {
    slug: "new-bern-nc",
    name: "New Bern",
    state: "NC",
    driveTime: "about 55 minutes",
    distanceMiles: 47,
    direction: "southeast of",
    highway: "US-70 West",
  },
  {
    slug: "grimesland-nc",
    name: "Grimesland",
    state: "NC",
    driveTime: "about 10 minutes",
    distanceMiles: 8,
    direction: "east of",
    highway: "NC-33 West",
  },
  {
    slug: "wilson-nc",
    name: "Wilson",
    state: "NC",
    driveTime: "about 55 minutes",
    distanceMiles: 47,
    direction: "northwest of",
    highway: "US-264 East",
  },
  {
    slug: "rocky-mount-nc",
    name: "Rocky Mount",
    state: "NC",
    driveTime: "about 60 minutes",
    distanceMiles: 56,
    direction: "northwest of",
    highway: "US-264 East",
  },
  {
    slug: "tarboro-nc",
    name: "Tarboro",
    state: "NC",
    driveTime: "about 50 minutes",
    distanceMiles: 44,
    direction: "north of",
    highway: "US-64 East",
  },
  {
    slug: "goldsboro-nc",
    name: "Goldsboro",
    state: "NC",
    driveTime: "about 55 minutes",
    distanceMiles: 50,
    direction: "west of",
    highway: "US-70 West",
  },
  {
    slug: "morehead-city-nc",
    name: "Morehead City",
    state: "NC",
    driveTime: "about 75 minutes",
    distanceMiles: 70,
    direction: "southeast of",
    highway: "US-70 West",
  },
  {
    slug: "jacksonville-nc",
    name: "Jacksonville",
    state: "NC",
    driveTime: "about 80 minutes",
    distanceMiles: 75,
    direction: "south of",
    highway: "NC-24 West",
  },
];

export const seoServiceTypes: SeoServiceType[] = [
  {
    key: "head-spa",
    urlPrefix: "head-spa-near",
    label: "Head Spa",
    shortLabel: "Head Spa",
    heroTagline: "The Complete Scalp Ritual",
    h1: (city, state) => `Luxury Head Spa Near ${city}, ${state}`,
    heroSub: (city, driveTime) =>
      `Lather Head Spa in Greenville offers a full Japanese-inspired head spa experience just ${driveTime} from ${city}. Scalp care, massage, and restoration — all in one unhurried ritual.`,
    metaTitle: (city, state) =>
      `Luxury Head Spa Near ${city} ${state} | Lather Head Spa Greenville`,
    metaDesc: (city, state, driveTime) =>
      `Looking for a luxury head spa near ${city}, ${state}? Lather Head Spa in Greenville is just ${driveTime} away. Book your Japanese-inspired scalp ritual today.`,
    introH2: "What Is a Head Spa — and Why Is Everyone Talking About It?",
    introP1: (city) =>
      `Guests from ${city} and across Eastern North Carolina have been discovering what the head spa experience actually delivers — and why it's so unlike anything a conventional salon offers. A head spa is a complete, protocol-driven scalp and hair wellness ritual rooted in Japanese beauty tradition. It combines professional cleansing, exfoliation, targeted scalp treatments, and extended therapeutic massage into a single, seamless experience.`,
    introP2:
      "At Lather Head Spa in Greenville, every session begins with a scalp analysis. We assess hydration, buildup, and follicle health before personalizing your treatment. The result isn't just a cleaner scalp — it's a measurably healthier one. Guests consistently describe leaving with hair that feels lighter, softer, and more alive, and a clarity of mind that's harder to explain but impossible to miss.",
    introP3: (city) =>
      `For ${city} residents, making the drive to Greenville for a head spa treatment has become a regular ritual rather than a rare occasion. The experience is that good, and the results compound over time. Whether you're coming in for the first time out of curiosity or returning for your monthly ritual, Lather is ready for you.`,
    benefits: [
      {
        title: "Deep Scalp Detox",
        body: "Professional cleansing removes buildup, product residue, and environmental debris that standard shampooing can't reach. Your scalp breathes differently after.",
      },
      {
        title: "Tension & Stress Relief",
        body: "Extended scalp and neck massage releases physical tension held in the head and shoulders — one of the most common places stress accumulates.",
      },
      {
        title: "Improved Scalp Circulation",
        body: "Therapeutic massage stimulates blood flow to the follicles, nourishing hair at the root and creating a healthier environment for growth.",
      },
      {
        title: "Hair Wellness From Root to Tip",
        body: "Targeted serums and steam infusion treat the scalp and strand simultaneously, leaving hair visibly more lustrous and manageable.",
      },
      {
        title: "Genuine Restoration",
        body: "Unlike a standard spa service, a head spa addresses both physical condition and sensory calm — you leave looking better and feeling genuinely restored.",
      },
    ],
    whyLather: [
      {
        title: "Purpose-Built for Scalp Care",
        body: "Lather Head Spa is a dedicated head spa — not a salon that added a scalp service. Every element of the space and every product on the shelf exists specifically to deliver an exceptional scalp ritual.",
      },
      {
        title: "Japanese-Inspired Protocols",
        body: "Our techniques are rooted in Japanese head spa tradition, known globally for its meticulous approach to scalp health. We've brought that philosophy to Eastern North Carolina — and the results speak for themselves.",
      },
      {
        title: "A Space Designed for Stillness",
        body: "The environment at Lather is intentional. Quiet, refined, unhurried. You are the only priority during your session. Many guests describe simply sitting in the chair as the beginning of the experience.",
      },
    ],
    faqs: [
      {
        question: "What is a head spa treatment?",
        answer:
          "A head spa is a therapeutic wellness ritual focused on scalp health and hair restoration. Rooted in Japanese beauty tradition, it combines professional scalp analysis, deep cleansing, gentle exfoliation, targeted serum treatments, and extended therapeutic massage. Unlike a standard shampoo or salon visit, a head spa is a complete sensory and clinical experience with measurable scalp-care outcomes.",
      },
      {
        question: "How long does a head spa session last?",
        answer:
          "Sessions at Lather range from 45 to 90 minutes depending on the ritual. The Blowout is 45 minutes, the Gentleman's Recharge is 60 minutes, The Classic Ritual is 75 minutes, and The Luxe Ritual is a 90-minute experience. Every session is reserved exclusively for you — there's no rushing.",
      },
      {
        question: "Is a head spa good for hair growth?",
        answer:
          "Yes. The scalp massage component of a head spa stimulates blood circulation to the follicles, which nourishes hair at the root and creates a healthier environment for growth. Our Luxe Ritual is specifically designed to address thinning and support follicle health using targeted anti-hair loss serums and advanced scalp treatments.",
      },
      {
        question: "How often should I get a head spa treatment?",
        answer:
          "For general wellness and scalp maintenance, once a month is ideal. If you're addressing a specific concern — such as chronic dryness, postpartum shedding, or stress-related thinning — we may recommend sessions every 2–3 weeks initially. We'll discuss a personalized cadence during your first visit.",
      },
    ],
    relatedBlogs: [
      { slug: "what-is-a-head-spa", title: "What Is a Head Spa and Why Is It So Popular?", category: "Education" },
      { slug: "what-happens-head-spa-treatment", title: "What Actually Happens During a Head Spa Treatment?", category: "Experience" },
      { slug: "luxury-self-care-head-spa-trending", title: "Why Luxury Self-Care Is Trending — and Why Head Spas Are Leading", category: "Lifestyle" },
    ],
  },
  {
    key: "scalp-treatment",
    urlPrefix: "scalp-treatment",
    label: "Scalp Treatment",
    shortLabel: "Scalp Treatment",
    heroTagline: "Scalp Health. Hair Results.",
    h1: (city, state) => `Professional Scalp Treatment Near ${city}, ${state}`,
    heroSub: (city, driveTime) =>
      `Guests from ${city} travel to Lather Head Spa in Greenville for targeted scalp treatments that address thinning, dryness, and buildup. Just ${driveTime} away — and worth every mile.`,
    metaTitle: (city, state) =>
      `Scalp Treatment Near ${city} ${state} | Lather Head Spa Greenville`,
    metaDesc: (city, state, driveTime) =>
      `Looking for professional scalp treatment near ${city}, ${state}? Lather Head Spa in Greenville is just ${driveTime} away. Expert scalp care for hair growth, dryness, and wellness.`,
    introH2: "Why Scalp Health Is the Foundation of Healthy Hair",
    introP1: (city) =>
      `Many ${city} residents are discovering what dermatologists and hair specialists have long understood: scalp health is the single most important factor in the long-term health and appearance of your hair. A chronically dry, congested, or inflamed scalp can lead to thinning, breakage, and loss of density that no shampoo or conditioner can fully address. Professional scalp treatment targets the root cause — literally.`,
    introP2:
      "At Lather Head Spa in Greenville, our scalp treatments begin with a detailed consultation and visual scalp analysis. We assess buildup levels, hydration, sebum production, and follicle density before selecting the appropriate treatment protocol. Targeted serums, exfoliation, steam, and therapeutic massage work in combination to restore scalp balance, stimulate circulation, and create the healthiest possible environment for hair growth.",
    introP3: (city) =>
      `For those coming from ${city} and surrounding communities, a professional scalp treatment at Lather represents an investment in long-term hair health — not just a one-time indulgence. Regular scalp care compounds over time, and guests who commit to a monthly or bimonthly routine consistently report visible improvements in hair density, scalp comfort, and overall wellbeing.`,
    benefits: [
      {
        title: "Targeted Scalp Analysis",
        body: "Every treatment begins with a professional consultation. We assess your specific scalp condition — dryness, oiliness, buildup, sensitivity — before selecting the right protocol for your needs.",
      },
      {
        title: "Deep Cleansing & Detox",
        body: "Professional-grade cleansing removes hardened buildup, follicle-blocking residue, and environmental pollutants that prevent healthy hair growth and cause chronic scalp issues.",
      },
      {
        title: "Follicle Stimulation",
        body: "Therapeutic massage and high-frequency treatments increase blood flow to the follicles, delivering oxygen and nutrients that support stronger, denser hair growth over time.",
      },
      {
        title: "Scalp Rebalancing",
        body: "Whether your scalp tends toward dryness or excess oil production, targeted serums restore natural balance — reducing flakiness, irritation, and the chronic discomfort of an unhealthy scalp.",
      },
      {
        title: "Visible, Lasting Results",
        body: "Unlike surface-level salon treatments, professional scalp care delivers results that accumulate with each session. Most guests notice meaningful improvement within three to four visits.",
      },
    ],
    whyLather: [
      {
        title: "Clinical Precision, Spa Comfort",
        body: "Our scalp treatments combine the thoroughness of a clinical approach with the environment of a luxury spa. You receive professional-grade results in a setting designed for genuine relaxation.",
      },
      {
        title: "Formulated for Real Concerns",
        body: "Whether you're dealing with postpartum shedding, stress-related thinning, chronic dryness, or simply a scalp that's never felt quite right — we have a protocol designed specifically for your concern.",
      },
      {
        title: "Long-Term Partnership",
        body: "Scalp health is a journey, not a single appointment. We track your progress across visits and adjust your treatment protocol over time to ensure continued improvement and lasting results.",
      },
    ],
    faqs: [
      {
        question: "What does a professional scalp treatment do?",
        answer:
          "A professional scalp treatment addresses the underlying health of the scalp — removing buildup, restoring moisture balance, stimulating circulation, and nourishing the follicles with targeted serums. The result is a healthier scalp environment that supports stronger, denser, more vibrant hair growth. It goes far beyond what any at-home product can deliver.",
      },
      {
        question: "Is scalp treatment effective for hair loss or thinning?",
        answer:
          "Yes — particularly when thinning is related to scalp congestion, poor circulation, or follicle stress. Our Luxe Ritual specifically targets hair thinning with advanced scalp treatments, targeted serum protocols, and restorative massage. Results vary depending on the underlying cause, but consistent treatment typically yields noticeable improvement within several sessions.",
      },
      {
        question: "How often should I get a scalp treatment?",
        answer:
          "For maintenance and general scalp health, once a month is recommended. For guests addressing thinning, chronic dryness, or postpartum shedding, we typically suggest a series of sessions 2–3 weeks apart before transitioning to a monthly rhythm. We create a personalized schedule during your initial consultation.",
      },
      {
        question: "Is scalp treatment suitable for sensitive scalps?",
        answer:
          "Absolutely. All of our treatments are customizable to your scalp's sensitivity level. We use professional-grade, scalp-safe products and adjust pressure, product selection, and technique based on your specific needs and comfort. If you have a known scalp condition, please mention it when booking so we can prepare the right protocol.",
      },
    ],
    relatedBlogs: [
      { slug: "benefits-of-scalp-treatments", title: "The Real Benefits of Regular Scalp Treatments", category: "Hair Wellness" },
      { slug: "scalp-health-hair-growth", title: "The Connection Between Scalp Health and Hair Growth", category: "Hair Wellness" },
      { slug: "how-often-scalp-treatment", title: "How Often Should You Get a Professional Scalp Treatment?", category: "Hair Wellness" },
    ],
  },
  {
    key: "japanese-head-spa",
    urlPrefix: "japanese-head-spa",
    label: "Japanese Head Spa",
    shortLabel: "Japanese Head Spa",
    heroTagline: "Rooted in Japanese Wellness Tradition",
    h1: (city, state) => `Japanese Head Spa Near ${city}, ${state}`,
    heroSub: (city, driveTime) =>
      `Lather Head Spa brings an authentic Japanese-inspired scalp ritual to Eastern North Carolina. Serving guests from ${city} — just ${driveTime} from Greenville, NC.`,
    metaTitle: (city, state) =>
      `Japanese Head Spa Near ${city} ${state} | Lather Head Spa Greenville`,
    metaDesc: (city, state, driveTime) =>
      `Experience an authentic Japanese head spa near ${city}, ${state}. Lather Head Spa in Greenville is just ${driveTime} away — offering Japanese-inspired scalp rituals and hair wellness.`,
    introH2: "The Art of the Japanese Head Spa — Brought to Eastern NC",
    introP1: (city) =>
      `The Japanese head spa is one of wellness culture's most distinctive experiences — meticulous, protocol-driven, and unlike anything a conventional Western salon offers. Originating in Japan, where scalp and hair health are regarded as fundamental components of overall wellness, the Japanese head spa weaves together clinical scalp care, therapeutic massage, and mindful ritual into an experience that is as restorative mentally as it is beneficial physically. For residents of ${city} curious about the treatment, Lather Head Spa in Greenville brings it close to home.`,
    introP2:
      "What separates a Japanese head spa from a standard scalp treatment is the depth of the protocol. Each session at Lather begins with a professional scalp analysis — assessing hydration, sebum levels, and follicle health — before moving through a carefully sequenced series of steps: a detoxifying cleanse, gentle exfoliation, targeted serum application, steam infusion, and an extended massage that addresses the scalp, neck, and shoulders. Nothing is rushed. The philosophy is to give the scalp exactly what it needs — no more, no less.",
    introP3: (city) =>
      `For ${city} guests experiencing this for the first time, the most common reaction is surprise at how different it feels from anything they've had before. The extended massage, the quality of the products, the unhurried pace, the quiet of the environment — together they create something that regular guests describe as simply non-negotiable. A Japanese head spa is not a luxury. It is a practice.`,
    benefits: [
      {
        title: "Meticulous Japanese Protocol",
        body: "Every step follows the sequencing of traditional Japanese head spa technique — cleanse, exfoliate, treat, steam, massage. The order is deliberate and the results are cumulative.",
      },
      {
        title: "Scalp Health at Its Core",
        body: "Japanese beauty philosophy treats the scalp as the foundation of hair health. Every product, technique, and treatment decision at Lather flows from this core principle.",
      },
      {
        title: "Extended Therapeutic Massage",
        body: "The massage component of a Japanese head spa is more prolonged and deliberate than in most Western treatments. Tension in the scalp, neck, and shoulders is methodically released.",
      },
      {
        title: "Clinical-Grade Scalp Products",
        body: "We use professional-grade serums, treatments, and cleansers — not retail products — to address your scalp's specific needs with the precision the Japanese approach demands.",
      },
      {
        title: "Mindful, Unhurried Ritual",
        body: "The Japanese head spa is defined by its pace as much as its technique. There is no rushing. The experience is designed to quiet the mind while restoring the scalp.",
      },
    ],
    whyLather: [
      {
        title: "Eastern North Carolina's Only Dedicated Head Spa",
        body: "Lather is not a salon add-on. We are a purpose-built Japanese-inspired head spa — the first of its kind in this region. Our entire practice is organized around the head spa experience and nothing else.",
      },
      {
        title: "Authentic Technique, Thoughtful Adaptation",
        body: "We honor the principles of Japanese head spa tradition while tailoring each session to the individual. The protocol is rigorous, but the experience is personal.",
      },
      {
        title: "An Environment That Earns the Experience",
        body: "The Japanese head spa philosophy extends to the environment. Lather's space is quiet, refined, and intentionally designed to support the full therapeutic benefit of the treatment.",
      },
    ],
    faqs: [
      {
        question: "What is a Japanese head spa?",
        answer:
          "A Japanese head spa is a wellness ritual rooted in Japanese beauty culture that focuses on deep scalp care through a multi-step protocol: professional scalp analysis, detoxifying cleanse, gentle exfoliation, targeted serum treatments, therapeutic steam, and extended scalp massage. It is known for its meticulous attention to detail, premium products, and deeply relaxing experience. The result is a healthier scalp, improved hair condition, and a profound sense of restoration.",
      },
      {
        question: "How is a Japanese head spa different from a regular salon treatment?",
        answer:
          "The key differences are depth, duration, and philosophy. A standard salon shampoo is designed to clean the hair. A Japanese head spa is designed to restore the scalp — using professional analysis, targeted treatments, and an extended massage protocol that goes far beyond anything available at a conventional salon. The experience is also significantly more relaxing, taking place in a spa environment with unhurried, dedicated attention.",
      },
      {
        question: "What should I expect during my first Japanese head spa session?",
        answer:
          "Your session begins with a brief consultation and visual scalp analysis. You'll then move through a sequence of steps — cleansing, exfoliation, serum application, steam infusion, and massage — in a quiet, comfortable setting. The full experience takes between 60 and 90 minutes. Most first-time guests describe it as unlike anything they've experienced before, and the vast majority book their next appointment before leaving.",
      },
      {
        question: "Is a Japanese head spa good for hair growth?",
        answer:
          "Yes. The Japanese head spa's emphasis on scalp health directly supports hair growth. Therapeutic massage improves circulation to the follicles, targeted serums address specific concerns like thinning or dormant follicles, and the deep cleansing process removes buildup that can inhibit healthy growth. Our Luxe Ritual is specifically designed for guests experiencing thinning or density concerns.",
      },
    ],
    relatedBlogs: [
      { slug: "japanese-head-spa-vs-traditional", title: "Japanese Head Spa vs. Traditional Salon Treatment: What's the Difference?", category: "Education" },
      { slug: "what-is-a-head-spa", title: "What Is a Head Spa and Why Is It So Popular?", category: "Education" },
      { slug: "what-happens-head-spa-treatment", title: "What Actually Happens During a Head Spa Treatment?", category: "Experience" },
    ],
  },
  {
    key: "scalp-massage",
    urlPrefix: "scalp-massage",
    label: "Scalp Massage",
    shortLabel: "Scalp Massage",
    heroTagline: "Tension Released. Mind Quieted.",
    h1: (city, state) => `Professional Scalp Massage Near ${city}, ${state}`,
    heroSub: (city, driveTime) =>
      `Lather Head Spa in Greenville offers therapeutic scalp massage as part of every head spa ritual. Serving guests from ${city} — just ${driveTime} away.`,
    metaTitle: (city, state) =>
      `Scalp Massage Near ${city} ${state} | Lather Head Spa Greenville`,
    metaDesc: (city, state, driveTime) =>
      `Looking for professional scalp massage near ${city}, ${state}? Lather Head Spa in Greenville is just ${driveTime} away. Therapeutic scalp massage for relaxation and hair wellness.`,
    introH2: "The Therapeutic Power of Professional Scalp Massage",
    introP1: (city) =>
      `For ${city} residents dealing with chronic tension, stress, or the particular exhaustion of modern daily life, professional scalp massage at Lather Head Spa offers something increasingly rare: an hour of genuine stillness and skilled, purposeful touch. The scalp is one of the most tension-dense areas of the body. Years of stress, screen time, and poor posture create patterns of holding that most people don't even notice — until someone begins to release them.`,
    introP2:
      "At Lather, scalp massage is not an afterthought — it is a central, extended component of every head spa ritual. Our therapists use a combination of traditional Japanese scalp massage techniques and therapeutic pressure work to address the scalp, neck, and shoulder tension that accumulates over time. The effect is cumulative: each session builds on the last, gradually releasing chronic holding patterns and improving overall scalp circulation.",
    introP3: (city) =>
      `Beyond the immediate relaxation, regular scalp massage has well-documented benefits for hair health. Improved blood circulation to the follicles means better nutrient delivery at the root level — and for ${city} guests who have noticed thinning or reduced density, therapeutic massage forms an essential part of any scalp restoration protocol. Book your first session and experience the difference professional touch makes.`,
    benefits: [
      {
        title: "Deep Tension Release",
        body: "Professional scalp massage targets chronic tension held in the scalp, temples, neck, and shoulders — areas that absorb enormous stress and are rarely given dedicated therapeutic attention.",
      },
      {
        title: "Improved Scalp Circulation",
        body: "Therapeutic massage increases blood flow to the scalp and follicles, delivering oxygen and nutrients that support hair growth and improve overall scalp health over time.",
      },
      {
        title: "Stress & Anxiety Reduction",
        body: "The scalp contains a high density of nerve endings. Skilled massage activates the parasympathetic nervous system, producing a measurable reduction in cortisol and a lasting sense of calm.",
      },
      {
        title: "Better Sleep",
        body: "Many guests report significantly improved sleep following a scalp massage session. The combination of tension release and nervous system regulation has a profound effect on rest quality.",
      },
      {
        title: "Hair Wellness Support",
        body: "Scalp massage is one of the most evidence-backed natural supports for hair health. Regular sessions as part of a complete head spa ritual deliver cumulative improvements in density and texture.",
      },
    ],
    whyLather: [
      {
        title: "Massage as Central Practice",
        body: "At Lather, scalp massage is not an add-on or a brief component of a larger service. It is a core, extended element of every ritual — given the time and skill it deserves.",
      },
      {
        title: "Trained in Japanese Technique",
        body: "Our therapists are trained in Japanese scalp massage methods, which are known for their methodical, deeply therapeutic approach. The difference between a routine salon shampoo and a Lather massage is significant.",
      },
      {
        title: "The Complete Head Spa Context",
        body: "Scalp massage at Lather doesn't stand alone — it's delivered within the full context of a head spa ritual, amplifying its effects through cleansing, treatment, and steam that prepare the scalp for maximum benefit.",
      },
    ],
    faqs: [
      {
        question: "What are the benefits of professional scalp massage?",
        answer:
          "Professional scalp massage offers a range of documented benefits: tension and stress relief, improved scalp circulation, stimulation of hair follicles, reduction in headaches, better sleep quality, and reduced anxiety. When performed as part of a complete head spa ritual — with preparatory cleansing and targeted scalp treatments — the effects are significantly amplified compared to standalone massage.",
      },
      {
        question: "How is a scalp massage different from a head spa?",
        answer:
          "Scalp massage is one component within the broader head spa experience. A full head spa ritual at Lather includes professional scalp analysis, deep cleansing, exfoliation, targeted serum treatment, therapeutic steam, and extended massage. Guests who come specifically for scalp massage receive it as part of this complete protocol — not in isolation — which delivers more thorough and lasting results.",
      },
      {
        question: "How long does a scalp massage session last?",
        answer:
          "As part of a full head spa ritual at Lather, sessions range from 60 to 90 minutes. The massage component itself is extended and unhurried — far longer than the brief scalp work typically included in a salon visit. We don't rush through it. The quality of the massage is a defining feature of what makes Lather different.",
      },
      {
        question: "Can scalp massage help with hair thinning?",
        answer:
          "Yes — scalp massage is one of the most evidence-supported natural interventions for hair thinning caused by poor circulation or follicle stress. Regular therapeutic massage increases blood flow to the follicles, improving nutrient delivery and stimulating dormant hair growth. For best results, we often recommend pairing scalp massage with our targeted serum treatments as part of The Luxe Ritual.",
      },
    ],
    relatedBlogs: [
      { slug: "scalp-massage-vs-head-spa", title: "Scalp Massage vs. Head Spa: What's the Difference?", category: "Education" },
      { slug: "head-spa-stress-relief", title: "Head Spa as Stress Relief: The Science Behind the Calm", category: "Wellness" },
      { slug: "benefits-of-scalp-treatments", title: "The Real Benefits of Regular Scalp Treatments", category: "Hair Wellness" },
    ],
  },
];

export function getSeoCity(slug: string): SeoCity | undefined {
  return seoCities.find((c) => c.slug === slug);
}

export function getSeoService(key: string): SeoServiceType | undefined {
  return seoServiceTypes.find((s) => s.key === key);
}

export function getRelatedCities(currentSlug: string, count = 4): SeoCity[] {
  return seoCities.filter((c) => c.slug !== currentSlug).slice(0, count);
}
