"use client";

import { useState } from "react";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  const signup = () => {
    alert(`Thanks! We will contact you: ${email}`);
  };

  return (
    <div style={{ fontFamily: "Arial" }}>
      {/* Hero */}
      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "42px" }}>
          AI Social Media Automation Platform
        </h1>
        <p style={{ fontSize: "18px", marginTop: "10px" }}>
          Manage inbox, generate AI replies, and schedule posts automatically.
        </p>

        <div style={{ marginTop: "20px" }}>
          <input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "10px", width: "250px" }}
          />
          <button onClick={signup} style={{ padding: "10px 15px", marginLeft: "10px" }}>
            Get Early Access
          </button>
        </div>
      </div>

      {/* Features */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", padding: "40px" }}>
        <div>
          <h3>🤖 AI Replies</h3>
          <p>Automatically respond to messages with GPT intelligence.</p>
        </div>
        <div>
          <h3>💬 Unified Inbox</h3>
          <p>Manage all social media messages in one place.</p>
        </div>
        <div>
          <h3>📊 Analytics</h3>
          <p>Track engagement and growth in real time.</p>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "60px" }}>
        <h2>Start Automating Your Social Media Today</h2>
        <p>Join early access and grow faster with AI.</p>
      </div>
    </div>
  );
}