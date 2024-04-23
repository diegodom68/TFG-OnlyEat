from fastapi import  FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import users , users_jwt
from . import models
from .database import SessionLocal, engine


models.Base.metadata.create_all(bind=engine)


app = FastAPI()


##Routers
app.include_router(users.router)
app.include_router(users_jwt.router)


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


