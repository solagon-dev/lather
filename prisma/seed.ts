import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.article.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.galleryItem.deleteMany();
  await prisma.adminUser.deleteMany();

  // Create admin user
  const passwordHash = await bcrypt.hash('Lather2024!', 12);
  await prisma.adminUser.create({
    data: {
      email: 'admin@latherheadspa.com',
      passwordHash,
      name: 'Lather Admin',
    },
  });

  // Create articles
  await prisma.article.createMany({
    data: [
      // Article 1
      {
        title: 'What Is a Head Spa and Why Is It Becoming So Popular?',
        slug: 'what-is-a-head-spa',
        excerpt:
          'Head spa treatments have quietly moved from niche wellness circles into the mainstream—and for good reason. Rooted in Japanese beauty tradition, a head spa is a purposeful scalp ritual that goes far beyond a standard shampoo and rinse. Here is what it actually is, and why so many people are making it a regular part of their wellness routine.',
        content: `<h2>The Origins of Head Spa Culture</h2>
<p>The head spa concept traces its roots to Japan, where scalp health has long been treated as a cornerstone of overall wellbeing—not merely a cosmetic concern. In Japanese beauty philosophy, a healthy scalp is understood to be the foundation of beautiful, resilient hair. The rituals developed around this philosophy are deliberate, measured, and deeply therapeutic: slow, intentional massage strokes, carefully selected botanical treatments, and an environment designed to quiet the mind as much as restore the scalp.</p>
<p>Over the past several years, these practices have traveled well beyond Japan. Wellness-forward clients in cities across the United States have discovered that treating the scalp with the same attentiveness we give the skin produces results that are both visible and deeply felt. What was once considered a niche offering is now among the fastest-growing categories in the luxury spa industry.</p>

<h2>What a Head Spa Actually Involves</h2>
<p>A head spa is not simply a more luxurious version of a hair wash. It is a structured, multi-step protocol that addresses the scalp as living tissue—complex, responsive, and worthy of real care. At its core, a quality head spa experience includes:</p>
<ul>
  <li><strong>Scalp consultation:</strong> An assessment of your scalp's current condition—whether oily, dry, sensitive, or imbalanced—before any product touches your hair.</li>
  <li><strong>Clarifying cleanse:</strong> A deep cleanse designed to remove product buildup, excess sebum, and environmental debris that accumulates on the scalp over time.</li>
  <li><strong>Exfoliation:</strong> Gentle physical or enzyme-based exfoliation to clear away dead skin cells and allow treatments to penetrate more effectively.</li>
  <li><strong>Therapeutic massage:</strong> Sustained, purposeful scalp massage that stimulates circulation, relieves muscular tension around the head and neck, and promotes a state of genuine relaxation.</li>
  <li><strong>Targeted treatments:</strong> Serums, masks, or steaming protocols chosen based on your individual scalp profile—whether addressing thinning, dryness, sensitivity, or general maintenance.</li>
</ul>
<p>The experience is immersive. Most sessions run between 60 and 90 minutes, and many guests describe the effects as similar to a deep meditation—a profound stillness that lingers well after they leave.</p>

<h2>Why the Popularity Is Well-Earned</h2>
<p>Head spa treatments have earned their following not through marketing, but through results. Clients returning for regular sessions frequently report improvements in scalp texture, a reduction in flakiness and irritation, visibly fuller and shinier hair, and—perhaps most notably—a meaningful reduction in stress and tension. In an era where wellness options are everywhere but genuine restoration is rare, a head spa offers something increasingly valuable: an experience that actually delivers.</p>
<p>There is also the factor of intentionality. Unlike many beauty services, a head spa asks you to slow down. There is no multitasking, no scrolling, no hurry. For an hour or more, the focus is entirely on you—and that experience, in itself, has become something people genuinely seek out.</p>

<h2>Is a Head Spa Right for You?</h2>
<p>The straightforward answer is yes—head spa treatments are appropriate for virtually any hair type, scalp condition, or lifestyle. Whether you are addressing a specific concern like thinning or dryness, or simply looking for a more meaningful way to practice self-care, a professional head spa experience offers something worth returning to.</p>
<p>If you are curious about what a session might look like, our <a href="/treatments/classic-ritual">Classic Ritual</a> is where most first-time guests begin — a 75-minute introduction to everything a head spa can be. For those with specific concerns like <a href="/scalp-concerns">thinning, dryness, or buildup</a>, we will guide you toward the right treatment during your consultation. You can also <a href="/book">book your appointment online</a> or learn more about <a href="/what-is-a-head-spa">what a head spa involves</a>.</p>`,
        featuredImage:
          'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
        featuredImageAlt: 'Luxury head spa treatment with scalp massage',
        category: 'Education',
        tags: ['head spa', 'scalp health', 'wellness', 'Japanese beauty', 'hair care'],
        authorName: 'Lather Head Spa',
        publishedAt: new Date('2025-01-15T09:00:00Z'),
        status: 'published',
        seoTitle: 'What Is a Head Spa? Origins, Benefits & What to Expect | Lather Head Spa',
        seoDescription:
          'Discover what a head spa truly is—its Japanese roots, what happens during a session, and why clients in Greenville, NC are making it a regular ritual.',
        readingTime: 5,
      },

      // Article 2
      {
        title: 'What Your Scalp Is Trying to Tell You',
        slug: 'what-your-scalp-is-trying-to-tell-you',
        excerpt:
          'Flaking, tightness, excess oil, shedding that seems to come from nowhere — your scalp communicates in signals most of us have never learned to read. Each symptom points somewhere specific. Here is how to interpret what yours is saying.',
        content: `<h2>A Language We Were Never Taught</h2>
<p>We learn, early on, to read the skin on our face. A breakout means something. Dryness means something. Redness, texture changes, sensitivity — we track these shifts because we can see them in the mirror every morning. The scalp offers the same quality of information, often more urgently, but it goes unread. It is hidden under hair, out of sight, and so we ignore it until the signals become impossible to dismiss.</p>
<p>The truth is that your scalp is remarkably specific in its complaints. An oily patch near the crown communicates something different from tightness at the temples. Diffuse shedding tells a different story than flaking concentrated along the hairline. Learning to distinguish these signals — and responding to them appropriately — is the foundation of scalp care that actually works.</p>

<h2>Excess Oil and Congestion</h2>
<p>A persistently oily scalp is not simply a matter of having "oily hair." It often indicates that the scalp's sebaceous glands are overcompensating — frequently in response to over-stripping from harsh shampoos, or from buildup that has disrupted the scalp's natural feedback loop. The glands sense a depleted surface and produce more oil to compensate, creating a cycle that no amount of dry shampoo will resolve.</p>
<p>What the scalp actually needs in this situation is a professional-grade clarifying treatment — not another attempt to degrease the surface, but a deeper intervention that clears the follicular buildup and allows sebum production to recalibrate. At Lather, our <a href="/treatments/classic-ritual">Classic Ritual</a> addresses this directly. Most clients with chronic oiliness notice a genuine shift after two to three sessions — the scalp produces less because it no longer needs to overcompensate.</p>

<h2>Persistent Flaking and Dryness</h2>
<p>Flaking is one of the most misunderstood scalp signals. Most people reach for a dandruff shampoo, which may address surface symptoms but rarely resolves the underlying cause. Chronic flaking often reflects a compromised scalp barrier — the thin lipid layer that retains moisture and protects against irritation has been weakened, whether by harsh products, environmental exposure, hard water, or simply neglect.</p>
<p>Restoring the scalp barrier requires hydration delivered at the right depth, not just on the surface. The <a href="/treatments/nourish-fortify">Nourish &amp; Fortify</a> treatment uses botanical masks and steam infusion to deliver moisture below the outermost layer, where it can actually support repair. The results are not just cosmetic — clients describe the sensation as the scalp finally being able to hold onto moisture rather than losing it within hours of washing.</p>

<h2>Tightness, Tenderness, and Tension</h2>
<p>If your scalp feels tight — as though it is pulling, or tender when you press on certain spots — you are experiencing the muscular consequence of chronic stress. The galea aponeurotica, the flat tendon that stretches across the top of the skull, is surrounded by muscles that contract involuntarily during prolonged tension. Over time, this tightness restricts blood flow to the follicles above and contributes to both discomfort and diminished hair quality.</p>
<p>This is not something a product can fix. It requires hands — specifically, trained hands that understand the anatomy of the scalp and can work into the suboccipital muscles, the temporalis, and the frontalis with the kind of sustained, deliberate pressure that releases held tension. Our therapists spend years developing this skill. It is, for many guests, the most immediately transformative part of the treatment.</p>

<h2>Shedding That Feels Unusual</h2>
<p>Some shedding is entirely normal — the average scalp loses 50 to 100 hairs daily as part of the natural growth cycle. But when the volume increases noticeably, or when it persists beyond a few weeks, the scalp is telling you that something has disrupted that cycle. Common triggers include hormonal shifts (postpartum, thyroid, menopause), acute or chronic stress, nutritional deficiencies, and scalp inflammation.</p>
<p>The <a href="/treatments/revitalize-restore">Revitalize &amp; Restore</a> treatment was designed specifically for this situation. High-frequency combing stimulates follicle activity, targeted serums support the anagen (growth) phase, and therapeutic massage improves the circulation that nourishes each follicle. It is not a cure — no honest practitioner would claim that — but it creates materially better conditions for recovery, and clients who commit to a series of sessions routinely report measurable improvement.</p>

<h2>Reading the Full Picture</h2>
<p>No single symptom tells the whole story. The most useful thing you can do is pay attention to patterns — where symptoms appear, how long they persist, and whether they correlate with changes in your routine, your stress levels, or the seasons. When you bring that awareness to a professional scalp consultation, the assessment becomes significantly more precise, and the treatment that follows becomes significantly more effective.</p>
<p>If your scalp has been sending signals you have been ignoring — or signals you have been misinterpreting — a <a href="/scalp-concerns">guided consultation</a> at Lather is a practical place to start. We will look at what is actually happening, explain what it means, and build a treatment path that responds to your scalp's specific needs rather than a generic category.</p>`,
        featuredImage:
          'https://images.pexels.com/photos/3738355/pexels-photo-3738355.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
        featuredImageAlt: 'Close-up scalp assessment during a head spa consultation',
        category: 'Scalp Health',
        tags: ['scalp signals', 'oily scalp', 'dry scalp', 'hair shedding', 'scalp diagnosis'],
        authorName: 'Lather Head Spa',
        publishedAt: new Date('2025-01-22T09:00:00Z'),
        status: 'published',
        seoTitle: 'What Your Scalp Is Trying to Tell You | Lather Head Spa Greenville NC',
        seoDescription:
          'Flaking, oiliness, tightness, shedding — your scalp speaks in signals. Learn to read them at Lather Head Spa in Greenville, NC.',
        readingTime: 6,
      },

      // Article 3
      {
        title: 'What Happens During a Luxury Head Spa Appointment?',
        slug: 'what-happens-during-a-head-spa-appointment',
        excerpt:
          'If you have never visited a head spa before, knowing what to expect can make the experience even more enjoyable. From the moment you arrive to the moment you leave, a luxury head spa appointment is thoughtfully structured to deliver both measurable scalp-care results and a level of relaxation you will want to return to.',
        content: `<h2>Before You Arrive</h2>
<p>A luxury head spa experience begins before you even walk through the door. In the days leading up to your appointment, we recommend arriving with your hair in its natural state—avoid heavy oils, dry shampoos, or styling products on the scalp the day before your visit. This allows our specialists to assess your scalp's true condition without interference and ensures the treatment protocol can work at full effectiveness.</p>
<p>On the day of your appointment, plan to give yourself a little time afterward. Many guests find that the relaxed, restored feeling following a head spa session is something they want to ease into rather than rush away from. The treatment is not simply a service—it is an experience worth savoring.</p>

<h2>The Consultation</h2>
<p>Every appointment at Lather begins with a brief consultation. Before any product is applied or any hands are laid on your scalp, your specialist will ask about your scalp concerns, hair history, lifestyle factors that may be affecting scalp health, and what you most hope to get from the session. This conversation shapes everything that follows.</p>
<p>This is not a formality. The information gathered in those first few minutes determines which cleansing protocol will be used, how the massage will be approached, which treatment serums or masks will be selected, and where particular attention will be focused during the session. Personalization is not an add-on at Lather—it is the standard.</p>

<h2>The Treatment Experience</h2>
<p>Once the consultation is complete, the treatment unfolds in a sequence of deliberate, layered steps:</p>
<ul>
  <li><strong>Pre-cleanse assessment:</strong> Your specialist examines the scalp under lighting to note any areas of dryness, oiliness, sensitivity, or buildup before beginning.</li>
  <li><strong>Clarifying cleanse:</strong> A professional-grade shampoo formulated for your scalp type removes surface buildup and prepares the scalp for deeper treatment. This step alone often produces an immediate sense of lightness.</li>
  <li><strong>Exfoliation:</strong> A gentle scalp scrub or enzyme exfoliant clears away dead skin cells, unblocking follicles and optimizing absorption of the treatments to follow.</li>
  <li><strong>Therapeutic scalp massage:</strong> This is the heart of the experience. Using specific techniques designed to stimulate circulation, release tension, and calm the nervous system, your specialist works through the scalp, the base of the skull, the neck, and the upper shoulders. For most guests, this is when the experience becomes genuinely transformative.</li>
  <li><strong>Targeted treatment application:</strong> Serums, masks, or specialty treatments are applied based on your individual scalp profile. These may address hair density, moisture balance, sensitivity, or overall vitality.</li>
  <li><strong>Steam or heat infusion (where applicable):</strong> Therapeutic steam helps active ingredients penetrate more deeply, intensifying the effects of the treatment.</li>
  <li><strong>Final rinse and finish:</strong> The treatment concludes with a thorough rinse and, where appropriate, a nourishing conditioning step.</li>
</ul>

<h2>After the Treatment</h2>
<p>Most guests leave their appointment feeling noticeably lighter—both in the physical sensation of their scalp and in their overall state of mind. Hair typically feels softer, cleaner, and more manageable than usual. In the days that follow, many clients notice improved scalp texture, reduced irritation, and a visible improvement in the quality of their hair.</p>
<p>Your specialist will share any personalized recommendations for home care to extend and support the effects of the treatment between sessions. These suggestions are practical and concise—not an attempt to sell you a shelf full of products, but a few targeted choices that can make a genuine difference.</p>
<p>To see what a session actually looks like, our <a href="/treatments/classic-ritual">Classic Ritual</a> is where most guests start. If you already know you want to address something specific — <a href="/treatments/revitalize-restore">thinning</a>, <a href="/treatments/nourish-fortify">damage repair</a>, or <a href="/treatments/gentlemans-recharge">a focused men's session</a> — we have protocols built for each. <a href="/book">Book your appointment online</a> or explore our <a href="/faq">frequently asked questions</a> if you want to learn more first.</p>`,
        featuredImage:
          'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
        featuredImageAlt: 'Head spa specialist performing a scalp treatment',
        category: 'Experience',
        tags: ['head spa appointment', 'what to expect', 'scalp treatment', 'luxury spa', 'first visit'],
        authorName: 'Lather Head Spa',
        publishedAt: new Date('2025-01-29T09:00:00Z'),
        status: 'published',
        seoTitle: 'What Happens During a Luxury Head Spa Appointment? | Lather Head Spa Greenville',
        seoDescription:
          'Step-by-step guide to what happens during a luxury head spa appointment at Lather in Greenville, NC—from consultation to final rinse.',
        readingTime: 6,
      },

      // Article 4
      {
        title: 'How Often Should You Get a Scalp Treatment?',
        slug: 'how-often-should-you-get-a-scalp-treatment',
        excerpt:
          'One of the most common questions new guests ask is how frequently they should schedule scalp treatments to see meaningful results. The answer depends on your scalp\'s individual needs—but there are clear guidelines that can help you build a cadence that actually works.',
        content: `<h2>There Is No Single Right Answer</h2>
<p>The honest response to "how often should I get a scalp treatment?" is that it depends—on your scalp's current condition, your hair goals, your lifestyle, and what you are hoping to achieve. That said, there are general frameworks that serve most clients well, and your specialist at Lather can help you determine exactly where you fall within them.</p>
<p>What is worth saying upfront is this: scalp care is cumulative. A single session is genuinely restorative, but the most significant and lasting results come from consistency. Just as a regular fitness routine produces outcomes that a single workout cannot, regular scalp treatments create conditions for hair health that a one-time visit cannot fully replicate.</p>

<h2>General Maintenance: Once a Month</h2>
<p>For clients without a specific scalp concern—those seeking general wellbeing, prevention, and the deep relaxation that a professional head spa provides—a monthly schedule is ideal. Once per month is frequent enough to prevent significant buildup, maintain scalp balance, and experience the cumulative benefits of regular therapeutic massage, while remaining accessible within most schedules and budgets.</p>
<p>Monthly clients consistently report that their hair feels and looks better over time. Texture improves, scalp sensitivity decreases, and the hair itself tends to become more manageable and responsive to styling. The effects compound in a way that is genuinely noticeable after three to six months of regular visits.</p>

<h2>Targeted Concerns: Every Two to Three Weeks</h2>
<p>If you are addressing a specific scalp condition—postpartum shedding, stress-related thinning, chronic dryness, or scalp sensitivity—a more intensive initial series may be recommended. Sessions spaced two to three weeks apart allow treatments to build on one another before the scalp has had time to return entirely to its baseline condition.</p>
<p>A typical approach for targeted concerns might be an initial series of four to six sessions over two to three months, followed by a transition to monthly maintenance once the primary concern has been meaningfully addressed. Your specialist will assess progress at each session and adjust the recommended cadence accordingly.</p>

<h2>Seasonal Adjustments</h2>
<p>The scalp, like skin, responds to seasonal changes. Many clients find that their scalp becomes drier in winter months, more oily during summer humidity, or more prone to sensitivity during periods of high stress. It is entirely reasonable—and often beneficial—to increase the frequency of your visits during periods when your scalp needs additional support, and to return to a standard monthly cadence when conditions stabilize.</p>

<h2>How to Know When It Is Time</h2>
<p>Beyond any set schedule, there are signals your scalp will give you. Persistent flakiness, an itchy or tight feeling, unusual shedding, or hair that looks dull and lifeless despite regular washing are all indicators that a professional treatment is overdue. Learning to recognize these signals and respond to them is part of developing a truly responsive approach to scalp health.</p>
<p>If you are ready to establish a routine, our <a href="/memberships">membership program</a> makes regular visits simple and more affordable — starting at $110 per month for a monthly <a href="/treatments/classic-ritual">Classic Ritual</a>. Or if you prefer to begin with a single session, <a href="/book">book online</a> and we will help you determine the right cadence from there.</p>`,
        featuredImage:
          'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
        featuredImageAlt: 'Client receiving a professional scalp treatment',
        category: 'Hair Wellness',
        tags: ['scalp treatment frequency', 'scalp care routine', 'hair wellness', 'scalp health', 'head spa schedule'],
        authorName: 'Lather Head Spa',
        publishedAt: new Date('2025-02-05T09:00:00Z'),
        status: 'published',
        seoTitle: 'How Often Should You Get a Scalp Treatment? | Lather Head Spa',
        seoDescription:
          'Learn how often to schedule professional scalp treatments for your hair type and goals. Expert guidance from Lather Head Spa in Greenville, NC.',
        readingTime: 5,
      },

      // Article 5
      {
        title: 'The Ritual of Slowing Down',
        slug: 'the-ritual-of-slowing-down',
        excerpt:
          'We built Lather around a single conviction: that genuine restoration requires time you are not usually willing to give yourself. The head spa is not efficient. It is not quick. That is precisely what makes it work.',
        content: `<h2>The Problem With Productivity</h2>
<p>There is a particular kind of exhaustion that comes from being very good at moving quickly. You optimize your mornings. You batch your errands. You answer emails during lunch and listen to podcasts at 1.5x. Every hour is accounted for, and the result is a life that runs smoothly on the surface while something underneath it quietly erodes.</p>
<p>The scalp, of all places, tends to register this erosion honestly. Tightness across the crown. A dull ache at the base of the skull that you have stopped noticing because it has been there so long. Hair that has lost a quality you cannot quite name — not damaged, exactly, but diminished. These are not random complaints. They are the physical residue of a nervous system that has forgotten what it feels like to fully stand down.</p>

<h2>What Happens in Seventy-Five Minutes</h2>
<p>A <a href="/treatments/classic-ritual">Classic Ritual</a> at Lather takes 75 minutes. That is longer than most people spend doing any single non-work activity in a given week. It is certainly longer than most people spend in deliberate, conscious stillness.</p>
<p>The first ten minutes are the hardest. Your mind races. You think about the parking meter, the emails, the thing you said in that meeting. Your jaw is clenched and you may not even realize it. Our therapists expect this. They do not rush past it. The opening consultation and the first slow strokes of the cleanse are paced to meet you where you are — wired, distracted, carrying the day on your shoulders — and to begin, without fanfare, the process of unwinding it.</p>
<p>Somewhere around minute twenty, something shifts. The massage deepens into the suboccipital muscles at the base of the skull — an area so dense with tension in most adults that the release is almost startling. Breathing slows. The jaw unclenches. The mental chatter thins. By the time the treatment mask is applied and the steam begins, most guests are in a state they have not accessed in weeks, sometimes months. Not sleeping. Something quieter than sleep.</p>

<h2>Why Slowness Is Not Indulgence</h2>
<p>We understand the cultural resistance to this. Taking 75 minutes in the middle of a week to lie still and be touched by careful hands — it can feel like something you have not earned, or something that belongs to a version of your life with fewer responsibilities. The wellness industry has not helped by framing self-care as something frivolous, as bubble baths and scented candles, as a reward you grant yourself after sufficient suffering.</p>
<p>The reality is more clinical than that. The parasympathetic response triggered by sustained therapeutic scalp massage measurably lowers cortisol, reduces inflammatory markers, and improves blood flow to the follicles. The relaxation is not a side effect — it is the mechanism through which the scalp heals. Rushing the process compromises the result. Slowness, in this context, is not a luxury. It is the method.</p>

<h2>What Lather Was Built Around</h2>
<p>Every decision in the design of Lather traces back to this understanding. The appointment schedule is deliberately unhurried — we do not double-book, and we do not abbreviate sessions to accommodate late arrivals (though we will always do our best). The treatment room is private. The lighting is low and warm. There is no background music competing for your attention — just the sound of water and the quiet rhythm of hands working.</p>
<p>We chose <a href="/treatments">Natulique products from Denmark</a> not because they are the trendiest option but because their formulations are clean enough that your scalp can absorb them without fighting off irritants, and because they smell like something real — thyme, rosemary, bergamot — rather than a marketing department's idea of relaxation.</p>
<p>We chose Greenville because it is a city that understands quality without requiring performance. Our clients are professionals, parents, students, retirees — people who have earned the right to spend an hour being genuinely looked after, and who understand that the investment is not extravagant. It is practical.</p>

<h2>The Invitation</h2>
<p>If you have been running at a pace that your scalp, your neck, and your sleep are quietly protesting, consider this: the ritual of slowing down is not something you do after the hard work is finished. It is something you do so the hard work does not break you.</p>
<p>Our <a href="/memberships">membership program</a> exists for people who have decided to make this a regular practice rather than an occasional indulgence. And if you are not sure where to begin, a simple <a href="/faq">look at our FAQ</a> or a conversation when you <a href="/contact">visit us</a> is all it takes. We will take it from there.</p>`,
        featuredImage:
          'https://images.pexels.com/photos/6620851/pexels-photo-6620851.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
        featuredImageAlt: 'Quiet, warm wellness space designed for restoration',
        category: 'Lifestyle',
        tags: ['slowing down', 'wellness philosophy', 'self-care', 'mindfulness', 'luxury ritual'],
        authorName: 'Lather Head Spa',
        publishedAt: new Date('2025-02-12T09:00:00Z'),
        status: 'published',
        seoTitle: 'The Ritual of Slowing Down | Lather Head Spa Greenville NC',
        seoDescription:
          'Genuine restoration requires time you are not usually willing to give yourself. An editorial on the philosophy behind Lather Head Spa in Greenville, NC.',
        readingTime: 6,
      },

      // Article 6
      {
        title: 'Head Spa vs. Traditional Hair Wash: What\'s the Difference?',
        slug: 'head-spa-vs-traditional-hair-wash',
        excerpt:
          'A head spa and a shampoo at the salon both involve water, products, and hands on your scalp—but the similarity ends there. Understanding the difference helps clarify not just what a head spa is, but why it produces results that a standard hair wash simply cannot.',
        content: `<h2>Two Entirely Different Intentions</h2>
<p>The most fundamental distinction between a head spa and a traditional hair wash is not the products used or the duration of the service—it is the intention behind each. A traditional hair wash exists to cleanse. Its purpose is to remove dirt, oil, and product residue from the hair and scalp so that styling can follow. It is preparatory, functional, and by nature, brief.</p>
<p>A head spa exists to treat. It approaches the scalp as a site requiring dedicated therapeutic attention—not just cleansing, but analysis, targeted intervention, and restoration. The hair wash is incidental to the experience; the scalp itself is the focus.</p>

<h2>What a Traditional Hair Wash Involves</h2>
<p>At most salons, a hair wash prior to a service involves a shampoo—sometimes two—followed by a conditioner applied to the mid-lengths and ends. The shampoo is selected for general hair type rather than specific scalp condition. The massaging that occurs is pleasant but brief, typically lasting thirty to sixty seconds and designed primarily to distribute product rather than stimulate tissue.</p>
<p>The result is clean hair. That is genuinely useful, but it is the beginning and end of what the service addresses. No assessment has been made of the scalp's condition. No buildup has been meaningfully cleared. No circulation has been therapeutically stimulated. No nervous system has been invited to release tension.</p>

<h2>What a Head Spa Involves Instead</h2>
<p>A head spa begins before any product is applied—with a consultation and scalp assessment that shapes everything that follows. The cleansing that occurs is professional-grade and selected specifically for your scalp condition. Exfoliation removes the layer of buildup that standard shampooing leaves behind. The massage that follows is sustained, intentional, and structured: it works through the scalp, the occiput, the neck, and often the upper shoulders, using techniques that take years to develop properly.</p>
<p>Treatment serums or masks—chosen based on what your scalp actually needs—are then applied and allowed to work, often with heat or steam to maximize absorption. The entire process is unhurried and methodical, designed to deliver results that accumulate with each subsequent session.</p>
<ul>
  <li><strong>Duration:</strong> A traditional wash takes 5–10 minutes. A head spa session runs 60–90 minutes.</li>
  <li><strong>Depth of cleanse:</strong> Standard shampooing cleans the hair surface. A head spa clarifies the scalp at the follicular level.</li>
  <li><strong>Therapeutic outcome:</strong> A hair wash leaves you with clean hair. A head spa leaves you with a measurably improved scalp environment and a substantially calmer nervous system.</li>
  <li><strong>Personalization:</strong> A hair wash is generic. A head spa is tailored to your specific scalp condition.</li>
</ul>

<h2>When Each Is Appropriate</h2>
<p>A traditional hair wash is appropriate before a cut, color, or styling service. A head spa is appropriate when you want to genuinely address scalp health, reduce stress, or invest in the long-term condition of your hair. They are not competitors—they serve entirely different purposes. Many Lather clients maintain both a regular home cleansing routine and a monthly head spa appointment, understanding that the two play complementary roles.</p>
<p>If you are ready to move beyond clean hair toward genuinely healthy hair, the <a href="/treatments/classic-ritual">Classic Ritual</a> is the clearest illustration of what separates a head spa from everything else. For guests dealing with specific <a href="/scalp-concerns">scalp concerns</a>, we also offer specialized protocols. <a href="/book">book online</a> or <a href="/contact">visit us in Greenville</a> to experience it firsthand.</p>`,
        featuredImage:
          'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
        featuredImageAlt: 'Therapist preparing for a head spa treatment session',
        category: 'Education',
        tags: ['head spa', 'hair wash', 'scalp treatment', 'salon services', 'scalp care comparison'],
        authorName: 'Lather Head Spa',
        publishedAt: new Date('2025-02-19T09:00:00Z'),
        status: 'published',
        seoTitle: 'Head Spa vs. Traditional Hair Wash: What\'s the Difference? | Lather Head Spa',
        seoDescription:
          'Understand the real difference between a head spa and a standard hair wash. See why Greenville, NC clients choose Lather Head Spa for genuine scalp results.',
        readingTime: 5,
      },

      // Article 7
      {
        title: 'Can Scalp Treatments Help You Relax and Reduce Stress?',
        slug: 'scalp-treatments-for-stress-relief',
        excerpt:
          'The connection between scalp treatments and stress relief is not marketing language—it is physiology. The scalp is one of the most nerve-dense areas of the body, and professional scalp massage triggers measurable neurological responses that produce genuine, lasting relaxation.',
        content: `<h2>The Neuroscience of Scalp Massage</h2>
<p>The scalp contains a dense concentration of nerve endings associated with the trigeminal and occipital nerve networks. These nerves are directly connected to the brain and play a significant role in regulating tension, alertness, and the autonomic nervous system's stress response. When these nerve endings are stimulated slowly and deliberately—through professional therapeutic massage—they activate the parasympathetic nervous system, sometimes called the "rest and digest" system, which opposes the stress response and produces a state of calm.</p>
<p>This is not a subtle effect. Clients frequently describe feeling a profound shift within the first several minutes of a scalp massage—a release that is difficult to achieve through other means. For many people, it is among the deepest relaxation experiences they have encountered.</p>

<h2>Stress Lives in the Head and Neck</h2>
<p>Chronic stress tends to manifest physically in predictable locations: the jaw, the shoulders, the neck, and the base of the skull. These are areas that a skilled head spa specialist addresses directly. The occipital muscles at the base of the skull are among the most commonly held areas of tension in the body, contributing to headaches, neck stiffness, and a persistent sense of mental strain.</p>
<p>Professional scalp and neck massage works into these areas in a way that most other modalities do not reach. The release that comes from sustained attention to this region is often described not just as physical relaxation but as mental clarity—a quieting of the internal noise that accompanies prolonged stress.</p>

<h2>The Role of the Environment</h2>
<p>The therapeutic effects of a head spa session are amplified considerably by the environment in which it takes place. At Lather, the setting is designed explicitly to support nervous system downregulation: low, warm lighting, a temperature-controlled space, the absence of unnecessary noise, and an unhurried pace that communicates, without words, that you are not required to be anywhere else.</p>
<p>This environmental intentionality matters. Research on stress recovery consistently demonstrates that the quality of the environment in which relaxation occurs significantly affects both the depth and the duration of the relaxation response. A clinical room with fluorescent lighting and a rushed practitioner produces a categorically different outcome than a sanctuary-like space with a skilled specialist who takes their time.</p>

<h2>Stress, Cortisol, and Hair Health</h2>
<p>There is a direct physiological link between chronic stress and hair health that makes the relaxation dimension of a head spa session doubly important. Elevated cortisol levels—the hormonal signature of chronic stress—have been shown to disrupt the hair growth cycle, pushing follicles prematurely into the shedding phase and contributing to the diffuse thinning that many people notice during prolonged high-stress periods.</p>
<p>By consistently activating the relaxation response through regular head spa sessions, clients are not just managing stress in the moment—they are actively working to protect and support their hair's growth cycle over time. The relaxation benefit and the scalp health benefit are, in this sense, deeply intertwined.</p>
<p>If tension relief is a priority, the <a href="/treatments/gentlemans-recharge">Gentleman's Recharge</a> is our most focused decompression session — 60 minutes of deliberate, skilled pressure. For guests who want a fuller experience with the same emphasis on nervous system recovery, the <a href="/treatments/classic-ritual">Classic Ritual</a> extends the massage and adds scalp treatment layers. <a href="/book">book online</a> or explore our <a href="/treatments">full treatment menu</a>.</p>`,
        featuredImage:
          'https://images.pexels.com/photos/3760262/pexels-photo-3760262.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
        featuredImageAlt: 'Client experiencing deep calm during a therapeutic scalp massage',
        category: 'Wellness',
        tags: ['stress relief', 'scalp massage', 'relaxation', 'wellness', 'cortisol and hair'],
        authorName: 'Lather Head Spa',
        publishedAt: new Date('2025-02-26T09:00:00Z'),
        status: 'published',
        seoTitle: 'Can Scalp Treatments Help You Relax and Reduce Stress? | Lather Head Spa',
        seoDescription:
          'Discover the science behind how scalp treatments reduce stress. Lather Head Spa in Greenville, NC combines therapeutic massage with proven relaxation techniques.',
        readingTime: 6,
      },

      // Article 8
      {
        title: 'Signs It May Be Time for a Professional Scalp Treatment',
        slug: 'signs-you-need-a-scalp-treatment',
        excerpt:
          'Your scalp communicates its needs clearly—if you know how to listen. From persistent flakiness to unexplained shedding, these are the signals that indicate your scalp would benefit from professional attention.',
        content: `<h2>Your Scalp Will Tell You</h2>
<p>One of the challenges of scalp care is that many of its signals are easy to misread or dismiss. Flakiness gets attributed to a shampoo that needs changing. Increased shedding gets written off as stress that will pass on its own. An itchy or tight feeling is addressed with whatever scalp product is within reach. But these are often symptoms of an underlying imbalance that surface-level solutions will not resolve—and that, unaddressed, will continue to worsen over time.</p>
<p>Learning to recognize the signs that your scalp needs professional attention is one of the most useful things you can do for your long-term hair health. The signals are rarely dramatic; they are usually subtle, persistent, and easy to rationalize away—until they are not.</p>

<h2>Common Signs That Professional Care Is Warranted</h2>
<ul>
  <li><strong>Persistent flakiness:</strong> If flaking continues despite regular shampooing and product changes, the scalp's microbiome may be imbalanced in ways that require a professional-grade treatment to address. A head spa's clarifying cleanse and exfoliation protocol can clear the buildup and help restore balance.</li>
  <li><strong>Increased shedding:</strong> Losing more hair than usual—particularly if the shedding has persisted for more than a few weeks—warrants attention. Scalp treatments that stimulate circulation and address follicle health can support recovery, particularly when shedding is related to stress, hormonal changes, or scalp congestion.</li>
  <li><strong>A tight, itchy, or irritated scalp:</strong> These sensations often indicate inflammation, dryness, or a pH imbalance on the scalp. They may be exacerbated by product buildup, hard water, or environmental factors. Professional treatment can provide relief and address the underlying cause more effectively than at-home remedies.</li>
  <li><strong>Hair that has lost its vitality:</strong> When hair that was once full, shiny, and manageable begins to look and feel consistently dull, flat, or difficult to work with, the problem often originates at the scalp rather than in the hair itself. Addressing scalp health typically produces a noticeable improvement in hair quality within a few sessions.</li>
  <li><strong>Visible thinning:</strong> If you are noticing a widening part line, reduced density at the temples, or a general impression of reduced fullness, professional scalp care can support the conditions in which follicles are most likely to remain active and productive.</li>
  <li><strong>It has simply been a long time:</strong> Even in the absence of a specific concern, regular professional scalp care is worthwhile. Prevention is considerably easier than correction, and a well-maintained scalp is far less likely to develop the chronic conditions that require intensive intervention.</li>
</ul>

<h2>What to Do Next</h2>
<p>If any of these signs resonate with your current experience, a professional scalp assessment is a natural next step. At Lather, every appointment begins with exactly that—a thorough look at your scalp's condition, a conversation about your concerns and history, and a treatment plan built around what your scalp actually needs.</p>

<blockquote>
  <p>"After months of stress-related thinning, I tried the Revitalize &amp; Restore. Three sessions in and I can see and feel the difference. The environment is stunning, and the results are real."</p>
  <footer>— Jennifer K., Greenville, NC</footer>
</blockquote>

<p>You do not need to wait until a problem becomes severe. If any of the above sounds familiar, our <a href="/scalp-concerns">scalp concerns guide</a> can help you match symptoms to the right treatment. For thinning or shedding specifically, the <a href="/treatments/revitalize-restore">Revitalize &amp; Restore</a> protocol is where we recommend starting. <a href="/book">book online</a> or <a href="/contact">reach out</a> — every appointment begins with a thorough assessment.</p>`,
        featuredImage:
          'https://images.pexels.com/photos/3738339/pexels-photo-3738339.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
        featuredImageAlt: 'Specialist examining scalp condition under warm lighting',
        category: 'Hair Wellness',
        tags: ['scalp problems', 'hair shedding', 'scalp health signs', 'when to get scalp treatment', 'hair thinning'],
        authorName: 'Lather Head Spa',
        publishedAt: new Date('2025-03-05T09:00:00Z'),
        status: 'published',
        seoTitle: 'Signs It\'s Time for a Professional Scalp Treatment | Lather Head Spa Greenville',
        seoDescription:
          'Persistent flaking, shedding, or dull hair? These are signs your scalp needs professional care. Visit Lather Head Spa in Greenville, NC for expert treatment.',
        readingTime: 5,
      },

      // Article 9
      {
        title: 'Why Greenville Clients Are Falling in Love With Head Spa Treatments',
        slug: 'greenville-head-spa-treatments',
        excerpt:
          'Greenville, NC has a growing wellness community with discerning tastes—and head spa treatments have become one of its most talked-about discoveries. Here is why so many local clients are making Lather a regular part of their self-care routine.',
        content: `<h2>A City With Rising Wellness Standards</h2>
<p>Greenville, North Carolina has seen remarkable growth over the past decade—in its dining scene, its professional community, and increasingly, in the caliber of wellness experiences its residents seek out. This is a community that values quality. Greenville residents travel for exceptional experiences and bring discerning expectations home with them. When something genuinely excellent arrives in the market, word moves quickly.</p>
<p>Head spa treatments entered that environment at exactly the right moment. A wellness category that had previously required a trip to a major metropolitan area was suddenly available locally—and available at a level of quality that required no apology to anything offered in larger markets. The response has been exactly what you would expect from a community that knows the difference.</p>

<h2>What Local Clients Are Saying</h2>
<p>The feedback from Greenville clients reflects a consistent pattern: people arrive curious or somewhat skeptical, and leave as committed regulars. First visits are often prompted by a specific concern—thinning, scalp irritation, or a long-standing desire to try something they had read about. But the return visits are almost always motivated by something less specific and more fundamental: the experience itself.</p>

<blockquote>
  <p>"I've been to many spas across the country, but Lather is in a category of its own. The Classic Ritual was deeply relaxing and my scalp hasn't felt this healthy in years. I walked out genuinely renewed."</p>
  <footer>— Sarah M., Greenville, NC</footer>
</blockquote>

<p>This sentiment—that the experience transcends its category—comes up repeatedly. Guests often describe Lather not as their favorite local spa but as one of the best wellness experiences they have had anywhere. That is not something Greenville clients say lightly, and it is not something we take for granted.</p>

<h2>Why Head Spa Treatments Resonate Here</h2>
<p>There are a few reasons why head spa treatments have found such a receptive audience in Greenville specifically. The city has a significant professional and academic population—people who carry a considerable amount of mental and physical stress, who have the resources to invest in genuine self-care, and who tend to respond well to treatments that deliver verifiable results rather than simply promising them.</p>
<p>There is also a generational dimension. Greenville has a younger-than-average demographic profile in certain neighborhoods, and younger wellness consumers have grown up with far more information about scalp health, the Japanese beauty tradition, and the importance of treating the scalp as an extension of skincare. For these clients, a head spa is not a novelty—it is something they have wanted access to for some time.</p>

<h2>A Local Experience With No Compromises</h2>
<p>What has perhaps surprised Greenville clients most is the level of quality available without leaving the city. Lather was built with a deliberate intention to match and exceed the standard of what is offered in larger markets—in the caliber of the space, the training of our specialists, the products we use, and the overall experience we provide. The goal was never to be the best head spa in Greenville. It was to be genuinely excellent, full stop.</p>
<p>If you have been curious about what your neighbors have been talking about, the <a href="/treatments/classic-ritual">Classic Ritual</a> is how most Greenville clients begin. We also offer <a href="/memberships">monthly memberships</a> for those who have already decided this is something they want to maintain. <a href="/book">book online</a> or <a href="/contact">plan your first visit</a> — we are in the heart of Greenville, with free parking and a very quiet room with your name on it.</p>`,
        featuredImage:
          'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
        featuredImageAlt: 'Warm, inviting wellness space in eastern North Carolina',
        category: 'Lifestyle',
        tags: ['Greenville NC', 'head spa Greenville', 'local wellness', 'luxury spa NC', 'scalp treatment NC'],
        authorName: 'Lather Head Spa',
        publishedAt: new Date('2025-03-12T09:00:00Z'),
        status: 'published',
        seoTitle: 'Why Greenville NC Clients Love Head Spa Treatments | Lather Head Spa',
        seoDescription:
          'Discover why Greenville, NC residents are making Lather Head Spa a regular wellness ritual. Real results, luxury experience, right here in Eastern NC.',
        readingTime: 5,
      },

      // Article 10
      {
        title: "A Beginner's Guide to Booking Your First Head Spa Experience",
        slug: 'beginners-guide-first-head-spa',
        excerpt:
          'Booking your first head spa appointment should feel exciting, not overwhelming. This straightforward guide walks you through everything you need to know—from choosing the right treatment to what to bring and what to expect when you arrive.',
        content: `<h2>Start With the Right Treatment</h2>
<p>One of the most common questions first-time guests ask is which treatment to choose. The options at a quality head spa are typically differentiated by duration, focus, and the specific scalp concerns they address. If you are coming in without a particular concern—simply curious about the experience and looking for a thorough introduction—a signature or classic treatment is almost always the right starting point. It is comprehensive, it covers the essential elements of a professional head spa experience, and it gives your specialist enough time to assess your scalp and address what they find.</p>
<p>If you have a specific concern—thinning, dryness, scalp sensitivity, or stress-related shedding—let that guide your choice. At Lather, our rituals are designed with distinct protocols for different scalp profiles, and we can help you select the most appropriate option when you book. You are also welcome to call or message us before your appointment if you are unsure. We would rather help you choose correctly than have you guess.</p>

<h2>How to Prepare</h2>
<p>Preparing for your first head spa session is genuinely simple—and far less demanding than preparing for most other beauty services:</p>
<ul>
  <li><strong>Arrive with unwashed hair:</strong> Ideally, do not shampoo your hair the morning of your appointment. Your specialist benefits from seeing your scalp in its natural state, and the professional cleanse that begins your session will be more effective with some natural oil present.</li>
  <li><strong>Avoid heavy product:</strong> Skip dry shampoo, heavy styling products, or scalp oils on the day of your appointment. These can interfere with the initial assessment and cleansing process.</li>
  <li><strong>Dress comfortably:</strong> You will be reclined for much of your session, so wear or bring something you can relax in easily.</li>
  <li><strong>Arrive a few minutes early:</strong> Your first visit will include a brief intake and scalp consultation. Arriving five to ten minutes before your appointment time ensures that consultation does not cut into your treatment time.</li>
  <li><strong>Set an intention to disconnect:</strong> Leave the phone in your bag. The most transformative head spa experiences happen when you are fully present in the room. The outside world will wait.</li>
</ul>

<h2>What to Expect During Your First Visit</h2>
<p>Your first visit will likely exceed your expectations—this is not a guarantee we make lightly. First-time guests almost universally express some version of surprise: at the depth of relaxation they experience, at how different a professional scalp treatment feels compared to anything they have experienced before, and at how tangibly different their scalp and hair feel when they leave.</p>
<p>The consultation at the beginning of your visit is an important part of the experience. Be honest about your scalp history—any concerns, sensitivities, medications that might affect scalp condition, or changes you have noticed recently. The more information your specialist has, the more precisely they can tailor the session to serve you.</p>
<p>During the treatment itself, you are invited to simply receive. You do not need to make conversation. You do not need to be engaging or entertaining. The room, the pace, and the practitioner are all designed to support one thing: your complete restoration.</p>

<h2>After Your Appointment</h2>
<p>Most first-time guests leave their appointment feeling something they struggle to describe accurately—a combination of deep calm, physical lightness, and a heightened awareness of their own wellbeing. This feeling typically lingers for a day or two. In the weeks that follow, you will likely notice improvements in your scalp's texture and your hair's overall condition.</p>
<p>After your session, your specialist may recommend a few simple at-home practices to extend the results. These are always optional and never a sales pitch—just practical guidance from someone who has just spent an hour studying your scalp in detail.</p>
<p>Ready to begin? The <a href="/treatments/classic-ritual">Classic Ritual</a> ($125, 75 min) is our most popular first-time booking — it covers every element of the head spa experience without specializing in any one concern. If you already know what your scalp needs, browse our <a href="/scalp-concerns">concern-to-treatment guide</a> for a more targeted recommendation. And if you have questions beforehand, our <a href="/faq">FAQ</a> covers everything from preparation to cancellation policy. <a href="/book">book your first visit online</a>.</p>`,
        featuredImage:
          'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
        featuredImageAlt: 'Guest settling in for their first head spa experience',
        category: 'Experience',
        tags: ['first head spa', 'beginner guide', 'booking head spa', 'what to expect', 'head spa tips'],
        authorName: 'Lather Head Spa',
        publishedAt: new Date('2025-04-01T09:00:00Z'),
        status: 'published',
        seoTitle: "Beginner's Guide to Your First Head Spa Appointment | Lather Head Spa Greenville",
        seoDescription:
          "Everything first-timers need to know before booking a head spa. Tips, what to expect, and how to prepare—from Lather Head Spa in Greenville, NC.",
        readingTime: 6,
      },
    ],
  });

  // Create testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        clientName: 'Sarah M.',
        testimonialText:
          "I've been to many spas across the country, but Lather is in a category of its own. The Classic Ritual was deeply relaxing and my scalp hasn't felt this healthy in years. I walked out genuinely renewed.",
        rating: 5,
        location: 'Greenville, NC',
        serviceUsed: 'The Classic Ritual',
        isFeatured: true,
      },
      {
        clientName: 'Jennifer K.',
        testimonialText:
          'After months of stress-related thinning, I tried the Revitalize & Restore. Three sessions in and I can see and feel the difference. The environment is stunning, and the results are real.',
        rating: 5,
        location: 'Greenville, NC',
        serviceUsed: 'Revitalize & Restore',
        isFeatured: false,
      },
      {
        clientName: 'Marcus T.',
        testimonialText:
          "The Gentleman's Recharge was exactly what I needed—quiet, focused, completely professional. My scalp feels incredible and I slept better that night than I had in months.",
        rating: 5,
        location: 'Greenville, NC',
        serviceUsed: "Gentleman's Recharge",
        isFeatured: false,
      },
      {
        clientName: 'Amara J.',
        testimonialText:
          "Lather is not just a spa treatment—it's a ritual. Everything from the products to the ambiance tells you that this is different. This is what luxury actually feels like.",
        rating: 5,
        location: 'Greenville, NC',
        serviceUsed: 'Nourish & Fortify',
        isFeatured: true,
      },
    ],
  });

  // Create gallery items
  await prisma.galleryItem.createMany({
    data: [
      {
        imageUrl:
          'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
        altText: 'Luxury scalp treatment in progress at Lather Head Spa',
        caption: 'The Classic Ritual — a complete reset for scalp and spirit',
        category: 'Treatment',
        sortOrder: 1,
        isFeatured: true,
      },
      {
        imageUrl:
          'https://images.pexels.com/photos/3985300/pexels-photo-3985300.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
        altText: 'Serene head spa treatment room at Lather',
        caption: 'A sanctuary designed for complete restoration',
        category: 'Space',
        sortOrder: 2,
        isFeatured: true,
      },
      {
        imageUrl:
          'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
        altText: 'Professional scalp massage technique during head spa session',
        caption: 'Therapeutic scalp massage — where tension is released and circulation restored',
        category: 'Treatment',
        sortOrder: 3,
        isFeatured: false,
      },
      {
        imageUrl:
          'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
        altText: 'Client relaxing during a head spa treatment at Lather',
        caption: 'Every session is reserved exclusively for you',
        category: 'Experience',
        sortOrder: 4,
        isFeatured: false,
      },
      {
        imageUrl:
          'https://images.pexels.com/photos/3985301/pexels-photo-3985301.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
        altText: 'Curated scalp care products used at Lather Head Spa',
        caption: 'Professional-grade treatments selected for your scalp profile',
        category: 'Product',
        sortOrder: 5,
        isFeatured: false,
      },
      {
        imageUrl:
          'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
        altText: 'The refined interior of Lather Head Spa Greenville NC',
        caption: 'Quiet luxury — no noise, no rush',
        category: 'Space',
        sortOrder: 6,
        isFeatured: false,
      },
    ],
  });

  console.log('Database seeded successfully');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
