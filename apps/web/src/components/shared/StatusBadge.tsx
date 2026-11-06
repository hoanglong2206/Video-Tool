import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertCircle, PlayCircle, MinusCircle, XCircle } from "lucide-react";

export type EntityStatus =
  | "approved"
  | "waiting_approval"
  | "running"
  | "in_progress"
  | "completed"
  | "failed"
  | "pending"
  | "skipped"
  | "library"
  | string;

interface StatusBadgeProps {
  status: EntityStatus;
  label?: string;
  className?: string;
}

export function StatusBadge({
  status,
  label,
  className,
}: StatusBadgeProps): React.ReactElement {
  switch (status.toLowerCase()) {
    case "approved":
    case "completed":
      return (
        <Badge variant="success" className={className}>
          <CheckCircle2 className="w-3 h-3 mr-1" />
          {label || (status === "approved" ? "Approved" : "Completed")}
        </Badge>
      );
    case "waiting_approval":
      return (
        <Badge variant="warning" className={className}>
          <Clock className="w-3 h-3 mr-1" />
          {label || "Waiting Approval"}
        </Badge>
      );
    case "running":
    case "in_progress":
      return (
        <Badge variant="default" className={className}>
          <PlayCircle className="w-3 h-3 mr-1 animate-pulse" />
          {label || (status === "running" ? "Running" : "In Progress")}
        </Badge>
      );
    case "failed":
      return (
        <Badge variant="destructive" className={className}>
          <XCircle className="w-3 h-3 mr-1" />
          {label || "Failed"}
        </Badge>
      );
    case "skipped":
      return (
        <Badge variant="outline" className={className}>
          <MinusCircle className="w-3 h-3 mr-1" />
          {label || "Skipped"}
        </Badge>
      );
    case "pending":
    default:
      return (
        <Badge variant="secondary" className={className}>
          <AlertCircle className="w-3 h-3 mr-1" />
          {label || "Pending"}
        </Badge>
      );
  }
}

