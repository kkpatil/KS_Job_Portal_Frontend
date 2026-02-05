import React from "react";
import { FaCrown, FaFileAlt, FaStar, FaUserShield } from "react-icons/fa";
import ImageOne from "../../../assets/images/Image1.jpg";
import ImageTwo from "../../../assets/images/Image2.jpg";
import ImageThree from "../../../assets/images/image3.jpg";

const BestSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 -mt-20">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
        {/* Left Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Tall Image */}
          <div
            className="sm:row-span-2 rounded-2xl overflow-hidden
                          transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={ImageOne}
              alt="img1"
              className="w-full h-[260px] sm:h-full object-cover blur-md scale-110
                         transition-all duration-700
                         hover:blur-[0] hover:scale-100"
            />
          </div>

          {/* Top Right */}
          <div
            className="rounded-2xl overflow-hidden h-[200px] sm:h-[220px]
                          transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={ImageTwo}
              alt="img2"
              className="w-full h-full object-cover blur-md scale-110
                         transition-all duration-700
                         hover:blur-[0] hover:scale-100"
            />
          </div>

          {/* Bottom Right */}
          <div
            className="rounded-2xl overflow-hidden h-[200px] sm:h-[220px]
                          transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={ImageThree}
              alt="img3"
              className="w-full h-full object-cover blur-md scale-110
                         transition-all duration-700
                         hover:blur-[0] hover:scale-100"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-4">
            We’re Only Working <br className="hidden sm:block" /> With The Best
          </h2>

          <p className="text-gray-600 mb-8 max-w-md mx-auto lg:mx-0 text-sm">
            Ultricies purus dolor viverra mi laoreet at cursus justo. Ultricies
            purus diam egestas amet faucibus tempor blandit.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: <FaCrown />, label: "Quality Job" },
              { icon: <FaFileAlt />, label: "Resume builder" },
              { icon: <FaStar />, label: "Top Companies" },
              { icon: <FaUserShield />, label: "Top Talents" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center lg:justify-start gap-3
                           transition-all duration-300 hover:translate-x-1"
              >
                <span className="text-teal-500 text-xl transition-transform duration-300 hover:scale-110">
                  {item.icon}
                </span>

                <span className="font-medium text-black">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSection;
