import React from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "../context/searchcontext";

const AddressSearch = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    navigate(`/restaurantes?search=${searchTerm}`); // Navega a la página de restaurantes con un parámetro de búsqueda
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5 w-full">
      <div className="flex items-center border-2 border-gray-500 rounded-full focus-within:border-orange-500 w-4/6">
        <SearchIcon className="text-gray-500 mx-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar..."
          className="flex-1 p-2 text-gray-700 rounded-full outline-none"
        />
        <button type="submit" className="hidden">
          Buscar
        </button>
      </div>
    </form>
  );
};

export default AddressSearch;
