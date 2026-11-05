import React from "react";
import type { SceneGraphNode } from "../types";

interface HierarchySidebarProps {
  nodes: SceneGraphNode[];
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
}

export function HierarchySidebar({
  nodes,
  selectedNodeId,
  onSelectNode,
}: HierarchySidebarProps): React.ReactElement {
  return (
    <aside className="w-52 border-r border-[#1E2638] bg-[#0A0E17] p-5 flex flex-col shrink-0 select-none overflow-y-auto">
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Hierarchy
      </h2>

      <div className="flex flex-col gap-1.5 text-xs">
        {nodes.map((node) => {
          const isSelected = node.id === selectedNodeId;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => onSelectNode(node.id)}
              className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors border ${
                isSelected
                  ? "bg-[#14233D] text-slate-100 border-[#2563EB] font-medium"
                  : "bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:bg-[#101520]"
              }`}
            >
              {node.name}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
