import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ProjectBriefFormData, AiBriefAnalysis } from "../types";

const INITIAL_FORM: ProjectBriefFormData = {
  projectName: "Aurora X1 Launch",
  client: "Aurora Audio",
  brief:
    "Premium cinematic launch video for the Aurora X1 wireless headphones. Dark studio mood, slow reveals, metallic reflections.",
  duration: "30 seconds",
  aspectRatio: "16:9",
  stylePreference: "Cinematic, minimal",
  brandColors: ["#0E131D", "#E2E8F0", "#3B82F6"],
  typeface: "Inter",
};

const INITIAL_ANALYSIS: AiBriefAnalysis = {
  missingItems: ["target audience.", "call-to-action text."],
  suggestedStructure: "6 scenes, about 5 s each.",
  isComplete: false,
};

export function useProjectCreation() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProjectBriefFormData>(INITIAL_FORM);
  const [analysis, setAnalysis] = useState<AiBriefAnalysis>(INITIAL_ANALYSIS);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const updateField = (field: keyof ProjectBriefFormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFillFromNotes = (): void => {
    const enrichedBrief =
      formData.brief +
      " Target audience: Tech audiophiles & creative professionals aged 22-40. CTA: Pre-order now at aurora-audio.com to receive exclusive founder engraving.";
    setFormData((prev) => ({ ...prev, brief: enrichedBrief }));
    setAnalysis({
      missingItems: [],
      suggestedStructure: "6 scenes, about 5 s each (hook, 360 showcase, ANC feature, comfort fit, specs, CTA).",
      isComplete: true,
    });
  };

  const handleSaveDraft = async (): Promise<void> => {
    setIsSaving(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      await fetch(`${apiUrl}/api/v1/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.projectName,
          brief: formData.brief,
          client: formData.client,
          status: "DRAFT",
        }),
      });
    } catch {
      // offline fallback
    } finally {
      setIsSaving(false);
    }
  };

  const handleContinue = async (): Promise<void> => {
    await handleSaveDraft();
    router.push("/");
  };

  return {
    formData,
    analysis,
    isSaving,
    updateField,
    handleFillFromNotes,
    handleSaveDraft,
    handleContinue,
  };
}
