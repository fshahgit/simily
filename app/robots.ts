import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/opengraph-image",
        "/compare/*/opengraph-image",
        "/articles/*/opengraph-image",
        "/best/*/opengraph-image",
      ],
    },
    sitemap: "https://simily.org/sitemap.xml",
  };
}
