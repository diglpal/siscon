from fastapi import Depends, FastAPI
from .db import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
from .routers import centros, conexion, usuarios, glpi
from .schemas import Schema

Schema.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://siscon.uac", "http://siscon.uac/dashboard",
                   "http://siscon.uac/admin", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(usuarios.router)
app.include_router(centros.router)
app.include_router(conexion.router)
app.include_router(glpi.router)


@app.get("/")
async def root():
    return
