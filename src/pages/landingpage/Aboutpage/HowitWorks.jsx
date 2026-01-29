import React from "react";
import { FaUser, FaUpload, FaBriefcase, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className="bg-white py-20 -mt-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-black mb-3">
          How it works
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-14 text-sm">
          At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit
          a massa elementum id scelerisque rhoncus...
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card */}
          <div
            className="group bg-white rounded-2xl p-8 border 
                  transition-all duration-300 ease-out
                  hover:-translate-y-3 hover:shadow-xl hover:border-teal-500"
          >
            {/* Icon */}
            <div
              className="flex justify-center mb-4 text-teal-500 text-3xl
                    transition-transform duration-300
                    group-hover:scale-125 group-hover:rotate-6"
            >
              <FaUser />
            </div>

            {/* Title */}
            <h4
              className="font-semibold text-black mb-2
                   transition-all duration-300
                   group-hover:font-bold group-hover:text-teal-600"
            >
              Create Account
            </h4>

            {/* Text */}
            <p
              className="text-gray-500 text-sm transition-colors duration-300
                  group-hover:text-gray-600"
            >
              Nunc sed a nisl purus. Nibh dis faucibus proin lacus
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="group bg-white rounded-2xl p-8 border 
                  transition-all duration-300 ease-out
                  hover:-translate-y-3 hover:shadow-xl hover:border-teal-500"
          >
            <div
              className="flex justify-center mb-4 text-teal-500 text-3xl
                    transition-transform duration-300
                    group-hover:scale-125 group-hover:-rotate-6"
            >
              <FaUpload />
            </div>

            <h4
              className="font-semibold text-black mb-2
                   transition-all duration-300
                   group-hover:font-bold group-hover:text-teal-600"
            >
              Upload Resume
            </h4>

            <p className="text-gray-500 text-sm">
              Felis eu ultrices a sed massa. Commodo fringilla sed tempor
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="group bg-white rounded-2xl p-8 border 
                  transition-all duration-300 ease-out
                  hover:-translate-y-3 hover:shadow-xl hover:border-teal-500"
          >
            <div
              className="flex justify-center mb-4 text-teal-500 text-3xl
                    transition-transform duration-300
                    group-hover:scale-125"
            >
              <FaBriefcase />
            </div>

            <h4
              className="font-semibold text-black mb-2
                   transition-all duration-300
                   group-hover:font-bold group-hover:text-teal-600"
            >
              Find Jobs
            </h4>

            <p className="text-gray-500 text-sm">
              Commodo fringilla sed tempor risus laoreet ultrices ipsum
            </p>
          </div>

          {/* Card 4 */}
          <div
            className="group bg-white rounded-2xl p-8 border 
                  transition-all duration-300 ease-out
                  hover:-translate-y-3 hover:shadow-xl hover:border-teal-500"
          >
            <div
              className="flex justify-center mb-4 text-teal-500 text-3xl
                    transition-transform duration-300
                    group-hover:scale-125 group-hover:rotate-12"
            >
              <FaCheckCircle />
            </div>

            <h4
              className="font-semibold text-black mb-2
                   transition-all duration-300
                   group-hover:font-bold group-hover:text-teal-600"
            >
              Apply Job
            </h4>

            <p className="text-gray-500 text-sm">
              Nisi enim feugiat enim volutpat. Sem quis viverra
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
