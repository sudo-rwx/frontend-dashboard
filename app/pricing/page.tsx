"use client";

import { PLANS } from "../../lib/stripe";
import { useState } from "react";

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const subscribe = async (plan: string) => {
    setLoading(plan);

    const res = await fetch("/api/stripe/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan })
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }

    setLoading(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pricing Plans</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {Object.entries(PLANS).map(([key, plan]) => (
          <div key={key} style={{ border: "1px solid #ddd", padding: "20px" }}>
            <h2>{plan.name}</h2>
            <p>${plan.price}/mo</p>

            <button
              onClick={() => subscribe(key)}
              disabled={loading === key}
            >
              {loading === key ? "Processing..." : "Subscribe"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
