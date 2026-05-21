import { NextResponse } from "next/server";
import { runAgent } from "../../../../lib/agents";

export async function POST(req: Request) {
  try {
    const { type, payload, tenantId } = await req.json();

    if (!type || !tenantId) {
      return NextResponse.json(
        { error: "type and tenantId required" },
        { status: 400 }
      );
    }

    const result = await runAgent({
      id: crypto.randomUUID(),
      type,
      payload,
      tenant_id: tenantId
    });

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Agent error" },
      { status: 500 }
    );
  }
}
