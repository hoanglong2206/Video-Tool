import React from "react";

interface AssistantHeaderProps {
  projectName: string;
  sceneName: string;
  onSaveVersion: () => void;
}

export function AssistantHeader({
  projectName,
  sceneName,
  onSaveVersion,
}: AssistantHeaderProps): React.ReactElement {
  return (
    <header className="h-14 border-b border-[#1E2638] bg-[#0A0E17] px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2 text-xs">
        <span className="font-semibold text-slate-100">{projectName}</span>
        <span className="text-slate-500">/</span>
        <span className="text-slate-300 font-normal">{sceneName}</span>
      </div>

      <button
        onClick={onSaveVersion}
        className="px-3.5 py-1.5 rounded-md text-xs font-medium text-slate-200 bg-[#141A28] border border-[#232F45] hover:bg-[#1C2538] hover:border-[#32425E] transition-colors"
      >
        Save version
      </button>
    </header>
  );
}

