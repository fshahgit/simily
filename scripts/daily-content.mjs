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
  const articles = JSON.parse(text.slice(jsonStart, jsonEnd));

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
    const tags = a.tags?.map((t) => `"${escape(t)}"`).join(", ") ?? "";
    const takeaways = a.keyTakeaways?.map((t) => `      "${escape(t)}"`).join(",\n") ?? "";
    const sections = (a.sections ?? [])
      .map(
        (s) =>
          `      { heading: "${escape(s.heading)}", body: \`${escape(s.body)}\` }`
      )
      .join(",\n");
    const sources = (a.sources ?? [])
      .map(
        (s) =>
          `      { title: "${escape(s.title)}", url: "${s.url}", publisher: "${escape(s.publisher)}" }`
      )
      .join(",\n");
    const related = (a.relatedComparisons ?? [])
      .map((r) => `      { a: "${escape(r.a)}", b: "${escape(r.b)}" }`)
      .join(",\n");

    return `
  {
    slug: "${a.slug}",
    title: "${escape(a.title)}",
    description:
      "${escape(a.description)}",
    date: "${TODAY}",
    category: "${a.category}",
    readTime: ${a.readTime ?? 6},
    tags: [${tags}],
    image: "",
    intro: \`${escape(a.intro ?? "")}\`,
    keyTakeaways: [
${takeaways}
    ],
    sections: [
${sections}
    ],
    conclusion: \`${escape(a.conclusion ?? "")}\`,
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
    const items = t.items.map((i) => `    "${escape(i)}"`).join(",\n");
    return `
  {
    slug: "${t.slug}",
    title: "${escape(t.title)}",
    description: "${escape(t.description)}",
    category: "${t.category}",
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
  try {
    const [articles, bestTopics] = await Promise.all([
      generateArticles(),
      generateBestTopics(),
    ]);

    if (articles.length > 0) appendArticles(articles);
    if (bestTopics.length > 0) appendBestTopics(bestTopics);

    console.log(`\n✅ Done — ${articles.length} articles + ${bestTopics.length} best-of topics added for ${TODAY}`);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

main();
