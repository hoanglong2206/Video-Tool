import React from "react";
import type { ProjectItem } from "../types";

interface ProjectCardProps {
  project: ProjectItem;
  onOpen?: (project: ProjectItem) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps): React.ReactElement {
  const isLibrary = project.status === "library";
  const isCompleted = project.status === "completed";

  return (
    <div
      onClick={() => onOpen?.(project)}
      className="bg-[#101520] border border-[#1C2436] hover:border-[#28354D] rounded-lg p-3 flex flex-col justify-between transition-all cursor-pointer group"
    >
      {/* Aspect Ratio Video / Asset Preview Placeholder */}
      <div className="w-full aspect-[16/9] rounded-md bg-[#131926] border border-[#1A2234] flex items-center justify-center p-3 select-none">
        <span className="text-xs text-slate-400 group-hover:text-slate-300 font-medium tracking-wide text-center">
          {project.name}
        </span>
      </div>

      {/* Card Info & Progress Footer */}
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-100 tracking-tight">
            {project.name}
          </h3>
        </div>

        <p className="text-[11px] text-slate-400 mt-0.5">
          {project.stageDescription}
        </p>

        {isLibrary ? (
          <div className="mt-3">
            <button
              type="button"
              className="text-[11px] font-medium text-slate-300 bg-[#141A27] border border-[#242D40] hover:bg-[#1C2538] hover:text-white px-3 py-1 rounded transition-colors"
            >
              Open library
            </button>
          </div>
        ) : (
          <div className="w-full h-1 bg-[#1C2436] rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isCompleted ? "bg-[#10B981]" : "bg-[#3B82F6]"
              }`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

