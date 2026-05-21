import { NextResponse } from "next/server";
import { runAIBrain } from "@/lib/ai/brain";
import { getBrandVoice, applyBrandVoice } from "@/lib/ai/brand_voice";
import { getMemory, saveMemory } from "@/lib/ai/memory";

// 🧠 Unified Message Format
type UnifiedMessage = {
  tenantId: string;
  platform: "facebook" | "instagram" | "email" | "unknown";
  userId: string;
  message: string;
};

// 🔁 Normalize incoming payloads
function normalize(payload: any): UnifiedMessage[] {
  // Facebook webhook format
  if (payload.entry) {
    const out: UnifiedMessage[] = [];

    for (const entry of payload.entry) {
      for (const event of entry.messaging || []) {
        if (!event.message?.text) continue;

        out.push({
          tenantId: "default",
          platform: "facebook",
          userId: event.sender?.id,
          message: event.message.text
        });
      }
    }

    return out;
  }

  // Generic fallback
  return [
    {
      tenantId: payload.tenantId || "default",
      platform: payload.platform || "unknown",
      userId: payload.userId || "anonymous",
      message: payload.message || ""
    }
  ];
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const messages = normalize(payload);

    const results = [];

    for (const msg of messages) {
      // 🧠 Load memory
      const history = getMemory(msg.tenantId, msg.userId);

      // 🎭 Load brand voice
      const brand = getBrandVoice(msg.tenantId);

      // 🤖 AI processing
      const ai = await runAIBrain({
        tenantId: msg.tenantId,
        userMessage: msg.message,
        platform: msg.platform,
        tone: brand?.tone || "friendly"
      });

      // 🎭 Apply brand rules
      const finalReply = applyBrandVoice(ai.reply, brand);

      // 💾 Save memory (user + assistant)
      saveMemory(msg.tenantId, msg.userId, {
        role: "user",
        message: msg.message
      });

      saveMemory(msg.tenantId, msg.userId, {
        role: "assistant",
        message: finalReply
      });

      results.push({
        userId: msg.userId,
        platform: msg.platform,
        reply: finalReply,
        sentiment: ai.sentiment
      });
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results
    });

  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
