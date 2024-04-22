from typing import Optional
from pydantic import BaseModel

class User(BaseModel):
    id_usuario:Optional[int]
    nombre:str
    apellidos:str
    username:str
    passwors:str
    email:str
    cp:int
    ciudad:str
    direccion:str
    telefono:str
    
    class Config:
        orm_mode = True
        
        

class Pedidos:
    id_pedido:int
    id_usuario:int
    fecha_pedido:str
    estado:Optional[str]
    id_usuario:int
    id_restaurante:int
    class Config:
        orm_mode = True

class Restaurante:
    id_restaurante:int
    nombre:str
    cif:str
    password:str
    email:str
    cp:int
    ciudad:str
    direccion:str
    telefono:str
    class Config:
        orm_mode = True

class Productos:
    id_producto:int
    nombre:str
    descripcion:str
    precio:int
    id_restaurante:int
    id_tipo_producto:int
    class Config:
        orm_mode = True

class TipoProducto: 
    id_tipo_producto:int
    nombre:str
    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    nombre:str
    apellidos:str
    username:str
    passwors:str
    email:str
    cp:int
    ciudad:str
    direccion:str
    telefono:str
    
    class Config:
        orm_mode = True

class estan:
    id_producto:int
    id_tipo_producto:int
    class Config:
        orm_mode = True

class Metodospago:
    id_metodo_pago:int
    nombre:str
    class Config:
        orm_mode = True

class Valoracion:
    id_valoracion:int
    puntuacion:int
    comentario:str
    id_usuario:int
    id_restaurante:int
    class Config:
        orm_mode = True

class usan:
    id_usuario:int
    id_metodo_pago:int
    class Config:
        orm_mode = True

class linea_pedido:
    id_linea_pedido:int
    precio:int
    cantidad:int
    id_pedido:int
    id_producto:int
    class Config:
        orm_mode = True


class UserUpdate(BaseModel):
    nombre:str
    
    class Config:
        orm_mode = True

class Respuesta(BaseModel):
    mensaje:str

