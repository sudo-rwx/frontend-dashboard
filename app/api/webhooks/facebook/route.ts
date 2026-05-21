import { NextResponse } from "next/server";

// Facebook Webhook Verification Token (set in env in production)
const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || "dev_token";

export async function GET(req: Request) {
  // 🔐 Webhook verification (Meta requirement)
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "verification_failed" }, { status: 403 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 📩 Facebook sends events in entry format
    const entries = body.entry || [];

    for (const entry of entries) {
      const changes = entry.messaging || [];

      for (const event of changes) {
        const senderId = event.sender?.id;
        const messageText = event.message?.text;

        if (!messageText) continue;

        console.log("📩 Facebook Message Received:", {
          senderId,
          messageText
        });

        // TODO: connect to AI brain
        // Example flow:
        // const reply = await runAIBrain(...)
        // store in Supabase
        // send response back via Graph API
      }
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
