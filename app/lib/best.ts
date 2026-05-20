export interface BestTopic {
  slug: string;
  title: string;        // "Best Note-Taking App for Students"
  description: string;  // short meta description
  items: string[];      // products to rank
  category: string;     // for grouping on the browse page
  region?: string;      // e.g. "🇮🇳 India" — only set for "By Region" category
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

  // ── Laptops & Hardware ────────────────────────────────────────────────────
  {
    slug: "best-budget-laptop",
    title: "Best Budget Laptop",
    description: "MacBook Air, Dell XPS, ThinkPad, and Surface Pro compared — the best laptop for your money.",
    items: ["MacBook Air", "Dell XPS", "ThinkPad", "Surface Pro", "Chromebook"],
    category: "Laptops & Hardware",
  },
  {
    slug: "best-laptop-for-programming",
    title: "Best Laptop for Programming",
    description: "MacBook Pro, Dell XPS, ThinkPad ranked — the best laptop for developers and engineers.",
    items: ["MacBook Pro", "Dell XPS", "ThinkPad", "MacBook Air", "Surface Pro"],
    category: "Laptops & Hardware",
  },
  {
    slug: "best-gaming-laptop",
    title: "Best Gaming Laptop",
    description: "ASUS ROG, Razer Blade, MSI, and Lenovo Legion compared — the best laptop for gaming.",
    items: ["ASUS ROG", "Razer Blade", "MSI", "Lenovo Legion", "Acer Predator"],
    category: "Laptops & Hardware",
  },
  {
    slug: "best-macbook-to-buy",
    title: "Best MacBook to Buy",
    description: "MacBook Air M3, MacBook Pro M3, and MacBook Air M2 compared — which MacBook should you get?",
    items: ["MacBook Air M3", "MacBook Pro M3", "MacBook Air M2", "MacBook Pro M2"],
    category: "Laptops & Hardware",
  },
  {
    slug: "best-windows-laptop",
    title: "Best Windows Laptop",
    description: "Dell XPS, HP Spectre, ThinkPad, and Surface Laptop ranked — the best Windows laptop in 2025.",
    items: ["Dell XPS", "HP Spectre", "ThinkPad", "Surface Laptop", "ASUS ZenBook"],
    category: "Laptops & Hardware",
  },
  {
    slug: "best-laptop-for-students",
    title: "Best Laptop for Students",
    description: "MacBook Air, Chromebook, ThinkPad, and HP Pavilion ranked — the best laptop for college students.",
    items: ["MacBook Air", "Chromebook", "ThinkPad", "HP Pavilion", "Dell Inspiron"],
    category: "Laptops & Hardware",
  },

  // ── Dev Tools (extra) ─────────────────────────────────────────────────────
  {
    slug: "best-react-ui-library",
    title: "Best React UI Library",
    description: "shadcn/ui, Material UI, Chakra UI, and Ant Design compared — the best component library for React.",
    items: ["shadcn/ui", "Material UI", "Chakra UI", "Ant Design", "Mantine"],
    category: "Dev Tools",
  },
  {
    slug: "best-orm-for-nodejs",
    title: "Best ORM for Node.js",
    description: "Prisma, Drizzle, TypeORM, and Sequelize compared — the best ORM for Node.js projects.",
    items: ["Prisma", "Drizzle", "TypeORM", "Sequelize"],
    category: "Dev Tools",
  },
  {
    slug: "best-state-management-react",
    title: "Best State Management for React",
    description: "Redux, Zustand, Jotai, and Recoil ranked — the best way to manage state in React apps.",
    items: ["Redux", "Zustand", "Jotai", "Recoil", "Context API"],
    category: "Dev Tools",
  },

  // ── Email ─────────────────────────────────────────────────────────────────
  {
    slug: "best-email-client",
    title: "Best Email Client",
    description: "Superhuman, Apple Mail, Spark, and Outlook compared — the best email client for productivity.",
    items: ["Superhuman", "Apple Mail", "Spark", "Outlook", "Gmail", "HEY"],
    category: "Productivity",
  },

  // ── India ─────────────────────────────────────────────────────────────────
  {
    slug: "best-ott-platform-india",
    title: "Best OTT Platform in India",
    description: "Netflix, Disney+ Hotstar, Amazon Prime, and Sony LIV ranked — which streaming service is best in India?",
    items: ["Netflix", "Disney+ Hotstar", "Amazon Prime Video", "Sony LIV", "JioCinema", "Zee5"],
    category: "By Region", region: "🇮🇳 India",
  },
  {
    slug: "best-payment-app-india",
    title: "Best Payment App in India",
    description: "PhonePe, Google Pay, Paytm, and CRED compared — the best UPI app for Indians.",
    items: ["PhonePe", "Google Pay", "Paytm", "CRED", "Amazon Pay"],
    category: "By Region", region: "🇮🇳 India",
  },
  {
    slug: "best-food-delivery-app-india",
    title: "Best Food Delivery App in India",
    description: "Swiggy vs Zomato — which food delivery app is better for ordering in India?",
    items: ["Swiggy", "Zomato"],
    category: "By Region", region: "🇮🇳 India",
  },
  {
    slug: "best-edtech-platform-india",
    title: "Best EdTech Platform in India",
    description: "BYJU'S, Unacademy, Vedantu, and upGrad ranked — the best online learning platform in India.",
    items: ["BYJU'S", "Unacademy", "Vedantu", "upGrad", "Coursera"],
    category: "By Region", region: "🇮🇳 India",
  },
  {
    slug: "best-telecom-india",
    title: "Best Telecom Operator in India",
    description: "Jio, Airtel, and Vi compared — which mobile network gives the best value in India?",
    items: ["Jio", "Airtel", "Vi"],
    category: "By Region", region: "🇮🇳 India",
  },
  {
    slug: "best-budget-phone-india",
    title: "Best Budget Phone in India",
    description: "Redmi, Realme, Poco, and Nothing Phone ranked — the best value smartphone in India.",
    items: ["Redmi", "Realme", "Poco", "Nothing Phone", "OnePlus"],
    category: "By Region", region: "🇮🇳 India",
  },
  {
    slug: "best-quick-commerce-app-india",
    title: "Best Quick Commerce App in India",
    description: "Blinkit, Zepto, Instamart, and BigBasket compared — the best app for fast grocery delivery in India.",
    items: ["Blinkit", "Zepto", "Swiggy Instamart", "BigBasket"],
    category: "By Region", region: "🇮🇳 India",
  },
  {
    slug: "best-shopping-app-india",
    title: "Best Shopping App in India",
    description: "Flipkart, Amazon India, Meesho, Myntra, and Ajio ranked — the best app for online shopping in India.",
    items: ["Flipkart", "Amazon India", "Meesho", "Myntra", "Ajio"],
    category: "By Region", region: "🇮🇳 India",
  },
  {
    slug: "best-job-app-india",
    title: "Best Job Search App in India",
    description: "Naukri, LinkedIn, Indeed, Internshala, and Apna compared — the best platform for finding jobs in India.",
    items: ["Naukri", "LinkedIn", "Indeed", "Internshala", "Apna"],
    category: "By Region", region: "🇮🇳 India",
  },
  {
    slug: "best-stock-broker-india",
    title: "Best Stock Broker App in India",
    description: "Groww, Zerodha, Upstox, and INDmoney compared — the best investing app for Indian users.",
    items: ["Groww", "Zerodha", "Upstox", "INDmoney", "Kuvera"],
    category: "By Region", region: "🇮🇳 India",
  },
  {
    slug: "best-travel-booking-app-india",
    title: "Best Travel Booking App in India",
    description: "MakeMyTrip, Goibibo, Booking.com, and IRCTC compared — the best app for travel bookings in India.",
    items: ["MakeMyTrip", "Goibibo", "Booking.com", "IRCTC"],
    category: "By Region", region: "🇮🇳 India",
  },
  {
    slug: "best-cab-booking-app-india",
    title: "Best Cab Booking App in India",
    description: "Uber, Ola, and Rapido compared — the best ride booking app for Indian cities.",
    items: ["Uber", "Ola", "Rapido"],
    category: "By Region", region: "🇮🇳 India",
  },
  {
    slug: "best-broadband-india",
    title: "Best Broadband Provider in India",
    description: "JioFiber, Airtel Xstream Fiber, and ACT Fibernet compared — the best home internet provider in India.",
    items: ["JioFiber", "Airtel Xstream Fiber", "ACT Fibernet"],
    category: "By Region", region: "🇮🇳 India",
  },
  {
    slug: "best-ai-tool-for-students-india",
    title: "Best AI Tool for Students in India",
    description: "ChatGPT, Gemini, Claude, Perplexity, and DeepSeek ranked — the best AI assistant for Indian students.",
    items: ["ChatGPT", "Gemini", "Claude", "Perplexity", "DeepSeek"],
    category: "By Region", region: "🇮🇳 India",
  },
  {
    slug: "best-insurance-app-india",
    title: "Best Insurance App in India",
    description: "Policybazaar, Ditto, and Acko compared — the best platform to compare and buy insurance in India.",
    items: ["Policybazaar", "Ditto", "Acko"],
    category: "By Region", region: "🇮🇳 India",
  },
  {
    slug: "best-ai-search-engine",
    title: "Best AI Search Engine",
    description: "Perplexity, Google Gemini, ChatGPT Search, and Grok compared — the best AI search tool for current answers.",
    items: ["Perplexity", "Gemini", "ChatGPT", "Grok", "DeepSeek"],
    category: "AI",
  },
  {
    slug: "best-free-ai-chatbot",
    title: "Best Free AI Chatbot",
    description: "ChatGPT, Gemini, Claude, DeepSeek, and Grok compared — the best free AI chatbot for everyday use.",
    items: ["ChatGPT", "Gemini", "Claude", "DeepSeek", "Grok"],
    category: "AI",
  },
  {
    slug: "best-ai-tool-for-coding",
    title: "Best AI Tool for Coding",
    description: "Cursor, GitHub Copilot, Windsurf, Claude, and ChatGPT compared — the best AI coding workflow.",
    items: ["Cursor", "GitHub Copilot", "Windsurf", "Claude", "ChatGPT"],
    category: "AI",
  },

  // ── Latin America ─────────────────────────────────────────────────────────
  {
    slug: "best-ecommerce-latam",
    title: "Best E-commerce App in Latin America",
    description: "Mercado Libre, Amazon, and Shopee compared — the best online shopping platform in Latin America.",
    items: ["Mercado Libre", "Amazon", "Shopee", "Falabella"],
    category: "By Region", region: "🌎 Latin America",
  },
  {
    slug: "best-food-delivery-latam",
    title: "Best Food Delivery App in Latin America",
    description: "Rappi, iFood, and Pedidos Ya compared — the best app for food delivery in LATAM.",
    items: ["Rappi", "iFood", "Pedidos Ya", "Uber Eats"],
    category: "By Region", region: "🌎 Latin America",
  },
  {
    slug: "best-fintech-latam",
    title: "Best Fintech App in Latin America",
    description: "Nubank, Mercado Pago, and Neon compared — the best digital bank in Latin America.",
    items: ["Nubank", "Mercado Pago", "Neon", "Boa Compra"],
    category: "By Region", region: "🌎 Latin America",
  },
  {
    slug: "best-ride-hailing-latam",
    title: "Best Ride Hailing App in Latin America",
    description: "Uber, Cabify, and InDriver compared — the best app to book a ride in Latin America.",
    items: ["Uber", "Cabify", "InDriver", "Beat"],
    category: "By Region", region: "🌎 Latin America",
  },
  {
    slug: "best-streaming-latam",
    title: "Best Streaming Service in Latin America",
    description: "Netflix, Disney+, and Globoplay ranked — the best streaming platform for LATAM audiences.",
    items: ["Netflix", "Disney+", "Amazon Prime Video", "Globoplay", "HBO Max"],
    category: "By Region", region: "🌎 Latin America",
  },

  // ── Southeast Asia ────────────────────────────────────────────────────────
  {
    slug: "best-ride-hailing-sea",
    title: "Best Ride Hailing App in Southeast Asia",
    description: "Grab vs Gojek — which super app is better for rides, food, and payments in Southeast Asia?",
    items: ["Grab", "Gojek", "Uber", "InDriver"],
    category: "By Region", region: "🌏 Southeast Asia",
  },
  {
    slug: "best-ecommerce-sea",
    title: "Best E-commerce App in Southeast Asia",
    description: "Shopee, Lazada, and Tokopedia compared — the best online shopping platform in SEA.",
    items: ["Shopee", "Lazada", "Tokopedia", "Amazon"],
    category: "By Region", region: "🌏 Southeast Asia",
  },
  {
    slug: "best-food-delivery-sea",
    title: "Best Food Delivery App in Southeast Asia",
    description: "GrabFood, GoFood, and foodpanda compared — the best app for ordering food in Southeast Asia.",
    items: ["GrabFood", "GoFood", "foodpanda", "Uber Eats"],
    category: "By Region", region: "🌏 Southeast Asia",
  },
  {
    slug: "best-fintech-sea",
    title: "Best Fintech App in Southeast Asia",
    description: "GCash, Maya, GrabPay, and OVO compared — the best digital wallet in Southeast Asia.",
    items: ["GCash", "Maya", "GrabPay", "OVO", "ShopeePay"],
    category: "By Region", region: "🌏 Southeast Asia",
  },

  // ── United Kingdom ────────────────────────────────────────────────────────
  {
    slug: "best-neobank-uk",
    title: "Best Neobank in the UK",
    description: "Monzo, Revolut, and Starling Bank compared — the best digital bank account in the UK.",
    items: ["Monzo", "Revolut", "Starling Bank", "Chase UK"],
    category: "By Region", region: "🇬🇧 United Kingdom",
  },
  {
    slug: "best-food-delivery-uk",
    title: "Best Food Delivery App in the UK",
    description: "Deliveroo, Uber Eats, and Just Eat compared — the best app for food delivery in the UK.",
    items: ["Deliveroo", "Uber Eats", "Just Eat"],
    category: "By Region", region: "🇬🇧 United Kingdom",
  },
  {
    slug: "best-broadband-uk",
    title: "Best Broadband Provider in the UK",
    description: "BT, Virgin Media, and Sky Broadband compared — the best home internet provider in the UK.",
    items: ["BT", "Virgin Media", "Sky Broadband", "Vodafone"],
    category: "By Region", region: "🇬🇧 United Kingdom",
  },
  {
    slug: "best-mobile-carrier-uk",
    title: "Best Mobile Network in the UK",
    description: "EE, Vodafone, O2, and Three compared — the best SIM and mobile plan in the UK.",
    items: ["EE", "Vodafone", "O2", "Three"],
    category: "By Region", region: "🇬🇧 United Kingdom",
  },

  // ── United States ─────────────────────────────────────────────────────────
  {
    slug: "best-food-delivery-us",
    title: "Best Food Delivery App in the US",
    description: "DoorDash, Uber Eats, and Grubhub compared — the best app for food delivery in the US.",
    items: ["DoorDash", "Uber Eats", "Grubhub", "Instacart"],
    category: "By Region", region: "🇺🇸 United States",
  },
  {
    slug: "best-neobank-us",
    title: "Best Neobank in the US",
    description: "Chime, Revolut, and Current compared — the best online bank account in the United States.",
    items: ["Chime", "Revolut", "Current", "SoFi"],
    category: "By Region", region: "🇺🇸 United States",
  },
  {
    slug: "best-investing-app-us",
    title: "Best Investing App in the US",
    description: "Robinhood, Webull, and Fidelity ranked — the best app for stocks and investing in the US.",
    items: ["Robinhood", "Webull", "Fidelity", "Charles Schwab", "Public"],
    category: "By Region", region: "🇺🇸 United States",
  },
  {
    slug: "best-mobile-carrier-us",
    title: "Best Mobile Carrier in the US",
    description: "T-Mobile, Verizon, and AT&T compared — the best cell phone plan in the United States.",
    items: ["T-Mobile", "Verizon", "AT&T", "Mint Mobile"],
    category: "By Region", region: "🇺🇸 United States",
  },
];

export function getBestTopic(slug: string): BestTopic | undefined {
  return ALL_BEST_TOPICS.find((t) => t.slug === slug);
}

export const BEST_CATEGORIES = [
  "AI",
  "Dev Tools",
  "Productivity",
  "Laptops & Hardware",
  "Design",
  "Communication",
  "Cloud",
  "Entertainment",
  "Security",
  "Website Builders",
  "By Region",
];

export const REGIONS = [
  "🇮🇳 India",
  "🌎 Latin America",
  "🌏 Southeast Asia",
  "🇬🇧 United Kingdom",
  "🇺🇸 United States",
];
