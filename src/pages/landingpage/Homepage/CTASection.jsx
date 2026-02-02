import React from "react";
import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="
            relative
            bg-black
            rounded-3xl
            overflow-hidden
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            px-8
            md:px-14
            py-16
            animate-[fadeUp_0.9s_ease-out]
          "
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
              alt="Team"
              className="
                w-full
                h-full
                object-cover
                blur-[4px]
                opacity-40
              "
            />
          </div>

          {/* Left Content */}
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Create A Better <br />
              Future For Yourself
            </h2>

            <p className="text-gray-300 mb-8">
              At eu lobortis pretium tincidunt amet lacus ut aenean aliquet.
              Blandit a massa elementum id scelerisque rhoncus.
            </p>

            <Link 
              to="/jobs"
              className="
                bg-[#309689]
                text-white
                px-6
                py-3
                rounded-lg
                font-medium
                transition-all
                duration-300
                hover:bg-[#257a6f]
                hover:scale-105
                hover:shadow-lg
                active:scale-95
              "
            >
              Search Job
            </Link>
          </div>

          {/* Right Side Spacer (for balance like design) */}
          <div className="hidden md:block w-1/3"></div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
