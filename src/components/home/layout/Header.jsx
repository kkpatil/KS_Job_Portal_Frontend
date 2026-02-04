import { PiBagSimpleFill } from "react-icons/pi";
import { FaBars, FaTimes } from "react-icons/fa";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="bg-black text-white w-full fixed top-0 left-0 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LEFT : Logo */}
        <div className="flex items-center gap-2">
          <PiBagSimpleFill className="text-2xl text-white" />
          <span className="md:block text-lg font-semibold">Job Portal</span>
        </div>

        {/* CENTER : Navigation (Desktop) */}
        <nav className="hidden md:flex gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `transition ${
                  isActive ? " text-white" : "text-gray-400 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT : Buttons (Desktop) */}
        <div className="hidden md:flex gap-4">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl transition ${
                isActive
                  ? "font-bold bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="px-4 py-2 bg-[#309689] text-white rounded-md hover:bg-[#257a6f] transition"
          >
            Register
          </NavLink>
        </div>

        {/* HAMBURGER ICON (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <nav className="flex flex-col items-center gap-6 py-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? "font-bold text-white"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="flex gap-4 pt-4">
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2 border rounded-lg transition ${
                    isActive
                      ? "font-bold bg-white text-black"
                      : "hover:bg-white hover:text-black"
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 bg-[#309689] rounded-lg hover:bg-[#257a6f] transition text-white"
              >
                Register
              </NavLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
