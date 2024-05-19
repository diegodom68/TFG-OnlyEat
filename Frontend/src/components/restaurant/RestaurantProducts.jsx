import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const RestaurantProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }

    const decoded = jwt_decode(token);
    const restaurantId = decoded.sub;

    fetch(`http://127.0.0.1:8000/restaurantes/${restaurantId}/productos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Error al obtener los productos del restaurante:", error);
        navigate("/login");
      });
  }, [navigate]);

  if (!products.length) {
    return <div>No hay productos disponibles.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id_producto}
            className="bg-white p-4 rounded shadow"
          >
            <img
              src={product.imagen_prod}
              alt={product.nombre_producto}
              className="w-full h-32 object-cover mb-4"
            />
            <h3 className="text-xl font-bold">{product.nombre_producto}</h3>
            <p className="text-gray-700">{product.descripcion}</p>
            <p className="text-gray-900 font-bold">{product.precio} €</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantProducts;
