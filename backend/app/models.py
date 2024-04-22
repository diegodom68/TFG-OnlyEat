from sqlalchemy import Boolean, Column,Integer, String , ForeignKey
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "usuario"

    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(200), not_null=True)
    apellidos = Column(String(200), not_null=True)
    username = Column(String(20), not_null=True, unique=True)
    password = Column(String(256), not_null=True)
    email = Column(String, not_null=True, unique=True)
    cp = Column(Integer, not_null=True)
    ciudad = Column(String(100), not_null=True)
    direccion = Column(String(200), not_null=True)
    telefono = Column(String(20), not_null=True, unique=True)
    

class Pedidos(Base):
    __tablename__ = "pedidos"

    id_pedido = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("usuario.id_usuario"))
    fecha_pedido = Column(String(50), not_null=True)
    estado = Column(String(50), not_null=True)
    id_restaurante = Column(Integer, ForeignKey("restaurante.id_restaurante"))
    id_usuario = Column(Integer, ForeignKey("usuario.id_usuario"))
    
    usuario = relationship("User", back_populates="pedidos")
    restaurante = relationship("Restaurante", back_populates="pedidos")
    
class Restaurante(Base):
    __tablename__ = "restaurante"
    
    id_restaurante = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(200), not_null=True)
    cif = Column(String(20), not_null=True, unique=True)
    password = Column(String(256), not_null=True)
    email = Column(String(100), not_null=True, unique=True)
    cp = Column(Integer, not_null=True)
    ciudad = Column(String(100), not_null=True)
    direccion = Column(String(200), not_null=True)
    telefono = Column(String(20), not_null=True, unique=True)
    
    pedidos = relationship("Pedidos", back_populates="restaurante")
    
class Productos(Base):
    __tablename__ = "productos"
    
    id_producto = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(200), not_null=True)
    descripcion = Column(String(500), not_null=True)
    precio = Column(Integer, not_null=True)
    id_restaurante = Column(Integer, ForeignKey("restaurante.id_restaurante"))
    id_tipo_producto = Column(Integer, ForeignKey("tipo_producto.id_tipo_producto"))
    
    restaurante = relationship("Restaurante", back_populates="productos")
    
class estan(Base):
    __tablename__ = "estan"
    
    id_producto = Column(Integer, ForeignKey("productos.id_producto"), primary_key=True)
    id_linea_pedido = Column(Integer, ForeignKey("lineas_pedidos.id_linea_pedido"), primary_key=True)


class Lineas_pedidos(Base):
    __tablename__ = "lineas_pedidos"
    
    id_linea_pedido = Column(Integer, primary_key=True, index=True)
    precio = Column(Integer, not_null=True)
    cantidad = Column(Integer, not_null=True)
    id_pedido = Column(Integer, ForeignKey("pedidos.id_pedido"))
    
    pedido = relationship("Pedidos", back_populates="lineas_pedidos")
    producto = relationship("Productos", back_populates="lineas_pedidos")


class Tipo_producto(Base):
    __tablename__ = "tipo_producto"
    
    id_tipo_producto = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), not_null=True)



class Metodos_pago(Base):
    __tablename__ = "metodos_pago"
    
    id_metodo_pago = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), not_null=True)

class usan(Base):
    __tablename__ = "usan"
    
    id_metodo_pago = Column(Integer, ForeignKey("metodos_pago.id_metodo_pago"), primary_key=True)
    id_restaurante = Column(Integer, ForeignKey("restaurante.id_restaurante"), primary_key=True)
    
class Valoraciones(Base):
    __tablename__ = "valoraciones"
    
    id_valoracion = Column(Integer, primary_key=True, index=True)
    fecha_valoracion = Column(String, not_null=True)
    valoracion = Column(Integer, not_null=True)
    id_restaurante = Column(Integer, ForeignKey("restaurante.id_restaurante"))
    id_usuario = Column(Integer, ForeignKey("usuario.id_usuario"))
    
    usuario = relationship("User", back_populates="valoraciones")
    restaurante = relationship("Restaurante", back_populates="valoraciones")
