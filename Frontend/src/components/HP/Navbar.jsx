import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Cat-onlyeat.png";
import MenuIcon from "@mui/icons-material/Menu";
import ButtonAccount from "../buttons/button_account";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function isAuthenticated() {
  return sessionStorage.getItem("authToken") !== null;
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#FFF8F0] relative w-full top-0 left-0 h-14 shadow-lg rounded z-10">
      <div className="flex justify-between w-full px-4">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-32 pt-1" />
          </Link>
        </div>
        <div className="content-end flex items-center">
          {!isAuthenticated() ? (
            <>
              <ButtonAccount />
              <Link
                to="/restaurant-login"
                className="hover:text-[#C53030] hover:bg-[#A8DADC] text-white bg-[#657E7F] p-2 rounded-md ml-4"
              >
                Inicio Sesión Restaurantes
              </Link>
            </>
          ) : (
            <div className="flex items-center">
              <Link
                to="/restaurant"
                className="hover:text-[#C53030] hover:bg-[#FFD9D1] text-white bg-[#E63946] p-2 rounded-md mr-8"
              >
                Restaurantes
              </Link>
              <Link
                to="/cart"
                className="hover:text-[#C53030] hover:bg-[#FFD9D1] text-white bg-[#E63946] p-2 rounded-md mr-8"
              >
                <ShoppingCartIcon />
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="ml-2 p-0 rounded-md text-[#C53030] hover:bg-[#E63946] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <MenuIcon />
              </button>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-full right-0 bg-white shadow-md mt-1 rounded text-black w-48">
          {isAuthenticated() ? (
            <>
              <Link to="/user" className="block px-4 py-2 hover:bg-[#E63946]">
                Mi Perfil
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 hover:bg-[#E63946]"
              >
                Configuración
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-4 py-2 hover:bg-[#E63946]">
                Inicio Sesión
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 hover:bg-[#E63946]"
              >
                Registrarse
              </Link>
              <Link
                to="/restaurant-login"
                className="block px-4 py-2 hover:bg-[#E63946] bg-[#212121] text-white text-center rounded-md mt-2"
              >
                Inicio Sesión Restaurantes
              </Link>
            </>
          )}
          <Link to="/aboutus" className="block px-4 py-2 hover:bg-[#E63946]">
            ¿Quiénes Somos?
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
