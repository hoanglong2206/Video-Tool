import re
from server.ai_engine.src.domain.interfaces.llm_provider import (
    AssistantReply,
    BriefCheckResult,
    GeneratedScene,
    ILLMProvider,
)


class FallbackLLMProvider(ILLMProvider):
    """Deterministic fallback provider ensuring zero-downtime when Ollama local daemon is offline."""

    async def check_brief(self, brief: str) -> BriefCheckResult:
        missing = []
        lower = brief.lower()
        if "audience" not in lower and "target" not in lower:
            missing.append("Target audience specifications")
        if not any(k in lower for k in ["cta", "call-to-action", "order", "buy", "visit", "reserve"]):
            missing.append("Call-to-action (CTA)")
        if not any(k in lower for k in ["color", "palette", "dark", "light", "minimal", "style"]):
            missing.append("Visual style or aesthetic guidelines")

        return BriefCheckResult(
            is_complete=len(missing) == 0,
            missing_items=missing,
            suggested_structure="6 scenes, 5 s each: Hook -> Macro Reveal -> Feature -> Craftsmanship -> Performance -> Lockup CTA",
        )

    async def generate_storyboard(
        self, brief: str, project_name: str, count: int = 6
    ) -> list[GeneratedScene]:
        # Extract product keywords
        tokens = [w for w in re.findall(r"\b[A-Za-z0-9-]+\b", project_name) if len(w) > 2]
        prod_name = " ".join(tokens) if tokens else "Product"

        return [
            GeneratedScene(
                scene_number=1,
                title="Dark intro & silhouette",
                duration_seconds=4,
                camera_movement="Slow push-in",
                transition_type="Fade",
                description=f"Deep studio shadows conceal the {prod_name}. A subtle grazing rim light reveals the outline.",
                creative_direction="Dark studio, high contrast, mysterious anticipation.",
            ),
            GeneratedScene(
                scene_number=2,
                title="Specular reveal",
                duration_seconds=6,
                camera_movement="Orbit",
                transition_type="Light sweep",
                description=f"The {prod_name} rotates in 3D perspective as an intense anamorphic flare sweeps across the surface.",
                creative_direction="Metallic highlights, crisp reflections, 25° orbit.",
            ),
            GeneratedScene(
                scene_number=3,
                title="Macro engineering detail",
                duration_seconds=5,
                camera_movement="Macro dolly",
                transition_type="Cut",
                description=f"Extreme shallow depth-of-field close-up highlighting precision tolerances and acoustic/electronic drivers.",
                creative_direction="Focal depth rack, ultra-sharp tactile contrast.",
            ),
            GeneratedScene(
                scene_number=4,
                title="Premium materials & texture",
                duration_seconds=5,
                camera_movement="Slider",
                transition_type="Cross dissolve",
                description="Gliding focal plane focusing on bead-blasted anodized aluminum and haptic texture finishes.",
                creative_direction="Warm specular gloss, organic lighting gradience.",
            ),
            GeneratedScene(
                scene_number=5,
                title="Performance & kinetic specs",
                duration_seconds=5,
                camera_movement="Typography",
                transition_type="Wipe",
                description="Kinetic typography bursts synchronized with transition snaps, displaying breakthrough technical metrics.",
                creative_direction="Bold modern sans-serif typography, spring easing physics.",
            ),
            GeneratedScene(
                scene_number=6,
                title="Brand emblem lockup & CTA",
                duration_seconds=5,
                camera_movement="Static",
                transition_type="Fade out",
                description=f"{project_name} centers on screen alongside official launch date and pre-order call-to-action lockup.",
                creative_direction="Clean brand layout, confident hold, broadcast grade.",
            ),
        ][:count]

    async def chat_assistant(
        self, message: str, context: dict | None = None
    ) -> AssistantReply:
        return AssistantReply(
            reply_text=f"Analyzed request: '{message}'. Recommended cinematic enhancements applied to active scene timeline.",
            suggested_change={
                "id": "sug-auto",
                "title": "Camera & Lighting Refinement",
                "description": "Add 25° slow orbit with an ascending rim light sweep over 2.4 seconds.",
                "actions": ["Preview", "Edit", "Apply"],
            },
            quick_requests=[
                "Enhance rim reflections",
                "Add subtle camera shake",
                "Shorten transition cut",
            ],
        )
