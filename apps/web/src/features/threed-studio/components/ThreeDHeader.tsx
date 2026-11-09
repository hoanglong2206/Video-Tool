import React from "react";
import { Loader2 } from "lucide-react";
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
        {isRendering ? (
          <span className="flex items-center gap-1.5">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>Rendering</span>
          </span>
        ) : (
          "Render preview"
        )}
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


