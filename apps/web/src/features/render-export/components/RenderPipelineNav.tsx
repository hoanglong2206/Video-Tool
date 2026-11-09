import React from "react";
import { StudioJourneyBar } from "@/components/shared";

export function RenderPipelineNav(): React.ReactElement {
  return (
    <StudioJourneyBar
      currentStageId="render"
      previousStage={{ label: "Sound", href: "/projects/proj-1/sound" }}
      nextStage={{ label: "Export", isLocked: true }}
    />
  );
}


