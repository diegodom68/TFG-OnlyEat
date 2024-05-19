import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ restaurante }) => {
  return (
    <aside className="w-1/4 bg-[#C53030] text-white h-screen p-4">
      <div className="flex flex-col items-center mb-8">
        <img
          src={restaurante.imagen}
          alt="Restaurante"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-2xl font-bold">{restaurante.nombre}</h2>
        <p>{restaurante.direccion}</p>
      </div>
      <nav>
        <ul>
          <li className="mb-4">
            <a href="#pedidos" className="hover:underline">
              Pedidos
            </a>
          </li>
          <li className="mb-4">
            <a href="#productos" className="hover:underline">
              Productos
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
