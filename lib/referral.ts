import { supabase } from "./supabase";

// Generate referral code
export function generateReferralCode(userId: string) {
  return `REF-${userId.slice(0, 6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

// Track referral signup
export async function trackReferral(refCode: string, newUserId: string) {
  const { data } = await supabase
    .from("referrals")
    .select("*")
    .eq("code", refCode)
    .single();

  if (!data) return;

  await supabase.from("referrals").insert({
    referrer_id: data.user_id,
    referred_id: newUserId,
    code: refCode,
    reward: 10
  });

  // increment reward points
  await supabase
    .from("users")
    .update({ reward_points: (data.reward || 0) + 10 })
    .eq("id", data.user_id);
}