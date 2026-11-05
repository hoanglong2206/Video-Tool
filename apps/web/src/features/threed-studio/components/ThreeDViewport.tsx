import React from "react";
import type { Camera3DSettings } from "../types";

interface ThreeDViewportProps {
  camera: Camera3DSettings;
}

export function ThreeDViewport({ camera }: ThreeDViewportProps): React.ReactElement {
  return (
    <div className="flex-1 bg-[#090D16] p-6 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Top Left Camera Meta */}
      <div className="text-[11px] text-slate-400 font-mono tracking-wide z-10">
        Perspective · {camera.focalLengthMm} mm · {camera.aperture}
      </div>

      {/* 3D Staging Viewport with Perspective Grid */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Subtle Perspective Grid Lines */}
        <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(to_right,#1E2638_1px,transparent_1px),linear-gradient(to_bottom,#1E2638_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(65deg)] opacity-40" />

        {/* 3D Mesh Representation (Headphones.glb) with PBR Metallic Shader Look */}
        <div className="w-28 h-44 rounded-[2.5rem] bg-gradient-to-tr from-[#1E293B] via-[#64748B] to-[#0F172A] border border-[#3B82F6] shadow-[0_0_40px_rgba(59,130,246,0.25)] flex items-center justify-center relative z-10 cursor-grab active:cursor-grabbing">
          <div className="w-24 h-40 rounded-[2.2rem] bg-gradient-to-b from-white/10 via-transparent to-black/40" />
        </div>
      </div>

      <div />
    </div>
  );
}

