import logging
from contextlib import asynccontextmanager
from typing import AsyncGenerator
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from server.backend.src.core.config import settings
from server.backend.src.api.routers import health, dashboard, projects, workflow, storyboard, assets, scenes, threed, approvals, library, render, assistant, events

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Startup and shutdown lifecycle events."""
    yield


app = FastAPI(
    title="AI Motion Studio API",
    description="Backend API Gateway for AI Motion Studio production pipeline",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# CORS configuration for Frontend Studio
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_origin_regex=settings.CORS_ORIGIN_REGEX,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Ensure any unhandled server exception preserves CORS headers and returns structured JSON."""
    logger.exception("Unhandled server exception at %s: %s", request.url.path, exc)
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc) if settings.DEBUG else "An unexpected server error occurred."},
    )


# Register routers
app.include_router(health.router)
app.include_router(dashboard.router)
app.include_router(projects.router)
app.include_router(workflow.router)
app.include_router(storyboard.router)
app.include_router(assets.router)
app.include_router(scenes.router)
app.include_router(threed.router)
app.include_router(approvals.router)
app.include_router(library.router)
app.include_router(render.router)
app.include_router(assistant.router)
app.include_router(events.router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "server.backend.src.main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.DEBUG,
    )
