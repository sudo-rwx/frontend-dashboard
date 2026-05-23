import { NextResponse } from "next/server";
import { getWorkflows } from "@/lib/workflows";

export async function GET() {
  const workflows = await getWorkflows();

  return NextResponse.json({
    success: true,
    workflows
  });
}
