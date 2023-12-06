from typing import Optional
from pydantic import BaseModel


class GLPI(BaseModel):
    csrf_token: str
    cookie: object
    searchform_id: str
    centro: Optional[str]


class LoginGLPI(BaseModel):
    username: str
    password: Optional[str] = None
