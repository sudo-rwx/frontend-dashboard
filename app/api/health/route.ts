import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'frontend-dashboard',
    ai: 'gemini',
    timestamp: new Date().toISOString()
  });
}
