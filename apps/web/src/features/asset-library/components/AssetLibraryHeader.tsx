import React from "react";
import Link from "next/link";
import { LayoutGrid, Search } from "lucide-react";

interface AssetLibraryHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSaveTemplate: () => void;
}

export function AssetLibraryHeader({
  searchQuery,
  onSearchChange,
  onSaveTemplate,
}: AssetLibraryHeaderProps): React.ReactElement {
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
        <span className="text-sm font-semibold text-slate-100">
          Asset Library & Brand Kit
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search assets, templates, presets"
            className="w-72 bg-[#121826] border border-[#242F45] rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <button
          onClick={onSaveTemplate}
          className="px-3.5 py-1.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-medium rounded-md transition-colors shadow-sm"
        >
          Save as template
        </button>
      </div>
    </header>
  );
}
