import React from "react";
import { Link } from "react-router-dom";

const Products = ({ products }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow mb-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id_producto} className="border p-3 rounded">
            <h3 className="font-bold">{product.nombre_producto}</h3>
            <p>{product.descripcion}</p>
            <p>
              <strong>Price:</strong> {product.precio} €
            </p>
            <Link
              to={`/products/${product.id_producto}`}
              className="text-blue-500 hover:underline"
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
