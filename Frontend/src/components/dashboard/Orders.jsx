import React from "react";
import { Link } from "react-router-dom";

const Orders = ({ orders }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div key={order.id_pedido} className="border p-3 rounded">
            <h3 className="font-bold">Order ID: {order.id_pedido}</h3>
            <p>
              <strong>Total:</strong> {order.total} €
            </p>
            <p>
              <strong>Status:</strong> {order.estado}
            </p>
            <Link
              to={`/orders/${order.id_pedido}`}
              className="text-blue-500 hover:underline"
            >
              View Order
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
