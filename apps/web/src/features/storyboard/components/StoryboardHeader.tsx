import React from "react";
import { Loader2 } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { StudioHeader } from "@/components/shared";

interface StoryboardHeaderProps {
  projectName: string;
  onPreview?: () => void;
  onReopenRevision?: () => void;
  onGenerateWithAi?: () => void;
  isGenerating?: boolean;
}

export function StoryboardHeader({
  projectName,
  onPreview,
  onReopenRevision,
  onGenerateWithAi,
  isGenerating = false,
}: StoryboardHeaderProps): React.ReactElement {
  return (
    <StudioHeader
      rootTitle={projectName}
      rootHref="/"
      subTitle="Storyboard Studio"
      badge={
        <Badge variant="success" className="ml-1">
          ✓ Synced with Supabase
        </Badge>
      }
    >
      <Button
        variant="default"
        size="sm"
        className="bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-sm transition-all"
        disabled={isGenerating}
        onClick={onGenerateWithAi}
      >
        {isGenerating ? (
          <span className="flex items-center gap-1.5">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Synthesizing AI Scenes</span>
          </span>
        ) : (
          "✨ Generate with AI"
        )}
      </Button>

      <Button variant="outline" size="sm" onClick={onPreview}>
        Preview storyboard
      </Button>

      <Button variant="outline" size="sm" onClick={onReopenRevision}>
        Reopen for revision
      </Button>
    </StudioHeader>
  );
}

