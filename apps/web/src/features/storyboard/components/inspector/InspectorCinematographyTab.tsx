"use client";

import React, { useState } from "react";
import type { StoryboardScene } from "../../types";
import { Textarea } from "@/components/ui";
import { Camera, Sparkles, SlidersHorizontal, SunMedium } from "lucide-react";
import {
  CAMERA_LENSES,
  DOF_PRESETS,
  TRANSITION_PRESETS,
  CAMERA_MOVEMENTS_QUICK,
} from "../../config/cinematography";

interface InspectorCinematographyTabProps {
  scene: StoryboardScene;
  onChangeField: (field: keyof StoryboardScene, value: any) => void;
}

export function InspectorCinematographyTab({
  scene,
  onChangeField,
}: InspectorCinematographyTabProps): React.ReactElement {
  const [transitionSearch, setTransitionSearch] = useState("");
  const [showTransitionDropdown, setShowTransitionDropdown] = useState(false);

  const DURATION_PRESETS = [3, 5, 8, 10];

  const currentLensObj =
    CAMERA_LENSES.find((l) => (scene.cameraLens || "85mm").includes(l.id)) || CAMERA_LENSES[3];
  const currentDofObj =
    DOF_PRESETS.find((d) => (scene.cameraDof || 1.8) === d.val) || DOF_PRESETS[1];
  const currentTransitionObj =
    TRANSITION_PRESETS.find((t) => t.id === (scene.transitionType || "Cut")) || TRANSITION_PRESETS[0];

  const filteredTransitions = TRANSITION_PRESETS.filter(
    (t) =>
      t.id.toLowerCase().includes(transitionSearch.toLowerCase()) ||
      t.desc.toLowerCase().includes(transitionSearch.toLowerCase())
  );

  const aiSuggestedTransition =
    scene.sceneNumber === 1
      ? "Fade to Black"
      : scene.sceneNumber % 2 === 0
      ? "Whip Pan Blur"
      : "Cross Dissolve";

  return (
    <div className="flex flex-col gap-3.5 text-xs">
      {/* 1. Tiêu cự ống kính quang học (Lens) */}
      <div>
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
          <Camera className="w-3 h-3 text-indigo-400" /> Tiêu cự ống kính (Focal Lens)
        </label>
        <div className="grid grid-cols-3 gap-1">
          {CAMERA_LENSES.map((lens) => {
            const isMatch = (scene.cameraLens || "85mm").includes(lens.id);
            return (
              <button
                key={lens.id}
                type="button"
                onClick={() => !isMatch && onChangeField("cameraLens", lens.id)}
                className={`py-1 px-1 rounded border text-[10px] font-mono transition-colors cursor-pointer truncate ${
                  isMatch
                    ? "bg-indigo-950/90 border-indigo-500 text-indigo-300 font-bold shadow-xs"
                    : "bg-[#070A10] border-[#1E2638] text-slate-400 hover:text-slate-200"
                }`}
                title={lens.desc}
              >
                {lens.name}
              </button>
            );
          })}
        </div>
        {/* Phần giải thích đặt ở dưới cùng của thẻ */}
        <p className="text-[9.5px] text-indigo-300/80 font-mono mt-1.5 flex items-center gap-1">
          ℹ️ {currentLensObj.name}: {currentLensObj.desc}
        </p>
      </div>

      {/* 2. Khẩu độ DoF (Depth of Field) */}
      <div>
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
                className={`py-1 text-center rounded border font-mono transition-colors cursor-pointer text-[10.5px] ${
                  isMatch
                    ? "bg-indigo-950/90 border-indigo-500 text-indigo-300 font-bold shadow-xs"
                    : "bg-[#070A10] border-[#1E2638] text-slate-400 hover:text-slate-200"
                }`}
                title={dof.desc}
              >
                f/{dof.val}
              </button>
            );
          })}
        </div>
        {/* Phần giải thích đặt ở dưới cùng của thẻ */}
        <p className="text-[9.5px] text-indigo-300/80 font-mono mt-1.5 flex items-center gap-1">
          ℹ️ f/{currentDofObj.val}: {currentDofObj.desc}
        </p>
      </div>

      {/* 3. Chuyển động Camera (Nâng lên 6 dòng textarea) */}
      <div>
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
          Chuyển động Camera (Camera Movement)
        </label>
        <Textarea
          rows={6}
          value={scene.cameraMovement || ""}
          onChange={(e) => onChangeField("cameraMovement", e.target.value)}
          className="bg-[#070A10] border-[#1E2638] text-xs font-mono h-[125px] resize-none leading-relaxed text-slate-200"
          placeholder="Mô tả quỹ đạo camera..."
        />
        {/* Quick chip suggestions */}
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
        {/* Phần giải thích đặt ở dưới cùng */}
        <p className="text-[9.5px] text-slate-400 font-mono mt-1.5">
          ℹ️ Bấm chip để chèn nhanh quỹ đạo quay điện ảnh chuẩn studio
        </p>
      </div>

      {/* 4. Dàn đèn Rim-Light Studio */}
      <div className="pt-2 border-t border-[#1C2436]">
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
          <SunMedium className="w-3 h-3 text-cyan-400" /> Đèn viền Studio (Rim-Light)
        </label>
        <div className="flex items-center gap-2 bg-[#070A10] p-1.5 rounded border border-[#1E2638]">
          <input
            type="color"
            value={scene.lightingRimColor || "#06B6D4"}
            onChange={(e) => onChangeField("lightingRimColor", e.target.value)}
            className="w-5 h-5 rounded cursor-pointer bg-transparent border-0"
          />
          <span className="text-xs font-mono text-cyan-300 font-bold">{scene.lightingRimColor || "#06B6D4"}</span>
          <span className="text-[9.5px] text-slate-400 ml-auto">Studio Contrast 4:1</span>
        </div>
        {/* Phần giải thích đặt ở dưới cùng */}
        <p className="text-[9.5px] text-cyan-300/80 font-mono mt-1.5">
          ℹ️ Tôn cạnh phản chiếu kim loại, tách khối sản phẩm khỏi phông nền tối
        </p>
      </div>

      {/* 5. Cài đặt Thời lượng & Hiệu ứng chuyển cảnh */}
      <div className="pt-2 border-t border-[#1C2436] flex flex-col gap-3">
        {/* Duration */}
        <div>
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
            Thời lượng phân cảnh
          </label>
          <div className="grid grid-cols-4 gap-1">
            {DURATION_PRESETS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => scene.durationSeconds !== d && onChangeField("durationSeconds", d)}
                className={`py-1 text-center rounded border font-mono transition-colors cursor-pointer ${
                  scene.durationSeconds === d
                    ? "bg-blue-600 border-blue-500 text-white font-bold"
                    : "bg-[#070A10] border-[#1E2638] text-slate-400 hover:text-slate-200"
                }`}
              >
                {d}s
              </button>
            ))}
          </div>
          <p className="text-[9.5px] text-slate-400 font-mono mt-1.5">
            ℹ️ {scene.durationSeconds || 5}s · Khuyến nghị 3s (nhanh), 5s (chuẩn), 8s-10s (chi tiết)
          </p>
        </div>

        {/* Searchable Transition Select with AI Suggestion */}
        <div className="relative">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Hiệu ứng chuyển cảnh (Transition)
            </label>
            <button
              type="button"
              onClick={() => onChangeField("transitionType", aiSuggestedTransition)}
              className="text-[9px] text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 cursor-pointer font-mono"
            >
              <Sparkles className="w-2.5 h-2.5" /> Gợi ý AI: {aiSuggestedTransition}
            </button>
          </div>

          <div
            onClick={() => setShowTransitionDropdown(!showTransitionDropdown)}
            className="bg-[#070A10] border border-[#1E2638] hover:border-blue-500 h-8 px-2.5 rounded flex items-center justify-between cursor-pointer text-slate-200"
          >
            <span className="font-medium truncate">{scene.transitionType || "Cut"}</span>
            <span className="text-[9px] text-slate-500 font-mono">Thay đổi ▾</span>
          </div>

          {showTransitionDropdown && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-[#0A0E18] border border-[#1E2638] rounded-lg shadow-xl p-2 z-30 flex flex-col gap-1 max-h-48 overflow-y-auto">
              <input
                type="text"
                placeholder="Tìm kiếm hiệu ứng..."
                value={transitionSearch}
                onChange={(e) => setTransitionSearch(e.target.value)}
                className="bg-[#121927] border border-[#1E2638] rounded px-2 py-1 text-xs text-slate-200 mb-1 focus:outline-none focus:border-blue-500"
                autoFocus
              />
              {filteredTransitions.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    onChangeField("transitionType", t.id);
                    setShowTransitionDropdown(false);
                    setTransitionSearch("");
                  }}
                  className={`p-1.5 rounded flex items-center justify-between cursor-pointer transition-colors ${
                    scene.transitionType === t.id ? "bg-blue-600 text-white" : "hover:bg-[#141B2B] text-slate-300"
                  }`}
                >
                  <span className="font-semibold text-[11px]">{t.id}</span>
                  <span className="text-[9px] opacity-70 truncate max-w-[120px]">{t.desc}</span>
                </div>
              ))}
            </div>
          )}

          <p className="text-[9.5px] text-slate-400 font-mono mt-1.5">
            ℹ️ {currentTransitionObj.id}: {currentTransitionObj.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
