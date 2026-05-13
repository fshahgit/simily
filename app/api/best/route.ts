import Anthropic from "@anthropic-ai/sdk";
import { Redis } from "@upstash/redis";
import { getBestTopic } from "../../lib/best";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const CACHE_TTL = 60 * 60 * 24 * 14; // 14 days

export async function POST(request: Request) {
  const { slug } = await request.json();
  if (!slug) return Response.json({ error: "slug is required" }, { status: 400 });

  const topic = getBestTopic(slug);
  if (!topic) return Response.json({ error: "Topic not found" }, { status: 404 });

  const cacheKey = `best:v1:${slug}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) return Response.json({ ...cached as object, cached: true });
  } catch { /* continue */ }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const itemsList = topic.items.map((i) => `"${i}"`).join(", ");

  const prompt = `You are an expert analyst writing a "best of" guide for the topic: "${topic.title}".

Rank these options from best to worst: ${itemsList}

Return a JSON object with this exact structure:
{
  "intro": "2-3 sentence intro explaining what we're comparing and why it matters",
  "picks": [
    {
      "rank": 1,
      "name": "exact product name from the list",
      "tagline": "Best overall / Best free option / Best for power users / etc.",
      "why": "2-3 sentences explaining why it earned this rank",
      "pros": ["Pro 1", "Pro 2", "Pro 3"],
      "cons": ["Con 1", "Con 2"],
      "bestFor": "One sentence: the type of person or use case this is best for"
    }
  ],
  "verdict": "2-3 sentence final verdict — who should pick what",
  "faqs": [
    {
      "question": "A real question someone would Google when searching for ${topic.title}",
      "answer": "A helpful, direct answer in 2-3 sentences"
    }
  ]
}

Rules:
- Rank ALL ${topic.items.length} options: ${itemsList}
- Each pick.name must exactly match one of the options above
- Be opinionated but fair — people want a clear recommendation
- Taglines should be unique and specific (not all "Best overall")
- Include exactly 4 FAQs that mirror real search intent
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
    } catch { /* continue */ }

    return Response.json(data);
  } catch (err) {
    console.error("Best API error:", err);
    return Response.json({ error: "Failed to generate ranking" }, { status: 500 });
  }
}
