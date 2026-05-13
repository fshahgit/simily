"use client";

import { useEffect, useRef, useState } from "react";
import CompareForm from "../../components/CompareForm";
import LogoAvatar from "../../components/LogoAvatar";
import ShareButton from "../../components/ShareButton";
import AffiliateSection from "../../components/AffiliateSection";

const MAX_ITEMS = 5;
const ITEM_COLORS = ["bg-violet-500", "bg-blue-500", "bg-emerald-500", "bg-orange-500", "bg-pink-500"];

interface FAQ { question: string; answer: string; }

interface ScoreEntry { name: string; score: number; note: string; }

interface Category { name: string; scores: ScoreEntry[]; winner: string; }

interface ItemData { name: string; pros: string[]; cons: string[]; chooseIf: string; }

interface ComparisonData {
  summary: string;
  winner: string;
  winnerReason: string;
  categories: Category[];
  items: ItemData[];
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

function AddToCompareButton({
  onAdd,
  disabled,
}: {
  onAdd: (name: string) => void;
  disabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
    setOpen(false);
  }

  if (disabled) return null;

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-gray-700 px-4 py-2 text-sm text-gray-500 transition-all hover:border-violet-500/60 hover:text-violet-400"
      >
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add to compare
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. Angular, Svelte…"
        className="rounded-xl border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-violet-500 w-44 transition-colors"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Add
      </button>
      <button
        type="button"
        onClick={() => { setOpen(false); setValue(""); }}
        className="text-gray-600 hover:text-gray-400 transition-colors"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </form>
  );
}

export default function ComparisonClient({ a, b, c }: { a: string; b: string; c?: string }) {
  const [items, setItems] = useState<string[]>([a, b, ...(c ? [c] : [])]);
  const [data, setData] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function fetchComparison() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/compare", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        });
        if (!res.ok) throw new Error("Failed");
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setError("Something went wrong. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchComparison();
    return () => { cancelled = true; };
  }, [items]);

  function handleAddItem(name: string) {
    if (items.length >= MAX_ITEMS) return;
    if (items.map(i => i.toLowerCase()).includes(name.toLowerCase())) return;
    setItems((prev) => [...prev, name]);
  }

  function handleRemoveItem(name: string) {
    if (items.length <= 2) return;
    setItems((prev) => prev.filter((i) => i !== name));
  }

  const canAdd = items.length < MAX_ITEMS;

  // Header section — always shown
  const headerSection = (
    <div className="text-center space-y-4">
      {/* Items row */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        {items.map((item, i) => (
          <div key={item} className="flex items-center gap-2 sm:gap-4">
            {i > 0 && (
              <span className="shrink-0 rounded-full border border-gray-700 bg-gray-900 px-2.5 py-1 text-xs font-bold text-gray-400">
                VS
              </span>
            )}
            <div className="group relative flex flex-col items-center gap-2">
              <LogoAvatar name={item} size={56} />
              <span className="text-base font-bold text-violet-300 leading-tight text-center max-w-[100px] break-words">
                {item}
              </span>
              {/* Remove button (only if 3+ items) */}
              {items.length > 2 && (
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-gray-800 border border-gray-700 p-0.5 text-gray-500 hover:text-red-400 hover:border-red-500/40"
                  title="Remove"
                >
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add button inline */}
        {canAdd && (
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="shrink-0 rounded-full border border-gray-700 bg-gray-900 px-2.5 py-1 text-xs font-bold text-gray-400">
              VS
            </span>
            <AddToCompareButton onAdd={handleAddItem} disabled={!canAdd} />
          </div>
        )}
      </div>

      <h1 className="sr-only">{items.join(" vs ")}</h1>

      {/* Share */}
      <div className="flex items-center justify-center">
        <ShareButton a={items[0]} b={items[1]} />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 space-y-10">
        {headerSection}
        <div className="flex flex-col items-center justify-center gap-4 py-24">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-violet-500" />
          <p className="text-gray-400 text-sm">
            AI is analyzing{" "}
            {items.map((item, i) => (
              <span key={item}>
                {i > 0 && " vs "}
                <span className="text-white font-medium">{item}</span>
              </span>
            ))}
            {"…"}
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 space-y-10">
        {headerSection}
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <p className="text-red-400">{error || "No data returned."}</p>
          <button
            onClick={() => setItems([...items])}
            className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const itemsCount = items.length;
  const prosConsCols = itemsCount <= 2 ? "sm:grid-cols-2" : itemsCount === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-10">
      {headerSection}

      {/* Summary + Winner banner */}
      <div className="space-y-4">
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base text-center">
          {data.summary}
        </p>
        <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-6 text-center">
          <p className="text-xs uppercase tracking-widest text-violet-400 font-semibold mb-3">Overall Winner</p>
          <div className="flex items-center justify-center gap-3">
            <LogoAvatar name={data.winner} size={40} />
            <p className="text-2xl font-bold text-white">{data.winner}</p>
          </div>
          <p className="mt-2 text-sm text-gray-400">{data.winnerReason}</p>
        </div>
      </div>

      {/* Category scores — stacked bars */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900 overflow-hidden">
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
            {cat.scores.map((entry, i) => (
              <div key={entry.name} className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <LogoAvatar name={entry.name} size={16} />
                  <span className="text-xs text-gray-400 w-24 truncate shrink-0">{entry.name}</span>
                  <div className="h-1.5 flex-1 rounded-full bg-gray-800">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-700 ${ITEM_COLORS[i % ITEM_COLORS.length]}`}
                      style={{ width: `${entry.score * 10}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-400 w-4 shrink-0 text-right">{entry.score}</span>
                </div>
                <p className="text-xs text-gray-600 pl-[104px]">{entry.note}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Pros & Cons */}
      <div className={`grid gap-4 ${prosConsCols}`}>
        {data.items.map((item, i) => (
          <div key={item.name} className="rounded-2xl border border-gray-800 bg-gray-900 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-1.5 h-8 rounded-full ${ITEM_COLORS[i % ITEM_COLORS.length]} shrink-0`} />
              <LogoAvatar name={item.name} size={32} />
              <h3 className="font-bold text-white">{item.name}</h3>
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
        {data.items.map((item, i) => (
          <div key={item.name} className="flex gap-3 items-start">
            <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${ITEM_COLORS[i % ITEM_COLORS.length]}`} />
            <p className="text-gray-300 text-sm">
              <span className="text-white font-semibold">{item.name}:</span> {item.chooseIf}
            </p>
          </div>
        ))}
      </div>

      {/* Affiliate links */}
      <AffiliateSection a={items[0]} b={items[1]} c={items[2]} />

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

      {/* New comparison CTA */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
        <h3 className="font-semibold text-white mb-4 text-center">Try Another Comparison</h3>
        <CompareForm />
      </div>
    </div>
  );
}
