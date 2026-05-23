import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    {
      id: 1,
      user: 'John Doe',
      message: 'Hello, I want more information.',
      platform: 'Facebook'
    },
    {
      id: 2,
      user: 'Sarah',
      message: 'Can you explain pricing?',
      platform: 'Instagram'
    }
  ]);
}
