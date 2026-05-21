import React from "react";

function Sidebar() {
  return (
    <div style={{ width: "240px", padding: "20px", borderRight: "1px solid #ddd" }}>
      <h2>Dashboard</h2>
      <ul>
        <li>Inbox</li>
        <li>AI Assistant</li>
        <li>Posts</li>
        <li>Analytics</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial" }}>
        <div style={{ display: "flex", height: "100vh" }}>
          <Sidebar />
          <main style={{ flex: 1, padding: "20px" }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
