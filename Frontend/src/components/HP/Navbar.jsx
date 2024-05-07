import { useState } from "react";
import logo from "../../images/Cat-onlyeat.png";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import ButtonAccount from "../buttons/button_account";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function isAuthenticated() {
  // Devuelve true si "authToken" existe en sessionStorage, de lo contrario false
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
        <div className="content-end">
          {/* Condicionales basados en la autenticación */}
          {!isAuthenticated() ? (
            <ButtonAccount />
          ) : (
            // No anides botones dentro de Link o viceversa
            <div className="flex items-center">
              {/* Este es un Link que parece un botón */}
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
              {/* Este es el botón que controla la visibilidad del menú */}
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
      {/* Menú desplegable, visible solo si isOpen es true */}
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
