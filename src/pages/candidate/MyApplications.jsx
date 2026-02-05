import { Link } from "react-router-dom";
import {
  EyeIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useGetCandidateApplicationsQuery } from "../../services/endpoints/applicationsApi";


const statusColor = {
  Applied: "bg-yellow-100 text-yellow-700",
  Shortlisted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const MyApplications = () => {
  const {data:candidateApplications} = useGetCandidateApplicationsQuery();
  return (
    <div className="space-y-6 px-2 sm:px-0">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">My Applications</h1>
        <p className="text-gray-500">
          Track the status of jobs you applied for
        </p>
      </div>

      {/* TABLE */}
      <div className="card hidden md:block">
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-gray-50 border-b text-left">
          <th className="px-4 py-3">Job</th>
          <th className="px-4 py-3">Company</th>
          <th className="px-4 py-3">Applied On</th>
          <th className="px-4 py-3 text-center">Status</th>
          <th className="px-4 py-3 text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        {candidateApplications?.map((app) => (
          <tr key={app._id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 font-medium">{app?.job?.title}</td>
            <td className="px-4 py-3">{app?.job?.employer?.companyName}</td>
            <td className="px-4 py-3">{new Date(app.createdAt).toLocaleDateString()}</td>
            <td className="px-4 py-3 text-center">
              <StatusBadge status={app.status} />
            </td>
            <td className="px-4 py-3 text-center">
              <Link to={`/candidate/jobs/${app?.job?._id}`}>
                <EyeIcon className="w-5 h-5 text-indigo-600" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
 
 <div className="md:hidden space-y-4">
  {candidateApplications?.map((app) => (
    <div
      key={app._id}
      className="shadow-lime-50 shadow-2xl rounded-lg p-4 bg-white space-y-2"
    >
      <div className="font-semibold">{app.jobTitle}</div>
      <div className="text-sm text-gray-500">{app.company}</div>
      <div className="text-xs text-gray-400">
        Applied on {new Date(app.createdAt).toLocaleDateString()}
      </div>

      <div className="flex items-center justify-between pt-2">
        <StatusBadge status={app.status} />
        <Link to={`/candidate/jobs/${app?.job?._id}`}>
          <EyeIcon className="w-5 h-5 text-indigo-600" />
        </Link>
      </div>
    </div>
  ))}

  {candidateApplications?.length === 0 && (
    <p className="text-center text-gray-500 py-6">
      You haven’t applied for any jobs yet
    </p>
  )}
</div>


    </div>
  );
};

export default MyApplications;

const StatusBadge = ({ status }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-medium ${
      status === "Applied"
        ? "bg-yellow-100 text-yellow-700"
        : status === "Shortlisted"
        ? "bg-green-100 text-green-700"
        : status === "Rejected"
        ? "bg-red-100 text-red-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    {status}
  </span>
);

