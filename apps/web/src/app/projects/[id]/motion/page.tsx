import React from "react";
import { PipelineStageView } from "@/features/pipeline";

interface MotionPageProps {
  params: Promise<{ id: string }>;
}

export default async function MotionPage({
  params,
}: MotionPageProps): Promise<React.ReactElement> {
  const resolvedParams = await params;
  return (
    <PipelineStageView
      projectId={resolvedParams.id}
      stageId="motion"
      projectName="Aurora X1 Launch"
    />
  );
}

