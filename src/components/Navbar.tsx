import { useState } from "react";
import { NavLink } from "react-router-dom";
import { DarkThemeToggle, Flowbite } from "flowbite-react";

export default function Navbar() {
  const [activeMenu, setMenuActive] = useState(false);
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Flowbite>
          <NavLink to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              CONTMAN
            </span>
          </NavLink>

          <div
            className={`${
              activeMenu ? "" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pl-3 pr-4 text-gray-900 ${
                      isActive ? "text-blue-700 dark:text-blue-700" : ""
                    } rounded md:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:text-blue-500`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="contacts"
                  className={({ isActive }) =>
                    `block py-2 pl-3 pr-4 text-gray-900 rounded ${
                      isActive ? "text-blue-700 dark:text-blue-700" : ""
                    } hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`
                  }
                >
                  My Contacts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="all-contacts"
                  className={({ isActive }) =>
                    `block py-2 pl-3 pr-4 text-gray-900 rounded ${
                      isActive ? "text-blue-700 dark:text-blue-700" : ""
                    } hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`
                  }
                >
                  All Contacts
                </NavLink>
              </li>
            </ul>
          </div>
          <DarkThemeToggle />
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => setMenuActive(!activeMenu)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </Flowbite>
      </div>
    </nav>
  );
}
