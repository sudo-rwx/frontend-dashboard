import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    totalMessages: 1240,
    aiResponses: 910,
    responseRate: 87,
    activeCustomers: 221,
    revenue: 4200
  });
}
