import React from "react";
import Navbar from "../components/HP/Navbar";
import Sidebar from "../components/sidebar/sidebar_config";
import axios from "axios";
import { useState, useEffect } from "react";

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
    <>
      <Navbar />
      <div className="flex ">
        <div className="w-2/12 h-screen me-16">
          <Sidebar />
        </div>
        <div className="flex pt-20">
          <form class="w-full max-w-lg ">
            <div class="flex flex-wrap -mx-3  mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Nombre
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                  value={userData.nombre}
                ></input>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Apellido
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Doe"
                  value={userData.apellido}
                ></input>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Dirección
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  placeholder="Calle ejemplo 123"
                  value={userData.direccion}
                ></input>
                <p class="text-gray-600 text-xs italic">
                  Asegúrate de que tu dirección sea correcta
                </p>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-city"
                >
                  Ciudad
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="d"
                  value={userData.ciudad}
                ></input>
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Teléfono
                </label>
                <div class="relative">
                  <input
                    type="text"
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={userData.telefono}
                  ></input>
                </div>
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-zip"
                >
                  Código Postal
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-zip"
                  type="text"
                  placeholder="90210"
                  value={userData.cp}
                ></input>
              </div>
              <button
                className=" my-8 mx-4 px-2 py-2 dark:bg-gray-800 rounded-md text-white hover:bg-gray-700 "
                type="submit"
              >
                Actualizar datos
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Usuarios;
