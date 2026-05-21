import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Helper: get current user session
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// Helper: get current user
export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}