"use client";

import React from "react";
import { Brain, Eye, Wand2, CheckCircle2, Loader2, Sparkles, ShieldCheck } from "lucide-react";

interface AiPipelineProcessingViewProps {
  activeStage: number; // 1 to 4
}

const STAGES = [
  {
    stage: 1,
    name: "LLM (Large Language Model)",
    desc: "Phân tích yêu cầu, bóc tách thông điệp cốt lõi, insight khách hàng & cấu trúc 6 phân cảnh",
    icon: Brain,
    color: "from-blue-600 to-indigo-600",
  },
  {
    stage: 2,
    name: "Vision AI Engine",
    desc: "Phân tích hình ảnh & Logo khách hàng, trích xuất bảng màu HEX, nhận diện phong cách ánh sáng & vật liệu",
    icon: Eye,
    color: "from-cyan-600 to-blue-600",
  },
  {
    stage: 3,
    name: "Prompt Builder Core",
    desc: "Chuẩn hóa brief thành chuỗi visual prompt chi tiết cho từng Scene theo chuẩn Remotion & Blender",
    icon: Wand2,
    color: "from-purple-600 to-indigo-600",
  },
  {
    stage: 4,
    name: "JSON Schema Validator",
    desc: "Kiểm tra cấu trúc đầu ra (ProjectSpec.v2.json), xác thực 24 trường thông số kỹ thuật sản xuất",
    icon: ShieldCheck,
    color: "from-emerald-600 to-teal-600",
  },
];

export function AiPipelineProcessingView({
  activeStage,
}: AiPipelineProcessingViewProps): React.ReactElement {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 select-none max-w-3xl mx-auto w-full">
      {/* Central Pulsing Icon */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/30 animate-pulse">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-2xl blur-lg opacity-40 animate-pulse" />
      </div>

      <h2 className="text-lg font-bold text-slate-100 text-center mb-1">
        Hệ thống Đa tác vụ AI đang phân tích & trích xuất dữ liệu
      </h2>
      <p className="text-xs text-slate-400 text-center max-w-md mb-8">
        Đang khởi chạy đồng thời mô hình ngôn ngữ lớn, thị giác máy tính và bộ kiểm định schema để tạo ra Brief chuẩn hóa.
      </p>

      {/* 4 Pipeline Stages Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 w-full">
        {STAGES.map((s) => {
          const Icon = s.icon;
          const isDone = activeStage > s.stage;
          const isRunning = activeStage === s.stage;

          return (
            <div
              key={s.stage}
              className={`p-4 rounded-xl border transition-all ${
                isRunning
                  ? "bg-[#141B29] border-blue-500 shadow-[0_0_15px_-3px_rgba(59,130,246,0.25)] scale-[1.02]"
                  : isDone
                  ? "bg-[#0E131E] border-emerald-900/60"
                  : "bg-[#0A0D15] border-[#1C2436]/60 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${s.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-100">
                    {s.name}
                  </h3>
                </div>

                {isDone ? (
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Hoàn tất
                  </span>
                ) : isRunning ? (
                  <span className="text-[10px] text-blue-400 font-mono flex items-center gap-1 font-semibold animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang chạy...
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-600 font-mono">Chờ</span>
                )}
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

