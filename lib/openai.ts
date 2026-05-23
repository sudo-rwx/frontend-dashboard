import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash'
});

export async function generateAIReply(message: string, tone: string = 'professional') {
  const prompt = `You are a professional social media assistant. Rewrite the message in a ${tone} tone. Keep it concise, natural, and helpful.\n\nMessage:\n${message}`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}

export const openai = {
  chat: {
    completions: {
      create: async () => ({
        choices: [
          {
            message: {
              content: 'OpenAI compatibility layer migrated to Gemini.'
            }
          }
        ]
      })
    }
  }
};
