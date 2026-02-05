import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";

import Modal from "../../components/common/Modal";
import {
  useGetAllEmployersQuery,
  useDeleteEmployerMutation,
  useUpdateEmployerMutation,
} from "../../services/endpoints/employerApi";
import { formatDate } from "../../utils/formateDate";
import { toast } from "react-toastify";

const statusColor = {
  ACTIVE: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  BLOCKED: "bg-red-100 text-red-700",
};

const Employers = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [editForm, setEditForm] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState(null);

  const perPage = 3;

  const { data, isLoading } = useGetAllEmployersQuery({
    page: currentPage,
    limit: perPage,
  });

  const [deleteEmployer] = useDeleteEmployerMutation();
  const [updateEmployer] = useUpdateEmployerMutation();

  const employers = data?.data || [];
  const totalPages = data?.pagination?.pages || 1;

  const filteredData = employers.filter((emp) => {
    const matchSearch =
      emp.companyName?.toUpperCase().includes(search.toUpperCase()) ||
      emp.email?.toUpperCase().includes(search.toUpperCase());

    const matchStatus = statusFilter === "All" || emp.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const handleDelete = async () => {
    try {
      if (!selectedEmployer?._id) return;
  
      await deleteEmployer(selectedEmployer._id).unwrap();
      toast.success("Employer deleted successfully");
      setDeleteModal(false);
      setSelectedEmployer(null);
    } catch (error) {
      toast.error("Failed to delete employer");
    }
  };

  const handleSave = async () => {
    try {
      await updateEmployer({
        id: selectedEmployer._id,
        data: {
          companyName: selectedEmployer.companyName,
          contactEmail: selectedEmployer.contactEmail,
          industry: selectedEmployer.industry,
          website: selectedEmployer.website,
          status: selectedEmployer.status,
        },
      }).unwrap();
      toast.success("Employer updated successfully");
      setEditForm(false);
  
      setSelectedEmployer(null);
    } catch (error) {
      toast.error("Failed to update employer");
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading employers...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Employers</h2>

        <div className="flex gap-3 flex-col sm:flex-row">
          <input
            type="text"
            placeholder="Search company or email"
            className="border px-4 py-2 rounded-lg text-sm w-full sm:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border px-4 py-2 rounded-lg text-sm w-full sm:w-48"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="BLOCKED">Blocked</option>
          </select>
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#c1ceb1] text-left">
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 text-center">Industry</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((emp) => (
              <tr key={emp._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{emp.companyName}</td>
                <td className="px-4 py-3">{emp.contactEmail}</td>
                <td className="px-4 py-3 text-gray-600">{emp.email}</td>
                <td className="px-4 py-3 text-center">{emp.industry}</td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[emp.status]}`}
                  >
                    {emp.status}
                  </span>
                </td>

                <td className="px-4 py-3">{formatDate(emp.createdAt)}</td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/admin/employers/${emp._id}`)}
                    >
                      <EyeIcon className="w-5 h-5 text-blue-600" />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedEmployer(emp);
                        setEditForm(true);
                      }}
                    >
                      <PencilSquareIcon className="w-5 h-5 text-green-600" />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedEmployer(emp);
                        setDeleteModal(true);
                      }}
                    >
                      <TrashIcon className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No employers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {filteredData.map((emp) => (
          <div
            key={emp._id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-base font-semibold break-words">
                  {emp.companyName}
                </div>
                <div className="text-sm text-gray-600 break-all">
                  {emp.email}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[emp.status]}`}
              >
                {emp.status}
              </span>
            </div>

            <div className="mt-3 space-y-1 text-sm">
              <div>
                <span className="text-gray-500">Contact:</span>{" "}
                {emp.contactEmail}
              </div>
              <div>
                <span className="text-gray-500">Industry:</span> {emp.industry}
              </div>
              <div>
                <span className="text-gray-500">Joined:</span>{" "}
                {formatDate(emp.createdAt)}
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => navigate(`/admin/employers/${emp._id}`)}
              >
                <EyeIcon className="w-5 h-5 text-blue-600" />
              </button>
              <button
                onClick={() => {
                  setSelectedEmployer(emp);
                  setEditForm(true);
                }}
              >
                <PencilSquareIcon className="w-5 h-5 text-green-600" />
              </button>
              <button
                onClick={() => {
                  setSelectedEmployer(emp);
                  setDeleteModal(true);
                }}
              >
                <TrashIcon className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
        ))}

        {filteredData.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No employers found
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-6 text-sm">
        <span>
          Page {currentPage} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {deleteModal && (
        <Modal
          title="Delete Employer"
          maxWidth="max-w-sm"
          maxHieght="max-h-[40vh]"
          onClose={() => setDeleteModal(false)}
        >
          <div className="bg-white rounded-lg max-w-md">
            <p className="mb-6">
              Are you sure you want to delete{" "}
              <b>{selectedEmployer?.companyName}</b>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="btn-danger">
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {editForm && (
        <Modal
          title="Edit Employer"
          maxWidth="max-w-sm"
          maxHieght="max-w-sm"
          onClose={() => setEditForm(false)}
        >
          <div className="bg-white  rounded-lg max-w-md">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Company Name</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  value={selectedEmployer.companyName}
                  onChange={(e) =>
                    setSelectedEmployer({
                      ...selectedEmployer,
                      companyName: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Contact Email</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  value={selectedEmployer.contactEmail}
                  onChange={(e) =>
                    setSelectedEmployer({
                      ...selectedEmployer,
                      contactEmail: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Indurstry</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setSelectedEmployer({
                      ...selectedEmployer,
                      industry: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded "
                  value={selectedEmployer.industry}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Website</label>
              <input
                type="text"
                onChange={(e) =>
                  setSelectedEmployer({
                    ...selectedEmployer,
                    website: e.target.value,
                  })
                }
                className="w-full border px-3 py-2 rounded "
                value={selectedEmployer.website}
              />
            </div>

            <div className="mt-2 ">
              <label className="text-sm font-medium ">Status</label>
              <div className="space-y-4 border  w-fit rounded p-2">
                <select
                  name="status"
                  id="status"
                  value={selectedEmployer.status}
                  onChange={(e) =>
                    setSelectedEmployer({
                      ...selectedEmployer,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="ACTIVE">Active</option>
                  <option value="PENDING">Pending</option>
                  <option value="BLOCKED">Blocked</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditForm(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary">
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Employers;
