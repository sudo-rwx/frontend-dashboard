import { supabase } from "./supabase";
import { analyzePerformance } from "./self_learning";

export type SystemHealth = {
  satisfactionRate: number;
  churnRate: number;
  revenueGrowth: number;
};

export async function evaluateSystemHealth(tenantId: string): Promise<SystemHealth> {
  const learning = await analyzePerformance(tenantId);

  const { data } = await supabase
    .from("subscriptions")
    .select("amount, status");

  const active = (data || []).filter(r => r.status === "active");
  const totalRevenue = active.reduce((sum, r) => sum + (r.amount || 0), 0);

  const satisfactionRate = learning?.satisfactionRate || 0;
  const churnRate = learning?.negative ? learning.negative / (learning.total || 1) : 0;
  const revenueGrowth = totalRevenue > 1000 ? 0.2 : 0.05;

  return {
    satisfactionRate,
    churnRate,
    revenueGrowth
  };
}

export async function getOptimizationAction(tenantId: string) {
  const health = await evaluateSystemHealth(tenantId);

  if (health.satisfactionRate < 0.5) {
    return "improve_ai_responses";
  }

  if (health.churnRate > 0.2) {
    return "improve_user_retention";
  }

  if (health.revenueGrowth < 0.1) {
    return "optimize_pricing_strategy";
  }

  return "system_stable";
}