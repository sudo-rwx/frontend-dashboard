// AI Brain Core (Production-ready abstraction layer)
// This module centralizes all LLM interactions for messaging + automation

export type AIMessageInput = {
  tenantId: string;
  userMessage: string;
  platform?: string;
  tone?: string;
};

export type AIMessageOutput = {
  reply: string;
  sentiment: "positive" | "neutral" | "negative";
  confidence: number;
};

// 🧠 Brand-aware prompt builder
function buildPrompt(input: AIMessageInput) {
  return `
You are a professional social media assistant for a business.

Rules:
- Be polite, short, and helpful
- Match brand tone: ${input.tone || "friendly"}
- Platform: ${input.platform || "general"}

User message:
"${input.userMessage}"

Return format:
- reply
- sentiment (positive/neutral/negative)
- confidence (0 to 1)
`;
}

// 🤖 AI Brain (OpenAI-ready layer)
export async function runAIBrain(input: AIMessageInput): Promise<AIMessageOutput> {
  const prompt = buildPrompt(input);

  // ⚠️ In production: replace with real OpenAI API call
  // Example integration pattern shown below

  /*
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  const text = data.choices[0].message.content;
  */

  // 🧠 Fallback mock intelligence (safe default)
  const lower = input.userMessage.toLowerCase();

  let sentiment: "positive" | "neutral" | "negative" = "neutral";
  let reply = "Thank you for your message!";

  if (lower.includes("bad") || lower.includes("angry")) {
    sentiment = "negative";
    reply = "We’re really sorry about this. Our team will help you ASAP.";
  } else if (lower.includes("help") || lower.includes("support")) {
    sentiment = "neutral";
    reply = "Sure! We are here to help you. Please share more details.";
  } else if (lower.includes("thanks")) {
    sentiment = "positive";
    reply = "You're welcome! Glad we could help 😊";
  }

  return {
    reply,
    sentiment,
    confidence: 0.72
  };
}
