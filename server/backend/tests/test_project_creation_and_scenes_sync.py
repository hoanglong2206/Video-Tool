import asyncio
import sys
from pathlib import Path

# Add project root to sys.path
root = Path(__file__).resolve().parent.parent.parent.parent
sys.path.insert(0, str(root))

from httpx import AsyncClient, ASGITransport
from server.backend.src.main import app


async def run_tests():
    print("=" * 60)
    print("VERIFYING PROJECT CREATION & 6-SCENE DATABASE SYNC")
    print("=" * 60)

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # 1. Test POST /api/v1/projects with full 6 scenes payload
        print("\n--- 1. Testing POST /api/v1/projects with 6 scenes ---")
        project_payload = {
            "name": "Aurora X1 Launch Integration Test",
            "client": "Aurora Audio",
            "brief": "Video gioi thieu tai nghe khong day chong on Aurora X1.",
            "duration": "30s",
            "aspect_ratio": "16:9",
            "style_preference": "3D Cinematic Minimal Tech",
            "brand_colors": ["#0B0F17", "#3B82F6", "#06B6D4", "#E2E8F0"],
            "scenes": [
                {
                    "scene_number": 1,
                    "title": "Khoi dau bong toi & Nhip dap am thanh",
                    "duration_seconds": 5,
                    "camera_movement": "Slow push-in with 24fps orbit",
                    "visual_prompt": "Extreme macro shot of brushed titanium headband.",
                    "voiceover": "Trong the gioi hon tap, am thanh dich thuc bat dau tu su tinh lang.",
                    "transition_type": "Cut",
                },
                {
                    "scene_number": 2,
                    "title": "Can canh dem tai & Cong nghe chong on",
                    "duration_seconds": 5,
                    "camera_movement": "Horizontal tracking right",
                    "visual_prompt": "Ultra-detailed shot of memory foam earcup.",
                    "voiceover": "Cong nghe Adaptive Hybrid ANC loai bo 99.8% tap am.",
                    "transition_type": "Cut",
                },
                {
                    "scene_number": 3,
                    "title": "Boc tach linh kien 3D Exploded View",
                    "duration_seconds": 6,
                    "camera_movement": "Rotational slow-motion twist around driver core",
                    "visual_prompt": "Seamless 3D exploded diagram of 40mm Beryllium driver.",
                    "voiceover": "Driver Beryllium 40mm tuy bien.",
                    "transition_type": "Cut",
                },
                {
                    "scene_number": 4,
                    "title": "Hieu ung song am Kinetic Soundwave",
                    "duration_seconds": 5,
                    "camera_movement": "Fast kinetic whip-pan zoom",
                    "visual_prompt": "Volumetric kinetic particle waves pulsing.",
                    "voiceover": "Am thanh vom Spatial Audio dinh vi chuan tung nhip dieu.",
                    "transition_type": "Cut",
                },
                {
                    "scene_number": 5,
                    "title": "Toan canh san pham hoan thien",
                    "duration_seconds": 5,
                    "camera_movement": "Crane down wide shot to hero beauty angle",
                    "visual_prompt": "Full beauty turntable reveal of Aurora X1.",
                    "voiceover": "Thoi luong pin 40 gio. Dinh cao co khi va am hoc.",
                    "transition_type": "Cut",
                },
                {
                    "scene_number": 6,
                    "title": "Logo Reveal & Keu goi hanh dong",
                    "duration_seconds": 4,
                    "camera_movement": "Locked static hero shot with light flare",
                    "visual_prompt": "Aurora Audio vector logo debossed into matte carbon.",
                    "voiceover": "Aurora X1 - Dat truoc ngay hom nay.",
                    "transition_type": "Cut",
                },
            ],
        }

        res = await client.post("/api/v1/projects", json=project_payload)
        print(f"Status Code: {res.status_code}")
        assert res.status_code == 201, f"Failed: {res.text}"
        project_data = res.json()
        project_id = project_data.get("id")
        print(f"[SUCCESS] Project Created with ID: {project_id}")
        assert project_id is not None, "Missing project ID"

        # 2. Test GET /api/v1/projects/{project_id}/storyboard
        print(f"\n--- 2. Testing GET /api/v1/projects/{project_id}/storyboard ---")
        sb_res = await client.get(f"/api/v1/projects/{project_id}/storyboard")
        print(f"Status Code: {sb_res.status_code}")
        assert sb_res.status_code == 200, f"Failed: {sb_res.text}"

        storyboard = sb_res.json()
        scenes = storyboard.get("scenes", [])
        total_duration = storyboard.get("totalDurationSeconds")

        print(f"Project Name: {storyboard.get('projectName')}")
        print(f"Total Duration: {total_duration}s")
        print(f"Persisted Scenes Count: {len(scenes)}")

        assert len(scenes) == 6, f"Expected 6 scenes in database, found {len(scenes)}"
        assert total_duration == 30, f"Expected 30s total duration, got {total_duration}"

        for idx, sc in enumerate(scenes, 1):
            print(f"  Scene #{sc['sceneNumber']}: {sc['title']} ({sc['durationSeconds']}s) - Camera: {sc['cameraMovement']}")
            assert sc["sceneNumber"] == idx
            assert sc["durationSeconds"] > 0
            assert len(sc["description"]) > 0

        print("\n[ALL TESTS PASSED] 6 Scenes successfully transmitted & persisted in PostgreSQL Database!")


if __name__ == "__main__":
    asyncio.run(run_tests())
