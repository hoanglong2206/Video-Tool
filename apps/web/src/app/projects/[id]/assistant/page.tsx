import { AiAssistant } from "@/features/ai-assistant";

interface ProjectAssistantPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "AI Assistant | AI Motion Studio",
};

export default async function ProjectAssistantPage({
  params,
}: ProjectAssistantPageProps) {
  const { id } = await params;
  return (
    <AiAssistant
      projectName={`Project #${id}`}
      sceneName="Scene 03 · Product Reveal"
    />
  );
}

