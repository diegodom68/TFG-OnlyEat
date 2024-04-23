import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import axios from 'axios';


export default function SignUp() {
  
    const [userData, setUserData] = useState({
        nombre: '',
        apellido: '',
        password: '',
        email: '',
    });

    const handleChange = (e) => {
      const { name, value } = e.target; // Extraemos name y value del evento target
      setUserData(prevState => ({
          ...prevState,
          [name]: value
      }));
  };
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/users/', userData)
            .then(response => {
                console.log('User created:', response.data);
                console.log(userData);
                navigate('/');
                // Aquí puedes redirigir al usuario o limpiar el formulario, etc.
            })
            .catch(error => {
                console.error('There was an error creating the user:', error);
            });
    };

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-[#F7F7F7]">
        <div className="bg-[#C53030] rounded-lg p-8 w-2/6">
          <h1 className="text-4xl text-white text-center mb-6">
            Crear Cuenta
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
            <input
              type="text"
              name="nombre"
              value={userData.nombre}
              placeholder="Nombre"
              onChange={handleChange}
              className="w-full max-w-xs h-10 rounded-md p-2"
            />
            <input
              type="text"
              name="apellidos"
              value={userData.apellidos}
              placeholder="Apellido"
              onChange={handleChange}
              className="w-full max-w-xs h-10 rounded-md p-2"
            />
            <input
              type="email"
              name="email"
              value={userData.email}
              placeholder="Email"
              onChange={handleChange}
              className="w-full max-w-xs h-10 rounded-md p-2"
            />
            <input
              type="password"
              name="password"
              value={userData.password}
              placeholder="Contraseña"
              onChange={handleChange}
              className="w-full max-w-xs h-10 rounded-md p-2"
            />
            <button type="submit" className="w-full max-w-xs h-10 bg-[#FFF8F0] rounded-md hover:bg-[#FF7B72]">
              Crear Cuenta
            </button>
            <p className="text-white pt-4">¿Ya tienes una Cuenta?  <Link to='/login' className="underline">Iniciar Sesión</Link></p>
          </form>
          <br />
          <hr />
          <p className="text-white text-sm text-center mt-4 px-2">
            Al crear la cuenta, aceptas nuestros términos y condiciones. Por
            favor, lee nuestra política de privacidad y nuestra política de
            cookies.
          </p>
        </div>
      </div>
    );
}