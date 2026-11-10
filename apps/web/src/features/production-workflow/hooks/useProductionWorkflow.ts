import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui";
import { workflowService } from "@/services/workflow";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useWorkflowStore } from "../store";

export function useProductionWorkflow(
  projectName: string = "Aurora X1 Launch",
  projectId: string = "proj-1"
) {
  const queryClient = useQueryClient();
  const store = useWorkflowStore();

  const { data, isLoading, refetch } = useQuery({
    queryKey: QUERY_KEYS.workflow.byProject(projectId),
    queryFn: () => workflowService.getWorkflow(projectId),
  });

  useEffect(() => {
    if (data) {
      if (Array.isArray(data.stages)) {
        store.setStages(data.stages);
      }
      if (Array.isArray(data.logs)) {
        store.setLogs(data.logs);
      }
      if (typeof data.overallProgress === "number") {
        store.setOverallProgress(data.overallProgress);
      }
    }
  }, [data]);

  const approveMutation = useMutation({
    mutationFn: (stageId: string) => workflowService.approveStage(projectId, stageId),
    onMutate: async (stageId) => {
      store.updateStage(stageId, { status: "approved" });
      const current = store.stages.find((s) => s.id === stageId);
      store.addLog({
        id: `log-${Date.now()}`,
        timestamp: "Just now",
        stageLabel: current?.stageNumber || "01",
        message: `${current?.name || "Stage"} approved by Creative Director`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.workflow.byProject(projectId),
      });
      toast.success("Đã phê duyệt công đoạn sản xuất thành công!");
    },
    onError: () => {
      toast.error("Không thể phê duyệt công đoạn. Vui lòng thử lại!");
    },
  });

  const startPipelineMutation = useMutation({
    mutationFn: () => workflowService.startWorkflow(projectId),
    onMutate: () => {
      store.setIsAdvancing(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.workflow.byProject(projectId),
      });
      toast.success("Đã kích hoạt quy trình sản xuất (Workflow Pipeline)!");
    },
    onError: () => {
      toast.error("Không thể kích hoạt quy trình sản xuất. Vui lòng thử lại!");
    },
    onSettled: () => {
      store.setIsAdvancing(false);
    },
  });

  const selectedStage =
    store.stages.find((s) => s.id === store.selectedStageId) ||
    store.stages[0] || {
      id: "stage-empty",
      stageNumber: "01",
      name: "Loading",
      status: "pending",
    };

  const handleApprove = async (stageId: string): Promise<void> => {
    approveMutation.mutate(stageId);
  };

  const handleRequestRevision = async (stageId: string): Promise<void> => {
    const current = store.stages.find((s) => s.id === stageId);
    store.addLog({
      id: `log-${Date.now()}`,
      timestamp: "Just now",
      stageLabel: current?.stageNumber || "01",
      message: `Revision requested for ${current?.name || "Stage"}`,
    });
    // Request revision endpoint can trigger re-query
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.workflow.byProject(projectId),
    });
  };

  const handleStartPipeline = async (): Promise<void> => {
    startPipelineMutation.mutate();
  };

  return {
    projectName,
    overallProgress: store.overallProgress,
    stages: store.stages,
    selectedStage,
    logs: store.logs,
    isLoading,
    isAdvancing: store.isAdvancing,
    handleStartPipeline,
    setSelectedStageId: store.setSelectedStageId,
    handleApprove,
    handleRequestRevision,
    refetch,
  };
}
