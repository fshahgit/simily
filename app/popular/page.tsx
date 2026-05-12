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
      { a: "iPad", b: "Samsung Galaxy Tab" },
      { a: "Mac", b: "Windows" },
      { a: "AirPods Pro", b: "Sony WH-1000XM5" },
      { a: "iPhone", b: "Android" },
    ],
  },
  {
    name: "💻 Programming & Dev",
    comparisons: [
      { a: "React", b: "Vue" },
      { a: "Python", b: "JavaScript" },
      { a: "TypeScript", b: "JavaScript" },
      { a: "React", b: "Next.js" },
      { a: "MySQL", b: "PostgreSQL" },
      { a: "Docker", b: "Kubernetes" },
      { a: "GitHub", b: "GitLab" },
      { a: "AWS", b: "Google Cloud" },
    ],
  },
  {
    name: "🛠️ Tools & Software",
    comparisons: [
      { a: "Notion", b: "Obsidian" },
      { a: "Figma", b: "Adobe XD" },
      { a: "Slack", b: "Microsoft Teams" },
      { a: "Zoom", b: "Google Meet" },
      { a: "WordPress", b: "Webflow" },
      { a: "Shopify", b: "WooCommerce" },
    ],
  },
  {
    name: "🎬 Entertainment",
    comparisons: [
      { a: "Netflix", b: "Disney+" },
      { a: "Spotify", b: "Apple Music" },
      { a: "ChatGPT", b: "Claude" },
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

export default function PopularPage() {
  const totalComparisons = categories.reduce((sum, c) => sum + c.comparisons.length, 0);

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

      {/* CTA */}
      <div className="mt-16 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-8 text-center">
        <h3 className="text-xl font-bold text-white">Don't see what you need?</h3>
        <p className="mt-2 text-gray-400">Compare anything — just type two things and our AI does the rest.</p>
        <Link
          href="/compare"
          className="mt-6 inline-block rounded-xl bg-violet-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-violet-500"
        >
          Start a Comparison →
        </Link>
      </div>
    </div>
  );
}
