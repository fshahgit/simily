// Affiliate link system
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO EARN:
// 1. Amazon: Sign up at https://affiliate-program.amazon.com → get your tag
//    Replace AMAZON_TAG below with your real tag (e.g. "simily-20")
// 2. SaaS programs: sign up individually (links below each entry)
//    Replace placeholder URLs with your real affiliate URLs
// ─────────────────────────────────────────────────────────────────────────────

const AMAZON_TAG = "simily26-20"; // ← Replace with your Amazon Associates tag

export interface AffiliateLink {
  label: string;
  url: string;
  type: "amazon" | "trial" | "deal" | "site";
}

function amz(query: string): AffiliateLink {
  return {
    label: "View on Amazon",
    url: `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}`,
    type: "amazon",
  };
}

function trial(label: string, url: string): AffiliateLink {
  return { label, url, type: "trial" };
}

function deal(label: string, url: string): AffiliateLink {
  return { label, url, type: "deal" };
}

function site(label: string, url: string): AffiliateLink {
  return { label, url, type: "site" };
}

// Map: product name (lowercase) → array of affiliate links
const affiliateMap: Record<string, AffiliateLink[]> = {
  // ── Apple ──────────────────────────────────────────────────────────────────
  "iphone 16":        [amz("iPhone 16")],
  "iphone":           [amz("iPhone")],
  "ipad":             [amz("iPad")],
  "mac":              [amz("Apple Mac")],
  "airpods pro":      [amz("AirPods Pro")],

  // ── Samsung ────────────────────────────────────────────────────────────────
  "samsung galaxy s25":  [amz("Samsung Galaxy S25")],
  "samsung galaxy tab":  [amz("Samsung Galaxy Tab")],

  // ── Audio ──────────────────────────────────────────────────────────────────
  "sony wh-1000xm5":  [amz("Sony WH-1000XM5")],

  // ── Gaming ─────────────────────────────────────────────────────────────────
  "ps5":              [amz("PlayStation 5")],
  "xbox series x":    [amz("Xbox Series X")],
  "nintendo switch":  [amz("Nintendo Switch")],
  "steam deck":       [amz("Steam Deck")],

  // ── Cars ───────────────────────────────────────────────────────────────────
  "tesla model 3":    [site("Explore Tesla Model 3", "https://www.tesla.com/model3")],
  "bmw 3 series":     [site("Explore BMW 3 Series", "https://www.bmw.com/en/series/3-series.html")],

  // ── VPN (great commissions ~40%) ──────────────────────────────────────────
  // Sign up: https://affiliate.nordvpn.com
  "nordvpn":          [deal("Get NordVPN Deal", "https://nordvpn.com")],
  // Sign up: https://www.expressvpn.com/affiliates
  "expressvpn":       [deal("Get ExpressVPN Deal", "https://www.expressvpn.com")],

  // ── Password managers ──────────────────────────────────────────────────────
  // Sign up: https://1password.com/affiliates
  "1password":        [trial("Try 1Password Free", "https://1password.com")],
  "bitwarden":        [trial("Try Bitwarden Free", "https://bitwarden.com")],

  // ── Productivity ───────────────────────────────────────────────────────────
  // Sign up: https://www.notion.so/affiliates
  "notion":           [trial("Try Notion Free", "https://notion.so")],
  "obsidian":         [trial("Try Obsidian Free", "https://obsidian.md")],
  // Sign up: https://www.figma.com/partners/affiliates/
  "figma":            [trial("Try Figma Free", "https://figma.com")],
  "canva":            [trial("Try Canva Free", "https://canva.com")],

  // ── Project management ─────────────────────────────────────────────────────
  // Sign up: https://asana.com/partners
  "asana":            [trial("Try Asana Free", "https://asana.com")],
  // Sign up: https://monday.com/affiliates
  "monday.com":       [trial("Try Monday Free", "https://monday.com")],
  // Sign up: https://clickup.com/affiliates
  "clickup":          [trial("Try ClickUp Free", "https://clickup.com")],
  "linear":           [trial("Try Linear Free", "https://linear.app")],

  // ── E-commerce ─────────────────────────────────────────────────────────────
  // Sign up: https://www.shopify.com/affiliates (up to $150/referral)
  "shopify":          [trial("Start Shopify Trial", "https://shopify.com")],
  "woocommerce":      [trial("Get WooCommerce Free", "https://woocommerce.com")],

  // ── Communication ──────────────────────────────────────────────────────────
  // Sign up: https://slack.com/partners
  "slack":            [trial("Try Slack Free", "https://slack.com")],
  "zoom":             [trial("Try Zoom Free", "https://zoom.us")],

  // ── CMS / Website builders ─────────────────────────────────────────────────
  // Sign up: https://webflow.com/affiliates
  "webflow":          [trial("Try Webflow Free", "https://webflow.com")],
  "wordpress":        [trial("Get WordPress Free", "https://wordpress.com")],

  // ── Cloud ──────────────────────────────────────────────────────────────────
  "aws":              [trial("Start AWS Free Tier", "https://aws.amazon.com/free")],
  "google cloud":     [trial("Try Google Cloud Free", "https://cloud.google.com/free")],
  // Sign up: https://vercel.com/affiliates
  "vercel":           [trial("Deploy on Vercel Free", "https://vercel.com")],
  "netlify":          [trial("Deploy on Netlify Free", "https://netlify.com")],
  // Sign up: https://supabase.com/affiliates
  "supabase":         [trial("Try Supabase Free", "https://supabase.com")],
  "firebase":         [trial("Try Firebase Free", "https://firebase.google.com")],

  // ── Streaming ──────────────────────────────────────────────────────────────
  "netflix":          [trial("Start Netflix Trial", "https://netflix.com")],
  "disney+":          [trial("Start Disney+ Trial", "https://disneyplus.com")],
  "spotify":          [trial("Try Spotify Premium", "https://spotify.com")],
  "apple music":      [trial("Try Apple Music Free", "https://music.apple.com")],

  // ── AI tools ───────────────────────────────────────────────────────────────
  "chatgpt":          [trial("Try ChatGPT Free", "https://chat.openai.com")],
  "claude":           [trial("Try Claude Free", "https://claude.ai")],
  "perplexity":       [trial("Try Perplexity Free", "https://perplexity.ai")],
  // Sign up: https://www.midjourney.com/affiliates (when available)
  "midjourney":       [trial("Try Midjourney", "https://midjourney.com")],

  // ── Dev tools ──────────────────────────────────────────────────────────────
  "github":           [trial("Try GitHub Free", "https://github.com")],
  "gitlab":           [trial("Try GitLab Free", "https://gitlab.com")],
  // Sign up: https://www.jetbrains.com/reseller/
  "jetbrains":        [trial("Try JetBrains IDEs", "https://jetbrains.com")],
  "cursor":           [trial("Try Cursor Free", "https://cursor.com")],

  // ── Browsers ───────────────────────────────────────────────────────────────
  "chrome":           [site("Download Chrome", "https://www.google.com/chrome")],
  "firefox":          [site("Download Firefox", "https://www.mozilla.org/firefox")],

  // ── Jobs ───────────────────────────────────────────────────────────────────
  "linkedin":         [trial("Try LinkedIn Premium", "https://linkedin.com/premium")],
  "indeed":           [site("Search Jobs on Indeed", "https://indeed.com")],
};

export function getAffiliateLinks(name: string): AffiliateLink[] {
  return affiliateMap[name.toLowerCase()] ?? [];
}
