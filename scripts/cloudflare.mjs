// Finishes a Cloudflare build. Run after `STATIC_EXPORT=1 next build`.
//
// Cloudflare serves out/ as static files behind a small Worker (wrangler.jsonc).
// The redirects Next.js handles on Vercel are read from
// .next/routes-manifest.json and handed to that Worker, so next.config.ts stays
// the only place they are written.
//
//   node scripts/cloudflare.mjs            production
//   node scripts/cloudflare.mjs --preview  test link: noindex everywhere

import { existsSync, readFileSync, writeFileSync } from "node:fs";

const preview = process.argv.includes("--preview");
const OUT = "out";

if (!existsSync(`${OUT}/index.html`)) {
  console.error("out/ is missing. Run `STATIC_EXPORT=1 next build` first.");
  process.exit(1);
}

const { redirects } = JSON.parse(readFileSync(".next/routes-manifest.json", "utf8"));

// The Worker (worker/index.js) applies these in order, exactly as Next.js does.
// Each rule keeps Next's compiled regex; params lists the :names in the order
// their capture groups appear.
const rules = redirects
  .filter((r) => !r.internal)
  .map((r) => ({
    regex: r.regex,
    destination: r.destination,
    params: [...r.source.matchAll(/:(\w+)/g)].map((m) => m[1]),
  }));

writeFileSync("worker/redirects.json", `${JSON.stringify(rules, null, 2)}\n`);

const headers = [
  "/*",
  "  X-Content-Type-Options: nosniff",
  "  Referrer-Policy: strict-origin-when-cross-origin",
  "  X-Frame-Options: SAMEORIGIN",
  ...(preview ? ["  X-Robots-Tag: noindex, nofollow"] : []),
  "",
  "/_next/static/*",
  "  Cache-Control: public, max-age=31536000, immutable",
  "",
];
writeFileSync(`${OUT}/_headers`, headers.join("\n"));

if (preview) writeFileSync(`${OUT}/robots.txt`, "User-agent: *\nDisallow: /\n");

console.log(`Cloudflare ${preview ? "preview" : "production"} build ready: ${rules.length} redirects.`);
