export type Workflow = {
  id: string;
  name: string;
  trigger: string;
  action: string;
  enabled: boolean;
};

const workflows: Workflow[] = [
  {
    id: '1',
    name: 'Instagram Lead Reply',
    trigger: 'new_message',
    action: 'ai_auto_reply',
    enabled: true
  },
  {
    id: '2',
    name: 'CRM Lead Capture',
    trigger: 'new_comment',
    action: 'save_to_crm',
    enabled: true
  }
];

export async function getWorkflows() {
  return workflows;
}
