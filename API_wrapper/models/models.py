from typing import List,Optional
from pydantic import BaseModel

class PullIn(BaseModel):
    author: str
    title: str
    description: str
    status: str
    base: str
    compare: str

class PullOut(PullIn):
    id: int

class PullUpdate(PullIn): 
    author: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    base: Optional[str] = None
    compare: Optional[str] = None