import { NextResponse } from "next/server";
import { runAutopilotQueue } from "../../../../lib/autopilot";

export async function POST(req: Request) {
  try {
    const { tenantId } = await req.json();

    if (!tenantId) {
      return NextResponse.json({ error: "tenantId required" }, { status: 400 });
    }

    const result = await runAutopilotQueue(tenantId);

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
