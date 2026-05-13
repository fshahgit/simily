import type { MetadataRoute } from "next";

const BASE_URL = "https://www.simily.org";

const allComparisons = [
  // Tech & Gadgets
  { a: "iPhone 16", b: "Samsung Galaxy S25" },
  { a: "iPhone", b: "Google Pixel" },
  { a: "iPad", b: "Samsung Galaxy Tab" },
  { a: "Mac", b: "Windows" },
  { a: "iPhone", b: "Android" },
  { a: "AirPods Pro", b: "Sony WH-1000XM5" },

  // AI Tools
  { a: "ChatGPT", b: "Claude" },
  { a: "Gemini", b: "ChatGPT" },
  { a: "Perplexity", b: "ChatGPT" },
  { a: "Midjourney", b: "DALL-E" },
  { a: "Cursor", b: "GitHub Copilot" },

  // Code Editors
  { a: "VS Code", b: "Cursor" },
  { a: "VS Code", b: "JetBrains" },
  { a: "Vim", b: "Neovim" },

  // Programming & Dev
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

  // Tools & Software
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

  // Gaming
  { a: "PS5", b: "Xbox Series X" },
  { a: "Nintendo Switch", b: "Steam Deck" },

  // Entertainment
  { a: "Netflix", b: "Disney+" },
  { a: "Spotify", b: "Apple Music" },
  { a: "YouTube", b: "TikTok" },

  // Health & Lifestyle
  { a: "Keto Diet", b: "Intermittent Fasting" },
  { a: "Tesla Model 3", b: "BMW 3 Series" },
  { a: "LinkedIn", b: "Indeed" },
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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/popular`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const comparisonPages: MetadataRoute.Sitemap = allComparisons.map(({ a, b }) => {
    const slug = `${a.toLowerCase().replace(/ /g, "-")}-vs-${b.toLowerCase().replace(/ /g, "-")}`;
    return {
      url: `${BASE_URL}/compare/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  const threeWayPages: MetadataRoute.Sitemap = threeWayComparisons.map(({ a, b, c }) => {
    const slug = [a, b, c].map((s) => s.toLowerCase().replace(/ /g, "-")).join("-vs-");
    return {
      url: `${BASE_URL}/compare/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    };
  });

  return [...staticPages, ...comparisonPages, ...threeWayPages];
}
