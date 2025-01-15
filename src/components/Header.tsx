import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between">
        <h1 className="text-xl font-bold">IMDB Clone</h1>
        <div>
          <Link className="px-4 hover:underline" to="/dashboard">Dashboard</Link>
          <Link className="px-4 hover:underline" to="/movies">Movies</Link>
          <Link className="px-4 hover:underline" to="/actors">Actors</Link>
          <Link className="px-4 hover:underline" to="/producers">Producers</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
