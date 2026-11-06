import React from "react";
import type { ProjectItem } from "../types";
import { Button, Progress, Card } from "@/components/ui";
import { StatusBadge } from "@/components/shared";

interface ProjectCardProps {
  project: ProjectItem;
  onOpen?: (project: ProjectItem) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps): React.ReactElement {
  const isLibrary = project.status === "library";
  const isCompleted = project.status === "completed";

  return (
    <Card
      onClick={() => onOpen?.(project)}
      className="bg-[#101520] border-[#1C2436] hover:border-[#28354D] p-3 flex flex-col justify-between transition-all cursor-pointer group rounded-lg"
    >
      {/* Aspect Ratio Video / Asset Preview Placeholder */}
      <div className="w-full aspect-[16/9] rounded-md bg-[#131926] border border-[#1A2234] flex items-center justify-center p-3 select-none relative">
        <span className="text-xs text-slate-400 group-hover:text-slate-300 font-medium tracking-wide text-center">
          {project.name}
        </span>
        <div className="absolute top-2 right-2">
          <StatusBadge status={project.status} />
        </div>
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
            <Button
              variant="outline"
              size="sm"
              className="text-[11px] h-7 px-3 py-1 text-slate-300"
            >
              Open library
            </Button>
          </div>
        ) : (
          <div className="mt-3">
            <Progress
              value={project.progress}
              className={`h-1 ${isCompleted ? "[&>div]:bg-emerald-500" : "[&>div]:bg-blue-500"}`}
            />
          </div>
        )}
      </div>
    </Card>
  );
}
