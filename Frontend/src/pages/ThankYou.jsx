import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ThankYouPage = () => {
  const { id_pedido } = useParams();
  const [pedido, setPedido] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/pedidos/${id_pedido}`
        );
        setPedido(response.data);
      } catch (error) {
        console.error("Error al obtener el pedido:", error);
      }
    };

    fetchPedido();
  }, [id_pedido]);

  if (!pedido) return <div>Cargando...</div>;

  const formatPrice = (price) => {
    return price.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-[#E63946] mb-4">
        ¡Gracias por tu pedido!
      </h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Resumen del Pedido
      </h2>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Pedido #{pedido.id_pedido}
        </h3>
        <ul>
          {pedido.lineas_pedido &&
            pedido.lineas_pedido.map((linea) => (
              <li key={linea.id_linea} className="mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-700">
                      {linea.nombre_producto}
                    </p>
                    <p className="text-gray-500">Cantidad: {linea.cantidad}</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-700">
                    {formatPrice(linea.precio * linea.cantidad)}
                  </p>
                </div>
              </li>
            ))}
        </ul>
        <div className="flex justify-between items-center mt-6">
          <p className="text-xl font-bold text-gray-800">Total:</p>
          <p className="text-xl font-bold text-gray-800">
            {formatPrice(pedido.total)}
          </p>
        </div>
        <button
          onClick={handleBackToHome}
          className="mt-6 px-4 py-2 bg-[#E63946] text-white rounded-md hover:bg-[#D62828] transition"
        >
          Volver a la Página Principal
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
