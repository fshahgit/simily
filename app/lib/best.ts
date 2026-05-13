export interface BestTopic {
  slug: string;
  title: string;        // "Best Note-Taking App for Students"
  description: string;  // short meta description
  items: string[];      // products to rank
  category: string;     // for grouping on the browse page
}

export const ALL_BEST_TOPICS: BestTopic[] = [
  // ── AI ────────────────────────────────────────────────────────────────────
  {
    slug: "best-ai-chatbot",
    title: "Best AI Chatbot",
    description: "ChatGPT, Claude, Gemini, and Perplexity ranked — which AI chatbot is actually best in 2025?",
    items: ["ChatGPT", "Claude", "Gemini", "Perplexity", "Grok"],
    category: "AI",
  },
  {
    slug: "best-ai-coding-assistant",
    title: "Best AI Coding Assistant",
    description: "Cursor, GitHub Copilot, and Windsurf compared — the best AI tool for writing code faster.",
    items: ["Cursor", "GitHub Copilot", "Windsurf", "Copilot"],
    category: "AI",
  },
  {
    slug: "best-ai-image-generator",
    title: "Best AI Image Generator",
    description: "Midjourney vs DALL-E vs Stable Diffusion — which AI image generator produces the best results?",
    items: ["Midjourney", "DALL-E", "Stable Diffusion", "Adobe Firefly", "Ideogram"],
    category: "AI",
  },

  // ── Dev Tools ─────────────────────────────────────────────────────────────
  {
    slug: "best-code-editor",
    title: "Best Code Editor for Developers",
    description: "VS Code, Cursor, Zed, and Neovim compared — which code editor should you use in 2025?",
    items: ["VS Code", "Cursor", "Zed", "Neovim", "WebStorm"],
    category: "Dev Tools",
  },
  {
    slug: "best-javascript-framework",
    title: "Best JavaScript Framework",
    description: "React, Vue, Angular, and Svelte ranked — which JavaScript framework is best for your next project?",
    items: ["React", "Vue", "Angular", "Svelte", "Solid"],
    category: "Dev Tools",
  },
  {
    slug: "best-css-framework",
    title: "Best CSS Framework",
    description: "Tailwind, Bootstrap, and Material UI compared — the best CSS framework for modern web apps.",
    items: ["Tailwind", "Bootstrap", "Material UI", "shadcn/ui", "Chakra UI"],
    category: "Dev Tools",
  },
  {
    slug: "best-database-for-startups",
    title: "Best Database for Startups",
    description: "PostgreSQL, Supabase, Firebase, and MongoDB ranked — the best database to ship fast.",
    items: ["PostgreSQL", "Supabase", "Firebase", "MongoDB", "PlanetScale"],
    category: "Dev Tools",
  },
  {
    slug: "best-hosting-for-nextjs",
    title: "Best Hosting for Next.js",
    description: "Vercel, Netlify, Railway, and Cloudflare compared — where to deploy your Next.js app.",
    items: ["Vercel", "Netlify", "Railway", "Cloudflare", "Render"],
    category: "Dev Tools",
  },
  {
    slug: "best-javascript-package-manager",
    title: "Best JavaScript Package Manager",
    description: "pnpm, bun, npm, and yarn compared — which package manager is fastest in 2025?",
    items: ["pnpm", "bun", "npm", "yarn"],
    category: "Dev Tools",
  },

  // ── Productivity ──────────────────────────────────────────────────────────
  {
    slug: "best-note-taking-app",
    title: "Best Note-Taking App",
    description: "Notion, Obsidian, Evernote, and Bear compared — the best app to capture and organize your notes.",
    items: ["Notion", "Obsidian", "Evernote", "Apple Notes", "OneNote", "Bear"],
    category: "Productivity",
  },
  {
    slug: "best-project-management-tool",
    title: "Best Project Management Tool",
    description: "Linear, Jira, Asana, and ClickUp ranked — the best tool to manage your team's work.",
    items: ["Linear", "Jira", "Asana", "Monday.com", "ClickUp", "Trello"],
    category: "Productivity",
  },
  {
    slug: "best-password-manager",
    title: "Best Password Manager",
    description: "1Password, Bitwarden, Dashlane, and LastPass compared — which password manager should you trust?",
    items: ["1Password", "Bitwarden", "Dashlane", "LastPass"],
    category: "Productivity",
  },

  // ── Design ────────────────────────────────────────────────────────────────
  {
    slug: "best-design-tool",
    title: "Best Design Tool",
    description: "Figma, Framer, Canva, and Adobe XD ranked — the best design tool for UI, web, and graphics.",
    items: ["Figma", "Framer", "Canva", "Adobe XD", "Sketch"],
    category: "Design",
  },

  // ── Communication ─────────────────────────────────────────────────────────
  {
    slug: "best-team-chat-app",
    title: "Best Team Chat App",
    description: "Slack, Discord, and Microsoft Teams compared — which team communication tool is best?",
    items: ["Slack", "Discord", "Microsoft Teams", "Google Meet"],
    category: "Communication",
  },
  {
    slug: "best-video-conferencing-app",
    title: "Best Video Conferencing App",
    description: "Zoom, Google Meet, and Microsoft Teams ranked — the best app for video calls and meetings.",
    items: ["Zoom", "Google Meet", "Microsoft Teams", "Webex"],
    category: "Communication",
  },

  // ── Cloud ─────────────────────────────────────────────────────────────────
  {
    slug: "best-cloud-provider",
    title: "Best Cloud Provider",
    description: "AWS, Google Cloud, and Azure compared — which cloud platform is right for your project?",
    items: ["AWS", "Google Cloud", "Azure", "DigitalOcean", "Cloudflare"],
    category: "Cloud",
  },

  // ── Entertainment ─────────────────────────────────────────────────────────
  {
    slug: "best-streaming-service",
    title: "Best Streaming Service",
    description: "Netflix, Disney+, HBO Max, and Apple TV+ ranked — which streaming service is worth subscribing to?",
    items: ["Netflix", "Disney+", "HBO Max", "Apple TV+", "Amazon Prime Video", "Hulu"],
    category: "Entertainment",
  },
  {
    slug: "best-music-streaming-app",
    title: "Best Music Streaming App",
    description: "Spotify, Apple Music, and YouTube Music compared — the best app for listening to music.",
    items: ["Spotify", "Apple Music", "YouTube Music", "Tidal", "Amazon Music"],
    category: "Entertainment",
  },

  // ── Security ──────────────────────────────────────────────────────────────
  {
    slug: "best-vpn",
    title: "Best VPN",
    description: "NordVPN, ExpressVPN, Mullvad, and ProtonVPN compared — the best VPN for privacy and speed.",
    items: ["NordVPN", "ExpressVPN", "ProtonVPN", "Mullvad", "Surfshark"],
    category: "Security",
  },

  // ── Website Builders ──────────────────────────────────────────────────────
  {
    slug: "best-website-builder",
    title: "Best Website Builder",
    description: "Webflow, Framer, Wix, and Squarespace compared — the easiest way to build a website.",
    items: ["Webflow", "Framer", "Wix", "Squarespace", "WordPress"],
    category: "Website Builders",
  },
];

export function getBestTopic(slug: string): BestTopic | undefined {
  return ALL_BEST_TOPICS.find((t) => t.slug === slug);
}

export const BEST_CATEGORIES = [
  "AI",
  "Dev Tools",
  "Productivity",
  "Design",
  "Communication",
  "Cloud",
  "Entertainment",
  "Security",
  "Website Builders",
];
