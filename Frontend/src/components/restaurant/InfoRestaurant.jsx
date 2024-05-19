import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RestaurantInfo = () => {
  const [restaurant, setRestaurant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://127.0.0.1:8000/restaurants/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setRestaurant(data))
      .catch((error) => {
        console.error(
          "Error al obtener la información del restaurante:",
          error
        );
        navigate("/login");
      });
  }, [navigate]);

  if (!restaurant) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Información del Restaurante</h2>
      <p>
        <strong>Nombre:</strong> {restaurant.nombre}
      </p>
      <p>
        <strong>CIF:</strong> {restaurant.cif}
      </p>
      <p>
        <strong>Email:</strong> {restaurant.email}
      </p>
      <p>
        <strong>Dirección:</strong> {restaurant.direccion}
      </p>
      <p>
        <strong>Teléfono:</strong> {restaurant.telefono}
      </p>
      <p>
        <strong>Ciudad:</strong> {restaurant.ciudad}
      </p>
      <p>
        <strong>CP:</strong> {restaurant.cp}
      </p>
      {restaurant.imagen && (
        <img src={restaurant.imagen} alt={restaurant.nombre} className="mt-4" />
      )}
    </div>
  );
};

export default RestaurantInfo;
