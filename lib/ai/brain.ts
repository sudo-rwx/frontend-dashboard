import { geminiModel } from './gemini';

export async function runAIBrain(input: { userMessage: string }) {
  const result = await geminiModel.generateContent(input.userMessage);

  return {
    reply: result.response.text(),
    sentiment: 'neutral',
    confidence: 0.9
  };
}

export async function generateAIReply(message: string) {
  const result = await geminiModel.generateContent(message);
  return result.response.text();
}
