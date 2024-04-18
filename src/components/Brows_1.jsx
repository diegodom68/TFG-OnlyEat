import AddressSearch from "./AdressSearch";
import Brows_2 from "./Brows_2";


function Brows_1 () {

    return(
        <div className="w-full h-full mt-12 pt-1 left-0 flex flex-row">
            <div className="flex flex-col justify-center items-center h-full w-5/6">
                <h2>Pide Comida y mucho Más</h2>
                <p>Restaurantes y tiendas de alimentación que realizan entregas cerca de ti</p>
                <AddressSearch />
            </div>
            <Brows_2 />
        </div>
    );
}

export default Brows_1;