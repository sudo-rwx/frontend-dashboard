import { NextResponse } from "next/server";
import { runAIBrain } from "../../../../lib/ai/brain";
import { getBrandVoice, applyBrandVoice } from "../../../../lib/ai/brand_voice";
import { getMemory, saveMemory } from "../../../../lib/ai/memory";

type UnifiedMessage = {
  tenantId: string;
  platform: "facebook" | "instagram" | "email" | "unknown";
  userId: string;
  message: string;
};

function normalize(payload: any): UnifiedMessage[] {
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
      const history = getMemory(msg.tenantId, msg.userId);
      const brand = getBrandVoice(msg.tenantId);

      const ai = await runAIBrain({
        userMessage: `${history.map(h => h.message).join("\n")}\n${msg.message}`
      });

      const finalReply = applyBrandVoice(ai.reply, brand);

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
