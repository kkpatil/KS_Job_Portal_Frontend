import {
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {
  useGetEmployerApplicationsQuery,
  useShortlistApplicationMutation,
  useRejectApplicationMutation,
  useHireApplicationMutation,
} from "../../services/endpoints/applicationsApi";
import { useState } from "react";
import { toast } from "react-toastify";

const statusColor = {
  NEW: "bg-blue-100 text-blue-700",
  SHORTLISTED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  HIRED: "bg-emerald-100 text-emerald-700",
};

const ApplicationsEmployer = () => {
  const { data, isLoading } = useGetEmployerApplicationsQuery();
  const [handleShortlisted] = useShortlistApplicationMutation();
  const [handleRejected] = useRejectApplicationMutation();
  const [handleHired] = useHireApplicationMutation();

  const applications = data?.data || [];

  const [jobFilter, setJobFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  /* ================= FILTER ================= */
  const filteredApplications = applications.filter((app) => {
    const term = search.trim().toLowerCase();
    const matchSearch =
      !term ||
      app.candidate?.name?.toLowerCase().includes(term) ||
      app.candidate?.email?.toLowerCase().includes(term) ||
      app.job?.title?.toLowerCase().includes(term);

    const matchJob =
      jobFilter === "All" || app.job?.title === jobFilter;

    const matchStatus =
      statusFilter === "All" || app.status === statusFilter;

    return matchSearch && matchJob && matchStatus;
  });

  const jobTitles = [
    "All",
    ...new Set(applications.map((a) => a.job?.title)),
  ];

  const totalPages = Math.max(1, Math.ceil(filteredApplications.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  /* ================= STATUS UPDATE ================= */
  const handleStatusChange = async (id, status) => {
    try {
      const next = String(status).toUpperCase();
      if (next === "SHORTLISTED") {
        await handleShortlisted(id).unwrap();
        toast.success("Application shortlisted");
      } else if (next === "REJECTED") {
        await handleRejected(id).unwrap();
        toast.success("Application rejected");
      } else if (next === "HIRED") {
        await handleHired(id).unwrap();
        toast.success("Candidate hired");
      }
    } catch (err) {
      toast.error(err.data.message ||"Failed to update status");
    }
  };

  if (isLoading) return <p>Loading applications...</p>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Applications</h1>
        <p className="text-gray-500">
          All applications received on your jobs
        </p>
      </div>

      {/* FILTERS */}
      <div className="card flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search candidate or job"
          className="border px-4 py-2 rounded-lg text-sm w-full sm:w-72"
        />
        <select
          className="border px-4 py-2 rounded-lg text-sm w-full sm:w-56"
          value={jobFilter}
          onChange={(e) => setJobFilter(e.target.value)}
        >
          {jobTitles.map((job, i) => (
            <option key={i} value={job}>
              {job}
            </option>
          ))}
        </select>

        <select
          className="border px-4 py-2 rounded-lg text-sm w-full sm:w-48"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="NEW">New</option>
          <option value="SHORTLISTED">Shortlisted</option>
          <option value="REJECTED">Rejected</option>
          <option value="HIRED">Hired</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="card hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-start">Candidate</th>
              <th className="px-4 py-3 text-start">Job</th>
              <th className="px-4 py-3 text-start">Applied On</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedApplications.map((app) => (
              <tr key={app._id} className="border-b">
                <td className="px-4 py-3">
                  <div className="font-medium">
                    {app.candidate?.name}
                  </div>
                  <div className="text-xs text-gray-500 break-all">
                    {app.candidate?.email}
                  </div>
                </td>

                <td className="px-4 py-3">
                  {app.job?.title}
                </td>

                <td className="px-4 py-3">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      statusColor[app.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    <Link
                      to={`/employer/candidates/${app?._id}`}
                      className="flex items-center p-1 rounded-md border"
                    >
                      <EyeIcon className="w-5 h-5 text-blue-600" />View
                    </Link>

                    {app.status !== "SHORTLISTED" && app.status !== "HIRED" && (
                      <button
                        className="flex items-center p-1 rounded-md border "
                        onClick={() =>
                          handleStatusChange(app._id, "SHORTLISTED")
                        }
                      >
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />Sortlist
                      </button>
                    )}

                    {app.status !== "REJECTED" && app.status !== "HIRED" && (
                      <button
                        className="flex items-center p-1 rounded-md border"
                        onClick={() =>
                          handleStatusChange(app._id, "REJECTED")
                        }
                      >
                        <XCircleIcon className="w-5 h-5 text-red-600" />Reject
                      </button>
                    )}

                    {app.status === "SHORTLISTED" && (
                      <button
                        onClick={() => handleStatusChange(app._id, "HIRED")}
                        title="Hire"
                      >
                        <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {filteredApplications.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {paginatedApplications.map((app) => (
          <div
            key={app._id}
            className="card space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-semibold text-sm">{app.candidate?.name}</div>
                <div className="text-xs text-gray-500 break-all">
                  {app.candidate?.email}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  statusColor[app.status] || "bg-gray-100 text-gray-700"
                }`}
              >
                {app.status}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <div>
                <span className="text-gray-500">Job:</span> {app.job?.title}
              </div>
              <div>
                <span className="text-gray-500">Applied:</span>{" "}
                {new Date(app.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Link
                to={`/employer/candidates/${app?._id}`}
                className="flex items-center gap-1 px-3 py-2 rounded-md border text-sm"
              >
                <EyeIcon className="w-4 h-4 text-blue-600" /> View
              </Link>

              {app.status !== "SHORTLISTED" && app.status !== "HIRED" && (
                <button
                  className="flex items-center gap-1 px-3 py-2 rounded-md border text-sm"
                  onClick={() =>
                    handleStatusChange(app._id, "SHORTLISTED")
                  }
                >
                  <CheckCircleIcon className="w-4 h-4 text-green-600" /> Shortlist
                </button>
              )}

              {app.status !== "REJECTED" && app.status !== "HIRED" && (
                <button
                  className="flex items-center gap-1 px-3 py-2 rounded-md border text-sm"
                  onClick={() =>
                    handleStatusChange(app._id, "REJECTED")
                  }
                >
                  <XCircleIcon className="w-4 h-4 text-red-600" /> Reject
                </button>
              )}

              {app.status === "SHORTLISTED" && (
                <button
                  onClick={() => handleStatusChange(app._id, "HIRED")}
                  className="flex items-center gap-1 px-3 py-2 rounded-md border text-sm"
                  title="Hire"
                >
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600" /> Hire
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredApplications.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No applications found
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsEmployer;
