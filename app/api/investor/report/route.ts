import { NextResponse } from "next/server";
import { getInvestorSnapshot } from "../../../../lib/fundraising";

export async function GET() {
  try {
    const data = await getInvestorSnapshot("tenant-demo");

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
