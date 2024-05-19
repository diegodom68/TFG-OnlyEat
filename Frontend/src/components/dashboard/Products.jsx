import React from "react";

const Products = ({
  productos,
  handleAddProduct,
  handleEditProduct,
  handleDeleteProduct,
}) => {
  return (
    <section id="productos" className="mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-4">Productos</h2>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleAddProduct}
        >
          Añadir Producto
        </button>
      </div>
      {productos.length === 0 ? (
        <p>No hay productos.</p>
      ) : (
        <ul>
          {productos.map((producto) => (
            <li
              key={producto.id_producto}
              className="mb-6 p-4 bg-white rounded shadow-md"
            >
              <p>Nombre: {producto.nombre_producto}</p>
              <p>Precio: {producto.precio} €</p>
              <img
                src={producto.imagen_prod}
                alt={producto.nombre_producto}
                width="100"
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleEditProduct(producto)}
              >
                Editar
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDeleteProduct(producto.id_producto)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Products;
