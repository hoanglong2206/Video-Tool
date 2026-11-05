import React from "react";
import Link from "next/link";
import { Badge, Button } from "@/components/ui";

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
    <header className="h-14 border-b border-[#1E2638] px-6 flex items-center justify-between bg-[#0B0F17] select-none">
      {/* Breadcrumb with Status */}
      <div className="flex items-center gap-2.5 text-xs">
        <Link
          href="/"
          className="font-medium text-slate-100 hover:text-white transition-colors"
        >
          {projectName}
        </Link>
        <span className="text-slate-600">/</span>
        <span className="text-slate-300 font-normal">{sceneTitle}</span>
        {isApproved ? (
          <Badge variant="success" className="ml-1">
            ✓ Approved
          </Badge>
        ) : (
          <Badge variant="secondary" className="ml-1 text-[10px] px-2.5">
            - Pending · needs Motion approved
          </Badge>
        )}
      </div>

      {/* 3D Action Controls */}
      <div className="flex items-center gap-2.5">
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
      </div>
    </header>
  );
}

