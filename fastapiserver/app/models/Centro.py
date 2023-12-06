
from typing import Optional
from pydantic import BaseModel
from app.models import LAN, Electronica, Rack


class PredecirCentro(BaseModel):
    centro: str


class Centro(BaseModel):
    id: int
    sf: str
    centro: str
    concello: str
    comentario: Optional[str]
    tap: str
    tar: Optional[str]
    imaxe: Optional[str]

    class Config:
        from_attributes = True


class PlantaModel(BaseModel):
    id: int
    edificio_id: int
    nome: str
    plano_url: Optional[str]


class EdificioModel(BaseModel):
    id: int
    centro_id: int
    nome: str
    plantas: list[PlantaModel]


class CompletedCentro(Centro):
    lans: list[LAN.LAN]
    racks: list[Rack.RackModel]
    electronica: list[Electronica.Electronica]
    edificios: list[EdificioModel]

    class Config:
        from_attributes = True


class InfoSistemasCentro(BaseModel):
    controladora: Optional[str]
    contrasinal_siega: Optional[str]
    contrasinal_edu_xunta: Optional[str]
