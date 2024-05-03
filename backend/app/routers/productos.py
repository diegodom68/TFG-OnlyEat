from ..database import get_db   
from typing import List
from fastapi import APIRouter , HTTPException, Depends , status
from sqlalchemy.orm import Session
from .. import crud, schemas , models

router = APIRouter( tags=["Productos"])




@router.get("/restaurant/{id_restautante}", response_model=schemas.RestauranteDisplay)
def get_current_restaurant(id_restautante: int, db: Session = Depends(get_db)):
    restaurant = db.query(models.Restaurante).filter(models.Restaurante.id_restaurante == id_restautante).first()
    if restaurant:
        return restaurant
    raise HTTPException(status_code=404, detail="Restaurante no encontrado")


@router.get("/restaurantes/{id_restaurante}/productos", response_model=List[schemas.ProductosDisplay])
def get_productos(id_restaurante: int,skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    productos = db.query(models.Productos).filter(models.Productos.id_restaurante == id_restaurante).offset(skip).limit(limit).all()
    if productos:
        return productos 
    raise HTTPException(status_code=404, detail="Productos no encontrados")