from ..database import get_db   
from typing import List
from fastapi import APIRouter , HTTPException, Depends , status
from sqlalchemy.orm import Session
from .. import schemas , models

router = APIRouter( tags=["Tipos_Productos"])

def get_tipos_por_restaurante(db: Session, restaurante_id: int):
    # Usando join y distinct para obtener tipos de productos únicos de un restaurante específico
    result = db.query(models.TiposProducto).join(models.Productos).filter(models.Productos.id_restaurante == restaurante_id).distinct().all()
    return result

def get_productos_por_tipo(restaurante_id: int, tipo_id: int, db: Session):
    return db.query(models.Producto).filter(models.Producto.restaurante_id == restaurante_id, models.Producto.tipo_id == tipo_id).all()


@router.get("/tiposprod/{restaurante_id}", response_model=List[schemas.TipoProducto])
def read_tipos_por_restaurante(restaurante_id: int, db: Session = Depends(get_db)):
    tipos = get_tipos_por_restaurante(db, restaurante_id=restaurante_id)
    if not tipos:
        raise HTTPException(status_code=404, detail="No se encontraron tipos de productos para el restaurante")
    return tipos


@router.get("/restaurantes/{restaurante_id}/tipos/{tipo_id}/productos", response_model=List[schemas.ProductosDisplay])
def read_productos_por_tipo(id_restaurante: int, id_tipo_prod: int, db: Session = Depends(get_db)):
    productos = get_productos_por_tipo(id_restaurante, id_tipo_prod, db)
    if not productos:
        raise HTTPException(status_code=404, detail="Productos no encontrados")
    return productos