import React from "react";
import type { CategoryCount, AssetCategory } from "../types";

interface CategorySidebarProps {
  categories: CategoryCount[];
  selectedCategory: AssetCategory;
  onSelectCategory: (category: AssetCategory) => void;
}

export function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySidebarProps): React.ReactElement {
  return (
    <aside className="w-48 border-r border-[#1E2638] bg-[#0A0E17] p-5 flex flex-col shrink-0 select-none">
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Categories
      </h2>

      <nav className="flex flex-col gap-2.5 text-xs">
        {categories.map((cat) => {
          const isSelected = cat.id === selectedCategory;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center justify-between text-left transition-colors py-1 px-1 rounded ${
                isSelected
                  ? "text-slate-100 font-semibold bg-[#141A27]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[11px] text-slate-500 font-normal">
                {cat.count}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
