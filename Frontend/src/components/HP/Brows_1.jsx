import AddressSearch from "./Searchhome";

function Brows_1() {
  return (
    <div className="relative w-full h-full mt-12 pt-1 flex items-center justify-center">
      <div className="flex flex-col justify-center items-center h-full w-full md:w-5/6 px-4 md:px-0">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 text-center md:text-left">
          Pide Comida y mucho Más
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-6 text-center md:text-left">
          Restaurantes y tiendas de alimentación que realizan entregas cerca de
          ti
        </p>
        <div className="w-full md:w-3/4 lg:w-2/3">
          <AddressSearch className="w-full p-4 text-lg" />
        </div>
      </div>
    </div>
  );
}

export default Brows_1;
