import React from "react";

export function SceneViewport(): React.ReactElement {
  return (
    <div className="flex-1 bg-[#090D14] p-8 flex items-center justify-center select-none overflow-hidden">
      <div className="w-full max-w-2xl aspect-[16/10] rounded-xl border border-[#1E2638] bg-[#0E131F] flex items-center justify-center shadow-2xl relative">
        <span className="text-xs font-medium text-slate-400">
          Scene 03 preview
        </span>
      </div>
    </div>
  );
}

