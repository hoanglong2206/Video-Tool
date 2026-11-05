import { useState, useEffect } from "react";
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
  const [isCheckingBrief, setIsCheckingBrief] = useState<boolean>(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Debounced live AI Brief analysis
  useEffect(() => {
    if (!formData.brief || formData.brief.length < 15) return;
    const timer = setTimeout(async () => {
      setIsCheckingBrief(true);
      try {
        const res = await fetch(`${apiUrl}/api/v1/projects/brief-check`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brief: formData.brief,
            project_name: formData.projectName,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setAnalysis({
            missingItems: data.missing_items || [],
            suggestedStructure: data.suggested_structure || "6 scenes, about 5 s each.",
            isComplete: data.is_complete ?? false,
          });
        }
      } catch (err) {
        console.error("Failed to run live AI brief check:", err);
      } finally {
        setIsCheckingBrief(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [formData.brief, formData.projectName, apiUrl]);

  const updateField = (field: keyof ProjectBriefFormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFillFromNotes = (): void => {
    const enrichedBrief =
      formData.brief +
      " Target audience: Tech audiophiles & creative professionals aged 22-40. CTA: Pre-order now at aurora-audio.com to receive exclusive founder engraving.";
    setFormData((prev) => ({ ...prev, brief: enrichedBrief }));
  };

  const handleSaveDraft = async (): Promise<void> => {
    setIsSaving(true);
    try {
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
    setIsSaving(true);
    try {
      const res = await fetch(`${apiUrl}/api/v1/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.projectName,
          brief: formData.brief,
          client: formData.client,
          duration: formData.duration,
          aspect_ratio: formData.aspectRatio,
          style_preference: formData.stylePreference,
        }),
      });
      if (res.ok) {
        const project = await res.json();
        if (project.id) {
          router.push(`/projects/${project.id}/storyboard`);
          return;
        }
      }
    } catch (err) {
      console.error("Error creating project and launching workflow:", err);
    } finally {
      setIsSaving(false);
    }
    router.push("/");
  };

  return {
    formData,
    analysis,
    isSaving,
    isCheckingBrief,
    updateField,
    handleFillFromNotes,
    handleSaveDraft,
    handleContinue,
  };
}

