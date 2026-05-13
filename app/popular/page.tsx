import type { Metadata } from "next";
import Link from "next/link";
import LogoAvatar from "../components/LogoAvatar";

export const metadata: Metadata = {
  title: "Popular Comparisons — Simily",
  description: "Browse the most popular AI-powered comparisons on Simily. Products, tools, diets, frameworks and more.",
};

const categories = [
  {
    name: "📱 Tech & Gadgets",
    comparisons: [
      { a: "iPhone 16", b: "Samsung Galaxy S25" },
      { a: "iPhone", b: "Google Pixel" },
      { a: "iPad", b: "Samsung Galaxy Tab" },
      { a: "Mac", b: "Windows" },
      { a: "iPhone", b: "Android" },
      { a: "AirPods Pro", b: "Sony WH-1000XM5" },
    ],
  },
  {
    name: "🤖 AI Tools",
    comparisons: [
      { a: "ChatGPT", b: "Claude" },
      { a: "Gemini", b: "ChatGPT" },
      { a: "Perplexity", b: "ChatGPT" },
      { a: "Midjourney", b: "DALL-E" },
      { a: "Cursor", b: "GitHub Copilot" },
    ],
  },
  {
    name: "✏️ Code Editors",
    comparisons: [
      { a: "VS Code", b: "Cursor" },
      { a: "VS Code", b: "JetBrains" },
      { a: "Cursor", b: "GitHub Copilot" },
      { a: "Vim", b: "Neovim" },
    ],
  },
  {
    name: "💻 Programming & Dev",
    comparisons: [
      { a: "React", b: "Vue" },
      { a: "React", b: "Angular" },
      { a: "Svelte", b: "React" },
      { a: "Next.js", b: "Nuxt.js" },
      { a: "Tailwind", b: "Bootstrap" },
      { a: "Python", b: "JavaScript" },
      { a: "TypeScript", b: "JavaScript" },
      { a: "Go", b: "Rust" },
      { a: "MySQL", b: "PostgreSQL" },
      { a: "MongoDB", b: "PostgreSQL" },
      { a: "Firebase", b: "Supabase" },
      { a: "Docker", b: "Kubernetes" },
      { a: "GitHub", b: "GitLab" },
      { a: "Vercel", b: "Netlify" },
      { a: "AWS", b: "Google Cloud" },
      { a: "npm", b: "pnpm" },
    ],
  },
  {
    name: "🛠️ Tools & Software",
    comparisons: [
      { a: "Notion", b: "Obsidian" },
      { a: "Trello", b: "Notion" },
      { a: "Jira", b: "Linear" },
      { a: "Asana", b: "Monday.com" },
      { a: "ClickUp", b: "Asana" },
      { a: "Figma", b: "Adobe XD" },
      { a: "Figma", b: "Canva" },
      { a: "Slack", b: "Microsoft Teams" },
      { a: "Zoom", b: "Google Meet" },
      { a: "Gmail", b: "Outlook" },
      { a: "Chrome", b: "Firefox" },
      { a: "1Password", b: "Bitwarden" },
      { a: "NordVPN", b: "ExpressVPN" },
      { a: "WordPress", b: "Webflow" },
      { a: "Shopify", b: "WooCommerce" },
    ],
  },
  {
    name: "🎮 Gaming",
    comparisons: [
      { a: "PS5", b: "Xbox Series X" },
      { a: "Nintendo Switch", b: "Steam Deck" },
    ],
  },
  {
    name: "🎬 Entertainment",
    comparisons: [
      { a: "Netflix", b: "Disney+" },
      { a: "Spotify", b: "Apple Music" },
      { a: "YouTube", b: "TikTok" },
    ],
  },
  {
    name: "🥗 Health & Lifestyle",
    comparisons: [
      { a: "Keto Diet", b: "Intermittent Fasting" },
      { a: "Tesla Model 3", b: "BMW 3 Series" },
      { a: "LinkedIn", b: "Indeed" },
    ],
  },
];

const threeWayComparisons = [
  { a: "React", b: "Vue", c: "Svelte" },
  { a: "ChatGPT", b: "Claude", c: "Gemini" },
  { a: "PS5", b: "Xbox Series X", c: "Nintendo Switch" },
  { a: "Python", b: "JavaScript", c: "TypeScript" },
  { a: "Netflix", b: "Disney+", c: "Spotify" },
  { a: "iPhone", b: "Samsung Galaxy S25", c: "Google Pixel" },
  { a: "Notion", b: "Obsidian", c: "Trello" },
  { a: "AWS", b: "Google Cloud", c: "Azure" },
  { a: "Slack", b: "Microsoft Teams", c: "Zoom" },
  { a: "Tailwind", b: "Bootstrap", c: "CSS Modules" },
];

function ComparisonCard({ a, b }: { a: string; b: string }) {
  const slug = `${a.toLowerCase().replace(/ /g, "-")}-vs-${b.toLowerCase().replace(/ /g, "-")}`;
  return (
    <Link
      href={`/compare/${slug}?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`}
      className="group flex items-center gap-2.5 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 transition-all hover:border-violet-500/50 hover:bg-gray-800"
    >
      <LogoAvatar name={a} size={28} />
      <span className="flex-1 text-sm font-medium text-gray-200 group-hover:text-white truncate">{a}</span>
      <span className="shrink-0 rounded-full bg-violet-500/10 px-2 py-0.5 text-xs font-bold text-violet-400">VS</span>
      <span className="flex-1 text-right text-sm font-medium text-gray-200 group-hover:text-white truncate">{b}</span>
      <LogoAvatar name={b} size={28} />
      <span className="shrink-0 text-gray-600 group-hover:text-violet-400 transition-colors ml-1">→</span>
    </Link>
  );
}

function ThreeWayCard({ a, b, c }: { a: string; b: string; c: string }) {
  const slug = [a, b, c].map((s) => s.toLowerCase().replace(/ /g, "-")).join("-vs-");
  return (
    <Link
      href={`/compare/${slug}?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}&c=${encodeURIComponent(c)}`}
      className="group flex items-center gap-2 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 transition-all hover:border-violet-500/50 hover:bg-gray-800"
    >
      <LogoAvatar name={a} size={24} />
      <span className="text-sm font-medium text-gray-200 group-hover:text-white truncate">{a}</span>
      <span className="shrink-0 rounded-full bg-violet-500/10 px-1.5 py-0.5 text-xs font-bold text-violet-400">VS</span>
      <LogoAvatar name={b} size={24} />
      <span className="text-sm font-medium text-gray-200 group-hover:text-white truncate">{b}</span>
      <span className="shrink-0 rounded-full bg-violet-500/10 px-1.5 py-0.5 text-xs font-bold text-violet-400">VS</span>
      <LogoAvatar name={c} size={24} />
      <span className="text-sm font-medium text-gray-200 group-hover:text-white truncate">{c}</span>
      <span className="shrink-0 text-gray-600 group-hover:text-violet-400 transition-colors ml-auto">→</span>
    </Link>
  );
}

export default function PopularPage() {
  const totalComparisons = categories.reduce((sum, c) => sum + c.comparisons.length, 0) + threeWayComparisons.length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white">Popular Comparisons</h1>
        <p className="mt-3 text-gray-400">
          Browse {totalComparisons} AI-powered comparisons across {categories.length} categories
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-10">
        {categories.map((category) => (
          <div key={category.name}>
            <h2 className="mb-4 text-lg font-semibold text-white">{category.name}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {category.comparisons.map(({ a, b }) => (
                <ComparisonCard key={`${a}-${b}`} a={a} b={b} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 3-Way Comparisons */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold text-white">⚡ 3-Way Comparisons</h2>
          <span className="rounded-full bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 text-xs font-semibold text-violet-400">New</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {threeWayComparisons.map(({ a, b, c }) => (
            <ThreeWayCard key={`${a}-${b}-${c}`} a={a} b={b} c={c} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-8 text-center">
        <h3 className="text-xl font-bold text-white">Don't see what you need?</h3>
        <p className="mt-2 text-gray-400">Compare anything — just type two things and our AI does the rest.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-violet-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-violet-500"
        >
          Start a Comparison →
        </Link>
      </div>
    </div>
  );
}
