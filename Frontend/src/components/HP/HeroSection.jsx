import React from "react";
import FotoPizza from "../../images/Browsphoto.png"; // Asegúrate de actualizar el camino correcto a tu imagen
import OnlyEatLogo from "../../images/Cat-onlyeat.png"; // Asegúrate de actualizar el camino correcto a tu logo
import AddressSearch from "./Searchhome";

function HeroSection() {
  return (
    <section className="flex flex-row items-center justify-center pt-14 bg-[#E63946]">
      <div className="flex flex-col items-center bg-[#E63946] py-14 px-4 md:px-16">
        <p className="text-4xl font-bold text-gray-100 mb-2">
          Pide Comida y Mucho Más
        </p>
        <p className="text-xl text-white mb-6">
          Restaurantes y tiendas locales a tu alcance
        </p>
        <AddressSearch />
      </div>
      <div className="flex items-end w-2/5">
        <img
          src={FotoPizza}
          alt="BrandOnlyEat"
          className="h-auto max-w-lg ms-auto"
        />
      </div>
    </section>
  );
}

export default HeroSection;
