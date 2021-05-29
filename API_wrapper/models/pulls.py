from typing import List
from fastapi import Header, APIRouter

from models.models import PullIn, PullOut, PullUpdate
import db_manager

pulls = APIRouter()

@pulls.get('/pulls', response_model=List[PullOut])
async def index():
    return await db_manager.get_all_pulls()

@pulls.post('/pull', status_code=201)
async def add_pull(payload: PullIn):
    pull_id = await db_manager.add_pull(payload)
    response = {
        'id': pull_id,
        **payload.dict()
    }

    return response

@pulls.put('/pull/{id}')
async def update_pull(id: int, payload: PullIn):
    pull = await db_manager.get_pull(id)
    if not pull:
        raise HTTPException(status_code=404, detail="Pull not found")

    update_data = payload.dict(exclude_unset=True)
    pull_in_db = PullIn(**pull)

    updated_pull = pull_in_db.copy(update=update_data)

    return await db_manager.update_pull(id, updated_pull)
