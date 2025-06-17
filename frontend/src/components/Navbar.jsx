import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <nav
      className="flex justify-between items-center w-full fixed top-0 left-0 px-8 py-4 z-50
                    bg-white dark:bg-gray-900 shadow-md dark:shadow-lg transition-colors duration-300"
    >
      <a
        href="/"
        className="font-extrabold text-3xl tracking-wide
                             text-indigo-600 dark:text-indigo-400 transition-colors duration-300"
      >
        PRODUCT STORE 🛒
      </a>
      <div className="flex items-center gap-6">
        <a
          href="/create"
          className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400
                                     transition-colors duration-300 transform hover:scale-110"
        >
          <CiSquarePlus size={40} />
        </a>
        <button
          onClick={toggleDarkMode}
          className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400
                           transition-colors duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 rounded-full p-1"
        >
          {isDarkMode ? (
            <MdDarkMode size={40} />
          ) : (
            <MdOutlineLightMode size={40} />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
