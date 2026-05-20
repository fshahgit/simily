"use client";

import { useState } from "react";
import Link from "next/link";
import LogoAvatar from "../components/LogoAvatar";
import { type BestTopic, BEST_CATEGORIES, REGIONS } from "../lib/best";

function TopicCard({ topic }: { topic: BestTopic }) {
  return (
    <Link
      href={`/best/${topic.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-gray-800 bg-gray-900 p-5 transition-all hover:border-violet-500/40 hover:bg-gray-800"
    >
      <div className="flex items-center gap-1.5 flex-wrap">
        {topic.items.slice(0, 5).map((item) => (
          <LogoAvatar key={item} name={item} size={24} />
        ))}
        {topic.items.length > 5 && (
          <span className="text-xs text-gray-600">+{topic.items.length - 5}</span>
        )}
      </div>
      <div>
        <h3 className="font-semibold text-white group-hover:text-violet-300 transition-colors text-sm leading-snug">
          {topic.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{topic.description}</p>
      </div>
      <span className="text-xs text-violet-400 font-medium">See rankings →</span>
    </Link>
  );
}

interface Props {
  topics: BestTopic[];
}

const ALL_CATS = BEST_CATEGORIES.filter((c) => c !== "By Region");

export default function BestClient({ topics }: Props) {
  const [active, setActive] = useState<string | null>(null);

  const standardTopics = topics.filter((t) => t.category !== "By Region");
  const regionalTopics = topics.filter((t) => t.category === "By Region");

  // When a filter is active, show flat filtered grid; otherwise show categorised layout
  const filteredStandard = active
    ? standardTopics.filter((t) => t.category === active)
    : standardTopics;

  const showRegions = !active || active === "By Region";

  return (
    <div className="space-y-10">
      {/* Category filter row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-medium text-gray-400">Browse:</span>

        <button
          onClick={() => setActive(null)}
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
            active === null
              ? "bg-gray-100 text-gray-900 border-gray-100"
              : "bg-gray-500/15 text-gray-300 border-gray-500/30 hover:border-gray-400"
          }`}
        >
          All
        </button>

        {ALL_CATS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(active === cat ? null : cat)}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
              active === cat
                ? "bg-violet-500 text-white border-violet-500"
                : "bg-violet-500/10 text-violet-300 border-violet-500/20 hover:border-violet-400"
            }`}
          >
            {cat}
          </button>
        ))}

        <button
          onClick={() => setActive(active === "By Region" ? null : "By Region")}
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
            active === "By Region"
              ? "bg-emerald-500 text-white border-emerald-500"
              : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:border-emerald-400"
          }`}
        >
          By Region
        </button>
      </div>

      {/* Standard categories */}
      {active === null ? (
        // No filter — show all sections with category headers
        ALL_CATS.map((cat) => {
          const catTopics = standardTopics.filter((t) => t.category === cat);
          if (catTopics.length === 0) return null;
          return (
            <section key={cat} className="space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 border-b border-gray-800 pb-2">
                {cat}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {catTopics.map((topic) => (
                  <TopicCard key={topic.slug} topic={topic} />
                ))}
              </div>
            </section>
          );
        })
      ) : active !== "By Region" ? (
        // Category filter active — flat grid
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 border-b border-gray-800 pb-2">
            {active}
          </h2>
          {filteredStandard.length === 0 ? (
            <p className="py-8 text-center text-gray-500">No guides in this category yet.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStandard.map((topic) => (
                <TopicCard key={topic.slug} topic={topic} />
              ))}
            </div>
          )}
        </section>
      ) : null}

      {/* By Region section */}
      {showRegions && regionalTopics.length > 0 && (
        <section className="space-y-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 border-b border-gray-800 pb-2">
            By Region
          </h2>
          {REGIONS.map((region) => {
            const regionTopics = regionalTopics.filter((t) => t.region === region);
            if (regionTopics.length === 0) return null;
            return (
              <div key={region} className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-300">{region}</h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {regionTopics.map((topic) => (
                    <TopicCard key={topic.slug} topic={topic} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
