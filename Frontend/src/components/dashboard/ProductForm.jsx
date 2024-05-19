import React, { useState } from "react";
import axios from "axios";

const ProductForm = ({ product, onSave }) => {
  const [nombre, setNombre] = useState(product?.nombre_producto || "");
  const [precio, setPrecio] = useState(product?.precio || 0);
  const [imagen, setImagen] = useState(product?.imagen_prod || "");
  const [tipo, setTipo] = useState(product?.id_tipo_prod || 0);
  const [comentarios, setComentarios] = useState(product?.comentarios || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const producto = {
      nombre_producto: nombre,
      precio,
      imagen_prod: imagen,
      id_tipo_prod: tipo,
      comentarios,
      id_restaurante: product.id_restaurante,
    };

    try {
      if (product) {
        await axios.put(
          `http://localhost:8000/update-product/${product.id_producto}`,
          producto
        );
      } else {
        await axios.post("http://localhost:8000/create-producto/", producto);
      }
      onSave();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(Number(e.target.value))}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Imagen URL"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Tipo de Producto"
        value={tipo}
        onChange={(e) => setTipo(Number(e.target.value))}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Comentarios"
        value={comentarios}
        onChange={(e) => setComentarios(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Guardar
      </button>
    </form>
  );
};

export default ProductForm;
