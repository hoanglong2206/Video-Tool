import { useState } from "react";
import type { ChatMessage, SuggestedChange, AssistantContext } from "../types";

const INITIAL_CONTEXT: AssistantContext = {
  stage: "Stage 06 · Motion",
  scene: "Scene 03",
  layer: "Product layer",
};

const INITIAL_SUGGESTION: SuggestedChange = {
  id: "sug-1",
  title: "Suggested change",
  description:
    "Add a slow 25° orbit, a rising light sweep and stronger reflections over 2.4 s.",
};

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "user",
    text: "Make this product reveal more cinematic.",
  },
  {
    id: "msg-2",
    sender: "assistant",
    suggestion: INITIAL_SUGGESTION,
  },
];

export function useAiAssistant(
  projectName: string = "Aurora X1 Launch",
  sceneName: string = "Scene 03 · Product Reveal"
) {
  const [context] = useState<AssistantContext>(INITIAL_CONTEXT);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState<string>("");
  const [appliedStatus, setAppliedStatus] = useState<string | null>(null);

  const quickRequests = [
    "Generate 3 backgrounds",
    "Improve lighting",
    "Shorten to 3 s",
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: "assistant",
        suggestion: {
          id: `sug-${Date.now()}`,
          title: "Suggested change",
          description: `Enhanced pacing and visual accents generated for: "${text}"`,
        },
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 600);
  };

  const handleApplySuggestion = (sugId: string) => {
    setAppliedStatus(`Applied suggestion ${sugId} to timeline`);
    setTimeout(() => setAppliedStatus(null), 3000);
  };

  return {
    projectName,
    sceneName,
    context,
    messages,
    inputText,
    setInputText,
    quickRequests,
    appliedStatus,
    handleSend,
    handleApplySuggestion,
  };
}
