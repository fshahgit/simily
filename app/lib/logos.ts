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
  // ── Apple hardware ─────────────────────────────────────
  "iphone 16":           gf("apple.com"),
  "iphone 16 pro":       gf("apple.com"),
  "iphone 15":           gf("apple.com"),
  "iphone":              gf("apple.com"),
  "mac":                 gf("apple.com"),
  "macos":               gf("apple.com"),
  "macbook":             gf("apple.com"),
  "macbook air":         gf("apple.com"),
  "macbook pro":         gf("apple.com"),
  "macbook air m3":      gf("apple.com"),
  "macbook air m2":      gf("apple.com"),
  "macbook pro m3":      gf("apple.com"),
  "macbook pro m2":      gf("apple.com"),
  "airpods pro":         gf("apple.com"),
  "airpods":             gf("apple.com"),
  "apple watch":         gf("apple.com"),
  "apple tv+":           gf("tv.apple.com"),
  "apple mail":          gf("apple.com"),
  "apple notes":         gf("apple.com"),
  "ipad":                gf("apple.com"),
  "ipad pro":            gf("apple.com"),
  "ipad air":            gf("apple.com"),
  "apple music":         gf("apple.com"),

  // ── Samsung ────────────────────────────────────────────
  "samsung galaxy s25":  gf("samsung.com"),
  "samsung galaxy s24":  gf("samsung.com"),
  "samsung galaxy tab":  gf("samsung.com"),
  "samsung galaxy buds": gf("samsung.com"),
  "samsung":             gf("samsung.com"),

  // ── Microsoft ──────────────────────────────────────────
  "windows":             gf("microsoft.com"),
  "windows 11":          gf("microsoft.com"),
  "microsoft teams":     gf("microsoft.com"),
  "outlook":             gf("outlook.com"),
  "onenote":             gf("microsoft.com"),
  "xbox series x":       gf("xbox.com"),
  "xbox series s":       gf("xbox.com"),
  "surface pro":         gf("microsoft.com"),
  "surface laptop":      gf("microsoft.com"),

  // ── Google ─────────────────────────────────────────────
  "android":             gf("android.com"),
  "google meet":         gf("meet.google.com"),
  "google cloud":        gf("cloud.google.com"),
  "google pixel":        gf("store.google.com"),
  "google pixel 9":      gf("store.google.com"),
  "gemini":              gf("gemini.google.com"),
  "gemini 1.5 pro":      gf("gemini.google.com"),
  "chrome":              si("googlechrome"),
  "youtube":             si("youtube"),
  "youtube music":       gf("music.youtube.com"),
  "chromebook":          gf("google.com"),

  // ── Streaming ──────────────────────────────────────────
  "netflix":             gf("netflix.com"),
  "disney+":             gf("disneyplus.com"),
  "hbo max":             gf("max.com"),
  "max":                 gf("max.com"),
  "hulu":                gf("hulu.com"),
  "amazon prime video":  gf("primevideo.com"),
  "prime video":         gf("primevideo.com"),
  "peacock":             gf("peacocktv.com"),
  "paramount+":          gf("paramountplus.com"),
  "spotify":             gf("spotify.com"),
  "tidal":               gf("tidal.com"),
  "amazon music":        gf("music.amazon.com"),
  "tiktok":              si("tiktok"),

  // ── Social & video ─────────────────────────────────────
  "instagram":           gf("instagram.com"),
  "twitter":             si("x"),
  "x":                   si("x"),
  "facebook":            gf("facebook.com"),
  "reddit":              si("reddit"),
  "snapchat":            gf("snapchat.com"),
  "pinterest":           si("pinterest"),
  "discord":             gf("discord.com"),

  // ── AI tools ───────────────────────────────────────────
  "chatgpt":             gf("openai.com"),
  "gpt-4o":              gf("openai.com"),
  "gpt-4":               gf("openai.com"),
  "claude":              gf("anthropic.com"),
  "claude 3.5 sonnet":   gf("anthropic.com"),
  "claude 3 opus":       gf("anthropic.com"),
  "perplexity":          gf("perplexity.ai"),
  "midjourney":          gf("midjourney.com"),
  "dall-e":              gf("openai.com"),
  "stable diffusion":    gf("stability.ai"),
  "adobe firefly":       gf("adobe.com"),
  "ideogram":            gf("ideogram.ai"),
  "leonardo ai":         gf("leonardo.ai"),
  "github copilot":      gf("github.com"),
  "copilot":             gf("microsoft.com"),
  "cursor":              gf("cursor.com"),
  "windsurf":            gf("windsurf.com"),
  "deepseek":            gf("deepseek.com"),
  "grok":                gf("x.ai"),
  "qwen":                gf("qwen.ai"),
  "mistral":             gf("mistral.ai"),
  "llama 3":             gf("meta.com"),
  "meta ai":             gf("meta.ai"),
  "sarvam ai":           gf("sarvam.ai"),

  // ── Laptops & PC brands ────────────────────────────────
  "dell xps":            gf("dell.com"),
  "dell inspiron":       gf("dell.com"),
  "thinkpad":            gf("lenovo.com"),
  "lenovo legion":       gf("lenovo.com"),
  "asus zenbook":        gf("asus.com"),
  "asus rog":            gf("asus.com"),
  "razer blade":         gf("razer.com"),
  "msi":                 gf("msi.com"),
  "acer predator":       gf("acer.com"),
  "hp spectre":          gf("hp.com"),
  "hp pavilion":         gf("hp.com"),
  "linux":               si("linux"),
  "ubuntu":              si("ubuntu"),

  // ── Phones (other) ─────────────────────────────────────
  "oneplus 13":          gf("oneplus.com"),
  "redmi":               gf("mi.com"),
  "redmi note":          gf("mi.com"),
  "realme":              gf("realme.com"),
  "poco":                gf("po.co"),
  "nothing phone":       gf("nothing.tech"),
  "iqoo":                gf("iqoo.com"),
  "vivo":                gf("vivo.com"),
  "oppo":                gf("oppo.com"),
  "motorola":            gf("motorola.com"),
  "samsung galaxy m series": gf("samsung.com"),

  // ── Productivity & notes ───────────────────────────────
  "notion":              gf("notion.so"),
  "obsidian":            gf("obsidian.md"),
  "evernote":            gf("evernote.com"),
  "roam research":       gf("roamresearch.com"),
  "logseq":              gf("logseq.com"),
  "bear":                gf("bear.app"),

  // ── Design tools ───────────────────────────────────────
  "figma":               gf("figma.com"),
  "adobe xd":            gf("adobe.com"),
  "canva":               gf("canva.com"),
  "sketch":              gf("sketch.com"),
  "framer":              gf("framer.com"),
  "penpot":              gf("penpot.app"),
  "adobe illustrator":   gf("adobe.com"),

  // ── Communication ─────────────────────────────────────
  "slack":               gf("slack.com"),
  "zoom":                gf("zoom.us"),
  "webex":               gf("webex.com"),
  "loom":                gf("loom.com"),

  // ── Email ─────────────────────────────────────────────
  "gmail":               gf("gmail.com"),
  "superhuman":          gf("superhuman.com"),
  "hey":                 gf("hey.com"),
  "protonmail":          gf("proton.me"),
  "spark":               gf("sparkmailapp.com"),

  // ── Browsers ───────────────────────────────────────────
  "firefox":             si("firefox"),
  "safari":              gf("apple.com"),
  "arc":                 gf("arc.net"),
  "edge":                gf("microsoft.com"),
  "brave":               si("brave"),
  "opera":               gf("opera.com"),

  // ── Security & VPN ────────────────────────────────────
  "1password":           gf("1password.com"),
  "bitwarden":           si("bitwarden"),
  "lastpass":            gf("lastpass.com"),
  "dashlane":            gf("dashlane.com"),
  "nordvpn":             gf("nordvpn.com"),
  "expressvpn":          gf("expressvpn.com"),
  "mullvad":             gf("mullvad.net"),
  "protonvpn":           gf("protonvpn.com"),
  "surfshark":           gf("surfshark.com"),

  // ── Project management ─────────────────────────────────
  "jira":                gf("atlassian.com"),
  "linear":              gf("linear.app"),
  "asana":               gf("asana.com"),
  "monday.com":          gf("monday.com"),
  "trello":              gf("trello.com"),
  "clickup":             gf("clickup.com"),
  "basecamp":            gf("basecamp.com"),
  "height":              gf("height.app"),

  // ── Website builders & CMS ────────────────────────────
  "wordpress":           gf("wordpress.com"),
  "webflow":             gf("webflow.com"),
  "wix":                 gf("wix.com"),
  "squarespace":         gf("squarespace.com"),
  "ghost":               gf("ghost.org"),
  "contentful":          gf("contentful.com"),
  "sanity":              gf("sanity.io"),

  // ── E-commerce ────────────────────────────────────────
  "shopify":             gf("shopify.com"),
  "woocommerce":         gf("woocommerce.com"),
  "bigcommerce":         gf("bigcommerce.com"),
  "magento":             gf("magento.com"),
  "etsy":                gf("etsy.com"),

  // ── Finance & payments ────────────────────────────────
  "stripe":              gf("stripe.com"),
  "paypal":              gf("paypal.com"),
  "wise":                gf("wise.com"),
  "revolut":             gf("revolut.com"),
  "coinbase":            gf("coinbase.com"),
  "binance":             gf("binance.com"),
  "robinhood":           gf("robinhood.com"),
  "etoro":               gf("etoro.com"),
  "square":              gf("squareup.com"),

  // ── Jobs & career ─────────────────────────────────────
  "linkedin":            gf("linkedin.com"),
  "indeed":              gf("indeed.com"),
  "glassdoor":           gf("glassdoor.com"),
  "angellist":           gf("wellfound.com"),
  "upwork":              gf("upwork.com"),
  "fiverr":              gf("fiverr.com"),

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

  // ── LATAM apps & services ─────────────────────────────
  "rappi":               gf("rappi.com"),
  "ifood":               gf("ifood.com.br"),
  "nubank":              gf("nubank.com.br"),
  "mercado libre":       gf("mercadolibre.com"),
  "mercado pago":        gf("mercadopago.com"),
  "cabify":              gf("cabify.com"),
  "globoplay":           gf("globoplay.globo.com"),
  "picpay":              gf("picpay.com"),
  "99":                  gf("99app.com"),

  // ── Southeast Asia apps & services ────────────────────
  "grab":                gf("grab.com"),
  "gojek":               gf("gojek.com"),
  "shopee":              gf("shopee.com"),
  "lazada":              gf("lazada.com"),
  "tokopedia":           gf("tokopedia.com"),
  "gcash":               gf("gcash.com.ph"),
  "maya":                gf("maya.ph"),
  "ovo":                 gf("ovo.id"),
  "shopeepay":           gf("shopee.com"),
  "grabfood":            gf("grab.com"),
  "gofood":              gf("gojek.com"),
  "foodpanda":           gf("foodpanda.com"),
  "line":                gf("line.me"),
  "grab pay":            gf("grab.com"),

  // ── UK apps & services ────────────────────────────────
  "monzo":               gf("monzo.com"),
  "starling bank":       gf("starlingbank.com"),
  "chase uk":            gf("chase.co.uk"),
  "deliveroo":           gf("deliveroo.co.uk"),
  "just eat":            gf("just-eat.co.uk"),
  "bt":                  gf("bt.com"),
  "virgin media":        gf("virginmedia.com"),
  "sky broadband":       gf("sky.com"),
  "ee":                  gf("ee.co.uk"),
  "o2":                  gf("o2.co.uk"),
  "three":               gf("three.co.uk"),
  "vodafone":            gf("vodafone.co.uk"),

  // ── US apps & services ────────────────────────────────
  "doordash":            gf("doordash.com"),
  "grubhub":             gf("grubhub.com"),
  "instacart":           gf("instacart.com"),
  "chime":               gf("chime.com"),
  "sofi":                gf("sofi.com"),
  "webull":              gf("webull.com"),
  "fidelity":            gf("fidelity.com"),
  "charles schwab":      gf("schwab.com"),
  "t-mobile":            gf("t-mobile.com"),
  "verizon":             gf("verizon.com"),
  "at&t":                gf("att.com"),
  "mint mobile":         gf("mintmobile.com"),

  // ── Cloud & infra ──────────────────────────────────────
  "aws":                 gf("aws.amazon.com"),
  "azure":               gf("azure.microsoft.com"),
  "vercel":              si("vercel/white"),
  "netlify":             si("netlify"),
  "firebase":            si("firebase"),
  "supabase":            si("supabase"),
  "railway":             gf("railway.app"),
  "render":              gf("render.com"),
  "heroku":              gf("heroku.com"),
  "digitalocean":        si("digitalocean"),
  "cloudflare":          gf("cloudflare.com"),

  // ── Cars & EVs ────────────────────────────────────────
  "tesla model 3":       gf("tesla.com"),
  "tesla model y":       gf("tesla.com"),
  "bmw 3 series":        gf("bmw.com"),
  "toyota camry":        gf("toyota.com"),
  "honda civic":         gf("honda.com"),
  "ford mustang":        gf("ford.com"),

  // ── Audio & wearables ─────────────────────────────────
  "sony wh-1000xm5":    gf("sony.com"),
  "bose qc45":           gf("bose.com"),
  "fitbit":              gf("fitbit.com"),
  "garmin":              gf("garmin.com"),

  // ── Gaming ─────────────────────────────────────────────
  "ps5":                 gf("playstation.com"),
  "playstation 5":       gf("playstation.com"),
  "nintendo switch":     gf("nintendo.com"),
  "steam deck":          gf("steampowered.com"),
  "pc gaming":           gf("steampowered.com"),

  // ── Code editors ───────────────────────────────────────
  "vs code":             si("visualstudiocode"),
  "jetbrains":           gf("jetbrains.com"),
  "intellij":            gf("jetbrains.com"),
  "webstorm":            gf("jetbrains.com"),
  "pycharm":             gf("jetbrains.com"),
  "vim":                 si("vim"),
  "neovim":              si("neovim"),
  "emacs":               si("gnuemacs"),
  "sublime text":        gf("sublimetext.com"),
  "zed":                 gf("zed.dev"),

  // ── Frontend frameworks ────────────────────────────────
  "react":               si("react"),
  "vue":                 si("vuedotjs"),
  "angular":             si("angular"),
  "svelte":              si("svelte"),
  "solid":               si("solid"),
  "next.js":             si("nextdotjs/white"),
  "nuxt.js":             si("nuxtdotjs"),
  "remix":               si("remix/white"),
  "astro":               si("astro/white"),
  "sveltekit":           si("svelte"),
  "react native":        si("react"),
  "flutter":             si("flutter"),

  // ── CSS frameworks ────────────────────────────────────
  "tailwind":            si("tailwindcss"),
  "bootstrap":           si("bootstrap"),
  "sass":                si("sass"),
  "material ui":         si("mui"),
  "chakra ui":           gf("chakra-ui.com"),
  "shadcn/ui":           gf("ui.shadcn.com"),

  // ── Programming languages ─────────────────────────────
  "python":              si("python"),
  "javascript":          si("javascript"),
  "typescript":          si("typescript"),
  "go":                  si("go"),
  "rust":                si("rust/white"),
  "java":                si("coffeescript"),
  "c++":                 si("cplusplus"),
  "c#":                  si("csharp"),
  "ruby":                si("ruby"),
  "php":                 si("php"),
  "swift":               si("swift"),
  "kotlin":              si("kotlin"),
  "dart":                si("dart"),
  "scala":               si("scala"),

  // ── Databases ─────────────────────────────────────────
  "mysql":               si("mysql"),
  "postgresql":          si("postgresql"),
  "mongodb":             si("mongodb"),
  "sqlite":              si("sqlite"),
  "redis":               si("redis"),
  "dynamodb":            gf("aws.amazon.com"),
  "planetscale":         gf("planetscale.com"),
  "neon":                gf("neon.tech"),
  "turso":               gf("turso.tech"),

  // ── DevOps & CI/CD ────────────────────────────────────
  "docker":              si("docker"),
  "kubernetes":          si("kubernetes"),
  "github":              si("github/white"),
  "gitlab":              si("gitlab"),
  "bitbucket":           si("bitbucket"),
  "github actions":      si("githubactions"),
  "jenkins":             si("jenkins"),
  "circleci":            si("circleci"),
  "terraform":           si("terraform"),
  "ansible":             si("ansible"),

  // ── Package managers & build tools ───────────────────
  "npm":                 si("npm"),
  "pnpm":                si("pnpm"),
  "yarn":                si("yarn"),
  "bun":                 gf("bun.sh"),
  "vite":                si("vite"),
  "webpack":             si("webpack"),

  // ── State management & misc libs ─────────────────────
  "redux":               si("redux"),
  "zustand":             gf("zustand-demo.pmnd.rs"),
  "prisma":              gf("prisma.io"),
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
