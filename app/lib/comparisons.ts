// Master list of all comparisons — used for sitemap + related comparisons
export interface Comparison { a: string; b: string; }

export const ALL_COMPARISONS: Comparison[] = [
  // ── AI Tools ──────────────────────────────────────────────────────────────
  { a: "ChatGPT", b: "Claude" },
  { a: "Claude", b: "Gemini" },
  { a: "Gemini", b: "ChatGPT" },
  { a: "Perplexity", b: "ChatGPT" },
  { a: "Perplexity", b: "Google" },
  { a: "ChatGPT", b: "Bing" },
  { a: "GPT-4o", b: "Claude 3.5 Sonnet" },
  { a: "GPT-4o", b: "Gemini 1.5 Pro" },
  { a: "Midjourney", b: "DALL-E" },
  { a: "Midjourney", b: "Stable Diffusion" },
  { a: "Stable Diffusion", b: "DALL-E" },
  { a: "Cursor", b: "GitHub Copilot" },
  { a: "Cursor", b: "Windsurf" },

  // ── Phones & Tablets ──────────────────────────────────────────────────────
  { a: "iPhone 16", b: "Samsung Galaxy S25" },
  { a: "iPhone 16 Pro", b: "Samsung Galaxy S25" },
  { a: "iPhone", b: "Google Pixel" },
  { a: "iPhone", b: "Android" },
  { a: "iPad", b: "Samsung Galaxy Tab" },
  { a: "iPad Pro", b: "MacBook Air" },
  { a: "Google Pixel 9", b: "iPhone 16" },

  // ── Computers & OS ───────────────────────────────────────────────────────
  { a: "Mac", b: "Windows" },
  { a: "MacBook Pro", b: "MacBook Air" },
  { a: "MacBook Pro", b: "Dell XPS" },
  { a: "MacBook Air", b: "Dell XPS" },
  { a: "Windows", b: "Linux" },
  { a: "MacOS", b: "Windows 11" },

  // ── Audio & Wearables ────────────────────────────────────────────────────
  { a: "AirPods Pro", b: "Sony WH-1000XM5" },
  { a: "AirPods Pro", b: "Bose QC45" },
  { a: "Apple Watch", b: "Garmin" },
  { a: "Apple Watch", b: "Fitbit" },

  // ── Code Editors ─────────────────────────────────────────────────────────
  { a: "VS Code", b: "Cursor" },
  { a: "VS Code", b: "JetBrains" },
  { a: "VS Code", b: "Zed" },
  { a: "Zed", b: "Cursor" },
  { a: "Vim", b: "Neovim" },
  { a: "Vim", b: "Emacs" },
  { a: "Windsurf", b: "VS Code" },

  // ── Programming Languages ────────────────────────────────────────────────
  { a: "Python", b: "JavaScript" },
  { a: "Python", b: "TypeScript" },
  { a: "Python", b: "Go" },
  { a: "TypeScript", b: "JavaScript" },
  { a: "Go", b: "Rust" },
  { a: "Rust", b: "C++" },
  { a: "Java", b: "Kotlin" },
  { a: "Swift", b: "Kotlin" },
  { a: "Ruby", b: "Python" },

  // ── Frontend Frameworks ──────────────────────────────────────────────────
  { a: "React", b: "Vue" },
  { a: "React", b: "Angular" },
  { a: "React", b: "Svelte" },
  { a: "Svelte", b: "Vue" },
  { a: "Next.js", b: "Nuxt.js" },
  { a: "Next.js", b: "Remix" },
  { a: "Next.js", b: "Astro" },
  { a: "React Native", b: "Flutter" },

  // ── CSS & Styling ────────────────────────────────────────────────────────
  { a: "Tailwind", b: "Bootstrap" },
  { a: "Tailwind", b: "CSS Modules" },
  { a: "Tailwind", b: "Material UI" },
  { a: "shadcn/ui", b: "Material UI" },

  // ── Databases ────────────────────────────────────────────────────────────
  { a: "PostgreSQL", b: "MySQL" },
  { a: "MongoDB", b: "PostgreSQL" },
  { a: "Firebase", b: "Supabase" },
  { a: "PostgreSQL", b: "SQLite" },
  { a: "Neon", b: "Supabase" },
  { a: "Redis", b: "MongoDB" },

  // ── Cloud & Hosting ──────────────────────────────────────────────────────
  { a: "Vercel", b: "Netlify" },
  { a: "Vercel", b: "Railway" },
  { a: "Vercel", b: "Cloudflare" },
  { a: "AWS", b: "Google Cloud" },
  { a: "AWS", b: "Azure" },
  { a: "Azure", b: "Google Cloud" },
  { a: "DigitalOcean", b: "Render" },

  // ── DevOps & Tools ───────────────────────────────────────────────────────
  { a: "Docker", b: "Kubernetes" },
  { a: "GitHub", b: "GitLab" },
  { a: "GitHub Actions", b: "CircleCI" },
  { a: "Terraform", b: "Ansible" },
  { a: "npm", b: "pnpm" },
  { a: "npm", b: "bun" },
  { a: "bun", b: "pnpm" },
  { a: "Vite", b: "Webpack" },

  // ── Productivity & Notes ─────────────────────────────────────────────────
  { a: "Notion", b: "Obsidian" },
  { a: "Notion", b: "Evernote" },
  { a: "Notion", b: "Confluence" },
  { a: "Obsidian", b: "Logseq" },
  { a: "Trello", b: "Notion" },

  // ── Project Management ───────────────────────────────────────────────────
  { a: "Jira", b: "Linear" },
  { a: "Asana", b: "Monday.com" },
  { a: "ClickUp", b: "Asana" },
  { a: "Linear", b: "Asana" },
  { a: "Jira", b: "Asana" },

  // ── Design ───────────────────────────────────────────────────────────────
  { a: "Figma", b: "Adobe XD" },
  { a: "Figma", b: "Canva" },
  { a: "Figma", b: "Framer" },
  { a: "Framer", b: "Webflow" },

  // ── Communication ────────────────────────────────────────────────────────
  { a: "Slack", b: "Microsoft Teams" },
  { a: "Slack", b: "Discord" },
  { a: "Zoom", b: "Google Meet" },
  { a: "Zoom", b: "Microsoft Teams" },

  // ── Email ────────────────────────────────────────────────────────────────
  { a: "Gmail", b: "Outlook" },
  { a: "Gmail", b: "ProtonMail" },
  { a: "Superhuman", b: "Gmail" },

  // ── Browsers ─────────────────────────────────────────────────────────────
  { a: "Chrome", b: "Firefox" },
  { a: "Chrome", b: "Arc" },
  { a: "Arc", b: "Safari" },
  { a: "Brave", b: "Chrome" },
  { a: "Edge", b: "Chrome" },

  // ── Security & VPN ───────────────────────────────────────────────────────
  { a: "NordVPN", b: "ExpressVPN" },
  { a: "NordVPN", b: "ProtonVPN" },
  { a: "1Password", b: "Bitwarden" },
  { a: "Bitwarden", b: "Dashlane" },

  // ── Website builders & CMS ───────────────────────────────────────────────
  { a: "WordPress", b: "Webflow" },
  { a: "WordPress", b: "Ghost" },
  { a: "Webflow", b: "Framer" },
  { a: "Wix", b: "Squarespace" },
  { a: "Shopify", b: "WooCommerce" },
  { a: "Shopify", b: "Etsy" },

  // ── Payments & Finance ───────────────────────────────────────────────────
  { a: "Stripe", b: "PayPal" },
  { a: "Wise", b: "PayPal" },
  { a: "Coinbase", b: "Binance" },

  // ── Gaming ───────────────────────────────────────────────────────────────
  { a: "PS5", b: "Xbox Series X" },
  { a: "PS5", b: "PC Gaming" },
  { a: "Xbox Series X", b: "Xbox Series S" },
  { a: "Nintendo Switch", b: "Steam Deck" },

  // ── Entertainment ────────────────────────────────────────────────────────
  { a: "Netflix", b: "Disney+" },
  { a: "Netflix", b: "HBO Max" },
  { a: "Spotify", b: "Apple Music" },
  { a: "Spotify", b: "YouTube Music" },
  { a: "YouTube", b: "TikTok" },
  { a: "YouTube", b: "Netflix" },

  // ── Social ───────────────────────────────────────────────────────────────
  { a: "Twitter", b: "Threads" },
  { a: "Reddit", b: "Twitter" },
  { a: "TikTok", b: "Instagram" },
  { a: "LinkedIn", b: "Twitter" },

  // ── Jobs ─────────────────────────────────────────────────────────────────
  { a: "LinkedIn", b: "Indeed" },
  { a: "Upwork", b: "Fiverr" },

  // ── Cars & EVs ───────────────────────────────────────────────────────────
  { a: "Tesla Model 3", b: "BMW 3 Series" },
  { a: "Tesla Model Y", b: "BMW 3 Series" },
  { a: "Toyota Camry", b: "Honda Civic" },

  // ── Health & Fitness ─────────────────────────────────────────────────────
  { a: "Keto Diet", b: "Intermittent Fasting" },
  { a: "Keto Diet", b: "Vegan Diet" },
  { a: "MyFitnessPal", b: "Cronometer" },

  // ── India — Food & Delivery ───────────────────────────────────────────────
  { a: "Swiggy", b: "Zomato" },

  // ── India — Payments ─────────────────────────────────────────────────────
  { a: "PhonePe", b: "Google Pay" },
  { a: "PhonePe", b: "Paytm" },
  { a: "Google Pay", b: "Paytm" },
  { a: "PhonePe", b: "CRED" },

  // ── India — E-commerce ───────────────────────────────────────────────────
  { a: "Amazon", b: "Flipkart" },
  { a: "Flipkart", b: "Meesho" },

  // ── India — Telecom ──────────────────────────────────────────────────────
  { a: "Jio", b: "Airtel" },
  { a: "Jio", b: "Vi" },
  { a: "Airtel", b: "Vi" },

  // ── India — OTT ──────────────────────────────────────────────────────────
  { a: "Netflix", b: "Disney+ Hotstar" },
  { a: "Disney+ Hotstar", b: "Amazon Prime Video" },
  { a: "Sony LIV", b: "Disney+ Hotstar" },
  { a: "JioCinema", b: "Disney+ Hotstar" },
  { a: "Zee5", b: "Sony LIV" },

  // ── India — EdTech ───────────────────────────────────────────────────────
  { a: "BYJU'S", b: "Unacademy" },
  { a: "Unacademy", b: "Vedantu" },
  { a: "upGrad", b: "Coursera" },
  { a: "BYJU'S", b: "Vedantu" },

  // ── India — Jobs ─────────────────────────────────────────────────────────
  { a: "Naukri", b: "LinkedIn" },
  { a: "Naukri", b: "Indeed" },
  { a: "Internshala", b: "LinkedIn" },

  // ── India — Budget Phones ────────────────────────────────────────────────
  { a: "Redmi", b: "Realme" },
  { a: "Poco", b: "Redmi" },
  { a: "OnePlus", b: "Samsung Galaxy S25" },
  { a: "Nothing Phone", b: "OnePlus" },
  { a: "Realme", b: "Poco" },

  // ── AI (trending globally + India) ───────────────────────────────────────
  { a: "DeepSeek", b: "ChatGPT" },
  { a: "DeepSeek", b: "Claude" },
  { a: "DeepSeek", b: "Gemini" },
];

export function makeSlug(a: string, b: string): string {
  return `${a.toLowerCase().replace(/ /g, "-")}-vs-${b.toLowerCase().replace(/ /g, "-")}`;
}

/** Returns up to `max` comparisons that share at least one item with the given pair */
export function getRelated(a: string, b: string, max = 6): Comparison[] {
  const aL = a.toLowerCase();
  const bL = b.toLowerCase();
  const currentSlug = makeSlug(a, b);

  const scored = ALL_COMPARISONS
    .filter((c) => makeSlug(c.a, c.b) !== currentSlug && makeSlug(c.b, c.a) !== currentSlug)
    .map((c) => {
      const cAL = c.a.toLowerCase();
      const cBL = c.b.toLowerCase();
      // Score: 2 if one of the current items appears, 1 if partial match
      let score = 0;
      if (cAL === aL || cBL === aL || cAL === bL || cBL === bL) score += 2;
      if (cAL.includes(aL) || cBL.includes(aL) || cAL.includes(bL) || cBL.includes(bL)) score += 1;
      return { c, score };
    })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, max)
    .map((x) => x.c);

  return scored;
}
