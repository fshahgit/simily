/**
 * Generates a topic-relevant AI image via Pollinations.ai (free, no API key)
 * and saves it into /public/article-images. Returns the site-relative path.
 *
 * Each unique prompt yields a unique image — no pool to exhaust. We derive a
 * stable seed from the prompt so re-runs reproduce the same image.
 */

import https from "https";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
export const IMAGE_DIR = path.join(ROOT, "public", "article-images");

const STYLE = "editorial tech illustration, clean modern, professional, no text, no watermark";

function seedFrom(str) {
  return parseInt(crypto.createHash("sha1").update(str).digest("hex").slice(0, 8), 16);
}

function fetchToFile(url, outPath, { timeoutMs = 120000 } = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const tmp = outPath + ".part";
      const file = fs.createWriteStream(tmp);
      res.pipe(file);
      file.on("finish", () => file.close(() => {
        // Guard against truncated/empty responses.
        const size = fs.statSync(tmp).size;
        if (size < 2000) { fs.unlinkSync(tmp); return reject(new Error(`Image too small (${size}B)`)); }
        fs.renameSync(tmp, outPath);
        resolve();
      }));
      file.on("error", reject);
    });
    req.setTimeout(timeoutMs, () => req.destroy(new Error("timeout")));
    req.on("error", reject);
  });
}

/**
 * @param {string} subject  Topic to depict, e.g. "AI web browser privacy and security".
 * @param {string} fileBase Output filename without extension, e.g. "ai-browser-war-hero".
 * @param {object} [opts]   { width, height, retries }
 * @returns {Promise<string|null>} site-relative path like "/article-images/ai-browser-war-hero.jpg", or null on failure.
 */
export async function generateImage(subject, fileBase, opts = {}) {
  const { width = 900, height = 500, retries = 2 } = opts;
  fs.mkdirSync(IMAGE_DIR, { recursive: true });

  const safeName = fileBase.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const outPath = path.join(IMAGE_DIR, `${safeName}.jpg`);
  const rel = `/article-images/${safeName}.jpg`;

  // Skip if already generated (idempotent backfill).
  if (fs.existsSync(outPath)) return rel;

  const prompt = `${subject}, ${STYLE}`;
  const seed = seedFrom(subject);
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&nologo=true&seed=${seed}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      await fetchToFile(url, outPath);
      console.log(`  🖼  ${rel}  ←  "${subject}"`);
      return rel;
    } catch (err) {
      if (attempt === retries) {
        console.warn(`  ⚠️  image gen failed for "${subject}": ${err.message}`);
        return null;
      }
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
    }
  }
  return null;
}
