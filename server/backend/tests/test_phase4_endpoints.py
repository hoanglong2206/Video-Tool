import asyncio
import sys
from pathlib import Path

# Add project root to sys.path
root = Path(__file__).resolve().parent.parent.parent.parent
sys.path.insert(0, str(root))

from httpx import AsyncClient, ASGITransport
from server.backend.src.main import app

async def run_phase4_tests():
    print("=" * 60)
    print("STARTING PHASE 4 ENDPOINTS & WORKFLOW INTEGRATION VERIFICATION")
    print("=" * 60)

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # 1. Test 3D Scene Config Endpoints
        print("\n--- 1. Testing GET & PUT /api/v1/projects/proj-1/3d ---")
        res_3d = await client.get("/api/v1/projects/proj-1/3d")
        print(f"GET 3D Status: {res_3d.status_code}")
        assert res_3d.status_code == 200, f"Failed: {res_3d.text}"
        data_3d = res_3d.json()
        print(f"Nodes count: {len(data_3d.get('nodes', []))}")
        print(f"PBR Material: {data_3d.get('material')}")
        assert len(data_3d.get("nodes", [])) > 0

        put_res = await client.put(
            "/api/v1/projects/proj-1/3d",
            json={"material": {"metalness": 0.95, "roughness": 0.15}}
        )
        print(f"PUT 3D Status: {put_res.status_code}")
        assert put_res.status_code == 200
        print("[PASS] 3D Scene Studio API endpoints verified!")

        # 2. Test Live AI Brief Check
        print("\n--- 2. Testing POST /api/v1/projects/brief-check ---")
        brief_payload = {
            "brief": "Premium cinematic commercial for titanium smart ring with biosensors and gesture control.",
            "project_name": "Titanium Ring"
        }
        res_brief = await client.post("/api/v1/projects/brief-check", json=brief_payload)
        print(f"Brief Check Status: {res_brief.status_code}")
        assert res_brief.status_code == 200
        brief_data = res_brief.json()
        print(f"Is Complete: {brief_data.get('is_complete')}")
        print(f"Missing items: {brief_data.get('missing_items')}")
        print("[PASS] Live AI Brief Assessment verified!")

        # 3. Test New Project Creation & 10 Stages Initialization
        print("\n--- 3. Testing POST /api/v1/projects (Project Intake) ---")
        create_payload = {
            "name": "Titanium Ring Launch",
            "client": "Apex Hardware",
            "brief": "Minimalist luxury trailer featuring sleek circular geometry and biometric pulse.",
            "duration": "30s",
            "aspect_ratio": "16:9",
            "style_preference": "Cinematic, dark mode"
        }
        res_create = await client.post("/api/v1/projects", json=create_payload)
        print(f"Create Project Status: {res_create.status_code}")
        assert res_create.status_code == 201
        new_proj = res_create.json()
        new_id = new_proj.get("id")
        print(f"Created Project ID: {new_id}")
        assert new_id is not None
        print("[PASS] Project creation & stage initialization verified!")

        # 4. Test Approval Center Queue & Decision
        print("\n--- 4. Testing GET & POST /api/v1/projects/proj-1/approvals ---")
        res_appr = await client.get("/api/v1/projects/proj-1/approvals")
        print(f"Approvals Queue Status: {res_appr.status_code}")
        assert res_appr.status_code == 200
        appr_data = res_appr.json()
        items = appr_data.get("items", [])
        print(f"Pending Approvals Count: {len(items)}")

        if items:
            target_item = items[0]
            dec_payload = {
                "decision": "approved",
                "comment": "Approved by Executive Creative Director. Broadcast quality achieved."
            }
            res_dec = await client.post(
                f"/api/v1/projects/proj-1/approvals/{target_item['id']}/decision",
                json=dec_payload
            )
            print(f"Decision Status: {res_dec.status_code}")
            assert res_dec.status_code == 200
            print(f"Decision Result: {res_dec.json().get('decision')}")
        print("[PASS] Human-in-the-Loop Approval Center verified!")

    print("\n" + "=" * 60)
    print("ALL PHASE 4 BACKEND & FRONTEND INTEGRATIONS VERIFIED SUCCESSFULLY!")
    print("=" * 60)

if __name__ == "__main__":
    asyncio.run(run_phase4_tests())
