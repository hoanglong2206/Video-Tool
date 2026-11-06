import React from "react";
import { StudioJourneyBar } from "@/components/shared";

export function ThreeDJourneyBar(): React.ReactElement {
  return (
    <StudioJourneyBar
      currentStageId="threed"
      previousStage={{ label: "Motion", href: "/editor" }}
      nextStage={{ label: "Sound", isLocked: true }}
    />
  );
}
