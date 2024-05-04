import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TiposProductos = () => {
  const { id_restaurante } = useParams(); // Este nombre 'idRestaurante' debe coincidir con el parámetro definido en la ruta en tu componente <Route>
  const [tiposProductos, setTiposProductos] = useState([]);

  useEffect(() => {
    fetchTiposProductos();
  }, [id_restaurante]);

  const fetchTiposProductos = async () => {
    const url = `http://localhost:8000/tiposprod/${id_restaurante}`; // Asegúrate de que esta URL coincida con la configuración de tu API
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTiposProductos(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className=" ml-16 text-white">
      <ul className="flex ">
        {tiposProductos.map((tipo) => (
          <li
            key={tipo.id_tipo_prod}
            className="mx-2 hover:bg-[#E63946] hover:text-black px-2 py-1 rounded-lg cursor-pointer transition-colors duration-300 ease-in-out"
          >
            {tipo.nombre_tipo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TiposProductos;
