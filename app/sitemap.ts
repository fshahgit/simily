import type { MetadataRoute } from "next";
import { ALL_COMPARISONS, makeSlug } from "./lib/comparisons";

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
  ];

  const comparisonPages: MetadataRoute.Sitemap = ALL_COMPARISONS.map(({ a, b }) => ({
    url: `${BASE_URL}/compare/${makeSlug(a, b)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...comparisonPages];
}
