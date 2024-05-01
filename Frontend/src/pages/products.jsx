import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/HP/Navbar";
import { Link, useParams } from "react-router-dom";

export default function Products() {
  const { id_restaurante } = useParams();
  const [products, setProducts] = useState([]);
  console.log(id_restaurante);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/restaurantes/${id_restaurante}/productos`
        );
        setProducts(response.data);
        console.log("Productos:", response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    fetchProducts();
  }, [id_restaurante]);
  return (
    <>
      <Navbar />
      <main className="w-full h-full bg-slate-100">
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-3/4">
            <h1 className="text-2xl font-bold text-center my-4">
              Lista de Productos
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <Link
                  to={`/productos/${product.id_producto}`}
                  key={product.id_producto}
                  className="hover:opacity-80 transition-opacity duration-300"
                >
                  <div className="rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 w-full h-full">
                    <img
                      className="w-full h-48 object-cover object-center"
                      src={product.imagen_prod}
                      alt={product.nombre_producto}
                    />
                    <div className="p-4">
                      <div className="font-bold text-xl mb-2">
                        {product.nombre_producto}
                      </div>
                      <p className="text-gray-700 text-base">
                        {product.comentarios}
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
