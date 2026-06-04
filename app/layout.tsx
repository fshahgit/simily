import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";
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
      <body className="min-h-full flex flex-col bg-slate-100 text-slate-900 font-sans">
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <span className="text-violet-600">⇄</span>
              <span className="text-slate-900">Simily</span>
              <span className="text-slate-400 text-sm font-normal hidden sm:block">— Compare Anything</span>
            </Link>
            <nav className="flex items-center gap-4 sm:gap-6 text-sm text-slate-500">
              <Link href="/search" className="hover:text-slate-900 transition-colors hidden sm:block">Search</Link>
              <Link href="/popular" className="hover:text-slate-900 transition-colors hidden sm:block">Popular</Link>
              <Link href="/best" className="hover:text-violet-700 transition-colors font-medium text-violet-600">Best Of</Link>
              <Link href="/articles" className="hover:text-teal-700 transition-colors font-medium text-teal-600">Articles</Link>
              <Link href="/news" className="hover:text-orange-700 transition-colors font-medium text-orange-500 flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                News
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 py-10 text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Simily.org — AI-powered comparisons</p>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
