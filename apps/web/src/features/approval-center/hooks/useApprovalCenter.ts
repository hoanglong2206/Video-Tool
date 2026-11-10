import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui";
import { approvalService, type ApprovalDecisionInput } from "@/services/approval";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useApprovalCenterStore } from "../store";
import type { PendingApprovalItem, DecisionType } from "../types";

export function useApprovalCenter(
  projectName: string = "Aurora X1 Launch",
  projectId: string = "proj-1"
) {
  const queryClient = useQueryClient();
  const store = useApprovalCenterStore();

  const { data, isLoading, refetch } = useQuery({
    queryKey: QUERY_KEYS.approvals.byProject(projectId),
    queryFn: () => approvalService.getApprovals(projectId),
  });

  useEffect(() => {
    if (data?.items && Array.isArray(data.items)) {
      store.setItems(data.items as PendingApprovalItem[]);
    }
  }, [data]);

  const decisionMutation = useMutation({
    mutationFn: ({ approvalId, input }: { approvalId: string; input: ApprovalDecisionInput }) =>
      approvalService.decideApproval(projectId, approvalId, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.approvals.byProject(projectId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.dashboard.all,
      });
      toast.success(
        variables.input.decision === "approve"
          ? "Đã phê duyệt hạng mục thành công!"
          : "Đã từ chối hạng mục và gửi phản hồi!"
      );
    },
    onError: () => {
      toast.error("Không thể xử lý phê duyệt. Vui lòng thử lại!");
    },
  });

  const selectedItem =
    store.items.find((i) => i.id === store.selectedItemId) ||
    store.items[0] ||
    null;

  const handleDecision = async (decision: DecisionType): Promise<void> => {
    if (!store.selectedItemId) return;
    const currentId = store.selectedItemId;
    const currentComment = store.reviewerComment;

    // Optimistic removal
    store.removeItem(currentId);

    decisionMutation.mutate({
      approvalId: currentId,
      input: {
        decision,
        comment: currentComment,
      },
    });
  };

  return {
    projectName,
    items: store.items,
    selectedItem,
    comment: store.reviewerComment,
    isLoading,
    setComment: store.setReviewerComment,
    setSelectedItemId: store.setSelectedItemId,
    handleDecision,
    isDeciding: decisionMutation.isPending,
    refetch,
  };
}
