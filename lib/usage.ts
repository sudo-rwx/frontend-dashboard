import { supabase } from "./supabase";

export type PlanType = "starter" | "pro" | "business";

const LIMITS: Record<PlanType, { aiRequests: number; messages: number }> = {
  starter: { aiRequests: 100, messages: 1000 },
  pro: { aiRequests: 1000, messages: 10000 },
  business: { aiRequests: 10000, messages: 100000 }
};

// Get user plan (placeholder: later from Stripe/Supabase)
export async function getUserPlan(userId: string): Promise<PlanType> {
  const { data } = await supabase
    .from("users")
    .select("plan")
    .eq("id", userId)
    .single();

  return (data?.plan as PlanType) || "starter";
}

// Check if user is within limits
export async function checkLimit(userId: string, type: "aiRequests" | "messages") {
  const plan = await getUserPlan(userId);
  const limit = LIMITS[plan][type];

  const { data } = await supabase
    .from("usage")
    .select("count")
    .eq("user_id", userId)
    .eq("type", type)
    .single();

  const used = data?.count || 0;

  return {
    allowed: used < limit,
    used,
    limit
  };
}

// Increment usage
export async function incrementUsage(userId: string, type: "aiRequests" | "messages") {
  const { data } = await supabase
    .from("usage")
    .select("count")
    .eq("user_id", userId)
    .eq("type", type)
    .single();

  if (data) {
    await supabase
      .from("usage")
      .update({ count: data.count + 1 })
      .eq("user_id", userId)
      .eq("type", type);
  } else {
    await supabase.from("usage").insert({
      user_id: userId,
      type,
      count: 1
    });
  }
}