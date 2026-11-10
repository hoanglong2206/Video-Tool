import asyncio
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
if str(root) not in sys.path:
    sys.path.insert(0, str(root))

from sqlalchemy import text
from server.backend.src.infrastructure.database.session import engine


async def verify():
    async with engine.connect() as conn:
        res = await conn.execute(
            text(
                "SELECT table_name FROM information_schema.tables "
                "WHERE table_schema = 'public' ORDER BY table_name;"
            )
        )
        tables = [r[0] for r in res.fetchall()]
        print("TOTAL TABLES IN DATABASE:", len(tables))
        for t in tables:
            print(" ->", t)


if __name__ == "__main__":
    asyncio.run(verify())
