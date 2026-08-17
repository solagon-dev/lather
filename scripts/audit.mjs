/**
 * A sweep across every route at three widths.
 *
 * Checks the things that are cheap to break and expensive to notice: contrast
 * against the real painted background, horizontal overflow, tap-target size,
 * missing alt text, heading structure, and anything the console complains
 * about. Also runs each route once with `prefers-reduced-motion` to catch text
 * that reveals on scroll and therefore never reveals at all when the reveal is
 * switched off — the failure mode where a page is simply blank for the people
 * who asked for less movement.
 *
 * This exists because the previous version of it lived in a scratch directory
 * and did not survive the session that wrote it.
 *
 *   node scripts/audit.mjs [baseUrl]
 *
 * Playwright is not a dependency of this project; point PLAYWRIGHT at an
 * install if it is not resolvable from here.
 */

const PW = process.env.PLAYWRIGHT || "playwright";
const { chromium } = await import(PW);

const BASE = process.argv[2] || "http://localhost:3000";
const ROUTES = [
  "/", "/about", "/services", "/experience", "/journal", "/locations",
  "/contact", "/book", "/faq", "/gift-cards", "/scalp-concerns",
  "/what-is-a-head-spa", "/services/luxe-ritual", "/locations/greenville-nc",
  "/journal/what-is-a-head-spa",
];
const WIDTHS = [
  { w: 390, h: 844, name: "phone" },
  { w: 768, h: 1024, name: "tablet" },
  { w: 1440, h: 900, name: "desktop" },
];

const problems = [];
const note = (route, size, kind, detail) => problems.push({ route, size, kind, detail });

const browser = await chromium.launch();

for (const { w, h, name } of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();

  for (const route of ROUTES) {
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));

    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(4200); // the intro holds the first paint
    // Walk the whole page so scroll-linked reveals actually reveal.
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.75) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
    });
    await page.waitForTimeout(600);

    const found = await page.evaluate(() => {
      const out = [];

      // Contrast, measured against whatever is actually painted behind the
      // text rather than against the section's declared background — the two
      // differ wherever a scrim, a gradient or an image sits between them.
      const lum = (c) => {
        const [r, g, b] = c.match(/[\d.]+/g).map(Number);
        const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      const behind = (el) => {
        for (let n = el; n; n = n.parentElement) {
          const bg = getComputedStyle(n).backgroundColor;
          if (bg && !/rgba\(0, 0, 0, 0\)|transparent/.test(bg)) return bg;
        }
        return "rgb(255,255,255)";
      };
      for (const el of document.querySelectorAll("p, h1, h2, h3, h4, li, a, span, blockquote")) {
        if (!el.textContent.trim() || el.children.length) continue;
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height || cs.visibility === "hidden" || +cs.opacity < 0.6) continue;
        // Text over a photograph cannot be judged from computed colours.
        if (el.closest("[data-over-image]")) continue;
        const a = lum(cs.color) + 0.05;
        const b = lum(behind(el)) + 0.05;
        const ratio = a > b ? a / b : b / a;
        const size = parseFloat(cs.fontSize);
        const large = size >= 24 || (size >= 18.66 && +cs.fontWeight >= 700);
        if (ratio < (large ? 3 : 4.5)) {
          out.push(["contrast", `${ratio.toFixed(2)}:1 — ${el.textContent.trim().slice(0, 44)}`]);
        }
      }

      if (document.documentElement.scrollWidth > innerWidth + 1) {
        out.push(["overflow", `${document.documentElement.scrollWidth}px > ${innerWidth}px`]);
      }

      for (const img of document.querySelectorAll("img")) {
        if (img.alt === null || img.alt === undefined) out.push(["alt", img.currentSrc || img.src]);
      }

      // Target size, with the spacing exception WCAG 2.2 actually grants: a
      // target under 24px is fine as long as a 24px circle centred on it
      // reaches no other target. Without that allowance every short word in a
      // footer list reports as a failure, which trains you to ignore the check.
      const targets = [...document.querySelectorAll("a, button")]
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter(({ r }) => r.width && r.height);
      for (const { el, r } of targets) {
        if (r.width >= 24 && r.height >= 24) continue;
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const crowded = targets.some(({ el: other, r: o }) => {
          if (other === el) return false;
          return Math.hypot(cx - (o.left + o.width / 2), cy - (o.top + o.height / 2)) < 24;
        });
        if (crowded) {
          out.push(["tap-target", `${Math.round(r.width)}×${Math.round(r.height)} — ${el.textContent.trim().slice(0, 30)}`]);
        }
      }

      const h1s = document.querySelectorAll("h1");
      if (h1s.length !== 1) out.push(["h1", `${h1s.length} on the page`]);

      return out;
    });

    for (const [kind, detail] of found) note(route, name, kind, detail);
    for (const e of errors) note(route, name, "console", e.slice(0, 160));
    page.removeAllListeners("console");
    page.removeAllListeners("pageerror");
  }
  await ctx.close();
}

// Reduced motion: anything that only ever becomes visible by scrolling must
// already be visible when scrolling is not going to animate it.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(4200);
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll("h1, h2, h3, p, blockquote, li")]
        .filter((el) => {
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return el.textContent.trim() && r.height > 0 && +cs.opacity < 0.1;
        })
        .map((el) => el.textContent.trim().slice(0, 44))
        .slice(0, 6)
    );
    for (const t of hidden) note(route, "reduced-motion", "stuck-hidden", t);
    const canvases = await page.evaluate(() => document.querySelectorAll("canvas").length);
    if (canvases) note(route, "reduced-motion", "webgl", `${canvases} canvas`);
  }
  await ctx.close();
}

await browser.close();

if (!problems.length) {
  console.log(`clean — ${ROUTES.length} routes × ${WIDTHS.length} widths, plus reduced motion`);
} else {
  const by = {};
  for (const p of problems) (by[p.kind] ??= []).push(p);
  for (const [kind, list] of Object.entries(by)) {
    console.log(`\n${kind} (${list.length})`);
    for (const p of list.slice(0, 12)) console.log(`  ${p.route} @ ${p.size}: ${p.detail}`);
    if (list.length > 12) console.log(`  … ${list.length - 12} more`);
  }
  process.exitCode = 1;
}
