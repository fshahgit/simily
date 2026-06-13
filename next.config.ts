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

  // 301 redirects: strip query params from compare URLs
  // Old URLs like ?a=Amazon&b=Shopee or ?a=acko&b=policybazaar indexed by Google
  async redirects() {
    return [
      {
        source: "/compare/:slug",
        has: [{ type: "query", key: "a" }],
        destination: "/compare/:slug",
        permanent: true,
      },
      {
        source: "/compare/:slug",
        has: [{ type: "query", key: "b" }],
        destination: "/compare/:slug",
        permanent: true,
      },
      // Fix broken shadcn/ui slug — slash in name created a 404
      {
        source: "/compare/shadcn/ui-vs-material-ui",
        destination: "/compare/shadcn-ui-vs-material-ui",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
