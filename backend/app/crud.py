from sqlalchemy.orm import Session

from . import models, schemas

def get_user(db: Session, user_id: int):
    return db.query(models.t_users).filter(models.t_users.id_usuario == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.t_users).filter(models.t_users.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.t_users).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserInDB):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.t_users(nombre=user.nombre,apellido=user.apellido,email=user.email, password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
