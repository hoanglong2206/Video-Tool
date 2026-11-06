import React from "react";
import { StudioJourneyBar } from "@/components/shared";

export function RenderPipelineNav(): React.ReactElement {
  return (
    <StudioJourneyBar
      currentStageId="render"
      previousStage={{ label: "Sound", href: "/editor" }}
      nextStage={{ label: "Export", isLocked: true }}
    />
  );
}


