import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-screen">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/account-info"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              activeClassName="bg-gray-200 dark:bg-gray-900"
            >
              Información de la cuenta
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/security"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              activeClassName="bg-gray-200 dark:bg-gray-900"
            >
              Seguridad
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/data-protection"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              activeClassName="bg-gray-200 dark:bg-gray-900"
            >
              Protección de datos
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
