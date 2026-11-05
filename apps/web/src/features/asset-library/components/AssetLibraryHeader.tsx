import React from "react";

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
    <header className="h-14 border-b border-[#1E2638] bg-[#0A0E17] px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="text-xs font-semibold text-slate-100">
          Asset Library & Brand Kit
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search assets, templates, presets"
          className="w-72 bg-[#101522] border border-[#1E2638] rounded-md px-3.5 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button
          onClick={onSaveTemplate}
          className="px-4 py-1.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-medium rounded-md transition-colors shadow-sm"
        >
          Save as template
        </button>
      </div>
    </header>
  );
}

