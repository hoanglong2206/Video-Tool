import React from "react";

export function SceneViewport(): React.ReactElement {
  return (
    <div className="flex-1 p-6 flex flex-col bg-[#080B12] select-none overflow-hidden">
      <div className="w-full flex-1 rounded-xl border border-[#1E2638] bg-[#0B0F19] flex items-center justify-center p-8">
        <div className="w-full max-w-2xl aspect-[16/10] rounded-xl border border-[#1C2538] bg-[#0E1321] flex items-center justify-center shadow-lg">
          <span className="text-xs font-medium text-slate-400">
            Scene 03 preview
          </span>
        </div>
      </div>
    </div>
  );
}

