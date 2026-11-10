import React from "react";

interface PropertyExplainerProps {
  badge?: string;
  badgeColor?: "indigo" | "cyan" | "blue" | "slate";
  text: string;
}

export function PropertyExplainer({
  badge,
  badgeColor = "indigo",
  text,
}: PropertyExplainerProps): React.ReactElement {
  const colorMap = {
    indigo: "text-indigo-300 bg-indigo-950/60 border-indigo-800/60",
    cyan: "text-cyan-300 bg-cyan-950/60 border-cyan-800/60",
    blue: "text-blue-300 bg-blue-950/60 border-blue-800/60",
    slate: "text-slate-200 bg-slate-900 border-slate-700",
  };

  return (
    <div className="mt-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-[#070B14] to-[#0A101E] border border-[#172238] flex items-center gap-2 text-[10px] leading-relaxed shadow-xs">
      <span className="text-[11px] shrink-0 leading-none">💡</span>
      <div className="flex-1 min-w-0 flex items-center gap-1.5 flex-wrap">
        {badge && (
          <span className={`font-mono text-[9px] px-1 py-0.2 rounded border font-semibold shrink-0 ${colorMap[badgeColor]}`}>
            {badge}
          </span>
        )}
        <span className="text-slate-300/90 truncate">{text}</span>
      </div>
    </div>
  );
}
