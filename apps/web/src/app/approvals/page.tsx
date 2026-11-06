import { redirect } from "next/navigation";

export default function ApprovalsPage(): never {
  redirect("/projects/proj-1/approvals");
}
