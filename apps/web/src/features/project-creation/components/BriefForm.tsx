import React from "react";
import type { ProjectBriefFormData } from "../types";

interface BriefFormProps {
  formData: ProjectBriefFormData;
  onChangeField: (field: keyof ProjectBriefFormData, value: string) => void;
}

export function BriefForm({
  formData,
  onChangeField,
}: BriefFormProps): React.ReactElement {
  return (
    <div className="flex-1 flex flex-col gap-5 p-6 overflow-y-auto">
      {/* Row 1: Project Name & Client */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
            Project name
          </label>
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => onChangeField("projectName", e.target.value)}
            className="w-full h-9 rounded-md bg-[#101520] border border-[#1C2436] px-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
            Client
          </label>
          <input
            type="text"
            value={formData.client}
            onChange={(e) => onChangeField("client", e.target.value)}
            className="w-full h-9 rounded-md bg-[#101520] border border-[#1C2436] px-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>
      </div>

      {/* Row 2: Brief Textarea */}
      <div>
        <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
          Brief
        </label>
        <textarea
          rows={4}
          value={formData.brief}
          onChange={(e) => onChangeField("brief", e.target.value)}
          className="w-full rounded-md bg-[#101520] border border-[#1C2436] p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] transition-colors resize-none leading-relaxed"
        />
      </div>

      {/* Row 3: Asset Dropzones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-24 rounded-lg bg-[#101520] border border-dashed border-[#242D40] hover:border-slate-500 flex items-center justify-center text-xs text-slate-400 cursor-pointer transition-colors p-3 text-center">
          Drop product images
        </div>
        <div className="h-24 rounded-lg bg-[#101520] border border-dashed border-[#242D40] hover:border-slate-500 flex items-center justify-center text-xs text-slate-400 cursor-pointer transition-colors p-3 text-center">
          Drop logo & brand assets
        </div>
        <div className="h-24 rounded-lg bg-[#101520] border border-dashed border-[#242D40] hover:border-slate-500 flex items-center justify-center text-xs text-slate-400 cursor-pointer transition-colors p-3 text-center">
          Add reference videos
        </div>
      </div>

      {/* Row 4: Duration, Aspect Ratio, Style Preference */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
            Duration
          </label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) => onChangeField("duration", e.target.value)}
            className="w-full h-9 rounded-md bg-[#101520] border border-[#1C2436] px-3 text-xs text-slate-100 focus:outline-none focus:border-[#3B82F6]"
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
            Aspect ratio
          </label>
          <input
            type="text"
            value={formData.aspectRatio}
            onChange={(e) => onChangeField("aspectRatio", e.target.value)}
            className="w-full h-9 rounded-md bg-[#101520] border border-[#1C2436] px-3 text-xs text-slate-100 focus:outline-none focus:border-[#3B82F6]"
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
            Style preference
          </label>
          <input
            type="text"
            value={formData.stylePreference}
            onChange={(e) => onChangeField("stylePreference", e.target.value)}
            className="w-full h-9 rounded-md bg-[#101520] border border-[#1C2436] px-3 text-xs text-slate-100 focus:outline-none focus:border-[#3B82F6]"
          />
        </div>
      </div>

      {/* Row 5: Brand Colors & Typeface */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Brand Colors
        </label>
        <div className="flex items-center gap-2">
          {formData.brandColors.map((color, idx) => (
            <div
              key={idx}
              className="w-6 h-6 rounded border border-slate-700 shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
          <span className="text-xs text-slate-400 ml-2">
            Typeface: {formData.typeface}
          </span>
        </div>
      </div>
    </div>
  );
}

