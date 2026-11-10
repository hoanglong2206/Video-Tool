"use client";

import React from "react";
import { Textarea, toast } from "@/components/ui";
import { Volume2, Video, Sparkles } from "lucide-react";

export interface CameraPreset {
  id: string;
  label: string;
  icon: string;
  movement: string;
}

export const CAMERA_PRESETS: CameraPreset[] = [
  {
    id: "orbit-360",
    label: "Orbit 360°",
    icon: "🌀",
    movement: "Orbit 360° xoay mượt mà quanh sản phẩm, khóa tâm tiêu cự (focal lock), ánh sáng ven rim-light",
  },
  {
    id: "macro-push",
    label: "Macro Push-in",
    icon: "🔍",
    movement: "Slow push-in zoom cận cảnh siêu thực, 85mm anamorphic prime lens f/1.8 độ sâu trường nông (shallow DoF)",
  },
  {
    id: "whip-pan",
    label: "Kinetic Whip-Pan",
    icon: "⚡",
    movement: "Fast kinetic whip-pan zoom, 180° shutter angle, motion blur gia tốc chuyển cảnh dồn dập",
  },
  {
    id: "crane-hero",
    label: "Sweeping Crane",
    icon: "🏗️",
    movement: "Sweeping crane down từ góc cao hạ xuống góc 3/4 hero beauty angle tôn dáng sản phẩm",
  },
  {
    id: "fpv-glide",
    label: "FPV Glide",
    icon: "🚀",
    movement: "Low-angle FPV glide lướt sát bề mặt kim loại, camera tracking bám mượt mà chi tiết hoàn thiện",
  },
  {
    id: "static-lockup",
    label: "Static Lockup",
    icon: "🎯",
    movement: "Locked static hero lockup chính diện đối xứng, hiệu ứng anamorphic specular flare quét ngang",
  },
];

interface SceneMovementEditorProps {
  voiceover: string;
  cameraMovement: string;
  onChangeVoiceover: (value: string) => void;
  onChangeCameraMovement: (value: string) => void;
}

export function SceneMovementEditor({
  voiceover,
  cameraMovement,
  onChangeVoiceover,
  onChangeCameraMovement,
}: SceneMovementEditorProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-2 shrink-0">
      {/* 2-Column Grid: Voiceover (2 rows) & Camera Movement (2 rows) */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Left: Voiceover (2 rows) */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Volume2 className="w-3 h-3 text-cyan-400" />
            <span>Lời bình (Voiceover / Lời thoại)</span>
          </label>
          <Textarea
            rows={2}
            value={voiceover}
            onChange={(e) => onChangeVoiceover(e.target.value)}
            className="bg-[#070A10] border-[#1E2638] focus:border-cyan-500 h-14 text-xs resize-none leading-relaxed text-slate-300"
            placeholder="Nội dung lời thoại / voiceover đọc trong cảnh này (2 dòng)..."
          />
        </div>

        {/* Right: Camera Movement (2 rows) */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Video className="w-3 h-3 text-indigo-400" />
              <span>Chuyển động Camera (Camera Movement)</span>
            </span>
            <span className="text-[9px] text-indigo-400 font-mono font-normal flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" /> Chi tiết góc & quang học
            </span>
          </label>
          <Textarea
            rows={2}
            value={cameraMovement}
            onChange={(e) => onChangeCameraMovement(e.target.value)}
            className="bg-[#070A10] border-[#1E2638] focus:border-indigo-500 h-14 text-xs resize-none leading-relaxed text-slate-200 font-mono"
            placeholder="Góc máy, tiêu cự ống kính, tốc độ và chuyển động camera chi tiết (2 dòng)..."
          />
        </div>
      </div>

      {/* Quick 1-Click Camera Movement Presets Chips */}
      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
        <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider shrink-0">
          Gợi ý góc quay:
        </span>
        {CAMERA_PRESETS.map((preset) => {
          const isCurrent = cameraMovement === preset.movement;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                onChangeCameraMovement(preset.movement);
                toast.info(`Đã áp dụng góc quay: ${preset.label}`);
              }}
              className={`text-[9.5px] px-2 py-0.5 rounded-md border flex items-center gap-1 transition-all cursor-pointer font-mono ${
                isCurrent
                  ? "bg-indigo-950/80 border-indigo-500 text-indigo-300 shadow-xs"
                  : "bg-[#070A10] border-[#1E2638] text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-[#0D121D]"
              }`}
              title={preset.movement}
            >
              <span>{preset.icon}</span>
              <span>{preset.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

