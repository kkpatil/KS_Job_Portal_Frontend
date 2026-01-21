import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeftIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

/* ================= DUMMY APPLICATIONS ================= */
const dummyApplications = [
  {
    id: 1,
    jobId: 1,
    candidate: "Amit Verma",
    email: "amit@gmail.com",
    experience: "2 Years",
    appliedOn: "15 Feb 2026",
    status: "New",
  },
  {
    id: 2,
    jobId: 1,
    candidate: "Neha Sharma",
    email: "neha@gmail.com",
    experience: "3 Years",
    appliedOn: "14 Feb 2026",
    status: "Shortlisted",
  },
  {
    id: 3,
    jobId: 2,
    candidate: "Rahul Singh",
    email: "rahul@gmail.com",
    experience: "4 Years",
    appliedOn: "13 Feb 2026",
    status: "Rejected",
  },
];

const statusColor = {
  New: "bg-blue-100 text-blue-700",
  Shortlisted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const JobApplicationsEmployer = () => {
  const { id } = useParams(); // jobId
  const [applications, setApplications] = useState(dummyApplications);

  const jobApplications = applications.filter(
    (app) => app.jobId === Number(id)
  );

  const updateStatus = (appId, status) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, status } : app
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* BACK */}
      <Link
        to={-1}
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to My Jobs
      </Link>

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Job Applications
        </h1>
        <p className="text-gray-500">
          Candidates who applied for this job
        </p>
      </div>

      {/* TABLE */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b text-left">
                <th className="px-4 py-3">Candidate</th>
                <th className="px-4 py-3">Experience</th>
                <th className="px-4 py-3">Applied On</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobApplications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {app.candidate}
                    </div>
                    <div className="text-xs text-gray-500">
                      {app.email}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {app.experience}
                  </td>

                  <td className="px-4 py-3">
                    {app.appliedOn}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${statusColor[app.status]}`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/employer/candidates/${app.id}`}
                        title="View Profile"
                      >
                        <EyeIcon className="w-5 h-5 text-blue-600" />
                      </Link>

                      {app.status !== "Shortlisted" && (
                        <button
                          title="Shortlist"
                          onClick={() =>
                            updateStatus(app.id, "Shortlisted")
                          }
                        >
                          <CheckCircleIcon className="w-5 h-5 text-green-600" />
                        </button>
                      )}

                      {app.status !== "Rejected" && (
                        <button
                          title="Reject"
                          onClick={() =>
                            updateStatus(app.id, "Rejected")
                          }
                        >
                          <XCircleIcon className="w-5 h-5 text-red-600" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {jobApplications.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500"
                  >
                    No applications for this job
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationsEmployer;
