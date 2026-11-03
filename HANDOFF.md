# Handoff — Lather site

Written so the next session does not re-derive what took a while to find. Read
this before touching the hero, the navbar, or any scroll-driven motion.

## Current state

Branch `phase-0-business-truth` (not pushed). The site was restructured around
the two businesses it actually is:

- **Spa** (`/spa`, `/spa/head-spa`, `/spa/facials`, `/spa/massage`) books
  instantly on Vagaro `latherspa`.
- **Wellness** (`/wellness`, `/wellness/[slug]`) is a separate practice, Lather
  Wellness Center PLLC, booked by request on Vagaro `latherwellness`.
- **`/pricing`** carries every price; **`/book`** is the chooser between the two
  profiles, and the same chooser opens as a dialog from every `BookButton`.

The 3D pass was removed: the pinned robe (`PinnedObjectSequence`/`ModelScene`),
the coin statement, the fountain mark and the preloader, along with `three`.
Measured headless before removal, the robe section ran at a 167–200 ms median
frame with ~20 s of long tasks and blank frames on phones; everything else held
60 fps. The model is kept at `brand-assets/models/robe.glb` and the code is in
git history (before commit "Restructure the site…"). Do not bring it back
without re-solving phone performance first.

Homepage after the cut, at 390px: ~13 phone screens plus footer (was 35), every
section at 16.7 ms median frame, 0 jank, 0 canvases.

## Findings that are expensive to rediscover

**framer-motion silently reinterprets keyframe ranges.** Given a
`[stops] → [values]` pair, it may hoist the value onto a scroll-linked Web
Animations timeline, where a range narrower than `[0,1]` **does not hold at its
endpoint** — it drifts back toward its start value across the rest of the
range. This has caused bugs before: the hero's tagline and buttons faded out during the collapse
and then quietly returned to full opacity as the hero scrolled away. Both are
invisible in the DOM: `el.style.opacity` still reads the value you set, because
the animation is running above it. `getComputedStyle` is the only thing that
tells the truth.

**Every scroll-driven value on this site is therefore a clamped function**, not
a keyframe list — `useTransform(progress, (p) => …)` with an explicit `ramp()`.
If something scroll-driven mysteriously decays, undoes itself, or comes back,
this is why. Do not "simplify" one back into a stops/values pair.

**A sticky panel's blank tail is exactly its inset.** A panel of height `P`
inside a section of height `H` is pinned for `H − P` and then takes exactly `P`
of scroll to leave. A tile inset by `I` inside that panel clears the top of
frame `I` *before* the section ends — so there is always a gap of exactly `I`
with nothing on screen, and no choice of `H` removes it. The fix in
`CollapsingHero` is to keep moving the tile's insets after the collapse
finishes, sliding it down inside the panel at the rate that carries its bottom
edge to the top of frame just as the section ends. Height stays constant
because the two insets move by equal and opposite amounts.

**The hero's pinned stretch is `SECTION − PANEL` and the wordmark handoff has
to finish inside it.** `HERO_HANDOFF_VH` is 0.72, so the pin cannot go below
about 0.8 viewport — which is what stops anyone from shortening the hero.
Raising the constant or shortening the section re-breaks the handoff and you
see two wordmarks.

**`Logo variant="descriptor"` used to render an empty SVG.** The descriptor
paths were nested inside the wordmark's `<g>`, which that variant switches off
— so it produced a correctly-sized box containing nothing, and the navbar's
SPA & WELLNESS line had never once appeared. It measures right in the DOM,
which is why it survived so long; only a screenshot shows it.

**The hero video is source-limited.** `hero-landscape.mp4` is 1440×810 now,
but the detail in it is far smaller than that — it is corrected phone footage
that was already an upscale. It has been denoised, sharpened and re-encoded
(`hqdn3d` → `unsharp` → lanczos, CRF 21), which is as far as processing can
take it. If it still reads soft the answer is landscape footage shot for the
purpose, not another encode.

**framer-motion overwrites CSS transforms.** It writes the whole `transform`
property, so a `-translate-x-1/2` class on an element that also has `y`/`scale`
in its motion `style` is silently discarded. Centring offsets must live in the
motion style (`x: "-50%"`).

**The navbar samples the ground under the wordmark** via `elementsFromPoint`
and picks ink or ivory, falling back to the body colour when nothing opaque is
found. It used to assume dark, which broke the moment the hero went light.

## The tone rule

The page's ground is light throughout. **Anything dark on it is dark because
there is a photograph or a rendered object in it, never because a panel was
painted noir.** That is why the ritual film on `/spa/head-spa` is dark (it is film) and the
pages around it are not.

## Verification

`node scripts/audit.mjs [baseUrl]` — durable this time, in the repo. Playwright
is not a dependency; set `PLAYWRIGHT` to an install if it does not resolve:

    PLAYWRIGHT=/path/to/node_modules/playwright/index.mjs node scripts/audit.mjs

Worth recreating if ever needed and not present: a frame-time / long-task
probe while wheel-scrolling the whole page at 390px and 1440px, reporting
median and p95 frame per section.

When measuring anything spring-driven, wait ~1.1 s for it to settle. Reading a
position and screenshotting a moment later compares two different states and
produces false positives.

## Outstanding

1. Confirm with the client: Classic/Luxe blowdry inclusions, where laser and
   Secret RF/PRO book (they are not on Vagaro yet, so they point at the
   wellness profile), and update the Luxe to $175 on Vagaro itself.
2. Real photography for facials, massage and each wellness treatment — those
   cards currently use interior shots.
3. Legal pages (privacy, terms, a medical disclaimer for wellness).
4. One homepage testimonial praises a blowout, a service that has been retired.
