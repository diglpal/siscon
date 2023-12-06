from typing import Optional
from pydantic import BaseModel


class LAN(BaseModel):
    id: int
    centro_id: int
    rede: Optional[str]
    rango: str
    dhcp: bool

    class Config:
        from_attributes = True


class ResultadosProbasConexion(BaseModel):
    ip: str
    resultado: str


class ActualizarLAN(BaseModel):
    id: int
    rango: str
    rede: str
    dhcp: bool
