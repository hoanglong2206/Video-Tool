import asyncio
from logging.config import fileConfig
import sys
from pathlib import Path

# Ensure root workspace is on sys.path
WORKSPACE_ROOT = Path(__file__).resolve().parent.parent.parent.parent
if str(WORKSPACE_ROOT) not in sys.path:
    sys.path.insert(0, str(WORKSPACE_ROOT))

from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import create_async_engine

from alembic import context
from server.backend.src.core.config import settings
from server.backend.src.infrastructure.database.base import Base
# Import all models so that Base.metadata contains them
import server.backend.src.infrastructure.database.models  # noqa: F401

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = settings.DATABASE_URL
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection: Connection) -> None:
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations() -> None:
    """Run migrations in 'online' mode with asyncpg and Supabase settings."""
    connect_args = {}
    if "supabase" in settings.DATABASE_URL or "ssl=require" in settings.DATABASE_URL:
        connect_args["ssl"] = "require"
        connect_args["statement_cache_size"] = 0
        connect_args["prepared_statement_cache_size"] = 0

    connectable = create_async_engine(
        settings.DATABASE_URL,
        poolclass=pool.NullPool,
        connect_args=connect_args,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    asyncio.run(run_async_migrations())


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
