import React, { useState, useEffect } from "react";
import Img from "../images/attenlogo.png";
import { Moon, Sun } from "react-feather";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    console.log("Stored Theme:", theme);
    if (theme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="p-4 text-white flex items-center justify-between">
      <div className="flex items-center">
        <img src={Img} alt="Logo" className="h-8 w-8 mr-2" />
        <span className="dark:text-white text-dark">AttendEase</span>
      </div>
      <div
        className="relative w-16 h-6 flex items-center dark:bg-gray-900 bg-teal-500 cursor-pointer rounded-full p-1"
        onClick={() => setDarkMode(!darkMode)}
      >
        <Moon className="text-white" size={18} />
        <div
          className="absolute bg-white  w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
          style={darkMode ? { left: "2px" } : { right: "2px" }}
        ></div>
        <Sun className="ml-auto text-yellow-400" size={18} />
      </div>
    </nav>
  );
};

export default Navbar;
