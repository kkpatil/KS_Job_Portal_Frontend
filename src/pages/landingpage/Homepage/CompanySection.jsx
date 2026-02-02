import React from "react";
import { Link } from "react-router-dom";

function CompanySection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div
          className="
  grid grid-cols-1 md:grid-cols-2
  gap-14 items-center
  text-center md:text-left
"
        >
          {/* Image */}
          <div
            className="
    relative
    rounded-3xl
    overflow-hidden
    animate-[fadeUp_0.9s_ease-out]
    mx-auto md:mx-0
  "
          >
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="Company"
              className="
                w-full
                h-full
                object-cover
                scale-105
                blur-[2px]
              "
            />
          </div>

          {/* Content */}
          <div
            className="
  animate-[fadeDown_0.9s_ease-out]
  flex flex-col
  items-center md:items-start
"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
              Good Life Begins With <br />A Good Company
            </h2>

            <p className="text-gray-500 leading-relaxed mb-8 max-w-xl">
              Ultricies purus dolor viverra mi laoreet at cursus justo.
              Ultricies purus diam egestas amet faucibus tempor blandit. Elit
              velit mauris aliquam est diam. Leo sagittis consectetur commodo
              erat aenean. Vulputate praesent congue faucibus in euismod feugiat
              euismod volutpat.
            </p>

            {/* Buttons */}
            <div
              className="
  flex items-center gap-6
  justify-center md:justify-start
"
            >
              <Link to={"/jobs"}
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
                "
              >
                Search Job
              </Link>

              <button
                className="
                  text-[#309689]
                  font-medium
                  transition
                  hover:underline
                "
              >
                Learn more
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div
          className="
  grid grid-cols-1 sm:grid-cols-3
  gap-10 mt-24
  text-center sm:text-left
  place-items-center sm:place-items-start
"
        >
          {/* Stat Card */}
          {[
            { count: "12k+", title: "Clients worldwide" },
            { count: "20k+", title: "Active resume" },
            { count: "18k+", title: "Companies" },
          ].map((item, index) => (
            <div
              key={index}
              className="
                animate-[fadeUp_1s_ease-out]
              "
            >
              <h3 className="text-3xl font-bold text-[#309689] mb-2">
                {item.count}
              </h3>
              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
                At eu lobortis pretium tincidunt amet lacus ut aenean aliquet.
                Blandit a massa elementum id scelerisque.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CompanySection;
