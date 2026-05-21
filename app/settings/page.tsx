"use client";

import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import { useState } from "react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Settings</h1>

      <div style={{ marginTop: "20px" }}>
        <p><b>User:</b> {user?.email}</p>

        <button onClick={logout} disabled={loading}>
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}