import type { Metadata } from "next";
import NewsClient from "./NewsClient";
import { getLatestNews } from "../lib/news";

export const metadata: Metadata = {
  title: "Tech News — Daily AI, Blockchain & Tech Stories | Simily",
  description:
    "Daily curated tech news: AI breakthroughs, blockchain developments, gadget launches, and the stories shaping technology. Updated every morning.",
  openGraph: {
    title: "Tech News — Daily AI, Blockchain & Tech Stories | Simily",
    description: "Daily curated tech news: AI breakthroughs, blockchain developments, gadget launches, and the stories shaping technology.",
    url: "https://simily.org/news",
    siteName: "Simily",
    type: "website",
  },
  alternates: { canonical: "https://simily.org/news" },
};

export default function NewsPage() {
  const latest = getLatestNews();

  if (!latest) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center text-slate-500">
        No news today — check back tomorrow.
      </div>
    );
  }

  return <NewsClient items={latest.items} date={latest.date} />;
}
