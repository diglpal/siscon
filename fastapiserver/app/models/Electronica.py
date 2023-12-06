from typing import Optional
from pydantic import BaseModel


class Electronica(BaseModel):
    id: int
    centro_id: int
    nome: Optional[str] = None
    tipo: Optional[str] = None
    modelo: Optional[str] = None
    ubicacion: Optional[str] = None
    estado: Optional[str] = None
    ip: str

    class Config:
        from_attributes = True
