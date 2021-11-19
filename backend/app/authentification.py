from dotenv import dotenv_values
from passlib.context import CryptContext
from fastapi import HTTPException, status
import jwt
from datetime import datetime, timedelta
from database import get_utilisateur_par_mail


config_credentials = dict(dotenv_values(".env"))
pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

def get_hashed_password(password):
    return pwd_context.hash(password)

async def authenticate_user(email, mdp):
    utilisateur = get_utilisateur_par_mail(email=email)
    if verify_password(mdp, utilisateur.mdp):
        return utilisateur
    return False

async def token_generator(email: str, mdp: str):
    utilisateur = await authenticate_user(email, mdp)
    if not utilisateur:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED, 
            detail = "nom d'utilisateur ou mot de passe incorrect.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token_data = {
        "id" : str(utilisateur.utilisateur_id),
        "email" : utilisateur.email
    }

    # expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    # expire = datetime.utcnow() + expires_delta
    # token_data.update({"exp": expire})
    token = jwt.encode(token_data, '07f1db1734cd4e056f87434ea1db44a770b3a80f9ac851f97f6a619846991ec2', algorithm="HS256")
    
    return token
    
def verify_password(hashed_password, plain_password):
    return pwd_context.verify(plain_password, hashed_password)

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# from fastapi import FastAPI, Depends
# from keycloak import KeycloakOpenID
# from fastapi.security import OAuth2PasswordBearer

# app = FastAPI() 

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# # Configure client
# keycloak_openid = KeycloakOpenID(server_url="http://localhost:8080/auth/",
#                                  client_id="fastapi",
#                                  realm_name="master",
#                                  client_secret_key="97e13e2d-90e6-447f-9e3b-914b27653821")


# @app.get("/protected")
# def protected(token: str = Depends(oauth2_scheme)):
#     return {
#         "Hello": "World",
#         "user_infos": token
#     }
