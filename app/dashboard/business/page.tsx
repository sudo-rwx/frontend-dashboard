"use client";

import { useEffect, useState } from "react";
import { getRevenue } from "../../../lib/revenue";
import { getChurnRate } from "../../../lib/churn";

export default function BusinessDashboard() {
  const [revenue, setRevenue] = useState<any>(null);
  const [churn, setChurn] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const rev = await getRevenue("tenant-demo", 30);
      const ch = await getChurnRate();

      setRevenue(rev);
      setChurn(ch);
    }

    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Business Intelligence</h1>

      <div style={{ marginTop: "20px" }}>
        <h3>Revenue (30d)</h3>
        <p>${revenue?.revenue || 0}</p>
        <p>Transactions: {revenue?.transactions || 0}</p>
        <p>Avg Order Value: {revenue?.avgOrderValue || 0}</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Churn</h3>
        <p>Churn Rate: {churn?.churnRate || 0}</p>
        <p>Inactive Users: {churn?.inactiveUsers || 0}</p>
        <p>Total Users: {churn?.totalUsers || 0}</p>
      </div>
    </div>
  );
}
