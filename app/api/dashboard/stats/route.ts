import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    conversations: 128,
    aiReplies: 942,
    scheduledPosts: 24,
    engagementRate: 82
  });
}
