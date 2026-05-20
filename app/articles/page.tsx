import type { Metadata } from "next";
import Link from "next/link";
import { ALL_ARTICLES, ARTICLE_CATEGORIES } from "../lib/articles";

export const metadata: Metadata = {
  title: "Articles — Simily",
  description:
    "In-depth articles on AI tools, laptops, apps, and tech — written to help you make smarter decisions.",
  alternates: { canonical: "https://www.simily.org/articles" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  AI: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  Laptops: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Apps: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Phones: "bg-orange-500/15 text-orange-300 border-orange-500/30",
};

function categoryClass(cat: string) {
  return (
    CATEGORY_COLORS[cat] ?? "bg-gray-500/15 text-gray-300 border-gray-500/30"
  );
}

export default function ArticlesPage() {
  const featured = ALL_ARTICLES[0];
  const rest = ALL_ARTICLES.slice(1);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white">Articles</h1>
        <p className="mt-3 text-gray-400">
          In-depth guides on AI, laptops, apps, and tech — to help you decide faster.
        </p>
      </div>

      {/* Featured article */}
      <Link
        href={`/articles/${featured.slug}`}
        className="group mb-10 flex flex-col gap-4 rounded-2xl border border-gray-800 bg-gray-900 p-6 transition-all hover:border-violet-500/50 hover:bg-gray-800 sm:flex-row sm:items-center sm:gap-8"
      >
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-4xl">
          {featured.coverEmoji}
        </div>
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryClass(featured.category)}`}
            >
              {featured.category}
            </span>
            <span className="text-xs text-gray-500">{formatDate(featured.date)}</span>
            <span className="text-xs text-gray-500">·</span>
            <span className="text-xs text-gray-500">{featured.readTime} min read</span>
          </div>
          <h2 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
            {featured.title}
          </h2>
          <p className="mt-1 text-sm text-gray-400 leading-relaxed">{featured.description}</p>
        </div>
      </Link>

      {/* Category filter row */}
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="text-sm font-medium text-gray-400 self-center mr-2">Browse:</span>
        {ARTICLE_CATEGORIES.map((cat) => (
          <span
            key={cat}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${categoryClass(cat)}`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Article grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group flex flex-col rounded-xl border border-gray-800 bg-gray-900 p-5 transition-all hover:border-violet-500/50 hover:bg-gray-800"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-xl">
                {article.coverEmoji}
              </div>
              <span
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${categoryClass(article.category)}`}
              >
                {article.category}
              </span>
            </div>
            <h3 className="flex-1 text-sm font-semibold text-white group-hover:text-violet-300 transition-colors leading-snug">
              {article.title}
            </h3>
            <p className="mt-2 text-xs text-gray-500 leading-relaxed line-clamp-2">
              {article.description}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
              <span>{formatDate(article.date)}</span>
              <span>·</span>
              <span>{article.readTime} min read</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
