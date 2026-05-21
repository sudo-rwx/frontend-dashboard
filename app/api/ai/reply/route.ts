import { NextResponse } from "next/server";
import { generateAIReply } from "../../../../lib/openai";

export async function POST(req: Request) {
  try {
    const { message, tone } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const reply = await generateAIReply(message, tone || "friendly");

    return NextResponse.json({ reply });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "AI error" },
      { status: 500 }
    );
  }
}
