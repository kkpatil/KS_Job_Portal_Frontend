import { useState } from "react";
import {
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

/* ================= DUMMY DATA ================= */
const dummyApplications = [
  {
    id: 1,
    candidate: "Amit Verma",
    email: "amit@gmail.com",
    jobTitle: "Frontend Developer",
    appliedOn: "15 Feb 2026",
    status: "New",
  },
  {
    id: 2,
    candidate: "Neha Sharma",
    email: "neha@gmail.com",
    jobTitle: "Backend Developer",
    appliedOn: "14 Feb 2026",
    status: "Shortlisted",
  },
  {
    id: 3,
    candidate: "Rahul Singh",
    email: "rahul@gmail.com",
    jobTitle: "UI/UX Designer",
    appliedOn: "13 Feb 2026",
    status: "Rejected",
  },
];

const statusColor = {
  New: "bg-blue-100 text-blue-700",
  Shortlisted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const ApplicationsEmployer = () => {
  const [applications, setApplications] = useState(dummyApplications);
  const [search, setSearch] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  /* ================= FILTER ================= */
  const filteredApplications = applications.filter((app) => {
    const matchJob =
      search === "All" || app.jobTitle === search;

    const matchStatus =
      statusFilter === "All" || app.status === statusFilter;

    return matchJob && matchStatus;
  });

  /* ================= STATUS UPDATE ================= */
  const updateStatus = (id, status) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status } : app
      )
    );
  };

  const jobTitles = ["All", ...new Set(applications.map(a => a.jobTitle))];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold">Applications</h1>
        <p className="text-gray-500">
          Review and manage candidates who applied to your jobs
        </p>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="card flex flex-col sm:flex-row gap-4">
        <select
          className="border px-4 py-2 rounded-lg text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        >
          {jobTitles.map((job, index) => (
            <option key={index} value={job}>
              {job}
            </option>
          ))}
        </select>

        <select
          className="border px-4 py-2 rounded-lg text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="New">New</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* ================= APPLICATIONS LIST ================= */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b text-left">
                <th className="px-4 py-3">Candidate</th>
                <th className="px-4 py-3">Job</th>
                <th className="px-4 py-3">Applied On</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">{app.candidate}</div>
                    <div className="text-xs text-gray-500">
                      {app.email}
                    </div>
                  </td>

                  <td className="px-4 py-3">{app.jobTitle}</td>

                  <td className="px-4 py-3">{app.appliedOn}</td>

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
                          onClick={() =>
                            updateStatus(app.id, "Shortlisted")
                          }
                          title="Shortlist"
                        >
                          <CheckCircleIcon className="w-5 h-5 text-green-600" />
                        </button>
                      )}

                      {app.status !== "Rejected" && (
                        <button
                          onClick={() =>
                            updateStatus(app.id, "Rejected")
                          }
                          title="Reject"
                        >
                          <XCircleIcon className="w-5 h-5 text-red-600" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredApplications.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500"
                  >
                    No applications found
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

export default ApplicationsEmployer;
