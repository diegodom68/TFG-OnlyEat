from ..database import get_db   
from typing import List , Optional
from fastapi import APIRouter , HTTPException, Depends , Query
from sqlalchemy import func
from sqlalchemy.orm import Session
from .. import  schemas , models

router = APIRouter( tags=["Restaurantes"])



@router.get("/restaurantes", response_model=List[schemas.RestauranteDisplay])
def get_restaurantes(skip: int = 0, limit: int = 100, search: Optional[str] = Query(None), db: Session = Depends(get_db)):
    query = db.query(models.Restaurante)
    if search:
        search = "%" + search.lower() + "%"  # Prepara el término de búsqueda para una búsqueda flexible e insensible a mayúsculas
        query = query.filter(func.lower(models.Restaurante.nombre).like(search))
    restaurantes = query.offset(skip).limit(limit).all()
    
    if restaurantes:
        return restaurantes
    raise HTTPException(status_code=404, detail="Restaurantes no encontrados")


@router.get("/restaurantes/sugerencias", response_model=List[schemas.RestauranteDisplay])
def sugerencias_restaurantes(q: str, db: Session = Depends(get_db)):
    if q:
        q = "%" + q.lower() + "%"
        restaurantes = db.query(models.Restaurante).filter(func.lower(models.Restaurante.nombre).ilike(q)).limit(4).all()
    else:
        restaurantes = []
    return restaurantes

