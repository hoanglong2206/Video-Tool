import { create } from "zustand";
import type { SuggestedChange, AssistantContext } from "@/services/assistant";

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  suggestedChange?: SuggestedChange;
}

interface AssistantState {
  messages: ChatMessage[];
  context: AssistantContext;
  quickRequests: string[];
  isSending: boolean;
  addMessage: (msg: ChatMessage) => void;
  setContext: (context: Partial<AssistantContext>) => void;
  setQuickRequests: (requests: string[]) => void;
  setIsSending: (sending: boolean) => void;
  clearHistory: () => void;
}

const DEFAULT_CONTEXT: AssistantContext = {
  project_id: "aurora-x1",
  stage: "Stage 06 · Motion",
  scene_id: "Scene 03",
  layer_name: "Product layer",
};

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "assistant",
    text: "Hello! I am your AI production assistant. I can help refine camera tracks, suggest lighting passes, or shorten scenes.",
    timestamp: "10:30 AM",
  },
];

export const useAssistantStore = create<AssistantState>((set) => ({
  messages: INITIAL_MESSAGES,
  context: DEFAULT_CONTEXT,
  quickRequests: [
    "Generate 3 backgrounds",
    "Improve lighting",
    "Shorten to 3 s",
    "Add camera orbit keyframe",
  ],
  isSending: false,
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  setContext: (context) =>
    set((state) => ({ context: { ...state.context, ...context } })),
  setQuickRequests: (quickRequests) => set({ quickRequests }),
  setIsSending: (isSending) => set({ isSending }),
  clearHistory: () => set({ messages: INITIAL_MESSAGES }),
}));
