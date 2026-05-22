// Affiliate link system
const AMAZON_TAG = "simily26-20";

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

// Map: product name (lowercase) → affiliate links
const affiliateMap: Record<string, AffiliateLink[]> = {
  // ── Apple ──────────────────────────────────────────────────────────────────
  "iphone 16":        [amz("iPhone 16")],
  "iphone":           [amz("iPhone")],
  "ipad":             [amz("iPad")],
  "mac":              [amz("Apple Mac")],
  "airpods pro":      [amz("AirPods Pro")],
  "macbook air":      [amz("MacBook Air")],
  "macbook pro":      [amz("MacBook Pro")],

  // ── Samsung ────────────────────────────────────────────────────────────────
  "samsung galaxy s25":  [amz("Samsung Galaxy S25")],
  "samsung galaxy s24":  [amz("Samsung Galaxy S24")],
  "samsung galaxy tab":  [amz("Samsung Galaxy Tab")],

  // ── Phones ─────────────────────────────────────────────────────────────────
  "oneplus 13":          [amz("OnePlus 13")],
  "oneplus nord ce 4":   [amz("OnePlus Nord CE 4")],
  "nothing phone 3a":    [amz("Nothing Phone 3a")],
  "redmi note 14":       [amz("Redmi Note 14")],
  "google pixel 9":      [amz("Google Pixel 9")],
  "google pixel 9a":     [amz("Google Pixel 9a")],

  // ── Laptops ────────────────────────────────────────────────────────────────
  "dell xps":            [amz("Dell XPS Laptop")],
  "hp spectre":          [amz("HP Spectre Laptop")],
  "lenovo thinkpad":     [amz("Lenovo ThinkPad")],
  "asus zenbook":        [amz("ASUS ZenBook")],
  "razer blade":         [amz("Razer Blade Laptop")],

  // ── Audio ──────────────────────────────────────────────────────────────────
  "sony wh-1000xm5":     [amz("Sony WH-1000XM5")],

  // ── Gaming ─────────────────────────────────────────────────────────────────
  "ps5":                 [amz("PlayStation 5")],
  "xbox series x":       [amz("Xbox Series X")],
  "nintendo switch":     [amz("Nintendo Switch")],
  "steam deck":          [amz("Steam Deck")],

  // ── Cars ───────────────────────────────────────────────────────────────────
  "tesla model 3":    [site("Explore Tesla Model 3", "https://www.tesla.com/model3")],
  "bmw 3 series":     [site("Explore BMW 3 Series", "https://www.bmw.com/en/series/3-series.html")],

  // ── VPN ────────────────────────────────────────────────────────────────────
  "nordvpn":          [deal("Get NordVPN Deal", "https://nordvpn.com")],
  "expressvpn":       [deal("Get ExpressVPN Deal", "https://www.expressvpn.com")],

  // ── Password managers ──────────────────────────────────────────────────────
  "1password":        [trial("Try 1Password Free", "https://1password.com")],
  "bitwarden":        [trial("Try Bitwarden Free", "https://bitwarden.com")],

  // ── Productivity ───────────────────────────────────────────────────────────
  "notion":           [trial("Try Notion Free", "https://notion.so")],
  "obsidian":         [trial("Try Obsidian Free", "https://obsidian.md")],
  "figma":            [trial("Try Figma Free", "https://figma.com")],
  "canva":            [trial("Try Canva Free", "https://canva.com")],

  // ── Project management ─────────────────────────────────────────────────────
  "asana":            [trial("Try Asana Free", "https://asana.com")],
  "monday.com":       [trial("Try Monday Free", "https://monday.com")],
  "clickup":          [trial("Try ClickUp Free", "https://clickup.com")],
  "linear":           [trial("Try Linear Free", "https://linear.app")],

  // ── E-commerce ─────────────────────────────────────────────────────────────
  "shopify":          [trial("Start Shopify Trial", "https://shopify.com")],
  "woocommerce":      [trial("Get WooCommerce Free", "https://woocommerce.com")],

  // ── Communication ──────────────────────────────────────────────────────────
  "slack":            [trial("Try Slack Free", "https://slack.com")],
  "zoom":             [trial("Try Zoom Free", "https://zoom.us")],

  // ── Website builders ───────────────────────────────────────────────────────
  "webflow":          [trial("Try Webflow Free", "https://webflow.com")],
  "wordpress":        [trial("Get WordPress Free", "https://wordpress.com")],

  // ── Cloud ──────────────────────────────────────────────────────────────────
  "aws":              [trial("Start AWS Free Tier", "https://aws.amazon.com/free")],
  "google cloud":     [trial("Try Google Cloud Free", "https://cloud.google.com/free")],
  "vercel":           [trial("Deploy on Vercel Free", "https://vercel.com")],
  "netlify":          [trial("Deploy on Netlify Free", "https://netlify.com")],
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
  "midjourney":       [trial("Try Midjourney", "https://midjourney.com")],

  // ── Dev tools ──────────────────────────────────────────────────────────────
  "github":           [trial("Try GitHub Free", "https://github.com")],
  "gitlab":           [trial("Try GitLab Free", "https://gitlab.com")],
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
