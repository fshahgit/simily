"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import LogoAvatar from "../components/LogoAvatar";
import { ALL_COMPARISONS, makeSlug } from "../lib/comparisons";
import { ALL_BEST_TOPICS } from "../lib/best";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const q = query.toLowerCase().trim();

  const comparisons = useMemo(() => {
    if (!q) return ALL_COMPARISONS.slice(0, 12);
    return ALL_COMPARISONS.filter(
      ({ a, b }) =>
        a.toLowerCase().includes(q) || b.toLowerCase().includes(q)
    ).slice(0, 18);
  }, [q]);

  const bestTopics = useMemo(() => {
    if (!q) return ALL_BEST_TOPICS.slice(0, 6);
    return ALL_BEST_TOPICS.filter(
      ({ title, items }) =>
        title.toLowerCase().includes(q) ||
        items.some((i) => i.toLowerCase().includes(q))
    ).slice(0, 9);
  }, [q]);

  const hasResults = comparisons.length > 0 || bestTopics.length > 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Search Comparisons</h1>
        <p className="text-gray-400 text-sm">Find any comparison or best-of guide instantly</p>
      </div>

      {/* Search input */}
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          viewBox="0 0 24 24" width="18" height="18" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for React, Notion, iPhone, Swiggy…"
          autoFocus
          className="w-full rounded-2xl border border-gray-700 bg-gray-900 py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-base"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {!hasResults && q && (
        <div className="text-center py-16 space-y-3">
          <p className="text-gray-400">No results for <span className="text-white font-medium">"{query}"</span></p>
          <p className="text-gray-600 text-sm">Try a different search or</p>
          <Link
            href={`/compare?a=${encodeURIComponent(query)}`}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
          >
            Compare "{query}" with something →
          </Link>
        </div>
      )}

      {/* Best Of results */}
      {bestTopics.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400">
            {q ? "Matching Best Of Guides" : "Popular Best Of Guides"}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bestTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/best/${topic.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 transition-all hover:border-violet-500/40 hover:bg-gray-800"
              >
                <div className="flex shrink-0 items-center gap-1">
                  {topic.items.slice(0, 3).map((item) => (
                    <LogoAvatar key={item} name={item} size={22} />
                  ))}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate group-hover:text-violet-300 transition-colors">
                    {topic.title}
                  </p>
                  <p className="text-xs text-gray-500">{topic.items.length} options ranked</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Comparisons results */}
      {comparisons.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400">
            {q ? "Matching Comparisons" : "Popular Comparisons"}
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {comparisons.map(({ a, b }) => {
              const slug = makeSlug(a, b);
              return (
                <Link
                  key={slug}
                  href={`/compare/${slug}?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`}
                  className="group flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 transition-all hover:border-violet-500/40 hover:bg-gray-800"
                >
                  <LogoAvatar name={a} size={26} />
                  <span className="text-xs font-bold text-gray-500">VS</span>
                  <LogoAvatar name={b} size={26} />
                  <span className="text-sm font-medium text-gray-300 truncate group-hover:text-white transition-colors">
                    {a} vs {b}
                  </span>
                  <span className="ml-auto text-xs text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    Compare →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Start custom comparison CTA */}
      {!q && (
        <div className="rounded-2xl border border-dashed border-gray-700 p-6 text-center space-y-3">
          <p className="text-gray-400 text-sm">Don't see what you're looking for?</p>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
          >
            Compare anything →
          </Link>
        </div>
      )}
    </div>
  );
}
