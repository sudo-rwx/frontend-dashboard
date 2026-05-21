import { supabase } from "./supabase";

export type FeedbackType = "positive" | "negative" | "neutral";

export type AIInteractionLog = {
  id: string;
  input: string;
  output: string;
  feedback?: FeedbackType;
  tenant_id: string;
};

// Store AI interaction for learning loop
export async function logAIInteraction(
  tenantId: string,
  input: string,
  output: string
) {
  await supabase.from("ai_learning_logs").insert({
    tenant_id: tenantId,
    input,
    output
  });
}

// Collect feedback from users
export async function submitFeedback(
  logId: string,
  feedback: FeedbackType
) {
  await supabase
    .from("ai_learning_logs")
    .update({ feedback })
    .eq("id", logId);
}

// Analyze performance patterns
export async function analyzePerformance(tenantId: string) {
  const { data } = await supabase
    .from("ai_learning_logs")
    .select("feedback, input, output")
    .eq("tenant_id", tenantId);

  if (!data) return null;

  const positive = data.filter(d => d.feedback === "positive").length;
  const negative = data.filter(d => d.feedback === "negative").length;
  const total = data.length;

  return {
    total,
    positive,
    negative,
    satisfactionRate: total ? positive / total : 0
  };
}

// Future: auto-improve prompt strategy
export async function getLearningInsights(tenantId: string) {
  const stats = await analyzePerformance(tenantId);

  if (!stats) return null;

  let recommendation = "stable";

  if (stats.satisfactionRate < 0.6) {
    recommendation = "optimize_prompts";
  } else if (stats.satisfactionRate > 0.85) {
    recommendation = "scale_behavior";
  }

  return {
    ...stats,
    recommendation
  };
}