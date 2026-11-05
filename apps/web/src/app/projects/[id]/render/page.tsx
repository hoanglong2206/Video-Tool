import { RenderExport } from "@/features/render-export";

interface ProjectRenderPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Project Render & Export | AI Motion Studio",
};

export default async function ProjectRenderPage({ params }: ProjectRenderPageProps) {
  const { id } = await params;
  return <RenderExport projectName={`Project #${id}`} />;
}
