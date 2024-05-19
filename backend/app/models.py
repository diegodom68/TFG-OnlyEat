from typing import List, Optional

from sqlalchemy import DECIMAL, Date, DateTime, Float, ForeignKeyConstraint, Index, String
from sqlalchemy.dialects.mysql import INTEGER
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
import datetime
import decimal

class Base(DeclarativeBase):
    pass


class Restaurante(Base):
    __tablename__ = 'restaurante'
    __table_args__ = (
        Index('cif', 'cif', unique=True),
        Index('email', 'email', unique=True),
        Index('ix_restaurante_id_restaurante', 'id_restaurante')
    )

    id_restaurante: Mapped[int] = mapped_column(INTEGER(11), primary_key=True)
    nombre: Mapped[str] = mapped_column(String(50))
    cif: Mapped[str] = mapped_column(String(25))
    password: Mapped[str] = mapped_column(String(256))
    email: Mapped[str] = mapped_column(String(100))
    cp: Mapped[int] = mapped_column(INTEGER(11))
    ciudad: Mapped[str] = mapped_column(String(30))
    direccion: Mapped[str] = mapped_column(String(200))
    telefono: Mapped[str] = mapped_column(String(15))
    imagen: Mapped[str] = mapped_column(String(255))

    pedidos: Mapped[List['Pedidos']] = relationship('Pedidos', foreign_keys='[Pedidos.id_restaurante]', back_populates='restaurante')
    pedidos_: Mapped[List['Pedidos']] = relationship('Pedidos', foreign_keys='[Pedidos.id_restaurante]', back_populates='restaurante_')
    productos: Mapped[List['Productos']] = relationship('Productos', back_populates='restaurante')


class TiposProducto(Base):
    __tablename__ = 'tipos_producto'

    id_tipo_prod: Mapped[int] = mapped_column(INTEGER(255), primary_key=True)
    nombre_tipo: Mapped[str] = mapped_column(String(55))

    productos: Mapped[List['Productos']] = relationship('Productos', back_populates='tipos_producto')


class Users(Base):
    __tablename__ = 'users'
    __table_args__ = (
        Index('email', 'email', unique=True),
        Index('ix_users_id_usuario', 'id_usuario'),
        Index('telefono', 'telefono', unique=True),
        Index('username', 'username', unique=True)
    )

    id_usuario: Mapped[int] = mapped_column(INTEGER(11), primary_key=True)
    nombre: Mapped[str] = mapped_column(String(50))
    apellido: Mapped[str] = mapped_column(String(100))
    password: Mapped[str] = mapped_column(String(256))
    email: Mapped[str] = mapped_column(String(150))
    username: Mapped[Optional[str]] = mapped_column(String(25))
    cp: Mapped[Optional[int]] = mapped_column(INTEGER(11))
    ciudad: Mapped[Optional[str]] = mapped_column(String(30))
    fecha_nacimiento: Mapped[Optional[datetime.date]] = mapped_column(Date)
    direccion: Mapped[Optional[str]] = mapped_column(String(200))
    telefono: Mapped[Optional[str]] = mapped_column(String(15))

    pedidos: Mapped[List['Pedidos']] = relationship('Pedidos', back_populates='users')


class Pedidos(Base):
    __tablename__ = 'pedidos'
    __table_args__ = (
        ForeignKeyConstraint(['id_restaurante'], ['restaurante.id_restaurante'], name='pedidos_ibfk_2'),
        ForeignKeyConstraint(['id_restaurante'], ['restaurante.id_restaurante'], name='pedidos_ibfk_3'),
        ForeignKeyConstraint(['id_usuario'], ['users.id_usuario'], name='pedidos_ibfk_1'),
        Index('id_restaurante', 'id_restaurante'),
        Index('id_usuario', 'id_usuario'),
        Index('ix_pedidos_id_pedido', 'id_pedido')
    )

    id_pedido: Mapped[int] = mapped_column(INTEGER(11), primary_key=True)
    fecha_pedido: Mapped[datetime.datetime] = mapped_column(DateTime)
    total: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))
    estado: Mapped[str] = mapped_column(String(50))
    id_usuario: Mapped[int] = mapped_column(INTEGER(11))
    id_restaurante: Mapped[int] = mapped_column(INTEGER(11))

    restaurante: Mapped['Restaurante'] = relationship('Restaurante', foreign_keys=[id_restaurante], back_populates='pedidos')
    restaurante_: Mapped['Restaurante'] = relationship('Restaurante', foreign_keys=[id_restaurante], back_populates='pedidos_')
    users: Mapped['Users'] = relationship('Users', back_populates='pedidos')
    lineas_pedido: Mapped[List['LineasPedido']] = relationship('LineasPedido', back_populates='pedidos')


class Productos(Base):
    __tablename__ = 'productos'
    __table_args__ = (
        ForeignKeyConstraint(['id_restaurante'], ['restaurante.id_restaurante'], name='productos_ibfk_1'),
        ForeignKeyConstraint(['id_tipo_prod'], ['tipos_producto.id_tipo_prod'], name='FK_ID_TIPO_PROD'),
        Index('FK_ID_TIPO_PROD', 'id_tipo_prod'),
        Index('id_restaurante', 'id_restaurante')
    )

    id_producto: Mapped[int] = mapped_column(INTEGER(11), primary_key=True)
    nombre_producto: Mapped[str] = mapped_column(String(50))
    precio: Mapped[float] = mapped_column(Float)
    imagen_prod: Mapped[str] = mapped_column(String(255))
    id_restaurante: Mapped[int] = mapped_column(INTEGER(11))
    id_tipo_prod: Mapped[int] = mapped_column(INTEGER(255))
    comentarios: Mapped[Optional[str]] = mapped_column(String(255))

    restaurante: Mapped['Restaurante'] = relationship('Restaurante', back_populates='productos')
    tipos_producto: Mapped['TiposProducto'] = relationship('TiposProducto', back_populates='productos')
    lineas_pedido: Mapped[List['LineasPedido']] = relationship('LineasPedido', back_populates='productos')


class LineasPedido(Base):
    __tablename__ = 'lineas_pedido'
    __table_args__ = (
        ForeignKeyConstraint(['id_pedido'], ['pedidos.id_pedido'], name='lineas_pedido_ibfk_1'),
        ForeignKeyConstraint(['id_producto'], ['productos.id_producto'], name='lineas_pedido_ibfk_2'),
        Index('id_pedido', 'id_pedido'),
        Index('id_producto', 'id_producto')
    )

    id_linea: Mapped[int] = mapped_column(INTEGER(11), primary_key=True)
    id_pedido: Mapped[int] = mapped_column(INTEGER(11))
    id_producto: Mapped[int] = mapped_column(INTEGER(11))
    cantidad: Mapped[int] = mapped_column(INTEGER(11))
    precio: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2))

    pedidos: Mapped['Pedidos'] = relationship('Pedidos', back_populates='lineas_pedido')
    productos: Mapped['Productos'] = relationship('Productos', back_populates='lineas_pedido')
