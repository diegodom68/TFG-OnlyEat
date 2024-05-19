from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from typing import List
from .. import models, schemas, database

router = APIRouter(
    prefix="/pedidos",
    tags=["Pedidos"]
)

@router.post("/", response_model=schemas.PedidoDisplay)
def create_pedido(pedido: schemas.PedidoCreate, db: Session = Depends(database.get_db)):
    # Verificar existencia de usuario y restaurante
    db_usuario = db.query(models.Users).filter(models.Users.id_usuario == pedido.id_usuario).first()
    db_restaurante = db.query(models.Restaurante).filter(models.Restaurante.id_restaurante == pedido.id_restaurante).first()

    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    if not db_restaurante:
        raise HTTPException(status_code=404, detail="Restaurante no encontrado")

    # Crear el pedido
    db_pedido = models.Pedidos(
        id_usuario=pedido.id_usuario,
        id_restaurante=pedido.id_restaurante,
        fecha_pedido=datetime.now(timezone.utc),
        total=pedido.total,
        estado=pedido.estado
    )
    db.add(db_pedido)
    db.commit()
    db.refresh(db_pedido)

    # Crear las líneas de pedido
    for linea in pedido.lineas:
        db_linea_pedido = models.LineasPedido(
            id_pedido=db_pedido.id_pedido,
            id_producto=linea.id_producto,
            cantidad=linea.cantidad,
            precio=linea.precio
        )
        db.add(db_linea_pedido)
    db.commit()

    # Refrescar el pedido para incluir las líneas de pedido
    db_pedido.lineas_pedido = db.query(models.LineasPedido).filter(models.LineasPedido.id_pedido == db_pedido.id_pedido).all()

    return db_pedido
