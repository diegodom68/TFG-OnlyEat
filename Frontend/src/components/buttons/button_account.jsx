import { Link } from "react-router-dom";

export default function ButtonAccount() {
  return (
    <Link
      to="/login"
      className="me-16 px-4 py-2 hover:bg-[#E63946] hover:text-white rounded-md text-[#212121]"
    >
      Inicio Sesion
    </Link>
  );
}
