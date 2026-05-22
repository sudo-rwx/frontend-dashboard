type MemoryMessage = {
  role: 'user' | 'assistant';
  message: string;
};

const memoryStore = new Map<string, MemoryMessage[]>();

export function getMemory(tenantId: string, userId: string) {
  return memoryStore.get(`${tenantId}:${userId}`) || [];
}

export function saveMemory(
  tenantId: string,
  userId: string,
  memory: MemoryMessage
) {
  const key = `${tenantId}:${userId}`;

  const existing = memoryStore.get(key) || [];

  existing.push(memory);

  memoryStore.set(key, existing);
}

export async function buildMemoryContext(messages: string[]) {
  return messages.join('\n');
}
