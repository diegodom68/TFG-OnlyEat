import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackArrow = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center justify-center p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
      aria-label="Volver"
    >
      <ArrowBackIcon />
    </button>
  );
};

export default BackArrow;
