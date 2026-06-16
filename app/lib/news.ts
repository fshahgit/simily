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
    date: "2026-06-16",
    items: [
    {
      id: "openai-gpt-5-enterprise-rollout",
      title: "OpenAI Begins GPT-5 Enterprise Rollout with Enhanced Reasoning Capabilities",
      summary: "OpenAI has started rolling out GPT-5 to enterprise customers, featuring significantly improved multi-step reasoning and reduced hallucination rates. The model demonstrates 40% better accuracy on complex analytical tasks compared to GPT-4 Turbo. Consumer access is expected by late summer 2026.",
      category: "AI",
      publisher: "TechCrunch",
      sourceUrl: "https://techcrunch.com/2026/06/16/openai-gpt-5-enterprise-rollout",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&q=80",
      date: "2026-06-16",
      readTime: 4,
    },
    {
      id: "apple-vision-pro-2-announcement",
      title: "Apple Announces Vision Pro 2 at WWDC with 50% Weight Reduction",
      summary: "Apple revealed Vision Pro 2 at WWDC 2026, addressing the original's biggest criticism with a dramatic weight reduction to under 400 grams. The updated headset features the M4 chip, improved passthrough cameras, and a starting price of $2,499. Shipping begins in September.",
      category: "Gadgets",
      publisher: "The Verge",
      sourceUrl: "https://theverge.com/2026/6/16/apple-vision-pro-2-wwdc-announcement",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&q=80",
      date: "2026-06-16",
      readTime: 5,
    },
    {
      id: "ethereum-pectra-upgrade-live",
      title: "Ethereum Pectra Upgrade Goes Live, Enabling Account Abstraction",
      summary: "Ethereum successfully activated the Pectra upgrade, introducing EIP-7702 which enables native account abstraction for all wallets. The upgrade simplifies user onboarding by allowing gas payments in stablecoins and enabling social recovery features. ETH prices rose 8% following the smooth transition.",
      category: "Blockchain",
      publisher: "CoinDesk",
      sourceUrl: "https://coindesk.com/tech/2026/06/16/ethereum-pectra-upgrade-live",
      image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&auto=format&q=80",
      date: "2026-06-16",
      readTime: 3,
    },
    {
      id: "microsoft-copilot-agents-autonomous",
      title: "Microsoft Launches Autonomous Copilot Agents for Enterprise Workflows",
      summary: "Microsoft announced Copilot Agents, AI systems that can independently execute multi-step business processes across Microsoft 365 apps. Early adopters report 60% reduction in routine administrative tasks. The feature rolls out to Microsoft 365 E5 customers starting July 2026.",
      category: "AI",
      publisher: "Wired",
      sourceUrl: "https://wired.com/story/microsoft-copilot-agents-autonomous-enterprise",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&q=80",
      date: "2026-06-16",
      readTime: 4,
    },
    {
      id: "google-willow-quantum-supremacy",
      title: "Google's Willow Quantum Chip Solves Previously Impossible Chemistry Problem",
      summary: "Google's 105-qubit Willow processor has successfully simulated a complex molecular interaction relevant to drug discovery that would take classical supercomputers thousands of years. The breakthrough demonstrates practical quantum advantage for pharmaceutical research. Partnerships with Pfizer and Roche are underway.",
      category: "Science",
      publisher: "Nature",
      sourceUrl: "https://nature.com/articles/google-willow-quantum-chemistry-breakthrough",
      image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&q=80",
      date: "2026-06-16",
      readTime: 5,
    },
    {
      id: "nvidia-blackwell-ultra-data-centers",
      title: "Nvidia Ships First Blackwell Ultra GPUs as AI Data Center Demand Surges",
      summary: "Nvidia has begun shipping its Blackwell Ultra B300 GPUs to major cloud providers including AWS, Microsoft Azure, and Google Cloud. The chips deliver 2.5x inference performance over Hopper architecture. Nvidia reported $45 billion in data center revenue for Q1 2026.",
      category: "Tech",
      publisher: "Reuters",
      sourceUrl: "https://reuters.com/technology/nvidia-blackwell-ultra-shipments-data-centers-2026-06-16",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&q=80",
      date: "2026-06-16",
      readTime: 3,
    },
    ],
  },
  {
    date: "2026-06-15",
    items: [
    {
      id: "openai-gpt-5-enterprise-rollout",
      title: "OpenAI Begins GPT-5 Enterprise Rollout With Enhanced Reasoning Capabilities",
      summary: "OpenAI has started rolling out GPT-5 to enterprise customers, featuring significantly improved logical reasoning and reduced hallucination rates. The model reportedly scores 92% on complex multi-step reasoning benchmarks, up from GPT-4's 78%. Microsoft Azure customers get priority access as part of the companies' expanded partnership.",
      category: "AI",
      publisher: "The Verge",
      sourceUrl: "https://theverge.com/2026/6/15/openai-gpt-5-enterprise-launch",
      image: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&auto=format&q=80",
      date: "2026-06-15",
      readTime: 4,
    },
    {
      id: "apple-vision-pro-2-announcement",
      title: "Apple Announces Vision Pro 2 at WWDC 2026 With 50% Weight Reduction",
      summary: "Apple unveiled Vision Pro 2 at WWDC 2026, addressing the biggest complaint about its predecessor with a 50% weight reduction to 325 grams. The $2,999 headset features the new M5 chip, improved pass-through cameras, and native support for spatial FaceTime with up to 20 participants. Ships September 2026.",
      category: "Gadgets",
      publisher: "TechCrunch",
      sourceUrl: "https://techcrunch.com/2026/06/15/apple-vision-pro-2-wwdc-announcement",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&q=80",
      date: "2026-06-15",
      readTime: 5,
    },
    {
      id: "ethereum-pectra-upgrade-complete",
      title: "Ethereum Completes Pectra Upgrade, Boosting Staking Limits to 2048 ETH",
      summary: "Ethereum successfully activated the Pectra upgrade, raising the maximum effective validator balance from 32 ETH to 2048 ETH. The upgrade also introduces EIP-7702 for account abstraction improvements, allowing regular wallets to temporarily function as smart contracts. Gas fees dropped 15% in the hours following activation.",
      category: "Blockchain",
      publisher: "CoinDesk",
      sourceUrl: "https://coindesk.com/tech/2026/06/15/ethereum-pectra-upgrade-live",
      image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&auto=format&q=80",
      date: "2026-06-15",
      readTime: 3,
    },
    {
      id: "google-quantum-supremacy-chemistry",
      title: "Google Quantum Team Simulates New Catalyst for Carbon Capture",
      summary: "Google's quantum computing division announced its Willow processor successfully simulated a novel molecular catalyst that could improve carbon capture efficiency by 40%. This marks the first commercially relevant chemistry simulation impossible on classical supercomputers. Partner company Carbon Engineering plans real-world testing by Q4 2026.",
      category: "Science",
      publisher: "Wired",
      sourceUrl: "https://wired.com/story/google-quantum-carbon-capture-catalyst",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&q=80",
      date: "2026-06-15",
      readTime: 4,
    },
    {
      id: "nvidia-rtx-6090-announcement",
      title: "Nvidia Unveils RTX 6090 With 32GB GDDR7, Priced at $1,999",
      summary: "Nvidia announced the GeForce RTX 6090 featuring the new Blackwell architecture for consumers, with 32GB of GDDR7 memory and claimed 2x performance over the RTX 5090 in ray-traced workloads. The $1,999 flagship GPU targets AI-assisted content creators and gamers running 8K displays. Pre-orders open July 1.",
      category: "Tech",
      publisher: "Ars Technica",
      sourceUrl: "https://arstechnica.com/gaming/2026/06/nvidia-rtx-6090-blackwell-announcement",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&q=80",
      date: "2026-06-15",
      readTime: 3,
    },
    {
      id: "anthropic-claude-4-safety-benchmark",
      title: "Anthropic's Claude 4 Sets New Standard in AI Safety Benchmarks",
      summary: "Anthropic released Claude 4, which scored 94% on the new ML Commons AI Safety benchmark while matching GPT-5's reasoning performance. The model introduces 'constitutional reasoning traces' that show users how it evaluates potentially harmful requests. Enterprise pricing starts at $0.02 per 1K tokens.",
      category: "AI",
      publisher: "Reuters",
      sourceUrl: "https://reuters.com/technology/anthropic-claude-4-safety-benchmark-2026-06-15",
      image: "https://images.unsplash.com/photo-1676277791608-ac54525aa94d?w=800&auto=format&q=80",
      date: "2026-06-15",
      readTime: 4,
    },
    ],
  },
  {
    date: "2026-06-14",
    items: [
    {
      id: "openai-gpt-5-enterprise-rollout",
      title: "OpenAI Begins GPT-5 Enterprise Rollout With Enhanced Reasoning Capabilities",
      summary: "OpenAI has started rolling out GPT-5 to enterprise customers, featuring significantly improved multi-step reasoning and reduced hallucination rates. The model reportedly scores 92% on complex legal and medical benchmarks, up from GPT-4's 78%. Enterprise pricing starts at $0.06 per 1K tokens.",
      category: "AI",
      publisher: "TechCrunch",
      sourceUrl: "https://techcrunch.com/2026/06/14/openai-gpt-5-enterprise-rollout",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&q=80",
      date: "2026-06-14",
      readTime: 4,
    },
    {
      id: "apple-vision-pro-2-announcement",
      title: "Apple Announces Vision Pro 2 at WWDC 2026 With 50% Weight Reduction",
      summary: "Apple unveiled Vision Pro 2 at WWDC 2026, addressing major criticisms of the original headset. The new model weighs just 350 grams, features an M4 chip, and starts at $2,499. Apple also announced visionOS 3 with native Microsoft Office support.",
      category: "Gadgets",
      publisher: "The Verge",
      sourceUrl: "https://theverge.com/2026/6/14/apple-vision-pro-2-wwdc-announcement",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&q=80",
      date: "2026-06-14",
      readTime: 5,
    },
    {
      id: "ethereum-pectra-upgrade-live",
      title: "Ethereum Pectra Upgrade Goes Live, Doubles Blob Capacity for Layer 2s",
      summary: "Ethereum successfully activated the Pectra upgrade, doubling blob space for Layer 2 rollups and introducing account abstraction features. Transaction costs on networks like Arbitrum and Optimism dropped 40% within hours. ETH price rose 8% following the smooth deployment.",
      category: "Blockchain",
      publisher: "CoinDesk",
      sourceUrl: "https://coindesk.com/tech/2026/06/14/ethereum-pectra-upgrade-live",
      image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=800&auto=format&q=80",
      date: "2026-06-14",
      readTime: 3,
    },
    {
      id: "google-deepmind-protein-drug-discovery",
      title: "Google DeepMind's AlphaFold 3 Identifies New Antibiotic Compound",
      summary: "Google DeepMind announced that AlphaFold 3 has identified a promising antibiotic compound effective against drug-resistant bacteria. The AI-discovered molecule showed 94% efficacy against MRSA in lab tests. Novartis has signed a partnership to begin clinical trials in Q4 2026.",
      category: "Science",
      publisher: "Nature",
      sourceUrl: "https://nature.com/articles/deepmind-alphafold-antibiotic-discovery-2026",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&q=80",
      date: "2026-06-14",
      readTime: 4,
    },
    {
      id: "microsoft-activision-cloud-gaming-milestone",
      title: "Microsoft's Xbox Cloud Gaming Hits 50 Million Subscribers",
      summary: "Microsoft reported Xbox Cloud Gaming has reached 50 million subscribers, tripling since the Activision Blizzard acquisition completed. Call of Duty and World of Warcraft cloud versions drove 60% of new sign-ups. The service now generates $4.2 billion in annual recurring revenue.",
      category: "Tech",
      publisher: "Reuters",
      sourceUrl: "https://reuters.com/technology/microsoft-xbox-cloud-gaming-50-million-2026-06-14",
      image: "https://images.unsplash.com/photo-1605647736739-cd2f4b5612ee?w=800&auto=format&q=80",
      date: "2026-06-14",
      readTime: 3,
    },
    {
      id: "nvidia-blackwell-ultra-data-center",
      title: "Nvidia Ships First Blackwell Ultra GPUs to Hyperscalers Amid Record Demand",
      summary: "Nvidia began shipping its Blackwell Ultra B300 GPUs to Microsoft, Amazon, and Google this week. The chips deliver 2.5x the AI training performance of H100s while using 30% less power. CEO Jensen Huang confirmed demand exceeds supply through 2027.",
      category: "Tech",
      publisher: "Wired",
      sourceUrl: "https://wired.com/story/nvidia-blackwell-ultra-shipping-2026",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&q=80",
      date: "2026-06-14",
      readTime: 4,
    },
    ],
  },
  {
    date: "2026-06-13",
    items: [
      {
        id: "openai-gpt-5-developer-preview",
        title: "OpenAI Surprises With GPT-5 Developer Preview Drop",
        summary: "In a move that caught the industry off guard, OpenAI has released a developer preview of GPT-5. Early benchmarks show a significant leap in long-horizon reasoning and autonomous agent capabilities. The model introduces native multi-step planning, drastically reducing hallucination rates in complex coding tasks.",
        category: "AI",
        publisher: "TechCrunch",
        sourceUrl: "https://techcrunch.com/category/artificial-intelligence/",
        image: "https://images.unsplash.com/photo-1676277791608-ac54525aa94d?w=800&auto=format&q=80",
        date: "2026-06-13",
        readTime: 4,
      },
      {
        id: "apple-vision-pro-2-announcement",
        title: "Apple Announces Vision Pro 2: Lighter, Cheaper, Untethered",
        summary: "Following WWDC, Apple has officially unveiled the Vision Pro 2. Priced at $1,999—significantly lower than its predecessor—the new spatial computer drops the external battery pack in favor of hot-swappable headstrap batteries and sheds 30% of its weight, addressing the biggest complaints of the first generation.",
        category: "Gadgets",
        publisher: "The Verge",
        sourceUrl: "https://www.theverge.com/apple",
        image: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&auto=format&q=80",
        date: "2026-06-13",
        readTime: 5,
      },
      {
        id: "nvidia-rubin-architecture-unveiled",
        title: "NVIDIA Unveils 'Rubin' GPU Architecture Ahead of Schedule",
        summary: "NVIDIA CEO Jensen Huang has revealed the Rubin GPU architecture during a surprise keynote in Taipei. Boasting a 4x efficiency improvement over Blackwell and utilizing a new 2nm process, Rubin is designed explicitly for training trillion-parameter multimodal models with minimal energy overhead.",
        category: "Tech",
        publisher: "Wired",
        sourceUrl: "https://www.wired.com/tag/nvidia/",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&q=80",
        date: "2026-06-13",
        readTime: 3,
      },
      {
        id: "spacex-starship-fuel-transfer",
        title: "SpaceX Successfully Demonstrates Orbital Fuel Transfer",
        summary: "SpaceX has crossed a major milestone for its Artemis moon mission obligations, successfully transferring cryogenic propellant between two Starships in low Earth orbit. The maneuver is critical for enabling deep space missions and paves the way for a crewed lunar landing rehearsal later this year.",
        category: "Science",
        publisher: "SpaceNews",
        sourceUrl: "https://spacenews.com/tag/spacex/",
        image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&auto=format&q=80",
        date: "2026-06-13",
        readTime: 4,
      },
      {
        id: "eu-ai-act-enforcement-begins",
        title: "EU AI Act Enforcement Begins: What Tech Giants Must Change Today",
        summary: "The grace period is over. The European Union has begun active enforcement of the AI Act, meaning companies deploying 'high-risk' AI systems without required transparency disclosures face fines of up to 7% of their global revenue. Several US startups have temporarily suspended European access as a result.",
        category: "Tech",
        publisher: "Bloomberg",
        sourceUrl: "https://www.bloomberg.com/technology",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&q=80",
        date: "2026-06-13",
        readTime: 6,
      },
    ],
  },
  {
    date: "2026-06-09",
    items: [
      {
        id: "wwdc-2026-keynote-recap",
        title: "Apple's WWDC 2026 Keynote: Everything Announced — Siri AI, iOS 27 & macOS Golden Gate",
        summary:
          "In what may be Tim Cook's final WWDC keynote as CEO, Apple unveiled the next generation of Apple Intelligence and a completely rebuilt Siri powered by Google Gemini. iOS 27 and macOS Golden Gate — named after San Francisco's iconic bridge — land as developer betas today, packed with on-device AI, redesigned Liquid Glass visuals, and deeper third-party AI integration including Claude as a Siri option.",
        category: "Tech",
        publisher: "Engadget",
        sourceUrl: "https://www.engadget.com/2189698/everything-announced-at-apples-wwdc-2026-keynote/",
        image: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&auto=format&q=80",
        date: "2026-06-09",
        readTime: 6,
      },
      {
        id: "ios-27-beta-1-developer",
        title: "iOS 27 Beta 1 Is Out Now — Here's What Developers Are Finding",
        summary:
          "Apple seeded iOS 27, iPadOS 27, macOS Golden Gate, watchOS 27, tvOS 27, and visionOS 27 beta 1 to developers immediately after the keynote. Early testers report a significantly revamped Spotlight search, iCloud shared albums now supporting full-resolution photos across Android and Windows, and an opacity slider for the divisive Liquid Glass design. Available on iPhone 15 Pro and iPhone 16 or later.",
        category: "Tech",
        publisher: "MacRumors",
        sourceUrl: "https://www.macrumors.com/2026/06/08/apple-releases-ios-27-beta-1/",
        image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&auto=format&q=80",
        date: "2026-06-09",
        readTime: 4,
      },
      {
        id: "meta-muse-spark-superintelligence-115b",
        title: "Meta Unveils Muse Spark and Commits $115 Billion to AI in 2026",
        summary:
          "Meta's newly formed Superintelligence Labs — led by Chief AI Officer Alexandr Wang — launched Muse Spark, Meta's first flagship multimodal LLM. The model competes directly with GPT-4o and Gemini Ultra on reasoning, health, and agentic benchmarks. Meta simultaneously confirmed $115–135 billion in AI capital expenditure for 2026, nearly double last year's spend and the largest single-year AI infrastructure commitment ever announced.",
        category: "AI",
        publisher: "Mean CEO Blog",
        sourceUrl: "https://blog.mean.ceo/latest-ai-announcements-news-june-2026/",
        image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&q=80",
        date: "2026-06-09",
        readTime: 4,
      },
      {
        id: "openai-ads-manager-chatgpt",
        title: "OpenAI Launches an Ads Manager Inside ChatGPT",
        summary:
          "OpenAI has introduced a self-serve Ads Manager within ChatGPT, complete with advertiser tooling and measurement controls — a significant shift for a company that built its brand on subscription revenue. The move signals OpenAI's ambition to monetise its 800 million active users through advertising, directly challenging Google and Meta's dominance in digital ads. Privacy advocates have already raised concerns.",
        category: "AI",
        publisher: "Build Fast With AI",
        sourceUrl: "https://www.buildfastwithai.com/blogs/ai-news-today-june-8-2026",
        image: "https://images.unsplash.com/photo-1676277791608-ac54525aa94d?w=800&auto=format&q=80",
        date: "2026-06-09",
        readTime: 3,
      },
      {
        id: "google-gemini-35-flash-ga",
        title: "Google Gemini 3.5 Flash Goes GA — Now the Default in Search and the Gemini App",
        summary:
          "Google's Gemini 3.5 Flash is now generally available and has replaced the previous model as the default across Google Search's AI Mode and the Gemini consumer app. Priced at $1.50 per million input tokens and $9.00 per million output tokens, Flash combines frontier reasoning with ultra-low latency — making it the fastest production-grade model Google has ever shipped.",
        category: "AI",
        publisher: "Google Blog",
        sourceUrl: "https://blog.google/innovation-and-ai/sundar-pichai-io-2026/",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&q=80",
        date: "2026-06-09",
        readTime: 3,
      },
      {
        id: "anthropic-dreaming-agents-self-improving",
        title: "Anthropic Demos 'Dreaming' Agents That Self-Improve Without Human Input",
        summary:
          "Anthropic revealed a self-improving agent system it calls 'dreaming' — where Claude-based agents run unsupervised reflection loops during idle time, refining their own workflows and correcting past errors. The system, part of Anthropic's push into long-running managed agent workflows, represents one of the most concrete public demonstrations of recursive self-improvement in a production AI system to date.",
        category: "AI",
        publisher: "WaveSpeed Blog",
        sourceUrl: "https://wavespeed.ai/blog/posts/june-2026-ai-launch-wave/",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&q=80",
        date: "2026-06-09",
        readTime: 4,
      },
      {
        id: "crypto-clarity-act-bitcoin-63k",
        title: "200+ Crypto Companies Demand Senate Vote on CLARITY Act as Bitcoin Holds at $63K",
        summary:
          "Coinbase, Ripple, and over 200 crypto firms are pressuring the US Senate to schedule an immediate floor vote on the CLARITY Act — bipartisan legislation that would establish a comprehensive federal framework for digital assets. Meanwhile Bitcoin stabilised at $63,078 after falling below $60,000 last week, with analysts watching the $66,000 level as the key reclaim for bullish momentum to return.",
        category: "Blockchain",
        publisher: "Yahoo Finance",
        sourceUrl: "https://finance.yahoo.com/personal-finance/investing/article/bitcoin-and-ethereum-prices-today-tuesday-june-9-2026-values-stabilize-as-investors-may-seek-alternatives-114631191.html",
        image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=800&auto=format&q=80",
        date: "2026-06-09",
        readTime: 3,
      },
    ],
  },
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
