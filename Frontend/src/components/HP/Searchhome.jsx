import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "../context/searchcontext";
import axios from "axios";
import debounce from "lodash.debounce";

const AddressSearch = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef();

  // Debounce the input to reduce the number of API calls
  const fetchSuggestions = debounce((query) => {
    if (!query) setSuggestions([]);
    else {
      axios
        .get(`http://localhost:8000/restaurantes/sugerencias/?q=${query}`)
        .then((res) => setSuggestions(res.data))
        .catch((err) => console.error("Failed to fetch suggestions", err));
    }
  }, 300);

  useEffect(() => {
    fetchSuggestions(searchTerm);
    return () => fetchSuggestions.cancel();
  }, [searchTerm]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Reset search term on component unmount
  useEffect(() => {
    return () => {
      setSearchTerm("");
    };
  }, [setSearchTerm]);

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
      ref={searchRef}
      className="flex flex-col items-center justify-center p-5 w-full"
    >
      <div className="relative w-full max-w-lg">
        <div className="flex items-center border border-gray-300 rounded-full focus-within:border-2 focus-within:border-[#A8DADC] w-full bg-white shadow-lg">
          <SearchIcon className="text-gray-500 mx-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar..."
            className="flex-1 p-4 text-lg text-gray-700 rounded-full outline-none"
          />
          <button type="submit" className="hidden">
            Buscar
          </button>
        </div>
        {suggestions.length > 0 && (
          <ul className="absolute z-10 list-none bg-white w-full  max-h-60 overflow-auto rounded-lg shadow-lg">
            {suggestions.map((item) => (
              <li
                key={item.id_restaurante}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                onClick={() => handleSuggestionClick(item.id_restaurante)}
              >
                <SearchIcon className="text-gray-500 mx-2" />
                <span className="text-gray-700">{item.nombre}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};

export default AddressSearch;
