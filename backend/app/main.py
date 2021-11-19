from fastapi import FastAPI, HTTPException, Depends, APIRouter, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from datetime import datetime
from sqlalchemy.orm import Session
from authentification import *
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from database import *

app = FastAPI(
    title="PROJET E-COMMERCE",
    description="DSIA-5102A : Application Full Stack Data",
    version="0.0.1",
)

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')

@app.post('/token')
async def generate_token(request_form : OAuth2PasswordRequestForm = Depends()):
    token = await token_generator(request_form.username, request_form.password)
    return {
        "access_token" : token,
        "token_type" : "bearer"
    }

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, '07f1db1734cd4e056f87434ea1db44a770b3a80f9ac851f97f6a619846991ec2', algorithms = ['HS256'])
        utilisateur = get_utilisateur_par_mail(email=payload['email'])
    except:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED, 
            detail = token,
            headers={"WWW-Authenticate": "Bearer"},
        )
    return utilisateur


@app.post('/user/me')
async def user_me(utilisateur: Utilisateur_Model = Depends(get_current_user)):

    return {
        "status" : "ok",
        "data" : {
            "nom d'utilisateur" : utilisateur.nom_utilisateur,
            "email" : utilisateur.email,
            "join_date" : utilisateur.created_at.strftime("%b %d %Y")
        }
    }


@app.post("/login")
async def login(
    request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = db.query(Utilisateur_Model).filter(Utilisateur_Model.email == request.username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Utilisateur incorrect."
        )
    if not verify_password(user.mdp, request.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Mot de passe incorrect."
        )

    access_token = create_access_token(data={"sub": user.email})

    response = {
        "utilisateur_id": user.utilisateur_id,
        "nom_utilisateur": user.nom_utilisateur,
        "email": user.email,
        "jwtToken": access_token,
    }

    return response



#static file setup config
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.post("/uploadfile/profile", tags=["utilisateur"])
async def create_upload_file(file : UploadFile = File(...)):
    FILEPATH = "./static/images/"
    filename = file.filename
    extension = filename.split(".")[1]

    if extension not in ["png", "jpg", "jpeg", "PNG", "JPG"]:
        return {"status" : "error", 
                "detail" : "File extension not allowed"}
    
    file_content = await file.read()
    generated_name = FILEPATH + filename
    with open(generated_name, "wb") as file:
        file.write(file_content)

    img = Image.open(generated_name)
    img = img.resize(size = (200, 200))
    img.save(generated_name)

    file.close()


# sans docker
@app.on_event("startup")
async def startup_event(db: Session = next(get_db())):
    BaseSQL.metadata.create_all(bind=engine)
    init_db(db)

@app.get("/init", tags=["produit"])
def init_produits(db: Session = Depends(get_db)):
    return init_db(db)

@app.post("/inscription", tags=["utilisateur"])
async def creer_utilisateur(utilisateur: Utilisateur_Schema, db: Session = Depends(get_db)):
    utilisateur_db = Utilisateur_Model(**utilisateur.dict())
    utilisateur_db.mdp = get_hashed_password(utilisateur_db.mdp)
    db.add(utilisateur_db)
    db.commit()
    db.refresh(utilisateur_db)
    utilisateur_db.mdp = None
    return utilisateur_db

@app.get("/inscription", tags=["utilisateur"])
def afficher_tous_les_utilisateurs(db: Session = Depends(get_db)):
    return db.query(Utilisateur_Model).all()

@app.get("/inscription/{nom_utilisateur}", tags=["utilisateur"])
def afficher_utilisateur_par_nom(nom_utilisateur: str, db: Session = Depends(get_db)) -> Utilisateur_Model:
    utilisateur_db = db.query(Utilisateur_Model).filter(Utilisateur_Model.nom_utilisateur == nom_utilisateur).first()
    if not utilisateur_db:
        raise HTTPException(status_code=404, detail="Not Found") 
    return utilisateur_db

@app.put("/modifier_utilisateur/{utilisateur_id}", tags=["utilisateur"])
async def MAJ_utilisateur_par_id(utilisateur_id: str, utilisateur: Utilisateur_Schema, db: Session = Depends(get_db)) -> Utilisateur_Model:
    utilisateur_db = get_utilisateur_par_id(utilisateur_id=utilisateur_id, db=db)
    # utilisateur_db.nom_utilisateur = utilisateur.nom_utilisateur
    for var, value in vars(utilisateur).items():
        setattr(utilisateur_db, var, value) if value else None
    utilisateur_db.updated_at = datetime.now()
    db.add(utilisateur_db)
    db.commit()
    db.refresh(utilisateur_db)
    return utilisateur_db

@app.delete("/supprimer_utilisateur/{utilisateur_id}", tags = ["utilisateur"])
async def supprimer_utilisateur_par_id(utilisateur_id: str, db: Session = Depends(get_db)):
    utilisateur_db = get_utilisateur_par_id(utilisateur_id=utilisateur_id, db=db)
    db.delete(utilisateur_db)
    db.commit()
    return True

@app.delete("/supprimer_tous_les_utilisateurs", tags = ["utilisateur"])
async def supprimer_tous_les_utilisateurs(db:Session = Depends(get_db)):
    records = db.query(Utilisateur_Model).filter()
    for record in records:
        db.delete(record)
    db.commit()
    return records

@app.put("/panier", tags=["panier"])
async def ajouter_produit_au_panier(panier : Panier_Schema, db: Session = Depends(get_db)):
    panier_db = Panier_Model(**panier.dict())
    db.add(panier_db)
    db.commit()
    db.refresh(panier_db)
    return panier_db

@app.put("/panier", tags=["panier"])
async def afficher_panier_par_utilisateur_id(utilisateur_id: str, db: Session = Depends(get_db)):
    produits = db.query(Panier_Model).filter(Panier_Model.utilisateur_id == utilisateur_id)
    if not produits:
        raise HTTPException(status_code=404, detail="Not Found") 
    return produits

@app.put("/panier", tags=["panier"])
async def MAJ_panier(utilisateur_id: str, produit_id: str, panier : Panier_Schema, db: Session = Depends(get_db)):
    produit_db = db.query(Panier_Model).filter(Panier_Model.utilisateur_id == utilisateur_id & Panier_Model.produit_id == produit_id)
    for var, value in vars(panier).items():
        setattr(produit_db, var, value) if value else None
    produit_db.updated_at = datetime.now()
    db.add(produit_db)
    db.commit()
    db.refresh(produit_db)
    return produit_db


@app.post("/produit", tags=["produit"])
async def creer_produit(produit: Produit_Schema, db: Session = Depends(get_db)):
    produit_db = Produit_Model(**produit.dict())
    db.add(produit_db)
    db.commit()
    db.refresh(produit_db)
    return produit_db

@app.get("/produit", tags=["produit"])
def afficher_tous_les_produits(db: Session = Depends(get_db)):
    return db.query(Produit_Model).all()

@app.get("/produit/{produit_id}", tags=["produit"])
def afficher_un_produit(produit_id: str, db: Session = Depends(get_db)):
    produit = db.query(Produit_Model).filter(Produit_Model.produit_id == produit_id).first()
    
    response = {
        "produit_id": produit.produit_id,
        "categorie": produit.categorie,
        "prix": produit.prix,
        "product_image": produit.product_image,
        "nom_produit": produit.nom_produit,
        "description": produit.description,
        "quantite": produit.quantite,
    }
    return response

@app.put("/produit/{produit_id}", tags=["produit"])
async def MAJ_produit_par_id(produit_id: str, produit: Produit_Schema, db: Session = Depends(get_db)):
    produit_db = get_produit_par_id(produit_id=produit_id, db=db)
    for var, value in vars(produit).items():
        setattr(produit_db, var, value) if value else None
    produit_db.updated_at = datetime.now()
    db.add(produit_db)
    db.commit()
    db.refresh(produit_db)
    return produit_db


@app.delete("/produit/{produit_id}", tags = ["produit"])
async def supprimer_produit_par_id(produit_id: str, db: Session = Depends(get_db)):
    produit_db = get_produit_par_id(produit_id=produit_id, db=db)
    db.delete(produit_db)
    db.commit()
    return True

@app.delete("/produit", tags = ["produit"])
async def supprimer_tous_les_produits(db:Session = Depends(get_db)):
    records = db.query(Produit_Model).filter()
    for record in records:
        db.delete(record)
    db.commit()
    return records