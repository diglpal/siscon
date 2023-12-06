from sqlalchemy import Column, ForeignKey, Integer, String, inspect
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import TINYINT

from app.db import Base


class Centro(Base):
    __tablename__ = "centros"

    id = Column(Integer, primary_key=True, index=True)
    sf = Column(String)
    centro = Column(String)
    concello = Column(String)
    comentario = Column(String)
    tap = Column(String)
    tar = Column(String)
    imaxe = Column(String)
    controladora = Column(String)
    contrasinal_siega = Column(String)
    contrasinal_edu_xunta = Column(String)

    lans = relationship("Lan", back_populates="centro")
    electronica = relationship("Electronica", back_populates="centro")
    racks = relationship("Rack", back_populates="centro")
    edificios = relationship("Edificio", back_populates="centro")


class Lan(Base):
    __tablename__ = "lans"

    id = Column(Integer, primary_key=True, index=True)
    centro_id = Column(Integer, ForeignKey("centros.id"))
    rango = Column(String)
    rede = Column(String)
    dhcp = Column(TINYINT)

    centro = relationship("Centro", back_populates="lans")


class Electronica(Base):
    __tablename__ = "electronica"

    id = Column(Integer, primary_key=True, index=True)
    centro_id = Column(Integer, ForeignKey("centros.id"))
    nome = Column(String)
    tipo = Column(String)
    modelo = Column(String)
    ubicacion = Column(String)
    estado = Column(String)
    ip = Column(String)

    centro = relationship("Centro", back_populates="electronica")


class Rack(Base):
    __tablename__ = "racks"

    id = Column(Integer, primary_key=True, index=True)
    centro_id = Column(Integer, ForeignKey("centros.id"))
    nome = Column(String)
    tipo = Column(String)
    ubicacion = Column(String)

    centro = relationship("Centro", back_populates="racks")


class Edificio(Base):
    __tablename__ = "edificios"

    id = Column(Integer, primary_key=True, index=True)
    centro_id = Column(Integer, ForeignKey("centros.id"))
    nome = Column(String)

    centro = relationship("Centro", back_populates="edificios")
    plantas = relationship("Planta", back_populates="edificio")


class Planta(Base):
    __tablename__ = "plantas"

    id = Column(Integer, primary_key=True, index=True)
    edificio_id = Column(Integer, ForeignKey("edificios.id"))
    nome = Column(String)
    plano_url = Column(String)

    edificio = relationship("Edificio", back_populates="plantas")


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    usuario = Column(String, index=True)
    nome = Column(String)
    contrasinal = Column(String)
    grupo = Column(String)
    autenticado = Column(TINYINT)
    contrasinal_glpi = Column(String)
    autenticado_glpi = Column(TINYINT)
    dkey = Column(String)

    def toDict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
