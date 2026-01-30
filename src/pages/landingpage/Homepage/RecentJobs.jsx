import React from "react";
import { FaBookmark, FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";
import { MdWork } from "react-icons/md";
import { useGetRecentJobsQuery } from "../../../services/endpoints/jobApi";
import { Link } from "react-router-dom";

function RecentJobs() {
  const { data: jobs = [], isLoading } = useGetRecentJobsQuery();

  const timeAgo = (date) => {
    const mins = Math.floor((Date.now() - new Date(date)) / 60000);
    return mins < 60 ? `${mins} min ago` : "1 hr ago";
  };

  if (isLoading) {
    return <p className="text-center py-10">Loading recent jobs...</p>;
  }

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

        <Link
          to={"/jobs"}
          className="text-[#309689] text-sm font-semibold hover:underline self-start sm:self-auto"
        >
          View All
        </Link>
      </div>

      {/* Job Cards */}
      <div className="space-y-6">
        {jobs.map((job, index) => (
          <div
            key={job._id}
            style={{ animationDelay: `${index * 100}ms` }}
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
              animate-[fadeUp_0.8s_ease-out]
            "
          >
            {/* Left Section */}
            <div className="flex-1">
              <span className="inline-block text-xs text-[#309689] bg-[#e6f4f2] px-3 py-1 rounded-full">
                {timeAgo(job.createdAt)}
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
              {/* <FaBookmark className="text-gray-400 hover:text-[#309689] cursor-pointer text-lg transition" /> */}

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
                  cursor-pointer
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
