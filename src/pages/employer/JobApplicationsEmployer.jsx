import { useParams, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import {
  useGetJobApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from "../../services/endpoints/applicationsApi";

const statusColor = {
  APPLIED: "bg-blue-100 text-blue-700",
  SHORTLISTED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const JobApplicationsEmployer = () => {
  const { id: jobId } = useParams();

  const { data, isLoading } = useGetJobApplicationsQuery({jobId});
  const [updateStatus] = useUpdateApplicationStatusMutation();

  const applications = data?.data || [];

  const handleStatusUpdate = (appId, status) => {
    updateStatus({ id: appId, status });
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
              {applications.map((app) => (
                <tr
                  key={app._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {app.applicant?.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {app.applicant?.email}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {app.applicant?.experience || "-"}
                  </td>

                  <td className="px-4 py-3">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${statusColor[app.status]}`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/employer/candidates/${app.applicant?._id}`}
                        title="View Profile"
                      >
                        <EyeIcon className="w-5 h-5 text-blue-600" />
                      </Link>

                      {app.status !== "SHORTLISTED" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(app._id, "SHORTLISTED")
                          }
                        >
                          <CheckCircleIcon className="w-5 h-5 text-green-600" />
                        </button>
                      )}

                      {app.status !== "REJECTED" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(app._id, "REJECTED")
                          }
                        >
                          <XCircleIcon className="w-5 h-5 text-red-600" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {applications.length === 0 && (
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
    </div>
  );
};

export default JobApplicationsEmployer;
