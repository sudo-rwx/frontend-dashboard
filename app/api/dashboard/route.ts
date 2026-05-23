import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    metrics: {
      aiReplies: 1284,
      activeLeads: 321,
      revenue: 8420,
      automationRate: 92
    },
    automations: [
      {
        name: "Instagram Auto Reply",
        status: "Running"
      },
      {
        name: "Facebook Lead Capture",
        status: "Active"
      },
      {
        name: "CRM Sync",
        status: "Processing"
      }
    ]
  });
}
