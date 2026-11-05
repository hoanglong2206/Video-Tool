import { useState, useEffect, useCallback } from "react";
import type { PipelineStage, ExecutionLogEntry } from "../types";

export function useProductionWorkflow(projectName: string = "Aurora X1 Launch", projectId: string = "proj-1") {
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [selectedStageId, setSelectedStageId] = useState<string>("");
  const [logs, setLogs] = useState<ExecutionLogEntry[]>([]);
  const [overallProgress, setOverallProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdvancing, setIsAdvancing] = useState<boolean>(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Fetch workflow state from Supabase via backend API
  const fetchWorkflow = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/v1/projects/${projectId}/workflow`, {
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.stages)) {
          setStages(data.stages);
          setSelectedStageId((prev) => prev || data.stages[0]?.id || "");
        }
        if (Array.isArray(data.logs)) {
          setLogs(data.logs);
        }
        if (typeof data.overallProgress === "number") {
          setOverallProgress(data.overallProgress);
        }
      }
    } catch (err) {
      console.error("Failed to load workflow DAG from Supabase backend:", err);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, projectId]);

  useEffect(() => {
    fetchWorkflow();
  }, [fetchWorkflow]);

  const selectedStage =
    stages.find((s) => s.id === selectedStageId) || stages[0] || {
      id: "stage-empty",
      stageNumber: "01",
      name: "Loading...",
      status: "pending",
    };

  const handleApprove = async (stageId: string): Promise<void> => {
    // 1. Optimistic UI update
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

    // 2. Persist to Supabase
    try {
      await fetch(`${apiUrl}/api/v1/projects/${projectId}/stages/${stageId}/approve`, {
        method: "POST",
      });
    } catch (err) {
      console.error("Error approving stage on Supabase:", err);
    }
  };

  const handleRequestRevision = async (stageId: string): Promise<void> => {
    setLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: "Just now",
        stageLabel: selectedStage.stageNumber,
        message: `Revision requested for ${selectedStage.name}`,
      },
      ...prev,
    ]);

    try {
      await fetch(`${apiUrl}/api/v1/projects/${projectId}/stages/${stageId}/revision`, {
        method: "POST",
      });
    } catch (err) {
      console.error("Error requesting stage revision on Supabase:", err);
    }
  };

  const handleStartPipeline = async (): Promise<void> => {
    setIsAdvancing(true);
    try {
      const res = await fetch(`${apiUrl}/api/v1/projects/${projectId}/workflow/start`, {
        method: "POST",
      });
      if (res.ok) {
        await fetchWorkflow();
      }
    } catch (err) {
      console.error("Error advancing pipeline stage on Supabase:", err);
    } finally {
      setIsAdvancing(false);
    }
  };

  return {
    projectName,
    overallProgress,
    stages,
    selectedStage,
    logs,
    isLoading,
    isAdvancing,
    handleStartPipeline,
    setSelectedStageId,
    handleApprove,
    handleRequestRevision,
  };
}
