import { useState } from "react";
import {
  EyeIcon,
  TrashIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import Modal from "../../components/common/Modal";
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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const handleDownload = () => {
    // Simulate resume download
    alert("Resume downloaded!");

  };


  const handleDeleteConfirm = () => {
    setApplications((prev) => prev.filter((app) => app.id !== deleteId));

    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const updateStatus = (id, status) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app)),
    );
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedApp(null);
  };

  return (
    <>
      <div className="card">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Job Applications</h2>
        </div>

        {/* TABLE */}
        <div className="hidden md:block overflow-x-auto tabl">
          <table className="w-full text-sm ">
            <thead className="tabl bg-[#c1ceb1] rounded-md">
              <tr className="  text-left ">
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
                  className="select-none  hover:bg-[#e7e8e5]  transition-all duration-500 hover:scale-101 hover:border-none  "
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">{app.candidate}</div>
                    <div className="text-xs text-gray-500">{app.email}</div>
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
                      <button
                        title="View"
                        onClick={() => {
                          setSelectedApp(app);
                          setShowViewModal(true);
                        }}
                      >
                        <EyeIcon className="w-6 h-6 text-blue-600 cursor-pointer" />
                      </button>

                      <button title="Download Resume" onClick={()=> handleDownload()}>
                        <ArrowDownTrayIcon className="w-6 h-6 text-green-600 cursor-pointer " />
                      </button>

                      <button
                        onClick={() => {
                          setDeleteId(app.id);
                          setShowDeleteModal(true);
                        }}
                      >
                        <TrashIcon className="w-5 h-5 text-red-600 cursor-pointer" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {applications.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Mobile View */}
<div className="md:hidden space-y-4">
  {applications.map((app) => (
    <div
      key={app.id}
      className="bg-white border rounded-lg p-4 shadow-sm space-y-3"
    >
      {/* Candidate */}
      <div>
        <p className="font-semibold text-base">{app.candidate}</p>
        <p className="text-xs text-gray-500">{app.email}</p>
      </div>

      {/* Job & Company */}
      <div className="text-sm text-gray-600">
        <p><span className="font-medium">Job:</span> {app.job}</p>
        <p><span className="font-medium">Company:</span> {app.company}</p>
      </div>

      {/* Status & Applied Date */}
      <div className="flex justify-between items-center text-sm">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[app.status]}`}
        >
          {app.status}
        </span>
        <span className="text-gray-500">{app.appliedOn}</span>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-2">
        <button
          title="View"
          onClick={() => {
            setSelectedApp(app);
            setShowViewModal(true);
          }}
        >
          <EyeIcon className="w-6 h-6 text-blue-600" />
        </button>

        <button title="Download Resume" onClick={() => handleDownload()}>
          <ArrowDownTrayIcon className="w-6 h-6 text-green-600" />
        </button>

        <button
          title="Delete"
          onClick={() => {
            setDeleteId(app.id);
            setShowDeleteModal(true);
          }}
        >
          <TrashIcon className="w-5 h-5 text-red-600" />
        </button>
      </div>
    </div>
  ))}

  {/* Empty State */}
  {applications.length === 0 && (
    <p className="text-center py-6 text-gray-500">
      No applications found
    </p>
  )}
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
      {showViewModal && selectedApp && (
        <Modal
          title="Application Details"
          onClose={() => setShowViewModal(false)}
        >
          <div className="space-y-2 text-sm">
            <p>
              <b>Candidate:</b> {selectedApp.candidate}
            </p>
            <p>
              <b>Email:</b> {selectedApp.email}
            </p>
            <p>
              <b>Job:</b> {selectedApp.job}
            </p>
            <p>
              <b>Company:</b> {selectedApp.company}
            </p>
            <p>
              <b>Status:</b>{" "}
              <span
                className={`px-2 py-1 rounded ${statusColor[selectedApp.status]}`}
              >
                {selectedApp.status}
              </span>
            </p>
            <p>
              <b>Applied On:</b> {selectedApp.appliedOn}
            </p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showDeleteModal && (
        <Modal title="Confirm Delete" onClose={() => setShowDeleteModal(false)}>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this application?
          </p>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 border rounded cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleDeleteConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
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
