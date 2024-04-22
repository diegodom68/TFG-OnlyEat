from typing import List
from fastapi import FastAPI
from fastapi.params import Depends
from starlette.responses import RedirectResponse
from . import models,schemas
from .database import engine,SessionLocal
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

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
@app.get('/users/', response_model=List[schemas.User])
def show_user(db:Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users


@app.post('/users/', response_model=schemas.User)
def create_users(entrada:schemas.User, db:Session = Depends(get_db)):
    usuario = models.User(username=entrada.username, nombre=entrada.nombre, rol=entrada.rol, estado=entrada.estado)
    db.add(usuario)
    db.commit()
    db.refresh(usuario)
    return usuario


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