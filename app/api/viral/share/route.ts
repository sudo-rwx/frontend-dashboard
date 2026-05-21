import { NextResponse } from "next/server";
import { trackShare } from "../../../../lib/viral";

export async function POST(req: Request) {
  try {
    const { userId, platform, contentId } = await req.json();

    if (!userId || !platform) {
      return NextResponse.json({ error: "userId and platform required" }, { status: 400 });
    }

    await trackShare({ userId, platform, contentId });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
