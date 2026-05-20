// Master list of all comparable items — used for autocomplete suggestions
// Ordered roughly by search popularity
const ALL_ITEMS = [
  // AI tools
  "ChatGPT", "Claude", "Gemini", "Perplexity", "Grok", "DeepSeek", "Midjourney", "DALL-E",
  "Cursor", "GitHub Copilot", "Copilot", "Windsurf", "Qwen", "Mistral", "Meta AI", "Sarvam AI",

  // Phones & tablets
  "iPhone 16", "iPhone 16 Pro", "iPhone 15", "iPhone",
  "Samsung Galaxy S25", "Samsung Galaxy S24", "Samsung Galaxy Tab",
  "Google Pixel 9", "Google Pixel", "OnePlus 13", "Android",
  "Redmi", "Realme", "Poco", "Nothing Phone",
  "iPad", "iPad Pro", "iPad Air",

  // Indian apps & services
  "Swiggy", "Zomato", "PhonePe", "Google Pay", "Paytm", "CRED", "BHIM", "Amazon Pay",
  "Blinkit", "Zepto", "Swiggy Instamart", "Instamart", "BigBasket",
  "Flipkart", "Amazon India", "Meesho", "Myntra", "Ajio", "Nykaa", "Tata Cliq",
  "Jio", "Airtel", "Vi", "JioFiber", "Airtel Xstream Fiber", "ACT Fibernet",
  "Disney+ Hotstar", "Sony LIV", "Zee5", "JioCinema", "MX Player",
  "BYJU'S", "Unacademy", "Vedantu", "upGrad",
  "Naukri", "Internshala", "Apna", "Foundit",
  "MakeMyTrip", "Goibibo", "IRCTC", "Ola", "Uber", "Rapido",
  "Groww", "Zerodha", "Upstox", "INDmoney", "Kuvera",
  "CoinDCX", "WazirX", "Policybazaar", "Ditto", "Acko",

  // Computers & OS
  "MacBook Pro", "MacBook Air", "MacBook Air M3", "MacBook Air M2", "MacBook Pro M3",
  "Mac", "MacOS", "Windows", "Windows 11", "Linux", "Ubuntu", "Chromebook",
  "Surface Pro", "Surface Laptop", "Dell XPS", "ThinkPad", "HP Spectre",
  "ASUS ZenBook", "ASUS ROG", "Razer Blade", "MSI", "Lenovo Legion",
  "Acer Predator", "HP Pavilion", "Dell Inspiron",

  // Audio & wearables
  "AirPods Pro", "AirPods", "Sony WH-1000XM5", "Bose QC45",
  "Samsung Galaxy Buds", "Apple Watch", "Fitbit", "Garmin",

  // Gaming
  "PS5", "PlayStation 5", "Xbox Series X", "Nintendo Switch",
  "Steam Deck", "PC Gaming", "Xbox Series S",

  // Streaming
  "Netflix", "Disney+", "HBO Max", "Apple TV+", "Amazon Prime Video",
  "Hulu", "Peacock", "Paramount+",

  // Music
  "Spotify", "Apple Music", "YouTube Music", "Tidal", "Amazon Music",

  // Social & video
  "YouTube", "TikTok", "Instagram", "Twitter", "X",
  "Facebook", "Snapchat", "LinkedIn", "Reddit", "Pinterest",

  // Programming languages
  "Python", "JavaScript", "TypeScript", "Go", "Rust", "Java",
  "C++", "C#", "Ruby", "PHP", "Swift", "Kotlin", "Dart",
  "Scala", "R", "MATLAB",

  // Frontend frameworks
  "React", "Vue", "Angular", "Svelte", "Solid",
  "Next.js", "Nuxt.js", "Remix", "Astro", "SvelteKit",

  // CSS frameworks
  "Tailwind", "Bootstrap", "CSS Modules", "Sass", "Styled Components",
  "Material UI", "Chakra UI", "shadcn/ui",

  // Databases
  "PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis",
  "Supabase", "Firebase", "DynamoDB", "Cassandra",
  "PlanetScale", "Neon", "Turso",

  // Cloud & hosting
  "AWS", "Google Cloud", "Azure", "Vercel", "Netlify",
  "Railway", "Render", "Heroku", "DigitalOcean", "Cloudflare",

  // DevOps & tools
  "Docker", "Kubernetes", "GitHub", "GitLab", "Bitbucket",
  "GitHub Actions", "Jenkins", "CircleCI", "Terraform", "Ansible",

  // Code editors & IDEs
  "VS Code", "JetBrains", "IntelliJ", "WebStorm", "PyCharm",
  "Cursor", "Vim", "Neovim", "Emacs", "Sublime Text", "Zed",
  "Windsurf",

  // Package managers
  "npm", "pnpm", "yarn", "bun",

  // Productivity & notes
  "Notion", "Obsidian", "Evernote", "Roam Research",
  "Bear", "Apple Notes", "OneNote", "Logseq",

  // Project management
  "Jira", "Linear", "Asana", "Monday.com", "Trello",
  "ClickUp", "Basecamp", "Height",

  // Design tools
  "Figma", "Sketch", "Adobe XD", "Canva", "Adobe Illustrator",
  "Framer", "Penpot",

  // Communication
  "Slack", "Microsoft Teams", "Discord", "Zoom", "Google Meet",
  "Webex", "Loom",

  // Email
  "Gmail", "Outlook", "Apple Mail", "HEY", "Superhuman", "ProtonMail",

  // Browsers
  "Chrome", "Firefox", "Safari", "Edge", "Arc", "Brave",
  "Opera",

  // Security & VPN
  "NordVPN", "ExpressVPN", "Mullvad", "ProtonVPN", "Surfshark",
  "1Password", "Bitwarden", "LastPass", "Dashlane",

  // Website builders & CMS
  "WordPress", "Webflow", "Wix", "Squarespace", "Framer",
  "Ghost", "Contentful", "Sanity",

  // E-commerce
  "Shopify", "WooCommerce", "BigCommerce", "Magento", "Etsy",

  // Finance & payments
  "Stripe", "PayPal", "Square", "Wise", "Revolut",
  "Coinbase", "Binance", "Robinhood", "eToro",

  // Jobs & career
  "LinkedIn", "Indeed", "Glassdoor", "AngelList", "Upwork", "Fiverr",

  // Cars & EVs
  "Tesla Model 3", "Tesla Model Y", "BMW 3 Series",
  "Toyota Camry", "Honda Civic", "Ford Mustang",

  // Health & fitness
  "Keto Diet", "Intermittent Fasting", "Paleo Diet", "Vegan Diet",
  "MyFitnessPal", "Cronometer",

  // AI image tools
  "Midjourney", "Stable Diffusion", "DALL-E", "Adobe Firefly",
  "Ideogram", "Leonardo AI",

  // LLM models
  "GPT-4o", "GPT-4", "Claude 3.5 Sonnet", "Claude 3 Opus",
  "Gemini 1.5 Pro", "Llama 3", "Mistral",
];

export function getSuggestions(query: string, max = 7): string[] {
  if (!query || query.trim().length < 1) return [];
  const q = query.toLowerCase().trim();

  // Sort: starts-with matches first, then contains matches
  const startsWith: string[] = [];
  const contains: string[] = [];

  for (const item of ALL_ITEMS) {
    const lower = item.toLowerCase();
    if (lower.startsWith(q)) startsWith.push(item);
    else if (lower.includes(q)) contains.push(item);
  }

  return [...startsWith, ...contains].slice(0, max);
}
