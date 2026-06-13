import type { Metadata } from "next";
import { ALL_BEST_TOPICS } from "../lib/best";
import BestClient from "./BestClient";

export const metadata: Metadata = {
  title: "Best Of — AI-Ranked Guides | Simily",
  description: "AI-powered 'best of' guides for tools, apps, and services. Find the best AI chatbot, code editor, note-taking app, VPN, and more.",
  openGraph: {
    title: "Best Of — AI-Ranked Guides | Simily",
    description: "AI-powered best-of guides for tools, apps, and services.",
    url: "https://simily.org/best",
    siteName: "Simily",
    type: "website",
  },
  alternates: { canonical: "https://simily.org/best" },
};

export default function BestPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-8">
      {/* Hero */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Best Of Guides</h1>
        <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
          AI-ranked guides to help you pick the right tool, app, or service — without the fluff.
        </p>
      </div>

      <BestClient topics={ALL_BEST_TOPICS} />
    </div>
  );
}
