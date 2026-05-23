import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    authenticated: true,
    user: {
      id: 'demo-user',
      email: 'demo@example.com',
      role: 'admin'
    }
  });
}
