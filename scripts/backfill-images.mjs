/**
 * Backfills AI-generated images onto EXISTING articles in app/lib/articles.ts.
 *
 * For each article it generates a topic-relevant hero (and replaces any existing
 * inline section images) via Pollinations, saving files to /public/article-images
 * and rewriting the URLs in place. Idempotent and resumable — already-generated
 * files are reused, and articles already on /article-images are skipped.
 *
 * Usage:
 *   node scripts/backfill-images.mjs                 # all articles
 *   node scripts/backfill-images.mjs --limit 5       # first 5 still-on-Unsplash
 *   node scripts/backfill-images.mjs --slug my-slug  # one article
 *
 * Run check afterwards: npm run check:images
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateImage } from "./gen-image.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const FILE = path.join(ROOT, "app/lib/articles.ts");

const args = process.argv.slice(2);
const slugFilter = args.includes("--slug") ? args[args.indexOf("--slug") + 1] : null;
const limit = args.includes("--limit") ? parseInt(args[args.indexOf("--limit") + 1]) : Infinity;

// Split the file into top-level article object blocks by slug marker.
function articleBlocks(content) {
  const re = /\n  \{\n    slug: "([^"]+)",/g;
  const marks = [...content.matchAll(re)];
  return marks.map((m, i) => {
    const start = m.index;
    const end = i + 1 < marks.length ? marks[i + 1].index : content.indexOf("\n];", start);
    return { slug: m[1], start, end, text: content.slice(start, end) };
  });
}

function field(block, name) {
  const m = block.match(new RegExp(`${name}: "([^"]+)"`));
  return m ? m[1] : "";
}

let content = fs.readFileSync(FILE, "utf8");
let blocks = articleBlocks(content);

if (slugFilter) blocks = blocks.filter((b) => b.slug === slugFilter);
// Only those still using Unsplash heroes (skip already-backfilled).
blocks = blocks.filter((b) => /heroImage: "https:\/\/images\.unsplash\.com/.test(b.text));
blocks = blocks.slice(0, limit);

if (blocks.length === 0) {
  console.log("Nothing to backfill (all targeted articles already use local images).");
  process.exit(0);
}

console.log(`Backfilling ${blocks.length} article(s)...\n`);

// Process newest-to-oldest by file position so edits don't shift earlier offsets;
// simplest safe approach: rebuild the whole string from per-block replacements.
for (const b of blocks) {
  const title = field(b.text, "title");
  const category = field(b.text, "category");
  console.log(`• ${b.slug}`);

  let newText = b.text;

  // Hero
  const hero = await generateImage(title, `${b.slug}-hero`, { width: 1200, height: 630 });
  if (hero) {
    newText = newText.replace(/heroImage: "[^"]+"/, `heroImage: ${JSON.stringify(hero)}`);
  }

  // Existing inline section images → regenerate from their caption/heading.
  const imgMatches = [...newText.matchAll(/image: \{ src: "[^"]+", alt: "([^"]*)", caption: "([^"]*)" \}/g)];
  let idx = 0;
  for (const im of imgMatches) {
    const subject = `${im[2] || im[1] || title} — ${title}`;
    const url = await generateImage(subject, `${b.slug}-s${idx}`, { width: 900, height: 500 });
    idx++;
    if (url) {
      newText = newText.replace(im[0], im[0].replace(/src: "[^"]+"/, `src: ${JSON.stringify(url)}`));
    }
  }

  content = content.replace(b.text, newText);
  fs.writeFileSync(FILE, content, "utf8"); // save progress after each (resumable)
  void category;
}

console.log(`\n✅ Backfill complete. Run: npm run check:images`);
