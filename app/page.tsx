export default function HomePage() {
  return (
    <div>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Dashboard Overview
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px"
      }}>
        
        <div style={{ padding: "16px", border: "1px solid #ddd" }}>
          <h3>Total Messages</h3>
          <p>1,240</p>
        </div>

        <div style={{ padding: "16px", border: "1px solid #ddd" }}>
          <h3>AI Replies</h3>
          <p>860</p>
        </div>

        <div style={{ padding: "16px", border: "1px solid #ddd" }}>
          <h3>Scheduled Posts</h3>
          <p>32</p>
        </div>

        <div style={{ padding: "16px", border: "1px solid #ddd" }}>
          <h3>Engagement Rate</h3>
          <p>12.4%</p>
        </div>

      </div>
    </div>
  );
}