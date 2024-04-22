from sqlalchemy import Column, Integer, String, ForeignKey, Date, DateTime , Float
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column, registry
from sqlalchemy.orm import relationship


mapper_registry = registry()

@mapper_registry.mapped
class User:
    __tablename__ = "usuario"
    id_usuario: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String(200), nullable=False)
    apellidos: Mapped[str] = mapped_column(String(200), nullable=False)
    username: Mapped[str] = mapped_column(String(20), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(256), nullable=False)
    email: Mapped[str] = mapped_column(String(25), nullable=False, unique=True)
    cp: Mapped[int] = mapped_column(Integer, nullable=False)
    ciudad: Mapped[str] = mapped_column(String(100), nullable=False)
    fecha_nacimiento: Mapped[Date] = mapped_column(Date, nullable=False)
    direccion: Mapped[str] = mapped_column(String(200), nullable=False)
    telefono: Mapped[int] = mapped_column(String(20), nullable=False, unique=True)

@mapper_registry.mapped
class Restaurante:
    __tablename__ = "restaurante"
    id_restaurante: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String(200), nullable=False)
    cif: Mapped[str] = mapped_column(String(20), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(256), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    cp: Mapped[int] = mapped_column(Integer, nullable=False)
    ciudad: Mapped[str] = mapped_column(String(100), nullable=False)
    direccion: Mapped[str] = mapped_column(String(200), nullable=False)
    telefono: Mapped[int] = mapped_column(String(20), nullable=False)
    pedidos: Mapped[list] = relationship("Pedidos", back_populates="restaurante")

@mapper_registry.mapped
class Pedidos:
    __tablename__ = "pedidos"
    id_pedido: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    fecha_pedido: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    estado: Mapped[str] = mapped_column(String(50), nullable=False)
    id_usuario: Mapped[int] = mapped_column(Integer, ForeignKey("usuario.id_usuario"))
    id_restaurante: Mapped[int] = mapped_column(Integer, ForeignKey("restaurante.id_restaurante"))
    
@mapper_registry.mapped
class Productos:
    __tablename__ = "productos"
    id_producto: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String(200), nullable=False)
    descripcion: Mapped[str] = mapped_column(String(500), nullable=False)
    precio: Mapped[Float] = mapped_column(Float, nullable=False)
    id_restaurante: Mapped[int] = mapped_column(Integer, ForeignKey("restaurante.id_restaurante"))
    id_tipo_producto: Mapped[int] = mapped_column(Integer, ForeignKey("tipo_producto.id_tipo_producto"))

@mapper_registry.mapped
class Lineas_pedidos:
    __tablename__ = "lineas_pedidos"
    id_linea_pedido: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    cantidad: Mapped[Float] = mapped_column(Float, nullable=False)
    precio: Mapped[int] = mapped_column(Integer, nullable=False)
    id_pedido: Mapped[int] = mapped_column(Integer, ForeignKey("pedidos.id_pedido"))

@mapper_registry.mapped
class estan:
    __tablename__ = "estan"
    id_producto: Mapped[int] = mapped_column(Integer, ForeignKey("productos.id_producto"), primary_key=True)
    id_linea_pedido: Mapped[int] = mapped_column(Integer, ForeignKey("lineas_pedidos.id_linea_pedido"), primary_key=True)

@mapper_registry.mapped
class Tipo_producto:
    __tablename__ = "tipo_producto"
    id_tipo_producto: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)

@mapper_registry.mapped
class Metodos_pago:
    __tablename__ = "metodos_pago"
    id_metodo_pago: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)

@mapper_registry.mapped
class usan:
    __tablename__ = "usan"
    id_metodo_pago: Mapped[int] = mapped_column(Integer, ForeignKey("metodos_pago.id_metodo_pago"), primary_key=True)
    id_restaurante: Mapped[int] = mapped_column(Integer, ForeignKey("restaurante.id_restaurante"), primary_key=True)

@mapper_registry.mapped
class Valoraciones:
    __tablename__ = "valoraciones"
    id_valoracion: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    fecha_valoracion: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    valoracion: Mapped[int] = mapped_column(Integer, nullable=False)
    id_restaurante: Mapped[int] = mapped_column(Integer, ForeignKey("restaurante.id_restaurante"))
    id_usuario: Mapped[int] = mapped_column(Integer, ForeignKey("usuario.id_usuario"))

