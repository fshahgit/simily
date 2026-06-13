import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import NavLinks from "./components/NavLinks";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Simily — Compare Anything with AI",
  description: "AI-powered comparisons for products, tools, concepts, and more. Make smarter decisions instantly.",
  keywords: "compare, vs, comparison, AI, product comparison",
  verification: {
    google: "kbKSsucdTXLe-T6hCQ6D92bxINmZU9YhUT5i2gQdOko",
  },
  openGraph: {
    title: "Simily — Compare Anything with AI",
    description: "AI-powered comparisons for products, tools, concepts, and more.",
    url: "https://www.simily.org",
    siteName: "Simily",
    type: "website",
    images: [{ url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=630&fit=crop&auto=format&q=80", width: 1200, height: 630, alt: "Simily — Compare Anything with AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simily — Compare Anything with AI",
    description: "AI-powered comparisons for products, tools, concepts, and more.",
    images: ["https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=630&fit=crop&auto=format&q=80"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col text-slate-800 font-sans">
        <header className="sticky top-0 z-50 px-3 pt-3">
          <div className="max-w-6xl mx-auto glass-strong rounded-2xl px-4 sm:px-5 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight group">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-sm shadow-sm group-hover:scale-105 transition-transform">⇄</span>
              <span className="text-slate-900">Simily</span>
              <span className="text-slate-400 text-sm font-normal hidden sm:block">— Compare Anything</span>
            </Link>
            <NavLinks />
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mt-10 border-t border-white/60 py-10 text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Simily.org — AI-powered comparisons</p>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
