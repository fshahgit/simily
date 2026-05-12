// Logo sources:
// - Simple Icons CDN: https://cdn.simpleicons.org/{slug} (dev/tech tools — very reliable)
// - Google Favicon service: https://www.google.com/s2/favicons?domain={domain}&sz=64 (companies — reliable)

function gf(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

const logoMap: Record<string, string> = {
  // Apple products
  "iphone 16":          gf("apple.com"),
  "iphone":             gf("apple.com"),
  "mac":                gf("apple.com"),
  "macos":              gf("apple.com"),
  "airpods pro":        gf("apple.com"),
  "ipad":               gf("apple.com"),
  "apple music":        gf("apple.com"),

  // Samsung
  "samsung galaxy s25": gf("samsung.com"),
  "samsung galaxy tab": gf("samsung.com"),
  "samsung":            gf("samsung.com"),

  // Microsoft
  "windows":            gf("microsoft.com"),
  "microsoft teams":    gf("microsoft.com"),

  // Google
  "android":            gf("android.com"),
  "google meet":        gf("meet.google.com"),
  "google cloud":       gf("cloud.google.com"),

  // Streaming & entertainment
  "netflix":            gf("netflix.com"),
  "disney+":            gf("disneyplus.com"),
  "spotify":            gf("spotify.com"),

  // AI tools
  "chatgpt":            gf("openai.com"),
  "claude":             gf("anthropic.com"),

  // Productivity
  "notion":             gf("notion.so"),
  "obsidian":           gf("obsidian.md"),
  "figma":              gf("figma.com"),
  "adobe xd":           gf("adobe.com"),
  "slack":              gf("slack.com"),
  "zoom":               gf("zoom.us"),
  "wordpress":          gf("wordpress.com"),
  "webflow":            gf("webflow.com"),
  "shopify":            gf("shopify.com"),
  "woocommerce":        gf("woocommerce.com"),
  "linkedin":           gf("linkedin.com"),
  "indeed":             gf("indeed.com"),

  // Cloud & infra
  "aws":                gf("aws.amazon.com"),

  // Cars
  "tesla model 3":      gf("tesla.com"),
  "bmw 3 series":       gf("bmw.com"),

  // Audio
  "sony wh-1000xm5":   gf("sony.com"),

  // Dev tools — Simple Icons CDN (these are the most reliable)
  "react":              "https://cdn.simpleicons.org/react",
  "vue":                "https://cdn.simpleicons.org/vuedotjs",
  "next.js":            "https://cdn.simpleicons.org/nextdotjs/white",
  "python":             "https://cdn.simpleicons.org/python",
  "javascript":         "https://cdn.simpleicons.org/javascript",
  "typescript":         "https://cdn.simpleicons.org/typescript",
  "mysql":              "https://cdn.simpleicons.org/mysql",
  "postgresql":         "https://cdn.simpleicons.org/postgresql",
  "docker":             "https://cdn.simpleicons.org/docker",
  "kubernetes":         "https://cdn.simpleicons.org/kubernetes",
  "github":             "https://cdn.simpleicons.org/github/white",
  "gitlab":             "https://cdn.simpleicons.org/gitlab",

  // Health & lifestyle — no logos, will fall back to initials
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
