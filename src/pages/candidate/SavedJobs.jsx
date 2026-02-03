import { BookmarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import {
  useDeleteSavedJobMutation,
  useGetSavedJobsQuery,
} from "../../services/endpoints/candidate/savedJobApi";
import { useState } from "react";
import { toast } from "react-toastify";

const SavedJobs = () => {
  const { data: savedJobs, isLoading } = useGetSavedJobsQuery();
  const [removeSavedJob, { isLoading: deleteLoading }] =
    useDeleteSavedJobMutation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async () => {
    try {
      await removeSavedJob(deleteId).unwrap();
      setShowDeleteModal(false);
      setDeleteId(null);
      toast.success("Saved job removed successfully");
    } catch (error) {
      toast.error("Failed to remove saved job");
      console.error(error);
    }
  };

  if (isLoading)
    return <div className="card text-center">Loading saved jobs...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Saved Jobs</h1>
        <p className="text-gray-500">Jobs you saved to apply later</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {savedJobs
  ?.filter((item) => item.job)
  .map((item) => (
    <div key={item._id} className="card">
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold text-lg">
          {item.job.title}
        </h3>

        <BookmarkIcon
          className="w-5 h-5 text-indigo-600 cursor-pointer"
          onClick={() => {
            setShowDeleteModal(true);
            setDeleteId(item._id);
          }}
        />
      </div>

      <p className="text-sm text-gray-500">
        {item.job.employer?.companyName || "Company not available"}
      </p>

      <div className="text-sm text-gray-600 space-y-1 my-3">
        <p><b>Location:</b> {item.job.location || "-"}</p>
        <p><b>Type:</b> {item.job.type || "-"}</p>
        <p><b>Salary:</b> {item.job.salary || "-"}</p>
      </div>

      <button className="btn-primary flex items-center gap-1">
        <PaperAirplaneIcon className="w-4 h-4" />
        Apply Now
      </button>
    </div>
))}


        {savedJobs?.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">
            No saved jobs
          </p>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-80">
            <h2 className="text-lg font-semibold mb-2">
              Remove Saved Job
            </h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to remove this saved job?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="btn-danger"
              >
                {deleteLoading ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
