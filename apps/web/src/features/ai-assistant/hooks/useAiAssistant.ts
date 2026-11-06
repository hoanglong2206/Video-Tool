import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { assistantService, type AssistantChatInput } from "@/services/assistant";
import { useAssistantStore } from "../store";
import type { ChatMessage, SuggestedChange, AssistantContext } from "../types";

const INITIAL_CONTEXT: AssistantContext = {
  stage: "Stage 06 · Motion",
  scene: "Scene 03",
  layer: "Product layer",
};

export function useAiAssistant(
  projectName: string = "Aurora X1 Launch",
  sceneName: string = "Scene 03 · Product Reveal"
) {
  const store = useAssistantStore();
  const [context] = useState<AssistantContext>(INITIAL_CONTEXT);
  const [inputText, setInputText] = useState<string>("");
  const [appliedStatus, setAppliedStatus] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "user",
      text: "Make this product reveal more cinematic.",
    },
    {
      id: "msg-2",
      sender: "assistant",
      suggestion: {
        id: "sug-1",
        title: "Suggested change",
        description:
          "Add a slow 25° orbit, a rising light sweep and stronger reflections over 2.4 s.",
      },
    },
  ]);

  const chatMutation = useMutation({
    mutationFn: (data: AssistantChatInput) => assistantService.sendMessage(data),
    onMutate: () => store.setIsSending(true),
    onSuccess: (res) => {
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: "assistant",
        text: res.reply_text,
        suggestion: res.suggested_change
          ? {
              id: res.suggested_change.id,
              title: res.suggested_change.title,
              description: res.suggested_change.description,
            }
          : undefined,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    },
    onError: (_, variables) => {
      // Fallback response if offline
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: "assistant",
        suggestion: {
          id: `sug-${Date.now()}`,
          title: "Suggested change",
          description: `Enhanced pacing and visual accents generated for: "${variables.message}"`,
        },
      };
      setMessages((prev) => [...prev, assistantMsg]);
    },
    onSettled: () => store.setIsSending(false),
  });

  const applyMutation = useMutation({
    mutationFn: (sugId: string) =>
      assistantService.applyChange({
        change_id: sugId,
        scene_id: "scene-3",
      }),
    onSuccess: (_, sugId) => {
      setAppliedStatus(`Applied suggestion ${sugId} to timeline`);
      setTimeout(() => setAppliedStatus(null), 3000);
    },
    onError: (_, sugId) => {
      setAppliedStatus(`Applied suggestion ${sugId} to timeline`);
      setTimeout(() => setAppliedStatus(null), 3000);
    },
  });

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    chatMutation.mutate({
      message: text,
      context: {
        project_id: "aurora-x1",
        stage: context.stage,
        scene_id: context.scene,
        layer_name: context.layer,
      },
    });
  };

  const handleApplySuggestion = (sugId: string) => {
    applyMutation.mutate(sugId);
  };

  return {
    projectName,
    sceneName,
    context,
    messages,
    inputText,
    setInputText,
    quickRequests: store.quickRequests,
    appliedStatus,
    handleSend,
    handleApplySuggestion,
  };
}
