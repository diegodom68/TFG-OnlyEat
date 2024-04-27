import axios from "axios";
import React, { useState, useEffect } from "react";

const fetchData = async () => {
  const token = sessionStorage.getItem("authToken");
  console.log(token);

  try {
    const response = await axios.get("http://127.0.0.1:8000/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // axios encapsula la respuesta bajo el atributo `data`
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Puede ser útil re-lanzar el error o manejarlo de manera específica aquí
  }
};

function Usuarios() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setUserData(data); // Establecer los datos del usuario recibidos en el estado
        setLoading(false); // Desactivar la señal de carga
      })
      .catch((err) => {
        setError(err.message); // Establecer un mensaje de error en caso de fallo
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-row w-screen h-screen">
      <div className=" h-screen bg-[#FF7B72] w-64 space-y-6 py-16 px-2">
        <h2 className="text-gray-900 text-xl font-medium border-l-4 border-gray-900 pl-2">
          Información de la cuenta
        </h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-[#212121] font-semibold hover:bg-[#8C8C8C] rounded-md py-2 px-4 block"
              >
                Seguridad
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#212121] font-semibold hover:bg-[#8C8C8C] rounded-md py-2 px-4 block"
              >
                Protección de datos
              </a>
            </li>
            {/* Add more navigation items here */}
          </ul>
        </nav>
      </div>
      {userData && (
        <div className="flex m-20">
          <p>Name: {userData.nombre}</p>
          <p>Email: {userData.email}</p>
          {/* Cualquier otro dato relevante del usuario */}
        </div>
      )}
    </div>
  );
}

export default Usuarios;
