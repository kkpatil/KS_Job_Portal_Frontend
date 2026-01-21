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

const dummyEmployers = [
  {
    id: 1,
    company: "TechNova Pvt Ltd",
    contact: "Rahul Sharma",
    email: "hr@technova.com",
    jobs: 12,
    status: "Active",
    joined: "12 Jan 2025",
  },
  {
    id: 2,
    company: "Bright Solutions",
    contact: "Anjali Verma",
    email: "careers@brightsol.com",
    jobs: 4,
    status: "Pending",
    joined: "22 Jan 2025",
  },
  {
    id: 3,
    company: "NextGen Labs",
    contact: "Amit Singh",
    email: "jobs@nextgen.com",
    jobs: 9,
    status: "Blocked",
    joined: "01 Feb 2025",
  },
  {
    id: 4,
    company: "CloudPeak",
    contact: "Neha Patel",
    email: "hr@cloudpeak.io",
    jobs: 6,
    status: "Active",
    joined: "05 Feb 2025",
  },
];

const statusColor = {
  Active: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Blocked: "bg-red-100 text-red-700",
};

const Employers = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [editForm, setEditForm] = useState(false);
  const navigate = useNavigate();
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleEditForm = () => {
    setEditForm(!editForm);
  };

  const perPage = 3;

  const filteredData = dummyEmployers.filter((emp) => {
    const matchSearch =
      emp.company.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "All" || emp.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filteredData.length / perPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );


  const handleSave = () => {
  console.log("Updated Employer:", selectedEmployer);

  //Future API
  // await updateEmployer(selectedEmployer)

  setEditForm(false);
};

  const handleDelete = () => {
    console.log("Delete Employer:", selectedEmployer);
    //Future API
    // await deleteEmployer(selectedEmployer.id)
  }
  
  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  }



  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 ">
        <h2 className="text-xl font-semibold">Employers</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* search */}
          <input
            type="text"
            placeholder="Search company or email"
            className="border px-4 py-2 rounded-lg text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Status Filter */}
          <select
            className="border  px-4 py-3 rounded-lg text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* table */}
      <div className="hidden md:block overflow-x-auto tabl">
        <table className="w-full text-sm">
          <thead>
            <tr className="tabl bg-[#c1ceb1] rounded-md text-left">
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 text-center">Jobs</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((emp) => (
              <tr
                key={emp.id}
                className=" select-none transition-all duration-600 hover:scale-101 hover:bg-[#e7e8e5] hover:border-none rounded-full"
              >
                <td className="px-4 py-3 font-medium">{emp.company}</td>
                <td className="px-4 py-3">{emp.contact}</td>
                <td className="px-4 py-3 text-gray-600">{emp.email}</td>
                <td className="px-4 py-3 text-center">{emp.jobs}</td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[emp.status]}`}
                  >
                    {emp.status}
                  </span>
                </td>

                <td className="px-4 py-3">{emp.joined}</td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    <button
                      title="View"
                      onClick={() => navigate(`/admin/employers/${emp.id}`)}
                    >
                      <EyeIcon className="w-5 h-5 text-blue-600 cursor-pointer scale-100 transition-all hover:scale-120" />
                    </button>
                    <button
                      title="Edit"
                      onClick={() => {
                        setSelectedEmployer(emp);
                        setEditForm(true);
                      }}
                    >
                      <PencilSquareIcon className="w-5 h-5 text-green-600 hover:scale-120 transition-all" />
                    </button>

                    {emp.status !== "Active" ? (
                      <button title="Approve">
                        <CheckCircleIcon className="w-5 h-5 text-green-600 cursor-pointer scale-100 transition-all hover:scale-120" />
                      </button>
                    ) : (
                      <button title="Block">
                        <NoSymbolIcon className="w-5 h-5 text-yellow-600 cursor-pointer scale-100 transition-all hover:scale-120" />
                      </button>
                    )}

                    <button title="Delete" onClick={()=> toggleDeleteModal()}>
                      <TrashIcon className="w-5 h-5 text-red-600 cursor-pointer scale-100 transition-all hover:scale-120" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No employers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* mobile view */}
      {/* mobile view */}
<div className="md:hidden space-y-4">
  {paginatedData.map((emp) => (
    <div
      key={emp.id}
      className="bg-white rounded-lg border p-4 space-y-3 shadow-sm"
    >
      {/* Company */}
      <div className="text-base font-semibold">
        {emp.company}
      </div>

      {/* Contact + Email */}
      <div className="text-sm text-gray-600">
        <p><span className="font-medium">Contact:</span> {emp.contact}</p>
        <p><span className="font-medium">Email:</span> {emp.email}</p>
      </div>

      {/* Jobs + Joined */}
      <div className="flex justify-between text-sm text-gray-500">
        <span>Jobs: {emp.jobs}</span>
        <span>{emp.joined}</span>
      </div>

      {/* Status */}
      <div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[emp.status]}`}
        >
          {emp.status}
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-2">
        <button
          title="View"
          onClick={() => navigate(`/admin/employers/${emp.id}`)}
        >
          <EyeIcon className="w-5 h-5 text-blue-600" />
        </button>

        <button
          title="Edit"
          onClick={() => {
            setSelectedEmployer(emp);
            setEditForm(true);
          }}
        >
          <PencilSquareIcon className="w-5 h-5 text-green-600" />
        </button>

        {emp.status !== "Active" ? (
          <button title="Approve">
            <CheckCircleIcon className="w-5 h-5 text-green-600" />
          </button>
        ) : (
          <button title="Block">
            <NoSymbolIcon className="w-5 h-5 text-yellow-600" />
          </button>
        )}

        <button title="Delete" onClick={() => toggleDeleteModal()}>
          <TrashIcon className="w-5 h-5 text-red-600" />
        </button>
      </div>
    </div>
  ))}

  {/* Empty State */}
  {paginatedData.length === 0 && (
    <p className="text-center py-6 text-gray-500">
      No employers found
    </p>
  )}
</div>


      {/* PAGINATION */}
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
        <Modal onClose={toggleDeleteModal}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Delete Employer</h3>
            <p className="mb-6 text-sm">
              Are you sure you want to delete <b>{selectedEmployer?.company}</b>?
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={toggleDeleteModal} className="px-4 py-2 border rounded cursor-pointer">
                Cancel
              </button>
              <button onClick={handleDelete} className="btn-danger cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {editForm && (
        <Modal onClose={toggleEditForm}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Employer</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={selectedEmployer?.company || ""}
                  onChange={(e) =>
                    setSelectedEmployer({
                      ...selectedEmployer,
                      company: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Contact Person
                </label>
                <input
                  value={selectedEmployer?.contact || ""}
                  onChange={(e)=>
                    setSelectedEmployer({
                      ...selectedEmployer,
                      contact:e.target.value,
                    })
                  }
                  type="text"
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  value={selectedEmployer?.email || ""}
                  onChange={()=>
                    setSelectedEmployer({
                      ...selectedEmployer,
                      email:e.target.value
                    })
                  }
                  type="email"
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={toggleEditForm}
                className="px-4 py-2 border rounded cursor-pointer"
              >
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary cursor-pointer" >
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
