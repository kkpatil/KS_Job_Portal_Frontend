import React from "react";
import {
  FaSeedling,
  FaIndustry,
  FaShoppingBag,
  FaHardHat,
  FaHotel,
  FaGraduationCap,
  FaMoneyBillWave,
  FaBus,
} from "react-icons/fa";

const categories = [
  {
    title: "Agriculture",
    jobs: "1254 jobs",
    icon: <FaSeedling />,
  },
  {
    title: "Metal Production",
    jobs: "816 jobs",
    icon: <FaIndustry />,
  },
  {
    title: "Commerce",
    jobs: "2082 jobs",
    icon: <FaShoppingBag />,
  },
  {
    title: "Construction",
    jobs: "1520 jobs",
    icon: <FaHardHat />,
  },
  {
    title: "Hotels & Tourism",
    jobs: "1022 jobs",
    icon: <FaHotel />,
  },
  {
    title: "Education",
    jobs: "1496 jobs",
    icon: <FaGraduationCap />,
  },
  {
    title: "Financial Services",
    jobs: "1529 jobs",
    icon: <FaMoneyBillWave />,
  },
  {
    title: "Transport",
    jobs: "1244 jobs",
    icon: <FaBus />,
  },
];

function JobCategory() {
  return (
    <section className="bg-[#eef7f6] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14 animate-[fadeDown_0.8s_ease-out]">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Browse by Category
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet.
            Blandit a massa elementum id scelerisque.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((item, index) => (
            <div
              key={index}
              className="
                group
                bg-white
                rounded-2xl
                p-8
                text-center
                shadow
                transition-all
                duration-300
                hover:shadow-2xl
                hover:-translate-y-2
                animate-[fadeUp_0.9s_ease-out]
              "
            >
              {/* Icon */}
              <div
                className="
                  text-[#309689]
                  text-4xl
                  flex
                  justify-center
                  mb-6
                  transition
                  duration-300
                  group-hover:scale-110
                "
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-4">{item.title}</h3>

              {/* Jobs Count */}
              <span
                className="
                  inline-block
                  text-sm
                  text-[#309689]
                  bg-[#e6f4f2]
                  px-4
                  py-1
                  rounded-full
                  font-medium
                "
              >
                {item.jobs}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default JobCategory;
