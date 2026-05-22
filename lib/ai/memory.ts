export async function buildMemoryContext(messages: string[]) {
  return messages.join('\n');
}
