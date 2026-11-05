import { useState, useEffect, useCallback } from "react";
import type { PendingApprovalItem, DecisionType } from "../types";

export function useApprovalCenter(projectName: string = "Aurora X1 Launch", projectId: string = "proj-1") {
  const [items, setItems] = useState<PendingApprovalItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Fetch pending approval items directly from Supabase via backend API
  const fetchApprovals = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/v1/projects/${projectId}/approvals`, {
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.items)) {
          setItems(data.items);
          if (data.items.length > 0) {
            setSelectedItemId((prev) => prev || data.items[0].id);
          }
        }
      }
    } catch (err) {
      console.error("Failed to load approvals from Supabase backend:", err);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, projectId]);

  useEffect(() => {
    fetchApprovals();
  }, [fetchApprovals]);

  const selectedItem =
    items.find((i) => i.id === selectedItemId) || items[0] || null;

  // Record review decision and persist into Supabase
  const handleDecision = async (decision: DecisionType): Promise<void> => {
    if (!selectedItemId) return;

    const currentId = selectedItemId;
    // 1. Optimistic removal from UI queue
    const remaining = items.filter((i) => i.id !== currentId);
    setItems(remaining);
    setSelectedItemId(remaining[0]?.id || "");
    const decisionComment = comment;
    setComment("");

    // 2. Persist to Supabase
    try {
      await fetch(`${apiUrl}/api/v1/projects/${projectId}/approvals/${currentId}/decision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          decision,
          comment: decisionComment,
        }),
      });
    } catch (err) {
      console.error("Error saving approval decision to Supabase:", err);
    }
  };

  return {
    projectName,
    items,
    selectedItem,
    comment,
    isLoading,
    setComment,
    setSelectedItemId,
    handleDecision,
  };
}
