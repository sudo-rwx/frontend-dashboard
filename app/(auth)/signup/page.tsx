"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signup = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) setError(error.message);

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Signup</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <button onClick={signup} disabled={loading}>
        {loading ? "Creating account..." : "Signup"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}