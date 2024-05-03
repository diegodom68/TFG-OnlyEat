import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function RestaurantInfo() {
  const { id_restaurante } = useParams();
  const [RestaurantInfo, setRestaurantInfo] = useState([]);
  console.log(id_restaurante);
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        // Fetch para obtener la información del restaurante
        const restaurantResponse = await axios.get(
          `http://localhost:8000/restaurant/${id_restaurante}`
        );
        setRestaurantInfo(restaurantResponse.data);
        console.log("Información del restaurante:", restaurantResponse.data);
      } catch (error) {
        console.error(
          "Error al obtener los productos y la información del restaurante:",
          error
        );
      }
    };

    fetchRestaurantData();
  }, [id_restaurante]);
  return (
    <>
      {/* Información del restaurante */}
      {RestaurantInfo && (
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
          <div className="flex  w-full max-w-screen-lg h-96 object-cover object-center">
            <img
              src={RestaurantInfo.imagen}
              alt="Comida"
              className=" w-full  rounded-lg"
            />
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold">{RestaurantInfo.nombre}</h2>
            <p className="text-sm">{RestaurantInfo.direccion}</p>
            <div className="flex items-center justify-center my-2">
              <span className="text-lg font-semibold">
                {RestaurantInfo.rating}
              </span>
              <span className="text-sm text-gray-500">
                {" "}
                ({RestaurantInfo.reviewCount}+)
              </span>
            </div>
            <p className="text-sm">{RestaurantInfo.description}</p>
            <div className="flex justify-center items-center mt-2 space-x-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Entrega
              </button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                Recogida
              </button>
            </div>
            <div className="mt-4">
              <span className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                Gastos de envío a €0
              </span>
              <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-700 dark:text-blue-300">
                Pedido de grupo
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
