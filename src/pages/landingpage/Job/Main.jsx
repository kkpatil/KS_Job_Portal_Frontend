import { FaMapMarkerAlt, FaBookmark } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";
import { MdWork } from "react-icons/md";

const jobs = [
  {
    time: "10 min ago",
    title: "Forward Security Director",
    company: "Bauch, Schuppe and Schultz Co",
    category: "Hotels & Tourism",
    type: "Full Time",
    salary: "$40000-$42000",
    location: "New-York, USA",
  },
  {
    time: "12 min ago",
    title: "Regional Creative Facilitator",
    company: "Wisozk - Becker Co",
    category: "Media",
    type: "Part time",
    salary: "$28000-$32000",
    location: "Los-Angeles, USA",
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
    time: "10 min ago",
    title: "Forward Security Director",
    company: "Bauch, Schuppe and Schultz Co",
    category: "Hotels & Tourism",
    type: "Full Time",
    salary: "$40000-$42000",
    location: "New-York, USA",
  },
  {
    time: "10 min ago",
    title: "Forward Security Director",
    company: "Bauch, Schuppe and Schultz Co",
    category: "Hotels & Tourism",
    type: "Full Time",
    salary: "$40000-$42000",
    location: "New-York, USA",
  },
  {
    time: "12 min ago",
    title: "Regional Creative Facilitator",
    company: "Wisozk - Becker Co",
    category: "Media",
    type: "Part time",
    salary: "$28000-$32000",
    location: "Los-Angeles, USA",
  },
];

<div>
  <h4 className="font-semibold mb-3">Experience Level</h4>
  {["No-experience", "Fresher", "Intermidiate", "Expert"].map((item, i) => (
    <label key={i} className="flex items-center gap-2 text-sm mb-2">
      <input type="checkbox" />
      {item}
    </label>
  ))}
</div>;

const JobBoardMain = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8 ">
      {/* LEFT FILTER SECTION */}
      <div className="bg-[#EBF5F4] rounded-xl shadow p-5 space-y-6 lg:sticky lg:top-24 h-fit ">
        <div>
          <h4 className="font-semibold mb-2">Search by Job Title</h4>
          <input
            type="text"
            placeholder="Job title or company"
            className="w-full border rounded-md px-3 py-2 text-sm transition-colors duration-300 hover:border-black focus:border-black focus:outline-none"
          />
        </div>

        <div>
          <h4 className="font-semibold mb-2">Location</h4>
          <select className="w-full border rounded-md px-3 py-2 text-sm transition-colors duration-300 hover:border-black focus:border-black focus:outline-none">
            <option>Choose city</option>
          </select>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Category</h4>
          {[
            "Commerce",
            "Telecommunications",
            "Hotels & Tourism",
            "Education",
            "Financial Services",
          ].map((item, i) => (
            <label key={i} className="flex items-center gap-2 text-sm mb-2">
              <input type="checkbox" />
              {item}
            </label>
          ))}
        </div>

        <div>
          <h4 className="font-semibold mb-3">Job Type</h4>
          {[
            "Full Time",
            "Part Time",
            "Freelance",
            "Seasonal",
            "Fixed-Price",
          ].map((item, i) => (
            <label key={i} className="flex items-center gap-2 text-sm mb-2">
              <input type="checkbox" />
              {item}
            </label>
          ))}
        </div>
        <div>
          <h4 className="font-semibold mb-3">Experience Level</h4>
          {["No-experience", "Fresher", "Intermidiate", "Expert"].map(
            (item, i) => (
              <label key={i} className="flex items-center gap-2 text-sm mb-2">
                <input type="checkbox" />
                {item}
              </label>
            ),
          )}
        </div>
        <div>
          <h4 className="font-semibold mb-3">Date Posted</h4>
          {[
            "All",
            "Last Hour",
            "Last 24 Hours",
            "Last 7 Days",
            "Last 30 Days",
          ].map((item, i) => (
            <label key={i} className="flex items-center gap-2 text-sm mb-2">
              <input type="checkbox" />
              {item}
            </label>
          ))}
        </div>

        <button className="w-full bg-teal-600 text-white py-2 rounded-md text-sm">
          Apply Filter
        </button>
        <div
          className="bg-gradient-to-b from-gray-300 to-gray-500 text-black 
                rounded-xl p-6 text-center w-full sm:w-auto"
        >
          <h4 className="font-bold text-2xl">WE ARE HIRING</h4>
          <p className="text-sm mt-1">Apply Today!</p>
        </div>
      </div>

      {/* RIGHT JOB LIST SECTION */}
      <div className="lg:col-span-3 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500 mb-6 sm:mb-10 gap-2 sm:gap-0">
          <p>Showing 5 of 10 results</p>
          <select className="border rounded-md px-3 py-1">
            <option>Sort by latest</option>
          </select>
        </div>

        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row justify-between gap-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-teal-600 cursor-pointer mb-6"
          >
            {/* IMAGE / ICON */}
            {/* <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-xl flex-shrink-0">
              J
            </div> */}

            {/* JOB DETAILS */}
            <div className="flex-1 flex flex-col justify-between gap-2 mt-3 md:mt-0">
              <div>
                <span className="text-xs text-teal-600 flex items-center gap-1">
                  <HiOutlineClock /> {job.time}
                </span>
                <h3 className="font-semibold text-lg md:text-xl text-black mt-1 hover:text-teal-600 transition-colors duration-300">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-700 mt-1">{job.company}</p>

                <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-3">
                  <span className="flex items-center gap-1">
                    <MdWork /> {job.category}
                  </span>
                  <span>{job.type}</span>
                  <span className="font-semibold">{job.salary}</span>
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt /> {job.location}
                  </span>
                </div>
              </div>

              <div className="flex justify-between md:justify-end items-center mt-3 gap-3">
                <FaBookmark className="text-gray-400 cursor-pointer hover:text-teal-600 transition-colors duration-300" />
                <button className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-700 transition-colors duration-300">
                  Job Details
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center gap-2 pt-4">
          <button className="px-3 py-1 bg-teal-600 text-white rounded">
            1
          </button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default JobBoardMain;
