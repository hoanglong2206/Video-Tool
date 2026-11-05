import React from "react";
import type { TemplateItem } from "../types";

interface TemplatesGridProps {
  sceneTemplates: TemplateItem[];
  motionPresets: TemplateItem[];
  selectedTemplateId: string;
  onSelectTemplate: (id: string) => void;
}

export function TemplatesGrid({
  sceneTemplates,
  motionPresets,
  selectedTemplateId,
  onSelectTemplate,
}: TemplatesGridProps): React.ReactElement {
  return (
    <main className="flex-1 bg-[#090D14] p-6 overflow-y-auto">
      {/* SCENE TEMPLATES */}
      <section className="mb-8">
        <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Scene Templates
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {sceneTemplates.map((template) => {
            const isSelected = template.id === selectedTemplateId;
            return (
              <div
                key={template.id}
                onClick={() => onSelectTemplate(template.id)}
                className={`aspect-[16/10] rounded-xl flex items-center justify-center p-4 cursor-pointer transition-all border ${
                  isSelected
                    ? "bg-[#111726] border-[#3B82F6] shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]"
                    : "bg-[#0F1420] border-[#1C2537] hover:border-[#2C3B56] hover:bg-[#131A2A]"
                }`}
              >
                <span className="text-xs font-medium text-slate-300">
                  {template.title}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* MOTION & TRANSITION PRESETS */}
      <section>
        <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Motion & Transition Presets
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {motionPresets.map((preset) => {
            const isSelected = preset.id === selectedTemplateId;
            return (
              <div
                key={preset.id}
                onClick={() => onSelectTemplate(preset.id)}
                className={`aspect-[16/8] rounded-xl flex items-center justify-center p-4 cursor-pointer transition-all border ${
                  isSelected
                    ? "bg-[#111726] border-[#3B82F6] shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]"
                    : "bg-[#0F1420] border-[#1C2537] hover:border-[#2C3B56] hover:bg-[#131A2A]"
                }`}
              >
                <span className="text-xs font-medium text-slate-300">
                  {preset.title}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

