/**
 * Build-time guard against duplicate reference images.
 *
 * Rules enforced:
 *   1. Every ARTICLE image (hero + inline section images) must be globally
 *      unique across all articles. No article ever shares an image.
 *   2. Within a single NEWS day, no two stories may share an image.
 *      (Reusing a stock photo across different days is allowed.)
 *
 * Wired into `prebuild`, so `npm run build` and every Vercel deploy fails
 * fast if a duplicate reference image would ship to production.
 *
 * Run manually: node scripts/check-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// A unique image identifier is EITHER an Unsplash photo id (numeric prefix)
// OR a locally-generated path under /article-images/.
const PHOTO_RE = /photo-(\d+)(?:-[a-z0-9]+)?|\/article-images\/([a-z0-9-]+\.jpg)/g;

// Normalize a regex match to its identity string.
function idOf(m) {
  return m[1] ? `unsplash:${m[1]}` : `local:${m[2]}`;
}

let failed = false;

// ── 1. Articles — global uniqueness ─────────────────────────────────────────
{
  const abs = path.join(ROOT, "app/lib/articles.ts");
  const lines = fs.readFileSync(abs, "utf8").split("\n");
  const seen = new Map(); // id -> [lineNumbers]

  lines.forEach((line, i) => {
    for (const m of line.matchAll(PHOTO_RE)) {
      const id = idOf(m);
      if (!seen.has(id)) seen.set(id, []);
      seen.get(id).push(i + 1);
    }
  });

  const dups = [...seen.entries()].filter(([, ls]) => ls.length > 1);
  if (dups.length > 0) {
    failed = true;
    console.error("\n❌ articles.ts — every article must use a unique image:\n");
    for (const [id, ls] of dups) {
      console.error(`  ${id} reused on lines ${ls.join(", ")}`);
    }
  } else {
    const total = [...seen.values()].reduce((n, ls) => n + ls.length, 0);
    console.log(`✅ articles.ts — ${total} images, all unique.`);
  }
}

// ── 1b. Articles — unique slugs ──────────────────────────────────────────────
{
  const abs = path.join(ROOT, "app/lib/articles.ts");
  const content = fs.readFileSync(abs, "utf8");
  const slugs = new Map();
  const re = /\n  \{\n    slug: "([^"]+)"/g;
  for (const m of content.matchAll(re)) {
    slugs.set(m[1], (slugs.get(m[1]) ?? 0) + 1);
  }
  const dups = [...slugs.entries()].filter(([, n]) => n > 1);
  if (dups.length > 0) {
    failed = true;
    console.error("\n❌ articles.ts — duplicate slugs (one shadows the other):");
    for (const [slug, n] of dups) console.error(`  "${slug}" appears ${n}×`);
  } else {
    console.log(`✅ articles.ts — ${slugs.size} unique slugs.`);
  }
}

// ── 2. News — uniqueness within each day ─────────────────────────────────────
{
  const abs = path.join(ROOT, "app/lib/news.ts");
  const content = fs.readFileSync(abs, "utf8");

  // Split into day blocks on `date: "YYYY-MM-DD",` markers at the NewsDay level.
  const dayRe = /date:\s*"(\d{4}-\d{2}-\d{2})"/g;
  const marks = [...content.matchAll(dayRe)];

  for (let d = 0; d < marks.length; d++) {
    const start = marks[d].index;
    const end = d + 1 < marks.length ? marks[d + 1].index : content.length;
    const block = content.slice(start, end);
    const date = marks[d][1];

    const seen = new Map();
    for (const m of block.matchAll(PHOTO_RE)) {
      const id = idOf(m);
      seen.set(id, (seen.get(id) ?? 0) + 1);
    }
    const dups = [...seen.entries()].filter(([, n]) => n > 1);
    if (dups.length > 0) {
      failed = true;
      console.error(`\n❌ news.ts — day ${date} reuses images within the same day:`);
      for (const [id, n] of dups) console.error(`  ${id} used ${n}× on ${date}`);
    }
  }
  if (!failed) console.log(`✅ news.ts — no image reused within any single day.`);
}

if (failed) {
  console.error("\nReplace the duplicates with unique Unsplash photo IDs, then rebuild.\n");
  process.exit(1);
}
console.log("");
