import React from "react";
import type { TimelineTrack } from "../types";

interface TimelineRulerProps {
  tracks: TimelineTrack[];
  currentTimeSec: number;
}

const SECONDS = ["0s", "1s", "2s", "3s", "4s", "5s", "6s"];

export function TimelineRuler({
  tracks,
  currentTimeSec,
}: TimelineRulerProps): React.ReactElement {
  return (
    <div className="h-44 border-t border-[#1E2638] bg-[#0A0E17] p-4 flex flex-col justify-between shrink-0 select-none">
      {/* Timeline Header & Time Scale */}
      <div className="flex items-center justify-between text-[11px]">
        <h2 className="font-semibold text-slate-400 uppercase tracking-wider">
          Timeline
        </h2>

        <div className="flex items-center gap-6 font-mono text-slate-500 text-[10px]">
          {SECONDS.map((sec) => (
            <span key={sec}>{sec}</span>
          ))}
        </div>
      </div>

      {/* Multi-track Bars */}
      <div className="flex flex-col gap-2 mt-2">
        {tracks.map((track) => (
          <div key={track.id} className="flex items-center text-xs">
            {/* Track Name */}
            <span className="w-24 text-slate-400 text-[11px] shrink-0 font-medium">
              {track.name}
            </span>

            {/* Track Timeline Area (6 seconds total width) */}
            <div className="flex-1 h-5 rounded bg-[#101520] border border-[#1C2436] relative overflow-hidden flex items-center">
              {/* Active Clip Bar */}
              <div
                className={`h-full rounded ${track.colorClass} relative flex items-center`}
                style={{
                  marginLeft: `${(track.startSec / 6) * 100}%`,
                  width: `${(track.durationSec / 6) * 100}%`,
                }}
              >
                {/* Diamond Keyframes */}
                {track.keyframes.map((kf, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white rotate-45 shadow-sm transform -translate-x-1/2"
                    style={{
                      left: `${((kf - track.startSec) / track.durationSec) * 100}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

