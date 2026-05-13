import Anthropic from "@anthropic-ai/sdk";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 h"),
  prefix: "rl:compare",
});

const CACHE_TTL = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: Request) {
  // Rate limiting — 10 requests per IP per hour
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const { success, limit, remaining, reset } = await ratelimit.limit(ip);

  if (!success) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": String(remaining),
          "X-RateLimit-Reset": String(reset),
        },
      }
    );
  }

  const body = await request.json();

  // Support both { items: [] } and legacy { a, b, c }
  const items: string[] = body.items
    ? body.items
    : [body.a, body.b, body.c].filter(Boolean);

  if (items.length < 2) {
    return Response.json({ error: "At least two items are required" }, { status: 400 });
  }

  const cacheKey = `compare:v3:${items.map((i: string) => i.toLowerCase().trim()).join(":")}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return Response.json({ ...cached as object, cached: true });
    }
  } catch {
    // Cache miss or Redis error — continue
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const itemsList = items.map((i: string) => `"${i}"`).join(" vs ");
  const itemsArray = items.map((i: string) => `"${i}"`).join(", ");

  const prompt = `You are an expert analyst. Compare ${itemsList} in a structured, unbiased, helpful way.

Return a JSON object with this exact structure:
{
  "summary": "A 2-3 sentence overview of the key differences",
  "winner": "The name of the overall winner, or 'Tie' if equal",
  "winnerReason": "One sentence explaining why it wins overall",
  "categories": [
    {
      "name": "Category name (e.g. Performance, Price, Ease of Use)",
      "scores": [
        { "name": "item name", "score": 8, "note": "Short note about this item in this category" }
      ],
      "winner": "Name of winner in this category or 'Tie'"
    }
  ],
  "items": [
    {
      "name": "item name",
      "pros": ["Pro 1", "Pro 2", "Pro 3"],
      "cons": ["Con 1", "Con 2"],
      "chooseIf": "One sentence: who should choose this option"
    }
  ],
  "faqs": [
    {
      "question": "A specific question someone would search for when choosing between ${itemsArray}",
      "answer": "A helpful, direct answer in 2-3 sentences"
    }
  ]
}

Rules:
- The "scores" array in each category must include ALL ${items.length} items: ${itemsArray}
- The "items" array must include ALL ${items.length} items: ${itemsArray}
- Include 5-7 relevant categories
- Scores are out of 10
- Include exactly 5 FAQs mirroring real search queries
- Be specific, factual, and useful
- Return only valid JSON, no markdown`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    const data = JSON.parse(text);

    try {
      await redis.set(cacheKey, data, { ex: CACHE_TTL });
    } catch {
      // Cache write failed — still return result
    }

    return Response.json(data);
  } catch (err) {
    console.error("Compare API error:", err);
    return Response.json({ error: "Failed to generate comparison" }, { status: 500 });
  }
}
