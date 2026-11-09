"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { dashboardService } from "@/services/dashboard";
import {
  PipelineStageView,
  getProjectCurrentStageId,
  type PipelineStageId,
} from "@/features/pipeline";

export default function ProjectWorkflowPage(): React.ReactElement {
  const params = useParams();
  const projectId = (params?.id as string) || "proj-1";

  const { data } = useQuery({
    queryKey: QUERY_KEYS.dashboard.stats(),
    queryFn: () => dashboardService.getOverview(),
  });

  const project = data?.projects?.find((p) => p.id === projectId);

  const activeStageId: PipelineStageId = useMemo(() => {
    if (project) {
      return getProjectCurrentStageId(project);
    }
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(`video_tool_project_stage_${projectId}`);
      if (cached) return cached as PipelineStageId;
    }
    return "storyboard";
  }, [project, projectId]);

  return (
    <PipelineStageView
      projectId={projectId}
      stageId={activeStageId}
      projectName={project?.name || "Aurora X1 Launch"}
    />
  );
}
