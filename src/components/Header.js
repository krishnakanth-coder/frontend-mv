import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl lg:w-1/6 font-bold text-gray-100 hover:text-gray-300 transition-colors duration-300">
          MySite
        </div>
        <button
          className="lg:hidden px-2 py-1 text-gray-100 hover:text-gray-300 transition-colors duration-300"
          onClick={toggleMenu}
        >
          ☰
        </button>
        <div
          className={`lg:flex  lg:items-center lg:space-x-4 lg:static fixed top-0 left-0 w-full lg:w-5/6 bg-gray-800  lg:bg-transparent transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:translate-x-0 z-50`}
        >
          <ul
            className={`flex flex-col w-full lg:flex-row lg:justify-evenly lg:space-x-4 p-4 lg:p-0  transition-opacity duration-300 ease-in-out ${
              isOpen || 'lg:opacity-100 opacity-0'
            }`}
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block text-gray-100 hover:text-gray-300 transition-colors duration-300 py-2 ${
                    isActive ? 'font-bold text-blue-700' : 'font-sans'
                  }`
                }
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/creteEvent"
                className={({ isActive }) =>
                  `block text-gray-100 hover:text-gray-300 transition-colors duration-300 py-2 ${
                    isActive ? 'font-bold  text-blue-700 ' : 'font-sans'
                  }`
                }
                onClick={closeMenu}
              >
                Create Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `block text-gray-100 hover:text-gray-300 transition-colors duration-300 py-2 ${
                    isActive ? 'font-bold  text-blue-700' : 'font-sans'
                  }`
                }
                onClick={closeMenu}
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block text-gray-100 hover:text-gray-300 transition-colors duration-300 py-2 ${
                    isActive ? 'font-bold  text-blue-700' : 'font-sans'
                  }`
                }
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          {/* Mobile Menu Close Button */}
          <button
            className={`lg:hidden absolute top-4 right-4 p-2 text-gray-100 hover:text-gray-300 transition-colors duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeMenu}
          >
            ✖️
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
