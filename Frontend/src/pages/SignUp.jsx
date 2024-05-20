import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import BackArrow from "../components/buttons/BackArrow";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8000/users/", data)
      .then((response) => {
        console.log("User created:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error creating the user:", error);
      });
  };

  return (
    <main>
      <div className="bg-gray-100 pt-2 ps-2">
        <BackArrow />
      </div>
      <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
        <div className="bg-red-500 rounded-lg p-8 w-full max-w-md">
          <h1 className="text-4xl text-white text-center mb-6">Crear Cuenta</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center space-y-4"
          >
            <motion.input
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              type="text"
              placeholder="Nombre"
              className="w-full max-w-xs h-10 rounded-md p-2"
              {...register("nombre", {
                required: "El nombre es obligatorio",
                pattern: {
                  value: /^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$/,
                  message: "El nombre solo puede contener letras y espacios",
                },
              })}
            />
            {errors.nombre && (
              <p className="text-black ">{errors.nombre.message}</p>
            )}

            <motion.input
              initial={{ x: "100vw" }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              type="text"
              placeholder="Apellidos"
              className="w-full max-w-xs h-10 rounded-md p-2"
              {...register("apellido", {
                required: "Los apellidos son obligatorios",
                pattern: {
                  value: /^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$/,
                  message:
                    "Los apellidos solo pueden contener letras y espacios",
                },
              })}
            />
            {errors.apellido && (
              <p className="text-black ">{errors.apellido.message}</p>
            )}

            <motion.input
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              type="email"
              placeholder="Email"
              className="w-full max-w-xs h-10 rounded-md p-2"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9.@]+$/,
                  message:
                    "El email solo puede contener letras, números y puntos.",
                },
              })}
            />
            {errors.email && (
              <p className="text-black ">{errors.email.message}</p>
            )}

            <motion.input
              initial={{ x: "100vw" }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              type="text"
              placeholder="Nombre de usuario"
              className="w-full max-w-xs h-10 rounded-md p-2"
              {...register("username", {
                required: "El nombre de usuario es obligatorio",
                minLength: {
                  value: 4,
                  message:
                    "El nombre de usuario debe tener al menos 4 caracteres",
                },
                pattern: {
                  value: /^[a-zA-Z0-9.-_]+$/,
                  message:
                    "El usuario solo puede contener letras, números y guiones.",
                },
              })}
            />
            {errors.username && (
              <p className="text-black ">{errors.username.message}</p>
            )}

            <motion.input
              initial={{ x: "-100vw" }}
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
              <p className="text-black ">{errors.password.message}</p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full max-w-xs h-10 bg-white rounded-md text-red-500 hover:bg-red-600 hover:text-white"
            >
              Crear Cuenta
            </motion.button>
            <p className="text-white pt-4">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="underline">
                Inicia Sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
