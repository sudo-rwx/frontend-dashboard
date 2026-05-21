"use client";

export default function AnalyticsPage() {
  const stats = [
    { label: "Total Engagement", value: "24,320" },
    { label: "Post Reach", value: "120,540" },
    { label: "AI Replies Generated", value: "8,430" },
    { label: "Avg Response Time", value: "1.2 min" }
  ];

  const chartData = [
    { day: "Mon", value: 40 },
    { day: "Tue", value: 80 },
    { day: "Wed", value: 65 },
    { day: "Thu", value: 90 },
    { day: "Fri", value: 70 }
  ];

  return (
    <div>
      <h1 style={{ fontSize: "22px", marginBottom: "16px" }}>
        Analytics Dashboard
      </h1>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ border: "1px solid #ddd", padding: "10px" }}>
            <h3>{s.label}</h3>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Simple Chart */}
      <div style={{ marginTop: "20px" }}>
        <h3>Weekly Engagement</h3>
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-end", height: "200px" }}>
          {chartData.map((c, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "30px",
                  height: `${c.value * 2}px`,
                  background: "#4f46e5"
                }}
              ></div>
              <p>{c.day}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
