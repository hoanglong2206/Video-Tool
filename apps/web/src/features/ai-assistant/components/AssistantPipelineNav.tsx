import React from "react";
import { StudioJourneyBar } from "@/components/shared";

export function AssistantPipelineNav(): React.ReactElement {
  return (
    <StudioJourneyBar
      currentStageId="motion"
      previousStage={{ label: "Composition", href: "/workflow" }}
      nextStage={{ label: "3D (optional)", isLocked: true }}
    />
  );
}


