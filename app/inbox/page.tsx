"use client";

import { useEffect, useState } from "react";

export default function InboxPage() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket("wss://socialapp-step7.netlify.app/realtime/notifications");

    ws.onopen = () => {
      console.log("Connected to realtime inbox");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        setMessages((prev) => [data, ...prev]);
      } catch (err) {
        console.error("Invalid message", err);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: "22px", marginBottom: "16px" }}>Inbox</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {messages.length === 0 && (
          <p>No messages yet...</p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "6px"
            }}
          >
            <pre style={{ margin: 0, fontSize: "12px" }}>
              {JSON.stringify(msg, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
