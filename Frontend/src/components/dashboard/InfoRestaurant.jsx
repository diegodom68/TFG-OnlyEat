import React from "react";

const RestaurantInfo = ({ restaurant }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow mb-6">
      <h2 className="text-2xl font-bold mb-4">Restaurant Information</h2>
      <p>
        <strong>Name:</strong> {restaurant.nombre}
      </p>
      <p>
        <strong>Email:</strong> {restaurant.email}
      </p>
      <p>
        <strong>Address:</strong> {restaurant.direccion}
      </p>
      <p>
        <strong>Phone:</strong> {restaurant.telefono}
      </p>
    </div>
  );
};

export default RestaurantInfo;
