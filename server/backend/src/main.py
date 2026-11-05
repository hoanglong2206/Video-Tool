from contextlib import asynccontextmanager
from typing import AsyncGenerator
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.backend.src.core.config import settings
from server.backend.src.api.routers import health, dashboard, projects, workflow


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
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(health.router)
app.include_router(dashboard.router)
app.include_router(projects.router)
app.include_router(workflow.router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "server.backend.src.main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.DEBUG,
    )
