import { NextResponse } from "next/server";
import { incrementUsage, checkLimit } from "../../../lib/usage";

export async function POST(req: Request) {
  try {
    const { userId, type } = await req.json();

    const limit = await checkLimit(userId, type);

    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Limit reached", limit },
        { status: 403 }
      );
    }

    await incrementUsage(userId, type);

    return NextResponse.json({ success: true, limit });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
