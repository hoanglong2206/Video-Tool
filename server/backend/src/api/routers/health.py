from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health_check() -> dict[str, str]:
    """Basic health check probe for orchestration and load balancers."""
    return {"status": "ok", "service": "backend", "version": "1.0.0"}

