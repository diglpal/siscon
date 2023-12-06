from typing import Optional
from pydantic import BaseModel


class SearchUser(BaseModel):
    username: str


class Login(BaseModel):
    username: str
    password: str


class Identificador(BaseModel):
    id: int


class Usuario(BaseModel):
    id: int
    usuario: str
    nome: str
    grupo: str
    autenticado: bool
    autenticado_glpi: Optional[bool] = False

    class Config:
        from_attributes = True


class ActualizarUsuario(BaseModel):
    id: int
    usuario: str
    nome: str
    grupo: str


class EngadirUsuario(BaseModel):
    usuario: str
    nome: str
    grupo: str


class LoginResponse(BaseModel):
    usuario: Usuario
    access_token: str
    token_type: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class User(BaseModel):
    usuario: str
    nome: Optional[str] = None
    grupo: Optional[str] = 'n1'
    autenticado: Optional[bool] = False
    autenticado_glpi: Optional[str] = None

    class Config:
        from_attributes = True
