import type { MetadataRoute } from "next";

const BASE_URL = "https://simily.org";

const popularComparisons = [
  { a: "iPhone 16", b: "Samsung Galaxy S25" },
  { a: "React", b: "Vue" },
  { a: "Notion", b: "Obsidian" },
  { a: "Keto Diet", b: "Intermittent Fasting" },
  { a: "Python", b: "JavaScript" },
  { a: "Netflix", b: "Disney+" },
  { a: "Mac", b: "Windows" },
  { a: "ChatGPT", b: "Claude" },
  { a: "iPhone", b: "Android" },
  { a: "Spotify", b: "Apple Music" },
  { a: "WordPress", b: "Webflow" },
  { a: "React", b: "Next.js" },
  { a: "MySQL", b: "PostgreSQL" },
  { a: "AWS", b: "Google Cloud" },
  { a: "Shopify", b: "WooCommerce" },
  { a: "TypeScript", b: "JavaScript" },
  { a: "LinkedIn", b: "Indeed" },
  { a: "Zoom", b: "Google Meet" },
  { a: "Figma", b: "Adobe XD" },
  { a: "Docker", b: "Kubernetes" },
  { a: "Tesla Model 3", b: "BMW 3 Series" },
  { a: "iPad", b: "Samsung Galaxy Tab" },
  { a: "AirPods Pro", b: "Sony WH-1000XM5" },
  { a: "Slack", b: "Microsoft Teams" },
  { a: "GitHub", b: "GitLab" },
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
      url: `${BASE_URL}/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/popular`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const comparisonPages: MetadataRoute.Sitemap = popularComparisons.map(({ a, b }) => {
    const slug = `${a.toLowerCase().replace(/ /g, "-")}-vs-${b.toLowerCase().replace(/ /g, "-")}`;
    return {
      url: `${BASE_URL}/compare/${slug}?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  return [...staticPages, ...comparisonPages];
}
