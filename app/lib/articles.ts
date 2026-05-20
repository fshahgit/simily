export interface ArticleSection {
  heading?: string;
  body: string; // plain paragraphs, use \n\n for paragraph breaks
  list?: string[]; // optional bullet list after body
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO string
  category: string;
  readTime: number; // minutes
  coverEmoji: string;
  sections: ArticleSection[];
  relatedComparisons?: { a: string; b: string }[];
}

export const ALL_ARTICLES: Article[] = [
  {
    slug: "claude-vs-chatgpt-2026",
    title: "Claude vs ChatGPT: Which AI Assistant Is Actually Better in 2026?",
    description:
      "We put Claude and ChatGPT head-to-head across writing, coding, reasoning, and everyday tasks. Here's which one wins — and when.",
    date: "2026-05-15",
    category: "AI",
    readTime: 7,
    coverEmoji: "🤖",
    sections: [
      {
        body: "Two years ago, the AI assistant debate was simple: ChatGPT was the obvious choice. In 2026, that's no longer the case. Anthropic's Claude has matured into a genuine rival — and depending on what you need it for, it might actually be the better tool.\n\nWe've spent weeks using both for real work: writing long-form content, debugging code, analysing documents, and having nuanced conversations. Here's what we found.",
      },
      {
        heading: "Writing & Tone",
        body: "Claude consistently produces more natural, human-sounding prose. It avoids the corporate filler that ChatGPT often falls back on and adjusts its tone more precisely when asked. For blog posts, emails, or essays where you want writing that doesn't feel AI-generated, Claude edges ahead.\n\nChatGPT, however, is faster at producing structured content — listicles, outlines, and templates. If you need a framework fast and you'll rewrite it anyway, GPT-4o gets you there quicker.",
      },
      {
        heading: "Coding & Technical Tasks",
        body: "This is where it gets close. Both models can write solid code in popular languages, debug errors, and explain complex concepts clearly. GPT-4o has a slight edge in speed and breadth — it's been trained on a wider coding dataset and integrates with more tools (like Cursor and GitHub Copilot).\n\nClaude, on the other hand, is better at reasoning through longer codebases and explaining *why* something works, not just what to do. For senior developers who want to understand the code they're generating, Claude is often more useful.",
      },
      {
        heading: "Reasoning & Analysis",
        body: "Claude 3.5 Sonnet and Claude 3 Opus consistently score higher on reasoning benchmarks in 2026. For tasks like analysing legal documents, understanding dense research papers, or working through multi-step logic problems, Claude is the stronger choice.\n\nChatGPT with GPT-4o is no slouch here, but it's more likely to confidently give a plausible-sounding wrong answer. Claude tends to hedge more appropriately and flag uncertainty — which is actually a feature, not a bug.",
      },
      {
        heading: "Which Should You Use?",
        body: "Use ChatGPT if: you want fast, broad answers, you rely on plugins and integrations, you do a lot of image generation (DALL-E), or you want voice mode for hands-free use.\n\nUse Claude if: you're working with long documents, you want more accurate and nuanced writing, you prefer a model that admits when it doesn't know something, or you're doing deep research or analysis.",
        list: [
          "ChatGPT wins on: speed, plugins, image generation, voice mode",
          "Claude wins on: writing quality, long documents, reasoning accuracy, honesty",
          "Both are excellent for: everyday Q&A, summarisation, brainstorming",
        ],
      },
      {
        heading: "The Verdict",
        body: "There's no universal winner — the best AI in 2026 depends entirely on your workflow. But the gap has narrowed dramatically. If you're paying for one subscription, try both free tiers first. You'll know within a week which one fits how you think.",
      },
    ],
    relatedComparisons: [
      { a: "ChatGPT", b: "Claude" },
      { a: "GPT-4o", b: "Claude 3.5 Sonnet" },
      { a: "Claude", b: "Gemini" },
    ],
  },

  {
    slug: "best-laptop-for-students-2026",
    title: "Best Laptop for Students in 2026: Top Picks for Every Budget",
    description:
      "From the MacBook Air M3 to budget Windows picks, here are the best student laptops in 2026 — tested for battery life, performance, and value.",
    date: "2026-05-10",
    category: "Laptops",
    readTime: 8,
    coverEmoji: "💻",
    sections: [
      {
        body: "Choosing a laptop as a student in 2026 is both easier and harder than ever. Easier because the average laptop is genuinely excellent — harder because the options are overwhelming and the wrong pick can cost you years of productivity.\n\nWe've narrowed it down to the best options across different budgets, use cases, and operating systems — so you can stop second-guessing and start studying.",
      },
      {
        heading: "Best Overall: MacBook Air M3",
        body: "The MacBook Air M3 remains the gold standard for student laptops in 2026. Apple's M3 chip delivers exceptional performance for coursework, coding, video editing, and everything in between — all while lasting up to 18 hours on a single charge.\n\nIt's thin, light, fanless (completely silent), and the build quality is unmatched at this price. Yes, it's more expensive than Windows alternatives, but the combination of performance, battery life, and longevity makes it the best long-term investment most students can make.\n\nIdeal for: General students, design/media students, developers, anyone in an Apple ecosystem.",
      },
      {
        heading: "Best Windows Laptop: Dell XPS 13",
        body: "If you're in the Windows camp, the Dell XPS 13 is the closest equivalent to a MacBook Air. It's compact, premium, and powered by Intel's latest processors. The display is stunning — one of the best screens you'll find on a laptop this size.\n\nBattery life is good (10–12 hours real-world) but doesn't quite match Apple silicon. For engineering students who need Windows-specific software, or anyone who just prefers Windows, the XPS 13 is the clear pick.",
      },
      {
        heading: "Best Budget Pick: Acer Aspire / Lenovo IdeaPad",
        body: "Not everyone can spend $1,200+ on a laptop. For students on a tight budget, the Acer Aspire 5 and Lenovo IdeaPad 5 both offer excellent value under $600. They won't blow you away with premium feel, but they handle everything a student actually needs: web browsing, Office apps, video calls, and light coding.\n\nExpect 7–9 hours of real-world battery life and solid build quality. Skip the cheapest configurations and aim for at least 16GB RAM and an SSD.",
      },
      {
        heading: "Best for Engineering & Science: ThinkPad X1 Carbon",
        body: "Engineering students have specific needs: robust build, reliable keyboard, Windows compatibility with specialised software, and enough CPU power for simulations and MATLAB. The Lenovo ThinkPad X1 Carbon delivers on all of these.\n\nThe keyboard is legendary — widely considered the best on any laptop. It's also MIL-SPEC tested for durability, which matters if you're lugging it between labs and lectures every day.",
      },
      {
        heading: "Best for Creative Students: MacBook Pro M3",
        body: "If you're studying design, film, music production, or architecture, the MacBook Pro M3 is worth the premium. The Pro Max chip configuration can handle 4K video exports, large Figma files, and intensive renders without breaking a sweat.\n\nFor most students this is overkill — but if your coursework is genuinely demanding on hardware, the Pro pays for itself in time saved.",
      },
      {
        heading: "What to Look For",
        body: "Whatever you choose, prioritise these specs:",
        list: [
          "RAM: 16GB minimum — 8GB will feel slow within a year",
          "Storage: 256GB SSD minimum, 512GB preferred",
          "Battery: aim for 10+ hours real-world, not the manufacturer's quoted figure",
          "Weight: under 1.5kg if you'll be carrying it daily",
          "Display: 1080p minimum, IPS or OLED for better colours",
        ],
      },
    ],
    relatedComparisons: [
      { a: "MacBook Air M3", b: "MacBook Air M2" },
      { a: "MacBook Air", b: "Dell XPS" },
      { a: "MacBook Pro M3", b: "MacBook Air M3" },
    ],
  },

  {
    slug: "best-budget-laptop-for-students-2026",
    title: "Best Budget Laptop for Students in 2026 (Under $600)",
    description:
      "You don't need to spend a fortune on a student laptop. These are the best budget picks under $600 that won't let you down in lectures or at the library.",
    date: "2026-05-08",
    category: "Laptops",
    readTime: 6,
    coverEmoji: "🎒",
    sections: [
      {
        body: "The good news: you don't need to spend $1,000+ to get a capable student laptop in 2026. The budget segment has improved enormously — $400–$600 now buys you a genuinely solid machine that handles everything most students need.\n\nThe bad news: there's a lot of rubbish in this price range. Here's how to avoid it.",
      },
      {
        heading: "Our Top Budget Pick: Acer Aspire 5",
        body: "The Acer Aspire 5 consistently ranks as one of the best value laptops you can buy. The latest model packs an AMD Ryzen 5 processor, 16GB RAM, and a 512GB SSD into a sturdy chassis for around $450–$500.\n\nThe display is a Full HD IPS panel — good colours, decent brightness, perfectly fine for coursework and Netflix. Battery life hits around 8 hours in real-world use. Not class-leading, but enough to get through a full day of lectures without hunting for a socket.",
      },
      {
        heading: "Runner-Up: Lenovo IdeaPad 5",
        body: "The Lenovo IdeaPad 5 is the slightly more premium feel option at a similar price. It has a better keyboard than the Aspire 5 (Lenovo keyboards are always excellent) and a cleaner design.\n\nAvailable in AMD and Intel configurations — go for AMD Ryzen if you can, as it offers better performance-per-watt and therefore better battery life.",
      },
      {
        heading: "Best Chromebook Under $400: ASUS Chromebook Plus",
        body: "If you're doing most of your work in a browser — Google Docs, Sheets, Gmail, online research — a Chromebook is worth serious consideration. The ASUS Chromebook Plus runs ChromeOS, which boots in seconds, never gets viruses, and needs zero maintenance.\n\nThe trade-off: you can't install traditional desktop software like Photoshop or Microsoft Office (though Google's alternatives are excellent). For humanities students, this is rarely a problem.",
      },
      {
        heading: "What to Avoid",
        body: "Steer clear of these common budget laptop traps:",
        list: [
          "8GB RAM configurations — spend a little more for 16GB",
          "1366x768 displays — they look awful, go for 1080p minimum",
          "eMMC storage — it's much slower than an SSD",
          "Celeron or Pentium processors — they'll feel sluggish immediately",
          "Anything under 45Wh battery — you'll be tethered to a charger",
        ],
      },
      {
        heading: "The Budget Sweet Spot",
        body: "Spend $450–$550 and you can get a laptop that will genuinely serve you well for 3–4 years. The Aspire 5 and IdeaPad 5 in their 16GB RAM configurations are the sweet spot — capable enough for anything a student needs, priced low enough to not require a student loan.\n\nIf your budget is truly under $400, look at Chromebooks or certified refurbished models from Dell or Lenovo — both offer excellent refurb programmes with warranties.",
      },
    ],
    relatedComparisons: [
      { a: "MacBook Air M3", b: "Dell XPS" },
      { a: "MacBook Air M2", b: "MacBook Air M3" },
    ],
  },

  {
    slug: "deepseek-vs-gpt4o-2026",
    title: "DeepSeek vs GPT-4o: The AI Battle That Shocked Everyone",
    description:
      "DeepSeek came out of nowhere and rattled the AI industry. But is it actually better than GPT-4o for everyday use? We tested both extensively.",
    date: "2026-05-05",
    category: "AI",
    readTime: 6,
    coverEmoji: "⚡",
    sections: [
      {
        body: "When DeepSeek launched, it didn't just turn heads — it briefly wiped $600 billion off Nvidia's market cap. The claim: a Chinese AI lab had matched or beaten OpenAI's best models at a fraction of the training cost. It was either the most important AI story of 2026 or a massive overcorrection. We tested both to find out.",
      },
      {
        heading: "The Cost Angle",
        body: "DeepSeek's most remarkable achievement isn't the model itself — it's how cheaply it was built. OpenAI spent hundreds of millions training GPT-4. DeepSeek allegedly matched comparable performance for under $6 million. Whether you believe that figure or not, the performance-to-cost ratio is genuinely remarkable.\n\nFor users, this translates to DeepSeek being free (or very cheap via API) with no meaningful quality sacrifice for many tasks.",
      },
      {
        heading: "Reasoning & Maths",
        body: "DeepSeek R1 is the model to beat on reasoning tasks in 2026. It was specifically trained with reinforcement learning to think through problems step by step — similar to OpenAI's o1 model but significantly cheaper to run.\n\nOn maths problems, logic puzzles, and multi-step reasoning tasks, DeepSeek R1 is genuinely competitive with GPT-4o and sometimes surpasses it. If you're a student using AI for maths or physics homework help, DeepSeek deserves serious consideration.",
      },
      {
        heading: "Everyday Use & Writing",
        body: "For general use — answering questions, summarising content, writing emails — GPT-4o still has the edge. It's smoother, faster, and has a broader general knowledge base. DeepSeek can feel slightly stilted in casual conversation, and its English writing occasionally has tells that betray its training data.\n\nGPT-4o also benefits from years of refinement on user feedback. The UI is polished, the responses are calibrated well for everyday tasks, and the ecosystem (plugins, API, mobile apps) is more mature.",
      },
      {
        heading: "Privacy Considerations",
        body: "This is where you need to pay attention. DeepSeek is a Chinese company subject to Chinese law, which includes data sharing obligations with the government. Several European countries and US government agencies have restricted its use on government devices.\n\nFor most everyday personal use this may not be a concern. But if you're working with sensitive data, proprietary code, or anything subject to privacy regulations, stick with a Western provider.",
      },
      {
        heading: "The Verdict",
        body: "DeepSeek is a genuine achievement that forced the entire AI industry to rethink its assumptions about what AI development costs. For reasoning and maths tasks, it's world-class and free. For general everyday use, GPT-4o is still smoother and more polished.\n\nThe smart move: use both. DeepSeek for technical reasoning, GPT-4o for everything else.",
        list: [
          "DeepSeek wins: reasoning, maths, coding logic, cost (it's free)",
          "GPT-4o wins: writing quality, general knowledge, ecosystem, privacy",
          "Avoid DeepSeek if: you're handling sensitive or regulated data",
        ],
      },
    ],
    relatedComparisons: [
      { a: "DeepSeek", b: "GPT-4o" },
      { a: "DeepSeek", b: "Claude" },
      { a: "DeepSeek", b: "Perplexity" },
    ],
  },

  {
    slug: "best-ai-tools-for-students-2026",
    title: "Best AI Tools for Students in 2026 (Free & Paid)",
    description:
      "From AI writing assistants to research tools and coding helpers, here are the AI tools every student should know about in 2026.",
    date: "2026-05-01",
    category: "AI",
    readTime: 7,
    coverEmoji: "🎓",
    sections: [
      {
        body: "AI has fundamentally changed how students study, write, and learn in 2026. The students who know which tools to use — and how to use them ethically — have a genuine advantage. Here's your complete guide to the best AI tools available right now.",
      },
      {
        heading: "For Writing & Essays: Claude",
        body: "Claude is the best AI writing assistant for students in 2026. Unlike ChatGPT, which can produce noticeably robotic prose, Claude writes in a way that sounds human and nuanced. It's excellent for brainstorming essay arguments, getting feedback on your writing, and working through complex ideas.\n\nImportant: use it as a thinking partner, not a ghostwriter. Ask it to challenge your argument or suggest counterpoints — that's where the real learning happens. The free tier is generous for daily student use.",
      },
      {
        heading: "For Research: Perplexity AI",
        body: "Perplexity is the AI tool most students don't know about but should. Unlike ChatGPT or Claude, Perplexity searches the web in real time and cites its sources — which means you can actually verify what it's telling you.\n\nFor literature reviews, finding academic sources, or getting a quick grounding in an unfamiliar topic, Perplexity is far more reliable than other AI tools. It saves hours that you'd otherwise spend down Google rabbit holes.",
      },
      {
        heading: "For Coding: GitHub Copilot / Cursor",
        body: "Computer science students get a huge advantage from AI coding tools in 2026. GitHub Copilot (free for students with GitHub Education) autocompletes code as you type — like a very smart autocorrect for programming. It's especially helpful when you're learning a new language or library.\n\nCursor is a step further — it's an entire IDE built around AI. You can describe what you want in plain English and it writes the code. For assignments and projects, it dramatically speeds up the boring parts and lets you focus on the logic.",
      },
      {
        heading: "For Note-Taking & Study: Notion AI",
        body: "Notion's built-in AI can summarise your lecture notes, generate flashcards, and help you organise your thinking. If you already use Notion for note-taking, the AI upgrade is worth it. For students starting fresh, Notion with AI is the most complete academic productivity tool available.\n\nAlternatively, if you prefer a more minimal approach, Obsidian with AI plugins gives you powerful knowledge management without the subscription cost.",
      },
      {
        heading: "For Language Learning: Duolingo Max",
        body: "Duolingo's Max tier uses GPT-4 to power two game-changing features: Explain My Answer (real AI explanations of why you got something wrong) and Roleplay (conversational practice with an AI that responds in the language you're learning).\n\nFor language students, this is a fundamentally better way to practise than traditional apps. The AI is patient, always available, and doesn't judge your mistakes.",
      },
      {
        heading: "The Golden Rule",
        body: "The best use of AI as a student isn't to do your work for you — it's to help you understand things faster and think more deeply. Use it to get unstuck, challenge your reasoning, and explore ideas. The students who use AI as a crutch learn less. The ones who use it as a thinking partner learn more than any previous generation could.",
        list: [
          "Claude — best for writing, analysis, and deep thinking",
          "Perplexity — best for research with cited sources",
          "GitHub Copilot — free for students, essential for coding",
          "Notion AI — best for note organisation and study planning",
          "Duolingo Max — best for language learning practice",
        ],
      },
    ],
    relatedComparisons: [
      { a: "ChatGPT", b: "Claude" },
      { a: "Notion", b: "Obsidian" },
      { a: "GitHub Copilot", b: "Cursor" },
    ],
  },

  {
    slug: "cursor-vs-github-copilot-2026",
    title: "Cursor vs GitHub Copilot: Which AI Coding Tool Is Better in 2026?",
    description:
      "Both promise to make you a faster developer. But Cursor and GitHub Copilot take very different approaches. Here's which one actually delivers.",
    date: "2026-04-28",
    category: "AI",
    readTime: 6,
    coverEmoji: "⌨️",
    sections: [
      {
        body: "The AI coding assistant race has a clear leader in 2026 — the question is whether that leader is Cursor or GitHub Copilot. They both use large language models to help you write code faster, but their philosophies are completely different. Copilot augments your existing editor. Cursor replaces it.",
      },
      {
        heading: "GitHub Copilot: The Inline Assistant",
        body: "Copilot lives inside VS Code (and JetBrains, Neovim, etc.) as an extension. It suggests code completions as you type, can generate entire functions from comments, and in its chat mode can explain code, suggest refactors, and help debug errors.\n\nThe key advantage: you don't change how you work. You keep your existing editor, your existing shortcuts, and your existing extensions. Copilot just makes you faster within that workflow.",
      },
      {
        heading: "Cursor: The AI-First IDE",
        body: "Cursor is a fork of VS Code rebuilt around AI from the ground up. The core workflow is different: you can select any block of code and ask an AI to edit it in natural language. You can reference multiple files in a single conversation. You can ask it to explain your entire codebase.\n\nThe 'Composer' feature is especially powerful — describe a multi-file feature you want to build, and Cursor will draft all the files, show you the diffs, and let you apply or reject each change. It's a genuinely different paradigm from Copilot.",
      },
      {
        heading: "Performance in 2026",
        body: "Both tools use best-in-class models (GPT-4o, Claude 3.5 Sonnet). The quality of suggestions is roughly comparable for everyday coding. Where they diverge is on complex, multi-file tasks — and Cursor is significantly better here.\n\nCopilot's context window is limited to what's currently visible. Cursor can pull in your entire project context. For anything beyond single-file edits, Cursor's outputs are more coherent and require less manual correction.",
      },
      {
        heading: "Price & Value",
        body: "GitHub Copilot is $10/month for individuals ($19 for the Pro+ tier). It's free for students and open-source maintainers — a huge advantage if you qualify.\n\nCursor costs $20/month for the Pro tier. It includes 500 fast premium requests per month and unlimited slower ones. For professional developers, the productivity gain justifies the cost easily. For students or hobby developers, Copilot's free tier is hard to beat.",
      },
      {
        heading: "Which Should You Choose?",
        body: "Choose GitHub Copilot if: you're a student (it's free), you're deeply invested in a non-VS Code editor, or you want AI assistance without changing your workflow.\n\nChoose Cursor if: you write code professionally, you work across multiple files regularly, or you want to experience the most advanced AI coding experience currently available.",
        list: [
          "Copilot wins: price (free for students), IDE flexibility, familiarity",
          "Cursor wins: multi-file context, natural language edits, codebase understanding",
          "Both are excellent for: autocomplete, docstring generation, explaining errors",
        ],
      },
    ],
    relatedComparisons: [
      { a: "Cursor", b: "GitHub Copilot" },
      { a: "Cursor", b: "Windsurf" },
      { a: "VS Code", b: "Cursor" },
    ],
  },

  {
    slug: "macbook-air-m3-vs-windows-laptop-2026",
    title: "MacBook Air M3 vs Windows Laptop: The Honest Comparison for 2026",
    description:
      "Should you go Mac or Windows in 2026? We break down the real differences in performance, battery, software, and long-term value.",
    date: "2026-04-20",
    category: "Laptops",
    readTime: 7,
    coverEmoji: "🖥️",
    sections: [
      {
        body: "The Mac vs Windows debate has been raging for decades, but 2026 has made it more interesting than ever. Apple silicon changed the performance equation dramatically, but Windows 11 has finally matured into a polished operating system. Which should you actually buy?",
      },
      {
        heading: "Performance: Apple Silicon's Massive Lead",
        body: "The MacBook Air M3 is still the performance benchmark for thin-and-light laptops in 2026. Apple's chip architecture delivers performance that Intel and AMD match only in thicker, hotter, more expensive machines.\n\nFor everyday tasks — browsing, documents, email, video calls — any modern laptop feels fast enough. Where the M3 stands out is sustained performance. Windows ultrabooks thermally throttle under extended load; the fanless MacBook Air maintains performance consistently because Apple's chip is so efficient it barely generates heat.",
      },
      {
        heading: "Battery Life: Still No Contest",
        body: "MacBook Air M3 delivers 15–18 hours of real-world battery life. The best Windows ultrabooks (Dell XPS 13, ThinkPad X1 Carbon) manage 10–12 hours — impressive, but noticeably shorter.\n\nIn practical terms: if you're going into a full day of lectures or meetings without a charger, only the MacBook Air gives you genuine confidence you'll make it through.",
      },
      {
        heading: "Software & Ecosystem",
        body: "This is where it gets nuanced. Windows has vastly broader software support — specialised engineering tools, enterprise software, games, and niche applications often exist only on Windows. If your university course requires specific Windows-only software (AutoCAD, certain simulation tools, some medical imaging apps), you don't have a choice.\n\nMacOS has a smaller software library but almost everything that matters exists in excellent Mac versions. The Creative Suite, Office, development tools, communication apps — they're all there and often feel more polished on Mac.\n\nIf you need a Windows program on Mac, Parallels lets you run Windows in a virtual machine — it works surprisingly well on Apple silicon.",
      },
      {
        heading: "Price: Windows Wins on Value at Lower Price Points",
        body: "The MacBook Air M3 starts at $1,099. For that money in the Windows world you can get significantly more RAM, more storage, and a larger screen.\n\nFor students and anyone on a budget, this matters. A $600 Windows laptop handles the same everyday tasks as a $1,100 MacBook — you just get worse battery life and a less refined experience. The Mac is better, but not twice-as-good better for basic use.",
      },
      {
        heading: "Gaming",
        body: "Windows wins here, and it's not close. If gaming matters to you at all, buy a Windows laptop. MacOS gaming has improved (more titles, better support), but the game library is a fraction of what's available on Windows and GPU performance in equivalent-priced machines isn't comparable.",
      },
      {
        heading: "The Verdict",
        body: "Buy a Mac if: battery life is a priority, you're in the Apple ecosystem (iPhone, iPad), you do creative or development work, or you want a machine that will feel fast and relevant for 5+ years.\n\nBuy Windows if: you need specific Windows-only software, gaming is important, you want more hardware for your money, or you prefer the flexibility of the broader Windows ecosystem.",
        list: [
          "Mac wins: battery life, performance efficiency, build quality, longevity",
          "Windows wins: software breadth, gaming, value at budget tiers, flexibility",
          "Tie: everyday productivity, video calls, Office/Google Workspace, web browsing",
        ],
      },
    ],
    relatedComparisons: [
      { a: "Mac", b: "Windows" },
      { a: "MacBook Air M3", b: "MacBook Air M2" },
      { a: "MacBook Air", b: "Dell XPS" },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ALL_ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return ALL_ARTICLES.filter((a) => a.category === category);
}

export const ARTICLE_CATEGORIES = [...new Set(ALL_ARTICLES.map((a) => a.category))];
