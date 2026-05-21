"use client";

import { useEffect, useState } from "react";
import { getInvestorSnapshot } from "../../../lib/fundraising";

export default function InvestorDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const snapshot = await getInvestorSnapshot("tenant-demo");
      setData(snapshot);
    }

    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Investor Dashboard</h1>

      <div style={{ marginTop: "20px" }}>
        <p>MRR: ${data?.mrr || 0}</p>
        <p>ARR: ${data?.arr || 0}</p>
        <p>Growth Rate: {data?.growthRate || 0}</p>
        <p>Churn Rate: {data?.churnRate || 0}</p>
        <p>LTV: ${data?.ltv || 0}</p>
        <p>CAC: ${data?.cac || 0}</p>
        <p>Valuation: ${data?.valuation || 0}</p>
      </div>
    </div>
  );
}
