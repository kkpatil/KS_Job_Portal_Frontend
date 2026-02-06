import { useMemo, useState } from "react";
import { TrashIcon, CheckCircleIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

import Modal from "../../components/common/Modal";
import {
  useGetSubscribersQuery,
  useUpdateSubscriberMutation,
  useDeleteSubscriberMutation,
} from "../../services/endpoints/subscriberApi";
import { formatDate } from "../../utils/formateDate";

const statusPill = (isActive) =>
  isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";

const Subscribers = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading, error } = useGetSubscribersQuery();
  const [updateSubscriber] = useUpdateSubscriberMutation();
  const [deleteSubscriber] = useDeleteSubscriberMutation();

  const subscribers = data?.data || [];

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return subscribers;
    return subscribers.filter((s) => s.email?.toLowerCase().includes(term));
  }, [subscribers, search]);

  const handleToggle = async (sub) => {
    try {
      await updateSubscriber({
        id: sub._id,
        data: { isActive: !sub.isActive },
      }).unwrap();
      toast.success("Subscriber updated");
    } catch (err) {
      toast.error("Failed to update subscriber");
    }
  };

  const handleDelete = async () => {
    try {
      if (!selected?._id) return;
      await deleteSubscriber(selected._id).unwrap();
      toast.success("Subscriber deleted");
      setDeleteModal(false);
      setSelected(null);
    } catch (err) {
      toast.error("Failed to delete subscriber");
    }
  };

  if (isLoading) return <div className="p-6">Loading subscribers...</div>;
  if (error) return <div className="p-6">Failed to load subscribers.</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Subscribers</h2>
        <input
          type="text"
          placeholder="Search by email"
          className="border px-4 py-2 rounded-lg text-sm w-full md:w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#c1ceb1] text-left">
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((sub) => (
              <tr key={sub._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{sub.email}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusPill(
                      sub.isActive
                    )}`}
                  >
                    {sub.isActive ? "ACTIVE" : "INACTIVE"}
                  </span>
                </td>
                <td className="px-4 py-3">{formatDate(sub.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => handleToggle(sub)}>
                      {sub.isActive ? (
                        <NoSymbolIcon className="w-5 h-5 text-red-600" />
                      ) : (
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setSelected(sub);
                        setDeleteModal(true);
                      }}
                    >
                      <TrashIcon className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No subscribers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {filtered.map((sub) => (
          <div
            key={sub._id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-base font-semibold break-all">
                  {sub.email}
                </div>
                <div className="text-sm text-gray-500">
                  Joined: {formatDate(sub.createdAt)}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusPill(
                  sub.isActive
                )}`}
              >
                {sub.isActive ? "ACTIVE" : "INACTIVE"}
              </span>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => handleToggle(sub)}>
                {sub.isActive ? (
                  <NoSymbolIcon className="w-5 h-5 text-red-600" />
                ) : (
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                )}
              </button>
              <button
                onClick={() => {
                  setSelected(sub);
                  setDeleteModal(true);
                }}
              >
                <TrashIcon className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No subscribers found
          </div>
        )}
      </div>

      {deleteModal && (
        <Modal
          title="Delete Subscriber"
          maxWidth="max-w-sm"
          maxHieght="max-h-[40vh]"
          onClose={() => setDeleteModal(false)}
        >
          <div className="bg-white rounded-lg max-w-md">
            <p className="mb-6">
              Are you sure you want to delete{" "}
              <b>{selected?.email}</b>?
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
    </div>
  );
};

export default Subscribers;
