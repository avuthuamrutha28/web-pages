import React from "react";
import logo from "../assets/LEARN.png";

const Header: React.FC = () => {
  return (
    <header className="flex items-center bg-white shadow-md p-4">
      <img src={logo} alt="Logo" className="w-12 h-12 mr-4" />
      <h1 className="text-4xl font-bold font-[Montserrat] text-blue-700">LEARN PEAK</h1>

    </header>
  );
};

export default Header;
