import React from "react";
import { PipelineStageView } from "@/features/pipeline";

interface SoundPageProps {
  params: Promise<{ id: string }>;
}

export default async function SoundPage({
  params,
}: SoundPageProps): Promise<React.ReactElement> {
  const resolvedParams = await params;
  return (
    <PipelineStageView
      projectId={resolvedParams.id}
      stageId="sound"
      projectName="Aurora X1 Launch"
    />
  );
}

