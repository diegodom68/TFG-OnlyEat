import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "../context/searchcontext";
import axios from "axios";
import debounce from "lodash.debounce";

const AddressSearch = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Debounce the input to reduce the number of API calls
  const fetchSuggestions = debounce((query) => {
    if (!query) setSuggestions([]);
    else {
      axios
        .get(`http://localhost:8000/restaurantes/sugerencias/?q=${query}`)
        .then((res) => setSuggestions(res.data));
      console
        .log(res.data)
        .catch((err) => console.error("Failed to fetch suggestions", err));
    }
  }, 300);

  useEffect(() => {
    fetchSuggestions(searchTerm);
    return () => fetchSuggestions.cancel();
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/restaurant?search=${searchTerm}`);
  };

  const handleSuggestionClick = (id) => {
    // Navegar a la página de productos del restaurante
    navigate(`/restaurant/${id}/productos`);
    setSuggestions([]); // Limpia las sugerencias después de la selección
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center p-5 w-full relative"
    >
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
      {/* Asegúrate de que el ul está aquí, fuera del div del input pero dentro del form */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 list-none bg-white w-4/6 mt-10 max-h-60 overflow-auto rounded-lg shadow-lg">
          {suggestions.map((item) => (
            <li
              key={item.id_restaurante}
              className="p-2 hover:bg-gray-100 cursor-pointer border-b-2"
              onClick={() => handleSuggestionClick(item.id_restaurante)}
            >
              <SearchIcon className="text-gray-500 mx-2" />
              {item.nombre}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default AddressSearch;
