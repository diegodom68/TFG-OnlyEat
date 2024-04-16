import { useState } from "react";
import logo from '../images/justeat.png';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar () {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <nav className="bg-orange-400 text-white w-full fixed top-0 left-0 h-14 shadow-lg rounded">
            <div className="flex justify-between items-center w-full px-4 py-2"> 
                <div className="flex items-center space-x-3 ml-2">
                    <img src={logo} alt="Logo" className="h-8 w-auto"/>
                    <span className="text-lg font-semibold">OnlyEat</span>
                </div>
                <div className="content-end">
                {/* Botón interactivo para menú */}
                    <button onClick={() => setIsOpen(!isOpen)} className="p-0 rounded-md text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <MenuIcon />
                    </button>
                </div>
            </div>
            {/* Menú desplegable, visible solo si isOpen es true */}
            {isOpen && (
                <div className="absolute top-full right-0 bg-white shadow-md mt-1 rounded text-black w-48">
                    <a href="#" className="block px-4 py-2 hover:bg-orange-300">Inicio Sesion</a>
                    <a href="#" className="block px-4 py-2 hover:bg-orange-300">Registrarse</a>
                    <a href="#" className="block px-4 py-2 hover:bg-orange-300">¿Quiénes Somos?</a>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
