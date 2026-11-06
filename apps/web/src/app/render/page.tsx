import { redirect } from "next/navigation";

export default function RenderPage(): never {
  redirect("/projects/proj-1/render");
}
