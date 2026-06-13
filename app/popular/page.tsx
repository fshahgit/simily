import type { Metadata } from "next";
import PopularClient, { type Comparison } from "./PopularClient";

export const metadata: Metadata = {
  title: "Popular Comparisons — Simily",
  description: "Browse the most popular AI-powered comparisons on Simily. Products, tools, diets, frameworks and more.",
  alternates: { canonical: "https://simily.org/popular" },
};

const categories = [
  {
    name: "Tech & Gadgets",
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
    name: "AI Tools",
    comparisons: [
      { a: "ChatGPT", b: "Claude" },
      { a: "Gemini", b: "ChatGPT" },
      { a: "Perplexity", b: "ChatGPT" },
      { a: "Midjourney", b: "DALL-E" },
      { a: "Cursor", b: "GitHub Copilot" },
    ],
  },
  {
    name: "Code Editors",
    comparisons: [
      { a: "VS Code", b: "Cursor" },
      { a: "VS Code", b: "JetBrains" },
      { a: "Cursor", b: "GitHub Copilot" },
      { a: "Vim", b: "Neovim" },
    ],
  },
  {
    name: "Programming & Dev",
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
    name: "Tools & Software",
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
    name: "Gaming",
    comparisons: [
      { a: "PS5", b: "Xbox Series X" },
      { a: "Nintendo Switch", b: "Steam Deck" },
    ],
  },
  {
    name: "Entertainment",
    comparisons: [
      { a: "Netflix", b: "Disney+" },
      { a: "Spotify", b: "Apple Music" },
      { a: "YouTube", b: "TikTok" },
    ],
  },
  {
    name: "Health & Lifestyle",
    comparisons: [
      { a: "Keto Diet", b: "Intermittent Fasting" },
      { a: "Tesla Model 3", b: "BMW 3 Series" },
      { a: "LinkedIn", b: "Indeed" },
    ],
  },
];

// Flatten all comparisons with their category name
const allComparisons: Comparison[] = categories.flatMap((cat) =>
  cat.comparisons.map((c) => ({ ...c, category: cat.name }))
);

const categoryNames = categories.map((c) => c.name);

export default function PopularPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Popular Comparisons</h1>
        <p className="mt-3 text-slate-500">
          Browse {allComparisons.length} AI-powered comparisons across {categories.length} categories
        </p>
      </div>

      <PopularClient comparisons={allComparisons} categoryNames={categoryNames} />
    </div>
  );
}
