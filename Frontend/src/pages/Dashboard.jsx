import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/dashboard/Sidebar";
import Orders from "../components/dashboard/Orders";
import Products from "../components/dashboard/Products";
import ProductForm from "../components/dashboard/ProductForm";
import RestaurantInfo from "../components/dashboard/InfoRestaurant";

const RestaurantDashboard = () => {
  const [idRestaurante, setIdRestaurante] = useState(null);
  const [restaurante, setRestaurante] = useState({});
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Obtener el `id_restaurante` usando el endpoint `/restaurants/me`
  useEffect(() => {
    const fetchRestaurantId = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/restaurants/me",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
          }
        );
        setIdRestaurante(response.data.id_restaurante);
        setRestaurante(response.data);
      } catch (error) {
        console.error("Error al obtener el ID del restaurante:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantId();
  }, []);

  // Obtener pedidos y productos del restaurante usando `id_restaurante`
  useEffect(() => {
    if (idRestaurante) {
      const fetchPedidos = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/pedidos/restaurant/${idRestaurante}`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
              },
            }
          );
          setPedidos(response.data);
        } catch (error) {
          console.error("Error al obtener los pedidos:", error);
        }
      };

      const fetchProductos = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/restaurantes/${idRestaurante}/productos`
          );
          setProductos(response.data);
        } catch (error) {
          console.error("Error al obtener los productos:", error);
        }
      };

      fetchPedidos();
      fetchProductos();
    }
  }, [idRestaurante]);

  const handleDeleteProduct = async (id_producto) => {
    try {
      await axios.delete(`http://localhost:8000/delete-product/${id_producto}`);
      setProductos(
        productos.filter((producto) => producto.id_producto !== id_producto)
      );
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const handleEditProduct = (producto) => {
    setSelectedProduct(producto);
    setShowForm(true);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/restaurantes/${idRestaurante}/productos`
        );
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    fetchProductos();
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!idRestaurante) {
    return <p>Error: No se pudo cargar la información del restaurante.</p>;
  }

  return (
    <div className="flex">
      <Sidebar restaurante={restaurante} />
      <main className="w-3/4 p-6 bg-gray-100 h-screen overflow-auto">
        <RestaurantInfo restaurant={restaurante} />
        <Orders pedidos={pedidos} />
        <Products
          productos={productos}
          handleAddProduct={handleAddProduct}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
        {showForm && (
          <ProductForm product={selectedProduct} onSave={handleSave} />
        )}
      </main>
    </div>
  );
};

export default RestaurantDashboard;
