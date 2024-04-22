from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import registry
from sqlalchemy.orm import sessionmaker


DATABASE_URL = 'mysql+mysqlconnector://root:Donbosco@localhost:3306/onlyeatdatabase'

engine = create_engine(
    DATABASE_URL, echo=True
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

mapper_registry = registry()
Base = mapper_registry.generate_base()
