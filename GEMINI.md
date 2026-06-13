# Simily — Project Context for Gemini / Antigravity

## What is Simily?
Simily.org is an AI-powered comparison website built with Next.js 15 App Router.
Users compare any two products, tools, or concepts and get an AI-generated breakdown
with scores, pros/cons, and a verdict. Live at https://simily.org

## Tech Stack
- **Framework**: Next.js 15 App Router (SSG + dynamic rendering)
- **Styling**: Tailwind CSS v4 — premium light glassmorphism design system
- **Database/Cache**: Upstash Redis (comparison results cached server-side)
- **Deployment**: Vercel (auto-deploy on push to `main`)
- **AI**: Anthropic Claude API (comparison generation, daily news, articles)
- **Images**: Unsplash (articles, news)
- **Analytics**: Vercel Analytics + Speed Insights

## Project Structure
```
app/
  page.tsx                    # Homepage (bento hero, categories, featured cards)
  layout.tsx                  # Root layout, floating glass nav (uses NavLinks.tsx)
  globals.css                 # Design system — glass, premium-card, gradient-text classes
  compare/[slug]/
    page.tsx                  # SSG compare page — fetches Redis cache server-side for SEO
    ComparisonClient.tsx      # Client: runs AI comparison, shows scores/verdict
  articles/
    page.tsx + ArticlesClient.tsx
  articles/[slug]/page.tsx    # Article detail with hero image, reading progress
  best/
    page.tsx + BestClient.tsx
  best/[slug]/page.tsx        # Best-of ranked list detail
  news/
    page.tsx + NewsClient.tsx # Daily tech news (AI-generated each morning)
  popular/page.tsx + PopularClient.tsx
  search/page.tsx
  components/
    NavLinks.tsx              # Active-state nav (usePathname, purple on active/hover)
    CompareForm.tsx           # Homepage comparison input
    LogoAvatar.tsx            # Brand logo fallback avatars
    RelatedComparisons.tsx    # Related comparisons sidebar
    ShareButtons.tsx          # Social share for articles
    ReadingProgress.tsx       # Scroll progress bar on articles
  lib/
    comparisons.ts            # ALL_COMPARISONS list + makeSlug()
    articles.ts               # ALL_ARTICLES list
    best.ts                   # BEST_TOPICS list
    news.ts                   # NEWS_DAYS — daily news data, categories, colors
    logos.ts                  # Logo URL map per brand
scripts/
  daily-content.mjs           # GitHub Actions cron — generates daily news via Claude API
  prewarm-comparisons.mjs     # Pre-warms Redis for key compare pages
```

## Design System (globals.css)
The entire site uses a **premium light glassmorphism** aesthetic:
- Background: soft blue-violet gradient mesh, fixed attachment
- `.glass` — frosted card (rgba white + backdrop-blur)
- `.glass-strong` — stronger frost (used for nav pill)
- `.premium-card` — hover lift + violet glow border
- `.gradient-text` — violet→indigo→blue gradient text
- Nav links: black by default, purple (#6d28d9) on hover or active page

**Never use dark backgrounds or dark mode classes.** The design is light-only.
**Never use emojis as icons.** Use SVG icons (Heroicons/Lucide style).

## Key Rules
1. **Commit before switching tools** — always commit your changes before the other AI picks up work
2. All compare slugs come from `makeSlug(a, b)` in `lib/comparisons.ts` — format: `tool-a-vs-tool-b`
3. Redis key format: `compare:v3:{item_a_lowercase}:{item_b_lowercase}`
4. New comparisons go in `app/lib/comparisons.ts` in the `ALL_COMPARISONS` array
5. New articles go in `app/lib/articles.ts`
6. New news days go in `app/lib/news.ts` in the `NEWS_DAYS` array (prepend, newest first)
7. Deploy = `git push origin main` → Vercel auto-deploys

## Environment Variables (set in Vercel + locally in .env.local)
- `ANTHROPIC_API_KEY` — Claude API
- `KV_REST_API_URL` — Upstash Redis URL
- `KV_REST_API_TOKEN` — Upstash Redis token

## Image Rule — CRITICAL
Every article and news item MUST use a **topic-specific** Unsplash image, not a generic one.

**Process:**
1. Search Unsplash (unsplash.com/s/photos/<topic-keywords>) for each article/section topic
2. Pick a photo that visually matches the content (e.g. EV charging for battery article, AR headset for neural wearables)
3. Use the photo ID from the URL: `https://images.unsplash.com/photo-XXXXXXXX`
4. Format: `https://images.unsplash.com/photo-XXXXXXXX?w=1200&auto=format&q=80` (hero) or `?w=900&auto=format&q=80` (section)

**Never reuse the same photo ID across different articles.**
**Never use a photo that doesn't match the article topic.**

## Next.js Version Note
This is Next.js 15 with breaking changes from older versions.
- `params` in page components is a **Promise** — always `await params`
- Use App Router conventions only (no Pages Router patterns)
- `generateStaticParams` required for dynamic SSG routes
