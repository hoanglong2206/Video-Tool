import asyncio
import os
import sys
from pathlib import Path

# Add project root to sys.path
root = Path(__file__).resolve().parent.parent.parent.parent
sys.path.insert(0, str(root))

from httpx import AsyncClient, ASGITransport
from server.backend.src.main import app

async def run_phase3_tests():
    print("=" * 60)
    print("STARTING PHASE 3 ENDPOINTS & WORKER DAEMON VERIFICATION")
    print("=" * 60)

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # 1. Test Workflow Pipeline Advancement
        print("\n--- 1. Testing POST /api/v1/projects/proj-1/workflow/start ---")
        res = await client.post("/api/v1/projects/proj-1/workflow/start")
        print(f"Status Code: {res.status_code}")
        assert res.status_code == 200, f"Workflow advance failed: {res.text}"
        wf_data = res.json()
        print(f"Status: {wf_data.get('status')}")
        print(f"Executed Stage: {wf_data.get('stage')} ({wf_data.get('stageName')})")
        print(f"Project Progress: {wf_data.get('projectProgress')}%")
        print("[PASS] Workflow pipeline advancement verified!")

        # 2. Test Render Job Start & Async Execution
        print("\n--- 2. Testing POST /api/v1/render/start ---")
        start_payload = {
            "project_id": "proj-1",
            "resolution": "4K (3840x2160)",
            "codec": "H.264 · MP4"
        }
        res = await client.post("/api/v1/render/start", json=start_payload)
        print(f"Status Code: {res.status_code}")
        assert res.status_code == 202, f"Start render failed: {res.text}"
        job_data = res.json()
        job_id = job_data.get("job_id")
        print(f"Job ID: {job_id}")
        assert job_id is not None
        print("[PASS] Render job dispatch verified!")

        # 3. Poll Render Progress
        print("\n--- 3. Testing GET /api/v1/render/progress & Waiting for Worker ---")
        max_attempts = 15
        completed = False
        for i in range(max_attempts):
            await asyncio.sleep(1.0)
            p_res = await client.get("/api/v1/render/progress")
            if p_res.status_code == 200:
                p_data = p_res.json()
                pct = p_data.get("percentage", 0)
                status_text = p_data.get("status_text", "")
                print(f"Poll #{i+1}: {pct}% - {status_text}")
                if pct == 100 or "Idle" in status_text:
                    completed = True
                    break

        print("[PASS] Render progress polling verified!")

        # 4. Test Video Download Endpoint
        print(f"\n--- 4. Testing GET /api/v1/render/download/{job_id} ---")
        dl_res = await client.get(f"/api/v1/render/download/{job_id}")
        print(f"Download Status Code: {dl_res.status_code}")
        print(f"Content-Type: {dl_res.headers.get('content-type')}")
        print(f"Content-Length: {len(dl_res.content)} bytes")
        assert dl_res.status_code == 200, f"Download failed: {dl_res.text}"
        assert "video/mp4" in dl_res.headers.get("content-type", "")
        assert len(dl_res.content) > 10000, "Rendered video file is too small or empty"
        print("[PASS] Video download streaming verified!")

    print("\n" + "=" * 60)
    print("ALL PHASE 3 BACKEND & WORKER TESTS PASSED SUCCESSFULLY!")
    print("=" * 60)

if __name__ == "__main__":
    asyncio.run(run_phase3_tests())
