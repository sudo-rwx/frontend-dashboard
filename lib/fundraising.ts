import { supabase } from "./supabase";

export type FundraisingMetrics = {
  mrr: number;
  arr: number;
  growthRate: number;
  churnRate: number;
  ltv: number;
  cac: number;
};

// Calculate MRR from subscriptions
export async function calculateMRR(tenantId: string) {
  const { data } = await supabase
    .from("subscriptions")
    .select("amount, status");

  const active = (data || []).filter(s => s.status === "active");

  const mrr = active.reduce((sum, s) => sum + (s.amount || 0), 0);

  return mrr;
}

// Estimate ARR
export async function calculateARR(mrr: number) {
  return mrr * 12;
}

// Simple SaaS valuation model
export function estimateValuation(mrr: number, growthRate: number) {
  const multiple = growthRate > 0.2 ? 10 : 6;
  return mrr * 12 * multiple;
}

// LTV approximation
export function calculateLTV(avgRevenue: number, churnRate: number) {
  if (churnRate === 0) return avgRevenue * 12;
  return avgRevenue / churnRate;
}

// CAC placeholder (marketing cost / users)
export function calculateCAC(marketingSpend: number, users: number) {
  if (users === 0) return 0;
  return marketingSpend / users;
}

// Full investor snapshot
export async function getInvestorSnapshot(tenantId: string) {
  const mrr = await calculateMRR(tenantId);
  const arr = await calculateARR(mrr);

  const growthRate = 0.25; // placeholder from analytics
  const churnRate = 0.1; // placeholder

  const valuation = estimateValuation(mrr, growthRate);
  const ltv = calculateLTV(mrr, churnRate);
  const cac = calculateCAC(5000, 100); // placeholder

  return {
    mrr,
    arr,
    growthRate,
    churnRate,
    ltv,
    cac,
    valuation
  };
}