import React from "react";
import { StudioJourneyBar } from "@/components/shared";

export function JourneySubheader(): React.ReactElement {
  return (
    <StudioJourneyBar
      currentStageId="storyboard"
      previousStage={{ label: "Direction", href: "/projects/new" }}
      nextStage={{ label: "Assets", href: "/projects/proj-1/assets" }}
    />
  );
}


