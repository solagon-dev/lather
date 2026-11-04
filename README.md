# Lather — Spa & Wellness Website

Marketing website for **Lather Spa & Wellness**, Greenville, NC — rebuilt in 2026 as a fully
static Next.js site, then rebranded from "Lather Head Spa" to a two-pillar spa + wellness
business. Booking runs through two Vagaro profiles — `latherspa` for the spa (instant
booking, gift cards) and `latherwellness` for Lather Wellness Center PLLC (visits by
request). The site has no database, no server runtime, and no cron jobs.

## Tech Stack

- **Framework**: Next.js 16 (App Router, all static/server components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (design tokens in `tailwind.config.ts` + `src/app/globals.css`)
- **Fonts**: Fraunces (display) + Figtree (body), self-hosted via `next/font`
- **Media**: compressed WebP (q70, ≤2160px) + short MP4 loops in `public/media/`
- **Booking**: Vagaro deep links (`src/lib/business.ts` → `BOOK_URL`, `WELLNESS_BOOK_URL`, `GIFT_CARD_URL`).
  Every generic "Book" control is a `BookButton` — a real link to `/book` that opens the
  spa-or-wellness chooser as a dialog when JS is running.

## Getting Started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (fully prerendered)
npm run lint
npm run check:links   # after a build: every external link in the output must resolve
```

Tailwind design tokens are compiled into `.next`. After editing `tailwind.config.ts`,
restart the dev server — a stale `.next` will keep serving the old token values.

## Where things live

```
src/
├── app/                  # Routes (all server components)
│   ├── page.tsx          # Home — a preview of both businesses, ~13 phone screens
│   ├── spa/              # Spa hub, head-spa/ (rituals + 3 detail pages), facials/, massage/
│   ├── wellness/         # Wellness hub + [slug] treatment pages
│   ├── pricing/          # ★ Every price on the site, split #spa / #wellness
│   ├── book/             # Spa-or-wellness chooser (no-JS fallback for the dialog)
│   ├── about/            # Story, values, founders, space
│   ├── what-is-a-head-spa/, scalp-concerns/, faq/, journal/
│   ├── gift-cards/, contact/
│   ├── locations/        # Hub (13 cities) + a page per catchment city (6)
│   ├── sitemap.ts, robots.ts, icon.svg
│   └── layout.tsx        # Fonts, global metadata, LocalBusiness + Organization JSON-LD
├── components/           # Navbar, Footer, Reveal, BookCTA, PageHero, …
└── lib/
    ├── business.ts       # ★ Single source of truth: NAP, hours, Vagaro URLs, geo
    ├── menu.ts           # Pillars, price groups (facials, massage, laser, Secret…), service cards
    ├── wellness.ts       # Wellness care areas + treatment pages
    ├── data.ts           # Head-spa rituals, add-ons, FAQs, real Vagaro reviews
    ├── blog.ts           # 10 journal articles (static content)
    ├── locations.ts      # Cities served + legacy-slug redirect map
    └── seo.ts            # JSON-LD schema builders + `clampDescription`
```

## The 2026 duplicate-content consolidation

The site previously shipped 61 local landing pages: `/locations/<city>-head-spa`
plus four service-prefixed families (`/head-spa-near`, `/scalp-treatment`,
`/japanese-head-spa`, `/scalp-massage`) at `/<service>/<city>`. All five were built
from the same template with the city name swapped, so they competed with each other
for one query set — the pattern Google's doorway-page guidance targets.

They are now **one page per catchment city** — six, everything within about 40
minutes — at `/locations/<city>-nc`. The other seven cities are still listed in the
`/locations` table with their drive time, distance and route, which is what a
searcher actually wants from them; they just don't carry a page of their own,
because at ~150 words of genuinely local content each they would be thin.

Every old URL 301s to the right place via `next.config.ts`: cities that kept a page
go to it, the rest go to the hub.

To change the set, edit `servedCities` in `src/lib/locations.ts` — `hasPage`
controls whether a city gets a route, and the page, hub table, sitemap and
redirects all follow from it.

**Keep city pages honest.** Only genuinely city-varying facts belong in
`servedCities` (distance, drive time, direction, road). Everything else on the page
renders from the shared source used site-wide, because it is the same business at
the same address. Resist adding per-city paragraphs that differ only by adjective —
that is what made the previous version thin. The six pages still share roughly 58%
of their body text; that is inherent to one location and fine, but it is the reason
to be sparing about adding more.

## Conventions worth knowing

- **Business facts** — hours, phone, address, and booking links live **only** in
  `src/lib/business.ts` (spa `hours`, `wellnessHours`, two Vagaro profiles). Ritual names
  and prices live in `src/lib/data.ts`; every other price lives in `priceGroups` in
  `src/lib/menu.ts`. Change them there and every page, footer, and JSON-LD schema
  updates together.
- **URLs** — the old `/services`, `/experience`, `/treatments` and `/book`-as-pricing
  routes 301 to the new structure in `next.config.ts`. Keep redirects single-hop.
- **Meta descriptions** — keep under ~160 characters. Templated routes
  (`journal/[slug]`, `locations/[city]`, the four SEO families) pass theirs through
  `clampDescription()` in `src/lib/seo.ts` as a backstop.
- **Open Graph** — the root layout deliberately does *not* set `openGraph.title` or
  `openGraph.description`. Setting them pins every page's share card to the homepage
  copy. Leave them unset so Next derives them per page.
- **Colour** — `taupe` is the small-print token and is tuned to clear WCAG AA (4.5:1)
  on porcelain, ivory and bone. Don't lighten it without re-checking contrast.
- **The mobile menu** — animates with `transform`, never `opacity` (an opacity
  transition sticks at 0 in Chrome when compositing over the hero video), and uses
  `visibility: hidden` on a delay so its links leave the tab order when closed.

## Media

`public/media/` holds web-ready WebP/MP4 assets. `public/Photos/` and `public/Videos/`
are raw source material — gitignored and never deployed. To add a new web image:

```bash
cwebp -q 70 -m 6 -resize 0 2160 source.jpg -o public/media/<dir>/<name>.webp
```

## History

The pre-2026 site (custom Prisma/Postgres booking system, admin panel, Google Calendar
sync) is preserved in git history — see the `Checkpoint: WIP admin settings system`
commit and earlier on the `redesign` branch. The local `.env` still carries credentials
from that era (Postgres, Twilio, Resend, Google OAuth); nothing in the current codebase
reads them, and they should be rotated and removed.
