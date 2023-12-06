from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse

from app.utils.doping import doping
from ..models.Centro import Centro, PredecirCentro, InfoSistemasCentro, CompletedCentro
from ..models.LAN import LAN, ActualizarLAN
from ..models.Electronica import Electronica
from app.models import Rack
from app.db import SessionLocal
from sqlalchemy.orm import Session
from app.schemas import Schema

router = APIRouter(
    prefix="/centros", tags=["centros"], responses={404: {"description": "Not found"}}
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_centros(db: Session):
    return db.query(Schema.Centro).order_by(Schema.Centro.centro).all()


def get_centro_by_id(db: Session, id: int):
    return db.query(Schema.Centro).filter(Schema.Centro.id == id).first()


def get_lans_centro(db: Session, id: int):
    return db.query(Schema.Lan).filter(Schema.Lan.centro_id == id).all()


def get_lan_by_id(db: Session, id: int):
    return db.query(Schema.Lan).filter(Schema.Lan.id == id).first()


def delete_lan(db: Session, id: int):
    return db.query(Schema.Lan).filter(Schema.Lan.id == id).delete()


def get_electronica_centro(db: Session, id: int):
    return db.query(Schema.Electronica).filter(Schema.Electronica.centro_id == id).order_by(Schema.Electronica.ip).all()


def get_electronica_by_id(db: Session, id: int):
    return db.query(Schema.Electronica).filter(Schema.Electronica.id == id).first()


def delete_electronica(db: Session, id: int):
    return db.query(Schema.Electronica).filter(Schema.Electronica.id == id).delete()


def get_rack_by_id(db: Session, id: int):
    return db.query(Schema.Rack).filter(Schema.Rack.id == id).first()


def get_rack_by_centro_and_name(db: Session, centroId: int, rack_name: str):
    return db.query(Schema.Rack).filter(Schema.Rack.centro_id == centroId, Schema.Rack.nome == rack_name).first()


def delete_rack(db: Session, id: int):
    return db.query(Schema.Rack).filter(Schema.Rack.id == id).delete()


def get_centros_by_name(db: Session, centro: str):
    search = "%{}%".format(centro)
    return db.query(Schema.Centro).filter(Schema.Centro.centro.like(search)).limit(5)


@router.get("", response_model=list[Centro])
def obter_centros(db: Session = Depends(get_db)):
    centros = get_centros(db)
    return centros


@router.get("/{centroId}", response_model=CompletedCentro)
def obter_info_centro(centroId, db: Session = Depends(get_db)):
    db_centro = get_centro_by_id(db, int(centroId))
    if db_centro is None:
        raise HTTPException(status_code=404, detail="O centro non existe")
    return db_centro


@router.put("/info/{centroId}", response_model=Centro)
def obter_info_centro(centroId, request: Centro, db: Session = Depends(get_db)):
    db_centro = get_centro_by_id(db, int(centroId))
    if db_centro is None:
        raise HTTPException(status_code=404, detail="O centro non existe")

    db_centro.tap = request.tap
    db_centro.tar = request.tar
    db_centro.comentario = request.comentario
    db.commit()

    return db_centro


@router.get("/info-sistemas/{centroId}", response_model=InfoSistemasCentro)
def obter_info_sistemas(centroId, db: Session = Depends(get_db)):
    db_centro = get_centro_by_id(db, int(centroId))
    if db_centro is None:
        raise HTTPException(status_code=404, detail="O centro non existe")

    infoSistemas = {
        "controladora": db_centro.controladora,
        "contrasinal_siega": db_centro.contrasinal_siega,
        "contrasinal_edu_xunta": db_centro.contrasinal_edu_xunta
    }

    return infoSistemas


@router.put("/info-sistemas/{centroId}", response_model=Centro)
async def update_info_sistemas_route(centroId, request: InfoSistemasCentro, db: Session = Depends(get_db)):
    db_centro = get_centro_by_id(db, int(centroId))
    if db_centro is None:
        raise HTTPException(status_code=404, detail="O centro non existe")

    db_centro.controladora = request.controladora
    db_centro.contrasinal_edu_xunta = request.contrasinal_edu_xunta
    db_centro.contrasinal_siega = request.contrasinal_siega
    db.commit()

    return db_centro


@router.post("/busqueda", response_model=list[Centro])
async def pick(request: PredecirCentro, db: Session = Depends(get_db)):
    prediccions = get_centros_by_name(db, request.centro)
    return prediccions

## LANS ##


@router.get("/lans/{centroId}", response_model=list[LAN])
def get_lans_centro_route(centroId, db: Session = Depends(get_db)):
    db_centro = get_centro_by_id(db, int(centroId))
    if db_centro is None:
        raise HTTPException(status_code=404, detail="O centro non existe")

    lans = get_lans_centro(db, centroId)
    return lans


@router.post("/lans/{centroId}", response_model=LAN)
async def create_lan(request: LAN, db: Session = Depends(get_db)):
    db_centro = get_centro_by_id(db, request.centro_id)
    if db_centro is None:
        raise HTTPException(status_code=404, detail="O centro non existe")

    db_lan = Schema.Lan(
        centro_id=request.centro_id,
        rango=request.rango,
        rede=request.rede,
        dhcp=request.dhcp,
    )
    db.add(db_lan)
    db.commit()
    db.refresh(db_lan)

    return db_lan


@router.put("/lans/{lanId}", response_model=LAN)
async def update_lan(lanId, request: ActualizarLAN, db: Session = Depends(get_db)):
    db_lan = get_lan_by_id(db, int(lanId))
    if db_lan is None:
        raise HTTPException(status_code=404, detail="A LAN non existe")

    db_lan.rango = request.rango
    db_lan.rede = request.rede
    db_lan.dhcp = request.dhcp
    db.commit()

    return db_lan


@router.delete("/lans/{lanId}")
async def delete_lan_route(lanId, db: Session = Depends(get_db)):
    db_lan = get_lan_by_id(db, int(lanId))
    if db_lan is None:
        raise HTTPException(status_code=404, detail="A LAN non existe")

    rows = delete_lan(db, lanId)
    if rows is not None and rows > 0:
        db.commit()

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "message": "OK"},
        )

    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": "BAD REQUEST"},
    )


## ELECTRONICA ##
@router.get("/electronica/{centroId}", response_model=list[Electronica])
def get_electronica_centro_route(centroId, db: Session = Depends(get_db)):
    db_centro = get_centro_by_id(db, int(centroId))
    if db_centro is None:
        raise HTTPException(status_code=404, detail="O centro non existe")

    electronica = get_electronica_centro(db, centroId)
    for el in electronica:
        el.estado = doping(el.ip)

    return electronica


@router.post("/electronica/{centroId}", response_model=Electronica)
async def create_electronica(request: Electronica, db: Session = Depends(get_db)):
    db_centro = get_centro_by_id(db, request.centro_id)
    if db_centro is None:
        raise HTTPException(status_code=404, detail="O centro non existe")

    db_electronica = Schema.Electronica(
        centro_id=request.centro_id,
        ip=request.ip,
        tipo=request.tipo,
        ubicacion=request.ubicacion,
    )
    db.add(db_electronica)
    db.commit()
    db.refresh(db_electronica)

    return db_electronica


@router.put("/electronica/{electronicaId}", response_model=Electronica)
async def update_electronica(electronicaId, request: Electronica, db: Session = Depends(get_db)):
    db_electronica = get_electronica_by_id(db, int(electronicaId))
    if db_electronica is None:
        raise HTTPException(status_code=404, detail="A electrónica non existe")

    db_electronica.ip = request.ip
    db_electronica.tipo = request.tipo
    db_electronica.ubicacion = request.ubicacion
    db.commit()

    return db_electronica


@router.delete("/electronica/{electronicaId}")
async def delete_electronica_route(electronicaId, db: Session = Depends(get_db)):
    db_electronica = get_electronica_by_id(db, int(electronicaId))
    if db_electronica is None:
        raise HTTPException(status_code=404, detail="A electrónica non existe")

    rows = delete_electronica(db, electronicaId)
    if rows is not None and rows > 0:
        db.commit()

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "message": "OK"},
        )

    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": "BAD REQUEST"},
    )


## RACKS ##

@router.post("/racks/{centroId}", response_model=Rack.RackModel)
async def create_rack(request: Rack.RackModel, db: Session = Depends(get_db)):
    db_centro = get_centro_by_id(db, request.centro_id)
    if db_centro is None:
        raise HTTPException(status_code=404, detail="O centro non existe")

    db_rack = get_rack_by_centro_and_name(db, request.centro_id, request.nome)
    if db_rack is not None:
        raise HTTPException(
            status_code=302, detail="Xa existe un rack con ese nome")

    db_rack = Schema.Rack(
        centro_id=request.centro_id,
        nome=request.nome,
        tipo=request.tipo,
        ubicacion=request.ubicacion,
    )
    db.add(db_rack)
    db.commit()
    db.refresh(db_rack)

    return db_rack


@router.put("/racks/{rackId}", response_model=Rack.RackModel)
async def update_rack(rackId, request: Rack.RackModel, db: Session = Depends(get_db)):
    db_rack = get_rack_by_id(db, int(rackId))
    if db_rack is None:
        raise HTTPException(status_code=404, detail="O rack non existe")

    db_rack_check = get_rack_by_centro_and_name(
        db, request.centro_id, request.nome)
    if db_rack_check is not None and db_rack_check.id != db_rack.id:
        raise HTTPException(
            status_code=302, detail="Xa existe un rack con ese nome")

    if db_rack.nome != request.nome:
        print("si")
        db_electronica = get_electronica_centro(db, db_rack.centro_id)
        for device in db_electronica:
            if device.ubicacion == db_rack.nome:
                device.ubicacion = request.nome

    db_rack.nome = request.nome
    db_rack.tipo = request.tipo
    db_rack.ubicacion = request.ubicacion
    db.commit()

    return db_rack


@router.delete("/racks/{rackId}")
async def delete_racks_route(rackId, db: Session = Depends(get_db)):
    db_rack = get_rack_by_id(db, int(rackId))
    if db_rack is None:
        raise HTTPException(status_code=404, detail="O rack non existe")

    rows = delete_rack(db, rackId)
    if rows is not None and rows > 0:
        db_electronica_centro = get_electronica_centro(db, db_rack.centro_id)
        for device in db_electronica_centro:
            if device.ubicacion == db_rack.nome:
                device.ubicacion = None

        db.commit()

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "message": "OK"},
        )

    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": "BAD REQUEST"},
    )
