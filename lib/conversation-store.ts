type Message = {
  role: string;
  message: string;
};

const memory: Message[] = [];

export async function saveConversation(role: string, message: string) {
  memory.push({ role, message });
  return true;
}

export async function getConversations() {
  return memory;
}
