# Handoff — Lather homepage / cinematic pass

Written so the next session does not re-derive what took a while to find. Read
this before touching the hero, the robe section, the coin section, or the
navbar.

## Current state

Branch `redesign-vero-editorial-system`. Everything below is committed.

Last verification (all of it, after the last edit):

- `npm run build` clean, 37 routes prerendered
- `node scripts/audit.mjs` clean: 15 routes × 3 widths plus a reduced-motion
  pass — 0 console errors, 0 contrast failures, 0 horizontal overflow, 0
  missing alt, 0 crowded sub-24px tap targets, one `h1` per page, 0
  stuck-hidden text and 0 WebGL contexts under reduced motion

## Findings that are expensive to rediscover

**framer-motion silently reinterprets keyframe ranges.** Given a
`[stops] → [values]` pair, it may hoist the value onto a scroll-linked Web
Animations timeline, where a range narrower than `[0,1]` **does not hold at its
endpoint** — it drifts back toward its start value across the rest of the
range. This has now caused two separate bugs: the robe faded out and hit zero
at progress 1, and the hero's tagline and buttons faded out during the collapse
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

**The reference site's actual system.** verostudio.com was analysed directly,
not guessed at:

- Its object canvas has `filter: none`, `mask: none`, no overlay gradients,
  `opacity: 1`. **Zero CSS treatment.** Softness is `THREE.Fog` matched to the
  page colour, which fades the object by *depth*. A screen-space mask cannot
  imitate this — it cuts in the same place regardless of where the object is.
- Its GLB ships **normal + occlusion maps only, no colour texture**. It is lit
  as a white sculpture, not dressed as fabric.
- Its ground is cream, its object is white, and its type is near-black **in
  front**. That contrast relationship is the whole reason display type can
  cross the object with no scrim. Dark ground + white object + light type
  cannot be made to work by treatment, only compensated for — and every
  compensation costs clarity.
- Object opens fully framed with air, then pushes in. Section ≈ 2.8 viewport
  heights.

**The robe's "cut off" top is the model, not the framing.** There is no body in
the garment, so the neck opening is an open hole ending in a flat cut edge. It
cannot be uncropped — the only fix is to carry it above the top of frame, which
is what the current `driftY` does.

**`fill` scales by the model's largest dimension.** The robe's sleeves are
outstretched, so *width* governs and the garment is much shorter than its
`fill` value implies. The offsets in `PinnedObjectSequence` are measured from
the render, not computed — do not "correct" them to derived values.

**framer-motion overwrites CSS transforms.** It writes the whole `transform`
property, so a `-translate-x-1/2` class on an element that also has `y`/`scale`
in its motion `style` is silently discarded. Centring offsets must live in the
motion style (`x: "-50%"`).

**`text-align` does nothing to inline content wider than its box.** Overflowing
LTR text always spills *rightward*. Each half of the coin line is its own flex
box with `justify-end` / `justify-start`, which puts overflow on the outside
edge where the section clips it.

**The navbar samples the ground under the wordmark** via `elementsFromPoint`
and picks ink or ivory, falling back to the body colour when nothing opaque is
found. It used to assume dark, which broke the moment the hero went light.

**The robe GLB pipeline.** `public/models/robe.glb` (778 KB) came from a
purchased Marvelous Designer OBJ: 210k faces and two 8192px maps → simplify
0.25 → resize 2048 → webp → meshopt. It is **meshopt-compressed**, so
`GLTFLoader` needs `MeshoptDecoder` registered or it silently fails to parse.

## The tone rule

The page's ground is light throughout. **Anything dark on it is dark because
there is a photograph or a rendered object in it, never because a panel was
painted noir.** That is why the ritual film is dark (it is film) while the two
statements bracketing it are not, and why `SocialSection` stays dark (it is a
photo wall). The one deliberate exception is the coin → CTA passage near the
close, kept as the page's single sustained dark movement. Taking the coin light
would mean re-solving type-over-object contrast for the coin the way the robe
section already solved it; do not start that without budgeting for it.

## Verification

`node scripts/audit.mjs [baseUrl]` — durable this time, in the repo. Playwright
is not a dependency; set `PLAYWRIGHT` to an install if it does not resolve:

    PLAYWRIGHT=/path/to/node_modules/playwright/index.mjs node scripts/audit.mjs

Worth recreating if ever needed and not present:

- frame-time / heap / canvas-count probe while scrolling the whole page
- coin-overlap test: hide the coin canvas *and the fixed header*, then look for
  glyph pixels inside the disc. Both exclusions matter — without them it
  reports the coin's own rim highlight and the navbar as collisions.
- beat-overlap test: assert never more than one statement above 0.12 opacity.

When measuring anything spring-driven, wait ~1.1 s for it to settle. Reading a
position and screenshotting a moment later compares two different states and
produces false positives.

## Outstanding

1. **Perf has not been re-measured** since the pass. The last numbers, from
   before it, were median 8.3 ms/frame, p95 9.2 ms, ~123 MB heap, 2 WebGL
   contexts. `ParallaxFrame` now runs on every `SplitFeature` on the site, so
   this is the number most likely to have moved.
2. The pillars (`SplitFeature` ×2) got the parallax but not a structural
   treatment. They are the page's core proposition and still read as two
   mirrored 50/50 splits.
3. `MatrixGallery` and the founders' `StickySplit` were not touched.
