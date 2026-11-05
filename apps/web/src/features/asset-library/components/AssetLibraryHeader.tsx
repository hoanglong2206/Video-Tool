import React from "react";
import { Button, Input } from "@/components/ui";

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
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search assets, templates, presets"
          className="w-72"
        />
        <Button
          size="sm"
          onClick={onSaveTemplate}
        >
          Save as template
        </Button>
      </div>
    </header>
  );
}

