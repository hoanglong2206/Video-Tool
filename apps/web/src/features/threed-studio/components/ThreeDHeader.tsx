"use client";

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
  isApproving?: boolean;
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
  isApproving = false,
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
        disabled={isApproving || isApproved}
        onClick={onApproveScene}
        className="flex items-center gap-1.5 min-w-[120px] justify-center cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed"
      >
        {isApproving ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Đang duyệt...</span>
          </>
        ) : isApproved ? (
          <span>✓ Đã duyệt 3D</span>
        ) : (
          <span>Approve 3D scene</span>
        )}
      </Button>
    </StudioHeader>
  );
}
