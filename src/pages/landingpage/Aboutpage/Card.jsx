import React from "react";
import { FaPlay } from "react-icons/fa";

const VideoHeroSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 -mt-20">
      <div className="group relative rounded-2xl overflow-hidden">
        {/* Blurred Background Image */}
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="background"
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover blur-md scale-110
               transition-all duration-700
               group-hover:blur-sm group-hover:scale-105"
        />

        {/* Overlay Text */}
        <div
          className="bg-black/40 text-center px-4 py-6
               md:absolute md:inset-0 md:flex md:flex-col md:items-center md:justify-center"
        >
          {/* Play Button */}
          <div
            className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mb-4 md:mb-6 cursor-pointer
                 transition-all duration-300
                 hover:scale-110 hover:shadow-[0_0_25px_rgba(20,184,166,0.8)]"
          >
            <FaPlay className="text-white ml-1 text-lg" />
          </div>

          {/* Text */}
          <h2
            className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug
                 transition-all duration-300
                 md:group-hover:font-bold md:group-hover:scale-105"
          >
            Good Life Begins With <br /> A Good Company
          </h2>
        </div>

        {/* Bottom Info Strip */}
        <div className="absolute bottom-0 left-0 w-full bg-black/90">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-6">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="group/item flex gap-4 items-start
                     transition-all duration-300
                     hover:-translate-y-1"
              >
                <span
                  className="w-7 h-7 flex items-center justify-center bg-teal-500 text-white rounded-md text-sm font-semibold
                       transition-all duration-300
                       group-hover/item:rotate-12 group-hover/item:scale-110"
                >
                  {num}
                </span>

                <div>
                  <p
                    className="text-white text-sm transition-all duration-300
                         group-hover/item:font-semibold"
                  >
                    {num === 1 &&
                      "Elit gravida lorem amet porta risus vitae at"}
                    {num === 2 && "Volutpat dui lacus mattis urna platea..."}
                    {num === 3 &&
                      "Elementum faucibus netus gravida lacus lorem"}
                  </p>

                  <span
                    className="text-teal-400 text-xs cursor-pointer inline-block mt-1
                         transition-all duration-300
                         hover:underline hover:translate-x-1"
                  >
                    Learn more →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoHeroSection;
