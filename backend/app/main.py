<<<<<<< HEAD
from fastapi import  FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import users
from . import models
=======
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from . import crud, models, schemas
>>>>>>> 7e3301170ef87d59b74b5bb32c034944418efce1
from .database import SessionLocal, engine


models.Base.metadata.create_all(bind=engine)


app = FastAPI()


<<<<<<< HEAD
##Routers
app.include_router(users.router)


=======
>>>>>>> 7e3301170ef87d59b74b5bb32c034944418efce1
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]



app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Dependency


