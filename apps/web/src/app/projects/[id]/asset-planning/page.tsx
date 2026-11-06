import React from "react";
import { PipelineStageView } from "@/features/pipeline";

interface AssetPlanningPageProps {
  params: Promise<{ id: string }>;
}

export default async function AssetPlanningPage({
  params,
}: AssetPlanningPageProps): Promise<React.ReactElement> {
  const resolvedParams = await params;
  return (
    <PipelineStageView
      projectId={resolvedParams.id}
      stageId="asset-planning"
      projectName="Aurora X1 Launch"
    />
  );
}

