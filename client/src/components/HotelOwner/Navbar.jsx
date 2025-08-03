import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import { UserButton } from "@clerk/clerk-react";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import { ThemeContext } from "../../context/ThemeContext.jsx";

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <>
      <div className="flex items-center justify-between py-4 md:px-8 px-4 shadow-md border-b border-gray-300 bg-whtie transition-all duration-300">
        <Link to="/">
          <img
            src={assets.logo}
            alt=""
            className="h-9 invert opacity-80 dark:invert-0 dark:opacity-100"
          />
        </Link>
        <div className="flex items-center gap-4">
          {darkMode ? (
            <MdOutlineDarkMode
              className="text-2xl cursor-pointer"
              onClick={() => setDarkMode(!darkMode)}
            />
          ) : (
            <MdDarkMode
              className="text-2xl cursor-pointer"
              onClick={() => setDarkMode(!darkMode)}
            />
          )}
          <UserButton />
        </div>
      </div>
    </>
  );
};

export default Navbar;
