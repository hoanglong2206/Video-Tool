import { redirect } from "next/navigation";

interface ProjectEditorPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectEditorPage({
  params,
}: ProjectEditorPageProps): Promise<never> {
  const { id } = await params;
  redirect(`/projects/${id}/scenes/scene-01`);
}
