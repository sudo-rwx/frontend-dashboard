import { NextResponse } from "next/server";
import { getConversations, saveConversation } from "@/lib/conversation-store";

export async function GET() {
  const conversations = await getConversations();

  return NextResponse.json({
    success: true,
    conversations
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  await saveConversation(body.role, body.message);

  return NextResponse.json({
    success: true
  });
}
