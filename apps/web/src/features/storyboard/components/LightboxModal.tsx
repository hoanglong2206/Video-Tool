"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

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
      <DialogContent className="max-w-4xl bg-[#090D15]/95 border-[#1E2638] p-2 rounded-2xl overflow-hidden shadow-2xl">
        <DialogTitle className="sr-only">Phóng to ảnh Storyboard Keyframe</DialogTitle>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center">
          <img
            src={imageUrl}
            alt="Storyboard Frame Fullscreen"
            className="w-full h-full object-contain"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
