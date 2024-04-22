import { useState } from "react";
import logo from '../../images/Cat-onlyeat.png';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

function Navbar () {
    const [isOpen, setIsOpen] = useState(false);



    return (
        <nav className="bg-[#FFF8F0]  w-full fixed top-0 left-0 h-14 shadow-lg rounded ">
            <div className="flex justify-between w-full px-4 ">
                <div className="flex items-center ">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="w-32 pt-1" />
                    </Link>
                </div>
                <div className="content-end">
                    {/* Botón interactivo para menú */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-0 rounded-md text-white hover:bg-[#E63946] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    >
                        <MenuIcon className="text-[#C53030]" />
                    </button>
                </div>
            </div>
            {/* Menú desplegable, visible solo si isOpen es true */}
            {isOpen && (
                <div className="absolute top-full right-0 bg-white shadow-md    mt-1 rounded text-black w-48">
                    <Link to="/login"  className="block px-4 py-2 hover:bg-[#E63946]">
                        Inicio Sesion
                    </Link>
                    <Link to="/login" className="block px-4 py-2 hover:bg-[#E63946]">
                        Registrarse
                    </Link>
                    <Link to="/AboutUs" className="block px-4 py-2 hover:bg-[#E63946]">
                        ¿Quiénes Somos?
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;