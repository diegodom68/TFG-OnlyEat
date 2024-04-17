import AddressSearch from "./AdressSearch";

function Brows_1 () {

    return(
        <div className="w-3/6 h-1/4 mt-14 pt-1 left-0  flex flex-col justify-center items-center">
            <h2>Pide Comida y mucho Más</h2><br />
            <p>Restaurantes y tiendas de alimentación que realizan entregas cerca de ti</p>
            <AddressSearch />
        </div>
    );
}

export default Brows_1;