import React from "react";
import type { ExecutionLogEntry } from "../types";

interface ExecutionLogPanelProps {
  logs: ExecutionLogEntry[];
}

export function ExecutionLogPanel({
  logs,
}: ExecutionLogPanelProps): React.ReactElement {
  return (
    <section className="flex flex-col mt-6 pt-4 border-t border-[#1C2436]/60">
      <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Execution Log
      </h2>

      <div className="flex flex-col gap-2 font-mono text-[11px] text-slate-400">
        {logs.map((log) => (
          <div key={log.id} className="flex items-center gap-2">
            <span className="text-slate-500">{log.timestamp}</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300 font-medium">{log.stageLabel}</span>
            <span className="text-slate-600">·</span>
            <span>{log.message}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

