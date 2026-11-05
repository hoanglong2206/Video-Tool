export interface SuggestedChange {
  id: string;
  title: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text?: string;
  suggestion?: SuggestedChange;
}

export interface AssistantContext {
  stage: string;
  scene: string;
  layer: string;
}
