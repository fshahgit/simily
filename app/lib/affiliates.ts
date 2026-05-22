// Affiliate link system
// ─────────────────────────────────────────────────────────────────────────────
// TO ADD NEW REGIONS:
// 1. Get your Amazon India tag at: https://affiliate-program.amazon.in
//    Then set: AMAZON_TAG_IN = "your-tag-21"
// 2. Get your Amazon UK tag at: https://affiliate-program.amazon.co.uk
//    Then set: AMAZON_TAG_UK = "your-tag-21"
// ─────────────────────────────────────────────────────────────────────────────

const AMAZON_TAG_US = "simily26-20";
const AMAZON_TAG_IN = "";          // ← add your amazon.in tag when ready
const AMAZON_TAG_UK = "";          // ← add your amazon.co.uk tag when ready

// European countries → route to Amazon UK/DE
const EU_COUNTRIES = ["GB","DE","FR","IT","ES","NL","SE","NO","DK","FI","BE","AT","PL","PT","IE"];
const IN_COUNTRIES = ["IN"];

export type Region = "US" | "IN" | "UK";

export function getRegion(countryCode: string): Region {
  if (IN_COUNTRIES.includes(countryCode)) return "IN";
  if (EU_COUNTRIES.includes(countryCode)) return "UK";
  return "US";
}

export interface AffiliateLink {
  label: string;
  url: string;
  type: "amazon" | "trial" | "deal" | "site";
}

function amz(query: string, region: Region = "US"): AffiliateLink {
  // Use the right store per region, fall back to US if tag not set yet
  if (region === "IN" && AMAZON_TAG_IN) {
    return {
      label: "View on Amazon.in",
      url: `https://www.amazon.in/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG_IN}`,
      type: "amazon",
    };
  }
  if (region === "UK" && AMAZON_TAG_UK) {
    return {
      label: "View on Amazon.co.uk",
      url: `https://www.amazon.co.uk/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG_UK}`,
      type: "amazon",
    };
  }
  // Default: US store
  return {
    label: "View on Amazon",
    url: `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG_US}`,
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

// Map: product name (lowercase) → (region) => affiliate links
const affiliateMapFn: Record<string, (region: Region) => AffiliateLink[]> = {
  // ── Apple ──────────────────────────────────────────────────────────────────
  "iphone 16":        (r) => [amz("iPhone 16", r)],
  "iphone":           (r) => [amz("iPhone", r)],
  "ipad":             (r) => [amz("iPad", r)],
  "mac":              (r) => [amz("Apple Mac", r)],
  "airpods pro":      (r) => [amz("AirPods Pro", r)],
  "macbook air":      (r) => [amz("MacBook Air", r)],
  "macbook pro":      (r) => [amz("MacBook Pro", r)],

  // ── Samsung ────────────────────────────────────────────────────────────────
  "samsung galaxy s25":  (r) => [amz("Samsung Galaxy S25", r)],
  "samsung galaxy s24":  (r) => [amz("Samsung Galaxy S24", r)],
  "samsung galaxy tab":  (r) => [amz("Samsung Galaxy Tab", r)],

  // ── Phones (India) ─────────────────────────────────────────────────────────
  "oneplus 13":          (r) => [amz("OnePlus 13", r)],
  "oneplus nord ce 4":   (r) => [amz("OnePlus Nord CE 4", r)],
  "nothing phone 3a":    (r) => [amz("Nothing Phone 3a", r)],
  "redmi note 14":       (r) => [amz("Redmi Note 14", r)],
  "google pixel 9":      (r) => [amz("Google Pixel 9", r)],
  "google pixel 9a":     (r) => [amz("Google Pixel 9a", r)],

  // ── Laptops ────────────────────────────────────────────────────────────────
  "dell xps":            (r) => [amz("Dell XPS Laptop", r)],
  "hp spectre":          (r) => [amz("HP Spectre Laptop", r)],
  "lenovo thinkpad":     (r) => [amz("Lenovo ThinkPad", r)],
  "asus zenbook":        (r) => [amz("ASUS ZenBook", r)],
  "razer blade":         (r) => [amz("Razer Blade Laptop", r)],

  // ── Audio ──────────────────────────────────────────────────────────────────
  "sony wh-1000xm5":  (r) => [amz("Sony WH-1000XM5", r)],

  // ── Gaming ─────────────────────────────────────────────────────────────────
  "ps5":              (r) => [amz("PlayStation 5", r)],
  "xbox series x":    (r) => [amz("Xbox Series X", r)],
  "nintendo switch":  (r) => [amz("Nintendo Switch", r)],
  "steam deck":       (r) => [amz("Steam Deck", r)],

  // ── Cars ───────────────────────────────────────────────────────────────────
  "tesla model 3":    (_) => [site("Explore Tesla Model 3", "https://www.tesla.com/model3")],
  "bmw 3 series":     (_) => [site("Explore BMW 3 Series", "https://www.bmw.com/en/series/3-series.html")],

  // ── VPN ────────────────────────────────────────────────────────────────────
  "nordvpn":          (_) => [deal("Get NordVPN Deal", "https://nordvpn.com")],
  "expressvpn":       (_) => [deal("Get ExpressVPN Deal", "https://www.expressvpn.com")],

  // ── Password managers ──────────────────────────────────────────────────────
  "1password":        (_) => [trial("Try 1Password Free", "https://1password.com")],
  "bitwarden":        (_) => [trial("Try Bitwarden Free", "https://bitwarden.com")],

  // ── Productivity ───────────────────────────────────────────────────────────
  "notion":           (_) => [trial("Try Notion Free", "https://notion.so")],
  "obsidian":         (_) => [trial("Try Obsidian Free", "https://obsidian.md")],
  "figma":            (_) => [trial("Try Figma Free", "https://figma.com")],
  "canva":            (_) => [trial("Try Canva Free", "https://canva.com")],

  // ── Project management ─────────────────────────────────────────────────────
  "asana":            (_) => [trial("Try Asana Free", "https://asana.com")],
  "monday.com":       (_) => [trial("Try Monday Free", "https://monday.com")],
  "clickup":          (_) => [trial("Try ClickUp Free", "https://clickup.com")],
  "linear":           (_) => [trial("Try Linear Free", "https://linear.app")],

  // ── E-commerce ─────────────────────────────────────────────────────────────
  "shopify":          (_) => [trial("Start Shopify Trial", "https://shopify.com")],
  "woocommerce":      (_) => [trial("Get WooCommerce Free", "https://woocommerce.com")],

  // ── Communication ──────────────────────────────────────────────────────────
  "slack":            (_) => [trial("Try Slack Free", "https://slack.com")],
  "zoom":             (_) => [trial("Try Zoom Free", "https://zoom.us")],

  // ── Website builders ───────────────────────────────────────────────────────
  "webflow":          (_) => [trial("Try Webflow Free", "https://webflow.com")],
  "wordpress":        (_) => [trial("Get WordPress Free", "https://wordpress.com")],

  // ── Cloud ──────────────────────────────────────────────────────────────────
  "aws":              (_) => [trial("Start AWS Free Tier", "https://aws.amazon.com/free")],
  "google cloud":     (_) => [trial("Try Google Cloud Free", "https://cloud.google.com/free")],
  "vercel":           (_) => [trial("Deploy on Vercel Free", "https://vercel.com")],
  "netlify":          (_) => [trial("Deploy on Netlify Free", "https://netlify.com")],
  "supabase":         (_) => [trial("Try Supabase Free", "https://supabase.com")],
  "firebase":         (_) => [trial("Try Firebase Free", "https://firebase.google.com")],

  // ── Streaming ──────────────────────────────────────────────────────────────
  "netflix":          (_) => [trial("Start Netflix Trial", "https://netflix.com")],
  "disney+":          (_) => [trial("Start Disney+ Trial", "https://disneyplus.com")],
  "spotify":          (_) => [trial("Try Spotify Premium", "https://spotify.com")],
  "apple music":      (_) => [trial("Try Apple Music Free", "https://music.apple.com")],

  // ── AI tools ───────────────────────────────────────────────────────────────
  "chatgpt":          (_) => [trial("Try ChatGPT Free", "https://chat.openai.com")],
  "claude":           (_) => [trial("Try Claude Free", "https://claude.ai")],
  "perplexity":       (_) => [trial("Try Perplexity Free", "https://perplexity.ai")],
  "midjourney":       (_) => [trial("Try Midjourney", "https://midjourney.com")],

  // ── Dev tools ──────────────────────────────────────────────────────────────
  "github":           (_) => [trial("Try GitHub Free", "https://github.com")],
  "gitlab":           (_) => [trial("Try GitLab Free", "https://gitlab.com")],
  "jetbrains":        (_) => [trial("Try JetBrains IDEs", "https://jetbrains.com")],
  "cursor":           (_) => [trial("Try Cursor Free", "https://cursor.com")],

  // ── Browsers ───────────────────────────────────────────────────────────────
  "chrome":           (_) => [site("Download Chrome", "https://www.google.com/chrome")],
  "firefox":          (_) => [site("Download Firefox", "https://www.mozilla.org/firefox")],

  // ── Jobs ───────────────────────────────────────────────────────────────────
  "linkedin":         (_) => [trial("Try LinkedIn Premium", "https://linkedin.com/premium")],
  "indeed":           (_) => [site("Search Jobs on Indeed", "https://indeed.com")],
};

export function getAffiliateLinks(name: string, region: Region = "US"): AffiliateLink[] {
  const fn = affiliateMapFn[name.toLowerCase()];
  return fn ? fn(region) : [];
}
