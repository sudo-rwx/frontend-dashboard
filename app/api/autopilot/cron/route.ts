import { NextResponse } from "next/server";
import { runAutopilotQueue } from "../../../../lib/autopilot";

// This endpoint can be called by cron jobs (Netlify/Vercel)
export async function GET() {
  try {
    // In real production, iterate tenants
    const demoTenantId = "demo-tenant";

    const result = await runAutopilotQueue(demoTenantId);

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
