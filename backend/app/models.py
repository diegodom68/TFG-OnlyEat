from sqlalchemy import Column, Integer, String, ForeignKey, Date, DateTime , Float
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "usuario"
    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(200), nullable=False)
    apellidos = Column(String(200), nullable=False)
    username = Column(String(20), nullable=False, unique=True)
    password = Column(String(256), nullable=False)
    email = Column(String(25), nullable=False, unique=True)
    cp = Column(Integer, nullable=False)
    ciudad = Column(String(100), nullable=False)
    fecha_nacimiento = Column(Date, nullable=False)
    direccion = Column(String(200), nullable=False)
    telefono = Column(String(20), nullable=False, unique=True)

class Restaurante(Base):
    __tablename__ = "restaurante"
    id_restaurante = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(200), nullable=False)
    cif = Column(String(20), nullable=False, unique=True)
    password = Column(String(256), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    cp = Column(Integer, nullable=False)
    ciudad = Column(String(100), nullable=False)
    direccion = Column(String(200), nullable=False)
    telefono = Column(String(20), nullable=False, unique=True)
    pedidos = relationship("Pedidos", back_populates="restaurante")

class Pedidos(Base):
    __tablename__ = "pedidos"
    id_pedido = Column(Integer, primary_key=True, index=True)
    fecha_pedido = Column(DateTime, nullable=False)
    estado = Column(String(50), nullable=False)
    id_usuario = Column(Integer, ForeignKey("usuario.id_usuario"))
    id_restaurante = Column(Integer, ForeignKey("restaurante.id_restaurante"))
    usuario = relationship("User", back_populates="pedidos")
    restaurante = relationship("Restaurante", back_populates="pedidos")

class Productos(Base):
    __tablename__ = "productos"
    id_producto = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(200), nullable=False)
    descripcion = Column(String(500), nullable=False)
    precio = Column(Float, nullable=False)
    id_restaurante = Column(Integer, ForeignKey("restaurante.id_restaurante"))
    id_tipo_producto = Column(Integer, ForeignKey("tipo_producto.id_tipo_producto"))
    restaurante = relationship("Restaurante", back_populates="productos")

class Lineas_pedidos(Base):
    __tablename__ = "lineas_pedidos"
    id_linea_pedido = Column(Integer, primary_key=True, index=True)
    cantidad = Column(Float, nullable=False)
    precio = Column(Integer, nullable=False)
    id_pedido = Column(Integer, ForeignKey("pedidos.id_pedido"))
    pedido = relationship("Pedidos", back_populates="lineas_pedidos")

class estan(Base):
    __tablename__ = "estan"
    id_producto = Column(Integer, ForeignKey("productos.id_producto"), primary_key=True)
    id_linea_pedido = Column(Integer, ForeignKey("lineas_pedidos.id_linea_pedido"), primary_key=True)

class Tipo_producto(Base):
    __tablename__ = "tipo_producto"
    id_tipo_producto = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)

class Metodos_pago(Base):
    __tablename__ = "metodos_pago"
    id_metodo_pago = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)

class usan(Base):
    __tablename__ = "usan"
    id_metodo_pago = Column(Integer, ForeignKey("metodos_pago.id_metodo_pago"), primary_key=True)
    id_restaurante = Column(Integer, ForeignKey("restaurante.id_restaurante"), primary_key=True)

class Valoraciones(Base):
    __tablename__ = "valoraciones"
    id_valoracion = Column(Integer, primary_key=True, index=True)
    fecha_valoracion = Column(DateTime, nullable=False)
    valoracion = Column(Integer, nullable=False)
    id_restaurante = Column(Integer, ForeignKey("restaurante.id_restaurante"))
    id_usuario = Column(Integer, ForeignKey("usuario.id_usuario"))
    usuario = relationship("User", back_populates="valoraciones")
    restaurante = relationship("Restaurante", back_populates="valoraciones")
