import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/*/opengraph-image",   // Block Next.js OG image endpoints
        "/api/",                // Block API routes
      ],
    },
    sitemap: "https://simily.org/sitemap.xml",
  };
}
