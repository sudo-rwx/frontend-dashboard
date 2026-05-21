import { supabase } from "./supabase";

export type ShareEvent = {
  userId: string;
  platform: "twitter" | "facebook" | "linkedin" | "whatsapp" | "other";
  contentId?: string;
};

// Generate invite link
export function generateInviteLink(userId: string) {
  return `https://app.example.com/signup?ref=${userId}`;
}

// Track share event
export async function trackShare(event: ShareEvent) {
  await supabase.from("viral_events").insert({
    user_id: event.userId,
    platform: event.platform,
    content_id: event.contentId || null
  });

  // reward user for sharing
  await supabase
    .from("users")
    .update({ reward_points: supabase.rpc("increment", { x: 1 }) })
    .eq("id", event.userId);
}

// Compute viral score (simple model)
export async function computeViralScore(userId: string) {
  const { data } = await supabase
    .from("viral_events")
    .select("id")
    .eq("user_id", userId);

  const shares = data?.length || 0;

  const { data: referrals } = await supabase
    .from("referrals")
    .select("id")
    .eq("referrer_id", userId);

  const referralCount = referrals?.length || 0;

  const score = shares * 2 + referralCount * 5;

  return {
    shares,
    referralCount,
    score
  };
}
