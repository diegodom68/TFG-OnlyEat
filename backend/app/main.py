from fastapi import  FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import  users_jwt , restaurantes , productos , tipos_prod , restaurantauth, pedidos
from . import models
from .database import  engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

#Origenes permitidos
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

#Politicas de acceso
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

##Routers
app.include_router(users_jwt.router)
app.include_router(restaurantes.router)
app.include_router(productos.router)
app.include_router(tipos_prod.router)
app.include_router(restaurantauth.router)
app.include_router(pedidos.router)




