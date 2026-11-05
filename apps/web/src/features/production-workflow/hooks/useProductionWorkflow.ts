import { useState } from "react";
import type { PipelineStage, ExecutionLogEntry } from "../types";

const INITIAL_STAGES: PipelineStage[] = [
  { id: "stage-01", stageNumber: "01", name: "Brief analysis", status: "approved" },
  { id: "stage-02", stageNumber: "02", name: "Storyboard", status: "approved" },
  { id: "stage-03", stageNumber: "03", name: "Asset generation", status: "approved" },
  { id: "stage-04", stageNumber: "04", name: "Asset processing", status: "approved" },
  {
    id: "stage-05",
    stageNumber: "05",
    name: "Scene composition",
    status: "waiting_approval",
    dependsOn: "Stage 04 · Asset processing (approved)",
    approvalHistory: "v2 revision requested · v3 awaiting review",
    hasPreview: true,
  },
  {
    id: "stage-06",
    stageNumber: "06",
    name: "Motion design",
    status: "running",
    progressPercent: 62,
    dependsOn: "Stage 05 · Scene composition",
  },
  { id: "stage-07", stageNumber: "07", name: "3D production", status: "skipped" },
  { id: "stage-08", stageNumber: "08", name: "Sound design", status: "pending" },
  { id: "stage-09", stageNumber: "09", name: "Render & post", status: "pending" },
  { id: "stage-10", stageNumber: "10", name: "QC & export", status: "pending" },
];

const INITIAL_LOGS: ExecutionLogEntry[] = [
  {
    id: "log-1",
    timestamp: "14:02",
    stageLabel: "Stage 06",
    message: "Generating keyframes for scene 03",
  },
  {
    id: "log-2",
    timestamp: "14:01",
    stageLabel: "Stage 05",
    message: "Composition ready for review (6 scenes)",
  },
  {
    id: "log-3",
    timestamp: "13:48",
    stageLabel: "Stage 04",
    message: "Masks and depth maps approved",
  },
];

export function useProductionWorkflow(projectName: string = "Aurora X1 Launch") {
  const [stages, setStages] = useState<PipelineStage[]>(INITIAL_STAGES);
  const [selectedStageId, setSelectedStageId] = useState<string>("stage-05");
  const [logs, setLogs] = useState<ExecutionLogEntry[]>(INITIAL_LOGS);
  const [overallProgress] = useState<number>(46);

  const selectedStage =
    stages.find((s) => s.id === selectedStageId) || stages[4];

  const handleApprove = (stageId: string): void => {
    setStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, status: "approved" } : s))
    );
    setLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: "Just now",
        stageLabel: selectedStage.stageNumber,
        message: `${selectedStage.name} approved by Creative Director`,
      },
      ...prev,
    ]);
  };

  const handleRequestRevision = (stageId: string): void => {
    setLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: "Just now",
        stageLabel: selectedStage.stageNumber,
        message: `Revision requested for ${selectedStage.name}`,
      },
      ...prev,
    ]);
  };

  return {
    projectName,
    overallProgress,
    stages,
    selectedStage,
    logs,
    setSelectedStageId,
    handleApprove,
    handleRequestRevision,
  };
}
