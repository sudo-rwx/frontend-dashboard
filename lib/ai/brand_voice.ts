// Brand Voice Memory Layer
// Ensures AI responses stay consistent with each business tenant

export type BrandVoice = {
  tenantId: string;
  tone: "formal" | "friendly" | "luxury" | "casual";
  bannedWords: string[];
  preferredStyle: string;
  examples?: string[];
};

// Simple in-memory mock (replace with DB in production)
const brandVoiceStore: Record<string, BrandVoice> = {};

export function setBrandVoice(voice: BrandVoice) {
  brandVoiceStore[voice.tenantId] = voice;
}

export function getBrandVoice(tenantId: string): BrandVoice | null {
  return brandVoiceStore[tenantId] || null;
}

// 🧠 Apply brand rules to AI output
export function applyBrandVoice(reply: string, voice: BrandVoice | null): string {
  if (!voice) return reply;

  let modified = reply;

  // Remove banned words
  voice.bannedWords.forEach(word => {
    const regex = new RegExp(word, "gi");
    modified = modified.replace(regex, "");
  });

  // Simple tone adjustment (light simulation)
  if (voice.tone === "formal") {
    modified = "Dear customer, " + modified;
  }

  if (voice.tone === "friendly") {
    modified = modified + " 😊";
  }

  return modified.trim();
}
