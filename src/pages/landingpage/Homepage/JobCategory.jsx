import React from "react";
import { useGetAllCategoriesQuery } from "../../../services/endpoints/categoryApi";
import { iconMap } from "../../../utils/iconMap";

function JobCategory() {
  const { data: categories = [] } = useGetAllCategoriesQuery();

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
          {categories.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <div
                key={item._id}
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
                  {Icon && <Icon />}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-4">
                  {item.name}
                </h3>

                {/* Jobs Count (optional / future) */}
                {item.jobsCount && (
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
                    {item.jobsCount} jobs
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default JobCategory;
