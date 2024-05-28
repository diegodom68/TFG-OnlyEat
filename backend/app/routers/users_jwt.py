from fastapi import APIRouter , HTTPException, Depends , status
from sqlalchemy.orm import Session
from datetime import datetime,timezone, timedelta
from typing import Union , Annotated
from .. import  schemas , models
from ..database import get_db
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = "8bd4ae40db652c6a1255021bd221e55205bc4f421be3242a65a3fe4dc84372ef"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter( tags=["Authentication"])

def create_acces_token(data: dict,expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encode_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encode_jwt

def get_user(db: Session, username: str) -> Union[schemas.UserDisplay, None]:
    user = db.query(models.Users).filter(models.Users.username == username).first()
    if user:
        print(user)
        return schemas.UserDisplay(**user.__dict__)
    return None


def verify_password(plain_password,hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(db: Session, username: str, password: str):
    user = get_user(db, username)
    print(user)
    if not user :
        raise HTTPException(status_code=404, detail="User not found", headers={"WWW-Authenticate": "Bearer"})
    if not verify_password(password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect username or password", headers={"WWW-Authenticate": "Bearer"})
    return user

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials", headers={"WWW-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: Annotated[models.Users, Depends(get_current_user)]):
    return current_user



@router.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Verificar si el email o username ya están registrados
    existing_user = db.query(models.Users).filter((models.Users.email == user.email) | (models.Users.username == user.username)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email or Username already registered")
    
    # Crear nuevo usuario
    hashed_password = pwd_context.hash(user.password)
    db_user = models.Users(
        nombre=user.nombre,
        apellido=user.apellido,
        email=user.email,
        username=user.username,
        password=hashed_password  
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.post("/token", response_model=dict)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    acces_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_acces_token(
        data={"sub": user.username}, expires_delta=acces_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/users/me", response_model=schemas.User)
async def read_users_me(current_user: Annotated[models.Users, Depends(get_current_active_user)]):
    return current_user
    

@router.put("/users/update", response_model=schemas.User)
def update_user(
    user: schemas.UserUpdate, 
    db: Session = Depends(get_db), 
    current_user: models.Users = Depends(get_current_active_user)
):
    db_user = db.query(models.Users).filter(models.Users.id_usuario == current_user.id_usuario).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    for key, value in user.model_dump(exclude_unset=True).items():
        setattr(db_user, key, value)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
