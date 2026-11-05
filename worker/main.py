import asyncio
import sys
from pathlib import Path

# Add project root to sys.path
root = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(root))

from worker.daemon import workflow_daemon

async def main():
    print("=" * 60)
    print("AI MOTION STUDIO · BACKGROUND WORKER DAEMON STARTED")
    print("=" * 60)
    print("[INFO] Listening for asynchronous production stages & render jobs...")
    
    # In daemon mode, can loop and process pending jobs or listen to events
    while True:
        await asyncio.sleep(5)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n[INFO] Worker daemon stopped gracefully.")
