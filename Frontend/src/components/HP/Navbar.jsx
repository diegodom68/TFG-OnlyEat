import { useState, useContext } from "react";
import logo from "../../images/Cat-onlyeat.png";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import ButtonAccount from "../buttons/button_account";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartModal from "../products/Cart"; // Importar el modal del carrito
import { CartContext } from "../context/CartContext"; // Importar el contexto del carrito

function isAuthenticated() {
  return sessionStorage.getItem("authToken") !== null;
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para el modal del carrito
  const { cartItems } = useContext(CartContext); // Usar el contexto del carrito

  // Obtener el número total de productos en el carrito
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="bg-[#FFF8F0] fixed w-full top-0 left-0 h-14 shadow-lg z-10">
        <div className="flex justify-between w-full px-4">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-32 pt-1" />
            </Link>
          </div>
          <div className="content-end">
            {!isAuthenticated() ? (
              <ButtonAccount />
            ) : (
              <div className="flex items-center">
                <Link
                  to="/restaurant"
                  className="hover:text-[#C53030] hover:bg-[#FFD9D1] text-white bg-[#E63946] p-2 rounded-md mr-8"
                >
                  Restaurantes
                </Link>
                <button
                  onClick={() => setIsCartOpen(true)} // Mostrar el modal del carrito
                  className="relative hover:text-[#C53030] hover:bg-[#FFD9D1] text-white bg-[#E63946] p-2 rounded-md mr-8"
                >
                  <ShoppingCartIcon />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0  w-6 h-6 bg-[#657E7F] text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
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
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-[#E63946]"
                >
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
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />{" "}
      {/* Modal del carrito */}
    </>
  );
}

export default Navbar;
