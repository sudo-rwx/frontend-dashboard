import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    realtime: true,
    websocket: 'connected',
    activeUsers: 18,
    liveConversations: 34
  });
}
