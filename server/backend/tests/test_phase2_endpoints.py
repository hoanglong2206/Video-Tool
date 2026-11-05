import asyncio
import os
import sys
from pathlib import Path

# Add project root to sys.path
root = Path(__file__).resolve().parent
sys.path.insert(0, str(root))

from httpx import AsyncClient, ASGITransport
from server.backend.src.main import app

async def run_tests():
    print("=" * 60)
    print("STARTING PHASE 2 BACKEND ENDPOINTS VERIFICATION")
    print("=" * 60)
    
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # 1. Test Brief Check API with LLM
        print("\n--- 1. Testing POST /api/v1/projects/brief-check ---")
        brief_payload = {
            "brief": "Nike Air Max 2026 Commercial. Target: Gen Z athletes and streetwear enthusiasts. Duration: 30s. Aspect ratio: 9:16. Key message: Defy gravity with every leap. Visual style: Cyberpunk neon glows, fast motion blur. Audio: synthwave beat.",
            "project_name": "Nike Air Max 2026"
        }
        res = await client.post("/api/v1/projects/brief-check", json=brief_payload)
        print(f"Status Code: {res.status_code}")
        assert res.status_code == 200, f"Failed: {res.text}"
        data = res.json()
        print(f"Is Complete: {data.get('is_complete')}")
        print(f"Suggested Structure: {data.get('suggested_structure')}")
        print(f"Missing Items: {data.get('missing_items')}")
        print("[PASS] Brief Check passed!")

        # 2. Test Storyboard Generation API with LLM & Supabase persistence
        print("\n--- 2. Testing POST /api/v1/projects/proj-1/storyboard/generate ---")
        gen_payload = {
            "brief": "A futuristic energy drink commercial featuring an athlete sprinting across a cyber metropolis.",
            "num_scenes": 6
        }
        res = await client.post("/api/v1/projects/proj-1/storyboard/generate", json=gen_payload)
        print(f"Status Code: {res.status_code}")
        assert res.status_code == 200, f"Failed: {res.text}"
        sb_data = res.json()
        print(f"Status: {sb_data.get('status')}")
        print(f"Scenes Generated: {sb_data.get('scenesGenerated')}")
        scenes = sb_data.get("scenes", [])
        print(f"First scene title: {scenes[0].get('title') if scenes else 'None'}")
        assert len(scenes) == 6, f"Expected 6 scenes, got {len(scenes)}"
        print("[PASS] Storyboard AI Generation passed!")

        # 3. Test Assistant Copilot Chat API with LLM
        print("\n--- 3. Testing POST /api/v1/assistant/chat ---")
        chat_payload = {
            "message": "How can I improve the pacing of the transition between Scene 2 and Scene 3?",
            "context": {
                "project_id": "proj-1",
                "stage": "Stage 03 · Storyboard",
                "scene_id": "scene-2",
                "layer_name": "Camera Track"
            }
        }
        res = await client.post("/api/v1/assistant/chat", json=chat_payload)
        print(f"Status Code: {res.status_code}")
        assert res.status_code == 200, f"Failed: {res.text}"
        chat_data = res.json()
        print(f"Reply: {chat_data.get('reply_text')[:120]}...")
        assert len(chat_data.get("reply_text", "")) > 0
        print("[PASS] Assistant Copilot Chat passed!")

        # 4. Test Asset Background Removal API with Vision Service & Supabase
        print("\n--- 4. Testing POST /api/v1/projects/proj-1/assets/asset-1/remove-bg ---")
        res = await client.post("/api/v1/projects/proj-1/assets/asset-1/remove-bg")
        print(f"Status Code: {res.status_code}")
        assert res.status_code == 200, f"Failed: {res.text}"
        bg_data = res.json()
        print(f"Status: {bg_data.get('status')}")
        print(f"Format: {bg_data.get('format')}")
        print(f"Message: {bg_data.get('message')}")
        assert bg_data.get("status") == "completed"
        print("[PASS] Asset Background Removal passed!")

    print("\n" + "=" * 60)
    print("ALL PHASE 2 BACKEND ENDPOINTS VERIFIED SUCCESSFULLY!")
    print("=" * 60)

if __name__ == "__main__":
    asyncio.run(run_tests())
