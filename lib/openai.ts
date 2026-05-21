import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ""
});

// Core helper: generate social media reply
export async function generateAIReply(message: string, tone: string) {
  const prompt = `
You are a professional social media assistant.
Rewrite the message in a ${tone} tone.
Keep it concise, natural, and helpful.

Message:
${message}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful AI assistant for business communication." },
      { role: "user", content: prompt }
    ]
  });

  return completion.choices[0]?.message?.content || "";
}