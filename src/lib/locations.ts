export interface LocationData {
  slug: string;
  city: string;
  state: string;
  metaTitle: string;
  metaDescription: string;
  driveTime: string | null;
  distanceMiles: number | null;
  heroHeadline: string;
  heroSub: string;
  introTitle: string;
  introBody: string[];
  whyVisit: Array<{ title: string; body: string }>;
  directionsText: string;
  testimonialIndex: number;
}

export const locations: LocationData[] = [
  {
    slug: "greenville-head-spa",
    city: "Greenville",
    state: "NC",
    metaTitle: "Luxury Head Spa in Greenville NC | Lather Head Spa",
    metaDescription:
      "Lather Head Spa is Greenville's premier Japanese-inspired luxury head spa. Experience deep scalp care, stress relief, and total hair wellness in the heart of Greenville, NC.",
    driveTime: null,
    distanceMiles: null,
    heroHeadline: "Greenville's Premier Luxury Head Spa",
    heroSub:
      "Right here in Greenville, Lather Head Spa offers a Japanese-inspired sanctuary for scalp health and genuine relaxation. No long drives — just a quiet hour of exceptional care.",
    introTitle: "A Luxury Head Spa Experience in the Heart of Greenville",
    introBody: [
      "Lather Head Spa is Greenville's first dedicated luxury head spa, bringing a curated Japanese-inspired approach to scalp and hair wellness to the heart of eastern North Carolina. Whether you've been curious about the head spa experience or you're ready to make it a regular ritual, our doors are open — right here in your city.",
      "Our treatment protocol is designed around one simple belief: your scalp deserves the same thoughtful attention as the rest of your wellness routine. We combine professional-grade scalp analysis, deep cleansing techniques, targeted treatments, and prolonged massage into a seamless experience that leaves you genuinely restored — not just relaxed.",
      "Greenville is a city that moves fast. Between ECU's energy, the medical corridor, and the bustle of everyday life, moments of true stillness are rare. Lather was built for exactly that — a space where you can set everything down and let skilled hands take care of you for a while.",
    ],
    whyVisit: [
      {
        title: "Rooted in Greenville",
        body: "We're not a franchise or a pop-up concept. Lather Head Spa was built for this community, and we're deeply invested in offering Greenville something it's never had before — a true luxury head spa experience without having to leave town.",
      },
      {
        title: "Scalp Science, Not Surface Care",
        body: "Every service begins with a scalp consultation. We assess buildup, hydration levels, and follicle health before tailoring your treatment. The result isn't just a cleaner scalp — it's a healthier foundation for better hair over time.",
      },
      {
        title: "A Ritual Worth Repeating",
        body: "First-time guests often describe the experience as unlike anything they've tried before. Regular guests describe it as non-negotiable. Either way, the results — clearer scalp, reduced tension, noticeably healthier hair — speak for themselves.",
      },
    ],
    directionsText:
      "Lather Head Spa is located in Greenville, NC, accessible from all parts of the city. Whether you're coming from the university side of town, the medical district, or one of Greenville's surrounding neighborhoods, we're a short drive from wherever you are. No tolls, no highway confusion — just a clean, easy trip to a genuinely restorative experience.",
    testimonialIndex: 0,
  },
  {
    slug: "winterville-head-spa",
    city: "Winterville",
    state: "NC",
    metaTitle: "Head Spa Near Winterville NC | Lather Head Spa Greenville",
    metaDescription:
      "Just 10 minutes from Winterville, Lather Head Spa in Greenville NC offers luxury Japanese-inspired scalp treatments and deep relaxation for Winterville residents.",
    driveTime: "about 10 minutes",
    distanceMiles: 5,
    heroHeadline: "Luxury Head Spa Near Winterville, NC",
    heroSub:
      "Winterville residents are just a short drive from one of eastern North Carolina's most thoughtful wellness experiences. Lather Head Spa in Greenville is closer than you think.",
    introTitle: "Serving Guests from Winterville and the Greater Pitt County Area",
    introBody: [
      "For Winterville residents, Greenville has always been the natural destination for dining, shopping, and services. Lather Head Spa is simply the latest — and perhaps the most indulgent — reason to make the trip. At just five miles away, a luxury Japanese head spa experience is genuinely within reach.",
      "The head spa concept may be new to many in eastern North Carolina, but it has deep roots in Japanese wellness culture. At its core, it's a meticulous, protocol-driven approach to scalp and hair health — combining cleansing, exfoliation, treatment, and extended massage in a way that conventional salons never quite deliver. Lather brings that experience to Greenville, just minutes from Winterville's front door.",
      "Many of our most loyal guests call Winterville home. They've told us they wish they'd found us sooner. If you've been curious about scalp treatments or simply want to experience genuine, unhurried care, a ten-minute drive is all that stands between you and something quietly extraordinary.",
    ],
    whyVisit: [
      {
        title: "An Easy Escape Close to Home",
        body: "You don't need to travel far for a world-class wellness experience. From Winterville, Lather Head Spa is roughly ten minutes down the road — close enough to visit regularly, significant enough to feel like a true escape from routine.",
      },
      {
        title: "Deep Scalp Care That Delivers",
        body: "Our treatments go well beyond what a standard salon shampoo offers. Professional-grade scalp analysis, targeted serums, and extended massage work together to address buildup, improve circulation, and leave your scalp and hair in genuinely better condition.",
      },
      {
        title: "Designed for Repeat Visits",
        body: "The benefits of scalp care compound over time. Regular guests from Winterville and the surrounding area notice real improvements in hair texture, scalp comfort, and overall feel after just a few sessions. It's the kind of care that rewards consistency.",
      },
    ],
    directionsText:
      "From Winterville, Lather Head Spa is a straightforward ten-minute drive into Greenville — no backroads or complicated turns required. Head north on Greenville Boulevard and you'll be pulling into Greenville before the first song on your playlist finishes. It's the kind of proximity that makes a luxury treatment feel like a spontaneous Tuesday decision rather than a special-occasion commitment.",
    testimonialIndex: 1,
  },
  {
    slug: "ayden-head-spa",
    city: "Ayden",
    state: "NC",
    metaTitle: "Head Spa Near Ayden NC | Lather Head Spa Greenville",
    metaDescription:
      "Ayden residents are just 18 minutes from Lather Head Spa in Greenville, NC — a luxury Japanese-inspired head spa offering deep scalp treatments and genuine relaxation.",
    driveTime: "about 18 minutes",
    distanceMiles: 13,
    heroHeadline: "Luxury Head Spa Near Ayden, NC",
    heroSub:
      "From Ayden, a genuinely restorative head spa experience is less than twenty minutes away. Lather Head Spa in Greenville is where scalp health and deep relaxation meet.",
    introTitle: "Welcoming Guests from Ayden to Greenville's Premier Head Spa",
    introBody: [
      "Ayden has a quiet charm that its residents know well — a pace of life that makes thoughtful self-care feel not just possible, but natural. And when it's time to seek out something a little more luxurious, Greenville is right up the road. Lather Head Spa sits squarely at the intersection of those two impulses: the ease of staying close to home, and the reward of experiencing something genuinely elevated.",
      "The Japanese head spa experience that inspired Lather is built on a philosophy of patience and precision. Each session begins with a scalp consultation, moves through a carefully sequenced cleansing and treatment protocol, and concludes with an extended massage designed to melt tension from the scalp down through the neck and shoulders. In a world that rarely slows down, an hour at Lather feels like a true reset.",
      "The drive from Ayden to Greenville takes about eighteen minutes — and for most guests, that transition time actually adds to the experience. By the time you arrive, you've already begun to decompress. Our team is ready to take care of the rest.",
    ],
    whyVisit: [
      {
        title: "A Short Drive, A Lasting Impression",
        body: "Eighteen minutes separates Ayden from one of eastern North Carolina's most distinct wellness experiences. Lather Head Spa offers a level of care and intention that guests often describe as genuinely unlike anything they've experienced at a traditional salon or spa.",
      },
      {
        title: "Scalp Health as a Foundation",
        body: "Healthy hair begins with a healthy scalp, and that's the entire premise behind what we do at Lather. Our treatments address the root causes of common scalp concerns — buildup, dryness, congested follicles — through professional techniques that simply can't be replicated at home.",
      },
      {
        title: "The Ritual of It",
        body: "There's something meaningful about carving out time for genuine self-care. Guests from Ayden often tell us that their Lather appointments have become one of the highlights of their month. The experience is calm, intentional, and restorative in ways that linger long after you've left the chair.",
      },
    ],
    directionsText:
      "The drive from Ayden to Lather Head Spa in Greenville takes about eighteen minutes and follows a simple, well-traveled route through Pitt County. You'll travel north through familiar terrain, and before long the city of Greenville opens up around you. It's a comfortable, uncomplicated commute — which makes it all the easier to justify a regular visit.",
    testimonialIndex: 2,
  },
  {
    slug: "farmville-head-spa",
    city: "Farmville",
    state: "NC",
    metaTitle: "Head Spa Near Farmville NC | Lather Head Spa Greenville",
    metaDescription:
      "Farmville residents are just 22 minutes from Lather Head Spa in Greenville, NC — eastern NC's luxury Japanese-inspired head spa for scalp health and deep relaxation.",
    driveTime: "about 22 minutes",
    distanceMiles: 18,
    heroHeadline: "Luxury Head Spa Near Farmville, NC",
    heroSub:
      "From Farmville, Greenville's premier head spa is only twenty minutes away. Lather offers Farmville residents a rare, unhurried experience in scalp care and total relaxation.",
    introTitle: "Bringing Luxury Head Spa Care to Farmville and Pitt County",
    introBody: [
      "Farmville sits comfortably in Pitt County's landscape — a community with deep roots and a growing appreciation for quality living. When it comes to the kind of personal care that goes beyond the ordinary, residents don't have to look far. Lather Head Spa in Greenville is just eighteen miles down the road, and the experience waiting there is worth every mile.",
      "What distinguishes a head spa from a standard salon visit is both the depth of the treatment and the quality of the attention. At Lather, no two sessions are identical because no two scalps are the same. We begin with a thorough consultation and scalp assessment, then move through a sequenced protocol of cleansing, exfoliation, targeted serums, and massage that's tailored to what your scalp actually needs that day. The result is care that feels personal — because it is.",
      "Farmville guests often note that the twenty-two minute drive becomes part of the ritual. A bit of quiet road time, favorite music, and the anticipation of an hour that's entirely yours. We hear it often: 'I look forward to it all week.' That kind of anticipation is exactly what we hope to create.",
    ],
    whyVisit: [
      {
        title: "Thoughtful Care, Every Time",
        body: "At Lather, no appointment is treated as routine. Each visit begins fresh — with a look at your scalp's current state and an adjustment of the treatment plan accordingly. That level of attentiveness is rare, and Farmville guests recognize it immediately.",
      },
      {
        title: "The Only Experience of Its Kind Nearby",
        body: "There's no other dedicated luxury head spa in eastern North Carolina quite like Lather. For Farmville residents, making the short trip to Greenville is the only way to access this level of Japanese-inspired scalp treatment and wellness.",
      },
      {
        title: "Hair You'll Actually Notice",
        body: "Beyond the relaxation, regular head spa treatments produce visible results. Guests from Farmville consistently mention improvements in hair shine, softness, and manageability after a few sessions. The science behind it is straightforward: a healthier scalp grows healthier hair.",
      },
    ],
    directionsText:
      "From Farmville, the drive to Lather Head Spa in Greenville is a clean twenty-two minutes along well-traveled Pitt County roads. It's the kind of drive that gives you just enough time to shift your mindset — to leave the day behind before you even walk through the door. Greenville is your nearest city for this level of care, and we're glad to be the destination.",
    testimonialIndex: 3,
  },
  {
    slug: "washington-nc-head-spa",
    city: "Washington",
    state: "NC",
    metaTitle: "Head Spa Near Washington NC | Lather Head Spa Greenville",
    metaDescription:
      "Washington NC residents are about 40 minutes from Lather Head Spa — Greenville's luxury Japanese-inspired head spa. The drive is worth every minute for scalp care this good.",
    driveTime: "about 40 minutes",
    distanceMiles: 35,
    heroHeadline: "Luxury Head Spa Near Washington, NC",
    heroSub:
      "Washington's residents know a thing or two about beauty and intention — and those who've made the drive to Lather Head Spa in Greenville say it's one of the best decisions they've made for their hair.",
    introTitle: "The Drive from Washington, NC to Greenville's Premier Head Spa",
    introBody: [
      "Washington, NC carries a quiet elegance — a riverfront city with a strong sense of place and an appreciation for quality. It's no surprise that residents with a discerning eye for exceptional experiences have begun making the trip to Lather Head Spa in Greenville. The thirty-five-mile drive takes about forty minutes, and the experience waiting on the other end makes it more than worthwhile.",
      "A luxury head spa experience is genuinely difficult to find in eastern North Carolina. Lather was built to fill that gap — to give people in this part of the state access to the kind of Japanese-inspired scalp care that has quietly become one of the most sought-after wellness treatments in major cities. You shouldn't have to travel to Raleigh or Charlotte for it, and now you don't.",
      "What you'll find at Lather is a space that moves at a different pace than the rest of your day. The consultation, the cleansing, the layered treatment, the extended massage — it's a full hour of care that's entirely focused on you. Guests from Washington often book return appointments before they leave. The experience has a way of clarifying its own value.",
    ],
    whyVisit: [
      {
        title: "Worth the Distance",
        body: "Forty minutes is nothing when the destination is this good. Guests who drive from Washington to Lather consistently describe the experience as one they can't find closer to home — and one they have no interest in giving up. The quality of care simply justifies the drive.",
      },
      {
        title: "Professional Scalp Analysis Included",
        body: "Every Lather session begins with a genuine scalp assessment — not a quick glance, but a professional evaluation of hydration, buildup, sensitivity, and follicle health. For guests who have never had their scalp professionally evaluated, this alone can be revelatory.",
      },
      {
        title: "A Full Reset, Not Just a Treatment",
        body: "The benefits of a Lather session extend well beyond your hair. The extended scalp and neck massage activates the parasympathetic nervous system, which is the body's rest-and-digest mode. Guests leave calmer, clearer, and physically lighter. It's self-care in the fullest sense of the word.",
      },
    ],
    directionsText:
      "From Washington, NC, the drive to Lather Head Spa in Greenville follows a scenic and straightforward route heading northwest through Beaufort and Pitt counties. At about forty minutes, it's a comfortable drive — and one that many Washington guests have made a regular part of their wellness rhythm. Put on a podcast, enjoy the drive through eastern Carolina's quiet landscape, and arrive ready to fully let go.",
    testimonialIndex: 0,
  },
  {
    slug: "new-bern-head-spa",
    city: "New Bern",
    state: "NC",
    metaTitle: "Head Spa Near New Bern NC | Lather Head Spa Greenville",
    metaDescription:
      "New Bern NC guests drive about 55 minutes to Lather Head Spa in Greenville for luxury Japanese scalp treatments. A premium head spa experience worth the journey.",
    driveTime: "about 55 minutes",
    distanceMiles: 47,
    heroHeadline: "Luxury Head Spa Near New Bern, NC",
    heroSub:
      "New Bern is a city that values quality and history — and its residents who've discovered Lather Head Spa in Greenville have added a new chapter to their wellness story.",
    introTitle: "New Bern Guests Welcome at Lather Head Spa in Greenville, NC",
    introBody: [
      "New Bern is one of North Carolina's most storied cities — a place where historical depth and contemporary living coexist gracefully. It's also home to discerning residents who, when they want something truly exceptional, are willing to drive for it. Lather Head Spa in Greenville has become that destination for a growing number of New Bern guests who've discovered that the fifty-five minute drive is a worthwhile part of the experience.",
      "There is nothing quite like a Japanese-inspired head spa session in this region, and Lather was built to be the standard. From the moment you arrive, the environment is calm and purposeful — designed to help you leave the outside world behind. The treatment itself unfolds at a deliberate pace: a thorough scalp consultation, a deep cleanse, a targeted treatment phase, and an extended massage that works from the crown of your head through the base of your neck.",
      "New Bern guests often combine their Lather visit with a day in Greenville — a meal, a bit of shopping, an afternoon to themselves. Whatever shape the day takes, the head spa appointment is consistently described as the highlight. When you give your scalp and your nervous system the kind of attention they rarely receive, the effects are noticeable — and they stay with you.",
    ],
    whyVisit: [
      {
        title: "No Comparable Option Closer to Home",
        body: "New Bern doesn't have a dedicated luxury head spa, and neither does much of eastern North Carolina. Lather exists to serve the region, and guests from New Bern make up some of our most loyal and enthusiastic clientele. When the experience is this good, distance becomes secondary.",
      },
      {
        title: "A Japanese Tradition, Brought to Eastern NC",
        body: "The head spa experience at Lather is rooted in a Japanese wellness philosophy that treats the scalp as the foundation of hair health and the seat of nervous system tension. Our techniques are adapted from that tradition, delivered with the kind of precision and care it deserves.",
      },
      {
        title: "Visible, Lasting Results",
        body: "Consistent head spa treatments change your hair in ways that topical products simply can't. Guests from New Bern who've made Lather a regular part of their routine describe improvements in hair density, shine, softness, and scalp comfort. These aren't temporary effects — they're the result of genuinely healthier scalp function.",
      },
    ],
    directionsText:
      "From New Bern, the drive to Lather Head Spa in Greenville takes approximately fifty-five minutes along US-70 West — a straightforward, well-traveled highway route through eastern North Carolina. The scenery is calm, the drive is simple, and by the time you arrive in Greenville, you're already primed for an hour of complete relaxation. Many New Bern guests tell us the drive home, after treatment, is one of the most peaceful drives they've had in a long time.",
    testimonialIndex: 1,
  },
  {
    slug: "grimesland-head-spa",
    city: "Grimesland",
    state: "NC",
    metaTitle: "Head Spa Near Grimesland NC | Lather Head Spa Greenville",
    metaDescription:
      "Grimesland NC residents are just 10 minutes from Lather Head Spa in Greenville — luxury Japanese-inspired scalp treatments for hair health and deep relaxation.",
    driveTime: "about 10 minutes",
    distanceMiles: 8,
    heroHeadline: "Luxury Head Spa Near Grimesland, NC",
    heroSub:
      "Just minutes from Grimesland, Lather Head Spa in Greenville offers a Japanese-inspired sanctuary for scalp health and genuine relaxation. Your ritual is closer than you think.",
    introTitle: "Grimesland's Nearest Luxury Head Spa",
    introBody: [
      "Living in Grimesland means you're closer to Lather Head Spa than almost anyone else in the region. Just eight miles down the road in Greenville, our studio offers a level of personal care that transforms how you think about scalp health and self-care.",
      "The head spa experience at Lather isn't a trend — it's a genuine wellness practice with decades of refinement behind it. Rooted in Japanese head spa traditions, our treatment protocol addresses the scalp as the living foundation of your hair. Buildup from styling products and hard water, reduced circulation from stress, and follicle congestion are all addressed through a carefully sequenced combination of professional cleansing, treatment, and extended massage.",
      "Grimesland guests who've made Lather part of their routine describe it as one of the few experiences that feels entirely restorative — not just a nice treat, but something their scalp and their mind genuinely needed. At just ten minutes away, it's easy to make it part of your regular self-care.",
    ],
    whyVisit: [
      {
        title: "A Treatment Protocol That Actually Works",
        body: "Lather's approach to scalp care is methodical and informed. We don't offer a single-size service — every treatment is tailored based on a professional scalp assessment conducted at the start of your visit. What you receive is care that's specific to your scalp, your hair, and your needs that day.",
      },
      {
        title: "Just Minutes Away",
        body: "At only eight miles from Grimesland, Lather is practically in your neighborhood. No long highway drives, no complicated directions — just a quick trip to Greenville and you're in the chair. It's close enough to fit into a lunch break or an afternoon errand run.",
      },
      {
        title: "Recovery for Your Hair and Your Mind",
        body: "The benefits of a head spa session are twofold. Your scalp emerges cleaner, better nourished, and in improved health. And your nervous system — eased by prolonged, skilled massage — emerges quieter. That combination is rare in any single treatment, and it's exactly what guests from Grimesland come back for.",
      },
    ],
    directionsText:
      "The drive from Grimesland to Lather Head Spa in Greenville is approximately ten minutes, heading west on NC-33 into Greenville. It's one of the shortest drives to our studio from any surrounding community — easy, direct, and effortless.",
    testimonialIndex: 2,
  },
  {
    slug: "wilson-head-spa",
    city: "Wilson",
    state: "NC",
    metaTitle: "Head Spa Near Wilson NC | Lather Head Spa Greenville",
    metaDescription:
      "Wilson NC residents drive about 55 minutes to Lather Head Spa in Greenville for luxury Japanese scalp care. Discover why Wilson guests call it the best self-care decision they've made.",
    driveTime: "about 55 minutes",
    distanceMiles: 47,
    heroHeadline: "Luxury Head Spa Near Wilson, NC",
    heroSub:
      "Wilson has always been a city with character and ambition — and its residents who've found Lather Head Spa in Greenville have found something worth the drive every single time.",
    introTitle: "Wilson, NC Guests Are Always Welcome at Lather Head Spa",
    introBody: [
      "Wilson is a city that has long punched above its weight — in arts, in agriculture, in community character. Its residents are used to seeking out quality, even when it requires a bit of a drive. Lather Head Spa in Greenville has become, for a growing number of Wilson guests, exactly that kind of destination: something specific enough and excellent enough to justify the trip.",
      "What Lather offers is difficult to categorize if you've never experienced it. It's more involved than a salon visit, more specific than a massage, and more restorative than either. The Japanese head spa framework we work within combines professional scalp health practices — cleansing, exfoliation, targeted treatment — with the kind of extended, skilled massage that releases tension accumulated in the scalp, neck, and shoulders over weeks of stress and screen time.",
      "Wilson guests often make an occasion of their visits — a full day in Greenville with a meal before or after their appointment. But just as often, guests come directly for the treatment and head home afterward, finding the drive itself a welcome transition between the pace of daily life and an hour of complete, unhurried attention.",
    ],
    whyVisit: [
      {
        title: "Scalp Wellness You Can Feel",
        body: "The physical sensation of a thorough scalp treatment — the cleansing, the exfoliation, the warmth of treatment products, the long massage — is unlike anything a standard salon visit provides. Wilson guests who've experienced it for the first time almost universally describe the session as eye-opening.",
      },
      {
        title: "Expertise You Can Trust",
        body: "At Lather, scalp health is the entire focus — not a side service attached to a haircut or color. That singular commitment means our team has developed a depth of expertise in scalp assessment and treatment that generalist salons simply can't match. Wilson guests appreciate coming to a place that truly specializes.",
      },
      {
        title: "A Worthy Investment in Yourself",
        body: "Self-care is most powerful when it's intentional. A Lather appointment isn't something you squeeze into a busy week — it's something you schedule with the knowledge that you're giving yourself something genuinely nourishing. The results, both in hair health and in stress relief, make the investment feel obvious in retrospect.",
      },
    ],
    directionsText:
      "From Wilson, Lather Head Spa in Greenville is about fifty-five minutes east along US-264 — a straightforward, interstate-quality drive through eastern North Carolina. The route is direct and uncomplicated, passing through the broad flat landscape that characterizes this part of the state. Many Wilson guests use the drive as a natural wind-down, arriving ready to step into a space that asks nothing of them except that they relax.",
    testimonialIndex: 3,
  },
  {
    slug: "rocky-mount-head-spa",
    city: "Rocky Mount",
    state: "NC",
    metaTitle: "Head Spa Near Rocky Mount NC | Lather Head Spa Greenville",
    metaDescription:
      "Rocky Mount NC residents are about 60 minutes from Lather Head Spa in Greenville — a luxury Japanese-inspired head spa offering expert scalp care and total relaxation.",
    driveTime: "about 60 minutes",
    distanceMiles: 56,
    heroHeadline: "Luxury Head Spa Near Rocky Mount, NC",
    heroSub:
      "Rocky Mount residents looking for a truly exceptional head spa experience make the drive to Lather in Greenville — and they'll tell you it's an hour well spent.",
    introTitle: "Welcoming Rocky Mount Guests to Eastern NC's Premier Head Spa",
    introBody: [
      "Rocky Mount is a city at a compelling crossroads — urban and rural, historic and forward-looking. Its residents are accustomed to traveling for quality, and an increasing number have made Lather Head Spa in Greenville a regular destination on their wellness calendar. At fifty-six miles away, it's the kind of drive that feels purposeful rather than burdensome, especially when you know exactly what's waiting at the other end.",
      "The concept of a dedicated head spa — a space focused entirely on the health of the scalp and the deep relaxation of the body through prolonged massage — is still relatively rare outside of major metropolitan areas. Lather was built to change that for eastern North Carolina. Our mission has always been to bring the quality and intention of a world-class head spa experience to people who shouldn't have to drive to Raleigh or Charlotte to access it.",
      "Rocky Mount guests who've made Lather part of their routine describe the experience in consistent terms: restorative, unmatched, and worth every mile. They come for the scalp treatments and stay for the ritual — the quiet, the care, the sensation of an hour that belongs entirely to them. If you've been considering the drive, consider this your invitation.",
    ],
    whyVisit: [
      {
        title: "Eastern NC's Best Head Spa, Period",
        body: "There's no other experience like Lather in this part of North Carolina. Rocky Mount guests who've visited describe it as a clear step above anything available closer to home. When you're looking for the best, sometimes the best requires a drive — and at sixty minutes, it's one of the easier ones.",
      },
      {
        title: "A Complete Scalp Health Protocol",
        body: "Unlike a spa that offers scalp massage as an add-on, Lather was built around scalp health from the ground up. Every session includes a professional assessment, a customized cleanse, targeted treatment application, and an extended massage. It's a full protocol, not a partial gesture.",
      },
      {
        title: "Results That Accumulate",
        body: "First-time guests are often surprised by how their scalp and hair feel after a single session. Regular guests are often amazed by how their hair changes over months of consistent care. Improved texture, reduced shedding, better moisture retention — these are the compounding rewards of treating your scalp with the seriousness it deserves.",
      },
    ],
    directionsText:
      "From Rocky Mount, the drive to Lather Head Spa in Greenville takes approximately sixty minutes, traveling southeast through Nash and Edgecombe counties before entering Pitt County and arriving in Greenville. The route follows well-maintained highways through the open landscape of eastern North Carolina — a drive that many Rocky Mount guests describe as a calm, meditative prelude to an already restorative experience. Round trip, it's two hours of your day. Everything in between is ours to make worthwhile.",
    testimonialIndex: 0,
  },
];
