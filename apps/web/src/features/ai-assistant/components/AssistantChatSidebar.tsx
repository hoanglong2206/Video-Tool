import React from "react";
import type { ChatMessage, AssistantContext } from "../types";
import { Badge, Button, Input } from "@/components/ui";

interface AssistantChatSidebarProps {
  context: AssistantContext;
  messages: ChatMessage[];
  inputText: string;
  onInputChange: (val: string) => void;
  onSend: (text: string) => void;
  quickRequests: string[];
  appliedStatus: string | null;
  onApplySuggestion: (id: string) => void;
}

export function AssistantChatSidebar({
  context,
  messages,
  inputText,
  onInputChange,
  onSend,
  quickRequests,
  appliedStatus,
  onApplySuggestion,
}: AssistantChatSidebarProps): React.ReactElement {
  return (
    <aside className="w-80 border-l border-[#1E2638] bg-[#0A0E17] p-5 flex flex-col justify-between shrink-0 select-none overflow-y-auto">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Title */}
        <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
          AI Assistant
        </h2>

        {/* Context Badges */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          <Badge variant="default">
            {context.stage}
          </Badge>
          <Badge variant="outline">
            {context.scene}
          </Badge>
          <Badge variant="outline">
            {context.layer}
          </Badge>
        </div>

        {/* Messages list */}
        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {messages.map((msg) => {
            if (msg.sender === "user") {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-[85%] rounded-xl rounded-tr-sm bg-[#151D2C] border border-[#232F46] p-3 text-xs text-slate-200">
                    {msg.text}
                  </div>
                </div>
              );
            }

            if (msg.suggestion) {
              return (
                <div
                  key={msg.id}
                  className="rounded-xl border border-[#222E45] bg-[#101624] p-3.5 space-y-2.5 shadow-md"
                >
                  <h3 className="text-xs font-semibold text-slate-200">
                    {msg.suggestion.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {msg.suggestion.description}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2.5 text-xs"
                    >
                      Preview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2.5 text-xs"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onApplySuggestion(msg.suggestion!.id)}
                      className="h-7 px-3 text-xs font-medium"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              );
            }
            return null;
          })}

          {appliedStatus && (
            <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs">
              ✓ {appliedStatus}
            </div>
          )}
        </div>

        {/* Quick requests */}
        <div className="mt-4 pt-4 border-t border-[#1C2538]/60">
          <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Quick Requests
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {quickRequests.map((req, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => onSend(req)}
                className="h-7 px-2.5 text-xs rounded-lg"
              >
                {req}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Field */}
      <div className="mt-4 pt-3 border-t border-[#1C2538]/60">
        <Input
          type="text"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend(inputText)}
          placeholder="Ask about this scene..."
          className="h-9"
        />
      </div>
    </aside>
  );
}

