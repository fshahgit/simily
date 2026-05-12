// Logo sources:
// - Simple Icons CDN: https://cdn.simpleicons.org/{slug} (dev/tech tools)
// - Clearbit: https://logo.clearbit.com/{domain} (companies/products)

const logoMap: Record<string, string> = {
  // Tech companies & products
  "iphone 16":        "https://logo.clearbit.com/apple.com",
  "iphone":           "https://logo.clearbit.com/apple.com",
  "mac":              "https://logo.clearbit.com/apple.com",
  "macos":            "https://logo.clearbit.com/apple.com",
  "airpods pro":      "https://logo.clearbit.com/apple.com",
  "ipad":             "https://logo.clearbit.com/apple.com",
  "apple music":      "https://logo.clearbit.com/apple.com",
  "samsung galaxy s25": "https://logo.clearbit.com/samsung.com",
  "samsung galaxy tab": "https://logo.clearbit.com/samsung.com",
  "samsung":          "https://logo.clearbit.com/samsung.com",
  "windows":          "https://logo.clearbit.com/microsoft.com",
  "microsoft teams":  "https://logo.clearbit.com/microsoft.com",
  "android":          "https://logo.clearbit.com/android.com",

  // Streaming & entertainment
  "netflix":          "https://logo.clearbit.com/netflix.com",
  "disney+":          "https://logo.clearbit.com/disneyplus.com",
  "spotify":          "https://logo.clearbit.com/spotify.com",

  // AI tools
  "chatgpt":          "https://logo.clearbit.com/openai.com",
  "claude":           "https://logo.clearbit.com/anthropic.com",

  // Productivity & tools
  "notion":           "https://logo.clearbit.com/notion.so",
  "obsidian":         "https://logo.clearbit.com/obsidian.md",
  "figma":            "https://logo.clearbit.com/figma.com",
  "adobe xd":         "https://logo.clearbit.com/adobe.com",
  "slack":            "https://logo.clearbit.com/slack.com",
  "zoom":             "https://logo.clearbit.com/zoom.us",
  "google meet":      "https://logo.clearbit.com/google.com",
  "wordpress":        "https://logo.clearbit.com/wordpress.com",
  "webflow":          "https://logo.clearbit.com/webflow.com",
  "shopify":          "https://logo.clearbit.com/shopify.com",
  "woocommerce":      "https://logo.clearbit.com/woocommerce.com",
  "linkedin":         "https://logo.clearbit.com/linkedin.com",
  "indeed":           "https://logo.clearbit.com/indeed.com",

  // Cloud & infra
  "aws":              "https://logo.clearbit.com/aws.amazon.com",
  "google cloud":     "https://logo.clearbit.com/cloud.google.com",

  // Cars
  "tesla model 3":    "https://logo.clearbit.com/tesla.com",
  "bmw 3 series":     "https://logo.clearbit.com/bmw.com",

  // Audio
  "sony wh-1000xm5":  "https://logo.clearbit.com/sony.com",

  // Dev tools — Simple Icons CDN
  "react":            "https://cdn.simpleicons.org/react",
  "vue":              "https://cdn.simpleicons.org/vuedotjs",
  "next.js":          "https://cdn.simpleicons.org/nextdotjs",
  "python":           "https://cdn.simpleicons.org/python",
  "javascript":       "https://cdn.simpleicons.org/javascript",
  "typescript":       "https://cdn.simpleicons.org/typescript",
  "mysql":            "https://cdn.simpleicons.org/mysql",
  "postgresql":       "https://cdn.simpleicons.org/postgresql",
  "docker":           "https://cdn.simpleicons.org/docker",
  "kubernetes":       "https://cdn.simpleicons.org/kubernetes",
  "github":           "https://cdn.simpleicons.org/github",
  "gitlab":           "https://cdn.simpleicons.org/gitlab",
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
