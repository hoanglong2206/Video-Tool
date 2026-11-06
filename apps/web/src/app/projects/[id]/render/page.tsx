import React from "react";
import { PipelineStageView } from "@/features/pipeline";

interface RenderPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectRenderPage({
  params,
}: RenderPageProps): Promise<React.ReactElement> {
  const resolvedParams = await params;
  return (
    <PipelineStageView
      projectId={resolvedParams.id}
      stageId="render"
      projectName="Aurora X1 Launch"
    />
  );
}
