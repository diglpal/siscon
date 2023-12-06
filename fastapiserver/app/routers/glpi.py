from app.functions.glpi_functions import get_incidencias_conexion_centro, format_pool_to_json, glpi_auth
from fastapi import APIRouter, Depends, HTTPException
from starlette.responses import JSONResponse
from fastapi import status
from app.models.GLPI import GLPI, LoginGLPI
from app.schemas import Schema
from sqlalchemy.orm import Session
from app.db import SessionLocal
from cryptography.fernet import Fernet


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


router = APIRouter(
    prefix="/glpi",
    tags=["glpi"],
    responses={404: {"description": "Not found"}}
)


def get_user_by_usuario(db: Session, usuario: str):
    return db.query(Schema.Usuario).filter(Schema.Usuario.usuario == usuario).first()


def cifrar(texto):
    key = Fernet.generate_key()
    f = Fernet(key)
    texto_cifrado = f.encrypt(texto.encode())
    print(texto_cifrado)
    texto_descifrado = f.decrypt(texto_cifrado).decode()
    print(texto_descifrado)
    return {
        "key": key,
        "texto_cifrado": texto_cifrado
    }


def descifrar(texto_cifrado, key):
    f = Fernet(key)
    texto_descifrado = f.decrypt(texto_cifrado).decode()
    return texto_descifrado


async def gardar_contrasinal_glpi(db: Session, db_user: Schema.Usuario, contrasinal):
    cifrado = cifrar(contrasinal)
    db_user.contrasinal_glpi = cifrado["texto_cifrado"]
    db_user.dkey = cifrado["key"]
    db_user.autenticado_glpi = True
    db.commit()


async def borrar_contrasinal_glpi(db: Session, db_user: Schema.Usuario):
    db_user.contrasinal_glpi = None
    db_user.autenticado_glpi = False
    db.commit()


@router.post("/auth")
async def login(request: LoginGLPI, db: Session = Depends(get_db)):
    db_user = get_user_by_usuario(db, request.username)
    if db_user is None:
        raise HTTPException(status_code=404, detail="O usuario non existe")

    if (db_user.autenticado_glpi):
        contrasinal_glpi = descifrar(db_user.contrasinal_glpi, db_user.dkey)
        request.password = contrasinal_glpi

    data = glpi_auth(request)
    if (data):
        if not db_user.autenticado_glpi:
            await gardar_contrasinal_glpi(db, db_user, request.password)
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": data})
    else:
        if db_user.autenticado_glpi:
            await borrar_contrasinal_glpi(db, db_user)
        raise HTTPException(
            status_code=400, detail="Non foi posible a conexión con GLPI")


@router.post("/incidencias-centro")
def get_incidencias_centro_route(request: GLPI):
    try:
        incidencias = format_pool_to_json(
            get_incidencias_conexion_centro(request))
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": incidencias})
    except:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"error": True, "message": "Erro obtendo as incidencias do centro"})
