"use client";

import { useEffect, useRef, useState } from "react";
import CompareForm from "../../components/CompareForm";
import LogoAvatar from "../../components/LogoAvatar";
import ShareButton from "../../components/ShareButton";
import AffiliateSection from "../../components/AffiliateSection";
import SuggestionsInput from "../../components/SuggestionsInput";

const MAX_ITEMS = 5;
const ITEM_COLORS = ["bg-blue-500", "bg-cyan-400", "bg-emerald-500", "bg-orange-500", "bg-pink-500"];

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
    <div className="divide-y divide-slate-200">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            className="flex w-full items-center justify-between gap-4 py-4 text-left"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="text-sm font-semibold text-slate-800 pr-2">{faq.question}</span>
            <span className={`flex-shrink-0 text-violet-600 transition-transform duration-200 ${openIndex === i ? "rotate-45" : ""}`}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
          </button>
          {openIndex === i && (
            <p className="pb-4 text-sm text-slate-500 leading-relaxed">{faq.answer}</p>
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
        className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-400 transition-all hover:border-violet-400 hover:text-violet-600 bg-white shadow-sm"
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
      <SuggestionsInput
        value={value}
        onChange={setValue}
        onSelect={(val) => { setValue(val); }}
        placeholder="e.g. Svelte, Angular…"
        autoFocus
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-violet-500 w-44 transition-colors shadow-sm"
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
        className="text-slate-400 hover:text-slate-600 transition-colors"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </form>
  );
}

export default function ComparisonClient({ a, b, c, initialData }: { a: string; b: string; c?: string; initialData?: ComparisonData }) {
  const [items, setItems] = useState<string[]>([a, b, ...(c ? [c] : [])]);
  const [data, setData] = useState<ComparisonData | null>(initialData ?? null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState("");
  // Skip the initial client-side fetch when server already provided data
  const skipInitialFetch = useRef(!!initialData);

  useEffect(() => {
    // Skip the very first render when server-side data was provided
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }
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
        if (res.status === 429) throw new Error("You've made too many comparisons. Please wait an hour and try again.");
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
      <div className="flex items-center justify-center gap-1.5 sm:gap-4 flex-wrap">
        {items.map((item, i) => (
          <div key={item} className="flex items-center gap-2 sm:gap-4">
            {i > 0 && (
              <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-500 shadow-sm">
                VS
              </span>
            )}
            <div className="group relative flex flex-col items-center gap-2">
              <LogoAvatar name={item} size={56} />
              <span className="text-base font-bold text-violet-600 leading-tight text-center max-w-[100px] break-words">
                {item}
              </span>
              {items.length > 2 && (
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-white border border-slate-200 shadow-sm p-0.5 text-slate-400 hover:text-red-500 hover:border-red-300"
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

        {canAdd && (
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-500 shadow-sm">
              VS
            </span>
            <AddToCompareButton onAdd={handleAddItem} disabled={!canAdd} />
          </div>
        )}
      </div>

      <h1 className="sr-only">{items.join(" vs ")}</h1>

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
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-violet-600" />
          <p className="text-slate-500 text-sm">
            AI is analyzing{" "}
            {items.map((item, i) => (
              <span key={item}>
                {i > 0 && " vs "}
                <span className="text-slate-900 font-medium">{item}</span>
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
          <p className="text-red-500">{error || "No data returned."}</p>
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
        <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base text-center">
          {data.summary}
        </p>
        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-6 text-center">
          <p className="text-xs uppercase tracking-widest text-violet-600 font-semibold mb-3">Overall Winner</p>
          <div className="flex items-center justify-center gap-3">
            <LogoAvatar name={data.winner} size={40} />
            <p className="text-2xl font-bold text-slate-900">{data.winner}</p>
          </div>
          <p className="mt-2 text-sm text-slate-500">{data.winnerReason}</p>
        </div>
      </div>

      {/* Category scores */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        {itemsCount === 2 ? (
          <>
            <div className="grid grid-cols-3 border-b border-slate-200 px-3 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-slate-500 bg-slate-50">
              <div className="flex items-center gap-1.5">
                <LogoAvatar name={items[0]} size={18} />
                <span className="truncate max-w-[60px] sm:max-w-none">{items[0]}</span>
              </div>
              <span className="text-center">Category</span>
              <div className="flex items-center justify-end gap-1.5">
                <span className="truncate text-right max-w-[60px] sm:max-w-none">{items[1]}</span>
                <LogoAvatar name={items[1]} size={18} />
              </div>
            </div>
            {data.categories.map((cat) => {
              const scoreA = cat.scores[0];
              const scoreB = cat.scores[1];
              return (
                <div key={cat.name} className="grid grid-cols-3 items-center gap-2 sm:gap-4 border-b border-slate-200 px-3 sm:px-6 py-3 sm:py-4 last:border-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 flex-1 rounded-full bg-slate-200">
                        <div className="h-2 rounded-full bg-blue-500 transition-all duration-700" style={{ width: `${(scoreA?.score ?? 0) * 10}%` }} />
                      </div>
                      <span className="w-5 text-right text-xs font-bold text-slate-500">{scoreA?.score}</span>
                    </div>
                    <p className="text-xs text-slate-400 hidden sm:block">{scoreA?.note}</p>
                  </div>
                  <div className="text-center px-1">
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-tight">{cat.name}</p>
                    <p className="text-xs text-violet-600 mt-0.5 truncate">{cat.winner}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 text-xs font-bold text-slate-500">{scoreB?.score}</span>
                      <div className="h-2 flex-1 rounded-full bg-slate-200">
                        <div className="h-2 rounded-full bg-cyan-400 transition-all duration-700" style={{ width: `${(scoreB?.score ?? 0) * 10}%` }} />
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 text-right hidden sm:block">{scoreB?.note}</p>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <div
              className="border-b border-slate-200 bg-slate-50 px-3 sm:px-6 py-3 grid gap-2 sm:gap-3 overflow-x-auto"
              style={{ gridTemplateColumns: `90px repeat(${itemsCount}, 1fr)` }}
            >
              <span className="text-xs sm:text-sm font-semibold text-slate-500">Category</span>
              {items.map((item, i) => (
                <div key={item} className="flex items-center justify-center gap-1.5 min-w-0">
                  <LogoAvatar name={item} size={18} />
                  <span className={`text-xs font-semibold truncate ${["text-blue-500","text-cyan-500","text-emerald-500","text-orange-500","text-pink-500"][i % 5]}`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
            {data.categories.map((cat) => (
              <div key={cat.name} className="border-b border-slate-200 last:border-0">
                <div
                  className="grid gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 items-start overflow-x-auto"
                  style={{ gridTemplateColumns: `90px repeat(${itemsCount}, 1fr)` }}
                >
                  <div className="space-y-1 pt-1">
                    <p className="text-sm font-semibold text-slate-700 leading-tight">{cat.name}</p>
                    <span className="inline-block text-xs text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded-full border border-violet-200 leading-tight">
                      {cat.winner} wins
                    </span>
                  </div>
                  {cat.scores.map((entry, i) => (
                    <div key={entry.name} className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 flex-1 rounded-full bg-slate-200">
                          <div
                            className={`h-2 rounded-full transition-all duration-700 ${ITEM_COLORS[i % ITEM_COLORS.length]}`}
                            style={{ width: `${entry.score * 10}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-500 shrink-0 w-4 text-right">{entry.score}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-snug">{entry.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Pros & Cons */}
      <div className={`grid gap-4 ${prosConsCols}`}>
        {data.items.map((item, i) => (
          <div key={item.name} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-1.5 h-8 rounded-full ${ITEM_COLORS[i % ITEM_COLORS.length]} shrink-0`} />
              <LogoAvatar name={item.name} size={32} />
              <h3 className="font-bold text-slate-900">{item.name}</h3>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-green-600 font-semibold mb-2">Pros</p>
              <ul className="space-y-1.5">
                {item.pros.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-slate-600">
                    <span className="mt-0.5 text-green-500 flex-shrink-0">✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-red-500 font-semibold mb-2">Cons</p>
              <ul className="space-y-1.5">
                {item.cons.map((con) => (
                  <li key={con} className="flex gap-2 text-sm text-slate-600">
                    <span className="mt-0.5 text-red-500 flex-shrink-0">✗</span> {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Verdict */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 shadow-sm">
        <h3 className="font-bold text-slate-900 text-lg">Who Should Choose What?</h3>
        {data.items.map((item, i) => (
          <div key={item.name} className="flex gap-3 items-start">
            <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${ITEM_COLORS[i % ITEM_COLORS.length]}`} />
            <p className="text-slate-600 text-sm">
              <span className="text-slate-900 font-semibold">{item.name}:</span> {item.chooseIf}
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
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-2 shadow-sm">
            <h2 className="pt-4 pb-2 text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
            <FaqAccordion faqs={data.faqs} />
          </div>
        </>
      )}

      {/* New comparison CTA */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4 text-center">Try Another Comparison</h3>
        <CompareForm />
      </div>
    </div>
  );
}
