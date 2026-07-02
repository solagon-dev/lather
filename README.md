# Lather — Head Spa Website

Marketing website for **Lather Head Spa**, Greenville, NC — rebuilt in 2026 as a fully static
Next.js site. All booking and gift-certificate purchases run through Lather's Vagaro profile;
the site has no database, no server runtime, and no cron jobs.

## Tech Stack

- **Framework**: Next.js 16 (App Router, all static/server components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (design tokens in `tailwind.config.ts` + `src/app/globals.css`)
- **Fonts**: Fraunces (display) + Figtree (body), self-hosted via `next/font`
- **Media**: compressed WebP (q70, ≤2160px) + short MP4 loops in `public/media/`
- **Booking**: Vagaro deep links (`src/lib/business.ts` → `BOOK_URL`, `GIFT_CARD_URL`)

## Getting Started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (fully prerendered)
```

## Where things live

```
src/
├── app/                  # Routes (all server components)
│   ├── page.tsx          # Home
│   ├── services/         # Menu + 4 ritual detail pages
│   ├── experience/       # What to expect
│   ├── about/            # Story, values, team, space
│   ├── what-is-a-head-spa/, scalp-concerns/, faq/, journal/
│   ├── gift-cards/, book/, contact/
│   ├── locations/        # 13 city pages
│   ├── head-spa-near/, scalp-treatment/,
│   │   japanese-head-spa/, scalp-massage/   # 52 SEO landing pages (4 × 13 cities)
│   ├── sitemap.ts, robots.ts, icon.svg
│   └── layout.tsx        # Fonts, global metadata, LocalBusiness JSON-LD
├── components/           # Navbar, Footer, Reveal, BookCTA, PageHero, …
└── lib/
    ├── business.ts       # ★ Single source of truth: NAP, hours, Vagaro URLs, geo
    ├── data.ts           # Services, add-ons, FAQs, real Vagaro reviews
    ├── blog.ts           # 10 journal articles (static content)
    ├── locations.ts      # City-page content
    ├── seo-pages.ts      # SEO landing-page templates
    └── seo.ts            # JSON-LD schema builders
```

## Updating business info

Hours, phone, address, and booking links live **only** in `src/lib/business.ts`.
Service names/prices live in `src/lib/data.ts`. Change them there and every page,
footer, and JSON-LD schema updates together.

## Media

`public/media/` holds web-ready WebP/MP4 assets. `public/Photos/` and `public/Videos/`
are raw source material — gitignored and never deployed. To add a new web image:

```bash
cwebp -q 70 -m 6 -resize 0 2160 source.jpg -o public/media/<dir>/<name>.webp
```

## History

The pre-2026 site (custom Prisma/Postgres booking system, admin panel, Google Calendar
sync) is preserved in git history — see the `Checkpoint: WIP admin settings system`
commit and earlier on the `redesign` branch.
