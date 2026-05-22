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


function ComparisonCard({ a, b }: { a: string; b: string }) {
  const slug = `${a.toLowerCase().replace(/ /g, "-")}-vs-${b.toLowerCase().replace(/ /g, "-")}`;
  return (
    <Link
      href={`/compare/${slug}?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`}
      className="group flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all hover:border-violet-300 hover:shadow-md hover:bg-slate-50"
    >
      <LogoAvatar name={a} size={28} />
      <span className="flex-1 text-sm font-medium text-slate-700 group-hover:text-slate-900 truncate">{a}</span>
      <span className="shrink-0 rounded-full bg-violet-50 border border-violet-200 px-2 py-0.5 text-xs font-bold text-violet-600">VS</span>
      <span className="flex-1 text-right text-sm font-medium text-slate-700 group-hover:text-slate-900 truncate">{b}</span>
      <LogoAvatar name={b} size={28} />
      <span className="shrink-0 text-slate-300 group-hover:text-violet-500 transition-colors ml-1">→</span>
    </Link>
  );
}


export default function PopularPage() {
  const totalComparisons = categories.reduce((sum, c) => sum + c.comparisons.length, 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Popular Comparisons</h1>
        <p className="mt-3 text-slate-500">
          Browse {totalComparisons} AI-powered comparisons across {categories.length} categories
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-10">
        {categories.map((category) => (
          <div key={category.name}>
            <h2 className="mb-4 text-lg font-semibold text-slate-900">{category.name}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {category.comparisons.map(({ a, b }) => (
                <ComparisonCard key={`${a}-${b}`} a={a} b={b} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-2xl border border-violet-200 bg-violet-50 p-8 text-center">
        <h3 className="text-xl font-bold text-slate-900">Don&apos;t see what you need?</h3>
        <p className="mt-2 text-slate-500">Compare anything — just type two things and our AI does the rest.</p>
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
