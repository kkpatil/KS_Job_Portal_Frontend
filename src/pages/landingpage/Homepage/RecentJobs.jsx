import React from "react";
import { FaBookmark, FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";
import { MdWork } from "react-icons/md";

const jobs = [
  {
    time: "10 min ago",
    title: "Forward Security Director",
    company: "Bauch, Schuppe and Schultz Co",
    category: "Hotels & Tourism",
    type: "Full time",
    salary: "$40000-$42000",
    location: "New York, USA",
  },
  {
    time: "12 min ago",
    title: "Regional Creative Facilitator",
    company: "Wisozk - Becker Co",
    category: "Media",
    type: "Part time",
    salary: "$28000-$32000",
    location: "Los Angeles, USA",
  },
  {
    time: "15 min ago",
    title: "Internal Integration Planner",
    company: "Mraz, Quigley and Feest Inc.",
    category: "Construction",
    type: "Full time",
    salary: "$48000-$50000",
    location: "Texas, USA",
  },
  {
    time: "24 min ago",
    title: "District Intranet Director",
    company: "VonRueden - Weber Co",
    category: "Commerce",
    type: "Full time",
    salary: "$42000-$48000",
    location: "Florida, USA",
  },
  {
    time: "26 min ago",
    title: "Corporate Tactics Facilitator",
    company: "Cormier, Turner and Flatley Inc",
    category: "Commerce",
    type: "Full time",
    salary: "$38000-$40000",
    location: "Boston, USA",
  },
];

function RecentJobs() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Recent Jobs Available
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Find the latest job opportunities that match your skills
          </p>
        </div>

        <a
          href="#"
          className="text-[#309689] text-sm font-semibold hover:underline self-start sm:self-auto"
        >
          View All
        </a>
      </div>

      {/* Job Cards */}
      <div className="space-y-6">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="
  bg-white
  rounded-xl
  shadow-md
  hover:shadow-2xl
  transition-all
  duration-300
  ease-in-out
  p-5 sm:p-6
  flex
  flex-col
  md:flex-row
  md:items-center
  md:justify-between
  gap-6
  hover:scale-[1.02]
  hover:border
  hover:border-[#309689]
"
          >
            {/* Left Section */}
            <div className="flex-1">
              <span className="inline-block text-xs text-[#309689] bg-[#e6f4f2] px-3 py-1 rounded-full">
                {job.time}
              </span>

              <h3 className="text-lg sm:text-xl font-semibold mt-3">
                {job.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4">{job.company}</p>

              {/* Job Info */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <MdWork className="text-[#309689]" />
                  {job.category}
                </span>

                <span className="flex items-center gap-2">
                  <HiOutlineClock className="text-[#309689]" />
                  {job.type}
                </span>

                <span className="flex items-center gap-2">💰 {job.salary}</span>

                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#309689]" />
                  {job.location}
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
              <FaBookmark className="text-gray-400 hover:text-[#309689] cursor-pointer text-lg" />

              <button
                className="
  bg-[#309689]
  text-white
  px-5 py-2
  rounded
  text-sm
  transition-all
  duration-300
  hover:bg-[#257a6f]
  hover:scale-105
  hover:shadow-lg
"
              >
                Job Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentJobs;
