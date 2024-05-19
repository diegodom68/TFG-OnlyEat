import React from "react";

const Orders = ({ pedidos }) => {
  return (
    <section id="pedidos">
      <h2 className="text-3xl font-bold mb-4">Pedidos</h2>
      {pedidos.length === 0 ? (
        <p>No hay pedidos.</p>
      ) : (
        <ul>
          {pedidos.map((pedido) => (
            <li
              key={pedido.id_pedido}
              className="mb-6 p-4 bg-white rounded shadow-md"
            >
              <p>ID Pedido: {pedido.id_pedido}</p>
              <p>Fecha: {new Date(pedido.fecha_pedido).toLocaleString()}</p>
              <p>Total: {pedido.total} €</p>
              <p>Estado: {pedido.estado}</p>
              <h3 className="mt-4 font-semibold">Productos</h3>
              <ul className="ml-4">
                {pedido.lineas_pedido.map((linea) => (
                  <li key={linea.id_linea}>
                    <p>Producto: {linea.nombre_producto}</p>
                    <p>Cantidad: {linea.cantidad}</p>
                    <p>Precio: {linea.precio} €</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Orders;
