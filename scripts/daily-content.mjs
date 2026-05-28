/**
 * Daily content generator — runs via GitHub Actions every morning.
 * Generates 7 trending articles + 5 best-of topics and appends them
 * to app/lib/articles.ts and app/lib/best.ts, then commits.
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const TODAY = new Date().toISOString().slice(0, 10); // e.g. "2026-05-26"
const YEAR = TODAY.slice(0, 4);

// ─── Unsplash hero images by category ─────────────────────────────────────────

const CATEGORY_IMAGES = {
  AI:            ["1677442135703-1787eea5ce01","1676277791608-ac54525aa94d","1620712943543-bcc4688e7485","1485827404703-89b55fcc595e","1593508512255-86ab42a8e620"],
  Laptops:       ["1496181133206-80ce9b88a853","1517694712202-14dd9538aa97","1531297484001-80022131f5a1","1588872657578-7efd1f1555ef","1484788984921-03950022c38b"],
  Travel:        ["1506905925346-21bda4d32df4","1476514525535-07fb3b4ae5f1","1537953773345-d172ccf13cf1","1488085061387-422e29b40080","1469854523086-cc02fe5d8800"],
  Finance:       ["1554224155-6726b3ff858f","1579621970563-ebec7560ff3e","1611974789855-9c2a0a7236a3","1565514020179-026b92b84bb6","1559526324-593bc073d938"],
  Health:        ["1571019613454-1cb2f99b2d8b","1490645935967-10de6ba17061","1505576399279-565b52d4ac71","1540420773420-7a4b0b6ed462","1559757148-5c350d0d3c56"],
  Career:        ["1521898284481-a5ec348cb555","1454165804606-c3d57bc86b40","1507679799987-c73779587ccf","1553877522-43269d4ea984","1552664730-d307ca884978"],
  Smartphones:   ["1512941937669-90a1b58e7e9c","1598327105666-5b89351aff97","1511707171634-5f897ff02aa9","1533228100845-08145b01de14","1565849904461-04a58ad377e0"],
  Entertainment: ["1540747913346-19212a4b32a2","1522869635100-9f4c5e86aa37","1574375927818-3af57bd817dd","1485846234645-a62644f84728","1478720568477-152d9b92543c"],
};

function getHeroImage(category) {
  const imgs = CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES["AI"];
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const id = imgs[dayOfYear % imgs.length];
  return `https://images.unsplash.com/photo-${id}?w=1200&auto=format&q=80`;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

function escape(str) {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

// ─── existing slugs (avoid duplicates) ────────────────────────────────────────

function existingSlugs(file) {
  const content = fs.readFileSync(file, "utf8");
  const matches = [...content.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g)];
  return new Set(matches.map((m) => m[1]));
}

// ─── generate articles ────────────────────────────────────────────────────────

async function generateArticles() {
  const used = existingSlugs(path.join(ROOT, "app/lib/articles.ts"));

  const prompt = `You are a content strategist for Simily.org, an AI-powered comparison website.
Today is ${TODAY}. Generate 7 trending article ideas that are globally relevant right now.

For each article return a JSON object. Return a JSON array of exactly 7 objects.

Rules:
- Topics must be genuinely trending or highly searched RIGHT NOW in ${YEAR}
- Mix categories: AI tools, tech products, finance/investing, productivity, health tech, travel, career
- Each article should be useful for a global audience (not region-locked)
- Titles must be specific, SEO-optimised, include the year ${YEAR}
- Slugs must be unique — do NOT use any of these existing slugs: ${[...used].slice(0, 30).join(", ")}

Return ONLY a valid JSON array, no markdown, no explanation:
[
  {
    "slug": "unique-kebab-case-slug-${YEAR}",
    "title": "Article Title Here (${YEAR})",
    "description": "2-3 sentence description of what the article covers. Be specific and helpful.",
    "category": one of ["AI", "Laptops", "Travel", "Finance", "Health", "Career", "Smartphones", "Entertainment"],
    "readTime": number between 4 and 10,
    "tags": ["tag1", "tag2", "tag3"],
    "keyTakeaways": ["takeaway 1", "takeaway 2", "takeaway 3", "takeaway 4"],
    "intro": "2 paragraph intro for the article (plain text, no markdown)",
    "sections": [
      { "heading": "Section Heading", "body": "2-3 paragraph section body (plain text)" }
    ],
    "conclusion": "1 paragraph conclusion",
    "sources": [
      { "title": "Source Title", "url": "https://example.com", "publisher": "Publisher Name" }
    ],
    "relatedComparisons": [
      { "a": "Product A", "b": "Product B" }
    ]
  }
]`;

  console.log("Generating articles with Claude...");
  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 8000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content[0].text.trim();
  const jsonStart = text.indexOf("[");
  const jsonEnd = text.lastIndexOf("]") + 1;
  let articles = [];
  try {
    articles = JSON.parse(text.slice(jsonStart, jsonEnd));
  } catch (e) {
    // Try to extract individual valid objects if full parse fails
    console.warn("Full JSON parse failed, attempting partial extraction...");
    const matches = [...text.matchAll(/\{[\s\S]*?"slug"[\s\S]*?"relatedComparisons"[\s\S]*?\]\s*\}/g)];
    for (const m of matches) {
      try { articles.push(JSON.parse(m[0])); } catch {}
    }
  }

  console.log(`Generated ${articles.length} articles`);
  return articles.filter((a) => !used.has(a.slug));
}

// ─── generate best-of topics ──────────────────────────────────────────────────

async function generateBestTopics() {
  const used = existingSlugs(path.join(ROOT, "app/lib/best.ts"));

  const prompt = `You are a content strategist for Simily.org, an AI comparison site.
Today is ${TODAY}. Generate 5 "Best Of" guide topics that people are actively searching for in ${YEAR}.

Rules:
- Topics must be genuinely useful comparison/ranking guides
- Mix categories: AI tools, productivity, dev tools, cloud, security, entertainment, finance apps
- Global audience — not region-specific
- Slugs must be unique — do NOT use: ${[...used].slice(0, 30).join(", ")}

Return ONLY a valid JSON array of exactly 5 objects, no markdown:
[
  {
    "slug": "best-something-${YEAR}",
    "title": "Best [Thing] for [Use Case]",
    "description": "1-2 sentence description of what this guide covers.",
    "category": one of ["AI", "Dev Tools", "Productivity", "Laptops & Hardware", "Design", "Communication", "Cloud", "Entertainment", "Security", "Website Builders"],
    "items": ["Tool 1", "Tool 2", "Tool 3", "Tool 4", "Tool 5"]
  }
]`;

  console.log("Generating best-of topics with Claude...");
  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content[0].text.trim();
  const jsonStart = text.indexOf("[");
  const jsonEnd = text.lastIndexOf("]") + 1;
  const topics = JSON.parse(text.slice(jsonStart, jsonEnd));

  console.log(`Generated ${topics.length} best-of topics`);
  return topics.filter((t) => !used.has(t.slug));
}

// ─── append articles to articles.ts ──────────────────────────────────────────

function appendArticles(articles) {
  const filePath = path.join(ROOT, "app/lib/articles.ts");
  let content = fs.readFileSync(filePath, "utf8");

  // Insert before the closing ]; of ALL_ARTICLES
  const insertBefore = "\n];\n\nexport function getArticle";

  const newEntries = articles.map((a) => {
    const s = (v) => JSON.stringify(String(v ?? ""));
    const tags = a.tags?.map((t) => s(t)).join(", ") ?? "";
    const takeaways = a.keyTakeaways?.map((t) => `      ${s(t)}`).join(",\n") ?? "";
    const sections = (a.sections ?? [])
      .map((sec) => `      { heading: ${s(sec.heading)}, body: ${s(sec.body)} }`)
      .join(",\n");
    const sources = (a.sources ?? [])
      .map((src) => `      { title: ${s(src.title)}, url: ${s(src.url)}, publisher: ${s(src.publisher)} }`)
      .join(",\n");
    const related = (a.relatedComparisons ?? [])
      .map((r) => `      { a: ${s(r.a)}, b: ${s(r.b)} }`)
      .join(",\n");

    const introSection = a.intro ? `      { body: ${s(a.intro)} }` : null;
    const conclusionSection = a.conclusion ? `      { heading: "Conclusion", body: ${s(a.conclusion)} }` : null;
    const allSections = [introSection, sections, conclusionSection].filter(Boolean).join(",\n");

    return `
  {
    slug: ${s(a.slug)},
    title: ${s(a.title)},
    description: ${s(a.description)},
    date: "${TODAY}",
    category: ${s(a.category)},
    readTime: ${a.readTime ?? 6},
    coverEmoji: "📊",
    heroImage: ${JSON.stringify(getHeroImage(a.category))},
    tags: [${tags}],
    author: "Simily Editorial",
    keyTakeaways: [
${takeaways}
    ],
    sections: [
${allSections}
    ],
    sources: [
${sources}
    ],
    relatedComparisons: [
${related}
    ],
  },`;
  });

  content = content.replace(insertBefore, newEntries.join("") + insertBefore);
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✅ Appended ${articles.length} articles to articles.ts`);
}

// ─── append best topics to best.ts ───────────────────────────────────────────

function appendBestTopics(topics) {
  const filePath = path.join(ROOT, "app/lib/best.ts");
  let content = fs.readFileSync(filePath, "utf8");

  // Insert before the closing ]; of ALL_BEST_TOPICS
  const insertBefore = "\n];\n\nexport function getBestTopic";

  const newEntries = topics.map((t) => {
    const s = (v) => JSON.stringify(String(v ?? ""));
    const items = t.items.map((i) => `    ${s(i)}`).join(",\n");
    return `
  {
    slug: ${s(t.slug)},
    title: ${s(t.title)},
    description: ${s(t.description)},
    category: ${s(t.category)},
    items: [
${items}
    ],
  },`;
  });

  content = content.replace(insertBefore, newEntries.join("") + insertBefore);
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✅ Appended ${topics.length} best-of topics to best.ts`);
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
  let articles = [], bestTopics = [];

  try {
    articles = await generateArticles();
    if (articles.length > 0) appendArticles(articles);
    console.log(`✅ Articles done — ${articles.length} added`);
  } catch (err) {
    console.error("❌ Articles error:", err.message);
  }

  try {
    bestTopics = await generateBestTopics();
    if (bestTopics.length > 0) appendBestTopics(bestTopics);
    console.log(`✅ Best-of done — ${bestTopics.length} added`);
  } catch (err) {
    console.error("❌ Best-of error:", err.message);
  }

  console.log(`\n✅ Done — ${articles.length} articles + ${bestTopics.length} best-of topics added for ${TODAY}`);
}

main();
