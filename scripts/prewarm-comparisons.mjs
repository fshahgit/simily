/**
 * Pre-warm Redis cache for specific comparison pages.
 * Run before deploying to ensure comparison data is server-rendered for SEO.
 *
 * Usage: ANTHROPIC_API_KEY=... KV_REST_API_URL=... KV_REST_API_TOKEN=... node scripts/prewarm-comparisons.mjs
 */

const COMPARISONS_TO_WARM = [
  ["DeepSeek", "Claude"],
  ["Stripe", "PayPal"],
  ["Coinbase", "Binance"],
  ["Zee5", "Sony Liv"],
  ["iPhone", "Google Pixel"],
  ["Tailwind", "Bootstrap"],
  ["Realme", "Poco"],
];

const BASE_URL = process.env.PREWARM_BASE_URL || "https://simily.org";

async function warmComparison(items) {
  const label = items.join(" vs ");
  try {
    const res = await fetch(`${BASE_URL}/api/compare`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    if (!res.ok) {
      console.error(`  ✗ ${label} — HTTP ${res.status}`);
      return false;
    }
    const data = await res.json();
    if (data.error) {
      console.error(`  ✗ ${label} — ${data.error}`);
      return false;
    }
    console.log(`  ✓ ${label} — winner: ${data.winner}`);
    return true;
  } catch (err) {
    console.error(`  ✗ ${label} — ${err.message}`);
    return false;
  }
}

console.log(`Pre-warming ${COMPARISONS_TO_WARM.length} comparisons on ${BASE_URL}...\n`);

let ok = 0;
for (const items of COMPARISONS_TO_WARM) {
  const success = await warmComparison(items);
  if (success) ok++;
  // Small delay to avoid rate-limiting ourselves
  await new Promise((r) => setTimeout(r, 1500));
}

console.log(`\nDone: ${ok}/${COMPARISONS_TO_WARM.length} cached successfully.`);
