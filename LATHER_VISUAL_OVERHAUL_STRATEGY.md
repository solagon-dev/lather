# Lather Spa & Wellness
## Visual Overhaul, Content Architecture, UX Strategy, and Implementation Specification

**Document status:** Implementation-ready strategy  
**Project:** `/Users/stonebaldwin/dev/lather`  
**Framework:** Next.js App Router, TypeScript, Tailwind CSS, Framer Motion  
**Primary conversion:** Appointment booking through Vagaro  
**Secondary conversions:** Gift-card purchase, phone/text contact, directions, service education  

---

## 1. Purpose of this document

This document is the source of truth for a complete visual and experiential redesign of the Lather Spa & Wellness website.

The redesign must move Lather away from the recognizable “tasteful beige wellness template” category and toward a bespoke digital experience with the craft, confidence, motion, and storytelling normally associated with premium technology companies, luxury hospitality, and editorial beauty brands.

The final site should feel:

- Premium, private, and genuinely high-end.
- Natural and warm without becoming rustic, bohemian, or overly feminine.
- Modern and technically sophisticated without becoming clinical, cold, or futuristic.
- Sensory and restorative without becoming vague or visually sleepy.
- Editorial rather than template-driven.
- Useful and conversion-oriented without feeling aggressively sales-led.
- Consistent with the physical Lather space, its brass details, warm water, quiet rooms, real people, and relationship-led origin story.

This is not a request to apply a new color palette to the current layouts. It is a structural and visual overhaul: hierarchy, pacing, page composition, navigation, typography, media use, animation, reusable components, and the relationship between content must all be reconsidered.

At the same time, the redesign must preserve the project's established business facts, SEO routes, structured data, existing copy sources, accessibility work, static rendering model, and Vagaro integration.

---

## 2. The concise creative brief

### The positioning

**A modern scalp-health and whole-body wellness destination, presented with the precision of a wellness technology company and the atmosphere of a private luxury retreat.**

### The visual formula

- **40% Remedy Place:** designed hospitality, architectural composition, cinematic restraint, quiet confidence.
- **25% Aman:** true luxury pacing, negative space, immersive location photography, minimal selling.
- **20% Aesop and Monastery:** editorial beauty language, intelligent typography, tactility, nature without cliché.
- **15% Seed:** clear systems thinking, contemporary information design, motion, and science-led storytelling.

Reference links:

- Remedy Place: https://www.remedyplace.com/
- Remedy Place design case study: https://www.almostalways.com/projects/remedy-place
- Aman Wellness: https://www.aman.com/wellness
- Aesop: https://www.aesop.com/
- Monastery: https://monasterymade.com/
- Seed: https://seed.com/
- Susanne Kaufmann: https://www.susannekaufmann.com/pages/about-susanne
- Othership, for experience storytelling rather than palette: https://www.othership.us/

These are not templates to copy. Their role is to establish a standard of craft and identify specific behaviors Lather should translate into its own voice.

### The emotional sequence

The site should make a visitor feel, in order:

1. **Intrigued:** “This is not another local spa website.”
2. **Oriented:** “I understand what Lather is and why it is different.”
3. **Seen:** “There is a path for my concern, my goals, or the kind of care I want.”
4. **Reassured:** “The people, process, credentials, reviews, and environment feel trustworthy.”
5. **Desirous:** “I want to experience this space.”
6. **Confident:** “I know what to book and what will happen next.”

---

## 3. Non-negotiable project truths

Implementation must begin by reading the current repository rather than treating this document as a substitute for the code.

The following facts and constraints are non-negotiable:

1. Business name, address, phone, hours, maps link, geo data, booking links, and gift-card links come from `src/lib/business.ts`. Do not duplicate or hard-code them in components.
2. Head-spa ritual names, prices, durations, inclusions, add-ons, FAQs, and treatment details come from `src/lib/data.ts`.
3. Spa and Wellness pillar content comes from `src/lib/menu.ts`.
4. The five-stage head-spa experience comes from `src/lib/experience.ts`.
5. Blog articles remain in `src/lib/blog.ts` unless a deliberate content-model refactor keeps the same data and static route behavior.
6. City and catchment facts remain in `src/lib/locations.ts`.
7. Booking and gift-card transactions continue externally through Vagaro. Do not build a local checkout, appointment database, or fake booking interface.
8. The site remains statically renderable. Avoid unnecessary server APIs, databases, authentication, or new external services.
9. Existing schema builders, canonical URLs, metadata behavior, sitemap behavior, and redirects must be preserved.
10. Existing routes must not be removed merely to simplify navigation. Several routes serve search intent even when they should not appear in the primary navigation.
11. The worktree already contains user changes. Preserve them. Do not reset, revert, or overwrite unrelated work.
12. Do not invent missing service prices, provider biographies, credentials, reviews, customer counts, outcomes, treatment availability, policies, or medical claims.
13. The email address in `src/lib/business.ts` is documented as a placeholder pending confirmation. Preserve it unless the user supplies a confirmed address, and call it out in the final implementation report.
14. The broader Spa and Wellness menu is still being finalized. Head-spa pricing is confirmed; other service pricing must not be fabricated.
15. Use Lather's real media in `public/media`. Do not introduce generic stock spa photography or AI-generated replacement images without explicit approval.

---

## 4. Current-state audit

### 4.0 Verified technical baseline

At the time this strategy was written, `npm run build` completed successfully with no TypeScript or route-generation failures. Next.js generated **37 static pages/assets** across the app, including ten journal articles, six city pages, and four service-detail pages. The build emitted only a stale `caniuse-lite`/Browserslist data notice. The README still says “44 routes,” so that number should be corrected during implementation only after reconfirming the final generated route count.

### 4.1 What is already strong

The current site is not bad. It already contains many of the correct ingredients:

- A warm porcelain, ivory, umber, noir, and brass palette.
- Real photography of the founders, interiors, treatments, and equipment.
- Desktop and mobile hero video.
- A clear two-pillar proposition: Spa Experiences and Wellness Services.
- Thoughtful, emotionally intelligent copy.
- Strong practical information: location, parking, hours, durations, price, preparation, aftercare.
- Clear external booking actions.
- A structured concern-led pathway.
- Useful educational content and internal linking.
- Static rendering, metadata, schema, sitemap, redirects, accessibility details, reduced-motion handling, and mobile focus management.
- Sensible single-source-of-truth data files.

The redesign should elevate these strengths rather than discard them.

### 4.2 Why it still feels template-derived

The current visual system repeatedly uses the same familiar wellness motifs:

- Beige backgrounds alternating with dark sections.
- Fraunces plus a neutral sans-serif.
- Centered or split page heroes with arch-topped images.
- Repeated 50/50 two-column layouts.
- Bordered cards arranged in two- and three-column grids.
- Small uppercase kickers with very wide tracking.
- Pill-shaped or bordered tags.
- Identical section padding and reveal behavior across most routes.
- The same dark full-width CTA near the bottom of nearly every page.
- Repeated “image on one side, heading and body on the other” compositions.
- Brass used as the universal shorthand for luxury.

None of these choices is wrong in isolation. The problem is the frequency and predictability of the pattern. Visitors quickly learn the page grammar, and each subsequent section feels like another module from the same website-builder theme.

### 4.3 Visual issues to correct

1. **The content width is too restrained for a cinematic brand.** The current `72rem` maximum makes many sections feel like a polished brochure rather than a premium digital environment.
2. **The arches have become a default container.** One architectural curve can be ownable; repeated arches are now an industry cliché.
3. **Cards dominate.** Luxury experiences should often be presented as editorial compositions, lists, tables, and layered media rather than boxes around everything.
4. **Spacing is uniform rather than composed.** Every section receives a similar amount of vertical air, so the site has consistent polish but limited drama.
5. **The photography is usually contained.** More media should bleed, overlap, crop, anchor sticky narratives, or establish scale.
6. **Motion is primarily reveal-on-scroll and hover zoom.** The redesign needs a small number of more purposeful, narrative interactions.
7. **The serif is attractive but familiar.** Fraunces is common in lifestyle and wellness sites and contributes to the template association.
8. **The mobile hero behaves like a large card.** It is clean and usable, but it could feel more like a branded editorial opening and less like stacked site-builder blocks.
9. **The design signals luxury by decoration.** The next version should signal luxury through art direction, precision, space, crop, typography, and restraint.

### 4.4 Content and UX issues to correct

The content is substantial, but visitors have to understand the site's internal taxonomy before they can use it.

The head-spa journey is distributed across:

- `/services`
- `/services/[slug]`
- `/book`
- `/experience`
- `/what-is-a-head-spa`
- `/scalp-concerns`
- `/faq`
- multiple journal articles

This is good for search coverage but confusing as a customer-facing journey. The same concepts—what a head spa is, the five movements, who it is for, how it differs from a salon wash, pricing, and what to expect—appear in several places.

The solution is not to delete these routes. The solution is to assign each one a clear job and make the primary journey obvious.

Other current content issues:

- The homepage is long and contains several sections that communicate similar benefits.
- “Why Lather,” the introductory split, the two pillars, and the mission copy repeat the same broad positioning.
- Pricing is separated from the service overview, even though price and duration are primary decision criteria for head-spa guests.
- The main navigation's “Head Spa” label currently points to `/experience`, while deeper educational routes compete for the same mental category.
- The Services page has to foreground that broader menu pricing is unfinished. This is honest but interrupts the premium impression.
- Spa services without dedicated pages and Wellness services without confirmed pricing are mixed with fully documented head-spa rituals.
- The home page puts the wellness consultation before the head-spa experience has been fully dramatized, even though head spa is the brand's most distinctive and image-rich acquisition story.
- Testimonials are credible but only three in number. Presenting them as a standard three-card testimonial grid makes the small volume more obvious.
- “Join 1,900+” on Instagram is a volatile claim. It should be dynamically verified, manually confirmed, or removed.
- Several blog articles contain health and hair-growth statements that deserve professional sourcing and legal review before being amplified in visual “proof” modules.

---

## 5. Primary audiences and journeys

The design should support these distinct visitors without making the navigation feel complex.

### 5.1 The head-spa-curious first-time guest

**Question:** What is this, will I be comfortable, and which ritual should I choose?  
**Best path:** Home → Head Spa experience → Compare rituals → Service detail → Vagaro.  
**Required reassurance:** Private environment, consultation included, all hair types, preparation, blowdry/blowout details, price, duration, first-time recommendation.

### 5.2 The concern-led guest

**Question:** Can Lather help with buildup, dryness, tension, sensitivity, damage, or thinning?  
**Best path:** Home or Head Spa → Concern navigator → Recommended ritual → Service detail → Vagaro.  
**Required reassurance:** No self-diagnosis required, no miracle claims, customization occurs during consultation, clear professional/medical boundary.

### 5.3 The wellness client

**Question:** Does this feel credible and personalized rather than trendy or clinical?  
**Best path:** Home → Wellness section within Services → Provider feature → Consultation → Vagaro or phone.  
**Required reassurance:** Provider credential, whole-person approach, private environment, consultation as first step, no invented results or price promises.

### 5.4 The returning guest

**Question:** How quickly can I rebook?  
**Best path:** Persistent Book action → Vagaro.  
**Required reassurance:** Minimal friction; do not force returning guests through storytelling.

### 5.5 The gift buyer

**Question:** How much should I spend and how is it delivered?  
**Best path:** Navigation or footer → Gift Cards → Suggested amounts → Vagaro.  
**Required reassurance:** Digital delivery, redeemable across services, suggested amounts map to confirmed rituals, no invented expiration or fine print.

### 5.6 The regional visitor

**Question:** Is the drive manageable, where do I park, and is it worth it?  
**Best path:** Search → City page or Locations hub → Services/pricing → Directions or booking.  
**Required reassurance:** One real Greenville location, drive time, route, free parking, appointment-only model, honest catchment information.

### 5.7 The research-oriented visitor

**Question:** What is a Japanese head spa, how does it work, and is it different from a scalp massage?  
**Best path:** Organic search → Guide or Journal → Head Spa experience → Ritual comparison → Booking.  
**Required reassurance:** Clear education, readable articles, contextual next steps, citations/legal review for health claims when appropriate.

---

## 6. Conversion and hierarchy model

### 6.1 Primary action language

Use one consistent primary action label across the shell:

**Book an appointment**

Contextual variants are appropriate inside relevant pages:

- Book this ritual
- Book a consultation
- Check availability
- Purchase a gift card
- Get directions

Avoid cycling among “Book Now,” “Book on Vagaro,” “Book Appointment,” and “Reserve” without a reason. The external partner can be explained once near the point of booking; “Vagaro” does not need to lead the button label everywhere.

### 6.2 The three-layer information hierarchy

Every major page should follow this sequence:

1. **Desire:** atmosphere, distinction, emotional promise.
2. **Decision:** services, price, duration, concern, comparison, credentials.
3. **Action:** booking, calling, directions, gift purchase.

Do not open every page with logistics, and do not make a visitor scroll through pure atmosphere before finding essential information.

### 6.3 Trust should be integrated, not placed in one “trust section”

Distribute proof where it matters:

- “Licensed providers” beside wellness services.
- Real reviews beside ritual selection.
- Founder/provider credentials beside consultation CTAs.
- Address, free parking, and appointment-only detail beside location imagery.
- Price and duration beside treatment decisions.
- “First-time recommendation” directly on The Classic Ritual.

---

## 7. Recommended information architecture

### 7.1 Primary desktop navigation

Recommended visible navigation:

1. **Services**
2. **Head Spa**
3. **About**
4. **Journal**
5. **Visit**
6. **Gift Cards** as a quieter utility link if space allows
7. **Book an appointment** as the persistent primary action

“Visit” should link to `/contact`; Locations remains discoverable within Visit/footer and through search.

### 7.2 Services navigation behavior

Desktop may use a restrained editorial dropdown—not a large ecommerce mega-menu—with two columns:

**Spa**

- Head Spa
- Facials
- Massage
- Skin Treatments
- Brows
- Red Light Therapy

**Wellness**

- Wellness Consultation
- Hormone Therapy
- Peptides
- Injectables
- Vitamin Therapy

Footer links can expose the full route inventory. Mobile menu should be simple, large, and linear, with Spa and Wellness service groups visible without tiny accordion targets.

### 7.3 Route roles

Keep the existing route structure, but give each route a single dominant role:

| Route | Primary role | Should appear in primary nav? |
|---|---|---|
| `/` | Brand, orientation, desire, routing | Home via logo |
| `/services` | Complete Spa + Wellness offering overview | Yes |
| `/services/[slug]` | Decision and conversion for a specific confirmed head-spa ritual | Contextual |
| `/experience` | The definitive Head Spa commercial landing page | Yes, as “Head Spa” |
| `/book` | Fast pricing and booking utility hub | CTA destination or utility |
| `/about` | Founder story, philosophy, credentials, space | Yes |
| `/what-is-a-head-spa` | Definitive educational/SEO guide | No; link from Head Spa and footer |
| `/scalp-concerns` | Concern-led recommendation tool | No; feature within Head Spa journey |
| `/gift-cards` | Gift conversion | Utility/nav/footer |
| `/journal` | Editorial authority and education | Yes |
| `/journal/[slug]` | Search education and contextual routing | Contextual |
| `/faq` | Objection handling and practical answers | Footer/contextual |
| `/contact` | Visit, directions, hours, phone, map | Yes, as “Visit” |
| `/locations` | Regional drive-time hub | Footer/search |
| `/locations/[city]` | Honest local search landing pages | Search/contextual |

### 7.4 Do not collapse valuable SEO routes

The educational and location pages should remain indexable and internally linked. Simplify the visible journey through hierarchy, navigation, and cross-links—not by deleting content.

---

## 8. Content strategy and voice

### 8.1 Brand voice

Lather's best existing writing is calm, specific, human, and sensory. Preserve that.

The voice should be:

- Confident, never breathless.
- Warm, never saccharine.
- Intelligent, never academic for its own sake.
- Sensory, but tied to real actions and materials.
- Assured enough to use short sentences.
- Inviting, not exclusive or intimidating.
- Precise around clinical/wellness services.

### 8.2 Copy rules

1. Prefer concrete language: warm water, scalp assessment, therapeutic steam, free parking, 75 minutes.
2. Avoid filler words such as luxurious, elevated, curated, transformative, bespoke, holistic, sanctuary, and journey when the design or details can communicate the idea. Use them only when they add meaning.
3. Do not describe every service as “an experience.” Vary language among ritual, treatment, session, care, appointment, and service where accurate.
4. Do not use medical outcome language unless it is verified, appropriately qualified, and legally safe.
5. Never promise hair regrowth, hormone outcomes, detoxification, improved circulation, reduced cortisol, or other health effects without review.
6. Preserve the current honest language around thinning: thoughtful support, not miracle promises.
7. Keep headings short. Let body copy carry nuance.
8. Use first-person plural selectively. Too much “we believe” copy weakens authority.
9. Do not overuse em dashes, italic phrases, or “not X, but Y” constructions.
10. Keep local SEO terms in metadata, supporting copy, directions, and article context; do not force “Greenville, NC” into every visual headline.

### 8.3 Content deduplication rules

The same facts can appear on multiple routes, but the depth should change by page role:

- Homepage: concise orientation.
- Head Spa page: commercial, visual, and experiential depth.
- What Is a Head Spa guide: historical and educational depth.
- Service detail: decision-specific inclusions, preparation, and FAQ.
- Scalp Concerns: concern-to-ritual mapping.
- FAQ: compact answers and policies.
- Journal: long-form topical depth.

Do not repeat the complete five-movement description on every route. Use a summary where appropriate and link to the definitive Head Spa page.

---

## 9. Visual direction

### 9.1 The core idea: warm precision

The defining tension is between organic sensory material and exact digital structure.

Organic layer:

- Water, steam, skin, hair, botanical product, linen, wood, curved brass, soft shadow.
- Human touch, closed eyes, hands in motion, moments between formal poses.
- Imperfect crops, subtle film texture, warm highlights, deep neutral shadows.

Precision layer:

- Strong grid.
- Clean typographic hierarchy.
- Exact labels, durations, prices, steps, and service metadata.
- Restrained motion.
- Crisp hairlines and controlled spacing.
- Contemporary sans-serif for functional information.

The site should never be all softness. Contrast is what makes the natural material feel premium.

### 9.2 Palette

Retain the recognizable warmth while refining the palette to feel less generically “spa beige.” Suggested working tokens:

```css
--canvas: #F1ECE4;       /* warm mineral plaster */
--paper: #FAF8F3;        /* light reading surface */
--sand: #DCD1C1;         /* muted dividers and quiet fields */
--clay: #B8A38E;         /* secondary material tone, sparingly */
--taupe: #746757;        /* accessible secondary text */
--umber: #554638;        /* supporting copy */
--ink: #28211B;          /* primary text */
--espresso: #15120F;     /* cinematic dark sections */
--bronze: #9A7E58;       /* restrained warm accent */
--bronze-light: #C8AF88; /* dark-background accent */
--moss: #666B58;         /* optional botanical counterpoint, very sparing */
--white: #FFFEFB;
```

Rules:

- Beige is the atmosphere, not the only design idea.
- Use bronze as a fine accent, not for every heading or decorative label.
- Use near-black generously enough to create contrast and premium depth.
- Consider one muted mineral or moss note to prevent the palette from becoming monochrome wedding beige.
- Maintain WCAG AA contrast for all functional text.
- Never place low-contrast taupe text at small sizes merely for elegance.

### 9.3 Typography

The current Fraunces/Figtree pairing should be replaced or materially reworked.

Preferred accessible direction:

- **Display/editorial:** Instrument Serif, regular and italic.
- **Functional/body:** Manrope or Geist/Geist Sans if available cleanly in the project.

Alternative if the brand later licenses fonts:

- Canela or PP Editorial New for display.
- Suisse Int'l, Söhne, or Neue Haas Grotesk for functional typography.

Implementation rules:

- Do not add an unlicensed font.
- Use `next/font` or self-hosted licensed files; avoid render-blocking external font CSS.
- The display serif should feel editorial and sculptural, not rustic.
- The sans-serif should feel contemporary and exact, not friendly-round or corporate.
- Use italic as a rare inflection, not in every headline.
- Reduce the current dependence on very wide letterspacing.

Suggested fluid scale:

```css
--type-display-xl: clamp(4.5rem, 9vw, 9rem);
--type-display-lg: clamp(3.5rem, 7vw, 7rem);
--type-h1: clamp(3.25rem, 6vw, 6rem);
--type-h2: clamp(2.5rem, 4.5vw, 4.75rem);
--type-h3: clamp(1.75rem, 2.6vw, 2.75rem);
--type-body-lg: clamp(1.125rem, 1.4vw, 1.375rem);
--type-body: clamp(1rem, 1.05vw, 1.125rem);
--type-small: 0.8125rem;
--type-label: 0.6875rem;
```

Large editorial headlines may use line heights from `0.9` to `1.02`. Body copy should remain highly readable around `1.55` to `1.7`.

### 9.4 Grid and width

- Expand the visual canvas from `72rem` to approximately `90rem–96rem` for major compositions.
- Maintain a narrower `42rem–48rem` reading measure for body copy and journal content.
- Use a 12-column desktop grid, 6-column tablet grid, and 4-column mobile grid.
- Default gutters: 24px mobile, 40px tablet, 56–72px desktop.
- Let select media bleed to the viewport edge while text remains aligned to the grid.
- Use deliberate asymmetry: 5/7, 4/8, 7/5, and offset compositions rather than constant 1/1 splits.
- Avoid centering every heading. Centering should be reserved for moments of pause or ceremony.

### 9.5 Spacing and rhythm

Use a broad spacing scale and compose each section individually:

`4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128, 160, 200`

Luxury pacing requires contrast:

- Some sections should be vast and quiet.
- Some decision sections should be compact and information-dense.
- Do not apply one `section-pad` utility to every major block.
- Use whitespace to create hierarchy, not simply to make every section large.

### 9.6 Shape language

- Remove arch framing as the default treatment for images.
- Keep one restrained reference to the physical arch faucet—perhaps in the Head Spa hero or a single mask transition.
- Most media should use square edges or very subtle radii, approximately 0–8px.
- Avoid generic `rounded-xl` containers and pill chips.
- If an organic mask is used, it should feel custom and site-specific rather than borrowed from a spa template.

### 9.7 Borders, surfaces, and depth

- Use 1px hairlines in warm ink at 10–18% opacity.
- Prefer structure created by alignment and whitespace over boxes.
- Avoid drop shadows on normal cards.
- Use subtle shadow only for fixed navigation, floating booking interfaces, or layered photography where spatial depth is intentional.
- Keep grain extremely subtle and primarily on large photographic/dark fields. The current visible grain overlay should not appear on every dark section.
- Introduce material depth through real imagery rather than CSS texture tricks.

### 9.8 Buttons and links

Primary button:

- Solid espresso or paper depending on surface.
- Medium height, not oversized.
- Compact horizontal label; no excessive 0.28em tracking.
- Subtle arrow or directional movement may appear on hover.

Secondary action:

- Text link with an animated baseline or small directional icon.
- Avoid outlining every secondary action as another button.

Rules:

- One visually dominant action per section.
- Avoid two equal-weight buttons unless the choices are truly equivalent.
- Touch targets remain at least 44px.
- Focus styles must be clear.

### 9.9 Photography and media art direction

Use the current real assets with more deliberate roles.

#### Primary media roles

- `public/media/video/hero-welcome.mp4` and mobile counterpart: homepage atmosphere.
- `public/media/gallery/treatment-waterfall.webp`: iconic Head Spa/water image.
- `public/media/experience/step-*`: process sequence.
- `public/media/founders/*`: relationship-led story.
- `public/media/gallery/*`: physical environment and materials.
- `public/media/treatments/*`: ritual selection and detail pages.
- `public/media/scalp-concerns/*`: concern-led guidance.

#### Art-direction rules

- Favor large crops that make water, hands, tools, texture, and light feel tactile.
- Avoid reusing the same image in neighboring sections or using the same image role on several pages.
- Use portraits of staff/providers where credibility is the purpose; use treatment detail where desire is the purpose.
- Do not cover every photo with dark overlays.
- Do not place text over visually busy images unless contrast and crop are deliberately art-directed.
- Preserve responsive focal points with explicit object-position data when needed.
- Use video sparingly: one hero loop and one or two narrative moments are stronger than constant autoplay.
- Every video must be muted, looped only where appropriate, pauseable or nonessential, and accompanied by a poster and reduced-motion fallback.

#### Existing media limitation

Most current stills are portrait-oriented. This is useful for editorial grids but limiting for broad cinematic sections. The redesign should use portrait assets confidently rather than forcing every photo into a landscape card. Where wide fields are required, use available 1920×1280 assets, video, layered portrait compositions, or negative space; do not excessively upscale or crop faces.

### 9.10 Motion language

Motion should feel like breath, water, and attention—not like a startup landing-page effects reel.

Core behaviors:

1. Slow masked media reveal on key entrances.
2. Gentle text baseline or line reveal for large display headlines.
3. Sticky narrative progression for the five Head Spa movements on desktop.
4. Controlled image scale or crop shift, no more than 2–4% for most motion.
5. Service list hover that changes contextual media rather than enlarging a card.
6. Subtle navigation transformation after scrolling.
7. Mobile booking bar that appears only after the initial decision content.

Timing:

- Micro-interactions: 180–300ms.
- Navigation and overlays: 400–600ms.
- Editorial reveals: 700–1100ms.
- Ambient media movement: 8–20 seconds.
- Easing: restrained custom ease such as `cubic-bezier(0.22, 1, 0.36, 1)`.

Do not:

- Animate every paragraph.
- Use bouncing, spring-heavy UI for normal navigation.
- Create scroll-jacking.
- Hide essential content behind hover.
- Make mobile users wait through sequential reveals.
- Depend on motion to understand the content.

Respect `prefers-reduced-motion` everywhere.

---

## 10. Global shell and component strategy

### 10.1 Navigation

Desktop:

- Transparent over the homepage hero.
- Becomes a warm translucent or solid paper bar with a fine rule after scroll.
- Lather wordmark remains understated.
- Primary links are legible and compact.
- Book action is clear but not a large ecommerce button.
- Services can reveal a restrained two-pillar menu.

Mobile:

- Full-screen espresso menu.
- Large editorial link labels.
- Spa and Wellness sub-links visible in an organized hierarchy.
- Book action anchored near the bottom.
- Preserve existing focus trap, Escape behavior, body scroll lock, and visibility/tab-order accessibility.

### 10.2 Replace the universal PageHero

The current `PageHero` makes interior pages too visually similar. Replace it with a small set of purposeful hero variants:

1. **Cinematic hero:** full-bleed media, for homepage and Head Spa.
2. **Editorial split hero:** asymmetric image/text, for About and Gift Cards.
3. **Utility hero:** compact typographic masthead, for Book, FAQ, Contact, and Locations.
4. **Article hero:** category, date, title, dek, and optional editorial image.
5. **Service-detail hero:** ritual metadata and art-directed treatment image.

These variants should share typography and alignment primitives without sharing one rigid composition.

### 10.3 Proposed reusable components

Names are suggestions; use the project naming style.

- `SiteHeader`
- `EditorialMenu`
- `CinematicHero`
- `EditorialHero`
- `UtilityHero`
- `ArticleHero`
- `ServiceDetailHero`
- `TrustLine`
- `SectionIntro`
- `EditorialSplit`
- `ServiceIndex`
- `ServiceIndexRow`
- `RitualSelector`
- `RitualComparison`
- `RitualProgress`
- `ConcernNavigator`
- `ProviderFeature`
- `ReviewFeature`
- `SpaceGallery`
- `JournalRail`
- `VisitPanel`
- `ConciergeCTA`
- `MobileBookingBar`
- `SiteFooter`

### 10.4 Component anti-patterns

- Do not convert the whole website into a generic library of interchangeable cards.
- Do not create a `Section` component with dozens of boolean props.
- Do not make every component a client component simply to animate it.
- Keep content and business data in the existing data modules rather than embedding long arrays in visual components when reuse is expected.
- Avoid one-off magic numbers scattered across JSX; use a coherent token system.

---

## 11. Page-by-page content and layout specification

## 11.1 Homepage `/`

### Objective

Establish the brand, communicate the unique combination of Spa and Wellness, dramatize Head Spa as the signature, route visitors by intent, establish trust, and make booking effortless.

### Recommended section order

#### 1. Cinematic opening

- Full-bleed desktop video.
- On mobile, use the mobile video as immersive background or a full-width edge-to-edge frame; avoid presenting it as a generic rounded card.
- Keep the current core statement, but refine line breaks and restraint:
  - “Where modern wellness meets elevated self-care.”
- Supporting line should identify Greenville and the two-part offer in one concise sentence.
- Primary CTA: Book an appointment.
- Secondary text link: Explore services.
- Integrate a small trust line: Greenville, NC / Licensed providers / By appointment.
- Do not add star rating as a floating badge in the hero or immediate next image. It feels like a template conversion widget.

#### 2. The Lather proposition

- One strong editorial statement rather than the current long “Two kinds of care” split plus separate Why Lather grid.
- Explain: restorative Spa care and personalized Wellness care, in a setting that does not feel clinical.
- Use an asymmetrical composition with one large image and concise copy.
- Link to About or Services—not both.

#### 3. Two modes of care

- Present Spa and Wellness as two oversized editorial entries, not matching bordered cards.
- A desktop service index may change the contextual image as the user moves between items.
- Spa should lead with Head Spa and include facials, massage, skin, brows, red light.
- Wellness should lead with consultation and include the current confirmed names only.
- Be transparent about consultation-led booking without putting an unfinished-menu disclaimer at center stage.

#### 4. Signature Head Spa ritual

- This is the visual centerpiece of the homepage.
- Use water imagery or treatment video.
- Introduce the five movements in abbreviated form: Consult / Cleanse / Massage / Treat / Renew.
- Use one interactive progression or horizontal label sequence; do not render five equal cards.
- Link to the definitive `/experience` page.
- Include a compact comparison or “Find your ritual” entry with confirmed price/duration range.

#### 5. Concern-led entry

- Use a compact concern navigator rather than six image cards.
- Example labels: Buildup / Dryness / Tension / Sensitivity / Damage / Thinning.
- Selecting or hovering shows a brief explanation and recommended ritual.
- Mobile uses accessible disclosure or a simple stacked list.
- Link to `/scalp-concerns` for the full guide.

#### 6. Wellness consultation feature

- Feature Stacia Friend, CNM, with credential clearly visible.
- Explain the consultation as the starting point, not just another service.
- Use provider/founder imagery, not a generic treatment image.
- Primary contextual CTA: Book a consultation.
- Secondary link: Explore Wellness services.

#### 7. Proof through one large review

- Do not use a standard three-card review grid.
- Feature one large quote at a time with the other two available through a restrained accessible carousel or below as smaller excerpts.
- Keep “Verified Vagaro review.”
- Do not imply more reviews than the data contains.
- Link to Vagaro profile only if appropriate and available.

#### 8. Founder and place

- Combine the current founder teaser and Step Inside gallery into one relationship-and-place section.
- One founder photograph, one concise story, and a staggered interior material strip.
- The purpose is to show that Lather is local, real, and designed by people—not to repeat the full About page.

#### 9. Journal rail

- Feature two or three educational pieces, chosen by visitor utility rather than only recency:
  - What is a Head Spa?
  - Signs Your Scalp Needs Professional Care
  - Head Spa and Stress Relief or How Often to Book
- Keep this compact.

#### 10. Visit and booking close

- Address, hours summary, free parking, a strong interior/exterior image, directions.
- End with a premium concierge-style booking statement.
- The final CTA should not repeat the exact same dark `BookCTA` composition used everywhere else.

### Homepage content to reduce or merge

- Merge “Two kinds of care” and much of “Why Lather.”
- Keep differentiators, but integrate them as evidence within relevant sections.
- Remove the current decorative marquee unless it is redesigned into a subtle utility/trust line. An endlessly repeating phrase strip feels trend-led rather than timeless.
- Remove or verify “Join 1,900+” before retaining it.
- Instagram can move to the footer or become a much smaller editorial strip. It should not consume a major homepage section unless social acquisition data justifies it.

---

## 11.2 Services `/services`

### Objective

Offer a complete and understandable overview of Spa and Wellness without forcing unfinished details or making every service look equally mature.

### Recommended structure

1. Compact editorial hero: “Care, in two forms.”
2. Two-tab or anchored switcher: Spa / Wellness. Tabs must be real accessible controls or anchor navigation, not decorative pills.
3. Spa service index with Head Spa visually dominant and other services listed honestly.
4. Head Spa ritual preview with confirmed prices and durations.
5. Wellness service index with consultation as the clear first step.
6. Provider/credential feature.
7. Decision aid: “Not sure where to begin?” with two choices: scalp concern or wellness consultation.
8. Final booking/contact panel.

### Important content handling

- Replace the prominent “full menu and pricing are being finalized” announcement with more polished contextual language:
  - Head Spa rituals: full price/duration and instant booking.
  - Other Spa and Wellness care: availability and treatment plan confirmed through consultation/contact.
- Do not create dedicated URLs for incomplete services unless enough verified content exists.
- Do not invent pricing.

---

## 11.3 Service detail `/services/[slug]`

### Objective

Help someone decide whether this ritual is right for them, understand precisely what it includes, and book with confidence.

### Recommended structure

1. Service-detail hero with name, tagline, price, duration, first-time indicator, image, and Book action visible without scrolling.
2. Brief “Designed for” statement using `whoItsFor` and best-for tags presented as editorial metadata rather than pills.
3. Ritual timeline using `whatToExpect` and select experience imagery.
4. Included list and exact finish type.
5. Before / aftercare as a compact accordion or side-by-side practical panel.
6. Recommended enhancements with price and time.
7. Upgrade comparison only when it is genuinely useful.
8. Treatment-specific FAQ.
9. One review relevant to the service where available.
10. Sticky or repeated contextual Book action.

### Design behavior

- Replace the default arch portrait.
- Use the ritual's assigned image as a large asymmetric or full-height composition.
- Price and duration should be immediately scannable.
- Avoid placing every inclusion in a separate box.
- On mobile, keep price/duration and primary action near the top.

---

## 11.4 Head Spa `/experience`

### Objective

Become the definitive commercial Head Spa page: what it feels like, how it works, which ritual to choose, and how to book.

This should be the most distinctive page on the site.

### Recommended structure

1. Cinematic hero using water/treatment media.
2. Concise definition: scalp care, hair wellness, nervous-system rest; avoid overclaiming.
3. Five-movement sticky story on desktop:
   - Text progression on one side.
   - Associated image/video fixed or crossfading on the other.
   - On mobile, a linear sequence with large media and no sticky complexity.
4. “Find your ritual” comparison using the four confirmed services, price, duration, best for, and finish.
5. Concern navigator linking to `/scalp-concerns`.
6. The private environment and what makes the space different.
7. Practical first-visit information.
8. One strong review.
9. Book action.

### Relationship to educational pages

- This page should not contain the full Japanese origin essay.
- Link to `/what-is-a-head-spa` for education.
- It should not repeat every service-specific FAQ.
- It should answer the commercial questions and let detail routes handle the rest.

---

## 11.5 Book & Pricing `/book`

### Objective

Serve high-intent and returning visitors with the shortest path to price, duration, and booking.

### Recommended structure

1. Compact utility hero, not a large emotional image hero.
2. Immediate ritual table/list above the fold on desktop.
3. Each row includes ritual, best-for line, duration, price, and two actions: details and book.
4. A single clear note explaining that other Spa/Wellness services are scheduled by consultation/contact.
5. Three brief booking steps after the pricing—not before it.
6. Same-day phone note and appointment-only detail.

The current page puts three instructional steps before the decision information. Reverse that order. High-intent visitors came for price and availability.

---

## 11.6 About `/about`

### Objective

Make the business feel human, credible, local, and intentionally designed.

### Recommended structure

1. Editorial founder hero using the strongest group portrait.
2. Origin story with one strong sentence about the gap between spa and clinical wellness.
3. Founder profiles with actual credentials and concise roles. Do not overstate biographies.
4. Mission and principles condensed from the existing five values.
5. Team statement and provider categories.
6. Space gallery focused on materials and atmosphere.
7. Link to Services and Visit; booking is secondary here.

### Content recommendation

The five current values can be reduced to three clearer operating principles:

- Care with intention.
- Results with restoration.
- Expertise without the clinical atmosphere.

Community and education can live in founder/team copy rather than separate value cards.

---

## 11.7 What Is a Head Spa `/what-is-a-head-spa`

### Objective

Remain the definitive educational guide and search landing page.

### Recommended structure

1. Article-style hero with concise dek and a treatment image.
2. Sticky or compact table of contents on desktop.
3. Japanese origins.
4. Head Spa vs salon wash comparison.
5. What happens in a session, summarized and linked to `/experience`.
6. Benefits and boundaries with careful claims language.
7. Why it has become popular.
8. First-visit FAQ.
9. Contextual ritual recommendation and CTA.

### Content issue

This page currently imports a blog article with the same subject and also has a separate journal route for `what-is-a-head-spa`. Keep both URLs only if their intent stays distinct:

- `/what-is-a-head-spa`: definitive evergreen guide and conversion bridge.
- `/journal/what-is-a-head-spa`: either redirect/canonicalize to the guide, or substantially differentiate it as an editorial piece.

Do not allow two near-identical pages to compete indefinitely. Review current canonical behavior and choose one primary URL. Preserve redirects and SEO carefully.

---

## 11.8 Scalp Concerns `/scalp-concerns`

### Objective

Help users recognize their concern without implying diagnosis and route them to an appropriate ritual.

### Recommended structure

1. Compact hero: “Start with what you feel.”
2. Persistent disclaimer/reassurance: visitors do not need to diagnose themselves; every ritual starts with assessment.
3. Interactive concern index on desktop with one changing media panel.
4. Linear accessible list on mobile.
5. Each concern includes symptoms, what Lather can address, limits, recommendation, duration, and price.
6. Special caution on thinning, irritation, dermatitis-like symptoms, and hair loss: advise professional medical assessment where appropriate; do not make diagnostic or regrowth claims.
7. Comparison link and booking action.

Replace the current six-card grid with a single editorial decision interface.

---

## 11.9 Gift Cards `/gift-cards`

### Objective

Make gifting feel premium, simple, and immediate.

### Recommended structure

1. Editorial split hero with gift detail photography.
2. Immediate Buy Gift Card action.
3. Three-step explanation in a compact horizontal/vertical sequence.
4. Suggested confirmed amounts mapped to Blowout, Classic, and Luxe.
5. Clarify that any amount works toward any service.
6. Gift-worthy review or short emotional proof if available.
7. Repeat purchase action.

Do not use overly clever copy at the expense of clarity. The current “sorry, I have plans” line can remain as campaign copy, but the page title and first action must immediately say Gift Cards.

---

## 11.10 Journal `/journal`

### Objective

Present Lather as an informed guide and create a sophisticated editorial layer, not an SEO article grid.

### Recommended structure

1. Editorial masthead.
2. One lead story with large image.
3. Topic filters or grouped sections: Head Spa 101 / Scalp Health / Wellness / Ritual & Lifestyle.
4. Article list with strong typographic hierarchy; cards only where imagery materially adds value.
5. Compact newsletter/social invitation only if there is a real collection mechanism. Do not add a fake email form.

The ten existing articles are useful. Their titles, categories, read times, and dates should be preserved. Review claims within articles before elevating them into callout statistics.

---

## 11.11 Journal article `/journal/[slug]`

### Objective

Provide an excellent reading experience and route readers toward relevant care without interrupting the article.

### Recommended structure

1. Article hero with category, date, read time, title, intro.
2. Optional image placed after title or as an art-directed side panel.
3. Reading column around 680–760px.
4. Sticky table of contents only for longer pieces and only on desktop.
5. Strong h2 hierarchy, generous paragraph rhythm, pull quotes used rarely.
6. One contextual “Related care” panel after a relevant section, not after every section.
7. Conclusion, related articles, and a restrained booking CTA.

Avoid surrounding long-form content with continuous animation.

---

## 11.12 FAQ `/faq`

### Objective

Answer practical objections quickly.

### Recommended structure

1. Compact utility hero.
2. Search/filter is optional; only build it if lightweight and accessible.
3. Group questions into:
   - About Lather
   - Booking and first visit
   - Head Spa rituals
   - Wellness consultations
   - Visit and policies
4. Use one accordion system with clear focus and open states.
5. Link to service-detail pages rather than repeating entire treatment narratives.
6. Contact prompt at the end.

The current page repeats every ritual FAQ in long sequence. Grouping and contextual linking will reduce visual fatigue.

---

## 11.13 Contact / Visit `/contact`

### Objective

Make the visit effortless and reassuring.

### Recommended structure

1. Compact Visit hero with interior detail.
2. Address, phone, email, Instagram, hours, appointment-only, and parking above the fold.
3. Primary actions: Get directions / Call or text.
4. Map adjacent to practical details.
5. Route guidance from ECU/downtown and Winterville.
6. Three relevant first-visit questions.
7. Booking action.

Keep “free parking at the door” prominent. This is a concrete luxury/convenience detail.

---

## 11.14 Locations `/locations`

### Objective

Answer “how far is Lather from me?” honestly and efficiently while supporting regional search.

### Recommended structure

1. Compact location statement emphasizing one Greenville location.
2. Drive-time distance ladder/table immediately.
3. Small map or directional visualization only if it remains lightweight and accurate.
4. “What is worth the drive” with links to Head Spa, Services, Pricing, and Visit.
5. Booking action.

The current table is the correct information design. Preserve that decision. Refine its typography and mobile behavior rather than replacing it with city cards.

---

## 11.15 City landing page `/locations/[city]`

### Objective

Provide honest local context, directions, services, proof, and booking without doorway-page copy.

### Recommended structure

1. City-specific utility hero with drive time.
2. Route and parking facts.
3. One concise explanation of the single Greenville location.
4. What visitors can book, with links to authoritative service pages.
5. Head Spa prices in a compact table.
6. One real rotated testimonial.
7. Nearby cities as text links.
8. First-time guide and booking action.

Preserve the current consolidation model and `hasPage` logic. Do not generate more thin pages.

---

## 11.16 404 `/not-found`

### Objective

Offer a branded recovery path.

Recommended content:

- Short line such as “A quiet turn in the wrong direction.”
- Links to Services, Head Spa, Visit, and Book.
- No complex animation.

---

## 12. Content migration matrix

| Existing content | New primary home | Secondary use |
|---|---|---|
| Brand tagline and Greenville positioning | Homepage hero | Footer, metadata |
| “Two kinds of care” explanation | Homepage proposition | Services intro |
| Spa and Wellness pillars | Services | Homepage preview |
| Five Head Spa movements | `/experience` | Abbreviated homepage and guide summary |
| Why Lather items | Integrated into relevant sections | About principles |
| Stacia consultation feature | Services/Wellness | Homepage preview |
| Founder story | About | Homepage teaser |
| Three reviews | Homepage/service context | Location rotation |
| Space gallery | About | Homepage teaser, Visit detail |
| Head Spa ritual prices | Book and service detail | Services, Experience, city pages |
| Treatment preparation/aftercare | Service detail | FAQ summary |
| Head Spa origins and comparison | What Is a Head Spa guide | Journal links |
| Concern mapping | Scalp Concerns | Homepage/Experience preview |
| General FAQ | FAQ | Contextual excerpts |
| Treatment FAQs | Service detail | Grouped FAQ links |
| Drive-time data | Locations | City pages |
| Journal articles | Journal/article routes | Homepage rail and contextual links |

---

## 13. Responsive strategy

### 13.1 Mobile is not a compressed desktop site

The current mobile experience is clean, but the redesign should make it feel more immersive and decisive.

Mobile rules:

- Headline size remains bold but line lengths are controlled.
- Hero media should feel edge-to-edge or intentionally inset—not like a generic rounded card.
- Show one primary CTA above the fold; secondary actions become text links when possible.
- Keep price, duration, and first-time recommendation near the top of service pages.
- Convert sticky desktop narratives into clear linear sequences.
- Replace hover-dependent service/concern interactions with native buttons, disclosures, or links.
- Avoid horizontal scrolling except for deliberately labeled, accessible content rails; core information must remain available without it.
- Mobile booking bar should not obscure content, browser controls, or footer actions.
- Respect safe-area insets.
- Keep the full mobile menu keyboard accessible.

### 13.2 Breakpoint intent

- `<640px`: single-column editorial, full content clarity.
- `640–899px`: larger type, 2-column supporting grids where useful.
- `900–1199px`: transitional layout; do not force desktop sticky interactions early.
- `1200px+`: full 12-column compositions and sticky narratives.
- `1600px+`: preserve readable text measures while allowing media to scale.

Test at minimum:

- 360×800
- 390×844
- 768×1024
- 1024×768
- 1280×720
- 1440×900
- 1728×1117 or similar large desktop

---

## 14. Accessibility requirements

The redesign must meet or exceed the current accessibility quality.

Required:

1. Semantic headings with one h1 per page.
2. Visible keyboard focus for every control.
3. Skip link.
4. Accessible mobile navigation with focus trap, Escape close, and removed tab order while closed.
5. Accordions with proper button semantics and `aria-expanded`.
6. Carousels or selectors usable without drag or hover.
7. Paused/reduced motion behavior under `prefers-reduced-motion`.
8. Decorative imagery uses empty alt; meaningful imagery has specific alt.
9. Text contrast meets WCAG AA.
10. Touch targets are at least 44×44px.
11. No essential copy inside images.
12. No autoplay audio.
13. Videos are muted and nonessential, with posters.
14. Tables retain captions and header relationships.
15. Route changes and menu behavior do not strand keyboard focus.
16. Avoid ultra-small uppercase text for important content.
17. Test at 200% browser zoom and with long content wrapping.

---

## 15. Performance and technical quality

The visual ambition must not produce a slow site.

### Targets

- LCP under 2.5 seconds on a realistic mobile connection where possible.
- CLS under 0.1.
- INP under 200ms.
- No layout shifts caused by images or fonts.
- No large animation library usage beyond the existing Framer Motion unless clearly justified.
- No unnecessary client-side hydration for static sections.

### Implementation requirements

- Use `next/image` with correct `sizes` values and explicit responsive intent.
- Priority-load only true above-the-fold hero media.
- Lazy-load below-the-fold video and imagery.
- Keep existing mobile and desktop video variants.
- Consider whether the 21.5-second desktop hero video should be compressed further, but do not degrade it without visual inspection.
- Use server components by default.
- Isolate interactive selectors, navigation, video controls, and motion orchestration in focused client components.
- Avoid rendering hundreds of offscreen animated elements.
- Do not add heavy smooth-scroll or scroll-jacking libraries.
- Preserve reduced-motion fallbacks.
- Preserve the static deployment model and successful production build.

---

## 16. SEO, structured data, and content safety

### Preserve

- Route-specific metadata.
- Root metadata behavior that allows page-specific social titles/descriptions.
- Canonical paths.
- LocalBusiness and Organization schema.
- Breadcrumb schema.
- Service schema.
- FAQ schema only for FAQs visibly rendered on the page.
- Article schema where currently used.
- Sitemap and robots behavior.
- Redirects for legacy local landing pages.
- Honest `hasPage` catchment logic.

### Review

- The overlapping `/what-is-a-head-spa` and `/journal/what-is-a-head-spa` content/canonical strategy.
- Claims about detoxification, follicle stimulation, cortisol, hair thickness, hair growth, DHT, dermatitis, and medical outcomes.
- Wellness service wording for regulatory and provider-scope accuracy.
- Any new structured data before adding it.

Do not add fake aggregate ratings, invented review counts, unsupported medical schema, or location pages for cities that do not meet the existing content threshold.

---

## 17. Implementation sequence

Complete the redesign in this order so the system remains coherent.

### Phase 1: Audit and safeguard

- Read the entire project and this document.
- Inspect `git status` and preserve current changes.
- Run the current build and note baseline warnings/errors.
- Inventory every route and verify the current static route count.
- Inspect all media dimensions and focal points.
- Identify shared copy that should remain in data modules.

### Phase 2: Foundation

- Refactor Tailwind tokens for palette, type, spacing, width, and motion.
- Replace or reconfigure the font pairing.
- Rewrite global utilities so the design no longer depends on one universal `section-pad` and universal arch.
- Establish container/grid primitives and readable content measures.
- Preserve focus, selection, and reduced-motion behavior.

### Phase 3: Global shell

- Redesign Navbar into `SiteHeader` behavior.
- Build the Services menu if appropriate.
- Redesign the mobile menu without regressing accessibility.
- Redesign footer hierarchy.
- Rework mobile booking bar.
- Create the new hero variants and concierge CTA system.

### Phase 4: Homepage and signature Head Spa page

- Build the homepage first to validate the full visual language.
- Build `/experience` second because it carries the richest signature interaction.
- Verify desktop and mobile before propagating the system.

### Phase 5: Conversion routes

- `/services`
- `/services/[slug]`
- `/book`
- `/scalp-concerns`
- `/gift-cards`

### Phase 6: Brand and utility routes

- `/about`
- `/contact`
- `/faq`
- `/not-found`

### Phase 7: Editorial and SEO routes

- `/what-is-a-head-spa`
- `/journal`
- `/journal/[slug]`
- `/locations`
- `/locations/[city]`

### Phase 8: QA and refinement

- Run TypeScript/build.
- Test all route links.
- Confirm every external link.
- Test keyboard navigation and reduced motion.
- Test the specified viewport sizes.
- Inspect screenshots for every major page on desktop and mobile.
- Check text contrast.
- Check image crops and loading.
- Verify schema and metadata remain present.
- Verify no content facts were invented.
- Remove dead components and unused styles only after confirming they are truly unreferenced.

---

## 18. Acceptance criteria

The redesign is complete only when all of the following are true.

### Brand and visual quality

- The site no longer looks like a standard spa/Squarespace template.
- The visual system feels premium, contemporary, and specific to Lather.
- Beige/natural aesthetics remain, but contrast and precision keep them from feeling generic.
- At least four distinct page composition types are visibly present.
- Arches, cards, borders, kickers, and dark sections are used intentionally rather than universally.
- Real photography is the visual foundation.
- Typography feels editorial and high-end.

### UX and content

- A first-time visitor understands Spa versus Wellness within the opening homepage journey.
- A Head Spa visitor can reach ritual prices, duration, detail, and booking easily.
- A Wellness visitor understands that a consultation is the correct starting point.
- Returning guests can reach Vagaro immediately.
- Gift buyers can understand amount, delivery, and redemption without ambiguity.
- Regional visitors can find distance, route, parking, and directions quickly.
- Pages have distinct roles and no longer repeat full blocks unnecessarily.
- No unfinished service price or unverified fact is invented.

### Technical

- `npm run build` succeeds.
- All intended static routes generate.
- No broken internal links.
- No missing images.
- No TypeScript errors.
- No obvious console errors.
- Metadata, structured data, sitemap, and redirects remain correct.
- Mobile navigation and booking actions work.
- Reduced-motion behavior works.
- Core pages are visually inspected at desktop and mobile sizes.

### Accessibility

- Keyboard-only navigation works across the site.
- Focus is visible.
- Accordion/menu states are announced.
- Contrast is compliant.
- Images and video have correct alternatives.
- No key experience depends on hover, drag, or animation.

---

## 19. Explicit “do not” list

Do not:

- Turn the redesign into a cosmetic token swap.
- Copy Remedy Place, Aman, Aesop, Monastery, or Seed directly.
- Add generic stock photography.
- Add fake 3D product renders, glowing orbs, liquid-metal effects, or obvious AI-tech visual tropes.
- Add gradients merely to make the site feel technological.
- Add glassmorphism everywhere.
- Use pill-shaped controls as the default.
- Put every concept inside a card.
- Use arches as the default image mask.
- Center all headings.
- Animate every section.
- Create scroll-jacking or an intro splash screen.
- Hide pricing and duration behind interaction.
- Build a fake booking interface.
- Invent reviews, follower counts, service prices, provider information, policies, claims, or results.
- Remove SEO pages simply because they are not in the primary navigation.
- undo or overwrite existing user changes.
- Replace accessible behavior with prettier but inaccessible interactions.
- Introduce a heavy dependency when native CSS, React, or the existing stack can solve the problem.

---

## 20. Coding-agent execution brief

When implementing this strategy, act as a senior design engineer and product designer—not as a component factory.

### Required working method

1. Read this entire file.
2. Read the repository's `README.md`, `package.json`, Tailwind config, global CSS, every route, every component, and every content module before making broad changes.
3. Inspect the current rendered site and the supplied media.
4. Check `git status` and preserve existing changes.
5. Make a route-by-route implementation plan.
6. Implement the foundation and shell before page rewrites.
7. Reuse the current data sources; improve structure rather than duplicating content.
8. Use the real assets already in `public/media`.
9. Make reasonable design decisions independently when this specification leaves room, but do not invent business facts.
10. Test continuously and finish the whole redesign rather than stopping after the homepage.

### Expected output from the coding agent

- A complete implementation across all current routes.
- A concise final summary of visual and structural changes.
- A list of any unresolved content/business questions.
- Build/test results.
- A note identifying any claim, copy, or external fact that needs owner verification.
- No commit or push unless explicitly requested.

### Judgment standard

If a choice is between adding another decorative flourish and improving hierarchy, choose hierarchy.

If a choice is between copying a reference and expressing Lather's real materials, people, and process, choose Lather.

If a choice is between more animation and better art direction, choose art direction.

If a choice is between a clever interaction and immediate understanding, choose understanding.

The final site should feel expensive because it is considered—not because it contains more effects.
