import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              MyShop
            </Link>
          </div>

          {/* Menu for larger screens */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/men" className="text-gray-700 hover:text-blue-600">
              Men
            </Link>
            <Link to="/women" className="text-gray-700 hover:text-blue-600">
              Women
            </Link>
            <Link to="/kids" className="text-gray-700 hover:text-blue-600">
              Kids
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">
              About Us
            </Link>
          </nav>

          {/* Hamburger menu for mobile screens */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-lg">
          <ul className="px-4 py-2 space-y-2">
            <li>
              <Link
                to="/"
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/men"
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                to="/women"
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                to="/kids"
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Kids
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
