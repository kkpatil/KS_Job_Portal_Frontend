import React from "react";
import { FaInstagramSquare } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import { SiMcdonalds } from "react-icons/si";
import { FaApple } from "react-icons/fa";

function TopCompany() {
  return (
    <div className="bg-[#EBF5F4]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-black">Top Companies</h2>
          <p className="text-gray-600 mt-2">
            Work with the best companies in the industry
          </p>
        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
          {/* Instagram */}
          <div
            className="bg-white rounded-xl p-5 flex flex-col items-center text-center
  border border-transparent
  transition-all duration-300 ease-in-out
  hover:-translate-y-2 hover:scale-105
  hover:shadow-2xl hover:border-teal-500
  cursor-pointer group"
          >
            <FaInstagramSquare
              className="w-16 h-16 mb-3 text-black
    transition-transform duration-300
    group-hover:scale-110 group-hover:rotate-6"
            />

            <h3 className="font-semibold text-lg mb-1 transition-colors duration-300 group-hover:text-teal-600">
              Instagram
            </h3>

            <p className="text-sm text-gray-600 mb-2">
              Connect with people through photos and videos.
            </p>

            <span className="text-teal-600 font-bold">Open Positions: 12</span>
          </div>

          <div
            className="bg-white rounded-xl p-5 flex flex-col items-center text-center
  border border-transparent transition-all duration-300
  hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:border-teal-500
  cursor-pointer group"
          >
            <SiTesla
              className="w-16 h-16 mb-3 text-black
    transition-transform duration-300
    group-hover:scale-110 group-hover:-rotate-6"
            />

            <h3 className="font-semibold text-lg mb-1 group-hover:text-teal-600 transition-colors">
              Tesla
            </h3>

            <p className="text-sm text-gray-600 mb-2">
              Accelerating the world’s transition to sustainable energy.
            </p>

            <span className="text-teal-600 font-bold">Open Positions: 8</span>
          </div>

          <div
            className="bg-white rounded-xl p-5 flex flex-col items-center text-center
  border border-transparent transition-all duration-300
  hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:border-teal-500
  cursor-pointer group"
          >
            <SiMcdonalds
              className="w-16 h-16 mb-3 text-black
    transition-transform duration-300
    group-hover:scale-110"
            />

            <h3 className="font-semibold text-lg mb-1 group-hover:text-teal-600 transition-colors">
              McDonald's
            </h3>

            <p className="text-sm text-gray-600 mb-2">
              Global leader in fast food and customer service.
            </p>

            <span className="text-teal-600 font-bold">Open Positions: 25</span>
          </div>

          <div
            className="bg-white rounded-xl p-5 flex flex-col items-center text-center
  border border-transparent transition-all duration-300
  hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:border-teal-500
  cursor-pointer group"
          >
            <FaApple
              className="w-16 h-16 mb-3 text-black
    transition-transform duration-300
    group-hover:scale-110 group-hover:rotate-3"
            />

            <h3 className="font-semibold text-lg mb-1 group-hover:text-teal-600 transition-colors">
              Apple
            </h3>

            <p className="text-sm text-gray-600 mb-2">
              Innovation in technology and design for the world.
            </p>

            <span className="text-teal-600 font-bold">Open Positions: 15</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopCompany;
