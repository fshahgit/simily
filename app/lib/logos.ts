// Logo sources:
// - Simple Icons CDN: https://cdn.simpleicons.org/{slug} (dev/tech tools — very reliable)
// - Google Favicon service: https://www.google.com/s2/favicons?domain={domain}&sz=64 (companies — reliable)

function gf(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

function si(slug: string) {
  return `https://cdn.simpleicons.org/${slug}`;
}

const logoMap: Record<string, string> = {
  // ── Apple ──────────────────────────────────────────────
  "iphone 16":           gf("apple.com"),
  "iphone":              gf("apple.com"),
  "mac":                 gf("apple.com"),
  "macos":               gf("apple.com"),
  "airpods pro":         gf("apple.com"),
  "ipad":                gf("apple.com"),
  "apple music":         gf("apple.com"),

  // ── Samsung ────────────────────────────────────────────
  "samsung galaxy s25":  gf("samsung.com"),
  "samsung galaxy tab":  gf("samsung.com"),
  "samsung":             gf("samsung.com"),

  // ── Microsoft ──────────────────────────────────────────
  "windows":             gf("microsoft.com"),
  "microsoft teams":     gf("microsoft.com"),
  "outlook":             gf("outlook.com"),
  "xbox series x":       gf("xbox.com"),

  // ── Google ─────────────────────────────────────────────
  "android":             gf("android.com"),
  "google meet":         gf("meet.google.com"),
  "google cloud":        gf("cloud.google.com"),
  "google pixel":        gf("store.google.com"),
  "gemini":              gf("gemini.google.com"),
  "chrome":              si("googlechrome"),
  "youtube":             si("youtube"),

  // ── Streaming & entertainment ──────────────────────────
  "netflix":             gf("netflix.com"),
  "disney+":             gf("disneyplus.com"),
  "spotify":             gf("spotify.com"),
  "tiktok":              si("tiktok"),

  // ── AI tools ───────────────────────────────────────────
  "chatgpt":             gf("openai.com"),
  "claude":              gf("anthropic.com"),
  "perplexity":          gf("perplexity.ai"),
  "midjourney":          gf("midjourney.com"),
  "dall-e":              gf("openai.com"),
  "github copilot":      gf("github.com"),
  "cursor":              gf("cursor.com"),
  "windsurf":            gf("windsurf.com"),
  "deepseek":            gf("deepseek.com"),
  "grok":                gf("x.ai"),
  "qwen":                gf("qwen.ai"),
  "mistral":             gf("mistral.ai"),
  "meta ai":             gf("meta.ai"),
  "sarvam ai":           gf("sarvam.ai"),

  // ── Productivity & office ──────────────────────────────
  "notion":              gf("notion.so"),
  "obsidian":            gf("obsidian.md"),
  "figma":               gf("figma.com"),
  "adobe xd":            gf("adobe.com"),
  "canva":               gf("canva.com"),
  "slack":               gf("slack.com"),
  "zoom":                gf("zoom.us"),
  "wordpress":           gf("wordpress.com"),
  "webflow":             gf("webflow.com"),
  "shopify":             gf("shopify.com"),
  "woocommerce":         gf("woocommerce.com"),
  "linkedin":            gf("linkedin.com"),
  "indeed":              gf("indeed.com"),
  "gmail":               gf("gmail.com"),

  // ── India apps & services ─────────────────────────────
  "swiggy":              gf("swiggy.com"),
  "zomato":              gf("zomato.com"),
  "blinkit":             gf("blinkit.com"),
  "zepto":               gf("zeptonow.com"),
  "swiggy instamart":    gf("swiggy.com"),
  "instamart":           gf("swiggy.com"),
  "bigbasket":           gf("bigbasket.com"),
  "phonepe":             gf("phonepe.com"),
  "google pay":          gf("pay.google.com"),
  "paytm":               gf("paytm.com"),
  "cred":                gf("cred.club"),
  "bhim":                gf("bhimupi.org.in"),
  "amazon pay":          gf("pay.amazon.com"),
  "flipkart":            gf("flipkart.com"),
  "amazon india":        gf("amazon.in"),
  "meesho":              gf("meesho.com"),
  "myntra":              gf("myntra.com"),
  "ajio":                gf("ajio.com"),
  "nykaa":               gf("nykaa.com"),
  "tata cliq":           gf("tatacliq.com"),
  "jio":                 gf("jio.com"),
  "airtel":              gf("airtel.in"),
  "vi":                  gf("myvi.in"),
  "jiofiber":            gf("jio.com"),
  "airtel xstream fiber": gf("airtel.in"),
  "act fibernet":        gf("actcorp.in"),
  "disney+ hotstar":     gf("hotstar.com"),
  "sony liv":            gf("sonyliv.com"),
  "zee5":                gf("zee5.com"),
  "jiocinema":           gf("jiocinema.com"),
  "mx player":           gf("mxplayer.in"),
  "byju's":              gf("byjus.com"),
  "unacademy":           gf("unacademy.com"),
  "vedantu":             gf("vedantu.com"),
  "upgrad":              gf("upgrad.com"),
  "naukri":              gf("naukri.com"),
  "internshala":         gf("internshala.com"),
  "apna":                gf("apna.co"),
  "foundit":             gf("foundit.in"),
  "makemytrip":          gf("makemytrip.com"),
  "goibibo":             gf("goibibo.com"),
  "irctc":               gf("irctc.co.in"),
  "ola":                 gf("olacabs.com"),
  "uber":                gf("uber.com"),
  "rapido":              gf("rapido.bike"),
  "groww":               gf("groww.in"),
  "zerodha":             gf("zerodha.com"),
  "upstox":              gf("upstox.com"),
  "indmoney":            gf("indmoney.com"),
  "kuvera":              gf("kuvera.in"),
  "coindcx":             gf("coindcx.com"),
  "wazirx":              gf("wazirx.com"),
  "policybazaar":        gf("policybazaar.com"),
  "ditto":               gf("joinditto.in"),
  "acko":                gf("acko.com"),
  "redmi":               gf("mi.com"),
  "realme":              gf("realme.com"),
  "poco":                gf("po.co"),
  "nothing phone":       gf("nothing.tech"),
  "iqoo":                gf("iqoo.com"),
  "vivo":                gf("vivo.com"),
  "oppo":                gf("oppo.com"),
  "motorola":            gf("motorola.com"),
  "samsung galaxy m series": gf("samsung.com"),
  "redmi note":          gf("mi.com"),

  // ── Project management ─────────────────────────────────
  "jira":                gf("atlassian.com"),
  "linear":              gf("linear.app"),
  "asana":               gf("asana.com"),
  "monday.com":          gf("monday.com"),
  "trello":              gf("trello.com"),
  "clickup":             gf("clickup.com"),

  // ── Security & privacy ─────────────────────────────────
  "1password":           gf("1password.com"),
  "bitwarden":           si("bitwarden"),
  "nordvpn":             gf("nordvpn.com"),
  "expressvpn":          gf("expressvpn.com"),

  // ── Browsers ───────────────────────────────────────────
  "firefox":             si("firefox"),
  "safari":              gf("apple.com"),
  "arc":                 gf("arc.net"),

  // ── Cloud & infra ──────────────────────────────────────
  "aws":                 gf("aws.amazon.com"),
  "azure":               gf("azure.microsoft.com"),
  "vercel":              si("vercel/white"),
  "netlify":             si("netlify"),
  "firebase":            si("firebase"),
  "supabase":            si("supabase"),

  // ── Cars ───────────────────────────────────────────────
  "tesla model 3":       gf("tesla.com"),
  "bmw 3 series":        gf("bmw.com"),

  // ── Audio ──────────────────────────────────────────────
  "sony wh-1000xm5":    gf("sony.com"),

  // ── Gaming ─────────────────────────────────────────────
  "ps5":                 gf("playstation.com"),
  "nintendo switch":     gf("nintendo.com"),
  "steam deck":          gf("steampowered.com"),

  // ── Code editors ───────────────────────────────────────
  "vs code":             si("visualstudiocode"),
  "jetbrains":           gf("jetbrains.com"),
  "vim":                 si("vim"),
  "neovim":              si("neovim"),

  // ── Dev tools & frameworks ─────────────────────────────
  "react":               si("react"),
  "vue":                 si("vuedotjs"),
  "angular":             si("angular"),
  "svelte":              si("svelte"),
  "next.js":             si("nextdotjs/white"),
  "nuxt.js":             si("nuxtdotjs"),
  "tailwind":            si("tailwindcss"),
  "bootstrap":           si("bootstrap"),
  "python":              si("python"),
  "javascript":          si("javascript"),
  "typescript":          si("typescript"),
  "go":                  si("go"),
  "rust":                si("rust/white"),
  "swift":               si("swift"),
  "kotlin":              si("kotlin"),
  "mysql":               si("mysql"),
  "postgresql":          si("postgresql"),
  "mongodb":             si("mongodb"),
  "redis":               si("redis"),
  "docker":              si("docker"),
  "kubernetes":          si("kubernetes"),
  "github":              si("github/white"),
  "gitlab":              si("gitlab"),
  "npm":                 si("npm"),
  "pnpm":                si("pnpm"),
};

export function getLogoUrl(name: string): string | null {
  return logoMap[name.toLowerCase()] ?? null;
}

// Generate a consistent color from a string
export function getInitialsColor(name: string): string {
  const colors = [
    "bg-violet-600", "bg-blue-600", "bg-emerald-600",
    "bg-orange-600", "bg-pink-600", "bg-teal-600", "bg-red-600",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}
