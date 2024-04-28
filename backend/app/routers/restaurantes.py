from ..database import get_db   
from typing import List
from fastapi import APIRouter , HTTPException, Depends , status
from sqlalchemy.orm import Session
from .. import crud, schemas , models

router = APIRouter( tags=["Restaurantes"])



@router.get("/restaurantes", response_model=List[schemas.RestauranteDisplay])
def get_restaurantes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    restaurantes = db.query(models.Restaurante).offset(skip).limit(limit).all()
    if restaurantes:
        return restaurantes
    raise HTTPException(status_code=404, detail="Restaurantes no encontrados")