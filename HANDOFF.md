# Handoff — Lather site

Written so the next session does not re-derive what took a while to find.

## Current state

Branch `phase-0-business-truth` (not pushed). In November 2026 the site was
rebuilt around the client's printed brochure (`output/brochure-v12`), which is
the source of truth for every name, price, duration and "what's included" line.
The approved mock is direction A, third pass, on the Design canvas.

**Two practices, one front door.**

- **Lather Spa** (`/spa`, `/spa/head-spa`, `/spa/facials`, `/spa/massage`)
  books instantly on Vagaro `latherspa`.
- **Lather Wellness** (`/wellness`, `/wellness/foundations`,
  `/wellness/[slug]`) is Lather Wellness Center PLLC, led by Stacia Friend,
  CNM, booked by request on Vagaro `latherwellness`.
- **`/menu`** is the whole brochure on one page, with a Spa | Wellness switch.
  **`/visit`** has address, map, both sets of hours and the FAQ. **`/book`** is
  the Spa-or-Wellness chooser that the booking sheet falls back to.
- Footer only: `/what-is-a-head-spa`, `/journal`, `/locations`,
  `/scalp-concerns`.
- Old URLs (`/pricing`, `/contact`, `/faq`, `/spa/head-spa/<ritual>`,
  `/services*`, `/treatments*`) 308 to their new home in `next.config.ts`.
  The rituals are anchors on `/spa/head-spa` now (`#classic-ritual` …).

**Where things live.**

- All prices: `src/lib/menu.ts`. Treatment copy: `src/lib/wellness.ts`.
  Address, hours, Vagaro URLs: `src/lib/business.ts`. FAQ and reviews:
  `src/lib/data.ts`.
- Chrome: `src/components/site/` — `Header` (Menu · LATHER · Call on a phone,
  with a `<dialog>` drawer), `BookBar` (one pinned bar on phones), `BookSheet`
  (the Spa/Wellness sheet, opened by any `BookButton`), `Footer`.
- Page parts: `site/Editorial.tsx` — `SectionHead` (01 ─ LABEL ··· note),
  `Figure` (inset photo with caption), `Leader` (name · · · price),
  `PriceMenu`, `PageOpening`. `site/ServicePage.tsx` renders facials, massage
  and every wellness treatment.

## The design system

- **Type.** Gilda Display for headings, names and prices (one roman, no
  italic, so nothing leans on italics). Marcellus only for the LATHER logotype
  and section numbers. Jost 300 for body, Jost 500 tracked caps for labels.
- **Colour.** Paper `#F7F2EC`, sand panels `#EFE6DA`, cocoa ink `#35281F`.
  Gold text is `brass-dark` `#785E3A` only; `#7E6440` measured 4.49:1 on sand
  and fails. `brass` `#AC8D5F` is for marks and rules, `brass-light` for text
  on cocoa. Legacy token names (porcelain, umber, taupe…) are remapped to this
  palette in `tailwind.config.ts`.
- **Patterns.** Inset photos with small captions; numbered sections with a
  44px (88px desktop) number column; dotted price leaders (`.ld` / `.dots`);
  text links as underlined caps (`.lnk`). No gradients over photos, shadows,
  chips, centred stacks, italic half-headlines or grain.

## Findings that are expensive to rediscover

**`Logo variant="descriptor"` used to render an empty SVG.** The descriptor
paths were nested inside the wordmark's `<g>`, which that variant switches off.
It measures right in the DOM, which is why it survived so long; only a
screenshot shows it.

**framer-motion overwrites CSS transforms.** It writes the whole `transform`
property, so a `-translate-x-1/2` class on an element that also has `y`/`scale`
in its motion `style` is silently discarded. It also hoists `[stops] → [values]`
keyframes onto scroll timelines where narrow ranges drift back; use clamped
`useTransform(progress, (p) => …)` functions instead.

**Full-page screenshots show the fixed booking bar mid-page.** That is the
screenshot tool, not the layout.

## Deploying to Cloudflare

The site is fully static, so Cloudflare serves it as files from `out/` behind a small Worker that only does the redirects (`worker/index.js`, config in `wrangler.jsonc`).

- `npm run build:cf` — static export plus the generated redirect list. `npm run deploy:cf` builds and runs `wrangler deploy` (Worker name `lather`).
- `npm run deploy:cf:preview` — the noindex test link, Worker `lather-preview` (lather-preview.csb5170.workers.dev).
- Git-connected Workers Builds: build command `npm run build:cf`, deploy command `npx wrangler deploy`.
- Redirects are written once, in `next.config.ts`. `scripts/cloudflare.mjs` reads them from `.next/routes-manifest.json`. Cloudflare's own `_redirects` file is not used, because it lets a wildcard rule beat an exact one.
- No image optimizer on Cloudflare: `next/image` serves the source webp files as they are (`images.unoptimized` in export mode). Keep new photos sized and compressed before adding them.
- `business.siteUrl` is `https://www.latherspas.com`. Make www the primary hostname on Cloudflare and redirect the apex to it, or change `siteUrl` to match.

## Verification

    npm run build && npm run lint && npm run check:links
    PLAYWRIGHT=/path/to/node_modules/playwright/index.mjs node scripts/audit.mjs http://localhost:3101

`check:links` checks external links only; internal links were checked by
crawling the built HTML.

## Outstanding

1. Vagaro still lists the Luxe Ritual at $200 (brochure: $175) and has no
   prenatal massage. The client should update both.
2. Real photography for the Glo2Facial, massage, Gentleman's Recharge and each
   wellness treatment; those use interior shots now.
3. Privacy, Terms and a medical disclaimer need client or legal content before
   launch. The footer does not link them until they exist.
4. Rotate the credentials that were once in `.env`.
