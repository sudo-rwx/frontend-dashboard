import { supabase } from "./supabase";

// Generic fetch wrapper for Supabase tables
export async function fetchTable(table: string, query: any = {}) {
  let req = supabase.from(table).select("*");

  if (query.eq) {
    Object.keys(query.eq).forEach((key) => {
      req = req.eq(key, query.eq[key]);
    });
  }

  const { data, error } = await req;

  if (error) throw error;
  return data;
}

// Messages API
export async function getMessages(tenantId: string) {
  return fetchTable("messages", { eq: { tenant_id: tenantId } });
}

// Posts API
export async function getPosts(tenantId: string) {
  return fetchTable("posts", { eq: { tenant_id: tenantId } });
}

// AI drafts API
export async function getAIDrafts(tenantId: string) {
  return fetchTable("ai_reply_drafts", { eq: { tenant_id: tenantId } });
}

// Analytics events
export async function getAnalyticsEvents(tenantId: string) {
  return fetchTable("analytics_events", { eq: { tenant_id: tenantId } });
}