import { NextResponse } from "next/server";
import { getOptimizationAction, evaluateSystemHealth } from "../../../../lib/self_optimizer";

export async function POST(req: Request) {
  try {
    const { tenantId } = await req.json();

    if (!tenantId) {
      return NextResponse.json({ error: "tenantId required" }, { status: 400 });
    }

    const health = await evaluateSystemHealth(tenantId);
    const action = await getOptimizationAction(tenantId);

    return NextResponse.json({
      success: true,
      health,
      recommendation: action
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
