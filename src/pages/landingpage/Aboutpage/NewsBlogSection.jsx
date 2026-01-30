import React from "react";
import { FiArrowRight } from "react-icons/fi";

const NewsBlogSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 -mt-20">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2
          className="text-3xl md:text-4xl font-semibold text-black mb-3
                     transition-all duration-300 hover:font-bold"
        >
          News and Blog
        </h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed
          tristique in dolor.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Card */}
        {[
          {
            img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
            tag: "News",
            title:
              "Revitalizing Workplace Morale: Innovative Tactics For Boosting Employee Engagement In 2024",
          },
          {
            img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
            tag: "Blog",
            title:
              "How To Avoid The Top Six Most Common Job Interview Mistakes",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="group cursor-pointer transition-all duration-300
                       hover:-translate-y-1"
          >
            {/* Image */}
            <div
              className="relative rounded-2xl overflow-hidden mb-4 shadow-sm
                            transition-all duration-300 group-hover:shadow-xl"
            >
              <img
                src={item.img}
                alt="news"
                className="w-full h-[260px] object-cover blur-md scale-110
                           transition-all duration-700
                           group-hover:blur-sm group-hover:scale-100"
              />

              {/* Badge */}
              <span
                className="absolute top-4 left-4 bg-teal-500 text-white
                           text-xs px-4 py-1 rounded-full
                           transition-all duration-300
                           group-hover:scale-105"
              >
                {item.tag}
              </span>
            </div>

            <p className="text-gray-500 text-xs mb-2">30 March 2024</p>

            <h3
              className="font-semibold text-black text-lg mb-3 leading-snug
                         transition-all duration-300
                         group-hover:font-bold group-hover:text-teal-600"
            >
              {item.title}
            </h3>

            <span
              className="text-teal-500 text-sm flex items-center gap-1
                         transition-all duration-300
                         group-hover:font-semibold"
            >
              Read more
              <FiArrowRight className="transition-all duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsBlogSection;
