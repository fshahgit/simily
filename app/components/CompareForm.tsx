"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import SuggestionsInput from "./SuggestionsInput";

export default function CompareForm() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimA = a.trim();
    const trimB = b.trim();
    if (!trimA || !trimB) return;
    const slug = `${trimA.toLowerCase().replace(/ /g, "-")}-vs-${trimB.toLowerCase().replace(/ /g, "-")}`;
    router.push(`/compare/${encodeURIComponent(slug)}?a=${encodeURIComponent(trimA)}&b=${encodeURIComponent(trimB)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:gap-2">
      <SuggestionsInput
        value={a}
        onChange={setA}
        placeholder="e.g. iPhone 16"
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all shadow-sm"
      />
      <div className="flex items-center justify-center text-sm font-bold text-violet-600 sm:px-1">
        VS
      </div>
      <SuggestionsInput
        value={b}
        onChange={setB}
        placeholder="e.g. Samsung Galaxy S25"
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all shadow-sm"
      />
      <button
        type="submit"
        className="rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-violet-500 active:bg-violet-700"
      >
        Compare →
      </button>
    </form>
  );
}
