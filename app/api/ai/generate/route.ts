import { NextRequest, NextResponse } from 'next/server';
import { generateGeminiReply } from '@/lib/ai/gemini_helper';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body.prompt || '';

    const reply = await generateGeminiReply(prompt);

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: 'AI generation failed' }, { status: 500 });
  }
}
