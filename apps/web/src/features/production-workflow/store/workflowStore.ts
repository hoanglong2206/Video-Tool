import { create } from "zustand";
import type { PipelineStage, ExecutionLogEntry } from "@/services/workflow";

interface WorkflowState {
  stages: PipelineStage[];
  selectedStageId: string;
  logs: ExecutionLogEntry[];
  overallProgress: number;
  isAdvancing: boolean;
  setStages: (stages: PipelineStage[]) => void;
  updateStage: (stageId: string, updates: Partial<PipelineStage>) => void;
  setSelectedStageId: (stageId: string) => void;
  setLogs: (logs: ExecutionLogEntry[]) => void;
  addLog: (log: ExecutionLogEntry) => void;
  setOverallProgress: (progress: number) => void;
  setIsAdvancing: (advancing: boolean) => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  stages: [],
  selectedStageId: "",
  logs: [],
  overallProgress: 0,
  isAdvancing: false,
  setStages: (stages) =>
    set((state) => ({
      stages,
      selectedStageId: state.selectedStageId || stages[0]?.id || "",
    })),
  updateStage: (stageId, updates) =>
    set((state) => ({
      stages: state.stages.map((s) => (s.id === stageId ? { ...s, ...updates } : s)),
    })),
  setSelectedStageId: (selectedStageId) => set({ selectedStageId }),
  setLogs: (logs) => set({ logs }),
  addLog: (log) => set((state) => ({ logs: [log, ...state.logs] })),
  setOverallProgress: (overallProgress) => set({ overallProgress }),
  setIsAdvancing: (isAdvancing) => set({ isAdvancing }),
}));
