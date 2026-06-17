import type { Metadata } from "next";
import { ALL_ARTICLES, ARTICLE_CATEGORIES } from "../lib/articles";
import ArticlesClient from "./ArticlesClient";

export const metadata: Metadata = {
  title: "Articles — Simily",
  description:
    "In-depth articles on AI tools, laptops, apps, and tech — written to help you make smarter decisions.",
  alternates: { canonical: "https://simily.org/articles" },
};

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Articles</h1>
        <p className="mt-3 text-gray-400">
          In-depth guides on AI, laptops, apps, and tech — to help you decide faster.
        </p>
      </div>

      <ArticlesClient
        articles={[...ALL_ARTICLES].sort((a, b) => b.date.localeCompare(a.date))}
        categories={ARTICLE_CATEGORIES}
      />
    </div>
  );
}
