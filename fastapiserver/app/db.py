from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from app.config import SYSTEM_BD, SYSTEM_BD_USERNAME, SYSTEM_BD_PASSWORD

SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{
    SYSTEM_BD_USERNAME}:{SYSTEM_BD_PASSWORD}@localhost/{SYSTEM_BD}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
