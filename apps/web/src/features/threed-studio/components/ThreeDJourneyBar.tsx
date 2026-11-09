import React from "react";
import { StudioJourneyBar } from "@/components/shared";

export function ThreeDJourneyBar(): React.ReactElement {
  return (
    <StudioJourneyBar
      currentStageId="threed"
      previousStage={{ label: "Motion", href: "/projects/proj-1/motion" }}
      nextStage={{ label: "Sound", isLocked: true }}
    />
  );
}
