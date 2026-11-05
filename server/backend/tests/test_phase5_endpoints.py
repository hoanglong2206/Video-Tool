import asyncio
import sys
from pathlib import Path

# Add project root to sys.path
root = Path(__file__).resolve().parent.parent.parent.parent
sys.path.insert(0, str(root))

from httpx import AsyncClient, ASGITransport
from server.backend.src.main import app
from server.backend.src.infrastructure.cache.cache_service import cache_service
from server.backend.src.infrastructure.events.bus import event_bus

async def run_phase5_tests():
    print("=" * 60)
    print("STARTING PHASE 5 DEVOPS, CACHE & SSE STREAMING TESTS")
    print("=" * 60)

    # 1. Test Hybrid Cache Adapter
    print("\n--- 1. Testing Hybrid Cache Service ---")
    await cache_service.set("test_key", {"version": "v1.2", "resolution": "4K"}, ttl_seconds=60)
    val = await cache_service.get("test_key")
    assert val is not None, "Cache get returned None"
    assert val.get("version") == "v1.2", f"Cache value mismatch: {val}"
    stats = cache_service.get_stats()
    print(f"Cache engine: {stats.get('engine')}")
    print(f"Active keys count: {stats.get('active_keys_count')}")
    await cache_service.delete("test_key")
    deleted_val = await cache_service.get("test_key")
    assert deleted_val is None, "Cache delete failed"
    print("[PASS] Hybrid Cache Service operations verified!")

    # 2. Test Real-time Event Bus
    print("\n--- 2. Testing Event Bus Pub/Sub ---")
    queue = event_bus.subscribe()
    test_payload = {"stage": 7, "progress": 85, "message": "Rendering Remotion passes"}
    await event_bus.publish("render:progress", test_payload)

    received = await asyncio.wait_for(queue.get(), timeout=2.0)
    print(f"Received Event: {received.get('event')}")
    print(f"Event Data: {received.get('data')}")
    assert received.get("event") == "render:progress"
    assert received.get("data", {}).get("progress") == 85
    event_bus.unsubscribe(queue)
    print("[PASS] Event Bus Pub/Sub verified!")

    # 3. Test HTTP Probes & SSE Stream via AsyncClient
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # Liveness probe
        print("\n--- 3. Testing GET /health (Liveness) ---")
        live_res = await client.get("/health")
        print(f"Liveness Status: {live_res.status_code}")
        assert live_res.status_code == 200
        print(f"Response: {live_res.json()}")

        # Deep Readiness probe
        print("\n--- 4. Testing GET /health/ready (Deep Readiness Probe) ---")
        ready_res = await client.get("/health/ready")
        print(f"Readiness Status: {ready_res.status_code}")
        assert ready_res.status_code == 200, f"Readiness probe failed: {ready_res.text}"
        ready_data = ready_res.json()
        components = ready_data.get("components", {})
        print(f"Overall Status: {ready_data.get('status')}")
        print(f"Database Component: {components.get('database')}")
        print(f"FFmpeg Component: {components.get('ffmpeg')}")
        print(f"Storage Component: {components.get('storage')}")
        print(f"AI Engine Component: {components.get('ai_engine')}")
        print(f"Cache Component: {components.get('cache')}")
        assert components.get("database", {}).get("status") == "healthy"
        assert components.get("ffmpeg", {}).get("status") == "healthy"
        assert components.get("storage", {}).get("status") == "healthy"
        print("[PASS] Deep Diagnostic Readiness Probe verified!")

    print("\n" + "=" * 60)
    print("ALL PHASE 5 TESTS COMPLETED SUCCESSFULLY!")
    print("=" * 60)

if __name__ == "__main__":
    asyncio.run(run_phase5_tests())
