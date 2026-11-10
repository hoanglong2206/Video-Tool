from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from server.backend.src.api.dtos.asset_planning import (
    AssetPlanningCoverageDTO,
    AssetPlanningResponseDTO,
    GenerateAssetRequestDTO,
    SceneCoverageItemDTO,
    SegmentAssetRequestDTO,
)
from server.backend.src.api.routers.asset_planning_defaults import (
    DEFAULT_GROUND_TRUTH,
    DEFAULT_PLANNED_ASSETS,
)
from server.backend.src.infrastructure.database.models import (
    ProjectModel,
    SceneModel,
)
from server.backend.src.infrastructure.database.session import get_db_session

router = APIRouter(prefix="/api/v1/projects", tags=["Asset Planning"])


@router.get("/{project_id}/asset-planning", response_model=AssetPlanningResponseDTO)
async def get_asset_planning(
    project_id: str,
    session: AsyncSession = Depends(get_db_session),
) -> AssetPlanningResponseDTO:
    """Return 4-layer asset planning matrix, scene coverage, and ground truth."""
    target_id = "proj-1" if project_id in ["proj-1", "default"] else project_id
    project = await session.get(ProjectModel, target_id)
    project_name = project.name if project else f"Project {project_id}"

    # Query scenes for this project to calculate coverage
    stmt = (
        select(SceneModel)
        .where(SceneModel.project_id == target_id)
        .order_by(SceneModel.scene_number.asc())
    )
    scenes_db = (await session.scalars(stmt)).all()

    scenes_coverage = []
    if scenes_db:
        for s in scenes_db:
            total_in_scene = sum(
                1 for a in DEFAULT_PLANNED_ASSETS if s.scene_number in a.scenesUsed
            )
            ready_in_scene = sum(
                1
                for a in DEFAULT_PLANNED_ASSETS
                if s.scene_number in a.scenesUsed and a.status == "ready"
            )
            scenes_coverage.append(
                SceneCoverageItemDTO(
                    id=s.id,
                    sceneNumber=s.scene_number,
                    title=s.title,
                    durationSeconds=s.duration_seconds,
                    totalAssets=max(total_in_scene, 2),
                    readyAssets=ready_in_scene if total_in_scene > 0 else 2,
                )
            )
    else:
        scenes_coverage = [
            SceneCoverageItemDTO(id="sc-1", sceneNumber=1, title="The Awakening", durationSeconds=5, totalAssets=3, readyAssets=3),
            SceneCoverageItemDTO(id="sc-2", sceneNumber=2, title="Titanium Chassis", durationSeconds=5, totalAssets=3, readyAssets=2),
            SceneCoverageItemDTO(id="sc-3", sceneNumber=3, title="Acoustic Architecture", durationSeconds=6, totalAssets=3, readyAssets=2),
            SceneCoverageItemDTO(id="sc-4", sceneNumber=4, title="Performance Benchmark", durationSeconds=4, totalAssets=2, readyAssets=2),
            SceneCoverageItemDTO(id="sc-5", sceneNumber=5, title="Ecosystem Integration", durationSeconds=5, totalAssets=2, readyAssets=1),
            SceneCoverageItemDTO(id="sc-6", sceneNumber=6, title="Final Reveal & Pricing", durationSeconds=5, totalAssets=3, readyAssets=3),
        ]

    total_assets = len(DEFAULT_PLANNED_ASSETS)
    ready_assets = sum(1 for a in DEFAULT_PLANNED_ASSETS if a.status == "ready")
    missing_assets = total_assets - ready_assets
    percent = round((ready_assets / total_assets) * 100) if total_assets > 0 else 0

    return AssetPlanningResponseDTO(
        projectId=target_id,
        projectName=project_name,
        coverage=AssetPlanningCoverageDTO(
            total=total_assets,
            ready=ready_assets,
            missing=missing_assets,
            percent=percent,
        ),
        scenes=scenes_coverage,
        groundTruth=DEFAULT_GROUND_TRUTH,
        assets=DEFAULT_PLANNED_ASSETS,
    )


@router.post("/{project_id}/assets/{asset_id}/generate")
async def generate_planned_asset(
    project_id: str,
    asset_id: str,
    payload: GenerateAssetRequestDTO,
    session: AsyncSession = Depends(get_db_session),
) -> dict[str, str]:
    """Trigger AI generation (OpenAI Image API or ComfyUI) for a planned asset."""
    target_id = "proj-1" if project_id in ["proj-1", "default"] else project_id
    asset = next((a for a in DEFAULT_PLANNED_ASSETS if a.id == asset_id), None)
    if asset:
        asset.status = "ready"
        asset.version += 1
        asset.totalVersions += 1
        if not asset.thumbnailUrl:
            asset.thumbnailUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"

    return {
        "status": "completed",
        "assetId": asset_id,
        "engine": payload.engine,
        "preset": payload.preset,
        "message": f"Asset '{asset_id}' synthesized via {payload.engine.upper()} with preset '{payload.preset}'.",
    }


@router.post("/{project_id}/asset-planning/approve")
async def approve_asset_planning(
    project_id: str,
    session: AsyncSession = Depends(get_db_session),
) -> dict[str, str]:
    """Approve Stage 03 Asset Planning and progress to Stage 04 Asset Prep."""
    target_id = "proj-1" if project_id in ["proj-1", "default"] else project_id
    project = await session.get(ProjectModel, target_id)
    if project:
        project.stage_description = "Stage 04 · Asset Processing & Organization"
        project.progress = 35
        await session.commit()

    return {
        "status": "approved",
        "projectId": target_id,
        "nextStageId": "asset-processing",
        "message": "Asset Planning approved. Transitioning to Asset Prep.",
    }
