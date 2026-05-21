export type ActionStatus = "pending" | "approved" | "rejected";

export type ActionCheck = {
  id: string;
  action: string;
  risk: number;
  status: ActionStatus;
};

export function evaluateRisk(action: string, risk: number): ActionStatus {
  if (risk > 0.7) return "rejected";
  if (risk > 0.4) return "pending";
  return "approved";
}

export function wrapAction(check: ActionCheck) {
  return {
    ...check,
    needsReview: check.status !== "approved"
  };
}