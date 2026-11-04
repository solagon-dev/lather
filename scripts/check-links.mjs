// Outbound link check.
//
// Every booking and gift-card button on this site leaves for Vagaro, so a
// renamed Vagaro profile breaks the business without breaking the build — the
// site shipped for months with every Book button on a Vagaro 404 because
// nothing looked. This reads the prerendered HTML from `next build`, collects
// every external link, and requests each one the way a browser would.
//
//   npm run build && npm run check:links
//
// Exits 1 if any link is dead. A site that refuses scripted requests outright
// (403/429 — Instagram does this) is reported but does not fail the run.

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(".next/server/app");
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
// Vagaro answers a missing profile with a redirect to this page, not a 404.
const SOFT_404 = /PageNotFound|\/404\b/i;
const BLOCKED = new Set([403, 429, 999]);

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((e) => {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) return htmlFiles(p);
      return e.name.endsWith(".html") ? [p] : [];
    })
  );
  return nested.flat();
}

async function collectLinks() {
  const links = new Map(); // url -> first page it appears on
  for (const file of await htmlFiles(ROOT)) {
    const html = await readFile(file, "utf8");
    for (const [, raw] of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
      const url = raw.replace(/&amp;/g, "&");
      // Fonts, preconnects and our own canonical domain are not outbound links.
      if (/fonts\.(googleapis|gstatic)\.com/.test(url)) continue;
      if (/^https?:\/\/(www\.)?latherspas\.com/.test(url)) continue;
      if (!links.has(url)) links.set(url, path.relative(ROOT, file));
    }
  }
  return links;
}

async function check(url) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": UA, accept: "text/html" },
      signal: AbortSignal.timeout(20_000),
    });
    if (BLOCKED.has(res.status)) return { state: "blocked", detail: `HTTP ${res.status}` };
    if (res.status >= 400) return { state: "dead", detail: `HTTP ${res.status} at ${res.url}` };
    if (SOFT_404.test(res.url)) return { state: "dead", detail: `redirected to ${res.url}` };
    return { state: "ok", detail: `HTTP ${res.status}` };
  } catch (err) {
    return { state: "dead", detail: err.cause?.code ?? err.name ?? String(err) };
  }
}

const links = await collectLinks();
if (links.size === 0) {
  console.error(`No external links found under ${ROOT} — run \`npm run build\` first.`);
  process.exit(1);
}

const results = await Promise.all(
  [...links].map(async ([url, page]) => ({ url, page, ...(await check(url)) }))
);

const mark = { ok: "ok     ", blocked: "blocked", dead: "DEAD   " };
for (const r of results.sort((a, b) => a.state.localeCompare(b.state) || a.url.localeCompare(b.url))) {
  console.log(`${mark[r.state]}  ${r.url}  (${r.detail}; first seen in ${r.page})`);
}

const dead = results.filter((r) => r.state === "dead");
console.log(`\n${results.length} external links · ${dead.length} dead`);
process.exit(dead.length ? 1 : 0);
