"use client";

import { useEffect, useState } from "react";
import { fetchTable } from "../lib/api";

export function useAnalytics(tenantId: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchTable("analytics_events", {
          eq: { tenant_id: tenantId }
        });

        setData(res);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }

    load();
  }, [tenantId]);

  return { data, loading };
}