import React from "react";
import type { TimelineTrack } from "../types";

interface TimelineRulerProps {
  tracks: TimelineTrack[];
  currentTimeSec: number;
  onScrub?: (sec: number) => void;
}

const SECONDS = ["0s", "1s", "2s", "3s", "4s", "5s", "6s"];

export function TimelineRuler({
  tracks,
  currentTimeSec,
  onScrub,
}: TimelineRulerProps): React.ReactElement {
  const percent = Math.min(100, Math.max(0, (currentTimeSec / 6) * 100));

  return (
    <div className="h-44 border-t border-[#1E2638] bg-[#0A0E17] p-4 flex flex-col justify-between shrink-0 select-none relative">
      {/* Timeline Header & Time Scale */}
      <div className="flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-slate-400 uppercase tracking-wider">
            Timeline
          </h2>
          <span className="font-mono text-xs text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
            {currentTimeSec.toFixed(2)}s / 6.00s
          </span>
        </div>

        <div className="flex items-center gap-6 font-mono text-slate-500 text-[10px]">
          {SECONDS.map((sec) => (
            <span key={sec}>{sec}</span>
          ))}
        </div>
      </div>

      {/* Multi-track Bars Area */}
      <div
        className="flex flex-col gap-2 mt-2 relative cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left - 96; // 96px offset for track label
          const trackWidth = rect.width - 96;
          if (trackWidth > 0 && onScrub) {
            const sec = Math.max(0, Math.min(6, (clickX / trackWidth) * 6));
            onScrub(sec);
          }
        }}
      >
        {/* Playhead Scrubber Vertical Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-red-500 z-20 pointer-events-none shadow-[0_0_8px_rgba(239,68,68,0.8)]"
          style={{ left: `calc(96px + (100% - 96px) * ${percent / 100})` }}
        >
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full -ml-[4px] -mt-1 shadow-sm" />
        </div>

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

