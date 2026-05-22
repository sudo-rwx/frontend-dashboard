import { NextResponse } from 'next/server';
import { runAIBrain } from '@/lib/ai/brain';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message required' },
        { status: 400 }
      );
    }

    const ai = await runAIBrain({
      userMessage: message
    });

    return NextResponse.json({
      reply: ai.reply,
      sentiment: ai.sentiment,
      confidence: ai.confidence
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'AI error' },
      { status: 500 }
    );
  }
}
