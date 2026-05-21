"use client";

import { useState } from "react";

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState<string | null>(null);

  const generateReply = async (message: string, tone: string) => {
    setLoading(true);

    try {
      // placeholder for backend AI endpoint
      const res = await fetch("/api/ai/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, tone })
      });

      const data = await res.json();
      setReply(data.reply);
    } catch (e) {
      setReply("Error generating reply");
    }

    setLoading(false);
  };

  return { generateReply, reply, loading };
}