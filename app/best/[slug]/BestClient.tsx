"use client";

import { useEffect, useState } from "react";
import LogoAvatar from "../../components/LogoAvatar";
import Link from "next/link";
import { makeSlug } from "../../lib/comparisons";

const RANK_STYLES = [
  { badge: "🥇", border: "border-yellow-500/30", bg: "bg-yellow-500/5", label: "text-yellow-400" },
  { badge: "🥈", border: "border-gray-500/30", bg: "bg-gray-500/5", label: "text-gray-400" },
  { badge: "🥉", border: "border-orange-700/30", bg: "bg-orange-700/5", label: "text-orange-400" },
];

interface BestPick {
  rank: number;
  name: string;
  tagline: string;
  why: string;
  pros: string[];
  cons: string[];
  bestFor: string;
}

interface BestData {
  intro: string;
  picks: BestPick[];
  verdict: string;
  faqs: { question: string; answer: string }[];
}

function FaqAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="divide-y divide-gray-800">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            className="flex w-full items-center justify-between gap-4 py-4 text-left"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="text-sm font-semibold text-gray-200 pr-2">{faq.question}</span>
            <span className={`flex-shrink-0 text-violet-400 transition-transform duration-200 ${openIndex === i ? "rotate-45" : ""}`}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
          </button>
          {openIndex === i && (
            <p className="pb-4 text-sm text-gray-400 leading-relaxed">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function BestClient({
  slug,
  title,
  items,
}: {
  slug: string;
  title: string;
  items: string[];
}) {
  const [data, setData] = useState<BestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBest() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/best", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });
        if (!res.ok) throw new Error("Failed");
        const json = await res.json();
        setData(json);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchBest();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-32">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-violet-500" />
        <p className="text-gray-400 text-sm">AI is ranking the best options…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <p className="text-red-400">{error || "No data returned."}</p>
        <button
          onClick={() => setLoading(true)}
          className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Intro */}
      <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base text-center">
        {data.intro}
      </p>

      {/* Ranked picks */}
      <div className="space-y-4">
        {data.picks.map((pick, i) => {
          const style = RANK_STYLES[i] ?? { badge: `#${i + 1}`, border: "border-gray-800", bg: "bg-gray-900", label: "text-gray-400" };
          return (
            <div
              key={pick.name}
              className={`rounded-2xl border ${style.border} ${style.bg} p-6 space-y-4`}
            >
              {/* Header */}
              <div className="flex items-start gap-4">
                <span className="text-3xl leading-none">{style.badge}</span>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <LogoAvatar name={pick.name} size={44} />
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold text-white">{pick.name}</h2>
                    <span className={`text-xs font-semibold uppercase tracking-wider ${style.label}`}>
                      {pick.tagline}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/compare/${makeSlug(items[0], pick.name)}?a=${encodeURIComponent(items[0])}&b=${encodeURIComponent(pick.name)}`}
                  className="hidden sm:inline-flex shrink-0 items-center gap-1 rounded-lg border border-gray-700 px-3 py-1.5 text-xs text-gray-400 hover:border-violet-500/60 hover:text-violet-300 transition-all"
                >
                  Compare →
                </Link>
              </div>

              {/* Why */}
              <p className="text-sm text-gray-300 leading-relaxed">{pick.why}</p>

              {/* Pros / Cons */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-green-400 font-semibold mb-2">Pros</p>
                  <ul className="space-y-1">
                    {pick.pros.map((p) => (
                      <li key={p} className="flex gap-2 text-sm text-gray-300">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-2">Cons</p>
                  <ul className="space-y-1">
                    {pick.cons.map((c) => (
                      <li key={c} className="flex gap-2 text-sm text-gray-300">
                        <span className="text-red-400 flex-shrink-0 mt-0.5">✗</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Best for */}
              <div className="rounded-xl bg-gray-900/60 border border-gray-800 px-4 py-2.5 text-sm">
                <span className="text-violet-400 font-semibold">Best for: </span>
                <span className="text-gray-300">{pick.bestFor}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Verdict */}
      <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6 space-y-2">
        <h2 className="font-bold text-white text-lg">Our Verdict</h2>
        <p className="text-gray-300 text-sm leading-relaxed">{data.verdict}</p>
      </div>

      {/* Compare CTA */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
        <h3 className="font-semibold text-white mb-3 text-center">Compare Two of These Directly</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {items.slice(0, 6).map((item, i) =>
            items.slice(i + 1, 7).map((item2) => (
              <Link
                key={`${item}-${item2}`}
                href={`/compare/${makeSlug(item, item2)}?a=${encodeURIComponent(item)}&b=${encodeURIComponent(item2)}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-700 bg-gray-800 px-3 py-1.5 text-xs text-gray-300 hover:border-violet-500/50 hover:text-violet-300 transition-all"
              >
                <LogoAvatar name={item} size={14} />
                {item} vs {item2}
                <LogoAvatar name={item2} size={14} />
              </Link>
            ))
          )}
        </div>
      </div>

      {/* FAQ */}
      {data.faqs && data.faqs.length > 0 && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: data.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: { "@type": "Answer", text: faq.answer },
                })),
              }),
            }}
          />
          <div className="rounded-2xl border border-gray-800 bg-gray-900 px-6 py-2">
            <h2 className="pt-4 pb-2 text-lg font-bold text-white">Frequently Asked Questions</h2>
            <FaqAccordion faqs={data.faqs} />
          </div>
        </>
      )}
    </div>
  );
}
