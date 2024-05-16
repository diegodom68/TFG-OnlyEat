import React from "react";
import { Link } from "react-router-dom";
import Image from "../images/Cat-onlyeat.png";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Página No Encontrada
      </h2>
      <p className="text-gray-500 mb-8">
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Volver a la Página Principal
      </Link>
      <div className="mt-10">
        <img src={Image} alt="Food Delivery" className=" object-cover" />
      </div>
    </div>
  );
};

export default NotFound;
