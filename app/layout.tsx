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
      <body className="min-h-full flex flex-col bg-[#070b12] text-slate-100 font-sans">
        <header className="border-b border-slate-800/60 bg-[#070b12]/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight group">
              <span className="text-violet-400 group-hover:text-violet-300 transition-colors">⇄</span>
              <span className="text-white">Simily</span>
              <span className="text-slate-500 text-sm font-normal hidden sm:block">— Compare Anything</span>
            </Link>
            <nav className="flex items-center gap-4 sm:gap-6 text-sm text-slate-400">
              <Link href="/search" className="hover:text-white transition-colors hidden sm:block">Search</Link>
              <Link href="/popular" className="hover:text-white transition-colors hidden sm:block">Popular</Link>
              <Link href="/best" className="hover:text-violet-300 transition-colors font-medium text-violet-400">Best Of</Link>
              <Link href="/articles" className="hover:text-teal-300 transition-colors font-medium text-teal-400">Articles</Link>
              <Link href="/news" className="hover:text-orange-300 transition-colors font-medium text-orange-400 flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-400"></span>
                </span>
                News
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-800/60 py-10 text-center text-sm text-slate-600">
          <p>© {new Date().getFullYear()} Simily.org — AI-powered comparisons</p>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
