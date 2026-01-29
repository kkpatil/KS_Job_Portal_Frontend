import { PiBagSimpleFill } from "react-icons/pi";
import { FaBars, FaTimes } from "react-icons/fa";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white w-full fixed top-0 left-0 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LEFT : Logo */}
        <div className="flex items-center gap-2">
          <PiBagSimpleFill className="text-2xl text-white" />

          {/* Title only on md+ screens */}
          <span className=" md:block text-lg font-semibold">Job Portal</span>
        </div>

        {/* CENTER : Navigation (Desktop) */}
        <nav className="hidden md:flex gap-10">
          <Link to="/" className="text-gray-400 hover:text-white transition">
            Home
          </Link>
          <Link
            to="/jobs"
            className="text-gray-400 hover:text-white transition"
          >
            Jobs
          </Link>
          <Link
            to="/about"
            className="text-gray-400 hover:text-white transition"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-gray-400 hover:text-white transition"
          >
            Contact Us
          </Link>
        </nav>

        {/* RIGHT : Buttons (Desktop) */}
        <div className="hidden md:flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl hover:bg-white hover:text-black transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-[#309689] text-white rounded-md hover:bg-[#257a6f] transition"
          >
            Register
          </Link>
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
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-white transition"
            >
              Home
            </Link>
            <Link
              to="/jobs"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-white transition"
            >
              Jobs
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-white transition"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-white transition"
            >
              Contact Us
            </Link>

            <div className="flex gap-4 pt-4">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-white hover:text-black transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 bg-[#309689] rounded-lg hover:bg-[#257a6f] transition"
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
