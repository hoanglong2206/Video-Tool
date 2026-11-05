import React from "react";
import Link from "next/link";

interface AssetStudioHeaderProps {
  projectName: string;
  onUpload?: () => void;
  onGenerateImage?: () => void;
  onApproveSelected?: () => void;
}

export function AssetStudioHeader({
  projectName,
  onUpload,
  onGenerateImage,
  onApproveSelected,
}: AssetStudioHeaderProps): React.ReactElement {
  return (
    <header className="h-14 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#0B0F17]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs">
        <Link
          href="/"
          className="font-medium text-slate-100 hover:text-white transition-colors"
        >
          Asset Studio
        </Link>
        <span className="text-slate-600">/</span>
        <span className="text-slate-300 font-normal">{projectName}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onUpload}
          className="h-8 px-3.5 rounded-md text-xs font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm"
        >
          Upload
        </button>

        <button
          type="button"
          onClick={onGenerateImage}
          className="h-8 px-3.5 rounded-md text-xs font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white transition-all shadow-sm"
        >
          Generate image
        </button>

        <button
          type="button"
          onClick={onApproveSelected}
          className="h-8 px-3.5 rounded-md text-xs font-medium text-white bg-[#3B82F6] hover:bg-[#2563EB] active:scale-[0.98] transition-all shadow-sm"
        >
          Approve selected
        </button>
      </div>
    </header>
  );
}
