import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // 301 redirect: strip ?a=...&b=... query params from compare URLs
  // These old URLs were indexed by Google — redirect permanently to clean slugs
  async redirects() {
    return [
      {
        source: "/compare/:slug",
        has: [{ type: "query", key: "a" }],
        destination: "/compare/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
