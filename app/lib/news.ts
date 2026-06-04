export type NewsCategory = "AI" | "Tech" | "Blockchain" | "Gadgets" | "Science";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: NewsCategory;
  publisher: string;
  sourceUrl: string;
  image: string; // Unsplash URL
  date: string; // ISO date string
  readTime: number; // minutes
}

export interface NewsDay {
  date: string; // ISO date — "2026-06-05"
  items: NewsItem[];
}

export const ALL_NEWS: NewsDay[] = [
  {
    date: "2026-06-05",
    items: [
      {
        id: "apple-google-gemini-siri-1b-deal",
        title: "Apple Is Paying Google $1 Billion a Year to Power the New Siri",
        summary:
          "A custom 1.2-trillion-parameter Gemini model — built exclusively for Apple — will run inside Apple's Private Cloud Compute infrastructure, meaning no user data is shared with Google. The deal signals Apple's willingness to pay handsomely rather than fall further behind in AI.",
        category: "AI",
        publisher: "Tech Insider",
        sourceUrl: "https://tech-insider.org/apple-google-gemini-siri-deal-1-billion-2026/",
        image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&auto=format&q=80",
        date: "2026-06-05",
        readTime: 4,
      },
      {
        id: "openai-legal-action-apple-chatgpt",
        title: "OpenAI Explores Legal Action Against Apple Over Failed ChatGPT Integration",
        summary:
          "The two-year partnership between OpenAI and Apple appears to be collapsing. OpenAI is reportedly considering legal action after Apple pivoted to Google Gemini for its core AI infrastructure, leaving ChatGPT's role uncertain ahead of WWDC on June 8.",
        category: "Tech",
        publisher: "Trending Topics",
        sourceUrl: "https://www.trendingtopics.eu/openai-eyes-legal-action-against-apple-over-failed-chatgpt-integration/",
        image: "https://images.unsplash.com/photo-1676277791608-ac54525aa94d?w=800&auto=format&q=80",
        date: "2026-06-05",
        readTime: 3,
      },
      {
        id: "wwdc-2026-june-8-preview",
        title: "WWDC 2026 Is Apple's Make-or-Break Moment for AI — Here's What's at Stake",
        summary:
          "Monday's keynote will preview iOS 27, macOS 27, and a rebuilt Siri with chatbot capabilities, conversation history, and a standalone app. Analysts say WWDC is the last chance for Apple to reassert itself as an AI leader before the gap becomes insurmountable.",
        category: "Tech",
        publisher: "The Motley Fool",
        sourceUrl: "https://www.fool.com/investing/2026/06/02/apple-biggest-ai-test-june-8-whats-stake-wwdc/",
        image: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&auto=format&q=80",
        date: "2026-06-05",
        readTime: 5,
      },
      {
        id: "anthropic-ipo-filing-confidential",
        title: "Anthropic Files Confidentially for IPO as AI Arms Race Heats Up",
        summary:
          "Anthropic has submitted a confidential IPO filing, joining OpenAI in racing toward public markets. The company — maker of Claude — was last valued at $61 billion. A public offering would come amid record AI infrastructure investment from every major tech player.",
        category: "AI",
        publisher: "MEXC News",
        sourceUrl: "https://www.mexc.com/news/1122362",
        image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&q=80",
        date: "2026-06-05",
        readTime: 3,
      },
      {
        id: "goldman-sachs-tokenized-real-estate-blockchain",
        title: "Goldman Sachs Moves Into Tokenized Real Estate With Blockchain-Native Fund",
        summary:
          "Goldman Sachs has partnered with Apex and Archax to launch a tokenized real estate fund built natively on blockchain rails. The move marks one of the most significant institutional endorsements of asset tokenization to date, combining traditional fund structures with on-chain settlement.",
        category: "Blockchain",
        publisher: "Investing News Network",
        sourceUrl: "https://investingnews.com/cryptocurrency-market-recap/",
        image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=800&auto=format&q=80",
        date: "2026-06-05",
        readTime: 4,
      },
      {
        id: "orion-100b-ai-training-cost",
        title: "A 100-Billion Parameter AI Model Trained for $1.25 Per Hour",
        summary:
          "Startup Orion AI claims to have trained a 100B-parameter model at a fraction of the typical cost, challenging the assumption that frontier AI requires billions in compute spend. The efficiency breakthrough — if reproducible — could democratise large model training for smaller labs.",
        category: "AI",
        publisher: "AIapps",
        sourceUrl: "https://www.aiapps.com/blog/ai-news-breakthroughs-launches-trends-must-read/",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&q=80",
        date: "2026-06-05",
        readTime: 3,
      },
      {
        id: "cftc-coinbase-crypto-futures",
        title: "CFTC Clears Coinbase to Offer Global Crypto Perpetual Futures",
        summary:
          "The US Commodity Futures Trading Commission has approved Coinbase to offer perpetual futures contracts globally — a product type previously unavailable to American exchanges. The ruling is the clearest regulatory green light crypto has received from US authorities in years.",
        category: "Blockchain",
        publisher: "Investing News Network",
        sourceUrl: "https://investingnews.com/cryptocurrency-market-recap/",
        image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=800&auto=format&q=80",
        date: "2026-06-05",
        readTime: 3,
      },
    ],
  },
];

export function getLatestNews(): NewsDay | undefined {
  return ALL_NEWS[0];
}

export function getNewsByDate(date: string): NewsDay | undefined {
  return ALL_NEWS.find((d) => d.date === date);
}

export const NEWS_CATEGORIES: NewsCategory[] = ["AI", "Tech", "Blockchain", "Gadgets", "Science"];

export const CAT_COLORS: Record<NewsCategory, string> = {
  AI: "bg-violet-100 text-violet-700",
  Tech: "bg-blue-100 text-blue-700",
  Blockchain: "bg-orange-100 text-orange-700",
  Gadgets: "bg-teal-100 text-teal-700",
  Science: "bg-emerald-100 text-emerald-700",
};

export const CAT_ACTIVE: Record<NewsCategory, string> = {
  AI: "bg-violet-600 text-white",
  Tech: "bg-blue-600 text-white",
  Blockchain: "bg-orange-500 text-white",
  Gadgets: "bg-teal-600 text-white",
  Science: "bg-emerald-600 text-white",
};
