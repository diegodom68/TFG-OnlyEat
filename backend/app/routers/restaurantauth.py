from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from datetime import datetime, timezone, timedelta
from typing import Union, Annotated
from .. import schemas, models
from ..database import get_db
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = "8bd4ae40db652c6a1255021bd221e55205bc4f421be3242a65a3fe4dc84372ef"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="restaurant-token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(tags=["Restaurant Authentication"])

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encode_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encode_jwt

def get_restaurant(db: Session, cif: str) -> Union[schemas.RestauranteInDB, None]:
    restaurant = db.query(models.Restaurante).filter(models.Restaurante.cif == cif).first()
    if restaurant:
        return schemas.RestauranteInDB(**restaurant.__dict__)
    return None

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_restaurant(db: Session, cif: str, password: str):
    restaurant = get_restaurant(db, cif)
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found", headers={"WWW-Authenticate": "Bearer"})
    if not verify_password(password, restaurant.password):
        raise HTTPException(status_code=400, detail="Incorrect CIF or password", headers={"WWW-Authenticate": "Bearer"})
    return restaurant

async def get_current_restaurant(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials", headers={"WWW-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        cif: str = payload.get("sub")
        if cif is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=cif)
    except JWTError:
        raise credentials_exception
    restaurant = db.query(models.Restaurante).filter(models.Restaurante.cif == token_data.username).first()
    if restaurant is None:
        raise credentials_exception
    return restaurant

async def get_current_active_restaurant(current_restaurant: Annotated[models.Restaurante, Depends(get_current_restaurant)]):
    return current_restaurant

@router.post("/restaurant-token", response_model=dict)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    restaurant = authenticate_restaurant(db, form_data.username, form_data.password)
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect CIF or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": restaurant.cif}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/restaurants/me", response_model=schemas.RestauranteDisplay)
async def read_restaurants_me(current_restaurant: Annotated[models.Restaurante, Depends(get_current_active_restaurant)]):
    return current_restaurant
