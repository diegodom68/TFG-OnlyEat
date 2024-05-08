import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/HP/Navbar";
import { Link } from "react-router-dom";
import { useSearch } from "../components/context/searchcontext"; // Asegúrate de que la ruta de importación es correcta

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const { searchTerm, setSearchTerm } = useSearch(); // Extrae tanto searchTerm como setSearchTerm

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("http://localhost:8000/restaurantes");
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error al obtener los restaurantes:", error);
      }
    };
    fetchRestaurants();
  }, []); // No incluyas searchTerm aquí si no quieres que los restaurantes se recarguen con cada cambio de término

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen bg-slate-100">
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-3/4">
            <input
              type="text"
              placeholder="Buscar restaurantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 p-2 w-full"
            />
            <h1 className="text-2xl font-bold text-center my-4">
              Lista de Restaurantes
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {restaurants
                .filter((restaurant) =>
                  restaurant.nombre
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((restaurant) => (
                  <Link
                    to={`/restaurant/${restaurant.id_restaurante}/productos`}
                    key={restaurant.id_restaurante}
                    className="hover:opacity-80 transition-opacity duration-300"
                  >
                    <div className="rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 w-full h-full">
                      <img
                        className="w-full h-48 object-cover object-center"
                        src={restaurant.imagen}
                        alt={restaurant.nombre}
                      />
                      <div className="p-4">
                        <div className="font-bold text-xl mb-2">
                          {restaurant.nombre}
                        </div>
                        <p className="text-gray-700 text-base">
                          {restaurant.direccion}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default RestaurantList;
