"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface LightboxModalProps {
  isOpen: boolean;
  imageUrl: string | null;
  onClose: () => void;
}

export function LightboxModal({
  isOpen,
  imageUrl,
  onClose,
}: LightboxModalProps): React.ReactElement | null {
  if (!imageUrl) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl bg-black/95 border border-[#1E2638] p-0 rounded-2xl overflow-hidden shadow-2xl [&>button]:z-30 [&>button]:text-white [&>button]:bg-black/70 [&>button]:hover:bg-black [&>button]:p-1.5 [&>button]:rounded-full [&>button]:right-3 [&>button]:top-3 [&>button]:border [&>button]:border-white/20 cursor-pointer">
        <DialogTitle className="sr-only">Phóng to ảnh Storyboard Keyframe</DialogTitle>
        <div className="w-full aspect-video flex items-center justify-center bg-black/90 p-1">
          <img
            src={imageUrl}
            alt="Storyboard Frame Fullscreen"
            className="w-full h-full object-contain select-none"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
