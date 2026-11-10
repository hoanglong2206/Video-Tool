"use client";

import React from "react";
import type { StoryboardScene } from "../../types";
import { Textarea } from "@/components/ui";
import { Volume2 } from "lucide-react";

interface InspectorAudioTabProps {
  scene: StoryboardScene;
  onChangeField: (field: keyof StoryboardScene, value: any) => void;
}

export function InspectorAudioTab({
  scene,
  onChangeField,
}: InspectorAudioTabProps): React.ReactElement {
  const estimatedSeconds = Math.round(((scene.voiceover || "").split(" ").filter(Boolean).length / 2.5));

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Volume2 className="w-3 h-3 text-cyan-400" /> Lời bình (Voiceover)
          </label>
          <span className="text-[9px] text-slate-500 font-mono">
            {(scene.voiceover || "").length} ký tự
          </span>
        </div>
        <Textarea
          rows={4}
          value={scene.voiceover || scene.creativeDirection || ""}
          onChange={(e) => onChangeField("voiceover", e.target.value)}
          className="bg-[#070A10] border-[#1E2638] text-xs resize-none leading-relaxed h-28"
          placeholder="Nhập nội dung voiceover đọc trong cảnh này..."
        />
      </div>
      <div className="p-2.5 rounded-lg bg-[#0E1524] border border-[#1C263B] text-[10px]">
        <span className="font-semibold text-slate-300 block mb-0.5">Thời gian đọc ước tính:</span>
        <p className="text-cyan-400 font-mono">
          ~{estimatedSeconds} giây (Tối ưu cho thời lượng {scene.durationSeconds}s)
        </p>
      </div>
    </div>
  );
}
