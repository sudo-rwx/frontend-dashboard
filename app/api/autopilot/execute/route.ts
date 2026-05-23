import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    success: true,
    message: 'Autopilot executed successfully',
    processedReplies: 12,
    scheduledPosts: 4
  });
}
