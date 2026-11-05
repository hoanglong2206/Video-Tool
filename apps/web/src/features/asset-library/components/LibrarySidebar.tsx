import React from "react";
import type { LibraryCategory } from "../types";

interface LibrarySidebarProps {
  categories: LibraryCategory[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string) => void;
}

export function LibrarySidebar({
  categories,
  selectedCategoryId,
  onSelectCategory,
  tags,
  selectedTag,
  onSelectTag,
}: LibrarySidebarProps): React.ReactElement {
  return (
    <aside className="w-56 border-r border-[#1E2638] bg-[#0A0E17] p-4 flex flex-col shrink-0 select-none overflow-y-auto">
      {/* LIBRARY SECTION */}
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
        Library
      </h2>
      <div className="flex flex-col gap-1 mb-6">
        {categories.map((cat) => {
          const isSelected = cat.id === selectedCategoryId;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`text-xs py-1 text-left transition-colors flex items-center gap-1.5 ${
                isSelected
                  ? "text-slate-100 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>{cat.name}</span>
              <span className={isSelected ? "text-slate-100 font-normal" : "text-slate-400"}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAGS SECTION */}
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
        Tags
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className={`px-2.5 py-1 rounded-full text-[11px] transition-colors border ${
                isSelected
                  ? "bg-[#1E293B] border-blue-500 text-blue-300"
                  : "bg-[#111723] border-[#222C3E] text-slate-400 hover:border-slate-500 hover:text-slate-200"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

