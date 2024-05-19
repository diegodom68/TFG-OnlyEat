import React, { useState } from "react";
import RestaurantInfo from "../components/restaurant/InfoRestaurant";
import RestaurantProducts from "../components/restaurant/RestaurantProducts";
import RestaurantOrders from "../components/restaurant/RestaurantOrders";

const Dashboard = () => {
  const [section, setSection] = useState("info");

  return (
    <div className="flex h-screen">
      <nav className="w-1/4 bg-gray-800 text-white p-4">
        <ul>
          <li
            className="mb-4 cursor-pointer"
            onClick={() => setSection("info")}
          >
            Información del Restaurante
          </li>
          <li
            className="mb-4 cursor-pointer"
            onClick={() => setSection("products")}
          >
            Productos
          </li>
          <li
            className="mb-4 cursor-pointer"
            onClick={() => setSection("orders")}
          >
            Pedidos
          </li>
        </ul>
      </nav>
      <div className="w-3/4 p-4">
        {section === "info" && <RestaurantInfo />}
        {section === "products" && <RestaurantProducts />}
        {section === "orders" && <RestaurantOrders />}
      </div>
    </div>
  );
};

export default Dashboard;
