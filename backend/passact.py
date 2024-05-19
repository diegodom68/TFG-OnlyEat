from passlib.context import CryptContext

# Inicializa el contexto de hashing de Passlib
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

if __name__ == "__main__":
    password = input("Introduce la contraseña que quieres hashear: ")
    hashed_password = hash_password(password)
    print(f"Contraseña hasheada: {hashed_password}")
