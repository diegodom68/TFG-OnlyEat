from typing import List
from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.params import Depends
from starlette.responses import RedirectResponse
from . import models,schemas
from .database import Base,engine,SessionLocal
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import bcrypt

¡
app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

@app.get("/")
def main():
    return RedirectResponse(url="/docs/")



"""
@app.get('/users/', response_model=List[schemas.UserBase])
def show_user(db:Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users


@app.post("/users/", response_model=List[schemas.UserCreate], status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    db_user = models.User(
        nombre=user.nombre,
        apellidos=user.apellidos,
        username=user.username,
        password=hashed_password.decode('utf-8'),
        email=user.email,
        cp=user.cp,
        ciudad=user.ciudad,
        fecha_nacimiento=user.fecha_nacimiento,
        direccion=user.direccion,
        telefono=user.telefono
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.put('/users/{usuario_id}', response_model=schemas.User)
def update_users(usuario_id: int ,entrada:schemas.UserUpdate, db:Session = Depends(get_db)):
    usuario = db.query(models.User).filter(models.User.id == usuario_id).first()
    usuario.nombre = entrada.nombre
    db.commit()
    db.refresh(usuario)
    return usuario

@app.delete('/users/{usuario_id}', response_model=schemas.User)
def delete_users(usuario_id: int , db:Session = Depends(get_db)):
    usuario = db.query(models.User).filter(models.User.id == usuario_id).first()
    db.delete(usuario)
    db.commit()
    respuesta = schemas.Respuesta(mensaje="Usuario eliminado")
    return respuesta

"""