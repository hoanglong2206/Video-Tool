import React from "react";
import { PipelineStageView } from "@/features/pipeline";

interface ThreeDPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectThreeDPage({
  params,
}: ThreeDPageProps): Promise<React.ReactElement> {
  const resolvedParams = await params;
  return (
    <PipelineStageView
      projectId={resolvedParams.id}
      stageId="3d"
      projectName="Aurora X1 Launch"
    />
  );
}
