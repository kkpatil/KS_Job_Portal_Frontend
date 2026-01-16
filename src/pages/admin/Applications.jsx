import { useState } from "react";
import {
  EyeIcon,
  TrashIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

const dummyApplications = [
  {
    id: 1,
    candidate: "Amit Verma",
    email: "amit@gmail.com",
    job: "Frontend Developer",
    company: "TechNova Pvt Ltd",
    status: "New",
    appliedOn: "12 Feb 2025",
  },
  {
    id: 2,
    candidate: "Neha Sharma",
    email: "neha@gmail.com",
    job: "Backend Developer",
    company: "CloudPeak",
    status: "Shortlisted",
    appliedOn: "14 Feb 2025",
  },
  {
    id: 3,
    candidate: "Rahul Singh",
    email: "rahul@gmail.com",
    job: "UI/UX Designer",
    company: "Bright Solutions",
    status: "Rejected",
    appliedOn: "16 Feb 2025",
  },
];

const statusColor = {
  New: "bg-blue-100 text-blue-700",
  Shortlisted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Hired: "bg-purple-100 text-purple-700",
};

const Applications = () => {
  const [applications, setApplications] = useState(dummyApplications);

  const updateStatus = (id, status) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status } : app
      )
    );
  };

  return (
    <div className="card">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Job Applications</h2>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto tabl">
        <table className="w-full text-sm ">
          <thead>
            <tr className=" border-b text-left ">
              <th className="px-4 py-3">Candidate</th>
              <th className="px-4 py-3">Job</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3">Applied On</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="">
            {applications.map((app) => (
              <tr
                key={app.id}
                className=" border-b hover:bg-[#9bbd5f]  transition-all duration-300 hover:scale-102 hover:border-none  "
              >
                <td className="px-4 py-3">
                  <div className="font-medium">{app.candidate}</div>
                  <div className="text-xs text-gray-500">
                    {app.email}
                  </div>
                </td>

                <td className="px-4 py-3">{app.job}</td>
                <td className="px-4 py-3">{app.company}</td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[app.status]}`}
                  >
                    {app.status}
                  </span>
                </td>

                <td className="px-4 py-3">{app.appliedOn}</td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    <button title="View">
                      <EyeIcon className="w-6 h-6 text-blue-600" />
                    </button>

                    <button title="Download Resume">
                      <ArrowDownTrayIcon className="w-6 h-6 text-green-600" />
                    </button>

                    <button title="Delete">
                      <TrashIcon className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {applications.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500"
                >
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* STATUS ACTIONS */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => updateStatus(1, "Shortlisted")}
          className="btn-secondary"
        >
          Shortlist
        </button>

        <button
          onClick={() => updateStatus(1, "Rejected")}
          className="btn-danger"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default Applications;
