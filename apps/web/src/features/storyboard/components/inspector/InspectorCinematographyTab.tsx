"use client";

import React, { useState } from "react";
import type { StoryboardScene } from "../../types";
import { Textarea } from "@/components/ui";
import { Camera, Sparkles, SlidersHorizontal, SunMedium, Film } from "lucide-react";
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

function PropertyExplainer({
  badge,
  badgeColor = "indigo",
  text,
}: {
  badge?: string;
  badgeColor?: "indigo" | "cyan" | "blue" | "slate";
  text: string;
}) {
  const colorMap = {
    indigo: "text-indigo-300",
    cyan: "text-cyan-300",
    blue: "text-blue-300",
    slate: "text-slate-200",
  };

  return (
    <div className="mt-1.5 px-2.5 py-1.5 rounded-md bg-[#070B14] border border-[#162032] flex items-start gap-1.5 text-[10px] leading-relaxed shadow-2xs">
      <span className="text-[11px] shrink-0 leading-none mt-0.5">💡</span>
      <div className="flex-1 min-w-0">
        {badge && <strong className={`font-mono mr-1.5 ${colorMap[badgeColor]}`}>{badge}:</strong>}
        <span className="text-slate-300/90">{text}</span>
      </div>
    </div>
  );
}

export function InspectorCinematographyTab({
  scene,
  onChangeField,
}: InspectorCinematographyTabProps): React.ReactElement {
  const [transitionSearch, setTransitionSearch] = useState("");
  const [showTransitionDropdown, setShowTransitionDropdown] = useState(false);

  const DURATION_PRESETS = [3, 5, 8, 10];
  const POPULAR_TRANSITIONS = ["Cut", "Cross Dissolve", "Whip Pan Blur", "Zoom Push", "Glitch Digital", "Light Leak"];

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
      {/* 1. HIỆU ỨNG CHUYỂN CẢNH (Đưa lên đầu trang) */}
      <div className="relative">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Film className="w-3 h-3 text-cyan-400" /> Hiệu ứng chuyển cảnh (Transition)
          </label>
          <button
            type="button"
            onClick={() => onChangeField("transitionType", aiSuggestedTransition)}
            className="text-[9px] text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 cursor-pointer font-mono"
            title="AI gợi ý chuyển tiếp tối ưu theo nhịp cảnh"
          >
            <Sparkles className="w-2.5 h-2.5" /> Gợi ý AI: {aiSuggestedTransition}
          </button>
        </div>

        {/* Dropdown Box */}
        <div
          onClick={() => setShowTransitionDropdown(!showTransitionDropdown)}
          className="bg-[#070A10] border border-[#1E2638] hover:border-cyan-500 h-8 px-2.5 rounded flex items-center justify-between cursor-pointer text-slate-200 transition-colors"
        >
          <span className="font-semibold text-cyan-300 truncate">{scene.transitionType || "Cut"}</span>
          <span className="text-[9px] text-slate-500 font-mono">Thay đổi ▾</span>
        </div>

        {/* Quick Selection Pills */}
        <div className="flex items-center gap-1 flex-wrap mt-1.5">
          <span className="text-[9px] text-slate-500 font-mono">Phổ biến:</span>
          {POPULAR_TRANSITIONS.map((tid) => {
            const isMatch = (scene.transitionType || "Cut") === tid;
            const tObj = TRANSITION_PRESETS.find((t) => t.id === tid);
            return (
              <button
                key={tid}
                type="button"
                onClick={() => !isMatch && onChangeField("transitionType", tid)}
                className={`text-[9px] px-1.5 py-0.5 rounded font-mono transition-colors cursor-pointer border ${
                  isMatch
                    ? "bg-cyan-950/90 border-cyan-500 text-cyan-300 font-bold"
                    : "bg-[#070A10] border-[#1E2638] text-slate-400 hover:text-slate-200"
                }`}
              >
                {tObj?.label || tid}
              </button>
            );
          })}
        </div>

        {/* Dropdown Menu Modal */}
        {showTransitionDropdown && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-[#0A0E18] border border-[#1E2638] rounded-lg shadow-2xl p-2 z-40 flex flex-col gap-1 max-h-56 overflow-y-auto">
            <input
              type="text"
              placeholder="Tìm kiếm 14 hiệu ứng chuyển cảnh..."
              value={transitionSearch}
              onChange={(e) => setTransitionSearch(e.target.value)}
              className="bg-[#121927] border border-[#1E2638] rounded px-2 py-1 text-xs text-slate-200 mb-1 focus:outline-none focus:border-cyan-500"
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
                  scene.transitionType === t.id ? "bg-cyan-600 text-white font-bold" : "hover:bg-[#141B2B] text-slate-300"
                }`}
              >
                <span className="font-semibold text-[11px]">{t.id}</span>
                <span className="text-[9px] opacity-75 truncate max-w-[150px]">{t.desc}</span>
              </div>
            ))}
          </div>
        )}

        {/* Mô tả UI cải tiến */}
        <PropertyExplainer badge={currentTransitionObj.id} badgeColor="cyan" text={currentTransitionObj.desc} />
      </div>

      {/* 2. TIÊU CỰ ỐNG KÍNH QUANG HỌC (Lens) */}
      <div className="pt-2 border-t border-[#1C2436]">
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
        <PropertyExplainer badge={`f/${currentDofObj.val}`} badgeColor="indigo" text={currentDofObj.desc} />
      </div>

      {/* 4. CHUYỂN ĐỘNG CAMERA (Nâng lên 6 dòng textarea) */}
      <div className="pt-2 border-t border-[#1C2436]">
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
        <PropertyExplainer badge={`${scene.durationSeconds || 5}s`} badgeColor="blue" text="Nhịp dựng khuyến nghị: 3s (nhanh dồn dập), 5s (chuẩn), 8s-10s (cận cảnh công nghệ)." />
      </div>
    </div>
  );
}
