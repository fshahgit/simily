import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: Request) {
  const { a, b } = await request.json();

  if (!a || !b) {
    return Response.json({ error: "Both items are required" }, { status: 400 });
  }

  const prompt = `You are an expert analyst. Compare "${a}" vs "${b}" in a structured, unbiased, and helpful way.

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
  }
}

Include 5-7 relevant categories. Scores are out of 10. Be specific, factual, and useful. Return only valid JSON, no markdown.`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    const data = JSON.parse(text);
    return Response.json(data);
  } catch {
    return Response.json({ error: "Failed to generate comparison" }, { status: 500 });
  }
}
