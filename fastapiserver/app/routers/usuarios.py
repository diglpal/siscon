import json
from fastapi import APIRouter, Response
from datetime import datetime, timedelta
from typing import Annotated, Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.hash import pbkdf2_sha256
from passlib.context import CryptContext
from starlette.responses import JSONResponse

from app import config
from app.schemas import Schema
from app.models.Usuario import Login, SearchUser, TokenData, User, Usuario, LoginResponse, Identificador, EngadirUsuario, ActualizarUsuario

from sqlalchemy.orm import Session
from app.db import SessionLocal


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


router = APIRouter(
    prefix="/usuarios", tags=["usuarios"], responses={404: {"description": "Not found"}}
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_user_by_usuario(db: Session, usuario: str):
    return db.query(Schema.Usuario).filter(Schema.Usuario.usuario == usuario).first()


def get_user_by_id(db: Session, id: int):
    return db.query(Schema.Usuario).filter(Schema.Usuario.id == id).first()


def get_users(db: Session):
    return db.query(Schema.Usuario).all()


def delete_user(db: Session, id: int):
    return db.query(Schema.Usuario).filter(Schema.Usuario.id == id).delete()


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, config.SECRET_KEY, algorithm=config.ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token inválido",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, config.SECRET_KEY,
                             algorithms=[config.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        TokenData(username=username)
    except JWTError:
        raise credentials_exception

    user = get_user_by_usuario(db, payload.get("sub"))
    if username is None:
        raise credentials_exception
    return user


async def xerar_token(usuario: Usuario, response: Response):
    access_token_expires = timedelta(
        minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": usuario.usuario}, expires_delta=access_token_expires
    )
    response.set_cookie(key="token", value=access_token)
    return access_token


async def gardar_contrasinal(db: Session, db_user: Schema.Usuario, contrasinal):
    contrasinal_cifrado = pbkdf2_sha256.hash(contrasinal)
    db_user.contrasinal = contrasinal_cifrado
    db_user.autenticado = True
    db.commit()


@router.get("/me", tags=["usuarios"], response_model=Usuario)
async def get_me(current_user: Annotated[User, Depends(get_current_user)]):
    return current_user


@router.post("/buscar-usuario", tags=["usuarios"], response_model=Usuario)
async def get_user(username_request: SearchUser, db: Session = Depends(get_db)):
    db_user = get_user_by_usuario(db, username_request.username)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.post("/login", response_model=LoginResponse)
async def login(login_request: Login, response: Response, db: Session = Depends(get_db)):
    db_user = get_user_by_usuario(db, login_request.username)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    if db_user.autenticado:
        contrasinal_verificado = pbkdf2_sha256.verify(
            login_request.password, db_user.contrasinal
        )

        if not contrasinal_verificado:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"error": True,
                         "message": "Contrasinal incorrecto."},
            )

        access_token = await xerar_token(db_user, response)
        return {
            "usuario": db_user,
            "access_token": access_token,
            "token_type": "bearer",
        }

    await gardar_contrasinal(db, db_user, login_request.password)
    access_token = await xerar_token(db_user, response)
    return {
        "usuario": db_user,
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.get("", tags=["usuarios"], response_model=list[Usuario])
async def get_users_route(db: Session = Depends(get_db)):
    db_users = get_users(db)
    return db_users


@router.post("/engadir", tags=["usuarios"], response_model=Usuario)
async def get_users_route(request: EngadirUsuario, db: Session = Depends(get_db)):
    db_user = get_user_by_usuario(db, request.usuario)
    if db_user is not None:
        raise HTTPException(status_code=409, detail="User already exists")

    db_user = Schema.Usuario(
        nome=request.nome,
        usuario=request.usuario,
        grupo=request.grupo,
        autenticado=False,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


@router.post("/actualizar", tags=["usuarios"])
async def get_users_route(request: ActualizarUsuario, db: Session = Depends(get_db)):
    db_user = get_user_by_id(db, request.id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    db_user.nome = request.nome
    db_user.grupo = request.grupo
    db.commit()

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "message": "OK"},
    )


@router.post("/actualizar-contrasinal", tags=["usuarios"])
async def get_users_route(request: Identificador, db: Session = Depends(get_db)):
    db_user = get_user_by_id(db, request.id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    db_user.contrasinal = None
    db_user.autenticado = False
    db.commit()

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "message": "OK"},
    )


@router.post("/eliminar", tags=["usuarios"])
async def get_users_route(request: Identificador, db: Session = Depends(get_db)):
    db_user = get_user_by_id(db, request.id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    rows = delete_user(db, db_user.id)
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
