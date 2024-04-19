import AddressSearch from "./AdressSearch";


function Brows_1 () {

    return(
        <div className="max-w-5xl w-full h-full mt-12 pt-1 left-0 flex items-center ">
            <div className="flex flex-col justify-center items-center h-full w-5/6">
                <h2 className="text-4xl font-bold text-gray-800 mb-3">Pide Comida y mucho Más</h2>
                <p className="text-xl text-gray-600 mb-6">Restaurantes y tiendas de alimentación que realizan entregas cerca de ti</p>
                <AddressSearch />
            </div>
        </div>
    );
}

export default Brows_1;