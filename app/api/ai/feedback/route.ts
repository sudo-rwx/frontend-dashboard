import { NextResponse } from "next/server";
import { submitFeedback, logAIInteraction } from "../../../../lib/self_learning";

export async function POST(req: Request) {
  try {
    const { logId, feedback, tenantId, input, output } = await req.json();

    if (!feedback || !tenantId) {
      return NextResponse.json(
        { error: "feedback and tenantId required" },
        { status: 400 }
      );
    }

    // store feedback
    await submitFeedback(logId, feedback);

    // optionally log new interaction
    if (input && output) {
      await logAIInteraction(tenantId, input, output);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
