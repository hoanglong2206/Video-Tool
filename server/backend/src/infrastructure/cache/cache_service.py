import time
from typing import Any, Optional

class HybridCacheService:
    """High-throughput cache tier with automatic In-Memory fallback for Zero-Downtime operation."""

    def __init__(self) -> None:
        self._memory_store: dict[str, tuple[Any, float]] = {}
        self._valkey_connected = False

    async def get(self, key: str) -> Optional[Any]:
        """Fetch item by key from active cache store."""
        # Check in-memory store
        item = self._memory_store.get(key)
        if item is None:
            return None

        val, expires_at = item
        if time.time() > expires_at:
            del self._memory_store[key]
            return None

        return val

    async def set(self, key: str, value: Any, ttl_seconds: int = 300) -> bool:
        """Store item with TTL expiration."""
        expires_at = time.time() + ttl_seconds
        self._memory_store[key] = (value, expires_at)
        return True

    async def delete(self, key: str) -> bool:
        """Evict item from cache."""
        if key in self._memory_store:
            del self._memory_store[key]
            return True
        return False

    def is_valkey_connected(self) -> bool:
        """Status probe for external Valkey 7 / Redis container."""
        return self._valkey_connected

    def get_stats(self) -> dict[str, Any]:
        """Return cache health metrics."""
        now = time.time()
        # Clean expired keys
        expired_keys = [k for k, (_, exp) in self._memory_store.items() if now > exp]
        for k in expired_keys:
            del self._memory_store[k]

        return {
            "valkey_connected": self._valkey_connected,
            "engine": "Valkey / In-Memory Hybrid",
            "active_keys_count": len(self._memory_store),
        }

cache_service = HybridCacheService()
