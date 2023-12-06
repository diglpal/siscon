from fastapi import APIRouter, Depends
from app.db import SessionLocal
from app.utils.doping import doping
from app.utils.comprobar_si_eduxunta import comprobar_si_eduxunta
from sqlalchemy.orm import Session
from .centros import get_lans_centro
from app.models.LAN import ResultadosProbasConexion

router = APIRouter(
    prefix="/conexion",
    tags=["conexión"],
    responses={404: {"description": "Not found"}}
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/{centroId}", response_model=list[ResultadosProbasConexion])
def comprobar_rede(centroId, db: Session = Depends(get_db)):
    lans = get_lans_centro(db, centroId)
    pings = ["1", "7", "10"]
    resultados = []
    for lan in lans:
        if not comprobar_si_eduxunta(lan.rango):
            for ping in pings:
                ip = lan.rango.split('.')
                ip.pop()
                ip = ".".join(ip)
                ip = f"{ip}.{str(ping)}"
                resultado = doping(ip)
                resultados.append({"ip": ip, "resultado": resultado})

    return resultados
