import React from "react";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";

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
    <header className="h-14 border-b border-[#1E2638] bg-[#0D121F] px-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-[#161F30] rounded-md transition-colors"
          title="Back to Dashboard"
        >
          <LayoutGrid className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-100">{projectName}</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-300">{sceneName}</span>
        </div>
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

