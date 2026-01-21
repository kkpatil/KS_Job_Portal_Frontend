import { useState } from "react";
import {
  BookmarkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova Pvt Ltd",
    location: "Remote",
    type: "Full Time",
    salary: "₹6 – ₹10 LPA",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "CloudPeak",
    location: "Bangalore",
    type: "Part Time",
    salary: "₹8 – ₹12 LPA",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Bright Solutions",
    location: "Delhi",
    type: "Contract",
    salary: "₹5 – ₹8 LPA",
  },
];

const Jobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  const toggleSave = (job) => {
    if (savedJobs.find((j) => j.id === job.id)) {
      setSavedJobs((prev) =>
        prev.filter((j) => j.id !== job.id)
      );
    } else {
      setSavedJobs((prev) => [...prev, job]);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Browse Jobs</h1>
        <p className="text-gray-500">
          Find jobs that match your skills
        </p>
      </div>

      {/* JOB LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyJobs.map((job) => {
          const isSaved = savedJobs.some(
            (j) => j.id === job.id
          );

          return (
            
            <div key={job.id} className="card">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-lg">
                  {job.title}
                </h3>

                <button
                  onClick={() => toggleSave(job)}
                  title="Save Job"
                >
                  <BookmarkIcon
                    className={`w-5 h-5 ${
                      isSaved
                        ? "text-indigo-600"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              <p className="text-sm text-gray-500">
                {job.company}
              </p>

              <div className="text-sm text-gray-600 space-y-1 my-3">
                <p><b>Location:</b> {job.location}</p>
                <p><b>Type:</b> {job.type}</p>
                <p><b>Salary:</b> {job.salary}</p>
              </div>

              <Link to={`/candidate/jobs/${job.id}`} className="btn-primary flex items-center gap-1 w-fit">
                <PaperAirplaneIcon className="w-4 h-4" />
                Apply Now
              </Link>
            </div>
          
          );
        })}
      </div>
    </div>
  );
};

export default Jobs;
