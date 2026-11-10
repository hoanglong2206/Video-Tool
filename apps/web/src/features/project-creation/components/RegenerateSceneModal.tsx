"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wand2, Sparkles, Film, Zap, Layers, Flame, Check } from "lucide-react";

interface RegenerateSceneModalProps {
  isOpen: boolean;
  onClose: () => void;
  sceneNumber: number;
  sceneTitle: string;
  onApplyRegeneration: (updated: {
    visualPrompt: string;
    cameraMovement: string;
    voiceover?: string;
  }) => void;
}

interface PresetOption {
  id: string;
  title: string;
  icon: React.ElementType;
  badge: string;
  desc: string;
  visualPrompt: string;
  cameraMovement: string;
  voiceover?: string;
}

export function RegenerateSceneModal({
  isOpen,
  onClose,
  sceneNumber,
  sceneTitle,
  onApplyRegeneration,
}: RegenerateSceneModalProps): React.ReactElement {
  const PRESETS: PresetOption[] = [
    {
      id: "cinematic",
      title: "Điện ảnh Studio Rim-Light",
      icon: Film,
      badge: "Cinematic",
      desc: "Ánh sáng viền studio 4:1, tương phản cao, phản chiếu kim loại phay xước sắc nét.",
      visualPrompt: `Extreme macro cinematic close-up of ${sceneTitle}, 4:1 low-key studio rim-lighting, subtle volumetric haze, 8K ultra-detailed photorealistic render.`,
      cameraMovement:
        "Slow push-in 24fps với rotational orbit 15° arc, tiêu cự 85mm anamorphic prime, f/1.8 shallow DoF",
      voiceover: "Chiêm ngưỡng đỉnh cao của thiết kế cơ khí và âm học tinh xảo.",
    },
    {
      id: "kinetic",
      title: "Bùng nổ Kịch tính & Hạt năng lượng",
      icon: Zap,
      badge: "High Energy",
      desc: "Chuyển động hạt sóng âm vòm bùng nổ, rung cảm biến theo nhịp bass dồn dập.",
      visualPrompt: `Volumetric neon kinetic soundwaves and hyper-dynamic particles exploding outward in dark space, high contrast electric blue reflections.`,
      cameraMovement:
        "Fast kinetic whip-pan zoom, 180° shutter angle, motion blur gia tốc chuyển cảnh dồn dập",
      voiceover: "Bứt phá mọi giới hạn âm thanh với sức mạnh công nghệ vượt trội.",
    },
    {
      id: "minimal",
      title: "Tối giản Sang trọng (Apple Style)",
      icon: Sparkles,
      badge: "Luxury Minimal",
      desc: "Phong cách tối giản tinh khiết, ánh sáng studio mềm dịu, chuyển động xoay chậm.",
      visualPrompt: `Ultra-clean minimal aesthetic, soft studio daylight reflections, pristine titanium texture, elegant turntable reveal.`,
      cameraMovement:
        "Smooth horizontal tracking glide lướt cạnh viền titanium vát chamfer, f/1.4 bokeh mượt mà",
      voiceover: "Sự tinh giản tuyệt đối trong từng đường nét và vật liệu cao cấp.",
    },
    {
      id: "exploded",
      title: "Bóc tách Kỹ thuật 3D (Exploded View)",
      icon: Layers,
      badge: "3D Engineering",
      desc: "Phân rã linh kiện vi mạch trong không trọng lực kèm đường line sơ đồ kỹ thuật.",
      visualPrompt: `Seamless 3D exploded diagram of internal acoustic drivers and micro-circuitry floating in zero-gravity with glowing neon schematic lines.`,
      cameraMovement:
        "Rotational slow-motion 360° twist quanh lõi driver bóc tách đa tầng, dynamic exploded parts expansion",
      voiceover: "Cấu trúc kỹ thuật phức tạp được tối ưu hóa cho độ chính xác âm học tối đa.",
    },
  ];

  const [selectedId, setSelectedId] = useState<string>("cinematic");
  const selectedPreset = PRESETS.find((p) => p.id === selectedId) || PRESETS[0];

  const handleApply = () => {
    onApplyRegeneration({
      visualPrompt: selectedPreset.visualPrompt,
      cameraMovement: selectedPreset.cameraMovement,
      voiceover: selectedPreset.voiceover,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl bg-[#0D121F] border-[#1E2638] text-slate-100 p-5 rounded-2xl shadow-2xl">
        <DialogHeader className="flex flex-row items-center gap-3 pb-2.5 border-b border-[#1E2638]">
          <div className="w-8 h-8 rounded-lg bg-cyan-600/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Wand2 className="w-4 h-4" />
          </div>
          <div>
            <DialogTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>Sinh lại Visual Prompt cho Cảnh 0{sceneNumber}</span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-1.5 py-0.2 rounded font-normal">
                1-Click AI
              </span>
            </DialogTitle>
            <p className="text-[11px] text-slate-400 truncate max-w-sm">
              "{sceneTitle}" — Chọn phong cách sinh lại mà không ảnh hưởng 5 cảnh còn lại.
            </p>
          </div>
        </DialogHeader>

        {/* 4 Presets Grid */}
        <div className="grid grid-cols-2 gap-2.5 py-2">
          {PRESETS.map((preset) => {
            const Icon = preset.icon;
            const isSelected = selectedId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setSelectedId(preset.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-cyan-950/50 border-cyan-500 shadow-md shadow-cyan-600/20 ring-1 ring-cyan-500/40"
                    : "bg-[#090D16] border-[#1C2538] hover:border-[#2C3B58] hover:bg-[#0D1322]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-cyan-300 font-semibold px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800/40">
                      {preset.badge}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5 mb-1">
                    <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{preset.title}</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-snug line-clamp-2">
                    {preset.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Preset Preview */}
        <div className="bg-[#070A12] border border-[#172033] rounded-lg p-2.5 flex flex-col gap-1.5 text-[11px]">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
            Prompt xem trước cho Cảnh 0{sceneNumber}
          </span>
          <p className="font-mono text-[10px] text-slate-300 leading-relaxed bg-[#04060A] p-2 rounded border border-[#141B2A]">
            {selectedPreset.visualPrompt}
          </p>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-0.5">
            <span className="text-indigo-300">Camera: {selectedPreset.cameraMovement}</span>
            <span className="text-slate-500 italic truncate max-w-xs">
              Voice: "{selectedPreset.voiceover}"
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#1E2638]">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-8 text-xs bg-[#101520] border-[#1E2638] text-slate-300 hover:text-white cursor-pointer"
          >
            Hủy bỏ
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleApply}
            className="h-8 text-xs bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-600/30"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Áp dụng cho Cảnh 0{sceneNumber}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

