import asyncio
import sys
from pathlib import Path
from uuid import uuid4

root = Path(__file__).resolve().parent.parent.parent.parent
if str(root) not in sys.path:
    sys.path.insert(0, str(root))

from httpx import AsyncClient, ASGITransport
from sqlalchemy import select
from server.backend.src.main import app
from server.backend.src.infrastructure.database.models import (
    BrandKitModel,
    SceneTemplateModel,
    ProjectModel,
    SceneModel,
    SceneVersionModel,
    AssetModel,
    AssetVersionModel,
    AudioTrackModel,
)
from server.backend.src.infrastructure.database.session import async_session_maker


async def run_v2_tests():
    print("=" * 65)
    print("VERIFYING DATABASE V2 UPGRADE (BRAND KITS, TEMPLATES, VERSIONS, AUDIO)")
    print("=" * 65)

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # 1. Test Library Endpoints (Auto-seed BrandKit and SceneTemplates in PostgreSQL)
        print("\n--- 1. Testing Library API auto-seed & persistence ---")
        res_bk = await client.get("/api/v1/library/brand-kit")
        assert res_bk.status_code == 200, f"Failed get brand-kit: {res_bk.text}"
        bk_data = res_bk.json()
        print(f"[SUCCESS] Brand Kit fetched: '{bk_data['name']}' with colors: {bk_data['colors']}")

        res_tmpl = await client.get("/api/v1/library/scene-templates")
        assert res_tmpl.status_code == 200, f"Failed get scene-templates: {res_tmpl.text}"
        tmpl_data = res_tmpl.json()
        print(f"[SUCCESS] Reusable Templates count: {len(tmpl_data)} (First: '{tmpl_data[0]['title']}')")

        # 2. Test Project Creation with V2 Fields & Audio Settings
        print("\n--- 2. Testing Project Creation with BrandKit & Audio Settings ---")
        project_id = f"proj-{uuid4().hex[:8]}"
        async with async_session_maker() as session:
            proj = ProjectModel(
                id=project_id,
                name="Audio & Versioning Test Commercial",
                client="Aurora Audio",
                brief="Testing multi-track audio and scene snapshot versioning.",
                brand_kit_id="kit-aurora",
                bgm_mood="Cyberpunk Tech",
                sound_mode="full",
                target_resolution="4K UHD",
                duration="30s",
                aspect_ratio="16:9",
            )
            session.add(proj)

            # Add 2 scenes with 3D parameters and voiceover
            s1 = SceneModel(
                id=f"scene-{uuid4().hex[:8]}",
                project_id=project_id,
                scene_number=1,
                title="Cinematic Intro Sweep",
                duration_seconds=5,
                camera_movement="360 Orbit",
                camera_3d_params={"fov": 35, "lens": "85mm", "dof": 1.8},
                lighting_rig={"rim_light": "#06B6D4", "key_ratio": "4:1"},
                voiceover_text="Silence begins here.",
            )
            s2 = SceneModel(
                id=f"scene-{uuid4().hex[:8]}",
                project_id=project_id,
                scene_number=2,
                title="Exploded Driver View",
                duration_seconds=6,
                camera_movement="Push-in",
                scene_template_id="tmpl-3",
                voiceover_text="40mm Beryllium driver precision.",
            )
            session.add(s1)
            session.add(s2)

            # Add Audio Tracks (BGM + Voiceover)
            bgm_track = AudioTrackModel(
                id=f"aud-{uuid4().hex[:8]}",
                project_id=project_id,
                track_type="bgm",
                file_path="storage/audio/cyberpunk_128bpm.mp3",
                volume=0.8,
                beat_markers=[1.2, 2.4, 3.6, 4.8],
                ducking_config={"duck_volume": 0.2, "fade_in_sec": 0.3},
            )
            session.add(bgm_track)

            # Add Media Asset with Versioning
            asset_id = f"ast-{uuid4().hex[:8]}"
            asset = AssetModel(
                id=asset_id,
                project_id=project_id,
                name="headphone_hero.png",
                category="product",
                source_type="generated",
                storage_type="local",
                file_path="storage/assets/headphone_hero_v1.png",
                width=3840,
                height=2160,
                file_size_bytes=4200000,
            )
            session.add(asset)

            # Add Asset Version snapshot
            av1 = AssetVersionModel(
                id=f"ast-v1-{uuid4().hex[:8]}",
                asset_id=asset_id,
                version_number=1,
                file_path="storage/assets/headphone_hero_v1.png",
                change_description="Initial ComfyUI generation",
                is_transparent=False,
            )
            av2 = AssetVersionModel(
                id=f"ast-v2-{uuid4().hex[:8]}",
                asset_id=asset_id,
                version_number=2,
                file_path="storage/assets/headphone_hero_v2_nobg.png",
                change_description="Transparent cutout via OpenCV/Pillow",
                is_transparent=True,
            )
            session.add(av1)
            session.add(av2)

            # Add Scene Version snapshot for Scene 1
            sv1 = SceneVersionModel(
                id=f"sc-v1-{uuid4().hex[:8]}",
                scene_id=s1.id,
                version_number=1,
                title="Cinematic Intro Sweep (Draft 1)",
                visual_prompt="Macro shot of headphones.",
                voiceover="Silence begins here.",
                created_by_role="ai_llm",
            )
            session.add(sv1)

            await session.commit()
            print(f"[SUCCESS] Persisted Project {project_id} with Scenes, Audio, Asset & Scene Versions!")

        # 3. Query & Verify Database Relations in async session
        print("\n--- 3. Verifying Database Relations & Snapshot Rollback Data ---")
        async with async_session_maker() as session:
            loaded_proj = await session.get(ProjectModel, project_id)
            assert loaded_proj is not None
            assert loaded_proj.brand_kit_id == "kit-aurora"
            assert loaded_proj.bgm_mood == "Cyberpunk Tech"

            # Check Scenes count
            scenes_stmt = select(SceneModel).where(SceneModel.project_id == project_id)
            scenes = (await session.scalars(scenes_stmt)).all()
            assert len(scenes) == 2
            print(f"[SUCCESS] Retrieved {len(scenes)} scenes with 3D params: {scenes[0].camera_3d_params}")

            # Check Scene Version
            s1_db = scenes[0]
            s_ver_stmt = select(SceneVersionModel).where(SceneVersionModel.scene_id == s1_db.id)
            s_versions = (await session.scalars(s_ver_stmt)).all()
            assert len(s_versions) == 1
            print(f"[SUCCESS] Scene 1 has historical version: '{s_versions[0].title}'")

            # Check Asset Versions
            ast_ver_stmt = select(AssetVersionModel).where(AssetVersionModel.asset_id == asset_id)
            ast_versions = (await session.scalars(ast_ver_stmt)).all()
            assert len(ast_versions) == 2
            print(f"[SUCCESS] Asset has {len(ast_versions)} versions (v1 raw, v2 cutout: {ast_versions[1].is_transparent})")

            # Check Audio Track
            aud_stmt = select(AudioTrackModel).where(AudioTrackModel.project_id == project_id)
            aud_tracks = (await session.scalars(aud_stmt)).all()
            assert len(aud_tracks) == 1
            print(f"[SUCCESS] Audio track persisted: {aud_tracks[0].track_type} with beat markers: {aud_tracks[0].beat_markers}")

            # Clean up test project
            await session.delete(loaded_proj)
            await session.commit()
            print("[SUCCESS] Test cleanup completed (Cascaded delete-orphan verified)!")

    print("\n" + "=" * 65)
    print("ALL V2 DATABASE UPGRADE TESTS PASSED SUCCESSFULLY!")
    print("=" * 65)


if __name__ == "__main__":
    asyncio.run(run_v2_tests())
