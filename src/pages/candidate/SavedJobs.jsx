import { BookmarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

const dummySavedJobs = [
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
];

const SavedJobs = () => {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Saved Jobs</h1>
        <p className="text-gray-500">
          Jobs you saved to apply later
        </p>
      </div>

      {/* SAVED JOBS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummySavedJobs.map((job) => (
          <div key={job.id} className="card">
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold text-lg">
                {job.title}
              </h3>

              <BookmarkIcon className="w-5 h-5 text-indigo-600" />
            </div>

            <p className="text-sm text-gray-500">
              {job.company}
            </p>

            <div className="text-sm text-gray-600 space-y-1 my-3">
              <p><b>Location:</b> {job.location}</p>
              <p><b>Type:</b> {job.type}</p>
              <p><b>Salary:</b> {job.salary}</p>
            </div>

            <button className="btn-primary flex items-center gap-1">
              <PaperAirplaneIcon className="w-4 h-4" />
              Apply Now
            </button>
          </div>
        ))}

        {dummySavedJobs.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">
            No saved jobs
          </p>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
