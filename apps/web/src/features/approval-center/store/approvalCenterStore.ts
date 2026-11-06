import { create } from "zustand";
import type { ApprovalGateItem } from "@/services/approval";

interface ApprovalCenterState {
  items: ApprovalGateItem[];
  selectedItemId: string;
  reviewerComment: string;
  isSubmittingDecision: boolean;
  setItems: (items: ApprovalGateItem[]) => void;
  removeItem: (itemId: string) => void;
  setSelectedItemId: (id: string) => void;
  setReviewerComment: (comment: string) => void;
  setIsSubmittingDecision: (submitting: boolean) => void;
}

export const useApprovalCenterStore = create<ApprovalCenterState>((set) => ({
  items: [],
  selectedItemId: "",
  reviewerComment: "",
  isSubmittingDecision: false,
  setItems: (items) =>
    set((state) => ({
      items,
      selectedItemId: state.selectedItemId || items[0]?.id || "",
    })),
  removeItem: (itemId) =>
    set((state) => {
      const remaining = state.items.filter((i) => i.id !== itemId);
      return {
        items: remaining,
        selectedItemId: remaining[0]?.id || "",
        reviewerComment: "",
      };
    }),
  setSelectedItemId: (selectedItemId) => set({ selectedItemId }),
  setReviewerComment: (reviewerComment) => set({ reviewerComment }),
  setIsSubmittingDecision: (isSubmittingDecision) => set({ isSubmittingDecision }),
}));
