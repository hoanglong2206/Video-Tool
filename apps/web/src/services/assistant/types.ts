export interface AssistantContext {
  project_id: string;
  stage: string;
  scene_id?: string;
  layer_name?: string;
}

export interface SuggestedChange {
  id: string;
  title: string;
  description: string;
  actions: string[];
}

export interface AssistantChatInput {
  message: string;
  context?: AssistantContext;
}

export interface AssistantChatResponse {
  reply_text: string;
  suggested_change?: SuggestedChange;
  quick_requests: string[];
}

export interface ApplyChangeInput {
  change_id: string;
  scene_id: string;
  parameters?: Record<string, unknown>;
}

