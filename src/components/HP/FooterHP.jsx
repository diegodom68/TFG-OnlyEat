
export default function FooterHP () {
    return (
            <footer className="bg-[#212121] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
            <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
                <a href="#" className="flex items-center">
                <img src="/path-to-your-logo.svg" className="mr-3 h-8" alt="Your Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap">Tu Compañía</span>
                </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
                <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">Compañía</h2>
                <ul>
                    <li className="mb-4">
                    <a href="#" className="hover:underline">Acerca de</a>
                    </li>
                    <li>
                    <a href="#" className="hover:underline">Empleo</a>
                    </li>
                    // Más enlaces...
                </ul>
                </div>
                // Más columnas...
            </div>
            </div>
            <div className="mt-8 md:flex md:justify-between md:items-center">
            <p className="text-center text-gray-400 md:text-left">© 2024 Tu Compañía. Todos los derechos reservados.</p>
            <div className="flex mt-4 space-x-6 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white">
                {/* Icono de alguna red social */}
                </a>
                // Más íconos de redes sociales...
            </div>
            </div>
        </div>
        </footer>
    );
}