from models.models import PullIn, PullOut, PullUpdate
from db.db import pulls, database


async def add_pull(payload: PullIn):
    query = pulls.insert().values(**payload.dict())

    return await database.execute(query=query)

async def get_all_pulls():
    query = pulls.select()
    return await database.fetch_all(query=query)

async def get_pull(id):
    query = pulls.select(pulls.c.id==id)
    return await database.fetch_one(query=query)
 

async def update_pull(id: int, payload: PullIn):
    query = (
        pulls
        .update()
        .where(pulls.c.id == id)
        .values(**payload.dict())
    )
    return await database.execute(query=query)