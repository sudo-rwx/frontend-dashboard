import { generateAIReply } from "./openai";
import { supabase } from "./supabase";

export type AutopilotTask = {
  id: string;
  type: "reply" | "post" | "engage";
  message?: string;
  platform?: string;
  tone?: string;
  tenant_id: string;
};

// Core engine: decides what AI should do automatically
export async function processAutopilotTask(task: AutopilotTask) {
  switch (task.type) {
    case "reply": {
      if (!task.message) return null;

      const reply = await generateAIReply(task.message, task.tone || "friendly");

      await supabase.from("ai_actions").insert({
        tenant_id: task.tenant_id,
        type: "auto_reply",
        input: task.message,
        output: reply
      });

      return reply;
    }

    case "post": {
      const postContent = await generateAIReply(
        "Create a social media post about productivity and AI automation.",
        task.tone || "professional"
      );

      await supabase.from("posts").insert({
        tenant_id: task.tenant_id,
        content: postContent
      });

      return postContent;
    }

    case "engage": {
      const response = await generateAIReply(
        "Write a short engaging comment to increase interaction.",
        "friendly"
      );

      await supabase.from("ai_actions").insert({
        tenant_id: task.tenant_id,
        type: "engagement",
        output: response
      });

      return response;
    }

    default:
      return null;
  }
}

// Queue processor (future scaling)
export async function runAutopilotQueue(tenantId: string) {
  const { data } = await supabase
    .from("autopilot_queue")
    .select("*")
    .eq("tenant_id", tenantId)
    .eq("status", "pending");

  if (!data) return;

  for (const task of data) {
    await processAutopilotTask(task);

    await supabase
      .from("autopilot_queue")
      .update({ status: "done" })
      .eq("id", task.id);
  }
}