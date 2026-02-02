import React from "react";
import DOMPurify from "dompurify";

const InfoSection = ({cms}) => {
   const section = cms?.["about.infosection"];

  if (!section) return null;

const heading = section.heading || section; // fallback
const description = section.description || section; // fallback
const image = section.image || section; // fallback
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Top Content */}
      <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
        <h2
          className="text-3xl md:text-4xl font-semibold text-black leading-snug"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(heading),
          }}
        />

        <p className="text-gray-600 text-sm leading-relaxed"  dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}/>
        
      </div>

      {/* Blurred Image Box */}
      <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden">
        <img
        src={image}
          alt="dummy"
          className="w-full h-full object-cover blur-lg scale-110 opacity-80"
        />
      </div>
    </section>
  );
};

export default InfoSection;
