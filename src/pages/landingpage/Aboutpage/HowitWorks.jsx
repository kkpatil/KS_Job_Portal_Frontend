import React from "react";
import * as Icons from "react-icons/fa";
import DOMPurify from "dompurify";

const HowItWorks = ({ cms }) => {
  const section = cms?.["about.howitworks"];

  if (!section) return null;

  const { heading, description, steps = [] } = section;

  return (
    <section className="bg-white py-20 -mt-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* HEADING */}
        <div className="mb-14">
          <h2
            className="text-3xl md:text-4xl font-semibold text-black mb-3"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(heading),
            }}
          />

          <p
            className="text-gray-500 max-w-xl mx-auto text-sm"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          />
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = Icons[step.icon] || Icons.FaUser;

            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 border 
                  transition-all duration-300 ease-out
                  hover:-translate-y-3 hover:shadow-xl hover:border-teal-500"
              >
                {/* ICON */}
                <div
                  className="flex justify-center mb-4 text-teal-500 text-3xl
                    transition-transform duration-300
                    group-hover:scale-125"
                >
                  <Icon />
                </div>

                {/* TITLE */}
                <h4
                  className="font-semibold text-black mb-2
                    transition-all duration-300
                    group-hover:font-bold group-hover:text-teal-600"
                >
                  {step.title}
                </h4>

                {/* TEXT */}
                <p
                  className="text-gray-500 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(step.text),
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
