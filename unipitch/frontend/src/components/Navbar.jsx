import React from 'react';
import { Link } from 'react-router-dom';
import bagImg from '../assets/images/bag.svg'; // Ensure these paths are correct
import searchImg from '../assets/images/search.svg'; // Ensure these paths are correct
import './Navbar.css';

const navLists = ["Home", "About", "Contact", "Projects", "Login"];

const Navbar = () => {
  return (
    <header className="w-full py-5 px-5 sm:px-10 flex justify-between items-center bg-gray-800 text-white">
      <nav className="flex w-full max-w-screen-xl mx-auto items-center">
        {/* Brand or Logo */}
        <div className="flex flex-1">
          <Link to="/" className="text-xl font-bold">
            UniPitch
          </Link>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden sm:flex flex-1 justify-center">
          {navLists.map((nav, index) => (
            <Link
              key={index}
              to={`/${nav.toLowerCase()}`}
              className="px-5 text-sm cursor-pointer hover:text-gray-300 transition-all"
            >
              {nav}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <img src={searchImg} alt="Search" width={18} height={18} />
          <img src={bagImg} alt="Bag" width={18} height={18} />
        </div>

        {/* Navigation Links (Mobile) */}
        <div className="sm:hidden flex flex-1 justify-end">
          <ul className="flex flex-col items-end gap-2">
            {navLists.map((nav, index) => (
              <li key={index}>
                <Link
                  to={`/${nav.toLowerCase()}`}
                  className="text-sm cursor-pointer hover:text-gray-300 transition-all"
                >
                  {nav}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
