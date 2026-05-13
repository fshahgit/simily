import Anthropic from "@anthropic-ai/sdk";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const CACHE_TTL = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: Request) {
  const { a, b, c } = await request.json();

  if (!a || !b) {
    return Response.json({ error: "Both items are required" }, { status: 400 });
  }

  const isThreeWay = !!c;
  const cacheKey = `compare:v2:${a.toLowerCase().trim()}:${b.toLowerCase().trim()}${c ? `:${c.toLowerCase().trim()}` : ""}`;

  // Check cache first
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return Response.json({ ...cached as object, cached: true });
    }
  } catch {
    // Cache miss or Redis error — continue to AI generation
  }

  // Generate with AI
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const prompt = isThreeWay
    ? `You are an expert analyst. Compare "${a}" vs "${b}" vs "${c}" in a structured, unbiased, and helpful way.

Return a JSON object with this exact structure:
{
  "summary": "A 2-3 sentence overview of the key differences between all three",
  "winner": "The name of the overall winner, or 'Tie' if equal",
  "winnerReason": "One sentence explaining why it wins overall",
  "categories": [
    {
      "name": "Category name (e.g. Performance, Price, Ease of Use)",
      "aScore": 8,
      "bScore": 6,
      "cScore": 7,
      "aNote": "Short note about ${a} in this category",
      "bNote": "Short note about ${b} in this category",
      "cNote": "Short note about ${c} in this category",
      "winner": "Name of winner in this category or 'Tie'"
    }
  ],
  "aPros": ["Pro 1", "Pro 2", "Pro 3"],
  "aCons": ["Con 1", "Con 2"],
  "bPros": ["Pro 1", "Pro 2", "Pro 3"],
  "bCons": ["Con 1", "Con 2"],
  "cPros": ["Pro 1", "Pro 2", "Pro 3"],
  "cCons": ["Con 1", "Con 2"],
  "verdict": {
    "chooseA": "One sentence: who should choose ${a}",
    "chooseB": "One sentence: who should choose ${b}",
    "chooseC": "One sentence: who should choose ${c}"
  },
  "faqs": [
    {
      "question": "A specific question someone would search for when choosing between ${a}, ${b}, and ${c}",
      "answer": "A helpful, direct answer in 2-3 sentences"
    }
  ]
}

Include 5-7 relevant categories. Scores are out of 10.
Include exactly 5 FAQs covering real search queries like "Which is best overall?", "Which is cheapest?", "Which is easiest to learn?", etc.
Be specific, factual, and useful. Return only valid JSON, no markdown.`
    : `You are an expert analyst. Compare "${a}" vs "${b}" in a structured, unbiased, and helpful way.

Return a JSON object with this exact structure:
{
  "summary": "A 2-3 sentence overview of the key difference between the two",
  "winner": "The name of the overall winner, or 'Tie' if equal",
  "winnerReason": "One sentence explaining why it wins overall",
  "categories": [
    {
      "name": "Category name (e.g. Performance, Price, Ease of Use)",
      "aScore": 8,
      "bScore": 6,
      "aNote": "Short note about ${a} in this category",
      "bNote": "Short note about ${b} in this category",
      "winner": "Name of winner in this category or 'Tie'"
    }
  ],
  "aPros": ["Pro 1", "Pro 2", "Pro 3"],
  "aCons": ["Con 1", "Con 2"],
  "bPros": ["Pro 1", "Pro 2", "Pro 3"],
  "bCons": ["Con 1", "Con 2"],
  "verdict": {
    "chooseA": "One sentence: who should choose ${a}",
    "chooseB": "One sentence: who should choose ${b}"
  },
  "faqs": [
    {
      "question": "A specific question someone would search for when choosing between ${a} and ${b}",
      "answer": "A helpful, direct answer in 2-3 sentences"
    }
  ]
}

Include 5-7 relevant categories. Scores are out of 10.
Include exactly 5 FAQs. Questions should mirror real search queries like "Is ${a} better than ${b}?", "Which is cheaper?", "Can I switch from one to the other?", "Which is better for beginners?", etc.
Be specific, factual, and useful. Return only valid JSON, no markdown.`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2500,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    const data = JSON.parse(text);

    // Store in cache
    try {
      await redis.set(cacheKey, data, { ex: CACHE_TTL });
    } catch {
      // Cache write failed — still return the result
    }

    return Response.json(data);
  } catch (err) {
    console.error("Compare API error:", err);
    return Response.json({ error: "Failed to generate comparison" }, { status: 500 });
  }
}
