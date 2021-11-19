from fastapi import  HTTPException, Depends

from typing_extensions import Annotated
# Field désigne une valeur
from pydantic import BaseModel, Field

# Set une valeur par défaut
from typing_extensions import Annotated
from uuid import uuid4
from datetime import datetime

from sqlalchemy.sql.schema import ForeignKeyConstraint, UniqueConstraint
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from sqlalchemy import Column, String, DateTime, Float,Boolean, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Session
import os
import json

class Utilisateur_Schema(BaseModel):
    utilisateur_id: Annotated[str, Field(default_factory=lambda: uuid4().hex)]
    nom_utilisateur: str
    email : str
    mdp : str
    # is_verified :bool
    created_at: Annotated[datetime, Field(default_factory=lambda: datetime.now())]

    class Config:
        # cette classe est compatible avec le système
        orm_mode = True

class Panier_Schema(BaseModel):
    utilisateur_id: str
    produit_id: str
    quantite: int

class Produit_Schema(BaseModel):
    produit_id: Annotated[str, Field(default_factory=lambda: uuid4().hex)]
    nom_produit: str
    categorie: str
    prix: float
    product_image: str
    description: str
    quantite: int
    created_at: Annotated[datetime, Field(default_factory=lambda: datetime.now())]
    
    class Config:
        # cette classe est compatible avec le système
        orm_mode = True



# class Utilisateur_Schema_Nom(BaseModel):
#     nom_utilisateur: Optional[str]


POSTGRES_USER = os.environ.get("POSTGRES_USER")
POSTGRES_PASSWORD = os.environ.get("POSTGRES_PASSWORD")
POSTGRES_DB = os.environ.get("POSTGRES_DB")

# sans docker 
SQLALCHEMY_DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@postgres/{POSTGRES_DB}"
print(SQLALCHEMY_DATABASE_URL)

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

BaseSQL = declarative_base()


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

class Utilisateur_Model(BaseSQL):
    __tablename__ = "Utilisateur"

    utilisateur_id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    nom_utilisateur = Column(String, unique=True)
    email = Column(String, unique=True)
    mdp = Column(String)
    # is_verified = Column(Boolean)
    created_at = Column(DateTime())
    UniqueConstraint("nom_utilisateur")

class Panier_Model(BaseSQL):
    __tablename__ = "Panier"

    utilisateur_id = Column(String, primary_key=True)
    produit_id = Column(String, primary_key=True)
    ForeignKeyConstraint(['utilisateur_id', 'produit_id'], ['Utilisateur_Model.utilisateur_id', 'Produit_Model.produit_id'])

class Produit_Model(BaseSQL):
    __tablename__ = "Produit"

    produit_id= Column(UUID(as_uuid=True), primary_key=True, index=True)
    nom_produit = Column(String)
    categorie = Column(String)
    prix = Column(Float)
    product_image = Column(String)
    created_at = Column(DateTime())
    description = Column(String)
    quantite = Column(Integer)

# login dans psql : psql -U userpd -W dbesiee, puis rentre le mdp  (postgrespassword)
# afficher la table : select * from "Product";


def init_db(db:Session = Depends(get_db)):
    with open('response.json', encoding='utf-8') as data_file:
        init_data = json.loads(data_file.read())

    for data in init_data:
        data = Produit_Model(**data)
        db.add(data)
        db.commit()
    return init_data


def get_utilisateur_par_id(utilisateur_id: str, db: Session = Depends(get_db)) -> Utilisateur_Model:
    utilisateur_db = db.query(Utilisateur_Model).filter(Utilisateur_Model.utilisateur_id == utilisateur_id).first()
    if not utilisateur_db:
        raise HTTPException(status_code=404, detail="Not Found") 
    return utilisateur_db

def get_produit_par_id(produit_id: str, db: Session = Depends(get_db)) -> Produit_Model:
    produit_db = db.query(Produit_Model).filter(Produit_Model.produit_id == produit_id).first()
    if not produit_db:
        raise HTTPException(status_code=404, detail="Not Found") 
    produit_db.utilisateur_id = str(produit_db.produit_id)
    return produit_db

def get_utilisateur_par_mail(email: str, db: Session = next(get_db())) -> Utilisateur_Model:
    utilisateur_db = db.query(Utilisateur_Model).filter(Utilisateur_Model.email == email).first()
    if not utilisateur_db:
        raise HTTPException(status_code=404, detail="Not Found") 
    return utilisateur_db