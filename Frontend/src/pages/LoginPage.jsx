import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Para redirigir al usuario después del inicio de sesión

  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene la recarga de la página

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        // Suponiendo que el token se devuelve en `data.token`
        localStorage.setItem("authToken", data.access_token); // Guardar el token recibido
        console.log(localStorage.getItem("authToken"));
        navigate("/"); // Redirigir a la página principal después del inicio de sesión
      } else {
        throw new Error(
          data.message || "Ha ocurrido un error durante el inicio de sesión"
        );
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      alert("Error de inicio de sesión: " + error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center bg-[#F7F7F7]">
        <div className="bg-[#C53030] rounded-lg p-8 w-2/6">
          <h1 className="text-4xl text-white text-center mb-6">
            Iniciar Sesión
          </h1>
          <form
            className="flex flex-col items-center space-y-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Usuario"
              className="w-full max-w-xs h-10 rounded-md p-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full max-w-xs h-10 rounded-md p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full max-w-xs h-10 bg-[#FFF8F0] rounded-md hover:bg-[#FF7B72]"
            >
              Iniciar Sesión
            </button>
            <p className="text-white pt-4">
              ¿Eres Nuevo?{" "}
              <Link to="/signup" className="underline">
                Crear una cuenta
              </Link>
            </p>
          </form>
          <br />
          <hr />
          <p className="text-white text-sm text-center mt-4 px-2">
            Al crear la cuenta, aceptas nuestros términos y condiciones. Por
            favor, lee nuestra política de privacidad y nuestra política de
            cookies.
          </p>
        </div>
      </div>
    </>
  );
}
