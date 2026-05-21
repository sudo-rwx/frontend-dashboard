import { NextResponse } from "next/server";
import { runSingularitySimulation } from "../../../../lib/singularity_engine";

export async function POST(req: Request) {
  try {
    const { tenantId } = await req.json();

    if (!tenantId) {
      return NextResponse.json({ error: "tenantId required" }, { status: 400 });
    }

    const vision = await runSingularitySimulation(tenantId);

    return NextResponse.json({
      success: true,
      vision
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
