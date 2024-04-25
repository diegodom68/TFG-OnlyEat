from sqlalchemy import Column, Date, DateTime, ForeignKeyConstraint, Index, MetaData, String, Table
from sqlalchemy.dialects.mysql import INTEGER
from .database import Base

metadata = MetaData()


t_restaurante = Table(
    'restaurante', metadata,
    Column('id_restaurante', INTEGER(11), primary_key=True),
    Column('nombre', String(50), nullable=False),
    Column('cif', String(25), nullable=False),
    Column('password', String(256), nullable=False),
    Column('email', String(100), nullable=False),
    Column('cp', INTEGER(11), nullable=False),
    Column('ciudad', String(30), nullable=False),
    Column('direccion', String(200), nullable=False),
    Column('telefono', String(15), nullable=False),
    Index('cif', 'cif', unique=True),
    Index('email', 'email', unique=True),
    Index('ix_restaurante_id_restaurante', 'id_restaurante')
)

t_users = Table(
    'users', metadata,
    Column('id_usuario', INTEGER(11), primary_key=True),
    Column('nombre', String(50), nullable=False),
    Column('apellido', String(100), nullable=False),
    Column('username', String(25)),
    Column('password', String(256), nullable=False),
    Column('email', String(150), nullable=False),
    Column('cp', INTEGER(11)),
    Column('ciudad', String(30)),
    Column('fecha_nacimiento', Date),
    Column('direccion', String(200)),
    Column('telefono', String(15)),
    Index('email', 'email', unique=True),
    Index('ix_users_id_usuario', 'id_usuario'),
    Index('telefono', 'telefono', unique=True),
    Index('username', 'username', unique=True)
)

t_pedidos = Table(
    'pedidos', metadata,
    Column('id_pedido', INTEGER(11), primary_key=True),
    Column('fecha_pedido', DateTime, nullable=False),
    Column('estado', String(60), nullable=False),
    Column('id_usuario', INTEGER(11)),
    Column('id_restaurante', INTEGER(11)),
    ForeignKeyConstraint(['id_restaurante'], ['restaurante.id_restaurante'], name='pedidos_ibfk_2'),
    ForeignKeyConstraint(['id_usuario'], ['users.id_usuario'], name='pedidos_ibfk_1'),
    Index('id_restaurante', 'id_restaurante'),
    Index('id_usuario', 'id_usuario'),
    Index('ix_pedidos_id_pedido', 'id_pedido')
)
