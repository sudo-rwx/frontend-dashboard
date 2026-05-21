"use client";

import { useEffect, useState } from "react";
import { computeViralScore, generateInviteLink } from "../../../lib/viral";

export default function ViralDashboard() {
  const [score, setScore] = useState<any>(null);
  const userId = "demo-user";

  useEffect(() => {
    async function load() {
      const data = await computeViralScore(userId);
      setScore(data);
    }

    load();
  }, []);

  const inviteLink = generateInviteLink(userId);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Viral Growth Engine</h1>

      <div style={{ marginTop: "20px" }}>
        <h3>Viral Score</h3>
        <p>{score?.score || 0}</p>

        <h3>Shares</h3>
        <p>{score?.shares || 0}</p>

        <h3>Referrals</h3>
        <p>{score?.referralCount || 0}</p>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>Invite Link</h3>
        <p>{inviteLink}</p>
      </div>
    </div>
  );
}
