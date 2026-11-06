"use client";

import React from "react";
import { HardDrive, ShieldCheck, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { SchemaMode } from "@/features/pipeline";

interface StorageSchemaSectionProps {
  storageLocation: string;
  schemaMode: SchemaMode;
  autoCleanCache: boolean;
  onSetStorage: (loc: string) => void;
  onSetSchemaMode: (mode: SchemaMode) => void;
  onSetCleanCache: (val: boolean) => void;
}

const STORAGE_OPTIONS = [
  { id: "default", label: "Mặc định dự án (./storage) — Khuyên dùng" },
  { id: "d_drive", label: "Ổ D: Studio (D:\\IT\\DEMO\\video-ai-demo\\storage)" },
  { id: "nvme_fast", label: "Ổ NVMe Fast Cache (E:\\Cache\\Remotion_Scratch)" },
  { id: "s3_cloud", label: "MinIO / S3 Object Storage (Cloud Sync)" },
];

const SCHEMA_MODES: { id: SchemaMode; label: string; desc: string; badge: string }[] = [
  {
    id: "strict_v2",
    label: "STRICT CONTRACT V2",
    desc: "Tự động sửa lỗi cấu trúc và báo lỗi nếu vi phạm",
    badge: "Khuyên dùng",
  },
  {
    id: "permissive",
    label: "PERMISSIVE MODE",
    desc: "Bỏ qua các cảnh báo nhỏ, sinh video tối đa",
    badge: "Linh hoạt",
  },
  {
    id: "dev_debug",
    label: "DEV DEBUG MODE",
    desc: "Ghi log chi tiết từng trường JSON vào console",
    badge: "Debug",
  },
];

export function StorageSchemaSection({
  storageLocation,
  schemaMode,
  autoCleanCache,
  onSetStorage,
  onSetSchemaMode,
  onSetCleanCache,
}: StorageSchemaSectionProps): React.ReactElement {
  return (
    <div className="bg-[#101520] border border-[#1C2436] rounded-xl p-4 flex flex-col gap-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#1C2436]">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-emerald-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Lưu trữ & JSON Schema Validator
          </h2>
        </div>
        <span className="text-[10px] text-emerald-400 font-mono">
          Auto-repair Active
        </span>
      </div>

      {/* Storage Location (Select Dropdown) */}
      <div>
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
          Vị trí thư mục Storage
        </label>
        <Select value={storageLocation} onValueChange={onSetStorage}>
          <SelectTrigger className="h-8 bg-[#0B0F17] border-[#1E2638] text-xs">
            <SelectValue placeholder="Chọn vị trí lưu trữ" />
          </SelectTrigger>
          <SelectContent>
            {STORAGE_OPTIONS.map((opt) => (
              <SelectItem key={opt.id} value={opt.id}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Schema Validator Mode (Radio Cards) */}
      <div>
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Chế độ Schema Validator
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SCHEMA_MODES.map((mode) => {
            const isSelected = schemaMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => onSetSchemaMode(mode.id)}
                className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? "bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500/40"
                    : "bg-[#0E131E] border-[#1E2638] hover:border-slate-600"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[11px] font-bold ${isSelected ? "text-emerald-300" : "text-slate-200"}`}>
                      {mode.label}
                    </span>
                    <input
                      type="radio"
                      name="schemaMode"
                      checked={isSelected}
                      onChange={() => onSetSchemaMode(mode.id)}
                      className="accent-emerald-500 cursor-pointer w-3 h-3"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-2">
                    {mode.desc}
                  </p>
                </div>
                <span className="text-[9px] font-mono text-emerald-400/90 mt-1.5">
                  • {mode.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Auto-clean cache toggle switch */}
      <div className="pt-2 border-t border-[#1C2436]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trash2 className="w-3.5 h-3.5 text-slate-400" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-200 font-medium">
              Tự động dọn dẹp Cache tạm thời
            </span>
            <span className="text-[10px] text-slate-400">
              Xoá frame trung gian sau khi xuất video hoàn tất để tiết kiệm dung lượng
            </span>
          </div>
        </div>
        <Switch
          checked={autoCleanCache}
          onCheckedChange={onSetCleanCache}
        />
      </div>
    </div>
  );
}
