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
    url: "https://simily.org",
    siteName: "Simily",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100 font-sans">
        <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <span className="text-violet-400">⇄</span>
              <span>Simily</span>
              <span className="text-gray-500 text-sm font-normal hidden sm:block">— Compare Anything</span>
            </Link>
            <nav className="flex items-center gap-4 sm:gap-6 text-sm text-gray-400">
              <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
              <Link href="/popular" className="hover:text-white transition-colors">Popular</Link>
              <Link href="/best" className="hover:text-white transition-colors font-medium text-violet-400 hover:text-violet-300">Best Of</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-800 py-10 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Simily.org — AI-powered comparisons</p>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
