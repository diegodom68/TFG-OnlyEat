import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/HP/Navbar";
import { Link } from "react-router-dom";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

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
  }, []);

  return (
    <>
      <Navbar />
      <main className="w-full h-full bg-slate-100">
        {" "}
        {/* Ajusta el color de fondo si es necesario */}
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-3/4">
            <h1 className="text-2xl font-bold text-center my-4">
              Lista de Restaurantes
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {restaurants.map((restaurant) => (
                <Link
                  to={`/restaurantes/${restaurant.id}`}
                  key={restaurant.id}
                  className="hover:opacity-80 transition-opacity duration-300"
                >
                  <div className="rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 w-full h-full">
                    <img
                      className="w-full h-48 object-cover object-center" // Establece una altura fija para todas las imágenes
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
