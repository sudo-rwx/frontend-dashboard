import { supabase } from "./supabase";

export async function getChurnRate() {
  const { data: users } = await supabase
    .from("users")
    .select("id, last_active_at");

  const now = Date.now();
  const inactiveDays = 14;

  const inactive = (users || []).filter((u) => {
    if (!u.last_active_at) return true;
    const diff = (now - new Date(u.last_active_at).getTime()) / (1000 * 60 * 60 * 24);
    return diff > inactiveDays;
  });

  return {
    churnRate: users?.length ? inactive.length / users.length : 0,
    inactiveUsers: inactive.length,
    totalUsers: users?.length || 0
  };
}