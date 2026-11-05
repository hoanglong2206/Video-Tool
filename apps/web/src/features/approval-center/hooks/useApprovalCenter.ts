import { useState } from "react";
import type { PendingApprovalItem, DecisionType } from "../types";

const INITIAL_APPROVALS: PendingApprovalItem[] = [
  {
    id: "appr-1",
    stageName: "Stage 05 · Composition",
    title: "Scene 03 · Product reveal",
    versionLabel: "v3 · 4 min ago",
    previousVersionLabel: "v2 · previous",
    previousDescription: "Product off-center, flat lighting",
    currentVersionLabel: "v3 · current",
    currentDescription: "Centered, rim light added",
    aiSummary: "Product moved to the center third, title lifted above the fold, rim lighting added from the left.",
  },
  {
    id: "appr-2",
    stageName: "Stage 05 · Composition",
    title: "Scene 04 · Feature close-up",
    versionLabel: "v1 · 18 min ago",
    previousVersionLabel: "v0 · storyboard sketch",
    previousDescription: "Initial storyboard wireframe concept",
    currentVersionLabel: "v1 · current",
    currentDescription: "Macro driver mesh with specular gloss",
    aiSummary: "Generated high-resolution macro depth pass for acoustic driver diaphragm.",
  },
];

export function useApprovalCenter(projectName: string = "Aurora X1 Launch") {
  const [items, setItems] = useState<PendingApprovalItem[]>(INITIAL_APPROVALS);
  const [selectedItemId, setSelectedItemId] = useState<string>("appr-1");
  const [comment, setComment] = useState<string>("");

  const selectedItem =
    items.find((i) => i.id === selectedItemId) || items[0];

  const handleDecision = (decision: DecisionType): void => {
    if (!selectedItem) return;
    setItems((prev) => prev.filter((i) => i.id !== selectedItemId));
    setComment("");
    if (items.length > 1) {
      const remaining = items.filter((i) => i.id !== selectedItemId);
      setSelectedItemId(remaining[0].id);
    }
  };

  return {
    projectName,
    items,
    selectedItem,
    comment,
    setComment,
    setSelectedItemId,
    handleDecision,
  };
}

