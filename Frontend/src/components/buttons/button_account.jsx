import { Link } from "react-router-dom";

export default function ButtonAccount() {
  return (
    <Link
      to="/login"
      className="px-6 py-2 bg-[#FF785A] text-white font-semibold rounded-md hover:bg-[#E63946] focus:outline-none focus:ring-2 focus:ring-[#FF785A] focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-md"
    >
      Inicio Sesion
    </Link>
  );
}
