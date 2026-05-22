import { generateAIReply } from "./ai/brain";
import { supabase } from "./supabase";

export type AgentTask = {
  id: string;
  type: "analyze" | "reply" | "plan";
  payload: any;
  tenant_id: string;
};

export async function runAgent(task: AgentTask) {
  switch (task.type) {
    case "analyze": {
      const result = await generateAIReply(
        `Analyze this social media data and extract insights: ${JSON.stringify(task.payload)}`
      );

      await supabase.from("agent_logs").insert({
        tenant_id: task.tenant_id,
        type: "analysis",
        input: task.payload,
        output: result
      });

      return result;
    }

    case "reply": {
      const result = await generateAIReply(
        `Generate a high-quality reply for: ${task.payload.message}`
      );

      await supabase.from("agent_logs").insert({
        tenant_id: task.tenant_id,
        type: "reply",
        input: task.payload.message,
        output: result
      });

      return result;
    }

    case "plan": {
      const result = await generateAIReply(
        `Create a 7-day social media content plan based on: ${JSON.stringify(task.payload)}`
      );

      await supabase.from("agent_logs").insert({
        tenant_id: task.tenant_id,
        type: "planning",
        input: task.payload,
        output: result
      });

      return result;
    }

    default:
      return null;
  }
}
