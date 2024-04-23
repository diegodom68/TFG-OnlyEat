from pydantic import BaseModel
from datetime import date 

class UserBase(BaseModel):
    nombre: str
    apellido: str
    username: str
    email: str
    cp: int
    ciudad: str
    fecha_nacimiento: date
    direccion: str
    telefono: str

class UserCreate(UserBase):
    password: str

class restaurantes(BaseModel):
    nombre: str
    cif: str
    email: str
    cp: int
    ciudad: str
    direccion: str
    telefono: str

class Pedidos(BaseModel):
    fecha_pedido: str
    estado: str
    class Config:
        orm_mode = True


class User(UserBase):
    id_usuario: int
    class Config:
        orm_mode = True





























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