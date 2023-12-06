from typing import Optional
from pydantic import BaseModel


class RackModel(BaseModel):
    id: int
    centro_id: int
    tipo: Optional[str]
    ubicacion: Optional[str]
    nome: str

    class Config:
        from_attributes = True
