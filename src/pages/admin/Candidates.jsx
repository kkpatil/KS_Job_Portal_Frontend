import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetCandidatesQuery,
  useUpdateCandidateMutation,
  useDeleteCandidateMutation,
} from "../../services/endpoints/adminApi";

const Candidates = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetCandidatesQuery({
    page,
    limit: 10,
    search,
  });
  const [updateCandidate, { isLoading: updating }] =
    useUpdateCandidateMutation();
  const [deleteCandidate, { isLoading: deleting }] =
    useDeleteCandidateMutation();

  const candidates = data?.data || [];
  const pages = data?.pages || 1;

  const handleDelete = async (id) => {
    try {
      await deleteCandidate(id).unwrap();
      toast.success("Candidate deleted");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete candidate");
    }
  };

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    status: "ACTIVE",
    currentRole: "",
    experience: "",
    preferredLocation: "",
  });

  useEffect(() => {
    if (!selected) return;
    setForm({
      firstName: selected.firstName || "",
      lastName: selected.lastName || "",
      email: selected.email || "",
      phone: selected.phone || "",
      status: selected.status || "ACTIVE",
      currentRole: selected.currentRole || "",
      experience: selected.experience || "",
      preferredLocation: selected.preferredLocation || "",
    });
  }, [selected]);

  const openEdit = (user) => {
    setSelected(user);
    setEditOpen(true);
  };

  const openDelete = (user) => {
    setSelected(user);
    setDeleteOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selected?._id) return;
    try {
      await updateCandidate({ id: selected._id, data: form }).unwrap();
      toast.success("Candidate updated");
      setEditOpen(false);
      setSelected(null);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update candidate");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Candidates</h1>
          <p className="text-gray-500">
            Search and manage all registered candidates
          </p>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by name, email, phone"
          className="border px-4 py-2 rounded-lg text-sm w-full md:w-72"
        />
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#c1ceb1] border-b text-left">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  Loading candidates...
                </td>
              </tr>
            )}

            {!isLoading && candidates.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  No candidates found
                </td>
              </tr>
            )}

            {candidates.map((user) => {
              const name =
                user?.firstName || user?.lastName
                  ? `${user?.firstName || ""} ${user?.lastName || ""}`.trim()
                  : user?.name || "Candidate";
              return (
                <tr key={user._id} className="border-b">
                  <td className="px-4 py-3 font-medium">{name}</td>
                  <td className="px-4 py-3">{user.email || "—"}</td>
                  <td className="px-4 py-3">{user.phone || "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "BLOCKED"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.status || "ACTIVE"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link
                        to={`/admin/candidates/${user._id}`}
                        className="text-indigo-600 hover:underline"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => openEdit(user)}
                        className="text-emerald-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDelete(user)}
                        disabled={deleting}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Page {page} of {pages}
        </p>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page >= pages}
          >
            Next
          </button>
        </div>
      </div>

      {editOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Candidate</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  className="border px-3 py-2 rounded"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, firstName: e.target.value }))
                  }
                />
                <input
                  className="border px-3 py-2 rounded"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, lastName: e.target.value }))
                  }
                />
              </div>
              <input
                className="border px-3 py-2 rounded w-full"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
              <input
                className="border px-3 py-2 rounded w-full"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  className="border px-3 py-2 rounded"
                  placeholder="Current Role"
                  value={form.currentRole}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, currentRole: e.target.value }))
                  }
                />
                <input
                  className="border px-3 py-2 rounded"
                  placeholder="Experience"
                  value={form.experience}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, experience: e.target.value }))
                  }
                />
              </div>
              <input
                className="border px-3 py-2 rounded w-full"
                placeholder="Preferred Location"
                value={form.preferredLocation}
                onChange={(e) =>
                  setForm((f) => ({ ...f, preferredLocation: e.target.value }))
                }
              />
              <select
                className="border px-3 py-2 rounded w-full"
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({ ...f, status: e.target.value }))
                }
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="BLOCKED">BLOCKED</option>
              </select>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="border rounded-md p-2 cursor-pointer hover:scale-102"
                  onClick={() => {
                    setEditOpen(false);
                    setSelected(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={updating}
                >
                  {updating ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm space-y-4">
            <h3 className="text-lg font-semibold">Delete Candidate</h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <b>{selected.name || selected.email}</b>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border cursor-pointer  rounded-md hover:scale-102"
                onClick={() => {
                  setDeleteOpen(false);
                  setSelected(null);
                }}
              >
                Cancel
              </button>
              <button
                className="btn-danger"
                onClick={async () => {
                  await handleDelete(selected._id);
                  setDeleteOpen(false);
                  setSelected(null);
                }}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
