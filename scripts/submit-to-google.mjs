/**
 * Submits URLs to Google Indexing API after new content is published.
 * Uses a service account JWT — no OAuth flow needed.
 * Quota: 200 URLs/day free.
 */

import https from "https";
import crypto from "crypto";

const SA = JSON.parse(process.env.GOOGLE_INDEXING_SA_KEY || "{}");
const BASE = "https://simily.org";

// ─── JWT helper ──────────────────────────────────────────────────────────────

function base64url(buf) {
  return buf.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function makeJWT() {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })));
  const payload = base64url(Buffer.from(JSON.stringify({
    iss: SA.client_email,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: SA.token_uri,
    iat: now,
    exp: now + 3600,
  })));
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(`${header}.${payload}`);
  const sig = base64url(sign.sign(SA.private_key));
  return `${header}.${payload}.${sig}`;
}

async function getAccessToken() {
  const jwt = makeJWT();
  const body = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: "oauth2.googleapis.com",
      path: "/token",
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }, (res) => {
      let data = "";
      res.on("data", (d) => data += d);
      res.on("end", () => {
        const json = JSON.parse(data);
        if (json.access_token) resolve(json.access_token);
        else reject(new Error(`Token error: ${data}`));
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function submitURL(token, url) {
  return new Promise((resolve) => {
    const body = JSON.stringify({ url, type: "URL_UPDATED" });
    const req = https.request({
      hostname: "indexing.googleapis.com",
      path: "/v3/urlNotifications:publish",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }, (res) => {
      let data = "";
      res.on("data", (d) => data += d);
      res.on("end", () => {
        if (res.statusCode === 200) {
          console.log(`✅ Submitted: ${url}`);
        } else {
          console.warn(`⚠️  ${res.statusCode} for ${url}: ${data}`);
        }
        resolve();
      });
    });
    req.on("error", (e) => { console.warn(`⚠️  Error for ${url}: ${e.message}`); resolve(); });
    req.write(body);
    req.end();
  });
}

// ─── URLs to submit ───────────────────────────────────────────────────────────

// Accept URLs as CLI args, e.g.: node submit-to-google.mjs /articles/my-slug /news
const cliUrls = process.argv.slice(2).map((p) => `${BASE}${p.startsWith("/") ? p : "/" + p}`);

// Always resubmit key static pages
const staticUrls = [
  `${BASE}/`,
  `${BASE}/articles`,
  `${BASE}/news`,
  `${BASE}/best`,
  `${BASE}/popular`,
];

const allUrls = [...new Set([...staticUrls, ...cliUrls])];

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!SA.client_email) {
    console.error("❌ GOOGLE_INDEXING_SA_KEY not set");
    process.exit(1);
  }

  console.log(`🔑 Getting access token for ${SA.client_email}...`);
  const token = await getAccessToken();

  console.log(`\n📡 Submitting ${allUrls.length} URLs to Google Indexing API...\n`);
  for (const url of allUrls) {
    await submitURL(token, url);
    // Respect rate limit — 60 req/min max
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\n✅ Done — ${allUrls.length} URLs submitted`);
}

main();
