import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const verifyToken = process.env.FB_VERIFY_TOKEN;
  const searchParams = req.nextUrl.searchParams;

  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === verifyToken) {
    return new NextResponse(challenge);
  }

  return new NextResponse('Forbidden', { status: 403 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log('Facebook webhook event:', body);

  return NextResponse.json({ received: true });
}
