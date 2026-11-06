import React from "react";
import { Badge, Button } from "@/components/ui";
import { StudioHeader } from "@/components/shared";

interface ThreeDHeaderProps {
  projectName: string;
  sceneTitle: string;
  isOrbitMode: boolean;
  isRendering: boolean;
  isApproved: boolean;
  onToggleOrbit: () => void;
  onRenderPreview: () => void;
  onApproveScene: () => void;
}

export function ThreeDHeader({
  projectName,
  sceneTitle,
  isOrbitMode,
  isRendering,
  isApproved,
  onToggleOrbit,
  onRenderPreview,
  onApproveScene,
}: ThreeDHeaderProps): React.ReactElement {
  return (
    <StudioHeader
      rootTitle={projectName}
      rootHref="/"
      subTitle={sceneTitle}
      badge={
        isApproved ? (
          <Badge variant="success" className="ml-1">
            ✓ Approved
          </Badge>
        ) : (
          <Badge variant="secondary" className="ml-1 text-[10px] px-2.5">
            - Pending · needs Motion approved
          </Badge>
        )
      }
    >
      <Button
        variant={isOrbitMode ? "secondary" : "outline"}
        size="sm"
        onClick={onToggleOrbit}
      >
        Orbit
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onRenderPreview}
        disabled={isRendering}
      >
        {isRendering ? "Rendering..." : "Render preview"}
      </Button>

      <Button
        variant="subtle"
        size="sm"
        onClick={onApproveScene}
      >
        Approve 3D scene
      </Button>
    </StudioHeader>
  );
}


