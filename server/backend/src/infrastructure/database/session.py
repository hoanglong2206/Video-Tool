from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from server.backend.src.core.config import settings

# Engine configuration with Supabase / asyncpg optimizations
connect_args: dict[str, object] = {
    "server_settings": {"application_name": "ai_motion_studio_backend"},
}

if "supabase" in settings.DATABASE_URL or "ssl=require" in settings.DATABASE_URL:
    connect_args["ssl"] = "require"
    # When connecting to Supabase transaction pooler (port 6543) or session mode
    connect_args["statement_cache_size"] = 0
    connect_args["prepared_statement_cache_size"] = 0

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DB_ECHO,
    pool_size=settings.POSTGRES_POOL_SIZE,
    max_overflow=settings.POSTGRES_MAX_OVERFLOW,
    connect_args=connect_args,
)

async_session_maker = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)


async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    """FastAPI dependency yielding an async database session per request."""
    async with async_session_maker() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
