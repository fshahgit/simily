"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddThirdItem({ a, b }: { a: string; b: string }) {
  const [open, setOpen] = useState(false);
  const [c, setC] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!c.trim()) return;
    const slug = [a, b, c]
      .map((s) => s.toLowerCase().replace(/ /g, "-"))
      .join("-vs-");
    router.push(
      `/compare/${slug}?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}&c=${encodeURIComponent(c.trim())}`
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-gray-700 px-4 py-2 text-sm text-gray-500 transition-all hover:border-violet-500/50 hover:text-violet-400"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add a third to compare
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2"
    >
      <input
        autoFocus
        value={c}
        onChange={(e) => setC(e.target.value)}
        placeholder="e.g. Svelte, Angular…"
        className="rounded-xl border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-violet-500 w-48"
      />
      <button
        type="submit"
        disabled={!c.trim()}
        className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Compare 3
      </button>
      <button
        type="button"
        onClick={() => { setOpen(false); setC(""); }}
        className="text-gray-600 hover:text-gray-400 transition-colors"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </form>
  );
}
