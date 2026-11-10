"use client";

import React from "react";
import type { StoryboardScene } from "../../types";
import { Textarea } from "@/components/ui";
import { Camera, SlidersHorizontal, SunMedium } from "lucide-react";
import {
  CAMERA_LENSES,
  DOF_PRESETS,
  CAMERA_MOVEMENTS_QUICK,
} from "../../config/cinematography";
import { PropertyExplainer } from "./PropertyExplainer";
import { TransitionSection } from "./TransitionSection";

interface InspectorCinematographyTabProps {
  scene: StoryboardScene;
  onChangeField: (field: keyof StoryboardScene, value: any) => void;
}

export function InspectorCinematographyTab({
  scene,
  onChangeField,
}: InspectorCinematographyTabProps): React.ReactElement {
  const DURATION_PRESETS = [3, 5, 8, 10];
  const RIM_LIGHT_PRESETS = ["#06B6D4", "#F59E0B", "#A855F7", "#3B82F6", "#FFFFFF"];

  const currentLensObj =
    CAMERA_LENSES.find((l) => (scene.cameraLens || "85mm").includes(l.id)) || CAMERA_LENSES[3];
  const currentDofObj =
    DOF_PRESETS.find((d) => (scene.cameraDof || 1.8) === d.val) || DOF_PRESETS[1];

  return (
    <div className="flex flex-col gap-3.5 text-xs">
      {/* 1. HIỆU ỨNG CHUYỂN CẢNH (Đưa lên đầu trang) */}
      <TransitionSection
        currentTransition={scene.transitionType || "Cut"}
        sceneNumber={scene.sceneNumber}
        onSelectTransition={(tid) => onChangeField("transitionType", tid)}
      />

      {/* 2. TIÊU CỰ ỐNG KÍNH QUANG HỌC (Lens 3+2 Cân đối) */}
      <div className="pt-2 border-t border-[#1C2436]">
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
          <Camera className="w-3 h-3 text-indigo-400" /> Tiêu cự ống kính (Focal Lens)
        </label>
        <div className="grid grid-cols-3 gap-1">
          {CAMERA_LENSES.slice(0, 3).map((lens) => {
            const isMatch = (scene.cameraLens || "85mm").includes(lens.id);
            return (
              <button
                key={lens.id}
                type="button"
                onClick={() => !isMatch && onChangeField("cameraLens", lens.id)}
                className={`py-1.5 px-1 rounded border text-[10.5px] font-mono transition-colors cursor-pointer truncate ${
                  isMatch
                    ? "bg-indigo-950/90 border-indigo-500 text-indigo-300 font-bold shadow-xs ring-1 ring-indigo-500/40"
                    : "bg-[#070A10] border-[#1E2638] text-slate-400 hover:text-slate-200"
                }`}
                title={lens.desc}
              >
                {lens.name}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-1 mt-1">
          {CAMERA_LENSES.slice(3).map((lens) => {
            const isMatch = (scene.cameraLens || "85mm").includes(lens.id);
            return (
              <button
                key={lens.id}
                type="button"
                onClick={() => !isMatch && onChangeField("cameraLens", lens.id)}
                className={`py-1.5 px-1 rounded border text-[10.5px] font-mono transition-colors cursor-pointer truncate ${
                  isMatch
                    ? "bg-indigo-950/90 border-indigo-500 text-indigo-300 font-bold shadow-xs ring-1 ring-indigo-500/40"
                    : "bg-[#070A10] border-[#1E2638] text-slate-400 hover:text-slate-200"
                }`}
                title={lens.desc}
              >
                {lens.name}
              </button>
            );
          })}
        </div>
        <PropertyExplainer badge={currentLensObj.name} badgeColor="indigo" text={currentLensObj.desc} />
      </div>

      {/* 3. KHẨU ĐỘ QUANG HỌC (DoF) */}
      <div className="pt-2 border-t border-[#1C2436]">
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
          <SlidersHorizontal className="w-3 h-3 text-indigo-400" /> Khẩu độ quang học (DoF)
        </label>
        <div className="grid grid-cols-4 gap-1">
          {DOF_PRESETS.map((dof) => {
            const isMatch = (scene.cameraDof || 1.8) === dof.val;
            return (
              <button
                key={dof.val}
                type="button"
                onClick={() => !isMatch && onChangeField("cameraDof", dof.val)}
                className={`py-1.5 text-center rounded border font-mono transition-colors cursor-pointer text-[10.5px] ${
                  isMatch
                    ? "bg-indigo-950/90 border-indigo-500 text-indigo-300 font-bold shadow-xs ring-1 ring-indigo-500/40"
                    : "bg-[#070A10] border-[#1E2638] text-slate-400 hover:text-slate-200"
                }`}
                title={dof.desc}
              >
                f/{dof.val}
              </button>
            );
          })}
        </div>
        <PropertyExplainer badge={`f/${currentDofObj.val}`} badgeColor="indigo" text={currentDofObj.desc} />
      </div>

      {/* 4. CHUYỂN ĐỘNG CAMERA (Nâng lên 6 dòng textarea) */}
      <div className="pt-2 border-t border-[#1C2436]">
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
          Chuyển động Camera (Camera Movement)
        </label>
        <Textarea
          rows={4}
          value={scene.cameraMovement || ""}
          onChange={(e) => onChangeField("cameraMovement", e.target.value)}
          className="bg-[#070A10] border-[#1E2638] text-xs font-mono h-[96px] resize-none leading-relaxed text-slate-200"
          placeholder="Mô tả quỹ đạo camera..."
        />
        <div className="flex items-center gap-1 flex-wrap mt-1.5">
          {CAMERA_MOVEMENTS_QUICK.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onChangeField("cameraMovement", m)}
              className="text-[8.5px] px-1.5 py-0.5 rounded bg-[#121927] hover:bg-[#1C273C] border border-[#1E2638] text-slate-300 font-mono truncate max-w-[180px] cursor-pointer"
              title={m}
            >
              {m.split(" ")[0]} {m.split(" ")[1] || ""}
            </button>
          ))}
        </div>
        <PropertyExplainer badge="Quỹ đạo 3D" badgeColor="blue" text="Nhấp chip để chèn nhanh quỹ đạo quay điện ảnh chuẩn studio." />
      </div>

      {/* 5. DÀN ĐÈN RIM-LIGHT STUDIO */}
      <div className="pt-2 border-t border-[#1C2436]">
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
          <SunMedium className="w-3 h-3 text-cyan-400" /> Đèn viền Studio (Rim-Light)
        </label>
        <div className="flex items-center gap-2 bg-[#070A10] p-1.5 rounded-lg border border-[#1E2638]">
          <input
            type="color"
            value={scene.lightingRimColor || "#06B6D4"}
            onChange={(e) => onChangeField("lightingRimColor", e.target.value)}
            className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
          />
          <span className="text-xs font-mono text-cyan-300 font-bold">{scene.lightingRimColor || "#06B6D4"}</span>

          {/* Quick preset color swatches */}
          <div className="flex items-center gap-1.5 ml-auto">
            {RIM_LIGHT_PRESETS.map((col) => (
              <button
                key={col}
                type="button"
                onClick={() => onChangeField("lightingRimColor", col)}
                className={`w-3.5 h-3.5 rounded-full border cursor-pointer transition-transform hover:scale-110 ${
                  (scene.lightingRimColor || "#06B6D4").toLowerCase() === col.toLowerCase()
                    ? "ring-1 ring-white scale-110 border-white"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: col }}
                title={`Chọn màu ${col}`}
              />
            ))}
          </div>
        </div>
        <PropertyExplainer badge="Đèn viền 4:1" badgeColor="cyan" text="Tách khối sản phẩm khỏi phông nền tối, tôn bật cạnh kim loại sắc nét." />
      </div>

      {/* 6. THỜI LƯỢNG PHÂN CẢNH */}
      <div className="pt-2 border-t border-[#1C2436]">
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
          Thời lượng phân cảnh
        </label>
        <div className="grid grid-cols-4 gap-1">
          {DURATION_PRESETS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => scene.durationSeconds !== d && onChangeField("durationSeconds", d)}
              className={`py-1.5 text-center rounded border font-mono transition-colors cursor-pointer ${
                scene.durationSeconds === d
                  ? "bg-blue-600 border-blue-500 text-white font-bold"
                  : "bg-[#070A10] border-[#1E2638] text-slate-400 hover:text-slate-200"
              }`}
            >
              {d}s
            </button>
          ))}
        </div>
        <PropertyExplainer badge={`${scene.durationSeconds || 5}s`} badgeColor="blue" text="Nhịp dựng khuyến nghị: 3s (nhanh dồn dập), 5s (chuẩn), 8s-10s (cận cảnh công nghệ)." />
      </div>
    </div>
  );
}
