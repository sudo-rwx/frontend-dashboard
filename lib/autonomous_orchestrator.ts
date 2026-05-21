import { getOptimizationAction, evaluateSystemHealth } from "./self_optimizer";
import { computeViralScore } from "./viral";
import { analyzePerformance } from "./self_learning";
import { getInvestorSnapshot } from "./fundraising";

export type DecisionSnapshot = {
  tenantId: string;
  timestamp: number;
  action: string;
  confidence: number;
  signals: any;
};

// Orchestration layer: aggregates all system intelligence signals
export async function runDecisionCycle(tenantId: string): Promise<DecisionSnapshot> {
  const health = await evaluateSystemHealth(tenantId);
  const action = await getOptimizationAction(tenantId);
  const viral = await computeViralScore(tenantId);
  const learning = await analyzePerformance(tenantId);
  const investor = await getInvestorSnapshot(tenantId);

  const confidence =
    (health.satisfactionRate * 0.35) +
    (Math.min((viral.score || 0) / 100, 1) * 0.2) +
    ((learning?.satisfactionRate || 0) * 0.25) +
    ((investor.mrr > 1000 ? 0.2 : 0.1));

  return {
    tenantId,
    timestamp: Date.now(),
    action,
    confidence,
    signals: {
      health,
      viral,
      learning,
      investor
    }
  };
}

// Safety-safe recommendation layer (no direct execution)
export async function getSystemRecommendation(tenantId: string) {
  const decision = await runDecisionCycle(tenantId);

  return {
    recommendation: decision.action,
    confidence: decision.confidence,
    summary: "system_analyzed_all_signals"
  };
}
