"use client";

import { useEffect, useState } from "react";
import CompareForm from "../../components/CompareForm";
import LogoAvatar from "../../components/LogoAvatar";
import ShareButton from "../../components/ShareButton";
import AffiliateSection from "../../components/AffiliateSection";
import AddThirdItem from "../../components/AddThirdItem";

interface FAQ {
  question: string;
  answer: string;
}

interface Category {
  name: string;
  aScore: number;
  bScore: number;
  cScore?: number;
  aNote: string;
  bNote: string;
  cNote?: string;
  winner: string;
}

interface ComparisonData {
  summary: string;
  winner: string;
  winnerReason: string;
  categories: Category[];
  aPros: string[];
  aCons: string[];
  bPros: string[];
  bCons: string[];
  cPros?: string[];
  cCons?: string[];
  verdict: { chooseA: string; chooseB: string; chooseC?: string };
  faqs?: FAQ[];
}

function FaqAccordion({ faqs }: { faqs: FAQ[] }) {
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

function ScoreBar({ score, color = "bg-violet-500" }: { score: number; color?: string }) {
  return (
    <div className="h-1.5 flex-1 rounded-full bg-gray-800">
      <div className={`h-1.5 rounded-full ${color} transition-all duration-700`} style={{ width: `${score * 10}%` }} />
    </div>
  );
}

export default function ComparisonClient({ a, b, c }: { a: string; b: string; c?: string }) {
  const [data, setData] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isThreeWay = !!c;

  useEffect(() => {
    async function fetchComparison() {
      setLoading(true);
      setError("");
      setData(null);
      try {
        const res = await fetch("/api/compare", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ a, b, c }),
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
    fetchComparison();
  }, [a, b, c]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-violet-500" />
        <p className="text-gray-400 text-sm">
          AI is analyzing{" "}
          <span className="text-white font-medium">{a}</span>
          {" vs "}
          <span className="text-white font-medium">{b}</span>
          {c && <>{" vs "}<span className="text-white font-medium">{c}</span></>}
          {"…"}
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-red-400">{error || "No data returned."}</p>
        <button onClick={() => window.location.reload()} className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">
          Try Again
        </button>
      </div>
    );
  }

  const items = [
    { name: a, pros: data.aPros, cons: data.aCons, chooseText: data.verdict.chooseA, color: "bg-violet-500" },
    { name: b, pros: data.bPros, cons: data.bCons, chooseText: data.verdict.chooseB, color: "bg-blue-500" },
    ...(c && data.cPros ? [{ name: c, pros: data.cPros, cons: data.cCons ?? [], chooseText: data.verdict.chooseC ?? "", color: "bg-emerald-500" }] : []),
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-10">

      {/* Title with logos */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
          {items.map((item, i) => (
            <div key={item.name} className="flex items-center gap-3 sm:gap-6">
              {i > 0 && (
                <div className="shrink-0 rounded-full border border-gray-700 bg-gray-900 px-3 py-1 text-xs font-bold text-gray-400 tracking-widest">
                  VS
                </div>
              )}
              <div className="flex flex-col items-center gap-2">
                <LogoAvatar name={item.name} size={isThreeWay ? 52 : 64} />
                <span className={`${isThreeWay ? "text-base" : "text-lg"} font-bold text-violet-300 leading-tight text-center`}>
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>
        <h1 className="sr-only">{items.map(i => i.name).join(" vs ")}</h1>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">{data.summary}</p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <ShareButton a={a} b={b} />
          {!isThreeWay && <AddThirdItem a={a} b={b} />}
        </div>
      </div>

      {/* Winner banner */}
      <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-6 text-center">
        <p className="text-xs uppercase tracking-widest text-violet-400 font-semibold mb-3">Overall Winner</p>
        <div className="flex items-center justify-center gap-3">
          <LogoAvatar name={data.winner} size={40} />
          <p className="text-2xl font-bold text-white">{data.winner}</p>
        </div>
        <p className="mt-2 text-sm text-gray-400">{data.winnerReason}</p>
      </div>

      {/* Category scores */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900 overflow-hidden">
        {isThreeWay ? (
          // 3-way: stacked bar layout
          <>
            <div className="border-b border-gray-800 px-6 py-3">
              <span className="text-sm font-semibold text-gray-400">Category Breakdown</span>
            </div>
            {data.categories.map((cat) => (
              <div key={cat.name} className="border-b border-gray-800 px-6 py-4 last:border-0 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-200">{cat.name}</p>
                  <span className="text-xs text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20">
                    {cat.winner} wins
                  </span>
                </div>
                {[
                  { name: a, score: cat.aScore, note: cat.aNote, color: "bg-violet-500" },
                  { name: b, score: cat.bScore, note: cat.bNote, color: "bg-blue-500" },
                  ...(c ? [{ name: c, score: cat.cScore ?? 0, note: cat.cNote ?? "", color: "bg-emerald-500" }] : []),
                ].map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <LogoAvatar name={item.name} size={16} />
                      <span className="text-xs text-gray-400 w-24 truncate shrink-0">{item.name}</span>
                      <ScoreBar score={item.score} color={item.color} />
                      <span className="text-xs font-bold text-gray-400 w-4 shrink-0">{item.score}</span>
                    </div>
                    <p className="text-xs text-gray-600 pl-[104px]">{item.note}</p>
                  </div>
                ))}
              </div>
            ))}
          </>
        ) : (
          // 2-way: original side-by-side layout
          <>
            <div className="grid grid-cols-3 border-b border-gray-800 px-6 py-3 text-sm font-semibold text-gray-400">
              <div className="flex items-center gap-2">
                <LogoAvatar name={a} size={22} />
                <span className="truncate">{a}</span>
              </div>
              <span className="text-center">Category</span>
              <div className="flex items-center justify-end gap-2">
                <span className="truncate text-right">{b}</span>
                <LogoAvatar name={b} size={22} />
              </div>
            </div>
            {data.categories.map((cat) => (
              <div key={cat.name} className="grid grid-cols-3 items-center gap-4 border-b border-gray-800 px-6 py-4 last:border-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-gray-800">
                      <div className="h-1.5 rounded-full bg-violet-500 transition-all duration-700" style={{ width: `${cat.aScore * 10}%` }} />
                    </div>
                    <span className="w-6 text-right text-xs font-bold text-gray-400">{cat.aScore}</span>
                  </div>
                  <p className="text-xs text-gray-500">{cat.aNote}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-200">{cat.name}</p>
                  <p className="text-xs text-violet-400 mt-0.5">{cat.winner}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-xs font-bold text-gray-400">{cat.bScore}</span>
                    <div className="h-1.5 flex-1 rounded-full bg-gray-800">
                      <div className="h-1.5 rounded-full bg-blue-500 transition-all duration-700" style={{ width: `${cat.bScore * 10}%` }} />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-right">{cat.bNote}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Pros & Cons */}
      <div className={`grid gap-4 ${isThreeWay ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {items.map((item) => (
          <div key={item.name} className="rounded-2xl border border-gray-800 bg-gray-900 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <LogoAvatar name={item.name} size={36} />
              <h3 className="font-bold text-white text-lg">{item.name}</h3>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-green-400 font-semibold mb-2">Pros</p>
              <ul className="space-y-1.5">
                {item.pros.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-gray-300">
                    <span className="mt-0.5 text-green-400 flex-shrink-0">✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-2">Cons</p>
              <ul className="space-y-1.5">
                {item.cons.map((con) => (
                  <li key={con} className="flex gap-2 text-sm text-gray-300">
                    <span className="mt-0.5 text-red-400 flex-shrink-0">✗</span> {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Verdict */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 space-y-3">
        <h3 className="font-bold text-white text-lg">Who Should Choose What?</h3>
        {items.map((item) => (
          <div key={item.name} className="flex gap-3 items-start">
            <span className="text-violet-400 font-bold text-sm mt-0.5 flex-shrink-0">→</span>
            <p className="text-gray-300 text-sm">
              <span className="text-white font-semibold">{item.name}:</span> {item.chooseText}
            </p>
          </div>
        ))}
      </div>

      {/* Affiliate links */}
      <AffiliateSection a={a} b={b} c={c} />

      {/* FAQ section */}
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

      {/* New comparison CTA */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
        <h3 className="font-semibold text-white mb-4 text-center">Try Another Comparison</h3>
        <CompareForm />
      </div>
    </div>
  );
}
