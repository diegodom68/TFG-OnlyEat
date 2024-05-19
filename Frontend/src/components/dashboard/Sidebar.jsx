import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ restaurantName }) => {
  return (
    <div className="bg-[#C53030] text-white w-1/5 h-screen p-5 flex flex-col justify-between">
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{restaurantName}</h1>
        </div>
        <div className="flex flex-col space-y-4">
          <Link to="/dashboard" className="hover:text-[#A8DADC]">
            Dashboard
          </Link>
          <Link to="/orders" className="hover:text-[#A8DADC]">
            Orders
          </Link>
          <Link to="/products" className="hover:text-[#A8DADC]">
            Products
          </Link>
          <Link to="/finances" className="hover:text-[#A8DADC]">
            Finance
          </Link>
          <Link to="/logout" className="hover:text-[#A8DADC]">
            Logout
          </Link>
        </div>
      </div>
      <button className="bg-red-500 text-white py-2 px-4 rounded">
        Start new order
      </button>
    </div>
  );
};

export default Sidebar;
