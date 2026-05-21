"use client";

import { useState } from "react";

export default function AIPage() {
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState("friendly");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const generateReply = async () => {
    setLoading(true);

    // simulate AI call (backend will replace later)
    setTimeout(() => {
      setReply(
        `(${tone} tone) Thank you for your message: "${message}". We will get back to you shortly.`
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <h1 style={{ fontSize: "22px", marginBottom: "16px" }}>
        AI Assistant
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <textarea
          placeholder="Enter customer message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: "10px", minHeight: "100px" }}
        />

        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="friendly">Friendly</option>
          <option value="formal">Formal</option>
          <option value="sales">Sales</option>
          <option value="support">Support</option>
        </select>

        <button onClick={generateReply} disabled={loading}>
          {loading ? "Generating..." : "Generate Reply"}
        </button>

        {reply && (
          <div style={{ border: "1px solid #ddd", padding: "10px" }}>
            <h3>Generated Reply</h3>
            <p>{reply}</p>
            <button onClick={() => alert("Sent!")}>Send Reply</button>
          </div>
        )}
      </div>
    </div>
  );
}
