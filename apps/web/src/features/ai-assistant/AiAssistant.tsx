"use client";

import React from "react";
import { toast } from "@/components/ui";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { useAiAssistant } from "./hooks/useAiAssistant";
import { AssistantHeader } from "./components/AssistantHeader";
import { AssistantPipelineNav } from "./components/AssistantPipelineNav";
import { SceneViewport } from "./components/SceneViewport";
import { AssistantChatSidebar } from "./components/AssistantChatSidebar";

interface AiAssistantProps {
  projectName?: string;
  sceneName?: string;
}

export function AiAssistant({
  projectName = "Aurora X1 Launch",
  sceneName = "Scene 03 · Product Reveal",
}: AiAssistantProps): React.ReactElement {
  const {
    context,
    messages,
    inputText,
    setInputText,
    quickRequests,
    appliedStatus,
    handleSend,
    handleApplySuggestion,
  } = useAiAssistant(projectName, sceneName);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F17] text-slate-100 antialiased select-none">
      {/* Far-left Icon Navigation Rail */}
      <DashboardSidebar />

      {/* Main Studio View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <AssistantHeader
          projectName={projectName}
          sceneName={sceneName}
          onSaveVersion={() => toast.success("Đã lưu phiên bản thành công!")}
        />

        {/* Pipeline Journey Breadcrumbs */}
        <AssistantPipelineNav />

        {/* Studio Viewport + AI Assistant Chat Split */}
        <main className="flex-1 flex min-h-0 overflow-hidden">
          <SceneViewport />

          <AssistantChatSidebar
            context={context}
            messages={messages}
            inputText={inputText}
            onInputChange={setInputText}
            onSend={handleSend}
            quickRequests={quickRequests}
            appliedStatus={appliedStatus}
            onApplySuggestion={handleApplySuggestion}
          />
        </main>
      </div>
    </div>
  );
}

