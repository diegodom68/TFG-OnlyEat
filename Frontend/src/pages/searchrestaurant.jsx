import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "../components/HP/Navbar";
import { Link } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  let query = useQuery();
  const searchTerm = query.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/restaurantes?search=${searchTerm}`
        );
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error al obtener los restaurantes:", error);
      }
    };

    fetchRestaurants();
  }, [searchTerm]);

  return (
    <>
      <Navbar />
      <main className="w-full h-full bg-slate-100">
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-3/4">
            <h1 className="text-2xl font-bold text-center my-4">
              Lista de Restaurantes
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {restaurants.map((restaurant) => (
                <Link
                  to={`/restaurant/${restaurant.id_restaurante}/productos`}
                  className="hover:opacity-80 transition-opacity duration-300"
                >
                  {/* Detalles del restaurante aquí */}
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
