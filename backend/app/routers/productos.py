from ..database import get_db   
from typing import List
from fastapi import APIRouter , HTTPException, Depends , status
from sqlalchemy.orm import Session , joinedload
from .. import  schemas , models

router = APIRouter( tags=["Productos"])




@router.get("/restaurant/{id_restautante}", response_model=schemas.RestauranteDisplay)
def get_current_restaurant(id_restautante: int, db: Session = Depends(get_db)):
    restaurant = db.query(models.Restaurante).filter(models.Restaurante.id_restaurante == id_restautante).first()
    if restaurant:
        return restaurant
    raise HTTPException(status_code=404, detail="Restaurante no encontrado")


@router.get("/restaurantes/{id_restaurante}/productos", response_model=List[schemas.ProductosDisplay])
def get_productos(id_restaurante: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    productos = (
        db.query(models.Productos)
        .options(joinedload(models.Productos.tipos_producto))  # Usa el nombre correcto de la relación
        .filter(models.Productos.id_restaurante == id_restaurante)
        .order_by(models.Productos.id_tipo_prod.asc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    if productos:
        return productos
    raise HTTPException(status_code=404, detail="Productos no encontrados")

@router.post("/create-producto", response_model=schemas.Productos)
def create_producto(producto: schemas.ProductoCreate, db: Session = Depends(get_db)):
    db_producto = models.Productos(
        nombre_producto=producto.nombre_producto,
        precio=producto.precio,
        imagen_prod=producto.imagen_prod,
        id_restaurante=producto.id_restaurante,
        id_tipo_prod=producto.id_tipo_prod,
        comentarios=producto.comentarios,
    )
    db.add(db_producto)
    db.commit()
    db.refresh(db_producto)
    return db_producto

@router.put("/update-product/{id_producto}", response_model=schemas.Productos)
def update_producto(id_producto: int, producto: schemas.ProductoCreate, db: Session = Depends(get_db)):
    db_producto = db.query(models.Productos).filter(models.Productos.id_producto == id_producto).first()
    if not db_producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    db_producto.nombre_producto = producto.nombre_producto
    db_producto.precio = producto.precio
    db_producto.imagen_prod = producto.imagen_prod
    db_producto.id_tipo_prod = producto.id_tipo_prod
    db_producto.comentarios = producto.comentarios
    db.commit()
    db.refresh(db_producto)
    return db_producto

@router.delete("/delete-product/{id_producto}", response_model=dict)
def delete_producto(id_producto: int, db: Session = Depends(get_db)):
    db_producto = db.query(models.Productos).filter(models.Productos.id_producto == id_producto).first()
    if not db_producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    db.delete(db_producto)
    db.commit()
    return {"message": "Producto eliminado correctamente"}