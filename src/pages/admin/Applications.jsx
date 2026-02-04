import { useState } from "react";
import {
  EyeIcon,
  TrashIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import Modal from "../../components/common/Modal";
import { useDeleteApplicationMutation, useGetAllApplicationsQuery } from "../../services/endpoints/applicationsApi";
import { toast } from "react-toastify";

const statusColor = {
  NEW: "bg-blue-100 text-blue-700",
  SHORTLISTED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  HIRED: "bg-purple-100 text-purple-700",
  APPLIED: "bg-yellow-100 text-yellow-700",
};

const Applications = () => {
  const {
    data: applicationsData = [],
    isLoading,
    isError,
  } = useGetAllApplicationsQuery();


  const [deleteApplication] = useDeleteApplicationMutation();


  const applications = Array.isArray(applicationsData)
    ? applicationsData
    : [];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [jobFilter, setJobFilter] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const jobTitles = [
    "All",
    ...new Set(
      applications
        .map((a) => a.job?.title)
        .filter((t) => t && typeof t === "string"),
    ),
  ];

  const filteredApplications = applications.filter((app) => {
    const term = search.trim().toLowerCase();
    const matchSearch =
      !term ||
      app.candidate?.name?.toLowerCase().includes(term) ||
      app.candidate?.email?.toLowerCase().includes(term) ||
      app.job?.title?.toLowerCase().includes(term) ||
      app.job?.employer?.companyName?.toLowerCase().includes(term);

    const matchStatus =
      statusFilter === "All" || app.status === statusFilter;

    const matchJob = jobFilter === "All" || app.job?.title === jobFilter;

    return matchSearch && matchStatus && matchJob;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / pageSize),
  );
  const currentPage = Math.min(page, totalPages);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
 


  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDownload = () => {
    alert("Resume downloaded!");
  };

  const handleDelete =async (deleteId) => {
    try {
      await deleteApplication(deleteId).unwrap();
      setShowDeleteModal(false);
      toast.success("Application deleted successfully");
    } catch (error) {
      toast.error("Failed to delete application");
      console.error("Failed to delete application:", error);
    }
  }

  return (
    <>
      <div className="card">
        
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-semibold">Job Applications</h2>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search candidate, job, company"
              className="border px-4 py-2 rounded-lg text-sm w-full md:w-72"
            />
            <select
              className="border px-4 py-2 rounded-lg text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="NEW">NEW</option>
              <option value="APPLIED">APPLIED</option>
              <option value="SHORTLISTED">SHORTLISTED</option>
              <option value="REJECTED">REJECTED</option>
              <option value="HIRED">HIRED</option>
            </select>
            <select
              className="border px-4 py-2 rounded-lg text-sm"
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
            >
              {jobTitles.map((job) => (
                <option key={job} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>
        </div>

       
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#c1ceb1]">
              <tr className="text-left">
                <th className="px-4 py-3">Candidate</th>
                <th className="px-4 py-3">Job</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3">Applied On</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan="6" className="text-center py-6">
                    Loading applications...
                  </td>
                </tr>
              )}

              {isError && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-red-500">
                    Failed to load applications
                  </td>
                </tr>
              )}

              {paginatedApplications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {app.candidate?.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {app.candidate?.email}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {app.job?.title || "—"}
                  </td>

                  <td className="px-4 py-3">
                    {app.job?.employer?.companyName || "—"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColor[app.status]
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setShowViewModal(true);
                        }}
                      >
                        <EyeIcon className="w-6 h-6 text-blue-600" />
                      </button>

                      <button onClick={handleDownload}>
                        <ArrowDownTrayIcon className="w-6 h-6 text-green-600" />
                      </button>

                      <button
                        onClick={() => {
                          setDeleteId(app._id);
                          setShowDeleteModal(true);
                        }}
                      >
                        <TrashIcon className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!isLoading && filteredApplications.length === 0 && (
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


        <div className="md:hidden space-y-4">
          {paginatedApplications.map((app) => (
            <div
              key={app._id}
              className="bg-white border rounded-lg p-4 shadow-sm space-y-3"
            >
              <div>
                <p className="font-semibold">
                  {app.candidate?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {app.candidate?.email}
                </p>
              </div>

              <div className="text-sm text-gray-600">
                <p>
                  <b>Job:</b> {app.job?.title || "—"}
                </p>
                <p>
                  <b>Company:</b> {app?.job?.employer?.companyName || "—"}
                </p>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusColor[app.status]
                  }`}
                >
                  {app.status}
                </span>
                <span className="text-gray-500">
                  {new Date(app.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <button
                  onClick={() => {
                    setSelectedApp(app);
                    setShowViewModal(true);
                  }}
                >
                  <EyeIcon className="w-6 h-6 text-blue-600" />
                </button>

                <button onClick={handleDownload}>
                  <ArrowDownTrayIcon className="w-6 h-6 text-green-600" />
                </button>

                <button
                  onClick={() => {
                    setDeleteId(app._id);
                    setShowDeleteModal(true);
                  }}
                >
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          ))}

          {!isLoading && filteredApplications.length === 0 && (
            <p className="text-center py-6 text-gray-500">
              No applications found
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
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


      {showViewModal && selectedApp && (
        <Modal
          title="Application Details"
          onClose={() => setShowViewModal(false)}
        >
          <div className="space-y-2 text-sm">
            <p>
              <b>Candidate:</b> {selectedApp.candidate?.name}
            </p>
            <p>
              <b>Email:</b> {selectedApp.candidate?.email}
            </p>
            <p>
              <b>Job:</b> {selectedApp.job?.title}
            </p>
            <p>
              <b>Company:</b> {selectedApp.job?.employer.companyName || "—"}
            </p>
            <p>
              <b>Status:</b>{" "}
              <span
                className={`px-2 py-1 rounded ${
                  statusColor[selectedApp.status]
                }`}
              >
                {selectedApp.status}
              </span>
            </p>
            <p>
              <b>Applied On:</b>{" "}
              {new Date(selectedApp.createdAt).toLocaleDateString()}
            </p>
          </div>
        </Modal>
      )}

  
      {showDeleteModal && (
        <Modal
          title="Confirm Delete"
          maxWidth="max-w-sm"
          onClose={() => setShowDeleteModal(false)}
        >
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this application?
          </p>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              onClick={() => handleDelete(deleteId)}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Applications;
