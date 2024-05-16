import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    const formData = new URLSearchParams();
    formData.append("username", data.username);
    formData.append("password", data.password);

    try {
      const response = await fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });
      const result = await response.json();

      if (response.ok) {
        login({ token: result.access_token });
      } else {
        throw new Error(
          result.message || "Ha ocurrido un error durante el inicio de sesión"
        );
      }
    } catch (error) {
      alert("Error de inicio de sesión: " + error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-red-500 rounded-lg p-8 w-full max-w-md"
      >
        <h1 className="text-4xl text-white text-center mb-6">Iniciar Sesión</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center space-y-4"
        >
          <motion.input
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            type="text"
            placeholder="Usuario"
            className="w-full max-w-xs h-10 rounded-md p-2"
            {...register("username", {
              required: "El nombre de usuario es obligatorio",
            })}
          />
          {errors.username && (
            <p className="text-black">{errors.username.message}</p>
          )}

          <motion.input
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            type="password"
            placeholder="Contraseña"
            className="w-full max-w-xs h-10 rounded-md p-2"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          {errors.password && (
            <p className="text-black">{errors.password.message}</p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full max-w-xs h-10 bg-white rounded-md text-red-500 hover:bg-red-600 hover:text-white"
          >
            Iniciar Sesión
          </motion.button>
          <p className="text-white pt-4">
            ¿Eres Nuevo?{" "}
            <Link to="/signup" className="underline">
              Crear una cuenta
            </Link>
          </p>
          <p className=" text-xs text-white py-2 border-y ">
            Al crear una cuenta, aceptas nuestros Términos y Condiciones. Lee
            nuestra Política de Privacidad y Política de Cookies.
          </p>
          <div className="flex justify-center mt-6">
            <Link
              to="/loginrestaurant"
              className="bg-[#657E7F] text-white p-2 shadow hover:shadow-xl rounded-md"
            >
              Inicio de Sesion para Restaurantes.
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
