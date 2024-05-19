import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }

    const decoded = jwt_decode(token);
    const restaurantId = decoded.sub;

    fetch(`http://127.0.0.1:8000/restaurantes/${restaurantId}/pedidos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => {
        console.error("Error al obtener los pedidos del restaurante:", error);
        navigate("/login");
      });
  }, [navigate]);

  if (!orders.length) {
    return <div>No hay pedidos disponibles.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pedidos</h2>
      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <div key={order.id_pedido} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold">Pedido #{order.id_pedido}</h3>
            <p className="text-gray-700">Fecha: {order.fecha}</p>
            <p className="text-gray-700">Total: {order.total} €</p>
            <p className="text-gray-700">Estado: {order.estado}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantOrders;
