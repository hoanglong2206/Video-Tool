"use client";

import React, { useState } from "react";
import { Activity, Cpu, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type ChartMetric = "throughput" | "latency" | "render_fps";

interface DataPoint {
  label: string;
  throughput: number; // in scenes/hr
  latency: number; // in seconds
  renderFps: number; // in fps
}

const WEEKLY_DATA: DataPoint[] = [
  { label: "T2", throughput: 28, latency: 1.8, renderFps: 48 },
  { label: "T3", throughput: 42, latency: 1.5, renderFps: 55 },
  { label: "T4", throughput: 36, latency: 1.6, renderFps: 52 },
  { label: "T5", throughput: 64, latency: 1.2, renderFps: 60 },
  { label: "T6", throughput: 55, latency: 1.3, renderFps: 58 },
  { label: "T7", throughput: 82, latency: 1.1, renderFps: 62 },
  { label: "CN", throughput: 95, latency: 1.0, renderFps: 65 },
];

export function AnalysisChart(): React.ReactElement {
  const [activeMetric, setActiveMetric] = useState<ChartMetric>("throughput");

  // Determine current min/max for dynamic SVG scaling
  const values = WEEKLY_DATA.map((d) =>
    activeMetric === "throughput"
      ? d.throughput
      : activeMetric === "latency"
      ? d.latency
      : d.renderFps
  );
  const minVal = Math.min(...values) * 0.85;
  const maxVal = Math.max(...values) * 1.1;
  const range = maxVal - minVal || 1;

  // Chart SVG coordinates
  const width = 500;
  const height = 120;
  const paddingX = 30;
  const paddingY = 15;

  const points = WEEKLY_DATA.map((d, index) => {
    const val =
      activeMetric === "throughput"
        ? d.throughput
        : activeMetric === "latency"
        ? d.latency
        : d.renderFps;
    const x = paddingX + (index / (WEEKLY_DATA.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - ((val - minVal) / range) * (height - 2 * paddingY);
    return { x, y, val, label: d.label };
  });

  // Construct SVG smooth cubic bezier path
  const linePath = points.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[i - 1];
    const cx1 = prev.x + (pt.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (pt.x - prev.x) / 2;
    const cy2 = pt.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`;
  }, "");

  // Area path closing at baseline
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div className="bg-[#101520] border border-[#1C2436] rounded-lg p-3 flex flex-col justify-between shrink-0 h-[205px] select-none">
      {/* Header with Title and Metric Switcher */}
      <div className="flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-blue-950/80 border border-blue-800/40 flex items-center justify-center text-blue-400">
            <Activity className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
              Phân tích hiệu suất AI & Render
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40">
                <TrendingUp className="w-2.5 h-2.5" /> +18.4%
              </span>
            </h2>
          </div>
        </div>

        {/* Metric Tabs */}
        <div className="flex items-center gap-1 bg-[#0A0E17] p-0.5 rounded-md border border-[#1E2638]">
          <button
            onClick={() => setActiveMetric("throughput")}
            className={cn(
              "text-[10px] px-2 py-0.5 rounded font-medium transition-all cursor-pointer",
              activeMetric === "throughput"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            Thông lượng
          </button>
          <button
            onClick={() => setActiveMetric("render_fps")}
            className={cn(
              "text-[10px] px-2 py-0.5 rounded font-medium transition-all cursor-pointer",
              activeMetric === "render_fps"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            Render FPS
          </button>
          <button
            onClick={() => setActiveMetric("latency")}
            className={cn(
              "text-[10px] px-2 py-0.5 rounded font-medium transition-all cursor-pointer",
              activeMetric === "latency"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            Độ trễ AI
          </button>
        </div>
      </div>

      {/* SVG Interactive Area Chart */}
      <div className="relative flex-1 min-h-0 w-full my-1 flex items-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>

          {/* Background Grid Lines */}
          {[0.25, 0.5, 0.75].map((pct, idx) => (
            <line
              key={idx}
              x1={paddingX}
              y1={paddingY + pct * (height - 2 * paddingY)}
              x2={width - paddingX}
              y2={paddingY + pct * (height - 2 * paddingY)}
              stroke="#1C2436"
              strokeDasharray="3 3"
              strokeWidth="0.8"
            />
          ))}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#chartGradient)" />

          {/* Line Stroke */}
          <path
            d={linePath}
            fill="none"
            stroke="url(#lineStroke)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((pt, i) => (
            <g key={i} className="group cursor-pointer">
              <circle
                cx={pt.x}
                cy={pt.y}
                r="3.5"
                className="fill-cyan-400 stroke-[#0B0F17] stroke-2 group-hover:r-5 transition-all"
              />
              <text
                x={pt.x}
                y={height - 2}
                textAnchor="middle"
                className="text-[9px] fill-slate-500 font-mono select-none"
              >
                {pt.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Bottom KPI Indicators */}
      <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#1C2436]/60 shrink-0">
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-400">Tốc độ sinh AI</span>
          <span className="text-xs font-semibold text-slate-100 font-mono">1.1s / prompt</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-400">Throughput Remotion</span>
          <span className="text-xs font-semibold text-cyan-400 font-mono">65 FPS (4K)</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-400">GPU VRAM</span>
          <span className="text-xs font-semibold text-slate-100 font-mono">14.8 / 24 GB</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-400">Tỷ lệ hoàn thành</span>
          <span className="text-xs font-semibold text-emerald-400 font-mono">99.4%</span>
        </div>
      </div>
    </div>
  );
}

