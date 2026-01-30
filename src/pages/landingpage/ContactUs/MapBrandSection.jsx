import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const MapBrandSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-5">
      {/* Map */}
      <div className="relative w-full h-[350px]  overflow-hidden ">
        <iframe
          title="map"
          src="https://www.google.com/maps?q=Forest%20Hills%20Stadium&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        ></iframe>

        {/* Custom Marker (optional overlay) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -mb-20">
          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <FaMapMarkerAlt className="text-white" />
          </div>
        </div>
      </div>

      {/* Brand Logos */}
      <div
        className="
    flex items-center justify-center
    gap-10 md:gap-52
    text-gray-400 mt-16 mb-5
    flex-nowrap md:flex-wrap
   
    scrollbar-hide
  "
      >
        <span className="text-2xl md:text-4xl font-medium opacity-70 italic">
          zoom
        </span>
        <span className="text-2xl md:text-4xl font-medium opacity-70 italic">
          tinder
        </span>
        <span className="text-2xl md:text-4xl font-medium opacity-70 italic">
          dribbble
        </span>
        <span className="text-2xl md:text-4xl font-medium opacity-70 italic">
          asana
        </span>
      </div>
    </section>
  );
};

export default MapBrandSection;
