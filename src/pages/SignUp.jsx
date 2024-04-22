import { Link } from "react-router-dom";

export default function SignUp() {
    return (
        <div className="flex flex-col h-screen justify-center items-center bg-[#F7F7F7]">
        <div className="bg-[#C53030] rounded-lg p-8 w-2/6">
          <h1 className="text-4xl text-white text-center mb-6">
            Crear Cuenta
          </h1>
          <form className="flex flex-col items-center space-y-4">
            <input
              type="text"
              placeholder="Usuario"
              className="w-full max-w-xs h-10 rounded-md p-2"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full max-w-xs h-10 rounded-md p-2"
            />
            <button className="w-full max-w-xs h-10 bg-[#FFF8F0] rounded-md hover:bg-[#FF7B72]">
              Registrar
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