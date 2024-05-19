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
    lineas_pedido = db.query(
        models.LineasPedido.id_linea,
        models.LineasPedido.id_pedido,
        models.LineasPedido.id_producto,
        models.LineasPedido.cantidad,
        models.LineasPedido.precio,
        models.Productos.nombre_producto,
        models.Productos.imagen_prod
    ).join(models.Productos, models.Productos.id_producto == models.LineasPedido.id_producto)\
     .filter(models.LineasPedido.id_pedido == db_pedido.id_pedido).all()

    # Convertir las líneas de pedido en el formato esperado
    lineas_pedido_list = [schemas.LineasPedidoDisplay(
        id_linea=linea.id_linea,
        id_pedido=linea.id_pedido,
        id_producto=linea.id_producto,
        cantidad=linea.cantidad,
        precio=linea.precio,
        nombre_producto=linea.nombre_producto,
        imagen_prod=linea.imagen_prod
    ) for linea in lineas_pedido]

    # Construir la respuesta del pedido con las líneas de pedido detalladas
    pedido_display = schemas.PedidoDisplay(
        id_pedido=db_pedido.id_pedido,
        fecha_pedido=db_pedido.fecha_pedido,
        total=db_pedido.total,
        estado=db_pedido.estado,
        id_usuario=db_pedido.id_usuario,
        id_restaurante=db_pedido.id_restaurante,
        lineas_pedido=lineas_pedido_list
    )

    return pedido_display

@router.get("/{id_pedido}", response_model=schemas.PedidoDisplay)
async def get_pedido(id_pedido: int, db: Session = Depends(database.get_db)):
    pedido = db.query(models.Pedidos).filter(models.Pedidos.id_pedido == id_pedido).first()
    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")

    # Obtener los detalles de los productos en las líneas de pedido
    lineas_pedido = db.query(
        models.LineasPedido.id_linea,
        models.LineasPedido.id_pedido,
        models.LineasPedido.id_producto,
        models.LineasPedido.cantidad,
        models.LineasPedido.precio,
        models.Productos.nombre_producto,
        models.Productos.imagen_prod
    ).join(models.Productos, models.Productos.id_producto == models.LineasPedido.id_producto)\
     .filter(models.LineasPedido.id_pedido == id_pedido).all()

    # Convertir las líneas de pedido en el formato esperado
    lineas_pedido_list = [schemas.LineasPedidoDisplay(
        id_linea=linea.id_linea,
        id_pedido=linea.id_pedido,
        id_producto=linea.id_producto,
        cantidad=linea.cantidad,
        precio=linea.precio,
        nombre_producto=linea.nombre_producto,
        imagen_prod=linea.imagen_prod
    ) for linea in lineas_pedido]

    # Construir la respuesta del pedido con las líneas de pedido detalladas
    pedido_display = schemas.PedidoDisplay(
        id_pedido=pedido.id_pedido,
        fecha_pedido=pedido.fecha_pedido,
        total=pedido.total,
        estado=pedido.estado,
        id_usuario=pedido.id_usuario,
        id_restaurante=pedido.id_restaurante,
        lineas_pedido=lineas_pedido_list
    )

    return pedido_display

# Endpoint para obtener todos los pedidos de un restaurante
@router.get("/restaurant/{id_restaurante}", response_model=List[schemas.PedidoDisplay])
async def get_pedidos_by_restaurant(id_restaurante: int, db: Session = Depends(database.get_db)):
    pedidos = db.query(models.Pedidos).filter(models.Pedidos.id_restaurante == id_restaurante).all()
    if not pedidos:
        raise HTTPException(status_code=404, detail="No se encontraron pedidos para este restaurante")

    # Obtener los detalles de los productos en las líneas de pedido
    pedidos_display = []
    for pedido in pedidos:
        lineas_pedido = db.query(
            models.LineasPedido.id_linea,
            models.LineasPedido.id_pedido,
            models.LineasPedido.id_producto,
            models.LineasPedido.cantidad,
            models.LineasPedido.precio,
            models.Productos.nombre_producto,
            models.Productos.imagen_prod
        ).join(models.Productos, models.Productos.id_producto == models.LineasPedido.id_producto)\
         .filter(models.LineasPedido.id_pedido == pedido.id_pedido).all()

        # Convertir las líneas de pedido en el formato esperado
        lineas_pedido_list = [schemas.LineasPedidoDisplay(
            id_linea=linea.id_linea,
            id_pedido=linea.id_pedido,
            id_producto=linea.id_producto,
            cantidad=linea.cantidad,
            precio=linea.precio,
            nombre_producto=linea.nombre_producto,
            imagen_prod=linea.imagen_prod
        ) for linea in lineas_pedido]

        pedido_display = schemas.PedidoDisplay(
            id_pedido=pedido.id_pedido,
            fecha_pedido=pedido.fecha_pedido,
            total=pedido.total,
            estado=pedido.estado,
            id_usuario=pedido.id_usuario,
            id_restaurante=pedido.id_restaurante,
            lineas_pedido=lineas_pedido_list
        )
        pedidos_display.append(pedido_display)

    return pedidos_display