import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeftIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import {
  useGetJobApplicationsQuery,
  useRejectApplicationMutation,
  useShortlistApplicationMutation,
  useHireApplicationMutation,
} from "../../services/endpoints/applicationsApi";
import { toast } from "react-toastify";

const statusColor = {
  NEW: "bg-yellow-100 text-yellow-700",
  APPLIED: "bg-blue-100 text-blue-700",
  SHORTLISTED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  ACCEPTED: "bg-emerald-100 text-emerald-700",
  HIRED: "bg-emerald-100 text-emerald-700",
  WITHDRAWN: "bg-gray-100 text-gray-600",
};

const JobApplicationsEmployer = () => {
  const { id: jobId } = useParams();

  const { data, isLoading } = useGetJobApplicationsQuery({jobId});
  const [handleShortlisted] = useShortlistApplicationMutation();
  const [handleRejected] = useRejectApplicationMutation();
  const [handleHired] = useHireApplicationMutation();

  const applications = data?.data || [];
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filteredApplications = applications.filter((app) => {
    const term = search.trim().toLowerCase();
    const matchSearch =
      !term ||
      app.candidate?.name?.toLowerCase().includes(term) ||
      app.candidate?.email?.toLowerCase().includes(term);

    const matchStatus =
      statusFilter === "All" || app.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredApplications.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleStatusChange = async (applicationId, status) => {
    try {
      const next = String(status).toUpperCase();
      if (next === "SHORTLISTED") {
        await handleShortlisted(applicationId);
        toast.success("Application shortlisted successfully");
      } else if (next === "REJECTED") {
        await handleRejected(applicationId);
        toast.success("Application rejected successfully");
      } else if (next === "HIRED") {
        await handleHired(applicationId);
        toast.success("Candidate hired successfully");
      }
    } catch (error) {
      toast.error("Failed to update application status");
      console.log(error);
    }
  };

  if (isLoading) {
    return <p className="text-gray-500">Loading applications...</p>;
  }

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
        <h1 className="text-2xl font-bold">Job Applications</h1>
        <p className="text-gray-500">
          Total Applications: {data?.total || 0}
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
          placeholder="Search candidate name or email"
          className="border px-4 py-2 rounded-lg text-sm"
        />
        <select
          className="border px-4 py-2 rounded-lg text-sm"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="All">All Status</option>
          <option value="NEW">New</option>
          <option value="APPLIED">Applied</option>
          <option value="SHORTLISTED">Shortlisted</option>
          <option value="REJECTED">Rejected</option>
          <option value="HIRED">Hired</option>
          <option value="WITHDRAWN">Withdrawn</option>
        </select>
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
              {paginatedApplications.map((app) => (
                <tr
                  key={app._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {app.candidate?.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {app.candidate?.email}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {app?.candidate?.experience || "-"}
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
                        title="View Profile"
                        className="flex border rounded-md px-1 py-1 items-center "
                      >
                        <EyeIcon className="w-5 h-5 text-blue-600" />View
                      </Link>

                      {app.status === "NEW" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(app._id, "SHORTLISTED")}
                            title="Shortlist"
                            className="flex items-center border rounded-md  p-1"
                          >
                            <CheckCircleIcon className="w-5 h-5 text-green-600" />Sortlist
                          </button>
                          <button
                            onClick={() => handleStatusChange(app._id, "REJECTED")}
                            title="Reject"
                            className="flex items-center rounded-md border p-1"
                          >
                            <XCircleIcon className="w-5 h-5 text-red-600" />Reject
                          </button>
                        </>
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

export default JobApplicationsEmployer;
