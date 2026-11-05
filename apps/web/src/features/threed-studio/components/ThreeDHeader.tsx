import React from "react";
import Link from "next/link";

interface ThreeDHeaderProps {
  projectName: string;
  sceneTitle: string;
  isOrbitMode: boolean;
  isRendering: boolean;
  isApproved: boolean;
  onToggleOrbit: () => void;
  onRenderPreview: () => void;
  onApproveScene: () => void;
}

export function ThreeDHeader({
  projectName,
  sceneTitle,
  isOrbitMode,
  isRendering,
  isApproved,
  onToggleOrbit,
  onRenderPreview,
  onApproveScene,
}: ThreeDHeaderProps): React.ReactElement {
  return (
    <header className="h-14 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#0B0F17] select-none">
      {/* Breadcrumb with Status */}
      <div className="flex items-center gap-2.5 text-xs">
        <Link
          href="/"
          className="font-medium text-slate-100 hover:text-white transition-colors"
        >
          {projectName}
        </Link>
        <span className="text-slate-600">/</span>
        <span className="text-slate-300 font-normal">{sceneTitle}</span>
        {isApproved ? (
          <span className="bg-[#132E27] text-[#10B981] border border-[#065F46] rounded-full text-[10px] px-2 py-0.5 font-medium ml-1">
            ✓ Approved
          </span>
        ) : (
          <span className="bg-[#101520] text-slate-400 border border-[#1C2436] rounded-full text-[10px] px-2.5 py-0.5 font-medium ml-1">
            - Pending · needs Motion approved
          </span>
        )}
      </div>

      {/* 3D Action Controls */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onToggleOrbit}
          className={`h-8 px-3.5 rounded-md text-xs font-medium border transition-all shadow-sm ${
            isOrbitMode
              ? "bg-[#1A2234] text-slate-100 border-[#2E3B54]"
              : "bg-[#141A27] text-slate-400 border-[#242D40] hover:text-white"
          }`}
        >
          Orbit
        </button>

        <button
          type="button"
          onClick={onRenderPreview}
          disabled={isRendering}
          className="h-8 px-3.5 rounded-md text-xs font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm disabled:opacity-50"
        >
          {isRendering ? "Rendering..." : "Render preview"}
        </button>

        <button
          type="button"
          onClick={onApproveScene}
          className="h-8 px-3.5 rounded-md text-xs font-medium text-slate-400 bg-[#101520] border border-[#1C2436] hover:text-slate-200 transition-all shadow-sm"
        >
          Approve 3D scene
        </button>
      </div>
    </header>
  );
}
