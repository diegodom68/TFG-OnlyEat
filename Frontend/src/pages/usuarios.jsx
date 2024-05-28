import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/HP/Navbar";
import Sidebar from "../components/sidebar/sidebar_config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../Hooks/ModalConfirm"; // Ajusta la ruta según tu estructura de archivos

const fetchData = async () => {
  const token = sessionStorage.getItem("authToken");

  try {
    const response = await axios.get("http://127.0.0.1:8000/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

function Usuarios() {
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    ciudad: "",
    telefono: "",
    cp: "",
    fecha_nacimiento: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async () => {
    const token = sessionStorage.getItem("authToken");

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/users/update",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User updated:", response.data);
      toast.success("La actualización ha sido correcta");
      fetchData()
        .then((data) => {
          setUserData(data);
        })
        .catch((err) => {
          setError(err.message);
        });
    } catch (error) {
      console.error("There was an error updating the user:", error);
      toast.error("Hubo un error al actualizar los datos");
    }
  };

  const openModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    closeModal();
    handleSubmit();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="w-2/12 h-screen me-16">
          <Sidebar />
        </div>
        <div className="flex pt-20">
          <form className="w-full max-w-lg" onSubmit={openModal}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="nombre"
                >
                  Nombre
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="nombre"
                  type="text"
                  placeholder="Jane"
                  value={userData.nombre}
                  onChange={handleChange}
                  pattern="^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$"
                  title="El nombre solo puede contener letras y espacios"
                  required
                ></input>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="apellido"
                >
                  Apellido
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="apellido"
                  type="text"
                  placeholder="Doe"
                  value={userData.apellido}
                  onChange={handleChange}
                  pattern="^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$"
                  title="El apellido solo puede contener letras y espacios"
                  required
                ></input>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="direccion"
                >
                  Dirección
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="direccion"
                  type="text"
                  placeholder="Calle ejemplo 123"
                  value={userData.direccion}
                  onChange={handleChange}
                  required
                ></input>
                <p className="text-gray-600 text-xs italic">
                  Asegúrate de que tu dirección sea correcta
                </p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="ciudad"
                >
                  Ciudad
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="ciudad"
                  type="text"
                  placeholder="Ciudad"
                  value={userData.ciudad}
                  onChange={handleChange}
                  pattern="^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$"
                  title="La ciudad solo puede contener letras y espacios"
                  required
                ></input>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="telefono"
                >
                  Teléfono
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="telefono"
                    placeholder="Número de teléfono"
                    value={userData.telefono}
                    onChange={handleChange}
                    pattern="^[0-9]{10,15}$"
                    title="El teléfono debe tener entre 10 y 15 dígitos"
                    required
                  ></input>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="cp"
                >
                  Código Postal
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="cp"
                  type="text"
                  placeholder="90210"
                  value={userData.cp}
                  onChange={handleChange}
                  pattern="^[0-9]{5}$"
                  title="El código postal debe tener exactamente 5 dígitos"
                  required
                ></input>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="fecha_nacimiento"
                >
                  Fecha de Nacimiento
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="fecha_nacimiento"
                  type="date"
                  value={userData.fecha_nacimiento}
                  onChange={handleChange}
                  required
                ></input>
              </div>
            </div>
            <button
              className="my-8 mx-4 px-2 py-2 dark:bg-gray-800 rounded-md text-white hover:bg-gray-700"
              type="submit"
            >
              Actualizar datos
            </button>
          </form>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onConfirm={handleConfirm}
      />
      <ToastContainer />
    </>
  );
}

export default Usuarios;
