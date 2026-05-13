import type { MetadataRoute } from "next";
import { ALL_COMPARISONS, makeSlug } from "./lib/comparisons";
import { ALL_BEST_TOPICS } from "./lib/best";

const BASE_URL = "https://www.simily.org";

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
    {
      url: `${BASE_URL}/best`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const comparisonPages: MetadataRoute.Sitemap = ALL_COMPARISONS.map(({ a, b }) => ({
    url: `${BASE_URL}/compare/${makeSlug(a, b)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const bestPages: MetadataRoute.Sitemap = ALL_BEST_TOPICS.map(({ slug }) => ({
    url: `${BASE_URL}/best/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...comparisonPages, ...bestPages];
}
