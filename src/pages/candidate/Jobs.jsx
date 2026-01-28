import {
  BookmarkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { useGetActiveJobQuery } from "../../services/endpoints/jobApi";
import {
  useGetSavedJobsQuery,
  useToggleSaveJobMutation,
} from "../../services/endpoints/candidate/savedJobApi";
import { useState } from "react";

const Jobs = () => {
  const [jobId, setJobId] = useState(null);
  const [showSavedModel, setShowSavedModel] = useState(false);
  const { data: jobs = [], isLoading } = useGetActiveJobQuery();
  const { data: savedRes } = useGetSavedJobsQuery();
  const [toggleSaveJob] = useToggleSaveJobMutation();

  const savedJobs = savedRes?.data || [];

  const isJobSaved = (jobId) =>
    savedJobs.some((item) => item.job?._id === jobId);

  const handleSave = async (jobId) => {
    try {
      await toggleSaveJob(jobId).unwrap();
    } catch (err) {
      alert(err?.data?.message || "Failed to save job");
    }
  };

  if (isLoading) {
    return <div className="card text-center">Loading jobs...</div>;
  }

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
        {jobs.map((job) => {
          const saved = isJobSaved(job._id);

          return (
            <div key={job._id} className="card">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-lg">
                  {job.title}
                </h3>
                

                <button
                  onClick={() => {
                    setShowSavedModel(true);
                    setJobId(job._id);
                  }}
                  title="Save Job"
                >
                  <BookmarkIcon
                    className={`w-5 h-5 cursor-pointer hover:scale-102 transition-all duration-300 hover:text-indigo-600 ${
                      saved
                        ? "text-indigo-600"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              <p className="text-sm text-gray-500">
                {job?.employer?.companyName}
              </p>

              <div className="text-sm text-gray-600 space-y-1 my-3">
                <p><b>Location:</b> {job.location}</p>
                <p><b>Type:</b> {job.type}</p>
                <p><b>Salary:</b> {job.salary}</p>
              </div>

              <Link
                to={`/candidate/jobs/${job._id}`}
                className="btn-primary flex items-center gap-1 w-fit"
              >
                <PaperAirplaneIcon className="w-4 h-4" />
                Apply Now
              </Link>
            </div>
          );
        })}
      </div>
      {
        showSavedModel && (
          
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-80">
            <h2 className="text-lg font-semibold mb-2">
               Saved Job in your cart
            </h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to remove this saved job?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSavedModel(false)}
                className="px-4 py-2 border rounded cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => handleSave(jobId)
}               
                disabled={isLoading}
                className="btn-secondary "
              >
                { isLoading? "Saving..." : "Save in Cart"}
              </button>
            </div>
          </div>
        </div>
        )
      }
    </div>
  );
};

export default Jobs;
