import { supabase } from "./supabase";

export async function getRevenue(tenantId: string, days: number = 30) {
  const { data } = await supabase
    .from("payments")
    .select("amount, created_at")
    .eq("tenant_id", tenantId);

  const now = Date.now();

  const filtered = (data || []).filter((p) => {
    const diff = (now - new Date(p.created_at).getTime()) / (1000 * 60 * 60 * 24);
    return diff <= days;
  });

  const revenue = filtered.reduce((sum, p) => sum + (p.amount || 0), 0);

  return {
    revenue,
    transactions: filtered.length,
    avgOrderValue: filtered.length ? revenue / filtered.length : 0
  };
}