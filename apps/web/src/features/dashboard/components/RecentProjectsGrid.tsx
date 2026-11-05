import React from "react";
import type { ProjectItem } from "../types";
import { ProjectCard } from "./ProjectCard";

interface RecentProjectsGridProps {
  projects: ProjectItem[];
  onOpenProject?: (project: ProjectItem) => void;
}

export function RecentProjectsGrid({
  projects,
  onOpenProject,
}: RecentProjectsGridProps): React.ReactElement {
  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Recent Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={onOpenProject}
          />
        ))}
      </div>
    </section>
  );
}

