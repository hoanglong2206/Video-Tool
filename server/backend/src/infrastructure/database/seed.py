import asyncio
import sys
from pathlib import Path


def find_workspace_root() -> Path:
    current = Path(__file__).resolve().parent
    for _ in range(7):
        if (current / ".env").exists() or (current / "package.json").exists():
            return current
        current = current.parent
    return Path.cwd()


root = find_workspace_root()
if str(root) not in sys.path:
    sys.path.insert(0, str(root))

from datetime import datetime, timezone
from sqlalchemy import delete
from server.backend.src.infrastructure.database.session import async_session_maker
from server.backend.src.infrastructure.database.models import (
    ProjectModel,
    SceneModel,
    AssetModel,
    WorkflowStageModel,
    ExecutionLogModel,
    ApprovalModel,
    RenderJobModel,
)


async def clean_database(session) -> None:
    """Clear existing data to guarantee clean seed state."""
    print("[INFO] Cleaning existing database records...")
    await session.execute(delete(RenderJobModel))
    await session.execute(delete(ApprovalModel))
    await session.execute(delete(ExecutionLogModel))
    await session.execute(delete(WorkflowStageModel))
    await session.execute(delete(AssetModel))
    await session.execute(delete(SceneModel))
    await session.execute(delete(ProjectModel))
    await session.commit()
    print("[INFO] Database cleaned.")


async def seed_database() -> None:
    """Clean and populate Supabase PostgreSQL with baseline studio projects, scenes, assets, and workflows."""
    async with async_session_maker() as session:
        await clean_database(session)
        print("[INFO] Seeding clean baseline records into Supabase...")

        # 1. Projects
        p1 = ProjectModel(
            id="proj-1",
            name="Aurora X1 Launch",
            client="Aurora Audio",
            brief="Premium cinematic launch video for the Aurora X1 wireless headphones. Dark studio mood, slow reveals, metallic reflections. Target audience: Tech audiophiles & creative professionals aged 22-40. CTA: Pre-order now at aurora-audio.com to receive founder engraving.",
            stage_description="Stage 06 · Motion design",
            progress=25,
            status="in_progress",
            duration="30 seconds",
            aspect_ratio="16:9",
            style_preference="Cinematic, minimal",
            brand_colors=["#0E131D", "#E2E8F0", "#3B82F6"],
            typeface="Inter",
            asset_count=64,
            template_count=18,
        )
        p2 = ProjectModel(
            id="proj-2",
            name="Nova Watch Teaser",
            client="Nova Instruments",
            brief="Sleek smartwatch titanium casing macro highlights.",
            stage_description="Stage 03 · Asset generation",
            progress=18,
            status="in_progress",
        )
        p3 = ProjectModel(
            id="proj-3",
            name="Halo Speaker Promo",
            client="Halo Acoustic",
            brief="Omnidirectional soundwaves visualized through metallic spring oscillations.",
            stage_description="Stage 09 · Render",
            progress=85,
            status="in_progress",
        )
        p4 = ProjectModel(
            id="proj-4",
            name="Kite Sneaker Reveal",
            client="Kite Footwear",
            brief="Urban sportswear silhouette with dynamic kinetic typography.",
            stage_description="Completed",
            progress=100,
            status="completed",
        )
        p5 = ProjectModel(
            id="proj-5",
            name="Brew Coffee Ad",
            client="Brew Craft",
            brief="Espresso steam curves and brushed brass valve aesthetics.",
            stage_description="Stage 01 · Brief analysis",
            progress=8,
            status="in_progress",
        )
        p6 = ProjectModel(
            id="proj-6",
            name="Asset library",
            client="Global Workspace",
            brief="Master shared asset library and reusable animation components.",
            stage_description="412 assets · 18 templates",
            progress=0,
            status="library",
            asset_count=412,
            template_count=18,
        )
        session.add_all([p1, p2, p3, p4, p5, p6])
        await session.flush()

        # 2. Scenes for Aurora X1 Launch (with full layer & track state)
        sample_layers = [
            {"id": "layer-1", "name": "Light sweep", "type": "light_sweep"},
            {"id": "layer-2", "name": "Title · 'Meet Aurora'", "type": "title"},
            {"id": "layer-3", "name": "Product · aurora-x1.png", "type": "product", "assetRef": "aurora-x1.png"},
            {"id": "layer-4", "name": "Particles", "type": "particles"},
            {"id": "layer-5", "name": "Background · studio-dark", "type": "background"},
        ]
        sample_tracks = [
            {"id": "track-1", "name": "Camera", "startSec": 0.5, "durationSec": 4.0, "colorClass": "bg-[#2563EB]", "keyframes": [0.8, 4.2]},
            {"id": "track-2", "name": "Product", "startSec": 1.2, "durationSec": 4.3, "colorClass": "bg-[#1E293B]", "keyframes": [2.5]},
            {"id": "track-3", "name": "Title", "startSec": 1.8, "durationSec": 2.0, "colorClass": "bg-[#1E293B]", "keyframes": []},
            {"id": "track-4", "name": "Light sweep", "startSec": 3.2, "durationSec": 2.0, "colorClass": "bg-[#784D16]", "keyframes": []},
        ]
        sample_props = {
            "x": 960,
            "y": 580,
            "scalePercent": 100,
            "rotateDeg": 0,
            "opacityPercent": 100,
            "easing": "Ease-out cubic",
        }

        scenes = [
            SceneModel(
                id="scene-1",
                project_id="proj-1",
                scene_number=1,
                title="Dark intro",
                duration_seconds=4,
                camera_movement="Slow push-in",
                transition_type="Fade",
                description="Deep shadows cloak the headphones as an ambient glow slowly hints at the silhouette.",
                creative_direction="Dark studio, slow and deliberate pacing, metallic highlights.",
                layers_data=sample_layers,
                tracks_data=sample_tracks,
                properties_data=sample_props,
            ),
            SceneModel(
                id="scene-2",
                project_id="proj-1",
                scene_number=2,
                title="Product reveal",
                duration_seconds=6,
                camera_movement="Orbit",
                transition_type="Light sweep",
                description="Headphones emerge from darkness as a soft light sweep crosses the metal surface.",
                creative_direction="Dark studio, slow and deliberate pacing, metallic highlights.",
                layers_data=sample_layers,
                tracks_data=sample_tracks,
                properties_data=sample_props,
            ),
            SceneModel(
                id="scene-3",
                project_id="proj-1",
                scene_number=3,
                title="Driver detail",
                duration_seconds=5,
                camera_movement="Macro dolly",
                transition_type="Cut",
                description="Extreme close-up on the titanium acoustic driver diaphragm vibrating with precision sound waves.",
                creative_direction="Dark studio, macro fidelity, crisp micro-contrast.",
                layers_data=sample_layers,
                tracks_data=sample_tracks,
                properties_data=sample_props,
            ),
            SceneModel(
                id="scene-4",
                project_id="proj-1",
                scene_number=4,
                title="Materials",
                duration_seconds=5,
                camera_movement="Slider",
                transition_type="Cross dissolve",
                description="Anodized aluminum band flexing effortlessly with leatherette ear cushion texture focus.",
                creative_direction="Premium haptic feel, soft studio lighting.",
                layers_data=sample_layers,
                tracks_data=sample_tracks,
                properties_data=sample_props,
            ),
            SceneModel(
                id="scene-5",
                project_id="proj-1",
                scene_number=5,
                title="Battery life",
                duration_seconds=5,
                camera_movement="Typography",
                transition_type="Wipe",
                description="Kinetic typography reveal: '60 Hours Non-Stop Playback' integrated seamlessly onto the surface.",
                creative_direction="Bold typography, fluid motion blur.",
                layers_data=sample_layers,
                tracks_data=sample_tracks,
                properties_data=sample_props,
            ),
            SceneModel(
                id="scene-6",
                project_id="proj-1",
                scene_number=6,
                title="Logo end card",
                duration_seconds=5,
                camera_movement="Static",
                transition_type="Fade out",
                description="Aurora Audio emblem centers on screen with launch date and call-to-action lockup.",
                creative_direction="Clean branding, confident final hold.",
                layers_data=sample_layers,
                tracks_data=sample_tracks,
                properties_data=sample_props,
            ),
        ]
        session.add_all(scenes)

        # 3. Assets for Aurora X1 Launch
        assets = [
            AssetModel(
                id="asset-1",
                project_id="proj-1",
                name="product-front",
                category="product",
                source_type="generated",
                resolution="4096×4096",
                format="Transparent PNG",
                version=3,
                total_versions=3,
                is_transparent=True,
                scenes_used=[2, 3, 6],
            ),
            AssetModel(
                id="asset-2",
                project_id="proj-1",
                name="product-side",
                category="product",
                source_type="generated",
                resolution="4096×4096",
                format="Transparent PNG",
                version=2,
                total_versions=2,
                is_transparent=True,
                scenes_used=[2, 4],
            ),
            AssetModel(
                id="asset-3",
                project_id="proj-1",
                name="bg-studio-01",
                category="backgrounds",
                source_type="generated",
                resolution="3840×2160",
                format="EXR Studio Map",
                version=1,
                total_versions=1,
                scenes_used=[1, 2],
            ),
            AssetModel(
                id="asset-4",
                project_id="proj-1",
                name="bg-studio-02",
                category="backgrounds",
                source_type="generated",
                resolution="3840×2160",
                format="HDR Atmosphere",
                version=2,
                total_versions=2,
                scenes_used=[3, 4],
            ),
            AssetModel(
                id="asset-5",
                project_id="proj-1",
                name="particles",
                category="particles",
                source_type="generated",
                resolution="1920×1080",
                format="Alpha Depth Pass",
                version=1,
                total_versions=1,
                scenes_used=[1, 5],
            ),
            AssetModel(
                id="asset-6",
                project_id="proj-1",
                name="flare",
                category="particles",
                source_type="generated",
                resolution="2048×2048",
                format="Anamorphic Streak",
                version=1,
                total_versions=1,
                scenes_used=[2],
            ),
            AssetModel(
                id="asset-7",
                project_id="proj-1",
                name="metal-tex",
                category="textures",
                source_type="generated",
                resolution="4096×4096",
                format="Roughness PBR Map",
                version=1,
                total_versions=1,
                scenes_used=[3, 4],
            ),
            AssetModel(
                id="asset-8",
                project_id="proj-1",
                name="logo.png",
                category="logos",
                source_type="original",
                resolution="2048×2048",
                format="Vector Cutout",
                version=1,
                total_versions=1,
                is_transparent=True,
                scenes_used=[6],
            ),
        ]
        session.add_all(assets)

        # 4. Workflow Stages for Aurora X1 Launch
        stages = [
            WorkflowStageModel(id="stage-01", project_id="proj-1", stage_number="01", name="Brief analysis", status="approved"),
            WorkflowStageModel(id="stage-02", project_id="proj-1", stage_number="02", name="Storyboard", status="approved"),
            WorkflowStageModel(id="stage-03", project_id="proj-1", stage_number="03", name="Asset generation", status="approved"),
            WorkflowStageModel(id="stage-04", project_id="proj-1", stage_number="04", name="Asset processing", status="approved"),
            WorkflowStageModel(
                id="stage-05",
                project_id="proj-1",
                stage_number="05",
                name="Scene composition",
                status="waiting_approval",
                depends_on="Stage 04 · Asset processing (approved)",
                approval_history="v2 revision requested · v3 awaiting review",
                has_preview=True,
            ),
            WorkflowStageModel(
                id="stage-06",
                project_id="proj-1",
                stage_number="06",
                name="Motion design",
                status="running",
                progress_percent=62,
                depends_on="Stage 05 · Scene composition",
            ),
            WorkflowStageModel(id="stage-07", project_id="proj-1", stage_number="07", name="3D production", status="skipped"),
            WorkflowStageModel(id="stage-08", project_id="proj-1", stage_number="08", name="Sound design", status="pending"),
            WorkflowStageModel(id="stage-09", project_id="proj-1", stage_number="09", name="Render & post", status="pending"),
            WorkflowStageModel(id="stage-10", project_id="proj-1", stage_number="10", name="QC & export", status="pending"),
        ]
        session.add_all(stages)

        # 5. Execution Logs
        logs = [
            ExecutionLogModel(id="log-1", project_id="proj-1", timestamp_label="14:02", stage_label="Stage 06", message="Generating keyframes for scene 03"),
            ExecutionLogModel(id="log-2", project_id="proj-1", timestamp_label="14:01", stage_label="Stage 05", message="Composition ready for review (6 scenes)"),
            ExecutionLogModel(id="log-3", project_id="proj-1", timestamp_label="13:48", stage_label="Stage 04", message="Masks and depth maps approved"),
        ]
        session.add_all(logs)

        # 6. Approvals
        approvals = [
            ApprovalModel(
                id="appr-1",
                project_id="proj-1",
                stage_name="Stage 05 · Composition",
                title="Scene 03 · Product reveal",
                version_label="v3 · 4 min ago",
                previous_version_label="v2 · previous",
                previous_description="Product off-center, flat lighting",
                current_version_label="v3 · current",
                current_description="Centered, rim light added",
                ai_summary="Product moved to the center third, title lifted above the fold, rim lighting added from the left.",
                status="pending",
            ),
            ApprovalModel(
                id="appr-2",
                project_id="proj-1",
                stage_name="Stage 05 · Composition",
                title="Scene 04 · Feature close-up",
                version_label="v1 · 18 min ago",
                previous_version_label="v0 · storyboard sketch",
                previous_description="Initial storyboard wireframe concept",
                current_version_label="v1 · current",
                current_description="Macro driver mesh with specular gloss",
                ai_summary="Generated high-resolution macro depth pass for acoustic driver diaphragm.",
                status="pending",
            ),
        ]
        session.add_all(approvals)

        # 7. Render Jobs
        renders = [
            RenderJobModel(id="rend-1", project_id="proj-1", version="v3", resolution="1080p", duration="2m 14s", status="completed"),
            RenderJobModel(id="rend-2", project_id="proj-1", version="v2", resolution="1080p", duration="2m 09s", status="completed"),
            RenderJobModel(id="rend-3", project_id="proj-1", version="v1", resolution="720p", duration="failed", status="failed"),
        ]
        session.add_all(renders)

        await session.commit()
        print("[SUCCESS] Supabase database cleaned and seeded successfully!")


if __name__ == "__main__":
    asyncio.run(seed_database())
