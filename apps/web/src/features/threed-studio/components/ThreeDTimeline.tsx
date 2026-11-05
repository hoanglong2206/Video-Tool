import React from "react";
import type { ThreeDTimelineTrack } from "../types";

interface ThreeDTimelineProps {
  tracks: ThreeDTimelineTrack[];
}

export function ThreeDTimeline({ tracks }: ThreeDTimelineProps): React.ReactElement {
  return (
    <div className="h-36 border-t border-[#1E2638] bg-[#0A0E17] p-4 flex flex-col justify-between shrink-0 select-none">
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
        3D Animation Timeline
      </h2>

      <div className="flex flex-col gap-2">
        {tracks.map((track) => (
          <div key={track.id} className="flex items-center text-xs">
            {/* Track Name */}
            <span className="w-20 text-slate-400 text-[11px] shrink-0 font-medium">
              {track.name}
            </span>

            {/* Track Bar Channel */}
            <div className="flex-1 h-5 rounded bg-[#101520] border border-[#1C2436] relative overflow-hidden flex items-center">
              <div
                className={`h-full rounded ${track.colorClass}`}
                style={{
                  marginLeft: `${track.startPercent}%`,
                  width: `${track.durationPercent}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
