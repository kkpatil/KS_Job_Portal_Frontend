import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";

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
  const navigate = useNavigate();

  const perPage = 3;

  
  const filteredData = dummyEmployers.filter((emp) => {
    const matchSearch =
      emp.company.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || emp.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filteredData.length / perPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 ">
        <h2 className="text-xl font-semibold">Employers</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
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
            <option value="All" >All</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto tabl">
        <table className="w-full text-sm">
          <thead>
            <tr className="tabl border-b text-left">
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 text-center">Jobs</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody >
            {paginatedData.map((emp) => (
              <tr
                key={emp.id}
                className=" transition-all duration-300 hover:scale-102 hover:bg-[#f3f9ec] hover:border-none rounded-full"
              >
                <td className="px-4 py-3 font-medium">
                  {emp.company}
                </td>
                <td className="px-4 py-3">{emp.contact}</td>
                <td className="px-4 py-3 text-gray-600">
                  {emp.email}
                </td>
                <td className="px-4 py-3 text-center">
                  {emp.jobs}
                </td>

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
                    <button title="View" onClick={()=>navigate(`/admin/employers/${emp.id}`)}>
                      <EyeIcon className="w-5 h-5 text-blue-600 cursor-pointer scale-100 transition-all hover:scale-120" />
                    </button>
                    <button title="Edit">
                      <PencilSquareIcon className="w-5 h-5 text-green-600 cursor-pointer  transition-all hover:scale-120" />
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

                    <button title="Delete">
                      <TrashIcon className="w-5 h-5 text-red-600 cursor-pointer scale-100 transition-all hover:scale-120" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500"
                >
                  No employers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
    </div>
  );
};

export default Employers;
