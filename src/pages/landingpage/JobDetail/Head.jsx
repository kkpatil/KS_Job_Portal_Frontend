import React from "react";
import {
  FaBriefcase,
  FaClock,
  FaMapMarkerAlt,
  FaBookmark,
} from "react-icons/fa";

export default function Head() {
  return (
    <div
      className="w-full mt-10 max-w-6xl mx-auto bg-white rounded-2xl
      px-6 py-8 md:px-8 md:py-10 
      flex flex-col md:flex-row md:items-center md:justify-between gap-6"
    >
      {/* Left Section */}
      <div className="flex items-start gap-4 md:gap-6">
        {/* Company Logo */}
        <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-full bg-white shadow border">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png"
            alt="Company Logo"
            className="w-12 h-12"
          />
          {/* Logo */}
        </div>

        {/* Job Info */}
        <div>
          <span className="text-xs text-gray-500 block mb-1">10 min ago</span>

          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
            Corporate Solutions Executive
          </h2>

          <p className="text-sm text-gray-500 mt-1 mb-4">Leffler and Sons</p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaBriefcase className="text-[#309689]" />
              <span>Commerce</span>
            </div>

            <div className="flex items-center gap-2">
              <FaClock className="text-[#309689]" />
              <span>Full time</span>
            </div>

            <div className="flex items-center gap-2 font-medium text-[#309689]">
              $40,000 – $42,000
            </div>

            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#309689]" />
              <span>New York, USA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div>
        <button
          className="bg-[#309689] text-white px-7 py-2.5 rounded font-medium w-60
          hover:opacity-90 transition whitespace-nowrap"
        >
          Apply Job
        </button>
      </div>
    </div>
  );
}
