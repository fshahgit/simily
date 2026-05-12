"use client";

import { useEffect, useState } from "react";
import CompareForm from "../../components/CompareForm";
import LogoAvatar from "../../components/LogoAvatar";
import ShareButton from "../../components/ShareButton";

interface Category {
  name: string;
  aScore: number;
  bScore: number;
  aNote: string;
  bNote: string;
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
  verdict: { chooseA: string; chooseB: string };
}

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 rounded-full bg-gray-800">
        <div
          className="h-2 rounded-full bg-violet-500 transition-all duration-700"
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="w-6 text-right text-xs font-bold text-gray-400">{score}</span>
    </div>
  );
}

export default function ComparisonClient({ a, b }: { a: string; b: string }) {
  const [data, setData] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchComparison() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/compare", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ a, b }),
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
  }, [a, b]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-violet-500" />
        <p className="text-gray-400 text-sm">AI is analyzing <span className="text-white font-medium">{a}</span> vs <span className="text-white font-medium">{b}</span>…</p>
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

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-10">
      {/* Title with logos */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          {/* Item A */}
          <div className="flex flex-col items-center gap-2 min-w-0">
            <LogoAvatar name={a} size={64} />
            <span className="text-lg font-bold text-violet-300 leading-tight text-center">{a}</span>
          </div>
          {/* VS badge */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <span className="rounded-full border border-gray-700 bg-gray-900 px-3 py-1 text-xs font-bold text-gray-400 tracking-widest">
              VS
            </span>
          </div>
          {/* Item B */}
          <div className="flex flex-col items-center gap-2 min-w-0">
            <LogoAvatar name={b} size={64} />
            <span className="text-lg font-bold text-violet-300 leading-tight text-center">{b}</span>
          </div>
        </div>
        <h1 className="sr-only">{a} vs {b}</h1>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">{data.summary}</p>
        <ShareButton a={a} b={b} />
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
              <ScoreBar score={cat.aScore} />
              <p className="text-xs text-gray-500">{cat.aNote}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-200">{cat.name}</p>
              <p className="text-xs text-violet-400 mt-0.5">{cat.winner}</p>
            </div>
            <div className="space-y-1">
              <ScoreBar score={cat.bScore} />
              <p className="text-xs text-gray-500 text-right">{cat.bNote}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pros & Cons */}
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { label: a, pros: data.aPros, cons: data.aCons },
          { label: b, pros: data.bPros, cons: data.bCons },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-gray-800 bg-gray-900 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <LogoAvatar name={item.label} size={36} />
              <h3 className="font-bold text-white text-lg">{item.label}</h3>
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
                {item.cons.map((c) => (
                  <li key={c} className="flex gap-2 text-sm text-gray-300">
                    <span className="mt-0.5 text-red-400 flex-shrink-0">✗</span> {c}
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
        <div className="flex gap-3 items-start">
          <span className="text-violet-400 font-bold text-sm mt-0.5 flex-shrink-0">→</span>
          <p className="text-gray-300 text-sm"><span className="text-white font-semibold">{a}:</span> {data.verdict.chooseA}</p>
        </div>
        <div className="flex gap-3 items-start">
          <span className="text-violet-400 font-bold text-sm mt-0.5 flex-shrink-0">→</span>
          <p className="text-gray-300 text-sm"><span className="text-white font-semibold">{b}:</span> {data.verdict.chooseB}</p>
        </div>
      </div>

      {/* New comparison CTA */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
        <h3 className="font-semibold text-white mb-4 text-center">Try Another Comparison</h3>
        <CompareForm />
      </div>
    </div>
  );
}
