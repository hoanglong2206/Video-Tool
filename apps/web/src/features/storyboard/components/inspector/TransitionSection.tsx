"use client";

import React, { useState } from "react";
import { Film, Sparkles, ChevronDown } from "lucide-react";
import { TRANSITION_PRESETS } from "../../config/cinematography";
import { PropertyExplainer } from "./PropertyExplainer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

interface TransitionSectionProps {
  currentTransition: string;
  sceneNumber: number;
  onSelectTransition: (transitionId: string) => void;
}

export function TransitionSection({
  currentTransition,
  sceneNumber,
  onSelectTransition,
}: TransitionSectionProps): React.ReactElement {
  const [transitionSearch, setTransitionSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const POPULAR_TRANSITIONS = ["Cut", "Cross Dissolve", "Whip Pan Blur", "Zoom Push", "Glitch Digital", "Light Leak"];

  const currentTransitionObj =
    TRANSITION_PRESETS.find((t) => t.id === currentTransition) || TRANSITION_PRESETS[0];

  const filteredTransitions = TRANSITION_PRESETS.filter(
    (t) =>
      t.id.toLowerCase().includes(transitionSearch.toLowerCase()) ||
      t.desc.toLowerCase().includes(transitionSearch.toLowerCase())
  );

  const aiSuggestedTransition =
    sceneNumber === 1 ? "Fade to Black" : sceneNumber % 2 === 0 ? "Whip Pan Blur" : "Cross Dissolve";

  return (
    <div>
      {/* Header with Title & AI Suggestion */}
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <Film className="w-3 h-3 text-cyan-400" /> Hiệu ứng chuyển cảnh (Transition)
        </label>
        <button
          type="button"
          onClick={() => onSelectTransition(aiSuggestedTransition)}
          className="text-[9px] text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 cursor-pointer font-mono"
          title="AI gợi ý chuyển tiếp tối ưu theo nhịp cảnh"
        >
          <Sparkles className="w-2.5 h-2.5" /> Gợi ý AI: {aiSuggestedTransition}
        </button>
      </div>

      {/* Dropdown Menu Trigger & Content via Radix Portal */}
      <DropdownMenu open={showDropdown} onOpenChange={setShowDropdown}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="w-full bg-[#070A10] border border-[#1E2638] hover:border-cyan-500 h-8 px-2.5 rounded flex items-center justify-between cursor-pointer text-slate-200 transition-colors"
          >
            <span className="font-semibold text-cyan-300 truncate">{currentTransition || "Cut"}</span>
            <span className="text-[9px] text-slate-400 font-mono flex items-center gap-0.5">
              Thay đổi <ChevronDown className="w-3 h-3 text-slate-400" />
            </span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="start"
          sideOffset={4}
          className="w-[330px] xl:w-[370px] bg-[#0A0E18] border border-[#1E2638] rounded-lg shadow-2xl p-2 z-50 flex flex-col gap-1 max-h-60 overflow-y-auto"
        >
          <input
            type="text"
            placeholder="Tìm kiếm 14 hiệu ứng chuyển cảnh..."
            value={transitionSearch}
            onChange={(e) => setTransitionSearch(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            className="bg-[#121927] border border-[#1E2638] rounded px-2 py-1 text-xs text-slate-200 mb-1 focus:outline-none focus:border-cyan-500 shrink-0"
            autoFocus
          />
          {filteredTransitions.map((t) => (
            <div
              key={t.id}
              onClick={() => {
                onSelectTransition(t.id);
                setShowDropdown(false);
                setTransitionSearch("");
              }}
              className={`p-1.5 rounded flex items-center justify-between cursor-pointer transition-colors ${
                currentTransition === t.id ? "bg-cyan-600 text-white font-bold" : "hover:bg-[#141B2B] text-slate-300"
              }`}
            >
              <span className="font-semibold text-[11px]">{t.id}</span>
              <span className="text-[9px] opacity-75 truncate max-w-[150px]">{t.desc}</span>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Quick Selection Pills */}
      <div className="flex items-center gap-1 flex-wrap mt-1.5">
        <span className="text-[9px] text-slate-500 font-mono">Phổ biến:</span>
        {POPULAR_TRANSITIONS.map((tid) => {
          const isMatch = currentTransition === tid;
          const tObj = TRANSITION_PRESETS.find((t) => t.id === tid);
          return (
            <button
              key={tid}
              type="button"
              onClick={() => !isMatch && onSelectTransition(tid)}
              className={`text-[9px] px-1.5 py-0.5 rounded font-mono transition-colors cursor-pointer border ${
                isMatch
                  ? "bg-cyan-950/90 border-cyan-500 text-cyan-300 font-bold shadow-xs"
                  : "bg-[#070A10] border-[#1E2638] text-slate-400 hover:text-slate-200"
              }`}
            >
              {tObj?.label || tid}
            </button>
          );
        })}
      </div>

      <PropertyExplainer badge={currentTransitionObj.id} badgeColor="cyan" text={currentTransitionObj.desc} />
    </div>
  );
}
