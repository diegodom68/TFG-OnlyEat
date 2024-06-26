from pydantic import BaseModel
from datetime import date, datetime
from typing import Union , Optional, List

class User(BaseModel):
    id_usuario: int
    username: str
    email: Union[str, None] = None
    nombre: Union[str, None] = None
    apellido: Union[str, None] = None
    direccion: Union[str, None] = None
    telefono: Union[str, None] = None
    cp: Union[int, None] = None
    ciudad: Union[str, None] = None
    fecha_nacimiento: Union[date, None] = None

class TokenData(BaseModel):
    username: str | None = None

class UserDisplay(User):
    password: str
    
class UserCreate(BaseModel):
    nombre: str
    apellido: str
    email: str
    username: str
    password: str

class UserUpdate(BaseModel):
    nombre: Optional[str]
    apellido: Optional[str]
    direccion: Optional[str]
    ciudad: Optional[str]
    telefono: Optional[str]
    cp: Optional[int]
    fecha_nacimiento: Optional[date]

    class Config:
        from_attributes = True


class Restaurante(BaseModel):
    cif: str
    email: Union[str, None] = None
    nombre: Union[str, None] = None
    direccion: Union[str, None] = None
    telefono: Union[str, None] = None
    cp: Union[int, None] = None
    ciudad: Union[str, None] = None
    imagen: Union[str, None] = None


class RestauranteInDB(Restaurante):
    password: str

class RestauranteDisplay(Restaurante):
    id_restaurante: int
    


class Userread(User):
    id_usuario: int
    
    

class Productos(BaseModel):
    nombre_producto: str
    comentarios: Union[str, None] = None
    imagen_prod: Union[str, None] = None
    precio: float
    id_tipo_prod: int

class ProductoCreate(Productos):
    pass

class ProductoUpdate(Productos):
    pass 

class TipoProductoDisplay(BaseModel):
    id_tipo_prod: int
    nombre_tipo: str

class ProductosDisplay(BaseModel):
    id_producto: int
    nombre_producto: str
    imagen_prod: str
    precio: float
    id_restaurante: int
    tipos_producto: TipoProductoDisplay
    


class LineasPedidoCreate(BaseModel):
    id_producto: int
    cantidad: int
    precio: float

class LineasPedidoDisplay(LineasPedidoCreate):
    id_linea: int
    nombre_producto: str
    imagen_prod: str

    class Config:
        from_attributes = True

class PedidoCreate(BaseModel):
    id_usuario: int
    id_restaurante: int
    total: float
    estado: Optional[str] = "Pendiente"
    lineas: List[LineasPedidoCreate]

class PedidoDisplay(BaseModel):
    id_pedido: int
    fecha_pedido: datetime
    total: float
    estado: str
    id_usuario: int
    id_restaurante: int
    lineas_pedido: List[LineasPedidoDisplay]

    class Config:
        from_attributes = True






























"""
# Modelo Pydantic para el Usuario
class UserBase(BaseModel):
    nombre: str
    apellidos: str
    username: str
    email: str
    cp: int
    ciudad: str
    fecha_nacimiento: date
    direccion: str
    telefono: str
    
class UserCreate(BaseModel):
    nombre: str = Field(..., example="Juan")
    apellidos: str = Field(..., example="Pérez")
    username: str = Field(..., example="juanperez", min_length=3)
    password: str = Field(..., example="unaContraseñaMuySegura!", min_length=5)
    email: EmailStr = Field(..., example="juan@example.com")
    cp: int = Field(..., example=28001)
    ciudad: str = Field(..., example="Madrid")
    fecha_nacimiento: date = Field(..., example="1990-04-22")
    direccion: str = Field(..., example="Calle Falsa 123")
    telefono: str = Field(..., example="1234567890")

class UserCreate(UserBase):
    password: str

class UserDisplay(UserBase):
    id_usuario: int
    class Config:
        orm_mode = True

# Modelo Pydantic para Restaurante
class RestauranteBase(BaseModel):
    nombre: str
    cif: str
    email: str
    cp: int
    ciudad: str
    direccion: str
    telefono: str

class RestauranteCreate(RestauranteBase):
    password: str

class RestauranteDisplay(RestauranteBase):
    id_restaurante: int
    class Config:
        orm_mode = True

# Modelo Pydantic para Pedidos
class PedidoBase(BaseModel):
    fecha_pedido: datetime
    estado: str

class PedidoCreate(PedidoBase):
    id_usuario: int
    id_restaurante: int

class PedidoDisplay(PedidoBase):
    id_pedido: int
    usuario: Optional[UserDisplay]
    restaurante: Optional[RestauranteDisplay]
    class Config:
        orm_mode = True

# Modelos Pydantic para otros objetos
class ProductoBase(BaseModel):
    nombre: str
    descripcion: str
    precio: float

class ProductoCreate(ProductoBase):
    id_restaurante: int
    id_tipo_producto: int

class ProductoDisplay(ProductoBase):
    id_producto: int
    restaurante: Optional[RestauranteDisplay]
    class Config:
        orm_mode = True

class TipoProductoBase(BaseModel):
    nombre: str

class TipoProductoDisplay(TipoProductoBase):
    id_tipo_producto: int
    class Config:
        orm_mode = True

# Puedes continuar definiendo modelos para otras clases de forma similar.



"""