import React from "react";
import { PiBagSimpleFill } from "react-icons/pi";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-gray-300">
      {/* TOP FOOTER */}
      <div
        className="
  max-w-7xl mx-auto px-6 py-16
  grid gap-10
  md:grid-cols-4
  text-center md:text-left
  place-items-center md:place-items-start
"
      >
        {/* Column 1 */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-3 justify-center md:justify-start">
            <PiBagSimpleFill className="text-xl" />
            Job Portal
          </h4>
          <p className="text-sm leading-relaxed">
            Job Portal is a modern hiring platform that
            <br /> connects talented candidates with trusted
            <br /> employers and opportunities worldwide.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Our Team</li>
            <li className="hover:text-white cursor-pointer">Partners</li>
            <li className="hover:text-white cursor-pointer">For Candidates</li>
            <li className="hover:text-white cursor-pointer">For Employers</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">
            Job Categories
          </h4>
          <ul className="space-y-2 text-sm text-center md:text-left">
            <li className="hover:text-white cursor-pointer">
              Telecommunication
            </li>
            <li className="hover:text-white cursor-pointer">
              Hotels & Tourism
            </li>
            <li className="hover:text-white cursor-pointer">Construction</li>
            <li className="hover:text-white cursor-pointer">Education</li>
            <li className="hover:text-white cursor-pointer">
              Financial Services
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Newsletter</h4>
          <p className="text-sm mb-4">
            Subscribe to get latest job updates and career tips directly in your
            inbox.
          </p>

          <div className=" gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="
    w-full
    px-4 py-2
    rounded-[7px]
    bg-black
    text-white
    placeholder-gray-400
    border border-transparent
    border-white
    outline-none
    hover:ring-2 border-white
    focus: border-white
    focus:ring-2 focus:ring-white
    mb-3
  "
            />
            <button
              className="bg-[#309689] w-full text-white px-4 py-2 rounded-[7px]  hover:bg-[#309689]     hover:ring-2 border-white
 transition"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="border-t border-gray-700">
        <div
          className="
  max-w-7xl mx-auto px-6 py-4
  flex flex-col md:flex-row
  justify-between items-center
  text-sm gap-3
  text-center md:text-left
"
        >
          {/* Left */}
          <p className="text-gray-500">
            © Copyright Job Portal 2026. Designed by{" "}
            <span className="font-semibold">Krishaa IT Soft Solutions</span>
          </p>

          {/* Right */}
          <div className="flex gap-6">
            <Link to={'/privacy&policy'} className="underline hover:text-white">
              Privacy Policy
            </Link>
            <a href="#" className="underline hover:text-white">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
