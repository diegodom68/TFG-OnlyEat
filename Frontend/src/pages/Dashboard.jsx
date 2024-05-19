import React, { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import RestaurantInfo from "../components/dashboard/InfoRestaurant";
import Products from "../components/dashboard/Products";
import Orders from "../components/dashboard/Orders";
import axios from "axios";

const Dashboard = () => {
  const [restaurant, setRestaurant] = useState(null); // Cambiado a null inicialmente
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      const token = sessionStorage.getItem("access_token");
      try {
        const response = await axios.get(
          "http://localhost:8000/restaurants/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRestaurant(response.data);
        sessionStorage.setItem("restaurant_name", response.data.nombre); // Guardar el nombre del restaurante
      } catch (error) {
        console.error("Error fetching restaurant info:", error);
      }
    };

    fetchRestaurantInfo();
  }, []);

  useEffect(() => {
    if (restaurant) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/restaurantes/${restaurant.id_restaurante}/productos`
          );
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      const fetchOrders = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/restaurantes/${restaurant.id_restaurante}/pedidos`
          );
          setOrders(response.data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };

      fetchProducts();
      fetchOrders();
    }
  }, [restaurant]);

  return (
    <div className="flex">
      <Sidebar restaurantName={restaurant?.nombre} />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Restaurant Dashboard</h1>
        {restaurant && <RestaurantInfo restaurant={restaurant} />}
        <Products products={products} />
        <Orders orders={orders} />
      </div>
    </div>
  );
};
export default Dashboard;
