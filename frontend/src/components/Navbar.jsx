import React, { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    console.log("Dark mode toggled:", !isDarkMode);
  };

  return (
    <nav className="flex justify-between items-center w-full fixed top-0 left-0 px-20 py-4">
      <a href="/" className="font-bold text-2xl">
        PRODUCT STORE 🛒
      </a>
      <div className="flex gap-4">
        <a href="/create">
          <CiSquarePlus size={50} />
        </a>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? (
            <MdDarkMode size={50} />
          ) : (
            <MdOutlineLightMode size={50} />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
